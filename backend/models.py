from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, func
from database import Base
from sqlalchemy import DateTime

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=func.now())
