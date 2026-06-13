import { Link, useParams } from 'react-router-dom'
import { APP_TITLE, findChapter, findGroup } from '../data/curriculum'

export function GroupPage() {
  const { chapterId, groupId } = useParams<{
    chapterId: string
    groupId: string
  }>()

  const chapter = chapterId ? findChapter(chapterId) : undefined
  const group =
    chapterId && groupId ? findGroup(chapterId, groupId) : undefined

  if (!chapter || !group) {
    return (
      <div className="app-screen">
        <p>Tópico não encontrado.</p>
        <Link to="/app">← Voltar</Link>
      </div>
    )
  }

  return (
    <div className="app-screen">
      <header className="top-bar">
        <div>
          <Link to={`/app/${chapter.id}`} className="back-link">
            ← {chapter.title}
          </Link>
          <p className="eyebrow">{APP_TITLE}</p>
          <h1 className="screen-title">{group.title}</h1>
        </div>
      </header>

      <section className="subchapter-grid" aria-label="Subtópicos">
        {group.leaves.map((leaf) => (
          <Link
            key={leaf.id}
            className="btn btn-subchapter"
            to={`/app/${chapter.id}/${group.id}/${leaf.id}`}
          >
            <span className="chapter-chevron" aria-hidden>
              ›
            </span>
            {leaf.title}
          </Link>
        ))}
      </section>
    </div>
  )
}
