Write-Host "Starting Happy Paws Microservices..."

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
