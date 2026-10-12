import { useSession } from '@/entities/session'
import { AuthPanel } from '@/widgets/auth-panel'
import { ChatSidebar } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'
import './ChatPage.css'

export function ChatPage() {
  const { isAuthenticated } = useSession()

  return (
    <div
      className={`chat-page${isAuthenticated ? ' chat-page--ready' : ' chat-page--login'}`}
    >
      {isAuthenticated ? (
        <div className="chat-page__shell">
          <AuthPanel />
          <div className="chat-page__workspace">
            <ChatSidebar />
            <ChatWindow />
          </div>
        </div>
      ) : (
        <div className="chat-page__login">
          <div className="chat-page__login-card">
            <div className="chat-page__brand">
              <span className="chat-page__logo" aria-hidden>
                ✈
              </span>
              <h1 className="chat-page__title">Telegram Chat</h1>
              <p className="chat-page__subtitle">
                Вход через учётные данные GREEN-API
              </p>
            </div>
            <AuthPanel />
          </div>
        </div>
      )}
    </div>
  )
}
