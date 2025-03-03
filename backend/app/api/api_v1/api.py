from app.api.api_v1.endpoints import auth, emails
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(emails.router, prefix="/emails", tags=["emails"])
