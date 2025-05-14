'use client'
import React, { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import Link from "next/link"

type Message = {
  id: number
  text: string
  from: "me" | "other"
}

const Chat = () => {
   const { user, isLoaded } = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! How's your day going?", from: "other" },
    { id: 2, text: "Pretty good! Just working on some code 😎", from: "me" },
  ])

  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      from: "me",
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  // Scroll to the bottom of the chat container when messages change
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      // Scroll to the bottom of the container
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Scroll to the bottom after the component updates
    scrollToBottom()
  }, [messages]) // Trigger on message updates
if (!user?.tg_id) {
  return <div className="flex flex-col h-[70vh] bg-background text-foreground border rounded-xl overflow-hidden justify-center items-center">

  <h2>Для користування чатом Вам необхідно зареєструватись</h2>

  <Link href={'/login'}>Увійти 🔓</Link>
  </div>
}
  return (
    <div className="flex flex-col h-[70vh] bg-background text-foreground border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-muted flex items-center gap-4 shrink-0">
        <Avatar>
          <AvatarImage src="/user-avatar.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-lg">Jessie</span>
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Chat scroll area */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={scrollAreaRef}
          className="h-full px-4 py-2 overflow-y-auto"
        >
          <div className="space-y-4">
            {messages.map((msg) =>
              msg.from === "other" ? (
                <div key={msg.id} className="flex items-start gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/user-avatar.jpg" />
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted px-4 py-2 rounded-2xl max-w-xs">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl max-w-xs">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-muted flex items-center gap-2 shrink-0">
        <Input
          placeholder="Type a message..."
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button size="icon" variant="default" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Chat
