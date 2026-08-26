from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.application import Application, ApplicationCreate, ApplicationUpdate
from app.models.application import ApplicationModel
from app.services.database import get_db

router = APIRouter(prefix="/api/applications", tags=["applications"])


@router.get("/", response_model=list[Application])
def get_applications(db: Session = Depends(get_db)):
    return db.query(ApplicationModel).all()


@router.get("/{application_id}", response_model=Application)
def get_application(application_id: int, db: Session = Depends(get_db)):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app


@router.post("/", response_model=Application)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    new_app = ApplicationModel(**application.model_dump())
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app


@router.put("/{application_id}", response_model=Application)
def update_application(application_id: int, updates: ApplicationUpdate, db: Session = Depends(get_db)):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(app, key, value)

    db.commit()
    db.refresh(app)
    return app


@router.delete("/{application_id}")
def delete_application(application_id: int, db: Session = Depends(get_db)):
    app = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    db.delete(app)
    db.commit()
    return {"message": "Application deleted"}