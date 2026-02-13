"""
Pytest configuration for authentication tests.

Provides shared fixtures and configurations for all tests.
"""

import pytest
import asyncio


# Configure pytest-asyncio
pytest_plugins = ("pytest_asyncio",)


@pytest.fixture(scope="session")
def event_loop():
    """Create and set the event loop for async tests."""
    policy = asyncio.get_event_loop_policy()
    loop = policy.new_event_loop()
    yield loop
    loop.close()
