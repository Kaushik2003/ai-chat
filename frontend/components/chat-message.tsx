import { cn } from "@/lib/utils"
import { User, Bot } from "lucide-react"

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div className="flex items-start mb-4 gap-3">
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-gray-700" : "bg-gray-800",
        )}
      >
        {isUser ? <User className="h-4 w-4 text-gray-300" /> : <Bot className="h-4 w-4 text-gray-300" />}
      </div>
      <div
        className={cn("max-w-[80%] rounded-lg p-4", isUser ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-100")}
      >
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  )
}
