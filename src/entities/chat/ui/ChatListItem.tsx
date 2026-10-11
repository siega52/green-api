import { Avatar } from '@/shared/ui'
import type { Chat } from '../model/types'
import './ChatListItem.css'

type ChatListItemProps = {
  chat: Chat
  isActive: boolean
  onSelect?: (chatId: string) => void
}

export function ChatListItem({ chat, isActive, onSelect }: ChatListItemProps) {
  return (
    <button
      type="button"
      className={`chat-list-item${isActive ? ' chat-list-item--active' : ''}`}
      onClick={() => onSelect?.(chat.chatId)}
    >
      <Avatar name={chat.title || chat.phone} size={42} />
      <span className="chat-list-item__body">
        <span className="chat-list-item__title">
          {chat.title || chat.phone || chat.chatId}
        </span>
        <span className="chat-list-item__subtitle">
          {chat.phone || chat.chatId}
        </span>
      </span>
    </button>
  )
}
