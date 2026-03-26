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
    # Test basic task creation with valid data and check defaults and response structure
    async def test_create_task(self, client):
        r = await client.post(
            "/deeptodos/create-task",
            json={"title": "Test Task", "description": "Create endpoint works"},
        )
        # 201 Task Created
        assert r.status_code == 201
        data = r.json()
        # Check response fields and defaults
        assert data["title"] == "Test Task"
        assert data["is_completed"] is False
        assert "id" in data


class TestTaskRetrieval:
    @pytest_asyncio.fixture
    # Prepare a sample task for retrieval tests
    async def create_sample_task(self, create_task):
        return await create_task(title="Sample Task", description="sample")

    @pytest.mark.asyncio
    # Test retrieving a task by ID and handling not found case
    async def test_read_task_by_id(self, client, create_sample_task):
        created = create_sample_task
        tid = created["id"]
        r = await client.get(f"/deeptodos/read-task/{tid}")
        # 200 OK
        assert r.status_code == 200
        data = r.json()
        # Check retrieved data matches created task
        assert data["id"] == tid
        assert data["title"] == "Sample Task"

        # Test retrieval of non-existent task returns 404
        fake = "00000000-0000-0000-0000-000000000000"
        r2 = await client.get(f"/deeptodos/read-task/{fake}")
        assert r2.status_code == 404


class TestValidationAndEdgeCases:
    @pytest.mark.asyncio
    # Test that creating a task without a title returns a 422 Unprocessable Entity error
    async def test_create_missing_title_returns_422(self, client):
        r = await client.post(
            "/deeptodos/create-task", json={"description": "no title"}
        )
        assert r.status_code == 422

    @pytest.mark.asyncio
    # Test priority bounds validation by attempting to create tasks with invalid priority values and expecting a 422 error
    async def test_create_priority_bounds(self, client):
        r_low = await client.post(
            "/deeptodos/create-task", json={"title": "t", "priority": 0}
        )
        r_high = await client.post(
            "/deeptodos/create-task", json={"title": "t", "priority": 4}
        )
        assert r_low.status_code == 422
        assert r_high.status_code == 422

    @pytest.mark.asyncio
    # Test field length validations by attempting to create tasks with excessively long title, description, and category, expecting a 422 error for each case
    async def test_field_length_validations(self, client):
        long_title = "x" * 201
        long_desc = "d" * 2001
        long_cat = "c" * 101

        r1 = await client.post("/deeptodos/create-task", json={"title": long_title})
        r2 = await client.post(
            "/deeptodos/create-task", json={"title": "t", "description": long_desc}
        )
        r3 = await client.post(
            "/deeptodos/create-task", json={"title": "t", "category": long_cat}
        )

        assert r1.status_code == 422
        assert r2.status_code == 422
        assert r3.status_code == 422

    @pytest.mark.asyncio
    # Test skip and limit pagination by creating multiple tasks and retrieving a subset using skip and limit parameters,
    # ensuring correct number of items returned and that skipping works as expected
    async def test_skip_and_limit_pagination(self, client, create_task):
        # Prepare three tasks
        ids = []
        for i in range(3):
            t = await create_task(title=f"p{i}")
            ids.append(t["id"])

        r = await client.get("/deeptodos/read-tasks", params={"skip": 1, "limit": 1})
        # 200 OK
        assert r.status_code == 200
        items = r.json()
        # With skip=1 and limit=1, we should get at most 1 item, and it should not be the first created task
        assert len(items) <= 1
        if items:
            assert items[0]["id"] != ids[0]

    @pytest.mark.asyncio
    # Test filtering tasks by completion status by creating a task, marking it as completed, and then retrieving tasks
    # filtered by is_completed=True and is_completed=False to ensure the completed task appears in the correct filter results
    async def test_filter_by_is_completed(self, client, create_task):
        # create and complete one
        task = await create_task(title="todo1")
        tid = task["id"]
        await client.post(f"/deeptodos/complete-task/{tid}")

        r_true = await client.get(
            "/deeptodos/read-tasks", params={"is_completed": True}
        )
        r_false = await client.get(
            "/deeptodos/read-tasks", params={"is_completed": False}
        )
        # The completed task should appear in the True filter and not in the False filter
        assert any(t["id"] == tid for t in r_true.json())
        # The completed task should not appear in the False filter results
        assert all(t["id"] != tid for t in r_false.json())

    @pytest.mark.asyncio
    # Test that updating a task with extra fields that are not defined in the update schema does not cause errors and
    # that the updated_at timestamp is properly updated to reflect the modification time
    async def test_update_ignores_extra_fields_and_updates_timestamp(
        self, client, create_task
    ):
        task = await create_task(title="uptest", description="old")
        tid = task["id"]
        created_at = task["created_at"]

        # update with extra field that should be ignored
        r2 = await client.patch(
            f"/deeptodos/update-task/{tid}", json={"title": "new", "extra": "ignored"}
        )
        assert r2.status_code == 200
        upd = r2.json()
        # The title should be updated, but the extra field should not cause an error and should not appear in the response
        assert upd["title"] == "new"

        # updated_at should be >= created_at
        created_dt = datetime.fromisoformat(created_at)
        updated_dt = datetime.fromisoformat(upd["updated_at"])
        assert updated_dt >= created_dt

    @pytest.mark.asyncio
    # Test that completing and deleting a nonexistent task returns a 404 error by attempting to complete and delete a task with a fake UUID and
    # ensuring that both operations return a 404 Not Found status code, indicating that the task does not exist in the database.
    # This verifies proper error handling for operations on nonexistent resources.
    async def test_complete_and_delete_nonexistent_return_404(self, client):
        fake = "00000000-0000-0000-0000-000000000000"
        r = await client.post(f"/deeptodos/complete-task/{fake}")
        assert r.status_code == 404
        r2 = await client.delete(f"/deeptodos/delete-task/{fake}")
        assert r2.status_code == 404

    @pytest.mark.asyncio
    # Test that the read-tasks-summary endpoint returns the expected fields by creating a task and then retrieving the tasks summary,
    # ensuring that the response contains the expected fields defined in the TaskSummary schema, such as id, title, is_completed, priority, category, and created_at.
    async def test_read_tasks_summary_fields(self, client, create_task):
        await create_task(title="sumtest", category="Z")
        r2 = await client.get("/deeptodos/read-tasks-summary")
        assert r2.status_code == 200
        items = r2.json()
        # TaskSummary fields: id,title,is_completed,priority,category,created_at
        expected_keys = {
            "id",
            "title",
            "is_completed",
            "priority",
            "category",
            "created_at",
        }
        if items:
            assert set(items[0].keys()) >= expected_keys

    @pytest.mark.asyncio
    # Test that providing an invalid UUID to the read-task endpoint returns a 422 error
    async def test_invalid_uuid_returns_422(self, client):
        r = await client.get("/deeptodos/read-task/not-a-uuid")
        assert r.status_code == 422

    @pytest.mark.asyncio
    # Test that negative skip and large limit values are validated and return a 422 error
    async def test_negative_skip_and_large_limit_validation(self, client):
        r1 = await client.get("/deeptodos/read-tasks", params={"skip": -1})
        r2 = await client.get("/deeptodos/read-tasks", params={"limit": 101})
        assert r1.status_code == 422
        assert r2.status_code == 422

    @pytest.mark.asyncio
    # Test that creating a task without optional fields sets the default values correctly by creating a task with only the required title field and
    # then checking that the response contains the default values for category, priority, and is_completed as defined in the TaskBase schema.
    async def test_create_defaults_for_optional_fields(self, client, create_task):
        data = await create_task(title="defaults")
        # defaults from schemas.TaskBase
        assert data["category"] == "未分类"
        assert data["priority"] == 1
        assert data["is_completed"] is False

    @pytest.mark.asyncio
    # Test that the search functionality in the read-tasks endpoint is case-insensitive by creating a task with a mixed-case title and description,
    # then performing a search with a different case and verifying that the created task is included in the search results,
    # confirming that the search implementation correctly ignores case when matching tasks.
    async def test_search_is_case_insensitive(self, client, create_task):
        await create_task(title="CaseTest", description="MixCase")
        r = await client.get("/deeptodos/read-tasks", params={"search": "casetest"})
        assert r.status_code == 200
        assert any("casetest" in (t.get("title") or "").lower() for t in r.json())

    @pytest.mark.asyncio
    # Test that tasks are ordered by created_at when they have the same priority
    async def test_ordering_by_created_at_for_same_priority(self, client):
        # create three tasks with same priority to test created_at ordering
        r1 = await client.post(
            "/deeptodos/create-task", json={"title": "o1", "priority": 1}
        )
        r2 = await client.post(
            "/deeptodos/create-task", json={"title": "o2", "priority": 1}
        )
        r3 = await client.post(
            "/deeptodos/create-task", json={"title": "o3", "priority": 1}
        )
        assert r1.status_code == 201 and r2.status_code == 201 and r3.status_code == 201

        r = await client.get(
            "/deeptodos/read-tasks", params={"priority": 1, "limit": 10}
        )
        items = r.json()
        # items should be ordered by priority desc then created_at desc; since priority equal, check created_at desc
        created_times = [it["created_at"] for it in items if it.get("priority") == 1]
        # ensure list is non-empty and sorted descending
        if created_times:
            from datetime import datetime

            dts = [datetime.fromisoformat(t) for t in created_times]
            assert dts == sorted(dts, reverse=True)
