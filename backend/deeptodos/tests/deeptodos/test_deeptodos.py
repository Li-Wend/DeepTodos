"""Comprehensive tests for FastAPI deeptodos module.

Tests include:
- Task creation, retrieval, updating, deleting
- Listing with filters, search and pagination
- Categories and summaries
- Edge cases and error responses
"""

import pytest
import pytest_asyncio
from datetime import datetime
from src.core.database import Base
from src.app import app


class TestTaskCreation:
    @pytest.mark.asyncio
    async def test_create_task(self, client):
        r = await client.post(
            "/deeptodos/create-task",
            json={"title": "Test Task", "description": "Create endpoint works"},
        )
        assert r.status_code == 201
        data = r.json()
        assert data["title"] == "Test Task"
        assert data["is_completed"] is False
        assert "id" in data


class TestTaskRetrieval:
    @pytest_asyncio.fixture
    async def create_sample_task(self, create_task):
        return await create_task(title="Sample Task", description="sample")

    @pytest.mark.asyncio
    async def test_read_task_by_id(self, client, create_sample_task):
        created = create_sample_task
        tid = created["id"]
        r = await client.get(f"/deeptodos/read-task/{tid}")
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == tid
        assert data["title"] == "Sample Task"

        # missing
        fake = "00000000-0000-0000-0000-000000000000"
        r2 = await client.get(f"/deeptodos/read-task/{fake}")
        assert r2.status_code == 404


class TestValidationAndEdgeCases:
    @pytest.mark.asyncio
    async def test_create_missing_title_returns_422(self, client):
        r = await client.post("/deeptodos/create-task", json={"description": "no title"})
        assert r.status_code == 422

    @pytest.mark.asyncio
    async def test_create_priority_bounds(self, client):
        r_low = await client.post("/deeptodos/create-task", json={"title": "t", "priority": 0})
        r_high = await client.post("/deeptodos/create-task", json={"title": "t", "priority": 4})
        assert r_low.status_code == 422
        assert r_high.status_code == 422

    @pytest.mark.asyncio
    async def test_field_length_validations(self, client):
        long_title = "x" * 201
        long_desc = "d" * 2001
        long_cat = "c" * 101

        r1 = await client.post("/deeptodos/create-task", json={"title": long_title})
        r2 = await client.post("/deeptodos/create-task", json={"title": "t", "description": long_desc})
        r3 = await client.post("/deeptodos/create-task", json={"title": "t", "category": long_cat})

        assert r1.status_code == 422
        assert r2.status_code == 422
        assert r3.status_code == 422

    @pytest.mark.asyncio
    async def test_skip_and_limit_pagination(self, client, create_task):
        # create three tasks
        ids = []
        for i in range(3):
            t = await create_task(title=f"p{i}")
            ids.append(t["id"])

        r = await client.get("/deeptodos/read-tasks", params={"skip": 1, "limit": 1})
        assert r.status_code == 200
        items = r.json()
        assert len(items) <= 1
        if items:
            assert items[0]["id"] != ids[0]

    @pytest.mark.asyncio
    async def test_filter_by_is_completed(self, client, create_task):
        # create and complete one
        task = await create_task(title="todo1")
        tid = task["id"]
        await client.post(f"/deeptodos/complete-task/{tid}")

        r_true = await client.get("/deeptodos/read-tasks", params={"is_completed": True})
        r_false = await client.get("/deeptodos/read-tasks", params={"is_completed": False})
        assert any(t["id"] == tid for t in r_true.json())
        assert all(t["id"] != tid for t in r_false.json())

    @pytest.mark.asyncio
    async def test_update_ignores_extra_fields_and_updates_timestamp(self, client, create_task):
        task = await create_task(title="uptest", description="old")
        tid = task["id"]
        created_at = task["created_at"]

        # update with extra field that should be ignored
        r2 = await client.patch(f"/deeptodos/update-task/{tid}", json={"title": "new", "extra": "ignored"})
        assert r2.status_code == 200
        upd = r2.json()
        assert upd["title"] == "new"

        # updated_at should be >= created_at
        created_dt = datetime.fromisoformat(created_at)
        updated_dt = datetime.fromisoformat(upd["updated_at"])
        assert updated_dt >= created_dt

    @pytest.mark.asyncio
    async def test_complete_and_delete_nonexistent_return_404(self, client):
        fake = "00000000-0000-0000-0000-000000000000"
        r = await client.post(f"/deeptodos/complete-task/{fake}")
        assert r.status_code == 404
        r2 = await client.delete(f"/deeptodos/delete-task/{fake}")
        assert r2.status_code == 404

    @pytest.mark.asyncio
    async def test_read_tasks_summary_fields(self, client, create_task):
        await create_task(title="sumtest", category="Z")
        r2 = await client.get("/deeptodos/read-tasks-summary")
        assert r2.status_code == 200
        items = r2.json()
        # TaskSummary fields: id,title,is_completed,priority,category,created_at
        expected_keys = {"id", "title", "is_completed", "priority", "category", "created_at"}
        if items:
            assert set(items[0].keys()) >= expected_keys


    @pytest.mark.asyncio
    async def test_invalid_uuid_returns_422(self, client):
        r = await client.get("/deeptodos/read-task/not-a-uuid")
        assert r.status_code == 422

    @pytest.mark.asyncio
    async def test_negative_skip_and_large_limit_validation(self, client):
        r1 = await client.get("/deeptodos/read-tasks", params={"skip": -1})
        r2 = await client.get("/deeptodos/read-tasks", params={"limit": 101})
        assert r1.status_code == 422
        assert r2.status_code == 422

    @pytest.mark.asyncio
    async def test_create_defaults_for_optional_fields(self, client, create_task):
        data = await create_task(title="defaults")
        # defaults from schemas.TaskBase
        assert data["category"] == "未分类"
        assert data["priority"] == 1
        assert data["is_completed"] is False

    @pytest.mark.asyncio
    async def test_search_is_case_insensitive(self, client, create_task):
        await create_task(title="CaseTest", description="MixCase")
        r = await client.get("/deeptodos/read-tasks", params={"search": "casetest"})
        assert r.status_code == 200
        assert any("casetest" in (t.get("title") or "").lower() for t in r.json())

    @pytest.mark.asyncio
    async def test_ordering_by_created_at_for_same_priority(self, client):
        # create three tasks with same priority to test created_at ordering
        r1 = await client.post("/deeptodos/create-task", json={"title": "o1", "priority": 1})
        r2 = await client.post("/deeptodos/create-task", json={"title": "o2", "priority": 1})
        r3 = await client.post("/deeptodos/create-task", json={"title": "o3", "priority": 1})
        assert r1.status_code == 201 and r2.status_code == 201 and r3.status_code == 201

        r = await client.get("/deeptodos/read-tasks", params={"priority": 1, "limit": 10})
        items = r.json()
        # items should be ordered by priority desc then created_at desc; since priority equal, check created_at desc
        created_times = [it["created_at"] for it in items if it.get("priority") == 1]
        # ensure list is non-empty and sorted descending
        if created_times:
            from datetime import datetime

            dts = [datetime.fromisoformat(t) for t in created_times]
            assert dts == sorted(dts, reverse=True)




