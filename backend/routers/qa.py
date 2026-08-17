from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
import uuid

router = APIRouter(prefix="/qa", tags=["Q&A"])

class QuestionSubmission(BaseModel):
    question: str
    category: Optional[str] = "general"
    age_range: Optional[str] = "16-18"

SUBMITTED_QUESTIONS: List[dict] = []

@router.post("/submit")
def submit_question(payload: QuestionSubmission):
    record = {
        "id": str(uuid.uuid4()),
        "question": payload.question,
        "category": payload.category,
        "age_range": payload.age_range,
        "status": "pending_review"
    }
    SUBMITTED_QUESTIONS.append(record)
    return {
        "success": True,
        "message": "Question received anonymously! It will be reviewed and answered by our clinicians.",
        "question_id": record["id"]
    }
