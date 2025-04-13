"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface PlaceholdersAndVanishInputProps {
  placeholders: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (value: string) => void
  value?: string
  disabled?: boolean
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  value = "",
  disabled = false,
}: PlaceholdersAndVanishInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState("")
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentText = placeholders[currentPlaceholderIndex]

      if (isDeleting) {
        setCurrentPlaceholder((prev) => prev.slice(0, -1))
        if (currentPlaceholder === "") {
          setIsDeleting(false)
          setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
          setCurrentCharIndex(0)
        }
      } else {
        if (currentCharIndex < currentText.length) {
          setCurrentPlaceholder((prev) => prev + currentText[currentCharIndex])
          setCurrentCharIndex((prev) => prev + 1)
        } else {
          // Pause at the end of the text before deleting
          setTimeout(() => {
            setIsDeleting(true)
          }, 2000)
        }
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [currentCharIndex, currentPlaceholder, currentPlaceholderIndex, isDeleting, placeholders])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.trim() && !disabled) {
      onSubmit(value)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="relative w-full max-w-3xl mx-auto">
      <Input
        ref={inputRef}
        type="text"
        placeholder={currentPlaceholder}
        className="w-full py-6 pl-4 pr-12 text-base bg-gray-800/50 border-gray-700 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
        disabled={!value.trim() || disabled}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
