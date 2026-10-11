import { ChatPage } from '@/pages/chat-page'
import { AppProviders } from './providers/AppProviders'
import './styles/global.css'

export function App() {
  return (
    <AppProviders>
      <ChatPage />
    </AppProviders>
  )
}

export default App
