import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'
import {
  findChapter,
  findGroup,
  findLeaf,
  getMediaForLeaf,
} from '../data/curriculum'

type MediaTab = 'video' | 'podcast' | 'infografic' | 'questionnaire'
type CsvQaRow = { question: string; answer: string }

export function MediaPage() {
  const { chapterId, groupId, leafId } = useParams<{
    chapterId: string
    groupId: string
    leafId: string
  }>()
  const [tab, setTab] = useState<MediaTab>('video')

  const chapter = chapterId ? findChapter(chapterId) : undefined
  const group =
    chapterId && groupId ? findGroup(chapterId, groupId) : undefined
  const leaf =
    chapterId && groupId && leafId
      ? findLeaf(chapterId, groupId, leafId)
      : undefined

  const title = useMemo(() => {
    if (group && leaf) return `${group.title} — ${leaf.title}`
    return 'Content'
  }, [group, leaf])

  const media = chapter && group && leaf
    ? getMediaForLeaf(chapter.id, group.id, leaf.id)
    : null
  const questionnaireIsPdf = media?.questionnaire.toLowerCase().endsWith('.pdf') ?? false
  const questionnaireIsCsv = media?.questionnaire.toLowerCase().endsWith('.csv') ?? false

  const [csvRows, setCsvRows] = useState<CsvQaRow[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (!media || !questionnaireIsCsv) {
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
  }, [media, questionnaireIsCsv])

  useEffect(() => {
    setShowAnswer(false)
  }, [currentQuestionIndex, tab])

  if (!chapter || !group || !leaf || !media) {
    return (
      <AppLayout showHomeButton>
        <div className="content-panel">
          <p>Topic not found.</p>
          <Link to="/app">Back to course overview</Link>
        </div>
      </AppLayout>
    )
  }

  const currentQa = csvRows[currentQuestionIndex]
  const totalQuestions = csvRows.length
  const atStart = currentQuestionIndex === 0
  const atEnd = currentQuestionIndex >= totalQuestions - 1

  return (
    <AppLayout
      mobileLessonBar={{
        chapterTitle: group.title,
        subTitle: leaf.title,
        backTo: `/app/${chapter.id}/${group.id}`,
        backLabel: '← Topics',
        accentColor: chapter.color,
      }}
      footerTagline={`${group.title} · ${leaf.title}`}
    >
      <div className="content-panel">
        <p className="eyebrow">{group.title}</p>
        <h1 className="screen-title">{title}</h1>

        <div className="media-tabs" role="tablist" aria-label="Content">
          {(
            [
              ['video', 'Video'],
              ['podcast', 'Podcast'],
              ['infografic', 'Infographic'],
              ['questionnaire', 'Questionnaire'],
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
                alt={`${leaf.title} infographic`}
                className="video-player"
              />
            </div>
          )}

          {tab === 'questionnaire' && (
            <div className="video-wrap">
              {questionnaireIsCsv ? (
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
                        <p className="questionnaire__question">
                          {currentQa.question}
                        </p>
                        {showAnswer && (
                          <div className="questionnaire__answer">
                            <span className="questionnaire__answer-label">
                              Answer
                            </span>
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
                  <p className="media-caption">
                    Could not load the questionnaire here.
                  </p>
                )
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
    </AppLayout>
  )
}
