import {
  chapters,
  courseTitle,
  resolveLesson,
  type LessonSelection,
} from '../data/curriculum'

type Props = {
  openChapters: Record<string, boolean>
  openGroups: Record<string, boolean>
  selection: LessonSelection | null
  onToggleChapter: (id: string) => void
  onToggleGroup: (key: string) => void
  onSelectLesson: (sel: LessonSelection) => void
}

function groupKey(chapterId: string, groupId: string): string {
  return `${chapterId}::${groupId}`
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
  openGroups,
  selection,
  onToggleChapter,
  onToggleGroup,
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
                <ul className="section-list">
                  {chapter.groups.map((group) => {
                    const key = groupKey(chapter.id, group.id)
                    const groupOpen = openGroups[key] ?? false
                    return (
                      <li
                        key={group.id}
                        className={`nav-section-group${groupOpen ? ' is-open' : ''}`}
                      >
                        <button
                          type="button"
                          className="section-trigger"
                          aria-expanded={groupOpen}
                          onClick={() => onToggleGroup(key)}
                        >
                          <span className="chevron chevron--sm" aria-hidden>
                            {groupOpen ? '▼' : '▶'}
                          </span>
                          <span>{group.title}</span>
                        </button>
                        {groupOpen ? (
                          <ul className="topic-list">
                            {group.leaves.map((leaf) => {
                              const active =
                                selection?.chapterId === chapter.id &&
                                selection.groupId === group.id &&
                                selection.leafId === leaf.id
                              return (
                                <li key={leaf.id} className="nav-topic-item">
                                  <LessonCard
                                    title={leaf.title}
                                    active={active}
                                    onClick={() =>
                                      onSelectLesson({
                                        chapterId: chapter.id,
                                        groupId: group.id,
                                        leafId: leaf.id,
                                      })
                                    }
                                  />
                                </li>
                              )
                            })}
                          </ul>
                        ) : null}
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
