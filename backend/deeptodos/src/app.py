from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.lifecycle import lifespan
from src.authentication.routers import include_auth_routers
from src.deeptodos.routers import include_todo_routers


app = FastAPI(lifespan=lifespan)


# CORS configuration - adjust origins as needed for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],  # Allow all origins for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers from separate module for clarity and extensibility
# This keeps the main app file clean and allows for better organization as the app grows.

# Include authentication routers
include_auth_routers(app)

# Include todo routers
include_todo_routers(app)

# ... include other routers here as needed
