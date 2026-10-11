import { useEffect, useRef } from 'react'
import { useChats } from '@/entities/chat'
import { useMessages } from '@/entities/message'
import { useSession } from '@/entities/session'
import { deleteNotification } from '../api/deleteNotification'
import { receiveNotification } from '../api/receiveNotification'
import { parseTextMessage } from '../lib/parseNotification'

export function useReceiveMessages() {
  const { credentials, isAuthenticated } = useSession()
  const { addMessage } = useMessages()
  const { addChat, chats } = useChats()
  const chatsRef = useRef(chats)
  chatsRef.current = chats

  useEffect(() => {
    if (!isAuthenticated || !credentials) return undefined

    let cancelled = false

    const loop = async () => {
      while (!cancelled) {
        try {
          const notification = await receiveNotification(credentials)
          if (cancelled) break

          if (notification?.receiptId != null) {
            const parsed = parseTextMessage(notification.body)
            if (parsed) {
              const { chatName, phone, ...message } = parsed
              addMessage(message)

              const known = chatsRef.current.some(
                (chat) => chat.chatId === parsed.chatId,
              )
              if (!known) {
                addChat({
                  chatId: parsed.chatId,
                  phone,
                  title: chatName || phone || parsed.chatId,
                })
              }
            }

            await deleteNotification(credentials, notification.receiptId)
          }
        } catch {
          if (cancelled) break
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }
    }

    void loop()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, credentials, addMessage, addChat])
}
