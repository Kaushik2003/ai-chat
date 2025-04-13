"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input"
import { ChatInput } from "./chat-input"
import { ChatMessage } from "./chat-message"
import { Loader2 } from "lucide-react"

interface Message {
  content: string
  isUser: boolean
}

export function ChatInterface() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ]

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (value: string) => {
    const userMessage = { content: value, isUser: true }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    if (isFirstMessage) {
      setIsFirstMessage(false)
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: value }),
      })

      const data = await res.json()
      const botResponse = data.response || data.error || "No response"

      setMessages((prev) => [...prev, { content: botResponse, isUser: false }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [...prev, { content: "Error connecting to backend.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {isFirstMessage ? (
        <div className="flex flex-col justify-center items-center flex-grow px-4">
          <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white">Ask Jarvis Anything</h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={input}
            disabled={loading}
          />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Jarvis Chat</h2>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message.content} isUser={message.isUser} />
            ))}
            {loading && (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-800">
            <ChatInput onSubmit={handleSubmit} disabled={loading} />
          </div>
        </div>
      )}
    </div>
  )
}
