from app.db.base_class import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    website = Column(String)
    industry = Column(String, index=True)
    size = Column(String)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    prospects = relationship("Prospect", back_populates="company")


class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    job_title = Column(String)
    seniority = Column(String)
    phone = Column(String)
    linkedin_url = Column(String)
    twitter_handle = Column(String)
    location = Column(String)
    notes = Column(Text)
    company_id = Column(Integer, ForeignKey("companies.id"))
    segment_id = Column(Integer, ForeignKey("prospect_segments.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    company = relationship("Company", back_populates="prospects")
    segment = relationship("ProspectSegment", back_populates="prospects")
    emails = relationship("Email", back_populates="prospect")


class ProspectSegment(Base):
    __tablename__ = "prospect_segments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    prospects = relationship("Prospect", back_populates="segment")
