import type { ReactNode } from 'react'
import { ChatProvider } from '@/entities/chat'
import { MessageProvider } from '@/entities/message'
import { SessionProvider } from '@/entities/session'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ChatProvider>
        <MessageProvider>{children}</MessageProvider>
      </ChatProvider>
    </SessionProvider>
  )
}
