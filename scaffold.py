import os

def create_file(path, content):
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

base_dir = "backend"

services = [
    "user-service",
    "pet-service",
    "appointment-service",
    "order-service",
    "notification-service",
    "api-gateway"
]

for service in services:
    os.makedirs(os.path.join(base_dir, service), exist_ok=True)

# API Gateway
api_gateway_main = """from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn

app = FastAPI(title="API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERVICES = {
    "users": "http://localhost:8001",
    "pets": "http://localhost:8002",
    "appointments": "http://localhost:8003",
    "orders": "http://localhost:8004",
    "notifications": "http://localhost:8005",
}

@app.get("/")
def root():
    return {"message": "API Gateway is running"}

@app.api_route("/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def route_request(service: str, path: str, request: Request):
    if service not in SERVICES:
        return {"error": "Service not found"}
    
    url = f"{SERVICES[service]}/{path}"
    
    async with httpx.AsyncClient() as client:
        body = await request.body()
        response = await client.request(
            method=request.method,
            url=url,
            headers=dict(request.headers),
            content=body
        )
        return response.json()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
"""
create_file("backend/api-gateway/main.py", api_gateway_main)

# User Service
user_main = """from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import uvicorn
from passlib.context import CryptContext

app = FastAPI(title="User Service")

# DB Setup
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/happypaws_users"
try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()

    class User(Base):
        __tablename__ = "users"
        id = Column(Integer, primary_key=True, index=True)
        email = Column(String, unique=True, index=True)
        hashed_password = Column(String)
        role = Column(String, default="user")

    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"DB Connection failed, ensure PostgreSQL is running and DB 'happypaws_users' exists. Error: {e}")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    email: str
    password: str
    role: str = "user"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"service": "User Service"}

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User registered successfully"}

@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    # Simplistic JWT placeholder
    return {"access_token": "fake-jwt-token", "token_type": "bearer", "role": db_user.role}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
"""
create_file("backend/user-service/main.py", user_main)

# Pet Service
pet_main = """from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import uvicorn
from typing import List

app = FastAPI(title="Pet Service")

try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client.happypaws
    pets_collection = db.pets
except Exception as e:
    print(f"MongoDB connection failed: {e}")

class Pet(BaseModel):
    name: str
    type: str
    breed: str
    age: int
    image_url: str

@app.get("/")
def read_root():
    return {"service": "Pet Service"}

@app.get("/pets")
def get_pets():
    try:
        pets = []
        for p in pets_collection.find():
            p["_id"] = str(p["_id"])
            pets.append(p)
        return pets
    except:
        return []

@app.post("/pets")
def add_pet(pet: Pet):
    try:
        pets_collection.insert_one(pet.dict())
        return {"msg": "Pet added successfully"}
    except:
        return {"msg": "DB error"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
"""
create_file("backend/pet-service/main.py", pet_main)

# Appointment Service
appointment_main = """from fastapi import FastAPI, Depends
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Appointment Service")

class Appointment(BaseModel):
    user_id: int
    pet_id: str
    service_type: str # visit, grooming, vaccination, checkup
    date: str

@app.get("/")
def read_root():
    return {"service": "Appointment Service"}

@app.post("/book")
def book_appointment(app_req: Appointment):
    # Placeholder for DB Logic
    return {"msg": "Appointment booked successfully", "details": app_req}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8003, reload=True)
"""
create_file("backend/appointment-service/main.py", appointment_main)

# Order Service
order_main = """from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Order Service")

@app.get("/")
def read_root():
    return {"service": "Order Service"}

@app.get("/products")
def get_products():
    return [
        {"id": 1, "name": "Premium Dog Food", "price": 45.99, "image": "dogfood.jpg"},
        {"id": 2, "name": "Cat Tree", "price": 120.00, "image": "cattree.jpg"}
    ]

class OrderReq(BaseModel):
    user_id: int
    product_ids: list

@app.post("/place-order")
def place_order(order: OrderReq):
    return {"msg": "Order placed successfully", "order_id": 12345}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8004, reload=True)
"""
create_file("backend/order-service/main.py", order_main)

# Notification Service
notification_main = """from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Notification Service")

class Notification(BaseModel):
    user_id: int
    message: str

@app.get("/")
def read_root():
    return {"service": "Notification Service"}

@app.post("/send")
def send_notification(notif: Notification):
    print(f"Sending notification to User {notif.user_id}: {notif.message}")
    return {"msg": "Notification sent"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8005, reload=True)
"""
create_file("backend/notification-service/main.py", notification_main)

# PowerShell Start Script
start_script = """Write-Host "Starting Happy Paws Microservices..."

$services = @(
    @{name="API Gateway"; path="backend/api-gateway"; port=8000},
    @{name="User Service"; path="backend/user-service"; port=8001},
    @{name="Pet Service"; path="backend/pet-service"; port=8002},
    @{name="Appointment Service"; path="backend/appointment-service"; port=8003},
    @{name="Order Service"; path="backend/order-service"; port=8004},
    @{name="Notification Service"; path="backend/notification-service"; port=8005}
)

foreach ($svc in $services) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $($svc.path); uvicorn main:app --reload --port $($svc.port)"
}

Write-Host "Starting Frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "All services starting in separate windows!"
"""
create_file("start_all.ps1", start_script)

print("Scaffolding complete!")
