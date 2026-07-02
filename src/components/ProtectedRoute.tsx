import { useMemo, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { NoAccessPage } from '../pages/NoAccessPage'

function isFromContaHandoff(): boolean {
  if (typeof window === 'undefined') return false
  return (
    new URLSearchParams(window.location.search).has('studio9_handoff') ||
    sessionStorage.getItem('studio9_from_conta') === '1'
  )
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, user, entitlementLoading, hasAccess, configured } = useAuth()
  const location = useLocation()
  const fromConta = useMemo(() => isFromContaHandoff(), [])

  if (!configured) {
    return (
      <div className="auth-layout">
        <div className="auth-card">
          <p className="form-error" role="alert">
            Autenticação não configurada neste ambiente.
          </p>
        </div>
      </div>
    )
  }

  if (hasAccess) {
    return <>{children}</>
  }

  if (loading || (user && entitlementLoading)) {
    if (fromConta && user) {
      return null
    }
    return (
      <div className="auth-layout">
        <div className="auth-card">
          <p className="auth-hint">A verificar acesso…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!hasAccess) {
    return <NoAccessPage />
  }

  return <>{children}</>
}
