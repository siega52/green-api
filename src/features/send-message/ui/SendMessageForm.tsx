import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { useSendMessage } from '../model/useSendMessage'
import './SendMessageForm.css'

type SendMessageFormProps = {
  chatId?: string
}

export function SendMessageForm({ chatId }: SendMessageFormProps) {
  const [text, setText] = useState('')
  const { send, isSending, error } = useSendMessage(chatId)

  const submit = async () => {
    const result = await send(text)
    if (result) setText('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await submit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void submit()
    }
  }

  return (
    <form className="send-message-form" onSubmit={handleSubmit}>
      <input
        className="send-message-form__input"
        type="text"
        placeholder="Написать сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!chatId || isSending}
      />
      <button
        type="submit"
        className="send-message-form__send"
        disabled={!chatId || isSending || !text.trim()}
        aria-label="Отправить"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path
            fill="currentColor"
            d="M3.4 20.4 20.85 12.3a.8.8 0 0 0 0-1.4L3.4 2.8a.8.8 0 0 0-1.15.9l2.1 7.05a.8.8 0 0 0 .6.55l8.35 1.1-8.35 1.1a.8.8 0 0 0-.6.55L2.25 19.5a.8.8 0 0 0 1.15.9Z"
          />
        </svg>
      </button>
      {error ? <p className="send-message-form__error">{error}</p> : null}
    </form>
  )
}
