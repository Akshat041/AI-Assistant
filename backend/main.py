from google import genai
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
import logging
import models
from database import SessionLocal, engine
import models

# temorary import for database connection test
from database import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)  # Create tables if they don't exist

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
# Read API key from environment (recommended) or .env file.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY environment variable not set. Add it to your environment or a .env file.")

# Initialize GenAI client
client = genai.Client(api_key=GEMINI_API_KEY)

GEMINI_MODEL = "gemini-2.5-flash"
MODEL_NAME = os.getenv("GEMINI_MODEL", GEMINI_MODEL)  # Allow overriding model via environment variable

class PromptRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=10000)


class PromptResponse(BaseModel):
    response: str

# Allow the frontend app to send requests to this backend.
# Update these origins if your frontend runs on a different port.
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello, this is the AI Assistant backend!"}

# this is a post request that accepts a prompt and returns a response
@app.post("/generate", response_model=PromptResponse)
async def generate(prompt_request: PromptRequest, db: Session = Depends(get_db)):
    """Accept a prompt from the frontend and return a mock response."""
    prompt = prompt_request.prompt
    # print(f"Received prompt: {prompt}")
    logger.info(f"Received prompt: {prompt}")

    # Generate a response using the GenAI model via the client.
    try:
        gen_response = client.models.generate_content(model=MODEL_NAME, contents=prompt)
        text = getattr(gen_response, "text", None) or gen_response.output[0].content[0].text
    except Exception as e:
        logger.exception(f"Error calling GenAI: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {e}")

    # Persist to DB: create Conversation row, commit, refresh
    try:
        conv = models.Conversation(prompt=prompt, response=text)
        db.add(conv)
        db.commit()         # commit transaction
        db.refresh(conv)    # populate conv.id and conv.created_at from DB
    except Exception as e:
        db.rollback()
        logger.exception(f"Error saving conversation to DB: {e}")
        # Optionally return the LLM response anyway or raise an error
        raise HTTPException(status_code=500, detail="Failed to save conversation")

    logger.info(f"Generated response: {text}")
    return PromptResponse(response=text)
