import { useEffect, useRef, useState } from 'react'
import type { ResolvedLesson } from '../data/curriculum'
import { bindPlaybackProgress } from '../lib/playbackProgress'
import { useMediaProgress } from '../hooks/useMediaProgress'

type MediaTab = 'video' | 'podcast' | 'infographic' | 'questionnaire'
type CsvQaRow = { question: string; answer: string }

type Props = {
  lesson: ResolvedLesson
}

export function LessonContent({ lesson }: Props) {
  const { chapter, leaf, media } = lesson
  const [tab, setTab] = useState<MediaTab>('video')
  const { trackWatchComplete } = useMediaProgress(leaf.id)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const questionnaireIsPdf = media.questionnaire.toLowerCase().endsWith('.pdf')
  const questionnaireIsCsv = media.questionnaire.toLowerCase().endsWith('.csv')

  const [csvRows, setCsvRows] = useState<CsvQaRow[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    setTab('video')
  }, [chapter.id, leaf.id])

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

  useEffect(() => {
    const el = videoRef.current
    if (!el || tab !== 'video') return
    return bindPlaybackProgress(el, () => void trackWatchComplete('V'))
  }, [tab, media.video, trackWatchComplete])

  useEffect(() => {
    const el = audioRef.current
    if (!el || tab !== 'podcast') return
    return bindPlaybackProgress(el, () => void trackWatchComplete('P'))
  }, [tab, media.podcast, trackWatchComplete])

  const currentQa = csvRows[currentQuestionIndex]
  const totalQuestions = csvRows.length
  const atStart = currentQuestionIndex === 0
  const atEnd = currentQuestionIndex >= totalQuestions - 1

  return (
    <div className="lesson-view">
      <header className="subchapter-head">
        <p className="eyebrow">{chapter.title}</p>
        <h2>{leaf.title}</h2>
      </header>

      <div className="media-tabs" role="tablist" aria-label="Content">
        {(
          [
            ['video', 'Video'],
            ['podcast', 'Podcast'],
            ['infographic', 'Infographic'],
            ['questionnaire', 'Questionnaire'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={`media-tab${tab === key ? ' active' : ''}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="media-stage"
        role="tabpanel"
        onContextMenu={(event) => event.preventDefault()}
      >
        {tab === 'video' && (
          <video
            key={media.video}
            ref={videoRef}
            className="video"
            controls
            controlsList="nodownload"
            playsInline
            src={media.video}
          />
        )}

        {tab === 'podcast' && (
          <div className="media-block">
            <audio
              key={media.podcast}
              ref={audioRef}
              className="audio"
              controls
              controlsList="nodownload"
              src={media.podcast}
            />
          </div>
        )}

        {tab === 'infographic' && (
          <img
            className="infographic"
            src={media.infografic}
            alt={`${leaf.title} infographic`}
          />
        )}

        {tab === 'questionnaire' &&
          (questionnaireIsCsv ? (
            totalQuestions > 0 && currentQa ? (
              <div className="questionnaire">
                <p className="questionnaire__progress">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </p>

                <div className="questionnaire__nav-row">
                  <button
                    type="button"
                    className="questionnaire__arrow"
                    onClick={() => {
                      setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                      setShowAnswer(false)
                    }}
                    disabled={atStart}
                    aria-label="Previous question"
                  >
                    ←
                  </button>

                  <div className="questionnaire__card">
                    <p className="questionnaire__question">{currentQa.question}</p>
                    {showAnswer && (
                      <div className="questionnaire__answer">
                        <span className="questionnaire__answer-label">Answer</span>
                        <p>{currentQa.answer}</p>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="questionnaire__arrow"
                    onClick={() => {
                      setCurrentQuestionIndex((prev) =>
                        Math.min(totalQuestions - 1, prev + 1),
                      )
                      setShowAnswer(false)
                    }}
                    disabled={atEnd}
                    aria-label="Next question"
                  >
                    →
                  </button>
                </div>

                {!showAnswer && (
                  <button
                    type="button"
                    className="questionnaire__reveal"
                    onClick={() => setShowAnswer(true)}
                  >
                    Show answer
                  </button>
                )}
              </div>
            ) : (
              <p className="muted">Could not load the questionnaire here.</p>
            )
          ) : questionnaireIsPdf ? (
            <object data={media.questionnaire} type="application/pdf" className="infographic">
              <iframe title="Questionnaire" src={media.questionnaire} className="infographic" />
            </object>
          ) : (
            <iframe title="Questionnaire" src={media.questionnaire} className="infographic" />
          ))}
      </div>
    </div>
  )
}
