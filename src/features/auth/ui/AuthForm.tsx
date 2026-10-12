import { useState, type FormEvent } from 'react'
import { Button, Input } from '@/shared/ui'
import { useAuth } from '../model/useAuth'
import './AuthForm.css'

export function AuthForm() {
  const { credentials, login, logout, isAuthenticated, error } = useAuth()
  const [idInstance, setIdInstance] = useState(credentials?.idInstance ?? '')
  const [apiTokenInstance, setApiTokenInstance] = useState(
    credentials?.apiTokenInstance ?? '',
  )
  const [apiUrl, setApiUrl] = useState(credentials?.apiUrl ?? '')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    login({ idInstance, apiTokenInstance, apiUrl })
  }

  if (isAuthenticated && credentials) {
    return (
      <div className="auth-form auth-form--compact">
        <div className="auth-form__session">
          <span className="auth-form__status" aria-hidden />
          <p className="auth-form__hint">
            Instance <code>{credentials.idInstance}</code>
          </p>
        </div>
        <Button variant="ghost" onClick={logout}>
          Выйти
        </Button>
      </div>
    )
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <Input
        label="idInstance"
        name="idInstance"
        placeholder="4100..."
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        autoComplete="off"
      />
      <Input
        label="apiTokenInstance"
        name="apiTokenInstance"
        type="password"
        placeholder="Токен из кабинета"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        autoComplete="off"
      />
      <Input
        label="apiUrl"
        name="apiUrl"
        placeholder="https://4100.api.green-api.com"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        autoComplete="off"
      />
      {error ? <p className="auth-form__error">{error}</p> : null}
      <Button type="submit" className="auth-form__submit">
        Войти в чат
      </Button>
    </form>
  )
}
