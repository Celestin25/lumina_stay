
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI(title="LuminaStay API", description="API for Morocco Housing Price Prediction")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
MODEL_PATH = "model.pkl"
model = None

@app.on_event("startup")
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("Model loaded successfully.")
    else:
        print("Warning: model.pkl not found. Predictions will fail.")

# Data Models
class PropertyFeatures(BaseModel):
    City: str
    Neighborhood: str
    Property_Type: str
    Bedrooms: int
    Bathrooms: int
    Size_m2: int
    Has_Pool: int
    Has_Garden: int
    Is_Furnished: int
    Latitude: float
    Longitude: float

class PredictionResponse(BaseModel):
    predicted_price: float
    currency: str = "MAD"

class LoginRequest(BaseModel):
    username: str
    password: str

# Endpoints
@app.get("/")
def home():
    return {"message": "Welcome to LuminaStay API (Morocco Edition)"}

@app.post("/predict", response_model=PredictionResponse)
def predict_price(features: PropertyFeatures):
    if not model:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Create DataFrame from input
    input_data = pd.DataFrame([features.dict()])
    
    try:
        prediction = model.predict(input_data)[0]
        return {"predicted_price": round(prediction, 2)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

@app.post("/auth/login")
def login(creds: LoginRequest):
    # Mock Auth
    if len(creds.password) > 3:
        return {
            "token": "mock-jwt-token-morocco-123", 
            "user": {"name": creds.username, "role": "host"}
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")
