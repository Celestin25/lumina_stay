
Write-Host "Starting LuminaStay..."
Write-Host "1. Starting Backend API (Port 8000)..."
Start-Process powershell -ArgumentList "cd backend; uvicorn main:app --reload"

Write-Host "2. Starting Frontend (Port 3000)..."
Start-Process powershell -ArgumentList "cd frontend; npm run dev"

Write-Host "LuminaStay is running!"
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:8000/docs"
