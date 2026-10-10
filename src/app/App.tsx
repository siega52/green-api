import { AppProviders } from './providers/AppProviders'
import './styles/global.css'

export function App() {
  return (
    <AppProviders>
      <main style={{ padding: 24 }}>
        <h1 style={{ margin: 0 }}>GREEN-API Telegram Chat</h1>
        <p style={{ color: 'var(--tg-muted)' }}>FSD scaffold</p>
      </main>
    </AppProviders>
  )
}

export default App
