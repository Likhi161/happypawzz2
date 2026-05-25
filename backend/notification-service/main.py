from fastapi import FastAPI
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
