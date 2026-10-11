export type MessageDirection = 'outgoing' | 'incoming'

export type Message = {
  id: string
  chatId: string
  text: string
  timestamp: number
  direction: MessageDirection
}
