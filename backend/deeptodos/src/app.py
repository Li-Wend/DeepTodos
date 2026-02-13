from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import Depends, FastAPI

from src.db import User, create_db_and_tables
from src.authentication.schemas import UserCreate, UserRead, UserUpdate
from src.authentication.users import auth_backend, current_active_user, fastapi_users


async def _ensure_superuser_created() -> None:
    """Create a default superuser if it does not exist (run on startup)."""
    print("Create Super User admin@deeptodos.com")
    # Import inside function to avoid circular imports at module import time
    from src.authentication.create_user import create_user

    await create_user("admin@deeptodos.com", "admin", True)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # Create DB/tables then run startup tasks. Not needed with Alembic migrations.
    await create_db_and_tables()
    await _ensure_superuser_created()
    yield


app = FastAPI(lifespan=lifespan)

# Authentication and user routes
app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"]
)
app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"])
app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth", tags=["auth"])
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"]
)


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)) -> dict:
    return {"message": f"Hello {user.email}!"}