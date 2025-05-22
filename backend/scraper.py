import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import List, Dict, Optional

# Add Playwright imports
from playwright.sync_api import sync_playwright

class BaseJobScraper:
    def fetch_jobs(self, keywords: List[str], start_date: Optional[str], end_date: Optional[str]) -> List[Dict]:
        raise NotImplementedError

class SeekNZScraper(BaseJobScraper):
    BASE_URL = "https://www.seek.co.nz/jobs"

    def fetch_jobs(self, keywords: List[str], start_date: Optional[str], end_date: Optional[str]) -> List[Dict]:
        query = "+".join(keywords)
        url = f"https://www.seek.co.nz/{query}-jobs"
        resp = requests.get(url)
        soup = BeautifulSoup(resp.text, "html.parser")
        jobs = []
        for job_link in soup.select('a[data-automation="jobTitle"]'):
            title = job_link.text.strip()
            link = f"https://www.seek.co.nz{job_link['href']}"
            card = job_link.find_parent('article')
            company = card.select_one('span[data-automation="jobCompany"]').text.strip() if card and card.select_one('span[data-automation="jobCompany"]') else None
            location = card.select_one('a[data-automation="jobLocation"]').text.strip() if card and card.select_one('a[data-automation="jobLocation"]') else None
            jobs.append({
                "title": title,
                "company": company,
                "location": location,
                "source": "Seek",
                "date": None,
                "ai_summary": None,
                "link": link,
                "relevant": True
            })
        return jobs

class TradeMeScraper(BaseJobScraper):
    BASE_URL = "https://www.trademe.co.nz/a/jobs/search"

    def fetch_jobs(self, keywords: List[str], start_date: Optional[str], end_date: Optional[str]) -> List[Dict]:
        query = "+".join(keywords)
        url = f"{self.BASE_URL}?search_string={query}"
        jobs = []
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url)
            # Wait for some time to allow JS to render (10s)
            page.wait_for_timeout(10000)
            # Save the rendered HTML for analysis
            with open("trademe_rendered.html", "w", encoding="utf-8") as f:
                f.write(page.content())
            # Wait for at least one job link to appear
            page.wait_for_selector('a[href*="/a/jobs/listing/"]', timeout=20000)
            # Take a screenshot for debugging
            page.screenshot(path="trademe_debug.png", full_page=True)
            job_links = page.query_selector_all('a[href*="/a/jobs/listing/"]')
            for link_elem in job_links:
                title = link_elem.inner_text().strip()
                link = link_elem.get_attribute('href')
                if link and not link.startswith('http'):
                    link = f"https://www.trademe.co.nz{link}"
                # Try to get company and location from parent containers
                card = link_elem.closest('div')
                company = None
                location = None
                if card:
                    # Company is often in a span or div nearby
                    company_elem = card.query_selector('span[data-automation="job-company-name"]')
                    if not company_elem:
                        company_elem = card.query_selector('span')
                    company = company_elem.inner_text().strip() if company_elem else None
                    # Location is often in a span or div nearby
                    location_elem = card.query_selector('span[data-automation="job-location"]')
                    if not location_elem:
                        location_elem = card.query_selector('span')
                    location = location_elem.inner_text().strip() if location_elem else None
                jobs.append({
                    "title": title,
                    "company": company,
                    "location": location,
                    "source": "TradeMe Jobs",
                    "date": None,
                    "ai_summary": None,
                    "link": link,
                    "relevant": True
                })
            browser.close()
        return jobs

# Registry for scrapers
SCRAPER_REGISTRY = [
    SeekNZScraper(),
    TradeMeScraper(),
]

def fetch_all_jobs(keywords: List[str], start_date: Optional[str], end_date: Optional[str]) -> List[Dict]:
    all_jobs = []
    for scraper in SCRAPER_REGISTRY:
        try:
            jobs = scraper.fetch_jobs(keywords, start_date, end_date)
            all_jobs.extend(jobs)
        except Exception as e:
            print(f"Error in {scraper.__class__.__name__}: {e}")
    return all_jobs

# NOTE: After installing Playwright, you must run: playwright install 