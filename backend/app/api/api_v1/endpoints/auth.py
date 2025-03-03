from datetime import timedelta
from typing import Any

from app import crud, models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/login", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/demo-login", response_model=schemas.Token)
def demo_login() -> Any:
    """
    Get a demo access token for testing.
    """
    # In a real implementation, this would create a temporary user or use a demo account
    # For now, just return a token with a fixed user ID
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            999, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/register", response_model=schemas.User)
def register_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
) -> Any:
    """
    Register a new user.
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists",
        )

    user = crud.user.create(db, obj_in=user_in)
    return user


@router.post("/password-recovery/{email}", response_model=schemas.Msg)
def recover_password(email: str, db: Session = Depends(deps.get_db)) -> Any:
    """
    Password recovery.
    """
    user = crud.user.get_by_email(db, email=email)
    if not user:
        # Don't reveal that the user doesn't exist
        return {"msg": "Password recovery email sent"}

    # In a real implementation, this would send an email with a password reset link
    # For now, just return a success message
    return {"msg": "Password recovery email sent"}


@router.post("/reset-password", response_model=schemas.Msg)
def reset_password(
    *,
    db: Session = Depends(deps.get_db),
    token: str,
    new_password: str,
) -> Any:
    """
    Reset password.
    """
    # In a real implementation, this would verify the token and update the user's password
    # For now, just return a success message
    return {"msg": "Password updated successfully"}
