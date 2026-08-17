from fastapi import APIRouter, Query
from typing import Optional, List

router = APIRouter(prefix="/clinics", tags=["Clinics"])

CLINICS_DB = [
    {
        "id": "clinic-1",
        "name": "Hope Community Health Center",
        "address": "742 Evergreen Terrace",
        "city": "Metro City",
        "zip": "90210",
        "phone": "(555) 234-5678",
        "services": ["Free STI Testing", "Confidential Birth Control", "Pregnancy Testing"],
        "slidingScale": True,
        "busAccessible": True,
        "languages": ["English", "Español", "Tiếng Việt"]
    },
    {
        "id": "clinic-2",
        "name": "Eastside Youth Wellness Clinic",
        "address": "1050 E 14th Street",
        "city": "Eastside",
        "zip": "90212",
        "phone": "(555) 876-5432",
        "services": ["Teen & Youth Care", "Free Condoms", "Mental Health"],
        "slidingScale": True,
        "busAccessible": True,
        "languages": ["English", "Español", "Kreyòl", "العربية"]
    }
]

@router.get("")
def search_clinics(zip_code: Optional[str] = Query(None)):
    if not zip_code:
        return CLINICS_DB
    return [c for c in CLINICS_DB if zip_code in c["zip"]]
