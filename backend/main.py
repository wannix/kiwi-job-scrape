from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import date
from scraper import fetch_all_jobs

app = FastAPI()

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/jobs")
def get_jobs(
    keywords: Optional[str] = Query(None, description="Comma-separated keywords"),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None)
):
    # Parse keywords
    keyword_list = [k.strip() for k in keywords.split(",") if k.strip()] if keywords else []
    # Convert dates to string for scraper
    start_date_str = start_date.isoformat() if start_date else None
    end_date_str = end_date.isoformat() if end_date else None
    jobs = fetch_all_jobs(keyword_list, start_date_str, end_date_str)
    return {"jobs": jobs} 