from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Campaign])
def get_campaigns(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
) -> Any:
    """
    Retrieve campaigns with optional filtering.
    """
    return crud.campaign.get_multi(
        db, 
        skip=skip, 
        limit=limit,
        status=status
    )

@router.post("/", response_model=schemas.Campaign)
def create_campaign(
    *,
    db: Session = Depends(deps.get_db),
    campaign_in: schemas.CampaignCreate,
) -> Any:
    """
    Create new campaign.
    """
    campaign = crud.campaign.create(db=db, obj_in=campaign_in)
    return campaign

@router.get("/{campaign_id}", response_model=schemas.Campaign)
def get_campaign(
    *,
    db: Session = Depends(deps.get_db),
    campaign_id: int,
) -> Any:
    """
    Get campaign by ID.
    """
    campaign = crud.campaign.get(db=db, id=campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.put("/{campaign_id}", response_model=schemas.Campaign)
def update_campaign(
    *,
    db: Session = Depends(deps.get_db),
    campaign_id: int,
    campaign_in: schemas.CampaignUpdate,
) -> Any:
    """
    Update a campaign.
    """
    campaign = crud.campaign.get(db=db, id=campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    campaign = crud.campaign.update(db=db, db_obj=campaign, obj_in=campaign_in)
    return campaign

@router.delete("/{campaign_id}", response_model=schemas.Campaign)
def delete_campaign(
    *,
    db: Session = Depends(deps.get_db),
    campaign_id: int,
) -> Any:
    """
    Delete a campaign.
    """
    campaign = crud.campaign.get(db=db, id=campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    campaign = crud.campaign.remove(db=db, id=campaign_id)
    return campaign

@router.post("/{campaign_id}/start", response_model=schemas.Campaign)
def start_campaign(
    *,
    db: Session = Depends(deps.get_db),
    campaign_id: int,
) -> Any:
    """
    Start a campaign.
    """
    campaign = crud.campaign.get(db=db, id=campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Update campaign status to "active"
    campaign_update = schemas.CampaignUpdate(status="active")
    campaign = crud.campaign.update(db=db, db_obj=campaign, obj_in=campaign_update)
    
    # In a real implementation, this would trigger the campaign execution
    
    return campaign

@router.post("/{campaign_id}/pause", response_model=schemas.Campaign)
def pause_campaign(
    *,
    db: Session = Depends(deps.get_db),
    campaign_id: int,
) -> Any:
    """
    Pause a campaign.
    """
    campaign = crud.campaign.get(db=db, id=campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Update campaign status to "paused"
    campaign_update = schemas.CampaignUpdate(status="paused")
    campaign = crud.campaign.update(db=db, db_obj=campaign, obj_in=campaign_update)
    
    return campaign 