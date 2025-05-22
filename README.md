# KiwiJobScrape

A web application to scrape and display job postings for Software Engineer roles in the New Zealand market from various websites.

## Technologies Used

- **Backend:** Python (FastAPI), Requests, BeautifulSoup, Playwright
- **Frontend:** React (Vite), HTML, CSS (inline styles)

## Setup and Running

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd kiwi-job-scrape
```

Replace `<repository_url>` with the actual URL of your repository.

### 2. Backend Setup and Run

Navigate to the backend directory, set up a Python virtual environment, install dependencies, and run the FastAPI application.

```bash
cd backend

# (Optional) Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install

# Run the FastAPI application
uvicorn main:app --reload
```

The backend server will typically run on `http://localhost:8000`.

### 3. Frontend Setup and Run

In a new terminal window, navigate to the frontend directory, install dependencies, and run the Vite development server.

```bash
cd frontend

# Install dependencies
npm install

# Run the Vite development server
npm run dev
```

The frontend application will typically run on `http://localhost:5173` (or another port as indicated by Vite).

Open your browser to the frontend address to access the application.

## Features

- Scrapes job postings from configured New Zealand job websites (currently Seek NZ and TradeMe).
- Allows searching by keywords and date range.
- Displays job listings with relevant details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE) (You might want to add a LICENSE file). 