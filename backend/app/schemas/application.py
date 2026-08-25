from pydantic import BaseModel
from typing import Optional

class ApplicationBase(BaseModel):
    company_name: str
    position: str
    job_type: Optional[str] = None
    location: Optional[str] = None
    salary: Optional[str] = None
    application_date: str
    status: str = "Applied"
    job_url: Optional[str] = None
    job_description: Optional[str] = None
    notes: Optional[str] = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    company_name: Optional[str] = None
    position: Optional[str] = None
    job_type: Optional[str] = None
    location: Optional[str] = None
    salary: Optional[str] = None
    application_date: Optional[str] = None
    status: Optional[str] = None
    job_url: Optional[str] = None
    job_description: Optional[str] = None
    notes: Optional[str] = None

class Application(ApplicationBase):
    id: int