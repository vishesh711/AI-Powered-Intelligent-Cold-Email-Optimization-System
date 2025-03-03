from typing import Any, List, Optional

from app import crud, models, schemas
from app.api import deps
from app.services.llm_service import llm_service
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/", response_model=List[schemas.EmailTemplate])
def get_templates(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    tag: Optional[str] = None,
) -> Any:
    """
    Retrieve email templates with optional filtering.
    """
    return crud.template.get_multi(db, skip=skip, limit=limit, tag=tag)


@router.post("/", response_model=schemas.EmailTemplate)
def create_template(
    *,
    db: Session = Depends(deps.get_db),
    template_in: schemas.EmailTemplateCreate,
) -> Any:
    """
    Create new email template.
    """
    template = crud.template.create(db=db, obj_in=template_in)
    return template


@router.get("/{template_id}", response_model=schemas.EmailTemplate)
def get_template(
    *,
    db: Session = Depends(deps.get_db),
    template_id: int,
) -> Any:
    """
    Get email template by ID.
    """
    template = crud.template.get(db=db, id=template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Email template not found")
    return template


@router.put("/{template_id}", response_model=schemas.EmailTemplate)
def update_template(
    *,
    db: Session = Depends(deps.get_db),
    template_id: int,
    template_in: schemas.EmailTemplateUpdate,
) -> Any:
    """
    Update an email template.
    """
    template = crud.template.get(db=db, id=template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Email template not found")
    template = crud.template.update(db=db, db_obj=template, obj_in=template_in)
    return template


@router.delete("/{template_id}", response_model=schemas.EmailTemplate)
def delete_template(
    *,
    db: Session = Depends(deps.get_db),
    template_id: int,
) -> Any:
    """
    Delete an email template.
    """
    template = crud.template.get(db=db, id=template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Email template not found")
    template = crud.template.remove(db=db, id=template_id)
    return template


@router.post("/generate", response_model=schemas.EmailGenerationResponse)
def generate_email_content(
    *,
    generation_params: schemas.EmailGenerationParams,
) -> Any:
    """
    Generate email content using AI.
    """
    # Call LLM service to generate email content
    generated_content = llm_service.generate_email(
        prospect_info=generation_params.prospect_info,
        campaign_context=generation_params.campaign_context,
        tone=generation_params.tone,
        length=generation_params.length,
        instructions=generation_params.instructions,
    )

    return {
        "subject": generated_content.get("subject", ""),
        "body": generated_content.get("body", ""),
        "variations": generated_content.get("variations", []),
    }


@router.post("/improve", response_model=schemas.EmailImprovementResponse)
def improve_email_content(
    *,
    improvement_params: schemas.EmailImprovementParams,
) -> Any:
    """
    Improve existing email content using AI.
    """
    # Call LLM service to improve email content
    improved_content = llm_service.improve_email(
        original_content=improvement_params.original_content,
        improvement_type=improvement_params.improvement_type,
        instructions=improvement_params.instructions,
    )

    return {
        "improved_content": improved_content.get("content", ""),
        "changes": improved_content.get("changes", []),
        "explanation": improved_content.get("explanation", ""),
    }
