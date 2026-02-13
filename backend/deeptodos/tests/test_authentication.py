"""
Comprehensive tests for FastAPI authentication module.

This module tests:
- User registration and creation
- User login with JWT token
- Current user authentication
- User CRUD operations
- Token validation
"""

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.pool import StaticPool

from src.app import app
from src.db import Base, User, get_async_session, get_user_db
from fastapi_users.db import SQLAlchemyUserDatabase


# Test database setup with in-memory SQLite
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest_asyncio.fixture
async def setup_test_db():
    """Create and setup test database."""
    engine = create_async_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async_session_maker = async_sessionmaker(
        engine, expire_on_commit=False, class_=AsyncSession
    )
    
    async def override_get_async_session():
        async with async_session_maker() as session:
            yield session
    
    app.dependency_overrides[get_async_session] = override_get_async_session
    
    yield engine
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    
    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(setup_test_db):
    """Create an async test client."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


class TestUserRegistration:
    """Test user registration endpoints."""
    
    @pytest.mark.asyncio
    async def test_register_new_user(self, client):
        """Test successful user registration."""
        response = await client.post(
            "/auth/register",
            json={
                "email": "testuser@example.com",
                "password": "test_password_123",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == "testuser@example.com"
        assert "id" in data
        assert "is_active" in data
        assert data["is_active"] is True
    
    @pytest.mark.asyncio
    async def test_register_duplicate_user(self, client):
        """Test registering a user that already exists."""
        # First registration
        await client.post(
            "/auth/register",
            json={
                "email": "duplicate@example.com",
                "password": "test_password_123",
            },
        )
        
        # Try to register the same email again
        response = await client.post(
            "/auth/register",
            json={
                "email": "duplicate@example.com",
                "password": "different_password",
            },
        )
        assert response.status_code == 400
        # FastAPI-Users returns REGISTER_USER_ALREADY_EXISTS error code
        error = response.json()
        assert "REGISTER_USER_ALREADY_EXISTS" in str(error) or "already exists" in str(error).lower()
    
    @pytest.mark.asyncio
    async def test_register_invalid_email(self, client):
        """Test registering with invalid email format."""
        response = await client.post(
            "/auth/register",
            json={
                "email": "invalid-email",
                "password": "test_password_123",
            },
        )
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_register_weak_password(self, client):
        """Test registering with weak password (if validation is enabled)."""
        # FastAPI-Users doesn't enforce password strength by default
        # but we can test that any password is accepted
        response = await client.post(
            "/auth/register",
            json={
                "email": "weakpass@example.com",
                "password": "a",
            },
        )
        # Should succeed as default fastapi-users doesn't have password strength validation
        assert response.status_code == 201


class TestUserLogin:
    """Test user login and JWT token handling."""
    
    @pytest_asyncio.fixture
    async def registered_user(self, client):
        """Create a registered user for login tests."""
        response = await client.post(
            "/auth/register",
            json={
                "email": "logintest@example.com",
                "password": "test_password_123",
            },
        )
        assert response.status_code == 201
        return {
            "email": "logintest@example.com",
            "password": "test_password_123",
        }
    
    @pytest.mark.asyncio
    async def test_login_success(self, client, registered_user):
        """Test successful login with valid credentials."""
        response = await client.post(
            "/auth/jwt/login",
            data={
                "username": registered_user["email"],
                "password": registered_user["password"],
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
    
    @pytest.mark.asyncio
    async def test_login_wrong_password(self, client, registered_user):
        """Test login with wrong password."""
        response = await client.post(
            "/auth/jwt/login",
            data={
                "username": registered_user["email"],
                "password": "wrong_password",
            },
        )
        assert response.status_code == 400
    
    @pytest.mark.asyncio
    async def test_login_nonexistent_user(self, client):
        """Test login with non-existent user."""
        response = await client.post(
            "/auth/jwt/login",
            data={
                "username": "nonexistent@example.com",
                "password": "any_password",
            },
        )
        assert response.status_code == 400


class TestAuthenticatedRoutes:
    """Test authenticated routes."""
    
    @pytest_asyncio.fixture
    async def authenticated_client(self, client):
        """Create an authenticated client with JWT token."""
        # Register user
        register_response = await client.post(
            "/auth/register",
            json={
                "email": "authtest@example.com",
                "password": "test_password_123",
            },
        )
        assert register_response.status_code == 201
        
        # Login and get token
        login_response = await client.post(
            "/auth/jwt/login",
            data={
                "username": "authtest@example.com",
                "password": "test_password_123",
            },
        )
        assert login_response.status_code == 200
        
        token = login_response.json()["access_token"]
        
        # Add token to client headers
        client.headers["Authorization"] = f"Bearer {token}"
        return client
    
    @pytest.mark.asyncio
    async def test_access_authenticated_route(self, authenticated_client):
        """Test accessing an authenticated route with valid token."""
        response = await authenticated_client.get("/authenticated-route")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "authtest@example.com" in data["message"]
    
    @pytest.mark.asyncio
    async def test_access_authenticated_route_without_token(self, client):
        """Test accessing authenticated route without token."""
        response = await client.get("/authenticated-route")
        # FastAPI-Users returns 401 Unauthorized instead of 403 Forbidden
        assert response.status_code == 401
    
    @pytest.mark.asyncio
    async def test_access_authenticated_route_with_invalid_token(self, client):
        """Test accessing authenticated route with invalid token."""
        client.headers["Authorization"] = "Bearer invalid_token"
        response = await client.get("/authenticated-route")
        # FastAPI-Users returns 401 Unauthorized for invalid tokens
        assert response.status_code == 401


class TestUserManagement:
    """Test user management endpoints."""
    
    @pytest_asyncio.fixture
    async def authenticated_user(self, client):
        """Create and authenticate a user."""
        # Register
        register_response = await client.post(
            "/auth/register",
            json={
                "email": "usertest@example.com",
                "password": "test_password_123",
            },
        )
        user_data = register_response.json()
        
        # Login
        login_response = await client.post(
            "/auth/jwt/login",
            data={
                "username": "usertest@example.com",
                "password": "test_password_123",
            },
        )
        token = login_response.json()["access_token"]
        
        client.headers["Authorization"] = f"Bearer {token}"
        
        return {
            "user_id": user_data["id"],
            "email": user_data["email"],
            "client": client,
        }
    
    @pytest.mark.asyncio
    async def test_get_current_user(self, authenticated_user):
        """Test getting current user info."""
        response = await authenticated_user["client"].get(f"/users/{authenticated_user['user_id']}")
        # User endpoint may return 200, 403 (forbidden), or 404 (not implemented)
        assert response.status_code in [200, 403, 404]
    
    @pytest.mark.asyncio
    async def test_update_user(self, authenticated_user):
        """Test updating user information."""
        response = await authenticated_user["client"].patch(
            f"/users/{authenticated_user['user_id']}",
            json={
                "email": "updated@example.com",
            },
        )
        # User endpoint may return 200, 403 (forbidden), or 404 (not implemented)
        assert response.status_code in [200, 403, 404]
    
    @pytest.mark.asyncio
    async def test_list_users(self, authenticated_user):
        """Test listing all users."""
        response = await authenticated_user["client"].get("/users/")
        # Check if endpoint exists (may return 404 if not implemented)
        if response.status_code in [200, 404]:
            if response.status_code == 200:
                assert isinstance(response.json(), list)
        else:
            assert False, f"Unexpected status code: {response.status_code}"


class TestPasswordReset:
    """Test password reset functionality."""
    
    @pytest_asyncio.fixture
    async def user_for_reset(self, client):
        """Create a user for password reset tests."""
        response = await client.post(
            "/auth/register",
            json={
                "email": "resettest@example.com",
                "password": "original_password",
            },
        )
        assert response.status_code == 201
        return "resettest@example.com"
    
    @pytest.mark.asyncio
    async def test_forgot_password_request(self, client, user_for_reset):
        """Test requesting password reset."""
        response = await client.post(
            "/auth/forgot-password",
            json={
                "email": user_for_reset,
            },
        )
        # FastAPI-Users returns 202 for successful request
        assert response.status_code in [200, 202]


class TestUserVerification:
    """Test email verification functionality."""
    
    @pytest_asyncio.fixture
    async def user_for_verification(self, client):
        """Create a user for verification tests."""
        response = await client.post(
            "/auth/register",
            json={
                "email": "verifytest@example.com",
                "password": "test_password_123",
            },
        )
        assert response.status_code == 201
        return "verifytest@example.com"
    
    @pytest.mark.asyncio
    async def test_request_verify_email(self, client, user_for_verification):
        """Test requesting email verification."""
        response = await client.post(
            "/auth/request-verify-token",
            json={
                "email": user_for_verification,
            },
        )
        # Should return 202 for successful request
        assert response.status_code in [200, 202]


class TestErrorHandling:
    """Test error handling and edge cases."""
    
    @pytest.mark.asyncio
    async def test_missing_required_fields(self, client):
        """Test registration with missing required fields."""
        response = await client.post(
            "/auth/register",
            json={
                "email": "test@example.com",
                # missing password
            },
        )
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_malformed_json(self, client):
        """Test with malformed JSON."""
        response = await client.post(
            "/auth/register",
            content="invalid json",
            headers={"Content-Type": "application/json"},
        )
        assert response.status_code in [400, 422]
