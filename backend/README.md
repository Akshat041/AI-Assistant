Setup and run the backend

1. Copy `.env.example` to `.env` and set your Gemini API key:

```
GEMINI_API_KEY=your_real_gemini_api_key_here
```

2. Create and activate a virtual environment (Windows example):

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

3. Run the backend server:

```powershell
uvicorn main:app --reload --port 8000
```

4. The frontend expects the backend at `http://localhost:8000` and will POST to `/generate`.

Troubleshooting:

- If the server raises "GEMINI_API_KEY environment variable not set", ensure `.env` exists and the process was restarted after creating the file.
- If you see GenAI client errors, verify `google-genai` version in `requirements.txt` and network access.

Optional: change Gemini model
- You can select a different Gemini model via the `GEMINI_MODEL` environment variable (for example `gemini-1.0`) if you encounter availability or rate-limit errors. If unset, the server defaults to `gemini-1.0`.
