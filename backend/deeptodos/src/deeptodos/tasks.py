from sqlalchemy import Column, String, Boolean, DateTime, Integer, func, Uuid
import uuid
from datetime import datetime
from src.core.database import Base


class Task(Base):
    """
    任务数据模型
    """

    __tablename__ = "tasks"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(String(2000))
    is_completed = Column(Boolean, default=False, index=True)
    priority = Column(Integer, default=1, index=True)  # 1-低, 2-中, 3-高
    category = Column(String(100), default="未分类", index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    def __repr__(self):
        return f"<Task(id={self.id}, title={self.title})>"
