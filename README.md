# AI Project Architect

A full-stack app that turns a simple project idea into a structured roadmap using Google Gemini. The frontend lets users enter a prompt, the backend generates a roadmap-style JSON response, and the app saves each generated project for later viewing.

## Features

- Enter a project prompt in the React UI
- Generate a structured roadmap with metadata such as project name, summary, difficulty, duration, and milestones
- Save generated results to the backend database
- View previously generated projects from the history panel

## Tech Stack

- Frontend: React, Vite, Axios
- Backend: Python, FastAPI, SQLAlchemy, Pydantic
- AI model: Google Gemini via the `google-genai` SDK
- Database: SQLAlchemy-compatible database via `DATABASE_URL` (PostgreSQL recommended)

## Project Structure

- `frontend/` - Vite + React UI
- `backend/` - FastAPI backend, database models, and environment configuration
- `README.md` - Project overview and setup instructions

## Prerequisites

- Python 3.10+
- Node.js 18+
- A Google Gemini API key

## Backend Setup

1. Open a terminal in the `backend/` folder.
2. Create and activate a virtual environment:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

3. Install backend dependencies:

```powershell
pip install -r requirements.txt
```

4. Create a `.env` file in `backend/` and add your configuration:

```text
GEMINI_API_KEY=your_real_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
```

5. Start the backend server:

```powershell
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`.

## Frontend Setup

1. Open a terminal in the `frontend/` folder.
2. Install frontend dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal (typically `http://localhost:5173`).

## API Endpoints

- `GET /` - Health check
- `POST /generate` - Submit a prompt and receive a generated roadmap response
- `GET /projects` - Retrieve saved projects from the database

## Environment Variables

- `GEMINI_API_KEY` - Required for Gemini access
- `GEMINI_MODEL` - Optional; defaults to `gemini-2.5-flash`
- `DATABASE_URL` - Required for SQLAlchemy database connection

## Notes

- The app expects a valid Gemini API key and a working database connection.
- The current version focuses on roadmap generation and project history; authentication and multi-user support are not included.

## Useful Commands

### Backend

```powershell
cd backend
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
