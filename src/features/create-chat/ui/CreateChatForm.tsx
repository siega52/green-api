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
      <Input
        label="Номер получателя"
        name="phone"
        placeholder="79991234567"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={isLoading}
      />
      {error ? <p className="create-chat-form__error">{error}</p> : null}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Создание…' : 'Создать чат'}
      </Button>
    </form>
  )
}
