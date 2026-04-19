import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getStoredEmail, login as authLogin, logout as authLogout } from '../auth'

type AuthContextValue = {
  userEmail: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(() =>
    getStoredEmail(),
  )

  const login = useCallback((email: string, password: string) => {
    const ok = authLogin(email, password)
    if (ok) setUserEmail(getStoredEmail())
    return ok
  }, [])

  const logout = useCallback(() => {
    authLogout()
    setUserEmail(null)
  }, [])

  const value = useMemo(
    () => ({
      userEmail,
      login,
      logout,
    }),
    [userEmail, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
