import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AppLayout } from '../components/AppLayout'
import { APP_TITLE, chapters } from '../data/curriculum'

const OVERVIEW_IMAGE = '/Biology.png'

export function HomePage() {
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
    <AppLayout
      showHomeButton={false}
      hideHeaderOnMobile={false}
      footerTagline="Cell biology · Molecular biology · Cancer biology"
    >
      <div className="overview-panel">
        <section className="overview-intro" aria-label="Course overview">
          <p className="overview-lead">
            Explore cell biology from fundamentals through molecular processes and
            cancer biology. Open a chapter below, pick a topic, then choose video,
            podcast, infographic, or questionnaire.
          </p>
          <ul className="overview-chapters">
            {chapters.map((ch) => (
              <li
                key={ch.id}
                className="overview-chapters__item"
                style={{ borderLeftColor: ch.color }}
              >
                <strong>{ch.title}</strong>
                <span>
                  {ch.groups.length} themes ·{' '}
                  {ch.groups.reduce((n, g) => n + g.leaves.length, 0)} topics
                </span>
              </li>
            ))}
          </ul>
        </section>

        <img
          className="overview-infographic"
          src={OVERVIEW_IMAGE}
          alt={`${APP_TITLE} — course overview`}
        />
      </div>

      <nav className="tree-root" aria-label="Curriculum">
        {chapters.map((ch) => (
          <div key={ch.id} className="tree-node tree-node--level-1">
            <button
              type="button"
              className="btn btn-chapter tree-toggle"
              style={{ backgroundColor: ch.color }}
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
    </AppLayout>
  )
}
