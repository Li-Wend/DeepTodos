````markdown
# Deeptodos Tests

此目录包含 `deeptodos` 模块的自动化测试：单元/端到端风格的HTTP端点测试以及集成测试。测试使用 `pytest` 和 `pytest-asyncio`，通过 `httpx.AsyncClient` 对 ASGI 应用进行调用，使用内存 SQLite 数据库进行隔离。

## 覆盖范围
- 任务创建、读取、更新、完成、删除
- 列表查询：过滤、搜索、分页
- 分类获取与去重
- 简要任务摘要和排序
- 错误场景（404/422 等）

## 依赖
安装测试依赖：
```bash
pip install pytest pytest-asyncio httpx
```

## 运行测试
在项目根目录运行：
```bash
pytest backend/deeptodos/tests/deeptodos -q
```

或运行整个后端测试套件：
```bash
pytest backend/deeptodos/tests -q
```

## 参考
测试结构参考 `tests/authentication` 的组织方式。每个测试模块使用内存数据库（`sqlite+aiosqlite:///:memory:`）以确保测试互相隔离。

## 测试矩阵（概要）

- **TestTaskCreation**
	- test_create_task: 验证创建任务端点返回 201 与字段

- **TestTaskRetrieval**
	- test_read_task_by_id: 通过 ID 读取任务和 404 场景

- **TestValidationAndEdgeCases**
	- test_create_missing_title_returns_422
	- test_create_priority_bounds
	- test_field_length_validations
	- test_skip_and_limit_pagination
	- test_filter_by_is_completed
	- test_update_ignores_extra_fields_and_updates_timestamp
	- test_complete_and_delete_nonexistent_return_404
	- test_read_tasks_summary_fields
	- test_invalid_uuid_returns_422
	- test_negative_skip_and_large_limit_validation
	- test_create_defaults_for_optional_fields
	- test_search_is_case_insensitive
	- test_ordering_by_created_at_for_same_priority

- **TestCompleteFlow (integration)**
	- test_create_update_complete_delete_flow: 创建→更新→完成→验证→删除 流程

- **TestOrderingAndCategories (integration)**
	- test_ordering_and_categories: 优先级/分类/摘要排序
	- test_concurrent_creates: 并发创建压力测试

## 可重构点
- 公共 fixtures 已抽出到 `conftest.py`：`setup_test_db`, `client`, `create_task`。
- 使用 `create_task` 工厂函数可以让测试更简洁并在创建失败时立即断言。


## 新增测试场景
- 参数验证：无效 UUID、`skip` 负值、`limit` 超过上限 会返回 `422`。
- 字段默认值验证：未提供 `category` / `priority` 时使用默认值。
- 搜索大小写不敏感（`ilike`），同时支持在 `title` 或 `description` 中查找。
- `read-tasks` 对于相同 `priority` 按 `created_at` 降序排序。
- 并发创建测试：使用 `asyncio.gather` 同时发起多条创建请求以验证并发处理。

## 运行并发测试
并发测试与其它集成测试一起运行即可。单独运行并发测试：
```bash
pytest backend/deeptodos/tests/deeptodos/test_deeptodos_integration.py::TestOrderingAndCategories::test_concurrent_creates -q
```
````
