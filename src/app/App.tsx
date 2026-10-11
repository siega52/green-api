import { AppProviders } from './providers/AppProviders'
import { AuthPanel } from '@/widgets/auth-panel'
import './styles/global.css'

export function App() {
  return (
    <AppProviders>
      <div style={{ minHeight: '100%', background: 'var(--tg-bg)' }}>
        <AuthPanel />
      </div>
    </AppProviders>
  )
}

export default App
