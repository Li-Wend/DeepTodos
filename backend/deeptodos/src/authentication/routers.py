from fastapi import FastAPI, Depends

from src.authentication.schemas import UserCreate, UserRead, UserUpdate
from src.authentication.users import (
    User,
    auth_backend,
    fastapi_users,
    current_active_user,
)


def include_auth_routers(app: FastAPI) -> None:
    """Register authentication-related routers on the FastAPI app."""
    app.include_router(
        fastapi_users.get_auth_router(auth_backend),
        prefix="/auth/jwt",
        tags=["authentication"],
    )
    app.include_router(
        fastapi_users.get_register_router(UserRead, UserCreate),
        prefix="/auth",
        tags=["authentication"],
    )
    app.include_router(
        fastapi_users.get_reset_password_router(),
        prefix="/auth",
        tags=["authentication"],
    )
    app.include_router(
        fastapi_users.get_verify_router(UserRead),
        prefix="/auth",
        tags=["authentication"],
    )
    app.include_router(
        fastapi_users.get_users_router(UserRead, UserUpdate),
        prefix="/users",
        tags=["users"],
    )

    # A small authenticated route moved from app.py for better organization
    @app.get("/authenticated-route", tags=["authentication"])
    async def authenticated_route(user: User = Depends(current_active_user)) -> dict:
        return {"message": f"Hello {user.email}!"}
