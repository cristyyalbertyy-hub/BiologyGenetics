import {
  chapters,
  courseTitle,
  resolveLesson,
  type LessonSelection,
} from '../data/curriculum'

type Props = {
  openChapters: Record<string, boolean>
  selection: LessonSelection | null
  onToggleChapter: (id: string) => void
  onSelectLesson: (sel: LessonSelection) => void
}

function LessonCard({
  title,
  active,
  onClick,
}: {
  title: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button type="button" className={`lesson-card${active ? ' active' : ''}`} onClick={onClick}>
      <span className="lesson-card-title">{title}</span>
      <span className="lesson-card-arrow" aria-hidden>
        ›
      </span>
    </button>
  )
}

export function CourseNav({
  openChapters,
  selection,
  onToggleChapter,
  onSelectLesson,
}: Props) {
  return (
    <nav className="sidebar" aria-label={courseTitle}>
      {chapters.map((chapter) => {
        const chapterOpen = openChapters[chapter.id] ?? false
        return (
          <div
            key={chapter.id}
            className={`accordion accordion--system${chapterOpen ? ' is-open' : ''}`}
            data-system={chapter.id}
          >
            <button
              type="button"
              className="accordion-trigger accordion-trigger--system"
              style={{ backgroundColor: chapter.color }}
              aria-expanded={chapterOpen}
              onClick={() => onToggleChapter(chapter.id)}
            >
              <span className="chevron" aria-hidden>
                {chapterOpen ? '▼' : '▶'}
              </span>
              <span className="system-name">{chapter.title}</span>
            </button>
            {chapterOpen ? (
              <div className="section-tree" style={{ borderTopColor: chapter.color }}>
                <ul className="topic-list">
                  {chapter.leaves.map((leaf) => {
                    const active =
                      selection?.chapterId === chapter.id && selection.leafId === leaf.id
                    return (
                      <li key={leaf.id} className="nav-topic-item">
                        <LessonCard
                          title={leaf.title}
                          active={active}
                          onClick={() =>
                            onSelectLesson({
                              chapterId: chapter.id,
                              leafId: leaf.id,
                            })
                          }
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        )
      })}
    </nav>
  )
}

export function useLessonFromSelection(selection: LessonSelection | null) {
  if (!selection) return null
  return resolveLesson(selection)
}
