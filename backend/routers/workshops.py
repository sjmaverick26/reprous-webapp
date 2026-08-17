from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import uuid

router = APIRouter(prefix="/workshops", tags=["Workshops"])

class RsvpRequest(BaseModel):
    session_id: str
    attendee_name: str
    email: str
    guest_count: Optional[int] = 1

class WorkshopVisitRequest(BaseModel):
    organization_name: str
    contact_name: str
    email: str
    phone: Optional[str] = None
    estimated_attendees: Optional[int] = None
    preferred_dates: Optional[str] = None
    notes: Optional[str] = None

RSVP_STORE: List[dict] = []
VISIT_REQUESTS: List[dict] = []

@router.post("/rsvp")
def register_rsvp(payload: RsvpRequest):
    record = {
        "id": str(uuid.uuid4()),
        "session_id": payload.session_id,
        "attendee_name": payload.attendee_name,
        "email": payload.email,
        "guest_count": payload.guest_count or 1
    }
    RSVP_STORE.append(record)
    return {
        "success": True,
        "message": f"Spot reserved for {payload.attendee_name}!",
        "rsvp_id": record["id"]
    }

@router.post("/request")
def request_visit(payload: WorkshopVisitRequest):
    record = {
        "id": str(uuid.uuid4()),
        "organization_name": payload.organization_name,
        "contact_name": payload.contact_name,
        "email": payload.email,
        "notes": payload.notes
    }
    VISIT_REQUESTS.append(record)
    return {
        "success": True,
        "message": "Workshop request received! Our team will contact you within 2 business days.",
        "request_id": record["id"]
    }
