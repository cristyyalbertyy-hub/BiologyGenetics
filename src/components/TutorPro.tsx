import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { TUTOR_MODE_IDS, fetchTutor, type TutorMode, type TutorTurn } from '../lib/tutor'
import {
  TUTOR_LANG_OPTIONS,
  readTutorLang,
  tutorCopy,
  writeTutorLang,
  type TutorLang,
} from '../lib/tutorI18n'
import { formatTutorHtml } from '../lib/tutorFormat'

type Props = {
  topicId: string
  topicTitle: string
  chapterTitle: string
}

export function TutorPro({ topicId, topicTitle, chapterTitle }: Props) {
  const { user } = useAuth()
  const [enabled, setEnabled] = useState(false)
  const [lang, setLang] = useState<TutorLang>('en')
  const [mode, setMode] = useState<TutorMode | null>(null)
  const [history, setHistory] = useState<TutorTurn[]>([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLang(readTutorLang())
  }, [])

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

  const copy = tutorCopy(lang)

  function changeLang(next: TutorLang) {
    if (next === lang) return
    writeTutorLang(next)
    setLang(next)
    setMode(null)
    setHistory([])
    setDraft('')
    setError('')
  }

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
          { role: 'assistant', content: String(data?.text ?? copy.pause) },
        ])
        return
      }
      if (!ok || !data?.text) {
        setError(String(data?.error ?? copy.pause))
        return
      }
      const reply = String(data.text)
      const nextHistory: TutorTurn[] = [...conversation]
      if (message) nextHistory.push({ role: 'user', content: message })
      nextHistory.push({ role: 'assistant', content: reply })
      setHistory(nextHistory.slice(-12))
      setDraft('')
    } catch {
      setError(copy.pause)
    } finally {
      setLoading(false)
    }
  }

  const placeholder = mode === 'test_me' ? copy.answerPlaceholder : copy.followPlaceholder

  return (
    <section className="tutor-pro" aria-label="Studio9 Tutor">
      <header className="tutor-pro__head">
        <p className="tutor-pro__eyebrow">{copy.eyebrow}</p>
        <h3 className="tutor-pro__title">{copy.title}</h3>
        <p className="tutor-pro__meta">
          {chapterTitle} · {topicTitle}
        </p>
        <div className="tutor-pro__langs" role="group" aria-label={copy.language}>
          <span className="tutor-pro__lang-label">{copy.language}</span>
          {TUTOR_LANG_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`tutor-pro__lang${lang === item.id ? ' is-active' : ''}`}
              disabled={loading}
              onClick={() => changeLang(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>
      <div className="tutor-pro__modes">
        {TUTOR_MODE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className={`tutor-pro__mode${mode === id ? ' is-active' : ''}`}
            disabled={loading}
            onClick={() => void run(id)}
          >
            {copy.modes[id]}
          </button>
        ))}
      </div>
      {loading ? <p className="tutor-pro__status">{copy.working}</p> : null}
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
            {copy.send}
          </button>
        </form>
      ) : null}
    </section>
  )
}
