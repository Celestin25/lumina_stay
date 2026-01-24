# LuminaStay (Morocco Edition) 🇲🇦

An AI-powered real estate platform for estimating housing prices in Morocco. Built for the Basics of Computer Science Final Project.

## 🚀 Features
- **Machine Learning**: Random Forest Regressor trained on Moroccan housing data (Casablanca, Marrakech, etc.).
- **Interactive Map**: Visualizes properties on a dynamic map.
- **Price Prediction**: Estimates value based on location, size, and amenities.
- **Tech Stack**: Next.js (Frontend), FastAPI (Backend), Scikit-Learn (ML).

## 🛠️ Quick Start

**Prerequisites**: Python 3.8+, Node.js 18+.

1.  **Install Backend Dependencies**:
    ```powershell
    pip install -r backend/requirements.txt
    ```

2.  **Install Frontend Dependencies** (if not already):
    ```powershell
    cd frontend
    npm install
    npm install leaflet react-leaflet @types/leaflet
    cd ..
    ```

3.  **Run the App**:
    Double-click `start_project.ps1` OR run in PowerShell:
    ```powershell
    .\start_project.ps1
    ```

## 📂 Structure
- `backend/`: FastAPI server + ML Model (`model.pkl`) + Data Generation (`generate_data.py`).
- `frontend/`: Next.js web application.

## 🎓 Academic Note
Data source: Synthetic dataset modeled after "Morocco Housing Price" (Kaggle).
