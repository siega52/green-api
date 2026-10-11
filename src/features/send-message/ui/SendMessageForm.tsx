import { useState, type FormEvent } from 'react'
import { Button } from '@/shared/ui'
import { useSendMessage } from '../model/useSendMessage'
import './SendMessageForm.css'

type SendMessageFormProps = {
  chatId?: string
}

export function SendMessageForm({ chatId }: SendMessageFormProps) {
  const [text, setText] = useState('')
  const { send, isSending, error } = useSendMessage(chatId)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const result = await send(text)
    if (result) setText('')
  }

  return (
    <form className="send-message-form" onSubmit={handleSubmit}>
      <input
        className="send-message-form__input"
        type="text"
        placeholder="Сообщение"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!chatId || isSending}
      />
      <Button type="submit" disabled={!chatId || isSending || !text.trim()}>
        Отправить
      </Button>
      {error ? <p className="send-message-form__error">{error}</p> : null}
    </form>
  )
}
