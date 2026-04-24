import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  APP_TITLE,
  DEMO_MEDIA,
  findChapter,
  findGroup,
  findLeaf,
} from '../data/curriculum'
import { useAuth } from '../context/AuthContext'

type MediaTab = 'video' | 'podcast' | 'infografic' | 'questionnaire'

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
    if (group && leaf) return `${group.title} — ${leaf.title}`
    return 'Conteúdo'
  }, [group, leaf])

  if (!chapter || !group || !leaf) {
    return (
      <div className="app-screen">
        <p>Tópico não encontrado.</p>
        <Link to="/app">← Início</Link>
      </div>
    )
  }

  const videoSrc = DEMO_MEDIA.video
  const podcastSrc = DEMO_MEDIA.podcast
  const infograficSrc = DEMO_MEDIA.infografic
  const questionnaireSrc = DEMO_MEDIA.questionnaire

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
            ['video', 'Video'],
            ['podcast', 'Podcast'],
            ['infografic', 'Infographics'],
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
              key={videoSrc}
              controls
              playsInline
              className="video-player"
              poster=""
            >
              <source src={videoSrc} />
              O seu navegador não suporta vídeo HTML5.
            </video>
            <p className="media-caption">
              Vídeo de demonstração. Substitua o URL em{' '}
              <code>src/data/curriculum.ts</code>.
            </p>
          </div>
        )}

        {(tab === 'audio' || tab === 'podcast') && (
          <div className="audio-wrap">
            <audio key={audioSrc} controls className="audio-player">
              <source src={audioSrc} />
              O seu navegador não suporta áudio HTML5.
            </audio>
            <p className="media-caption">
              {tab === 'podcast'
                ? 'Podcast de demonstração (URL em curriculum.ts).'
                : 'Áudio de demonstração (URL em curriculum.ts).'}
            </p>
          </div>
        )}

        {tab === 'infografic' && (
          <div className="video-wrap">
            <img
              src={infograficSrc}
              alt="Infografic"
              className="video-player"
            />
            <p className="media-caption">
              Infografic de demonstração. Substitua o URL em{' '}
              <code>src/data/curriculum.ts</code>.
            </p>
          </div>
        )}

        {tab === 'questionnaire' && (
          <div className="video-wrap">
            <iframe
              title="Questionnaire"
              src={questionnaireSrc}
              className="questionnaire-frame"
              loading="lazy"
            />
            <p className="media-caption">
              Questionnaire de demonstração. Pode também abrir em novo separador:{' '}
              <a href={questionnaireSrc} target="_blank" rel="noreferrer">
                Open Questionnaire
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
