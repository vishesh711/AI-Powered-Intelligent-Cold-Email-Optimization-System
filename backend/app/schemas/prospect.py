from typing import Optional, List, Dict, Any
from pydantic import BaseModel, EmailStr, HttpUrl, validator
import re

class CompanyBase(BaseModel):
    name: str
    website: Optional[HttpUrl] = None
    industry: Optional[str] = None
    size: Optional[str] = None
    description: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(CompanyBase):
    name: Optional[str] = None

class Company(CompanyBase):
    id: int

    class Config:
        orm_mode = True

class ProspectBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    job_title: Optional[str] = None
    seniority: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[HttpUrl] = None
    twitter_handle: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None
    company_id: Optional[int] = None

    @validator('twitter_handle')
    def validate_twitter_handle(cls, v):
        if v and not re.match(r'^@?[a-zA-Z0-9_]{1,15}$', v):
            raise ValueError('Invalid Twitter handle')
        return v.lstrip('@') if v else v

class ProspectCreate(ProspectBase):
    company: Optional[CompanyCreate] = None

class ProspectUpdate(ProspectBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    company: Optional[CompanyUpdate] = None

class Prospect(ProspectBase):
    id: int
    company: Optional[Company] = None
    segment_id: Optional[int] = None

    class Config:
        orm_mode = True

class ProspectSegment(BaseModel):
    segment_id: int
    name: str
    description: Optional[str] = None
    size: int
    prospects: Optional[List[Prospect]] = None

class SegmentationParams(BaseModel):
    algorithm: str = "kmeans"
    n_clusters: int = 5
    params: Optional[Dict[str, Any]] = None

class SegmentationResult(BaseModel):
    segments: List[ProspectSegment]
    visualization_data: Optional[Dict[str, Any]] = None
    n_clusters: int
    algorithm: str

class ProspectImportResponse(BaseModel):
    total_rows: int
    imported: int
    errors: int
    error_details: Optional[List[str]] = None 