import { Link, useParams } from 'react-router-dom'
import { findChapter, APP_TITLE } from '../data/curriculum'

export function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const chapter = chapterId ? findChapter(chapterId) : undefined

  if (!chapter) {
    return (
      <div className="app-screen">
        <p>Capítulo não encontrado.</p>
        <Link to="/app">← Voltar aos capítulos</Link>
      </div>
    )
  }

  return (
    <div className="app-screen">
      <header className="top-bar">
        <div>
          <Link to="/app" className="back-link">
            ← Capítulos
          </Link>
          <p className="eyebrow">{APP_TITLE}</p>
          <h1 className="screen-title">{chapter.title}</h1>
        </div>
      </header>

      <section className="subchapter-grid" aria-label="Temas">
        {chapter.groups.map((group) => (
          <Link
            key={group.id}
            className="btn btn-subchapter"
            to={`/app/${chapter.id}/${group.id}`}
          >
            <span className="chapter-chevron" aria-hidden>
              ›
            </span>
            {group.title}
          </Link>
        ))}
      </section>
    </div>
  )
}
