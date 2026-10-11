import { useState } from 'react'
import { useMessages } from '@/entities/message'
import { useSession } from '@/entities/session'
import { sendMessage } from '../api/sendMessage'

export function useSendMessage(chatId: string | undefined) {
  const { credentials } = useSession()
  const { addMessage } = useMessages()
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const send = async (text: string) => {
    setError(null)
    const message = String(text ?? '').trim()

    if (!message || !chatId || !credentials) {
      if (!message) setError('Введите текст сообщения')
      return null
    }

    setIsSending(true)
    try {
      const result = await sendMessage(credentials, { chatId, message })
      const id = result?.idMessage ?? `local-${Date.now()}`

      addMessage({
        id,
        chatId,
        text: message,
        timestamp: Math.floor(Date.now() / 1000),
        direction: 'outgoing',
      })

      return result
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось отправить сообщение',
      )
      return null
    } finally {
      setIsSending(false)
    }
  }

  return { send, isSending, error }
}
