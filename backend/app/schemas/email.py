from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr
from enum import Enum

class EmailStatus(str, Enum):
    DRAFT = "draft"
    SCHEDULED = "scheduled"
    SENT = "sent"
    OPENED = "opened"
    CLICKED = "clicked"
    REPLIED = "replied"
    BOUNCED = "bounced"
    FAILED = "failed"

class EmailBase(BaseModel):
    prospect_id: int
    campaign_id: Optional[int] = None
    subject: str
    body: str
    status: EmailStatus = EmailStatus.DRAFT
    scheduled_time: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = None

class EmailCreate(EmailBase):
    pass

class EmailUpdate(EmailBase):
    prospect_id: Optional[int] = None
    subject: Optional[str] = None
    body: Optional[str] = None
    status: Optional[EmailStatus] = None

class Email(EmailBase):
    id: int
    created_at: datetime
    updated_at: datetime
    sent_at: Optional[datetime] = None
    opened_at: Optional[datetime] = None
    clicked_at: Optional[datetime] = None
    replied_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class EmailGenerationParams(BaseModel):
    prospect_info: Dict[str, Any]
    campaign_context: Dict[str, Any]
    tone: Optional[str] = "professional"
    length: Optional[str] = "medium"
    instructions: Optional[str] = None

class EmailGenerationResponse(BaseModel):
    subject: str
    body: str
    variations: Optional[List[Dict[str, str]]] = None

class EmailImprovementType(str, Enum):
    CLARITY = "clarity"
    BREVITY = "brevity"
    PERSUASIVENESS = "persuasiveness"
    PERSONALIZATION = "personalization"
    TONE = "tone"

class EmailImprovementParams(BaseModel):
    original_content: str
    improvement_type: EmailImprovementType
    instructions: Optional[str] = None

class EmailImprovementResponse(BaseModel):
    improved_content: str
    changes: List[Dict[str, Any]]
    explanation: str

class EmailTemplateBase(BaseModel):
    name: str
    description: Optional[str] = None
    subject: str
    body: str
    tags: Optional[List[str]] = None

class EmailTemplateCreate(EmailTemplateBase):
    pass

class EmailTemplateUpdate(EmailTemplateBase):
    name: Optional[str] = None
    subject: Optional[str] = None
    body: Optional[str] = None

class EmailTemplate(EmailTemplateBase):
    id: int
    created_at: datetime
    updated_at: datetime
    performance: Optional[Dict[str, Any]] = None

    class Config:
        orm_mode = True 