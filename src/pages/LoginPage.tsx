import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DEMO_EMAIL } from '../auth'
import { APP_TITLE } from '../data/curriculum'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const ok = login(email.trim(), password)
    if (ok) {
      navigate(from && from !== '/login' ? from : '/app', { replace: true })
    } else {
      setError('Email ou palavra-passe incorretos.')
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="app-brand">{APP_TITLE}</h1>
        <p className="auth-hint">Inicie sessão para aceder ao conteúdo.</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={DEMO_EMAIL}
            />
          </label>
          <label>
            <span>Palavra-passe</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </form>
        <p className="demo-note">
          Conta de demonstração: use o email sugerido e a palavra-passe
          definida no projeto (ver <code>src/auth.ts</code>).
        </p>
      </div>
    </div>
  )
}
