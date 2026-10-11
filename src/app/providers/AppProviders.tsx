import type { ReactNode } from 'react'
import { ChatProvider } from '@/entities/chat'
import { SessionProvider } from '@/entities/session'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ChatProvider>{children}</ChatProvider>
    </SessionProvider>
  )
}
