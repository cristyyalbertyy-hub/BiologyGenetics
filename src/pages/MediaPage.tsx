import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  APP_TITLE,
  findChapter,
  findGroup,
  findLeaf,
  getMediaForLeaf,
} from '../data/curriculum'
import { useAuth } from '../context/AuthContext'

type MediaTab = 'video' | 'podcast' | 'infografic' | 'questionnaire'
type CsvQaRow = { question: string; answer: string }

export function MediaPage() {
  const { chapterId, groupId, leafId } = useParams<{
    chapterId: string
    groupId: string
    leafId: string
  }>()
  const { userEmail, logout } = useAuth()
  const [tab, setTab] = useState<MediaTab>('video')

  const chapter = chapterId ? findChapter(chapterId) : undefined
  const group =
    chapterId && groupId ? findGroup(chapterId, groupId) : undefined
  const leaf =
    chapterId && groupId && leafId
      ? findLeaf(chapterId, groupId, leafId)
      : undefined

  const title = useMemo(() => {
    if (group && leaf) return `${group.title} - ${leaf.title}`
    return 'Content'
  }, [group, leaf])

  if (!chapter || !group || !leaf) {
    return (
      <div className="app-screen">
        <p>Topic not found.</p>
        <Link to="/app">Back</Link>
      </div>
    )
  }

  const media = getMediaForLeaf(chapter.id, group.id, leaf.id)
  const questionnaireIsPdf = media.questionnaire.toLowerCase().endsWith('.pdf')
  const questionnaireIsCsv = media.questionnaire.toLowerCase().endsWith('.csv')
  const [csvRows, setCsvRows] = useState<CsvQaRow[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (!questionnaireIsCsv) {
      setCsvRows([])
      return
    }

    let active = true
    fetch(media.questionnaire)
      .then((res) => {
        if (!res.ok) throw new Error('CSV not reachable')
        return res.text()
      })
      .then((text) => {
        if (!active) return
        const rows = text
          .split(/\r?\n/)
          .filter((line) => line.trim().length > 0)
          .map((line) => {
            const [question, ...answerParts] = line.split(',')
            return {
              question: question?.trim() ?? '',
              answer: answerParts.join(',').trim(),
            }
          })
          .filter((row) => row.question.length > 0)
        setCsvRows(rows)
        setCurrentQuestionIndex(0)
        setShowAnswer(false)
      })
      .catch(() => {
        if (!active) return
        setCsvRows([])
      })

    return () => {
      active = false
    }
  }, [media.questionnaire, questionnaireIsCsv])

  useEffect(() => {
    setShowAnswer(false)
  }, [currentQuestionIndex, tab])

  const currentQa = csvRows[currentQuestionIndex]
  const totalQuestions = csvRows.length

  return (
    <div className="app-screen">
      <header className="top-bar">
        <div>
          <Link
            to={`/app/${chapter.id}/${group.id}`}
            className="back-link"
          >
            ← {group.title}
          </Link>
          <p className="eyebrow">{APP_TITLE}</p>
          <h1 className="screen-title">{title}</h1>
        </div>
        <div className="top-bar-actions">
          <span className="user-pill">{userEmail}</span>
          <button type="button" className="btn btn-ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="media-tabs" role="tablist" aria-label="Content">
        {(
          [
            ['video', 'Video (V)'],
            ['podcast', 'Podecast (P)'],
            ['infografic', 'Infographics (I)'],
            ['questionnaire', 'Questionnaire (Q)'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={`btn btn-media ${tab === key ? 'active' : ''}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="media-panel" role="tabpanel">
        {tab === 'video' && (
          <div className="video-wrap">
            <video
              key={media.video}
              controls
              playsInline
              className="video-player"
              poster=""
            >
              <source src={media.video} />
              Your browser does not support HTML5 video.
            </video>
          </div>
        )}

        {tab === 'podcast' && (
          <div className="audio-wrap">
            <audio key={media.podcast} controls className="audio-player">
              <source src={media.podcast} />
              Your browser does not support HTML5 audio.
            </audio>
          </div>
        )}

        {tab === 'infografic' && (
          <div className="video-wrap">
            <img
              src={media.infografic}
              alt="Infographics"
              className="video-player"
            />
          </div>
        )}

        {tab === 'questionnaire' && (
          <div className="video-wrap">
            {questionnaireIsCsv ? (
              <div className="csv-wrap">
                {totalQuestions > 0 && currentQa ? (
                  <div className="qa-card">
                    <p className="qa-counter">
                      {currentQuestionIndex + 1}/{totalQuestions}
                    </p>
                    <p className="qa-question">{currentQa.question}</p>
                    {showAnswer && (
                      <p className="qa-answer">
                        <strong>Resposta:</strong> {currentQa.answer}
                      </p>
                    )}
                    <div className="qa-controls">
                      <button
                        type="button"
                        className="btn btn-media"
                        onClick={() => setShowAnswer((prev) => !prev)}
                      >
                        {showAnswer ? 'Ocultar resposta' : 'Ver resposta'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-media"
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.max(0, prev - 1),
                          )
                        }
                        disabled={currentQuestionIndex === 0}
                      >
                        ← Anterior
                      </button>
                      <button
                        type="button"
                        className="btn btn-media"
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(totalQuestions - 1, prev + 1),
                          )
                        }
                        disabled={currentQuestionIndex >= totalQuestions - 1}
                      >
                        Proxima →
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="media-caption">
                    Nao foi possivel pre-visualizar o CSV aqui.
                  </p>
                )}
              </div>
            ) : questionnaireIsPdf ? (
              <object
                data={media.questionnaire}
                type="application/pdf"
                className="questionnaire-frame"
              >
                <iframe
                  title="Questionnaire"
                  src={media.questionnaire}
                  className="questionnaire-frame"
                  loading="lazy"
                />
              </object>
            ) : (
              <iframe
                title="Questionnaire"
                src={media.questionnaire}
                className="questionnaire-frame"
                loading="lazy"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
