"use client"

import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow flex flex-col h-screen">
        <ChatInterface />
      </div>
    </main>
  )
}
