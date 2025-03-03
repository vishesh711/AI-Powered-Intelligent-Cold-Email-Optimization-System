from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, validator


class CampaignStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ARCHIVED = "archived"


class CampaignBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: CampaignStatus = CampaignStatus.DRAFT
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    template_id: Optional[int] = None
    segment_id: Optional[int] = None
    settings: Optional[Dict[str, Any]] = None

    @validator("settings")
    def validate_settings(cls, v):
        if v is None:
            return {
                "send_time": "9:00",
                "timezone": "UTC",
                "max_emails_per_day": 50,
                "follow_up_days": [3, 7, 14],
                "track_opens": True,
                "track_clicks": True,
            }
        return v


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(CampaignBase):
    name: Optional[str] = None


class Campaign(CampaignBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class CampaignWithStats(Campaign):
    total_prospects: int
    emails_sent: int
    emails_opened: int
    emails_clicked: int
    emails_replied: int
    meetings_booked: int
