from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import uuid

router = APIRouter(tags=["Contact, Feedback & Petitions"])

class ProgramFeedbackRequest(BaseModel):
    role: str
    rating: int
    feedback: str
    topicSuggestions: Optional[str] = None
    email: Optional[str] = None
    isAnonymous: bool = False

class AmbassadorApplicationRequest(BaseModel):
    fullName: str
    email: str
    age: str
    schoolOrOrg: str
    city: str
    statement: str
    interests: List[str]

class GeneralInquiryRequest(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class SignPetitionRequest(BaseModel):
    petitionId: str
    signerName: str
    email: str
    zipCode: Optional[str] = None
    comment: Optional[str] = None

class ProposePetitionRequest(BaseModel):
    title: str
    target: str
    summary: str
    demands: str
    proposerName: str
    proposerEmail: str
    location: str

FEEDBACK_STORE: List[dict] = []
AMBASSADOR_STORE: List[dict] = []
INQUIRY_STORE: List[dict] = []
PETITION_SIGNATURES: List[dict] = []
PETITION_PROPOSALS: List[dict] = []

@router.post("/contact/feedback")
def submit_feedback(payload: ProgramFeedbackRequest):
    record = {
        "id": str(uuid.uuid4()),
        "role": payload.role,
        "rating": payload.rating,
        "feedback": payload.feedback,
        "topicSuggestions": payload.topicSuggestions,
        "email": None if payload.isAnonymous else payload.email,
        "isAnonymous": payload.isAnonymous
    }
    FEEDBACK_STORE.append(record)
    return {
        "success": True,
        "message": "Thank you for your valuable feedback! It helps us improve ReproUs.",
        "feedback_id": record["id"]
    }

@router.post("/contact/ambassador")
def apply_ambassador(payload: AmbassadorApplicationRequest):
    record = {
        "id": str(uuid.uuid4()),
        "fullName": payload.fullName,
        "email": payload.email,
        "age": payload.age,
        "schoolOrOrg": payload.schoolOrOrg,
        "city": payload.city,
        "statement": payload.statement,
        "interests": payload.interests
    }
    AMBASSADOR_STORE.append(record)
    return {
        "success": True,
        "message": f"Ambassador application received for {payload.fullName}! We will email you soon.",
        "application_id": record["id"]
    }

@router.post("/contact/inquiry")
def submit_inquiry(payload: GeneralInquiryRequest):
    record = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message
    }
    INQUIRY_STORE.append(record)
    return {
        "success": True,
        "message": "Inquiry received! Our team will respond shortly.",
        "inquiry_id": record["id"]
    }

@router.post("/petitions/sign")
def sign_petition(payload: SignPetitionRequest):
    record = {
        "id": str(uuid.uuid4()),
        "petitionId": payload.petitionId,
        "signerName": payload.signerName,
        "email": payload.email,
        "zipCode": payload.zipCode,
        "comment": payload.comment
    }
    PETITION_SIGNATURES.append(record)
    return {
        "success": True,
        "message": "Signature recorded successfully!",
        "signature_id": record["id"]
    }

@router.post("/petitions/propose")
def propose_petition(payload: ProposePetitionRequest):
    record = {
        "id": str(uuid.uuid4()),
        "title": payload.title,
        "target": payload.target,
        "summary": payload.summary,
        "demands": payload.demands,
        "proposerName": payload.proposerName,
        "proposerEmail": payload.proposerEmail,
        "location": payload.location
    }
    PETITION_PROPOSALS.append(record)
    return {
        "success": True,
        "message": "Petition proposal submitted for review!",
        "proposal_id": record["id"]
    }
