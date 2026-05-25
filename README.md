# Happy Paws - Pet Care and Service Booking Platform

A comprehensive full-stack microservices web application for pet care, service booking, and product shopping.

## Tech Stack
- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL, MongoDB
- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Architecture:** Microservices (API Gateway + 5 Services)

## Prerequisites
1. **Node.js** (v18+)
2. **Python** (v3.9+)
3. **PostgreSQL** running locally on port 5432 (default credentials: `postgres:postgres`). It must have a database named `happypaws_users`.
4. **MongoDB** running locally on port 27017 (no auth).

## Installation

1. **Backend Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application Locally

Since we are not using Docker, you need to start the frontend and all 6 backend services.

**Using PowerShell (Recommended for Windows):**
We have provided a script that opens all services in separate PowerShell windows:
```powershell
./start_all.ps1
```

**Manual Start:**
If you prefer to start them manually, run each in a separate terminal:
```bash
# API Gateway
cd backend/api-gateway && uvicorn main:app --reload --port 8000

# User Service
cd backend/user-service && uvicorn main:app --reload --port 8001

# Pet Service
cd backend/pet-service && uvicorn main:app --reload --port 8002

# Appointment Service
cd backend/appointment-service && uvicorn main:app --reload --port 8003

# Order Service
cd backend/order-service && uvicorn main:app --reload --port 8004

# Notification Service
cd backend/notification-service && uvicorn main:app --reload --port 8005

# Frontend
cd frontend && npm run dev
```

## Accessing the Application
- **Frontend App:** http://localhost:5173
- **API Gateway:** http://localhost:8000
- **Service Swagger Docs:** e.g., http://localhost:8001/docs
