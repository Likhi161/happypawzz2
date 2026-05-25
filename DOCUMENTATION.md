# Happy Paws - Application Documentation

## 1. Overview
**Happy Paws** is a comprehensive, full-stack microservices-based web application designed as a premium Pet Care and Service Booking Platform. It provides a centralized ecosystem where pet owners and lovers can:
- Browse a catalog of pets available for adoption or visits.
- Book various pet-related services such as Grooming & Spa, Vaccinations, and Health Checkups.
- Shop for premium pet products like food, beds, and toys via an integrated e-commerce cart.
- Manage their orders, appointments, and notifications through a personalized User Dashboard.

The application emphasizes a beautiful, dynamic **Light Burgundy** aesthetic with glassmorphism UI elements, micro-animations, and responsive design.

---

## 2. Global Technology Stack
The platform is decoupled into a modern frontend and a distributed backend.

### Frontend
- **Framework:** React 18 powered by Vite
- **Styling:** Tailwind CSS (v4) with custom theme tokens
- **Routing:** React Router DOM (v6)
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Framework:** Python, FastAPI, Uvicorn
- **Data Validation:** Pydantic
- **Databases:** 
  - PostgreSQL (Relational Data)
  - MongoDB (Document Data)
- **Proxy/Routing:** HTTPX (Asynchronous HTTP client)

---

## 3. Microservices Architecture
To ensure scalability and separation of concerns, the backend is split into **6 independent services**, running concurrently on different ports without containerization overhead (for local development ease).

### 1. API Gateway (Port `8000`)
- **Tech Stack:** FastAPI, HTTPX
- **Role:** The central entry point for the frontend. It resolves CORS requirements and acts as a reverse proxy, inspecting the URL path (e.g., `/pets/...`) and asynchronously forwarding the request to the correct internal microservice using the `httpx` library.

### 2. User Service (Port `8001`)
- **Tech Stack:** FastAPI, SQLAlchemy, PostgreSQL, Passlib (Bcrypt)
- **Database:** `happypaws_users` (PostgreSQL)
- **Role:** Handles user identity. It manages registration, hashed password verification, and user roles (Admin/User).

### 3. Pet Service (Port `8002`)
- **Tech Stack:** FastAPI, PyMongo, MongoDB
- **Database:** `happypaws.pets` (MongoDB)
- **Role:** Manages the catalog of pets. Because pets have highly variable metadata (different attributes for birds vs. dogs vs. cats), a NoSQL document database (MongoDB) is used here for maximum schema flexibility.

### 4. Appointment Service (Port `8003`)
- **Tech Stack:** FastAPI, PostgreSQL
- **Role:** Handles the scheduling engine. Users book Grooming, Vaccination, Checkups, or Shelter Visits through this service.

### 5. Order Service (Port `8004`)
- **Tech Stack:** FastAPI, PostgreSQL (with In-Memory Fallback)
- **Role:** Acts as the e-commerce engine. It serves the inventory of premium pet products to the frontend Shop and processes checkout requests when a user submits their cart.

### 6. Notification Service (Port `8005`)
- **Tech Stack:** FastAPI
- **Role:** A supporting service that handles outbound communications. Currently simulated, this service is responsible for sending "Order Confirmed" and "Appointment Reminder" alerts to the user's dashboard.

---

## 4. Communication Flow

The system uses **Synchronous HTTP/REST Communication** via the API Gateway. Here is the step-by-step flow of a typical request (e.g., fetching pet listings):

1. **Client Request:** The React frontend (`localhost:5173`) needs data. It fires an Axios request to the API Gateway: 
   `GET http://localhost:8000/pets/pets`
2. **Gateway Intercept:** The API Gateway receives the request. It parses the first path parameter (`/pets/`) to identify the target service.
3. **Internal Proxy:** The Gateway maps `"pets"` to the internal URL `http://localhost:8002` and uses `httpx.AsyncClient()` to mirror the exact request (headers, body, method) to the Pet Service.
4. **Service Execution:** The Pet Service at Port 8002 queries MongoDB, formats the response, and sends the JSON back to the Gateway.
5. **Client Response:** The API Gateway forwards the raw JSON back to the React frontend, which then maps the array to the UI cards.

---

## 5. File Structure
The codebase strictly follows a clean separation:
```text
happypaws/
├── .env                     # Shared environment configurations (Ports, DB URLs)
├── README.md                # Quick start guide
├── DOCUMENTATION.md         # Architecture documentation
├── requirements.txt         # Global Python dependencies
├── seed_data.py             # Script to populate MongoDB and Postgres with sample data
├── start_all.ps1            # PowerShell execution script to spin up all 7 processes
│
├── frontend/                # React / Vite Application
│   ├── src/
│   │   ├── components/      # Reusable UI (Navbar, Footer)
│   │   ├── pages/           # Route views (Home, Shop, Dashboard, Cart, Checkout, etc.)
│   │   ├── App.jsx          # React Router configuration
│   │   └── index.css        # Tailwind directives and Burgundy theme variables
│   └── package.json
│
└── backend/                 # Microservices
    ├── api-gateway/         # main.py
    ├── appointment-service/ # main.py
    ├── notification-service/# main.py
    ├── order-service/       # main.py
    ├── pet-service/         # main.py
    └── user-service/        # main.py
```
