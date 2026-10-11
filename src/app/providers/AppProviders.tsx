import type { ReactNode } from 'react'
import { ChatProvider } from '@/entities/chat'
import { MessageProvider } from '@/entities/message'
import { SessionProvider } from '@/entities/session'
import { ReceiveMessagesWatcher } from '@/features/receive-messages'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ChatProvider>
        <MessageProvider>
          <ReceiveMessagesWatcher />
          {children}
        </MessageProvider>
      </ChatProvider>
    </SessionProvider>
  )
}
