import type { Message, MessageDirection } from '@/entities/message'

export type NotificationBody = {
  typeWebhook?: string
  idMessage?: string
  timestamp?: number
  senderData?: {
    chatId?: string
    chatName?: string
    senderName?: string
    senderPhoneNumber?: number
  }
  messageData?: {
    typeMessage?: string
    textMessageData?: {
      textMessage?: string
    }
  }
}

export type ParsedTextMessage = Message & {
  chatName: string
  phone: string
}

export function parseTextMessage(
  body: NotificationBody | null | undefined,
): ParsedTextMessage | null {
  if (!body?.typeWebhook || !body?.messageData) return null

  const incomingTypes = new Set([
    'incomingMessageReceived',
    'outgoingMessageReceived',
    'outgoingAPIMessageReceived',
  ])

  if (!incomingTypes.has(body.typeWebhook)) return null

  const { messageData, senderData, idMessage, timestamp } = body
  if (messageData.typeMessage !== 'textMessage') return null

  const text = messageData.textMessageData?.textMessage
  const chatId = senderData?.chatId
  if (!text || !chatId || !idMessage) return null

  const direction: MessageDirection =
    body.typeWebhook === 'incomingMessageReceived' ? 'incoming' : 'outgoing'

  return {
    id: String(idMessage),
    chatId: String(chatId),
    text,
    timestamp: timestamp ?? Math.floor(Date.now() / 1000),
    direction,
    chatName: senderData.chatName || senderData.senderName || '',
    phone: senderData.senderPhoneNumber
      ? String(senderData.senderPhoneNumber)
      : '',
  }
}
