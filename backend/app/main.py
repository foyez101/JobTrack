from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import applications
from app.services.database import Base, engine
from app.models import application as application_model

Base.metadata.create_all(bind=engine)

app = FastAPI(title="JobTrack API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications.router)


@app.get("/")
def read_root():
    return {"message": "JobTrack API is running"}