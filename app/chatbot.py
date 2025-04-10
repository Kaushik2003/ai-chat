import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

# Create a model instance and start a chat
model = genai.GenerativeModel("models/gemini-2.0-pro-exp")  # Try Gemini 2.0 Pro Experimental
chat = model.start_chat()

while True:
    message = input('You: ')
    if message.lower() == 'exit':
        print('Chatbot: Goodbye!')
        break
    response = chat.send_message(message)
    print('Chatbot:', response.text)