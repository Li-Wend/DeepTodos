from sqlalchemy import or_, select, distinct
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
import uuid
from . import tasks, schemas


class TaskCRUD:
    """任务CRUD操作类（异步）"""
    
    @staticmethod
    async def get_task(db: AsyncSession, task_id: uuid.UUID) -> Optional[tasks.Task]:
        """根据ID获取任务"""
        stmt = select(tasks.Task).where(tasks.Task.id == task_id)
        result = await db.execute(stmt)
        return result.scalars().first()
    
    @staticmethod
    async def get_tasks(
        db: AsyncSession,
        skip: int = 0,
        limit: int = 100,
        is_completed: Optional[bool] = None,
        priority: Optional[int] = None,
        category: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[tasks.Task]:
        """获取任务列表（支持过滤和搜索）"""
        stmt = select(tasks.Task)
        
        # 应用过滤器
        if is_completed is not None:
            stmt = stmt.where(tasks.Task.is_completed == is_completed)
        if priority is not None:
            stmt = stmt.where(tasks.Task.priority == priority)
        if category is not None:
            stmt = stmt.where(tasks.Task.category == category)
        
        # 应用搜索
        if search:
            search_term = f"%{search}%"
            stmt = stmt.where(
                or_(
                    tasks.Task.title.ilike(search_term),
                    tasks.Task.description.ilike(search_term)
                )
            )
        
        # 排序和分页
        stmt = stmt.order_by(
            tasks.Task.priority.desc(),
            tasks.Task.created_at.desc()
        ).offset(skip).limit(limit)

        result = await db.execute(stmt)
        return list(result.scalars().all())
    
    @staticmethod
    async def create_task(db: AsyncSession, task: schemas.TaskCreate) -> tasks.Task:
        """创建新任务"""
        db_task = tasks.Task(**task.model_dump())
        db.add(db_task)
        await db.commit()
        await db.refresh(db_task)
        return db_task
    
    @staticmethod
    async def update_task(
        db: AsyncSession,
        task_id: uuid.UUID,
        task_update: schemas.TaskUpdate
    ) -> Optional[tasks.Task]:
        """更新任务"""
        db_task = await TaskCRUD.get_task(db, task_id)
        if not db_task:
            return None
        
        # 获取更新数据
        update_data = task_update.model_dump(exclude_unset=True)
        
        # 更新字段
        for field, value in update_data.items():
            setattr(db_task, field, value)
        
        await db.commit()
        await db.refresh(db_task)
        return db_task
    
    @staticmethod
    async def complete_task(db: AsyncSession, task_id: uuid.UUID) -> Optional[tasks.Task]:
        db_task = await TaskCRUD.get_task(db, task_id)
        if not db_task:
            return None
        
        update_data = {"is_completed": True}
        for field, value in update_data.items():
            setattr(db_task, field, value)
        await db.commit()
        await db.refresh(db_task)
        return db_task

    @staticmethod
    async def delete_task(db: AsyncSession, task_id: uuid.UUID) -> bool:
        """删除任务"""
        db_task = await TaskCRUD.get_task(db, task_id)
        if not db_task:
            return False
        
        await db.delete(db_task)
        await db.commit()
        return True
    
    @staticmethod
    async def get_categories(db: AsyncSession) -> List[str]:
        """获取所有分类"""
        stmt = select(distinct(tasks.Task.category))
        result = await db.execute(stmt)
        return [row[0] for row in result.all()]


# 创建实例
task_crud = TaskCRUD()