import { useState, type FormEvent } from 'react'
import { Button, Input } from '@/shared/ui'
import { useCreateChat } from '../model/useCreateChat'
import './CreateChatForm.css'

export function CreateChatForm() {
  const [phone, setPhone] = useState('')
  const { createChat, isLoading, error } = useCreateChat()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const chat = await createChat(phone)
    if (chat) setPhone('')
  }

  return (
    <form className="create-chat-form" onSubmit={handleSubmit}>
      <div className="create-chat-form__row">
        <Input
          name="phone"
          placeholder="79991234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          className="create-chat-form__input"
        />
        <Button type="submit" disabled={isLoading || !phone.trim()}>
          {isLoading ? '…' : 'Создать'}
        </Button>
      </div>
      {error ? <p className="create-chat-form__error">{error}</p> : null}
    </form>
  )
}
