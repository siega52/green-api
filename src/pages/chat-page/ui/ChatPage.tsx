import { useSession } from '@/entities/session'
import { AuthPanel } from '@/widgets/auth-panel'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import './ChatPage.css'

export function ChatPage() {
  const { isAuthenticated } = useSession()

  return (
    <div className="chat-page">
      <div className="chat-page__shell">
        <AuthPanel />
        {isAuthenticated ? (
          <div className="chat-page__workspace">
            <ChatSidebar />
            <ChatWindow />
          </div>
        ) : (
          <div className="chat-page__gate">
            <p>Введите учётные данные GREEN-API, чтобы открыть чат</p>
          </div>
        )}
      </div>
    </div>
  )
}
