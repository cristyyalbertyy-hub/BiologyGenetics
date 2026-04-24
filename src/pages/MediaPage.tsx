import { useMemo, useState } from 'react'
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

  return (
    <div className="app-screen">
      <header className="top-bar">
        <div>
          <Link
            to={`/app/${chapter.id}/${group.id}`}
            className="back-link"
          >
            ? {group.title}
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
            <iframe
              title="Questionnaire"
              src={media.questionnaire}
              className="questionnaire-frame"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}
