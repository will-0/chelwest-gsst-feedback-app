from motor.motor_asyncio import AsyncIOMotorClient

# SETUP
_MONGO_DETAILS = "mongodb://db:27017"
_client = AsyncIOMotorClient(_MONGO_DETAILS)
_db = _client["main"]  # Database name

# COLLECTIONS
patients_collection = _db.get_collection("patients")