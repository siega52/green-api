import { useSession } from '@/entities/session'
import { AuthPanel } from '@/widgets/auth-panel'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import { AppProviders } from './providers/AppProviders'
import './styles/global.css'

function AppContent() {
  const { isAuthenticated } = useSession()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        background: 'var(--tg-bg)',
      }}
    >
      <AuthPanel />
      {isAuthenticated ? (
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 320px) 1fr',
            minHeight: 0,
          }}
        >
          <ChatSidebar />
          <ChatWindow />
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--tg-muted)',
            padding: 24,
          }}
        >
          Введите учётные данные GREEN-API, чтобы открыть чат
        </div>
      )}
    </div>
  )
}

export function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  )
}

export default App
