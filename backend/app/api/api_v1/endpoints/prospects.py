from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, File, UploadFile
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.services.segmentation_service import segmentation_service

router = APIRouter()

@router.get("/", response_model=List[schemas.Prospect])
def get_prospects(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    company: Optional[str] = None,
    industry: Optional[str] = None,
    segment_id: Optional[int] = None,
) -> Any:
    """
    Retrieve prospects with optional filtering.
    """
    return crud.prospect.get_multi(
        db, 
        skip=skip, 
        limit=limit,
        search=search,
        company=company,
        industry=industry,
        segment_id=segment_id
    )

@router.post("/", response_model=schemas.Prospect)
def create_prospect(
    *,
    db: Session = Depends(deps.get_db),
    prospect_in: schemas.ProspectCreate,
) -> Any:
    """
    Create new prospect.
    """
    prospect = crud.prospect.create(db=db, obj_in=prospect_in)
    return prospect

@router.get("/{prospect_id}", response_model=schemas.Prospect)
def get_prospect(
    *,
    db: Session = Depends(deps.get_db),
    prospect_id: int,
) -> Any:
    """
    Get prospect by ID.
    """
    prospect = crud.prospect.get(db=db, id=prospect_id)
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    return prospect

@router.put("/{prospect_id}", response_model=schemas.Prospect)
def update_prospect(
    *,
    db: Session = Depends(deps.get_db),
    prospect_id: int,
    prospect_in: schemas.ProspectUpdate,
) -> Any:
    """
    Update a prospect.
    """
    prospect = crud.prospect.get(db=db, id=prospect_id)
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    prospect = crud.prospect.update(db=db, db_obj=prospect, obj_in=prospect_in)
    return prospect

@router.delete("/{prospect_id}", response_model=schemas.Prospect)
def delete_prospect(
    *,
    db: Session = Depends(deps.get_db),
    prospect_id: int,
) -> Any:
    """
    Delete a prospect.
    """
    prospect = crud.prospect.get(db=db, id=prospect_id)
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    prospect = crud.prospect.remove(db=db, id=prospect_id)
    return prospect

@router.post("/upload-csv", response_model=schemas.ProspectImportResponse)
def upload_prospects_csv(
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
) -> Any:
    """
    Import prospects from CSV file.
    """
    # Implementation would parse CSV and create prospects
    # For now, return a placeholder response
    return {
        "total_rows": 100,
        "imported": 95,
        "errors": 5,
        "error_details": ["Row 12: Missing email", "Row 45: Invalid email format"]
    }

@router.post("/segment", response_model=schemas.SegmentationResult)
def segment_prospects(
    *,
    db: Session = Depends(deps.get_db),
    segmentation_params: schemas.SegmentationParams,
) -> Any:
    """
    Segment prospects using machine learning.
    """
    # Get prospect data from database
    prospects = crud.prospect.get_multi(db=db, limit=1000)
    
    # Convert to format expected by segmentation service
    prospect_data = [
        {
            "id": p.id,
            "company_size": p.company.size if p.company else None,
            "industry": p.company.industry if p.company else None,
            "job_title": p.job_title,
            "seniority": p.seniority,
            "location": p.location,
            # Add other relevant features
        }
        for p in prospects
    ]
    
    # Perform segmentation
    result = segmentation_service.segment_prospects(
        prospect_data=prospect_data,
        algorithm=segmentation_params.algorithm,
        n_clusters=segmentation_params.n_clusters,
        params=segmentation_params.params
    )
    
    return result 