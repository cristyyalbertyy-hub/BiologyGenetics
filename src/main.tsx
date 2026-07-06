import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AuthProvider } from './context/AuthContext'
import { AuthGate } from './components/AuthGate'
import { APP_TITLE } from './data/curriculum'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Elemento #root não existe no index.html.')
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <AuthGate appTitle={APP_TITLE}>
          <App />
        </AuthGate>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
