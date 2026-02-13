"""Authentication Pydantic schemas used by FastAPI-Users."""

import uuid

from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    """Schema for returning user info."""
    pass


class UserCreate(schemas.BaseUserCreate):
    """Schema for creating a new user."""
    pass


class UserUpdate(schemas.BaseUserUpdate):
    """Schema for updating an existing user."""
    pass