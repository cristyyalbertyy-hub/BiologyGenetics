import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { APP_TITLE } from '../data/curriculum'

export function LoginPage() {
  const { sendMagicLink, configured, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate(from && from !== '/login' ? from : '/app', { replace: true })
    }
  }, [loading, user, from, navigate])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error: authError } = await sendMagicLink(email)
    setSubmitting(false)
    if (authError) {
      setError(authError)
      return
    }
    setSent(true)
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="app-brand">{APP_TITLE}</h1>
        <p className="auth-hint">
          Recomendado: entre uma vez em{' '}
          <a
            href="https://medical-science-lilac.vercel.app/conta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            A minha conta Studio9
          </a>{' '}
          e abra os pacotes de lá — evita pedir magic link em cada app.
        </p>
        <p className="auth-hint">
          Compre o módulo no site Medical Science e use o mesmo email para
          receber um link de acesso válido durante 1 ano.
        </p>

        {!configured ? (
          <p className="form-error" role="alert">
            Login temporariamente indisponível. Tente mais tarde ou contacte o
            suporte.
          </p>
        ) : sent ? (
          <div className="auth-sent">
            <p>
              Enviámos um link para <strong>{email.trim()}</strong>.
            </p>
            <p className="auth-hint">
              Abra o email e clique no link para entrar. Pode fechar este
              separador — o acesso abre automaticamente no browser.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSent(false)}
            >
              Usar outro email
            </button>
          </div>
        ) : (
          <form className="auth-form" onSubmit={onSubmit}>
            <label>
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="o email usado na compra"
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'A enviar…' : 'Enviar link de acesso'}
            </button>
          </form>
        )}

        <p className="demo-note">
          Ainda não comprou?{' '}
          <a
            href="https://medical-science-lilac.vercel.app/precos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver preços e planos
          </a>
        </p>
      </div>
    </div>
  )
}
