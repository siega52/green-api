import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearCredentials,
  loadCredentials,
  saveCredentials,
} from './sessionStorage'
import type { Credentials } from './types'

type SessionContextValue = {
  credentials: Credentials | null
  isAuthenticated: boolean
  setCredentials: (next: Credentials) => void
  clearSession: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentialsState] = useState<Credentials | null>(() =>
    loadCredentials(),
  )

  const value = useMemo<SessionContextValue>(
    () => ({
      credentials,
      isAuthenticated: Boolean(
        credentials?.idInstance &&
          credentials?.apiTokenInstance &&
          credentials?.apiUrl,
      ),
      setCredentials: (next) => {
        saveCredentials(next)
        setCredentialsState(next)
      },
      clearSession: () => {
        clearCredentials()
        setCredentialsState(null)
      },
    }),
    [credentials],
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext)
  if (!ctx) {
    throw new Error('useSession must be used within SessionProvider')
  }
  return ctx
}
