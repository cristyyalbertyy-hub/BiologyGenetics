import { Link } from 'react-router-dom'
import { useState } from 'react'
import { chapters, APP_TITLE } from '../data/curriculum'
import { useAuth } from '../context/AuthContext'

export function HomePage() {
  const { logout } = useAuth()
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({
    [chapters[0]?.id ?? '']: true,
  })
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  function toggleChapter(chapterId: string) {
    setOpenChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }))
  }

  function toggleGroup(chapterId: string, groupId: string) {
    const key = `${chapterId}::${groupId}`
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="app-screen">
      <header className="top-bar top-bar--home">
        <h1 className="home-brand-title">{APP_TITLE}</h1>
        <button
          type="button"
          className="btn btn-ghost btn-exit"
          onClick={logout}
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      <nav className="tree-root" aria-label="Curriculum">
        {chapters.map((ch) => (
          <div key={ch.id} className="tree-node tree-node--level-1">
            <button
              type="button"
              className="btn btn-chapter tree-toggle"
              onClick={() => toggleChapter(ch.id)}
              aria-expanded={!!openChapters[ch.id]}
            >
              <span className="chapter-chevron" aria-hidden>
                {openChapters[ch.id] ? '▾' : '▸'}
              </span>
              {ch.title}
            </button>

            {openChapters[ch.id] && (
              <div className="tree-children">
                {ch.groups.map((group) => {
                  const groupKey = `${ch.id}::${group.id}`
                  const groupOpen = !!openGroups[groupKey]

                  return (
                    <div key={group.id} className="tree-node tree-node--level-2">
                      <button
                        type="button"
                        className="btn btn-subchapter tree-toggle"
                        onClick={() => toggleGroup(ch.id, group.id)}
                        aria-expanded={groupOpen}
                      >
                        <span className="chapter-chevron" aria-hidden>
                          {groupOpen ? '▾' : '▸'}
                        </span>
                        {group.title}
                      </button>

                      {groupOpen && (
                        <div className="tree-children">
                          {group.leaves.map((leaf) => (
                            <Link
                              key={leaf.id}
                              className="btn btn-subchapter tree-leaf"
                              to={`/app/${ch.id}/${group.id}/${leaf.id}`}
                            >
                              <span className="chapter-chevron" aria-hidden>
                                ›
                              </span>
                              {leaf.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
