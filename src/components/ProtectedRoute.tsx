import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userEmail } = useAuth()
  const location = useLocation()

  if (!userEmail) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
