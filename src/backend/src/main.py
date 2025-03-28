from motor.motor_asyncio import AsyncIOMotorClient
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, status
from pydantic import BaseModel
import debugpy
from typing import List

from .database.mongo import patients_collection
from .auth import auth_user

# Enable debugpy listener
if os.getenv("DEBUGPY_ENABLED", "true").lower() == "true":
    print("Starting Debugpy...")
    debugpy.listen(("0.0.0.0", 5678))

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5175",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Rating(BaseModel):
    rating: int
    rater: int
    is_consultant: bool

class Patient(BaseModel):
    mrn: str
    ratings: List[Rating]

@app.get("/")
async def ping():
    return "ping"

@app.post("/patient", status_code=status.HTTP_201_CREATED)
async def create_patient(patient: Patient, current_user: str = Depends(auth_user)):
    await patients_collection.insert_one(patient.model_dump())
    return patient

@app.get("/patient")
async def read_patients(current_user: str = Depends(auth_user)):
    patients = await patients_collection.find({}).to_list(length=None)
    return [Patient(**patient) for patient in patients]


@app.get("/patient/{mrn}")
async def read_patient(mrn: str, current_user: str = Depends(auth_user)):
    patient = await patients_collection.find_one({"mrn": mrn})
    if patient:
        return Patient(**patient)
    return {"error": "Patient not found"}


@app.delete("/patient/{mrn}")
async def delete_patient(mrn: str, current_user: str = Depends(auth_user)):
    result = await patients_collection.delete_many({})
    return {"message": f"{result.deleted_count} patient(s) deleted"}