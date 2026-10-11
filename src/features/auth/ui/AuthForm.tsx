import { useState, type FormEvent } from 'react'
import { Button, Input } from '@/shared/ui'
import { DEFAULT_API_URL } from '@/shared/config'
import { useAuth } from '../model/useAuth'
import './AuthForm.css'

export function AuthForm() {
  const { credentials, login, logout, isAuthenticated, error } = useAuth()
  const [idInstance, setIdInstance] = useState(credentials?.idInstance ?? '')
  const [apiTokenInstance, setApiTokenInstance] = useState(
    credentials?.apiTokenInstance ?? '',
  )
  const [apiUrl, setApiUrl] = useState(credentials?.apiUrl ?? DEFAULT_API_URL)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    login({ idInstance, apiTokenInstance, apiUrl })
  }

  if (isAuthenticated && credentials) {
    return (
      <div className="auth-form auth-form--compact">
        <p className="auth-form__hint">
          Instance: <code>{credentials.idInstance}</code>
        </p>
        <Button variant="ghost" onClick={logout}>
          Выйти
        </Button>
      </div>
    )
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">GREEN-API</h2>
      <Input
        label="idInstance"
        name="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        autoComplete="off"
      />
      <Input
        label="apiTokenInstance"
        name="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        autoComplete="off"
      />
      <Input
        label="apiUrl"
        name="apiUrl"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        autoComplete="off"
      />
      {error ? <p className="auth-form__error">{error}</p> : null}
      <Button type="submit">Войти</Button>
    </form>
  )
}
