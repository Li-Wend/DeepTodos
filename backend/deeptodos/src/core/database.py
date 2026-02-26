from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL = "sqlite+aiosqlite:///./deeptodos.sqlite3"


class Base(DeclarativeBase):
    """Base declarative class for SQLAlchemy models."""


# Engine and session factory
engine = create_async_engine(DATABASE_URL)
async_session_factory = async_sessionmaker(engine, expire_on_commit=False)


async def create_db_and_tables() -> None:
    """Create database tables using SQLAlchemy metadata."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Yield an async SQLAlchemy session.

    This is intended to be used as a FastAPI dependency.
    """
    async with async_session_factory() as session:
        yield session
