"""Integration tests for deeptodos endpoints.

These tests exercise typical user flows across endpoints and verify
data persistence and ordering when using the app ASGI lifespan.
"""

import pytest
from httpx import AsyncClient
from httpx import ASGITransport
from src.app import app
from src.core.database import Base


class TestCompleteFlow:
    @pytest.mark.asyncio
    # Test the complete flow of creating, updating, completing, and deleting a task by performing each operation sequentially and verifying the expected outcomes at each step,
    # such as successful creation with a valid ID, correct updates to the task's title, proper completion status change, and successful deletion with appropriate status codes.
    async def test_create_update_complete_delete_flow(self, client):
        # create
        r = await client.post(
            "/deeptodos/create-task", json={"title": "flow", "description": "start"}
        )
        assert r.status_code == 201
        tid = r.json()["id"]

        # update
        r = await client.patch(
            f"/deeptodos/update-task/{tid}", json={"title": "flow-updated"}
        )
        assert r.status_code == 200
        assert r.json()["title"] == "flow-updated"

        # complete
        r = await client.post(f"/deeptodos/complete-task/{tid}")
        assert r.status_code == 200
        assert r.json()["is_completed"] is True

        # list and ensure completed flag present
        r = await client.get("/deeptodos/read-tasks")
        assert r.status_code == 200
        assert any(t["id"] == tid and t["is_completed"] for t in r.json())

        # delete
        r = await client.delete(f"/deeptodos/delete-task/{tid}")
        assert r.status_code == 204


class TestOrderingAndCategories:
    @pytest.mark.asyncio
    # Test that tasks are ordered by priority in descending order and that categories are distinct by creating multiple tasks with different priorities and categories,
    # then retrieving the tasks summary to verify that the tasks are returned in the correct order based
    async def test_ordering_and_categories(self, client):
        # create multiple with priorities
        await client.post(
            "/deeptodos/create-task",
            json={"title": "t1", "priority": 1, "category": "A"},
        )
        await client.post(
            "/deeptodos/create-task",
            json={"title": "t3", "priority": 3, "category": "B"},
        )
        await client.post(
            "/deeptodos/create-task",
            json={"title": "t2", "priority": 2, "category": "A"},
        )

        # summary should be ordered by priority desc
        r = await client.get("/deeptodos/read-tasks-summary")
        assert r.status_code == 200
        items = r.json()
        priorities = [i["priority"] for i in items]
        assert priorities == sorted(priorities, reverse=True)

        # categories distinct
        r = await client.get("/deeptodos/read-categories")
        assert r.status_code == 200
        cats = r.json()
        assert "A" in cats and "B" in cats

    @pytest.mark.asyncio
    # Test concurrent creation of tasks to ensure that the application can handle multiple simultaneous requests without errors and
    # that all tasks are created successfully by sending multiple create-task requests concurrently and verifying that all requests
    # return a successful status code, and then confirming that all created tasks are present in the database.
    async def test_concurrent_creates(self, client):
        # Create many tasks concurrently to exercise connection/session handling
        import asyncio

        async def create(i):
            return await client.post(
                "/deeptodos/create-task", json={"title": f"concurrent-{i}"}
            )

        tasks = [create(i) for i in range(20)]
        results = await asyncio.gather(*tasks)
        assert all(r.status_code == 201 for r in results)

        # ensure count >= 20
        r = await client.get("/deeptodos/read-tasks", params={"limit": 100})
        assert r.status_code == 200
        assert len([t for t in r.json() if t["title"].startswith("concurrent-")]) >= 20
