import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Message } from './types'

type MessageContextValue = {
  byChatId: Record<string, Message[]>
  addMessage: (message: Message) => void
  getMessages: (chatId: string | null | undefined) => Message[]
}

const MessageContext = createContext<MessageContextValue | null>(null)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [byChatId, setByChatId] = useState<Record<string, Message[]>>({})

  const addMessage = useCallback((message: Message) => {
    setByChatId((prev) => {
      const list = prev[message.chatId] ?? []
      if (list.some((item) => item.id === message.id)) {
        return prev
      }
      return {
        ...prev,
        [message.chatId]: [...list, message],
      }
    })
  }, [])

  const getMessages = useCallback(
    (chatId: string | null | undefined) =>
      chatId ? (byChatId[chatId] ?? []) : [],
    [byChatId],
  )

  const value = useMemo<MessageContextValue>(
    () => ({
      byChatId,
      addMessage,
      getMessages,
    }),
    [byChatId, addMessage, getMessages],
  )

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  )
}

export function useMessages(): MessageContextValue {
  const ctx = useContext(MessageContext)
  if (!ctx) {
    throw new Error('useMessages must be used within MessageProvider')
  }
  return ctx
}
