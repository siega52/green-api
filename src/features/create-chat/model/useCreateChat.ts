import { useState } from 'react'
import { useChats, type Chat } from '@/entities/chat'
import { useSession } from '@/entities/session'
import { normalizePhone, phoneToChatId } from '@/shared/lib'
import { checkAccount } from '../api/checkAccount'

export function useCreateChat() {
  const { credentials } = useSession()
  const { addChat } = useChats()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createChat = async (phoneInput: string): Promise<Chat | null> => {
    setError(null)
    const phone = normalizePhone(phoneInput)

    if (!phone) {
      setError('Введите номер телефона')
      return null
    }

    if (!credentials) {
      setError('Сначала войдите с учётными данными GREEN-API')
      return null
    }

    setIsLoading(true)
    try {
      let chatId = phoneToChatId(phone)
      let title = phone

      try {
        const result = await checkAccount(credentials, phone)
        if (result?.chatId) {
          chatId = String(result.chatId)
        }
        if (result?.name) {
          title = result.name
        }
      } catch {
        // фаллбек
      }

      const chat: Chat = { chatId, phone, title }
      addChat(chat)
      return chat
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось создать чат')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { createChat, isLoading, error }
}
