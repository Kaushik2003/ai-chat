import google.generativeai as ai
from wandb.env import API_KEY

API_KEY = 'your_api_key_here'

ai.configure(api_key=API_KEY)


model = ai.GenerativeAI("gemini-pro")
chat = model.start_chat()

while True:
    message = input('You: ')
    if message.lower() == 'exit':
        print('Chatbot: Goodbye!')
        break
    response = chat.send_message(message)
    print('Chatbot:', response.text)