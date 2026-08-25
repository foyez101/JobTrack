from fastapi import APIRouter, HTTPException
from app.schemas.application import Application, ApplicationCreate, ApplicationUpdate

router = APIRouter(prefix="/api/applications", tags=["applications"])

# In-memory dummy data (temporary — replaced by a real database in Phase 4)
applications_db = [
    {
        "id": 1,
        "company_name": "Acme Corp",
        "position": "Frontend Developer",
        "job_type": "Full-time",
        "location": "Remote",
        "salary": "$60,000",
        "application_date": "2026-08-10",
        "status": "Applied",
        "job_url": None,
        "job_description": None,
        "notes": None,
    },
    {
        "id": 2,
        "company_name": "Globex Inc",
        "position": "Full-Stack Engineer",
        "job_type": "Full-time",
        "location": "Dhaka, BD",
        "salary": "$70,000",
        "application_date": "2026-08-05",
        "status": "Interview",
        "job_url": None,
        "job_description": None,
        "notes": None,
    },
]

next_id = 3


@router.get("/", response_model=list[Application])
def get_applications():
    return applications_db


@router.get("/{application_id}", response_model=Application)
def get_application(application_id: int):
    for app in applications_db:
        if app["id"] == application_id:
            return app
    raise HTTPException(status_code=404, detail="Application not found")


@router.post("/", response_model=Application)
def create_application(application: ApplicationCreate):
    global next_id
    new_app = application.model_dump()
    new_app["id"] = next_id
    next_id += 1
    applications_db.append(new_app)
    return new_app


@router.put("/{application_id}", response_model=Application)
def update_application(application_id: int, updates: ApplicationUpdate):
    for app in applications_db:
        if app["id"] == application_id:
            update_data = updates.model_dump(exclude_unset=True)
            app.update(update_data)
            return app
    raise HTTPException(status_code=404, detail="Application not found")


@router.delete("/{application_id}")
def delete_application(application_id: int):
    for i, app in enumerate(applications_db):
        if app["id"] == application_id:
            applications_db.pop(i)
            return {"message": "Application deleted"}
    raise HTTPException(status_code=404, detail="Application not found")