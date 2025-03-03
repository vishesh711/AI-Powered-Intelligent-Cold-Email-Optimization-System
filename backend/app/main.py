from app.core.config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Allow requests from the frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Add additional origins here if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Only allow these origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the AI Cold Email Optimization System API"}


# Import and include API router
# Uncomment when api.py is created
# from app.api.api_v1.api import api_router
# app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# (Optional) Example endpoint to serve dashboard data
@app.get("/api/v1/dashboard-stats")
async def get_dashboard_stats():
    # Return your real-time dashboard data here
    return {
        "activeCampaigns": 12,
        "activeCampaignChange": 23.36,
        "emailsSent": 2543,
        "emailsSentChange": 12.05,
        "openRate": 42.3,
        "openRateChange": 9.05,
        "meetingsBooked": 28,
        "meetingsBookedChange": 18.87,
    }
