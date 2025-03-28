from motor.motor_asyncio import AsyncIOMotorClient
import os

_client = AsyncIOMotorClient(os.environ["MONGO_CONNECTION_STRING"])  # Connection URI
_db = _client["main"]  # Database name

# COLLECTIONS
patients_collection = _db.get_collection("patients")