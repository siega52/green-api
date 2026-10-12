import { useEffect, useRef } from 'react'
import { useChats } from '@/entities/chat'
import { MessageBubble, useMessages } from '@/entities/message'
import { SendMessageForm } from '@/features/send-message'
import { Avatar } from '@/shared/ui'
import './ChatWindow.css'

export function ChatWindow() {
  const { activeChat } = useChats()
  const { getMessages } = useMessages()
  const messages = getMessages(activeChat?.chatId)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = listRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages.length, activeChat?.chatId])

  if (!activeChat) {
    return (
      <section className="chat-window chat-window--empty">
        <div className="chat-window__empty-card">
          <p>Выберите или создайте чат, чтобы начать переписку</p>
        </div>
      </section>
    )
  }

  return (
    <section className="chat-window">
      <header className="chat-window__header">
        <Avatar name={activeChat.title || activeChat.phone} size={42} />
        <div className="chat-window__meta">
          <strong>{activeChat.title || activeChat.phone}</strong>
          <span>{activeChat.phone || activeChat.chatId}</span>
        </div>
      </header>

      <div className="chat-window__messages" ref={listRef}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <footer className="chat-window__composer">
        <SendMessageForm chatId={activeChat.chatId} />
      </footer>
    </section>
  )
}
