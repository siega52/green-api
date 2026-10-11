import { useState } from 'react'
import { useSession, type Credentials } from '@/entities/session'

type LoginInput = {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}

export function useAuth() {
  const { credentials, setCredentials, clearSession, isAuthenticated } =
    useSession()
  const [error, setError] = useState<string | null>(null)

  const login = ({ idInstance, apiTokenInstance, apiUrl }: LoginInput) => {
    setError(null)
    const next: Credentials = {
      idInstance: String(idInstance ?? '').trim(),
      apiTokenInstance: String(apiTokenInstance ?? '').trim(),
      apiUrl: String(apiUrl ?? '').trim(),
    }

    if (!next.idInstance || !next.apiTokenInstance || !next.apiUrl) {
      setError('Укажите idInstance, apiTokenInstance и apiUrl')
      return false
    }

    setCredentials(next)
    return true
  }

  const logout = () => {
    clearSession()
  }

  return {
    credentials,
    isAuthenticated,
    error,
    login,
    logout,
  }
}
