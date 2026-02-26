from fastapi import APIRouter, Depends, FastAPI, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
import uuid
from . import schemas, helper
from src.core.database import get_async_session

def include_todo_routers(app: FastAPI) -> None:
    """Register deeptodos-related routers on the FastAPI app."""
    @app.post("/deeptodos/create-task",response_model=schemas.Task, status_code=status.HTTP_201_CREATED, tags=["deeptodos"])
    async def create_task(
        task: schemas.TaskCreate,
        db: AsyncSession = Depends(get_async_session)
    ):
        """创建新任务"""
        return await helper.task_crud.create_task(db, task)


    @app.get("/deeptodos/read-tasks", response_model=List[schemas.Task], tags=["deeptodos"])
    async def read_tasks(
        skip: int = Query(0, ge=0, description="跳过的记录数"),
        limit: int = Query(100, ge=1, le=100, description="返回的记录数"),
        is_completed: Optional[bool] = Query(None, description="按完成状态过滤"),
        priority: Optional[int] = Query(None, ge=1, le=3, description="按优先级过滤"),
        category: Optional[str] = Query(None, description="按分类过滤"),
        search: Optional[str] = Query(None, description="搜索标题或描述"),
        db: AsyncSession = Depends(get_async_session)
    ):
        """获取任务列表（支持过滤和搜索）"""
        return await helper.task_crud.get_tasks(
            db, skip=skip, limit=limit,
            is_completed=is_completed,
            priority=priority,
            category=category,
            search=search
        )


    @app.get("/deeptodos/read-tasks-summary", response_model=List[schemas.TaskSummary], tags=["deeptodos"])
    async def read_tasks_summary(
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=100),
        db: AsyncSession = Depends(get_async_session)
    ):
        """获取简要任务列表"""
        return await helper.task_crud.get_tasks(db, skip=skip, limit=limit)


    @app.get("/deeptodos/read-categories", response_model=List[str], tags=["deeptodos"])
    async def read_categories(db: AsyncSession = Depends(get_async_session)):
        """获取所有分类"""
        return await helper.task_crud.get_categories(db)


    @app.get("/deeptodos/read-task/{task_id}", response_model=schemas.Task, tags=["deeptodos"])
    async def read_task(task_id: uuid.UUID, db: AsyncSession = Depends(get_async_session)):
        """根据ID获取任务"""
        task = await helper.task_crud.get_task(db, task_id)
        if task is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with id {task_id} not found"
            )
        return task


    @app.patch("/deeptodos/update-task/{task_id}", response_model=schemas.Task, tags=["deeptodos"])
    async def update_task(
        task_id: uuid.UUID,
        task_update: schemas.TaskUpdate,
        db: AsyncSession = Depends(get_async_session)
    ):
        """更新任务"""
        task = await helper.task_crud.update_task(db, task_id, task_update)
        if task is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with id {task_id} not found"
            )
        return task


    @app.delete("/deeptodos/delete-task/{task_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["deeptodos"])
    async def delete_task(task_id: uuid.UUID, db: AsyncSession = Depends(get_async_session)):
        """删除任务"""
        if not await helper.task_crud.delete_task(db, task_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with id {task_id} not found"
            )
        return None


    @app.post("/deeptodos/complete-task/{task_id}", response_model=schemas.Task, tags=["deeptodos"])
    async def complete_task(task_id: uuid.UUID, db: AsyncSession = Depends(get_async_session)):
        """标记任务为完成"""
        task = await helper.task_crud.complete_task(db, task_id)
        if task is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with id {task_id} not found"
            )
        return task