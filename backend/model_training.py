
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Load Data
df = pd.read_csv("morocco_housing.csv")

# Features & Target
X = df.drop(columns=["Price_MAD"])
y = df["Price_MAD"]

# Preprocessing Pipeline
categorical_features = ["City", "Neighborhood", "Property_Type"]
numerical_features = ["Bedrooms", "Bathrooms", "Size_m2", "Has_Pool", "Has_Garden", "Is_Furnished", "Latitude", "Longitude"]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", "passthrough", numerical_features),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ]
)

# Model Pipeline
model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
])

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train
print("Training Random Forest Model...")
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model Training Complete.")
print(f"Mean Absolute Error: {mae:.2f} MAD")
print(f"R2 Score: {r2:.4f}")

# Save Model
joblib.dump(model, "model.pkl")
print("Model saved to model.pkl")
