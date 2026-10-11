import { useChats } from '@/entities/chat'
import { MessageBubble, useMessages } from '@/entities/message'
import { SendMessageForm } from '@/features/send-message'
import { Avatar } from '@/shared/ui'
import './ChatWindow.css'

export function ChatWindow() {
  const { activeChat } = useChats()
  const { getMessages } = useMessages()
  const messages = getMessages(activeChat?.chatId)

  if (!activeChat) {
    return (
      <section className="chat-window chat-window--empty">
        <p>Выберите или создайте чат</p>
      </section>
    )
  }

  return (
    <section className="chat-window">
      <header className="chat-window__header">
        <Avatar name={activeChat.title || activeChat.phone} size={40} />
        <div className="chat-window__meta">
          <strong>{activeChat.title || activeChat.phone}</strong>
          <span>{activeChat.phone || activeChat.chatId}</span>
        </div>
      </header>

      <div className="chat-window__messages">
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
