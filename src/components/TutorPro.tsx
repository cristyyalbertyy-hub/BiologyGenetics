import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  TUTOR_MODES,
  fetchTutor,
  type TutorMode,
  type TutorTurn,
} from '../lib/tutor'
import { formatTutorHtml } from '../lib/tutorFormat'

type Props = {
  topicId: string
  topicTitle: string
  chapterTitle: string
}

export function TutorPro({ topicId, topicTitle, chapterTitle }: Props) {
  const { user } = useAuth()
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<TutorMode | null>(null)
  const [history, setHistory] = useState<TutorTurn[]>([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function check() {
      if (!user) {
        setEnabled(false)
        return
      }
      try {
        const token = await user.getIdToken()
        const { data } = await fetchTutor({ id_token: token })
        if (!active) return
        setEnabled(Boolean(data?.enabled))
      } catch {
        if (active) setEnabled(false)
      }
    }
    void check()
    return () => {
      active = false
    }
  }, [user])

  useEffect(() => {
    setMode(null)
    setHistory([])
    setDraft('')
    setError('')
  }, [topicId])

  if (!enabled) return null

  async function run(nextMode: TutorMode, message = '') {
    if (!user) return
    const continuing = Boolean(message) && mode === nextMode
    const conversation = continuing ? history : []
    setLoading(true)
    setError('')
    setMode(nextMode)
    if (!continuing) setHistory([])
    try {
      const token = await user.getIdToken()
      const lang = (document.documentElement.lang || 'pt').slice(0, 2)
      const { ok, status, data } = await fetchTutor({
        id_token: token,
        mode: nextMode,
        topic_id: topicId,
        lang,
        message,
        history: conversation,
      })
      if (data?.paused || status === 429) {
        setHistory([
          ...conversation,
          ...(message ? [{ role: 'user' as const, content: message }] : []),
          { role: 'assistant', content: String(data?.text ?? 'Pausa um pouco e volta daqui a uma hora.') },
        ])
        return
      }
      if (!ok || !data?.text) {
        setError(String(data?.error ?? 'Pausa um pouco e volta daqui a uma hora.'))
        return
      }
      const reply = String(data.text)
      const nextHistory: TutorTurn[] = [...conversation]
      if (message) nextHistory.push({ role: 'user', content: message })
      nextHistory.push({ role: 'assistant', content: reply })
      setHistory(nextHistory.slice(-12))
      setDraft('')
    } catch {
      setError('Pausa um pouco e volta daqui a uma hora.')
    } finally {
      setLoading(false)
    }
  }

  const placeholder = mode === 'test_me' ? 'Your answer' : 'Go deeper on this point'

  return (
    <section className="tutor-pro" aria-label="Studio9 Tutor">
      <header className="tutor-pro__head">
        <p className="tutor-pro__eyebrow">Tutor</p>
        <h3 className="tutor-pro__title">On this topic</h3>
        <p className="tutor-pro__meta">
          {chapterTitle} · {topicTitle}
        </p>
      </header>
      <div className="tutor-pro__modes">
        {TUTOR_MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`tutor-pro__mode${mode === item.id ? ' is-active' : ''}`}
            disabled={loading}
            onClick={() => void run(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {loading ? <p className="tutor-pro__status">Working…</p> : null}
      {error ? <p className="tutor-pro__error">{error}</p> : null}
      {history.length ? (
        <div className="tutor-pro__thread">
          {history.map((turn, index) =>
            turn.role === 'user' ? (
              <p key={`${index}-user`} className="tutor-pro__user">
                {turn.content}
              </p>
            ) : (
              <div
                key={`${index}-assistant`}
                className="tutor-pro__reply"
                dangerouslySetInnerHTML={{ __html: formatTutorHtml(turn.content) }}
              />
            ),
          )}
        </div>
      ) : null}
      {history.length && !loading ? (
        <form
          className="tutor-pro__reply-row"
          onSubmit={(event) => {
            event.preventDefault()
            const value = draft.trim()
            if (!value || !mode) return
            void run(mode, value)
          }}
        >
          <input
            className="tutor-pro__input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
          />
          <button type="submit" className="tutor-pro__send">
            Send
          </button>
        </form>
      ) : null}
    </section>
  )
}
