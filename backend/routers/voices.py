from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
import uuid

router = APIRouter(prefix="/voices", tags=["Youth Voices"])

class StorySubmission(BaseModel):
    story: str
    author_alias: Optional[str] = "Shared anonymously"
    age: Optional[int] = 17
    category: Optional[str] = "Community"

STORIES_STORE: List[dict] = []

@router.post("/submit")
def submit_story(payload: StorySubmission):
    record = {
        "id": str(uuid.uuid4()),
        "story": payload.story,
        "author_alias": payload.author_alias or "Shared anonymously",
        "age": payload.age or 17,
        "category": payload.category or "Community"
    }
    STORIES_STORE.append(record)
    return {
        "success": True,
        "message": "Thank you for sharing your story!",
        "story_id": record["id"]
    }
