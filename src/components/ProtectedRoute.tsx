import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { NoAccessPage } from '../pages/NoAccessPage'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, user, entitlementLoading, hasAccess, configured } = useAuth()
  const location = useLocation()

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

  if (loading || (user && entitlementLoading)) {
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
