# import google.generativeai as genai
# import os
# from dotenv import load_dotenv



# # Load environment variables from .env file
# load_dotenv()

# # Get API key from environment variable
# API_KEY = os.getenv("GEMINI_API_KEY")
# genai.configure(api_key=API_KEY)

# # Create a model instance and start a chat
# model = genai.GenerativeModel("models/gemini-2.0-pro-exp")  # Try Gemini 2.0 Pro Experimental
# chat = model.start_chat()

# while True:
#     message = input('You: ')
#     if message.lower() == 'exit':
#         print('Chatbot: Goodbye!')
#         break
#     response = chat.send_message(message)
#     print('Chatbot:', response.text)







from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("models/gemini-2.0-pro-exp")

# Create a chat instance globally (shared across requests)
chat = model.start_chat()

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for development (for Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
async def chat_with_bot(request: ChatRequest):
    try:
        response = chat.send_message(request.prompt)
        return {"response": response.text}
    except Exception as e:
        return {"error": str(e)}
