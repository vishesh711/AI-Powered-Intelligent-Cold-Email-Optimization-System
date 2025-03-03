import logging

from app import crud, schemas
from app.core.config import settings
from app.db import base  # noqa: F401
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)

# Make sure all SQL Alchemy models are imported before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
from app.models import user, prospect, campaign, email  # noqa


def init_db(db: Session) -> None:
    # Create super user if it doesn't exist
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER_EMAIL)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER_EMAIL,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            first_name="Admin",
            last_name="User",
        )
        user = crud.user.create(db, obj_in=user_in)
        logger.info(f"Superuser {settings.FIRST_SUPERUSER_EMAIL} created")
    else:
        logger.info(f"Superuser {settings.FIRST_SUPERUSER_EMAIL} already exists")
