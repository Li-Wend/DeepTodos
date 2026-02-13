# Authentication Tests

这个目录包含FastAPI authentication模块的自动化测试套件。

## 测试覆盖范围

### 1. **用户注册测试** (`TestUserRegistration`)
- ✅ 成功注册新用户
- ✅ 防止重复注册
- ✅ 验证邮箱格式
- ✅ 处理弱密码

### 2. **用户登录测试** (`TestUserLogin`)
- ✅ 成功登录和JWT令牌获取
- ✅ 错误密码处理
- ✅ 未注册用户登录处理

### 3. **认证路由测试** (`TestAuthenticatedRoutes`)
- ✅ 使用有效令牌访问受保护路由
- ✅ 没有令牌访问受保护路由
- ✅ 无效令牌处理

### 4. **用户管理测试** (`TestUserManagement`)
- ✅ 获取当前用户信息
- ✅ 更新用户信息
- ✅ 列出所有用户

### 5. **密码重置测试** (`TestPasswordReset`)
- ✅ 请求密码重置

### 6. **邮箱验证测试** (`TestUserVerification`)
- ✅ 请求邮箱验证

### 7. **错误处理测试** (`TestErrorHandling`)
- ✅ 缺少必需字段
- ✅ 格式错误的JSON

## 依赖项

为了运行测试，需要安装以下额外的包：

```bash
pip install pytest pytest-asyncio httpx
```

或者使用uv：

```bash
uv pip install pytest pytest-asyncio httpx
```

## 运行测试

### 运行所有测试
```bash
pytest tests/
```

### 运行特定测试类
```bash
pytest tests/test_authentication.py::TestUserRegistration
```

### 运行特定测试方法
```bash
pytest tests/test_authentication.py::TestUserRegistration::test_register_new_user
```

### 显示详细输出
```bash
pytest tests/ -v
```

### 显示print输出
```bash
pytest tests/ -s
```

### 生成覆盖率报告
```bash
pytest tests/ --cov=src.authentication --cov-report=html
```

### 运行特定标记的测试
```bash
pytest tests/ -m asyncio
```

## 测试数据库

测试使用内存中的SQLite数据库 (`sqlite+aiosqlite:///:memory:`)，确保：
- ✅ 测试之间不会产生相互影响
- ✅ 测试执行速度快
- ✅ 不需要清理真实数据库
- ✅ 支持并发测试

## 测试流程

每个测试都遵循以下流程：

1. **Setup** - 创建测试数据库和依赖项
2. **Execute** - 执行测试操作
3. **Assert** - 验证预期结果
4. **Teardown** - 清理资源和覆盖

## 认证测试流程示例

```
1. 注册用户 (POST /auth/register)
2. 登录用户 (POST /auth/jwt/login) → 获取JWT令牌
3. 使用令牌访问受保护路由 (GET /authenticated-route)
4. 验证响应内容
```

## 注意事项

- 所有HTTP测试使用 `AsyncClient` 来支持异步操作
- 测试使用 `pytest.mark.asyncio` 装饰器标记异步测试
- 每个测试都是独立的，使用自己的数据库实例
- 密码存储使用FastAPI-Users的默认密码哈希算法

## 扩展测试

要添加新的测试，请遵循以下模板：

```python
class TestNewFeature:
    """Test description."""
    
    @pytest.fixture
    async def setup_data(self, client):
        """Setup test data."""
        # Your setup code here
        pass
    
    @pytest.mark.asyncio
    async def test_new_functionality(self, client, setup_data):
        """Test description."""
        # Your test code here
        assert True
```

## CI/CD集成

这些测试可以集成到CI/CD流程中：

```bash
# GitHub Actions example
pytest tests/ --junit-xml=test-results.xml --cov=src.authentication --cov-report=xml
```

## 常见问题

**Q: 为什么某些测试被跳过？**
A: 检查是否安装了所有必需的依赖项。

**Q: 如何调试测试？**
A: 使用 `pytest -v -s` 并在代码中添加 `print()` 语句，或使用 `pdb` 调试器。

**Q: 测试执行很慢？**
A: 检查 `pyproject.toml` 中的pytest-asyncio配置。

## 许可证

与主项目相同的许可证。
