from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI

from src.core.database import create_db_and_tables


async def _ensure_superuser_created() -> None:
    """Create a default superuser if it does not exist (run on startup)."""
    print("Create Super User admin@deeptodos.com")
    # Import inside function to avoid circular imports at module import time
    from src.authentication.create_user import create_user

    await create_user("admin@deeptodos.com", "admin", True)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Manage application startup and shutdown events."""
    # Create DB/tables then run startup tasks. Not needed with Alembic migrations.
    await create_db_and_tables()
    await _ensure_superuser_created()
    yield
