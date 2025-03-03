from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.services.email_service import email_service

router = APIRouter()

@router.get("/", response_model=List[schemas.Email])
def get_emails(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    campaign_id: Optional[int] = None,
    prospect_id: Optional[int] = None,
    status: Optional[str] = None,
) -> Any:
    """
    Retrieve emails with optional filtering.
    """
    return crud.email.get_multi(
        db, 
        skip=skip, 
        limit=limit,
        campaign_id=campaign_id,
        prospect_id=prospect_id,
        status=status
    )

@router.post("/", response_model=schemas.Email)
def create_email(
    *,
    db: Session = Depends(deps.get_db),
    email_in: schemas.EmailCreate,
) -> Any:
    """
    Create new email.
    """
    email = crud.email.create(db=db, obj_in=email_in)
    return email

@router.get("/{email_id}", response_model=schemas.Email)
def get_email(
    *,
    db: Session = Depends(deps.get_db),
    email_id: int,
) -> Any:
    """
    Get email by ID.
    """
    email = crud.email.get(db=db, id=email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    return email

@router.put("/{email_id}", response_model=schemas.Email)
def update_email(
    *,
    db: Session = Depends(deps.get_db),
    email_id: int,
    email_in: schemas.EmailUpdate,
) -> Any:
    """
    Update an email.
    """
    email = crud.email.get(db=db, id=email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    email = crud.email.update(db=db, db_obj=email, obj_in=email_in)
    return email

@router.delete("/{email_id}", response_model=schemas.Email)
def delete_email(
    *,
    db: Session = Depends(deps.get_db),
    email_id: int,
) -> Any:
    """
    Delete an email.
    """
    email = crud.email.get(db=db, id=email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    email = crud.email.remove(db=db, id=email_id)
    return email

@router.post("/send", response_model=schemas.Msg)
def send_email(
    *,
    db: Session = Depends(deps.get_db),
    email_id: int,
) -> Any:
    """
    Send an email.
    """
    email = crud.email.get(db=db, id=email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    
    # Get prospect
    prospect = crud.prospect.get(db=db, id=email.prospect_id)
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    
    # Send email
    try:
        email_service.send_email(
            to_email=prospect.email,
            to_name=f"{prospect.first_name} {prospect.last_name}",
            subject=email.subject,
            body=email.body
        )
        
        # Update email status
        email_update = schemas.EmailUpdate(status="sent")
        crud.email.update(db=db, db_obj=email, obj_in=email_update)
        
        return {"msg": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

@router.post("/send-test", response_model=schemas.Msg)
def send_test_email(
    *,
    test_email_params: schemas.TestEmailParams,
) -> Any:
    """
    Send a test email.
    """
    try:
        email_service.send_email(
            to_email=test_email_params.to_email,
            to_name=test_email_params.to_name,
            subject=test_email_params.subject,
            body=test_email_params.body
        )
        
        return {"msg": "Test email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send test email: {str(e)}")

@router.post("/track/open/{email_id}", response_model=schemas.Msg)
def track_email_open(
    *,
    db: Session = Depends(deps.get_db),
    email_id: int,
) -> Any:
    """
    Track email open event.
    """
    email = crud.email.get(db=db, id=email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    
    # Update email status
    email_update = schemas.EmailUpdate(status="opened")
    crud.email.update(db=db, db_obj=email, obj_in=email_update)
    
    return {"msg": "Email open tracked"}

@router.post("/track/click/{email_id}", response_model=schemas.Msg)
def track_email_click(
    *,
    db: Session = Depends(deps.get_db),
    email_id: int,
) -> Any:
    """
    Track email click event.
    """
    email = crud.email.get(db=db, id=email_id)
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    
    # Update email status
    email_update = schemas.EmailUpdate(status="clicked")
    crud.email.update(db=db, db_obj=email, obj_in=email_update)
    
    return {"msg": "Email click tracked"} 