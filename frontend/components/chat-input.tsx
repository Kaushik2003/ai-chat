"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSubmit: (value: string) => void
  disabled?: boolean
}

export function ChatInput({ onSubmit, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSubmit(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        type="text"
        placeholder="Type a message..."
        className="w-full py-6 pl-4 pr-12 text-base bg-gray-800/50 border-gray-700 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-500 text-white rounded-full"
        disabled={!input.trim() || disabled}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
