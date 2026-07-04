# AI Assistant for Software Project Planning

AI Assistant is a lightweight MVP that helps students turn a simple idea into a structured software roadmap. It combines a React frontend with a FastAPI backend and uses Google Gemini to generate a guided plan that can be refined and saved for later.

This project is designed to help beginners get started quickly without overwhelming them. Instead of fully automating the whole development process, it acts as a supportive guide that encourages learning while still making progress.

## Why this project exists

Many students struggle to move from an idea to a real implementation plan. This app aims to:

- reduce the friction of planning a first software project
- provide a clear starting point with milestones and structure
- keep the learning curve manageable by guiding rather than replacing decision-making
- make it easier to explore ideas and build confidence early

## Core Features

- Enter a project idea through a simple web interface
- Generate a structured roadmap with project metadata
- Save generated projects for future reference
- Review previously created project plans from the history view
- Use AI-generated guidance as a starting point for building software applications

## Tech Stack

- Frontend: React, Vite, Axios
- Backend: Python, FastAPI, SQLAlchemy, Pydantic
- AI model: Google Gemini via the google-genai SDK
- Database: SQLAlchemy-compatible database via DATABASE_URL

## Project Structure

- frontend/ — React + Vite user interface
- backend/ — FastAPI backend, database models, and API logic
- README.md — setup and usage instructions

## Prerequisites

Before running the app locally, make sure you have:

- Python 3.10 or newer
- Node.js 18 or newer
- A Google Gemini API key

## Quick Start

### 1. Backend setup

Open a terminal in the backend folder and create a virtual environment:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

Install the Python dependencies:

```powershell
pip install -r requirements.txt
```

Create a .env file inside backend/ with the following values:

```text
GEMINI_API_KEY=your_real_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
```

Start the backend server:

```powershell
uvicorn main:app --reload --port 8000
```

The API will be available at http://localhost:8000.

### 2. Frontend setup

Open a terminal in the frontend folder and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually http://localhost:5173.

## API Overview

- GET / — health check
- POST /generate — submit a prompt and receive a generated roadmap
- GET /projects — retrieve previously saved projects

## Environment Variables

- GEMINI_API_KEY — required for Gemini access
- GEMINI_MODEL — optional, defaults to gemini-2.5-flash
- DATABASE_URL — required for connecting to the database

## Notes on the MVP

This version is intentionally focused on supporting early-stage planning and learning. It is not yet a full production platform, and features such as authentication, multi-user collaboration, and advanced project management are still future improvements.

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
