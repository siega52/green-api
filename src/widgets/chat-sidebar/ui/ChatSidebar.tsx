import { ChatListItem, useChats } from '@/entities/chat'
import { CreateChatForm } from '@/features/create-chat'
import { useSession } from '@/entities/session'
import './ChatSidebar.css'

export function ChatSidebar() {
  const { isAuthenticated } = useSession()
  const { chats, activeChatId, selectChat } = useChats()

  return (
    <aside className="chat-sidebar">
      <header className="chat-sidebar__header">
        <h2 className="chat-sidebar__title">Чаты</h2>
        <p className="chat-sidebar__caption">Новый диалог по номеру</p>
      </header>
      {isAuthenticated ? <CreateChatForm /> : null}
      <div className="chat-sidebar__list">
        {chats.length === 0 ? (
          <p className="chat-sidebar__empty">
            {isAuthenticated
              ? 'Пока пусто — создайте чат по номеру телефона'
              : 'Войдите, чтобы начать'}
          </p>
        ) : (
          chats.map((chat) => (
            <ChatListItem
              key={chat.chatId}
              chat={chat}
              isActive={chat.chatId === activeChatId}
              onSelect={selectChat}
            />
          ))
        )}
      </div>
    </aside>
  )
}
