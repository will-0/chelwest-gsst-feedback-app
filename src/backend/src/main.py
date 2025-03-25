from motor.motor_asyncio import AsyncIOMotorClient
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, status
from pydantic import BaseModel
import debugpy
from typing import List

# Enable debugpy listener
if os.getenv("DEBUGPY_ENABLED", "true").lower() == "true":
    print("Starting Debugpy...")
    debugpy.listen(("0.0.0.0", 5678))

app = FastAPI()

MONGO_DETAILS = "mongodb://db:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client["fruits_db"]  # Database name

# Collections for payslips and contracts
patients_collection = db.get_collection("patients")

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

@app.post("/patient", status_code=status.HTTP_201_CREATED)
async def create_patient(patient: Patient):
    await patients_collection.insert_one(patient.model_dump())
    return patient

@app.get("/patient")
async def read_patients():
    patients = await patients_collection.find({}).to_list(length=None)
    return [Patient(**patient) for patient in patients]


@app.get("/patient/{mrn}")
async def read_patient(mrn: str):
    patient = await patients_collection.find_one({"mrn": mrn})
    if patient:
        return Patient(**patient)
    return {"error": "Patient not found"}


@app.delete("/patient/{mrn}")
async def delete_patient(mrn: str):
    result = await patients_collection.delete_many({})
    return {"message": f"{result.deleted_count} patient(s) deleted"}