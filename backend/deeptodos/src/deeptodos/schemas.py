from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional
import uuid


# 基础模型
class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="任务标题")
    description: Optional[str] = Field(None, max_length=2000, description="任务描述")
    is_completed: bool = Field(False, description="是否完成")
    priority: int = Field(1, ge=1, le=3, description="优先级(1-低, 2-中, 3-高)")
    category: str = Field("未分类", max_length=100, description="任务分类")


# 创建任务模型
class TaskCreate(TaskBase):
    pass


# 更新任务模型
class TaskUpdate(BaseModel):
    model_config = ConfigDict(extra="ignore")  # 忽略未定义的字段

    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=2000)
    is_completed: Optional[bool] = None
    priority: Optional[int] = Field(None, ge=1, le=3)
    category: Optional[str] = Field(None, max_length=100)


# 返回任务模型
class Task(TaskBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


# 简要任务模型（用于列表）
class TaskSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    is_completed: bool
    priority: int
    category: str
    created_at: datetime
