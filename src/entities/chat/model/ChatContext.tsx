import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS } from '@/shared/config'
import type { Chat } from './types'

function loadChats(): Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.chats)
    if (!raw) return []
    return JSON.parse(raw) as Chat[]
  } catch {
    return []
  }
}

function persistChats(chats: Chat[]): void {
  localStorage.setItem(STORAGE_KEYS.chats, JSON.stringify(chats))
}

type ChatContextValue = {
  chats: Chat[]
  activeChatId: string | null
  activeChat: Chat | null
  addChat: (chat: Chat) => void
  selectChat: (chatId: string) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(() => loadChats())
  const [activeChatId, setActiveChatId] = useState<string | null>(
    () => loadChats()[0]?.chatId ?? null,
  )

  const addChat = useCallback((chat: Chat) => {
    setChats((prev) => {
      const exists = prev.some((item) => item.chatId === chat.chatId)
      const next = exists
        ? prev.map((item) =>
            item.chatId === chat.chatId ? { ...item, ...chat } : item,
          )
        : [chat, ...prev]
      persistChats(next)
      return next
    })
    setActiveChatId(chat.chatId)
  }, [])

  const selectChat = useCallback((chatId: string) => {
    setActiveChatId(chatId)
  }, [])

  const activeChat = useMemo(
    () => chats.find((chat) => chat.chatId === activeChatId) ?? null,
    [chats, activeChatId],
  )

  const value = useMemo<ChatContextValue>(
    () => ({
      chats,
      activeChatId,
      activeChat,
      addChat,
      selectChat,
    }),
    [chats, activeChatId, activeChat, addChat, selectChat],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChats(): ChatContextValue {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error('useChats must be used within ChatProvider')
  }
  return ctx
}
