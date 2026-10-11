import type { Message } from '../model/types'
import './MessageBubble.css'

type MessageBubbleProps = {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.direction === 'outgoing'
  const time = new Date(message.timestamp * 1000 || message.timestamp)

  return (
    <div
      className={`message-bubble${isOutgoing ? ' message-bubble--outgoing' : ''}`}
    >
      <p className="message-bubble__text">{message.text}</p>
      <time className="message-bubble__time">
        {Number.isNaN(time.getTime())
          ? ''
          : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </time>
    </div>
  )
}
