from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/hub", tags=["Learning Hub"])

class UserProgressUpdate(BaseModel):
    topic_id: str
    xp_gained: int
    category_id: str

# In-memory session progress store
USER_STATE = {
    "xp": 320,
    "streak": 4,
    "completed_topics": ["body-0", "cycle-0"],
    "badges": ["Body Basics Champion", "Cycle Sense Pro"]
}

@router.get("/progress")
def get_user_progress():
    return USER_STATE

@router.post("/progress")
def update_progress(data: UserProgressUpdate):
    if data.topic_id not in USER_STATE["completed_topics"]:
        USER_STATE["completed_topics"].append(data.topic_id)
        USER_STATE["xp"] += data.xp_gained
    return {
        "success": True,
        "xp": USER_STATE["xp"],
        "streak": USER_STATE["streak"],
        "completed_topics": USER_STATE["completed_topics"]
    }
