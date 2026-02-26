from fastapi import FastAPI

from src.lifecycle import lifespan

from src.authentication.routers import include_auth_routers
from src.deeptodos.routers import include_todo_routers


app = FastAPI(lifespan=lifespan)


# Register routers from separate module for clarity and extensibility
# This keeps the main app file clean and allows for better organization as the app grows.

# Include authentication routers
include_auth_routers(app)

# Include todo routers
include_todo_routers(app)

# ... include other routers here as needed