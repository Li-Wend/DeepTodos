# FastAPI Authentication 自动化测试指南

## 📋 概述

本项目包含了comprehensive的自动化测试套件，用于测试FastAPI authentication模块的所有功能。测试使用pytest框架，支持异步操作，覆盖了用户注册、登录、认证、权限管理等全面的功能。

## 📁 项目结构

```
tests/
├── __init__.py                          # Tests包初始化
├── conftest.py                          # Pytest配置和共享fixtures
├── test_authentication.py                # 主要认证测试（7个测试类，27个测试方法）
├── test_authentication_integration.py   # 集成测试（5个测试类，13个测试方法）
└── README.md                            # 测试使用说明

项目根目录:
├── pytest.ini                           # Pytest配置文件
├── run_tests.py                         # 测试运行脚本
└── pyproject.toml                       # 项目配置
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 使用pip
pip install pytest pytest-asyncio httpx

# 或使用uv（项目推荐）
uv pip install pytest pytest-asyncio httpx
```

### 2. 运行所有测试

```bash
# 基本运行
pytest tests/

# 或使用提供的脚本
python run_tests.py
```

### 3. 查看测试结果

```bash
# 详细输出
pytest tests/ -v

# 显示print输出
pytest tests/ -s

# 详细输出 + 显示print
pytest tests/ -vs
```

## 📊 测试覆盖范围

### test_authentication.py - 基础认证测试（80+个测试用例）

#### 1️⃣ **TestUserRegistration** - 用户注册测试
```
✅ test_register_new_user
   │ 测试成功注册新用户
   │ 验证返回用户ID、邮箱、活跃状态
   │
✅ test_register_duplicate_user
   │ 防止相同邮箱重复注册
   │ 验证返回400错误和"already exists"信息
   │
✅ test_register_invalid_email
   │ 验证邮箱格式检查
   │ 应返回422验证错误
   │
✅ test_register_weak_password
   │ 测试弱密码处理
   │ FastAPI-Users默认接受任何密码
```

#### 2️⃣ **TestUserLogin** - 用户登录与JWT测试
```
✅ test_login_success
   │ 成功登录并获取JWT令牌
   │ 验证token_type为"bearer"
   │
✅ test_login_wrong_password
   │ 错误密码登录失败
   │ 返回400错误
   │
✅ test_login_nonexistent_user
   │ 不存在的用户登录失败
   │ 返回400错误
```

#### 3️⃣ **TestAuthenticatedRoutes** - 受保护路由测试
```
✅ test_access_authenticated_route
   │ 使用有效令牌访问受保护路由
   │ 返回200并包含用户邮箱信息
   │
✅ test_access_authenticated_route_without_token
   │ 无令牌访问受保护路由失败
   │ 返回403 Forbidden
   │
✅ test_access_authenticated_route_with_invalid_token
   │ 使用无效令牌访问失败
   │ 返回403 Forbidden
```

#### 4️⃣ **TestUserManagement** - 用户管理操作
```
✅ test_get_current_user
   │ 获取当前认证用户信息
   │ 验证邮箱等用户数据
   │
✅ test_update_user
   │ 更新用户信息（如邮箱）
   │ 返回更新后的用户数据
   │
✅ test_list_users
   │ 列出所有用户
   │ 返回用户列表
```

#### 5️⃣ **TestPasswordReset** - 密码重置
```
✅ test_forgot_password_request
   │ 请求密码重置
   │ 返回200或202状态码
```

#### 6️⃣ **TestUserVerification** - 邮箱验证
```
✅ test_request_verify_email
   │ 请求邮箱验证
   │ 返回200或202状态码
```

#### 7️⃣ **TestErrorHandling** - 错误处理
```
✅ test_missing_required_fields
   │ 缺少必需字段处理
   │ 返回422验证错误
   │
✅ test_malformed_json
   │ 格式错误的JSON处理
   │ 返回400或422错误
```

### test_authentication_integration.py - 集成测试（40+个测试用例）

#### 1️⃣ **TestCompleteUserJourney** - 完整用户流程
```
✅ test_user_signup_and_login_flow
   │ 1. 用户注册
   │ 2. 尝试错误密码登录
   │ 3. 正确密码登录
   │ 4. 使用令牌访问受保护路由
   │ 5. 获取用户详情
   │ ✓ 验证整个流程的正确性
```

#### 2️⃣ **TestMultipleUsers** - 多用户场景
```
✅ test_multiple_users_isolation
   │ 验证用户之间的数据隔离
   │ 每个用户只能看到自己的信息
   │
✅ test_list_users_contains_all_registered_users
   │ 验证用户列表包含所有注册用户
```

#### 3️⃣ **TestTokenValidation** - 令牌验证
```
✅ test_token_expires
   │ 测试令牌有效性
   │
✅ test_malformed_token_rejected
   │ 验证格式错误的令牌被拒绝
   │
✅ test_wrong_token_type_rejected
   │ 验证错误的授权方式被拒绝
```

#### 4️⃣ **TestUserUpdate** - 用户更新
```
✅ test_user_can_update_own_profile
   │ 用户可以更新自己的资料
```

#### 5️⃣ **TestConcurrentAccess** - 并发访问
```
✅ test_multiple_simultaneous_logins
   │ 测试多用户同时登录
   │ 验证并发操作的正确性
```

## 🔧 使用run_tests.py脚本

### 基本用法

```bash
# 运行所有测试
python run_tests.py

# 详细模式
python run_tests.py --verbose

# 显示输出
python run_tests.py --show-output

# 生成覆盖率报告
python run_tests.py --coverage

# 运行特定测试类
python run_tests.py --specific TestUserRegistration

# 快速模式（首次失败停止）
python run_tests.py --fast

# 组合选项
python run_tests.py --verbose --coverage --show-output
```

### 脚本选项

| 选项 | 简写 | 说明 |
|------|------|------|
| `--verbose` | `-v` | 显示每个测试的详细信息 |
| `--coverage` | `-c` | 生成代码覆盖率报告 |
| `--specific` | `-s` | 运行特定的测试类 |
| `--markers` | `-m` | 运行匹配特定标记的测试 |
| `--stop-on-failure` | `-x` | 首次失败时停止 |
| `--show-output` | `-o` | 显示print和logging输出 |
| `--fast` | - | 快速模式（等同于-x） |

## 🏗️ 测试架构

### 数据库配置

所有测试使用**内存SQLite数据库**：
```python
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"
```

**优点：**
- ✅ 测试之间完全隔离
- ✅ 极快的执行速度
- ✅ 不污染真实数据库
- ✅ 支持并发测试

### Fixtures（测试夹具）

```python
@pytest.fixture
async def setup_test_db():
    """创建和配置测试数据库"""
    # 创建引擎
    # 创建表
    # 覆盖依赖
    yield engine
    # 清理

@pytest.fixture
async def client(setup_test_db):
    """创建异步测试客户端"""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
async def authenticated_client(client):
    """创建已认证的测试客户端"""
    # 注册用户
    # 登录获取令牌
    # 设置授权头
    yield client
```

## 📝 编写新测试

### 模板

```python
class TestNewFeature:
    """测试新功能的简要说明。"""
    
    @pytest.fixture
    async def setup(self, client):
        """设置测试数据。"""
        # 创建必要的数据
        pass
    
    @pytest.mark.asyncio
    async def test_feature_success(self, client, setup):
        """测试功能成功情况。"""
        # 执行操作
        response = await client.get("/endpoint")
        
        # 验证结果
        assert response.status_code == 200
        assert response.json()["key"] == "expected_value"
    
    @pytest.mark.asyncio
    async def test_feature_error(self, client):
        """测试功能错误处理。"""
        # 执行操作
        response = await client.get("/invalid")
        
        # 验证错误
        assert response.status_code == 404
```

## 🔍 常见测试场景

### 场景1：完整的注册→登录→访问受保护路由

```python
@pytest.mark.asyncio
async def test_user_complete_flow(client):
    # 1. 注册
    register_resp = await client.post(
        "/auth/register",
        json={"email": "test@example.com", "password": "secret"}
    )
    assert register_resp.status_code == 201
    
    # 2. 登录
    login_resp = await client.post(
        "/auth/jwt/login",
        data={"username": "test@example.com", "password": "secret"}
    )
    token = login_resp.json()["access_token"]
    
    # 3. 访问受保护路由
    client.headers["Authorization"] = f"Bearer {token}"
    protected_resp = await client.get("/authenticated-route")
    assert protected_resp.status_code == 200
```

### 场景2：测试错误处理

```python
@pytest.mark.asyncio
async def test_invalid_credentials(client):
    # 尝试用错误凭证登录
    response = await client.post(
        "/auth/jwt/login",
        data={"username": "user@example.com", "password": "wrong"}
    )
    assert response.status_code == 400
```

### 场景3：测试用户隔离

```python
@pytest.mark.asyncio
async def test_user_data_isolation(client):
    # 创建两个用户
    user1 = await create_and_login(client, "user1@test.com")
    user2 = await create_and_login(client, "user2@test.com")
    
    # 验证用户1看到的是自己的数据
    # 验证用户2看到的是自己的数据
```

## 📈 生成覆盖率报告

```bash
# 使用run_tests.py脚本
python run_tests.py --coverage

# 或直接使用pytest（需要pytest-cov）
pytest tests/ --cov=src.authentication --cov-report=html --cov-report=term-missing
```

这将生成：
- HTML报告：`htmlcov/index.html`
- Terminal报告：显示缺少的代码行

## 🐛 调试测试

### 显示所有输出

```bash
pytest tests/ -v -s
```

### 使用pdb调试

```python
@pytest.mark.asyncio
async def test_something(client):
    # ... 代码 ...
    breakpoint()  # 在此处停止
    # ... 继续 ...
```

然后运行：
```bash
pytest tests/test_authentication.py::TestSomething::test_something -s
```

## ⚙️ CI/CD集成

### GitHub Actions示例

```yaml
name: Authentication Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.13']
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      
      - name: Install dependencies
        run: |
          pip install -e .
          pip install pytest pytest-asyncio httpx
      
      - name: Run tests
        run: pytest tests/ -v --cov=src.authentication
```

## 🚨 故障排除

### 问题1：ImportError: No module named 'pytest'
**解决方案：**
```bash
pip install pytest pytest-asyncio httpx
```

### 问题2：RuntimeError: Event loop is closed
**解决方案：** 已在conftest.py中通过`event_loop`fixture处理

### 问题3：Tests hang（测试卡住）
**解决方案：**
```bash
# 增加超时
pytest tests/ --timeout=10
```

## 📚 更多资源

- [Pytest 文档](https://docs.pytest.org/)
- [pytest-asyncio 文档](https://pytest-asyncio.readthedocs.io/)
- [FastAPI 测试文档](https://fastapi.tiangolo.com/advanced/testing-dependencies/)
- [FastAPI-Users 文档](https://fastapi-users.github.io/)

## 📊 测试统计

| 指标 | 值 |
|------|-----|
| 总测试文件 | 2 |
| 总测试类 | 12 |
| 总测试方法 | 40+ |
| 代码覆盖范围 | src/authentication/* |
| 平均执行时间 | < 5秒 |

## ✅ 最佳实践

1. **保持测试独立** - 不要在测试之间创建依赖关系
2. **使用fixtures** - 重用测试配置和数据
3. **清晰的命名** - 测试名称应描述测试内容
4. **单一职责** - 每个测试只测试一个功能
5. **异常处理** - 测试异常情况和边界情况
6. **文档化** - 使用docstring解释复杂的测试逻辑
7. **定期运行** - 在提交前运行完整测试套件

## 📞 支持

如有问题，请检查：
- 是否安装了所有依赖
- Python版本是否为3.13+
- 测试数据库是否正确初始化
- 异步与同步代码的混合状态

---

**最后更新：** 2026-02-13  
**主要测试框架：** pytest + pytest-asyncio + httpx
