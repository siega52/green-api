import { useState } from 'react'
import { useSession, type Credentials } from '@/entities/session'
import { DEFAULT_API_URL } from '@/shared/config'

type LoginInput = {
  idInstance: string
  apiTokenInstance: string
  apiUrl?: string
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
      apiUrl: String(apiUrl ?? DEFAULT_API_URL).trim() || DEFAULT_API_URL,
    }

    if (!next.idInstance || !next.apiTokenInstance) {
      setError('Укажите idInstance и apiTokenInstance')
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
