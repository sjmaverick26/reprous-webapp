from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import hub, workshops, qa, voices, clinics

app = FastAPI(
    title="ReproUs Learning Hub API",
    description="Backend API supporting the ReproUs web application with anonymous Q&A, workshops RSVP, youth stories, and learning progress.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(hub.router, prefix="/api")
app.include_router(workshops.router, prefix="/api")
app.include_router(qa.router, prefix="/api")
app.include_router(voices.router, prefix="/api")
app.include_router(clinics.router, prefix="/api")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "ReproUs API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
