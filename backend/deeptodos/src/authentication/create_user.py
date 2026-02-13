import contextlib
from typing import Optional

from src.db import get_async_session, get_user_db
from src.authentication.schemas import UserCreate
from src.authentication.users import get_user_manager
from fastapi_users.exceptions import UserAlreadyExists


get_async_session_cm = contextlib.asynccontextmanager(get_async_session)
get_user_db_cm = contextlib.asynccontextmanager(get_user_db)
get_user_manager_cm = contextlib.asynccontextmanager(get_user_manager)


async def create_user(email: str, password: str, is_superuser: bool = False) -> Optional[object]:
    """Create a user using the FastAPI-Users manager.

    Returns the created user object or None if the user already exists.
    """
    try:
        async with get_async_session_cm() as session:
            async with get_user_db_cm(session) as user_db:
                async with get_user_manager_cm(user_db) as user_manager:
                    user = await user_manager.create(
                        UserCreate(email=email, password=password, is_superuser=is_superuser)
                    )
                    print(f"User created {user.email}")
                    return user
    except UserAlreadyExists:
        print(f"User {email} already exists")
        return None
