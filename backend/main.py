from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import pandas as pd
import joblib
import os
import models
from database import engine, get_db

# Initialize DB Tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="LuminaStay API",
              description="API for Morocco Housing Price Prediction & Real Estate")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
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


# --- Security & Auth Config ---
SECRET_KEY = "lumina_stay_secret_key_morocco_2024"  # In prod, use env var
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- Data Models ---


class PropertyFeatures(BaseModel):
    Listing_Type: str # Rent or Buy
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


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str = "user"  # user, admin, superadmin


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user_role: str
    username: str


class PaymentRequest(BaseModel):
    amount: float
    currency: str
    method: str  # card, paypal
    user_id: int

# --- Endpoints ---


@app.get("/")
def home():
    return {"message": "Welcome to LuminaStay API (Morocco Edition)"}

# Auth Endpoints


@app.post("/auth/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        data={"sub": new_user.username, "role": new_user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_role": new_user.role,
        "username": new_user.username
    }


@app.post("/auth/login", response_model=Token)
def login(creds: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.username == creds.username).first()
    if not user or not verify_password(creds.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": user.username, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_role": user.role,
        "username": user.username
    }

# Analysis Endpoint
@app.get("/analysis")
def get_market_analysis():
    try:
        df = pd.read_csv("morocco_housing.csv")
        
        # 1. Average Price by City and Listing Type
        avg_price = df.groupby(["City", "Listing_Type"])["Price_MAD"].mean().reset_index()
        
        # Transform to nested dict for easier frontend consumption
        price_stats = {}
        for city in df["City"].unique():
            price_stats[city] = {}
            for l_type in ["Rent", "Buy"]:
                val = avg_price[(avg_price["City"] == city) & (avg_price["Listing_Type"] == l_type)]["Price_MAD"].values
                price_stats[city][l_type] = int(val[0]) if len(val) > 0 else 0
                
        # 2. Price Distribution (Boxplot data approximation - Min, Max, Median)
        # We'll just return raw counts for Property Types for now
        prop_counts = df["Property_Type"].value_counts().to_dict()
        
        return {
            "average_prices": price_stats,
            "property_counts": prop_counts,
            "total_listings": len(df)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")

# Prediction Endpoint


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
        raise HTTPException(
            status_code=400, detail=f"Prediction error: {str(e)}")

# Payment Endpoint (Mock)


@app.post("/payment/process")
def process_payment(payment: PaymentRequest):
    # Simulate processing time
    import time
    time.sleep(1)

    if payment.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    return {
        "status": "success",
        "transaction_id": f"txn_morocco_{int(time.time())}",
        "message": f"Successfully processed {payment.amount} {payment.currency} via {payment.method}"
    }
