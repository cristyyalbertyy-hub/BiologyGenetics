/** Credenciais de demonstração — altere aqui ou use variáveis de ambiente Vite. */

const STORAGE_KEY = 'biology-genetics-session'

const envEmail = import.meta.env.VITE_AUTH_EMAIL as string | undefined
const envPassword = import.meta.env.VITE_AUTH_PASSWORD as string | undefined

export const DEMO_EMAIL = envEmail ?? 'student@biology.genetics'
export const DEMO_PASSWORD = envPassword ?? 'genetics2026'

export function getStoredEmail(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setSession(email: string): void {
  sessionStorage.setItem(STORAGE_KEY, email)
}

export function clearSession(): void {
  sessionStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated(): boolean {
  return getStoredEmail() !== null
}

export function login(email: string, password: string): boolean {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    setSession(email)
    return true
  }
  return false
}

export function logout(): void {
  clearSession()
}
