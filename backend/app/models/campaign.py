from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.base_class import Base

class CampaignStatusEnum(str, enum.Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    status = Column(Enum(CampaignStatusEnum), default=CampaignStatusEnum.DRAFT)
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    template_id = Column(Integer, ForeignKey("email_templates.id"), nullable=True)
    segment_id = Column(Integer, ForeignKey("prospect_segments.id"), nullable=True)
    settings = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    template = relationship("EmailTemplate")
    segment = relationship("ProspectSegment")
    emails = relationship("Email", back_populates="campaign") 