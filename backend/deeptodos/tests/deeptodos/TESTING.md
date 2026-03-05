````markdown
# Deeptodos 测试指南

## 概述
本目录包含针对 `src.deeptodos` 模块的自动化测试，使用 `pytest` + `pytest-asyncio` 对 FastAPI 应用的 HTTP 端点进行异步请求测试。测试运行时会创建内存 SQLite 数据库来保证各测试间隔离。

## 目录结构

# Deeptodos 测试指南

## 概述
本目录包含针对 `src.deeptodos` 模块的自动化测试，使用 `pytest` + `pytest-asyncio` 对 FastAPI 应用的 HTTP 端点进行异步请求测试。测试运行时会创建内存 SQLite 数据库来保证各测试间隔离。

## 目录结构

```
tests/deeptodos/
├── test_deeptodos.py                # 端点单元/功能测试
├── test_deeptodos_integration.py    # 更高层集成流测试
├── conftest.py                      # 共享 fixtures
├── README.md
└── TESTING.md
```

## 快速开始

1. 安装依赖
```bash
pip install pytest pytest-asyncio httpx
```

2. 运行所有 deeptodos 测试
```bash
pytest backend/deeptodos/tests/deeptodos -q
```

3. 运行单个测试文件或测试类
```bash
pytest backend/deeptodos/tests/deeptodos/test_deeptodos.py::TestTaskCreation -q
```

## 设计说明
- 使用 `sqlite+aiosqlite:///:memory:` 保证每次测试使用干净数据库
- 使用 `ASGITransport` 与 `httpx.AsyncClient` 调用 FastAPI 应用，触发生命期事件
- 覆盖常见使用场景与边界情况

## 新增测试场景说明
- 参数验证：测试会触发对路径/查询参数的 Pydantic 验证（例如无效 UUID 会返回 `422`）。
- 输入边界：测试包含字段长度、优先级边界（1-3）和值缺失情况。
- 排序与分页：验证 `priority` 优先级排序和 `created_at` 的降序次排序，以及 `skip`/`limit` 行为。
- 搜索：大小写不敏感的全文搜索（`title` 和 `description`）。
- 并发：集成测试中包含并发创建任务的用例，验证在高并发下的插入与读取一致性。

## 在 CI 中运行并发测试的建议
- 如果 CI 环境受限，请将并发测试单独标记或在单独的 job 中执行。

示例命令：

```bash
pytest backend/deeptodos/tests/deeptodos -q
```

或仅运行并发测试：

```bash
pytest backend/deeptodos/tests/deeptodos/test_deeptodos_integration.py::TestOrderingAndCategories::test_concurrent_creates -q
```

## 调试技巧
- 显示 print 输出： `pytest -s` 或 `pytest -vs`
- 单元测试快速运行：使用 `-k` 过滤关键字，例如 `pytest -k create_task`

## CI 建议
- 在 CI 中，按目录分块运行测试以并行化并减少内存占用
- 生成覆盖率报告：`pytest --cov=src.deeptodos --cov-report=xml`

## 测试矩阵（详细）

- TestTaskCreation
	- test_create_task: POST `/deeptodos/create-task` 成功创建并返回必需字段

- TestTaskRetrieval
	- test_read_task_by_id: GET `/deeptodos/read-task/{id}` 成功与 404 场景

- TestValidationAndEdgeCases
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

- TestCompleteFlow (integration)
	- test_create_update_complete_delete_flow: full lifecycle flow

- TestOrderingAndCategories (integration)
	- test_ordering_and_categories
	- test_concurrent_creates

## 可重构点与说明
- 抽取了公用 `conftest.py` 中的 `setup_test_db`, `client`, `create_task` 三个 fixture，减少了重复代码。
- `create_task` fixture返回一个 factory 函数，简化测试中创建任务的调用并在创建失败时代替断言。
- 所有测试现在使用内存数据库隔离，适合并发运行或 CI 分片。
