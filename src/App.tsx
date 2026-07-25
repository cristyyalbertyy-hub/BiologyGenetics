import { useEffect, useMemo, useRef, useState } from 'react'

import { CourseNav, useLessonFromSelection } from './components/CourseNav'

import { LessonContent } from './components/LessonContent'

import {

  APP_TITLE,

  chapters,

  OVERVIEW_IMAGE,

  type LessonSelection,

} from './data/curriculum'

import { mediaUrl } from './utils/mediaUrl'
import { useAuth } from './context/AuthContext'



function collapsedRecord(ids: string[]): Record<string, boolean> {

  const init: Record<string, boolean> = {}

  for (const id of ids) init[id] = false

  return init

}



export default function App() {

  const { userEmail, logout } = useAuth()

  const [openChapters, setOpenChapters] = useState(() =>

    collapsedRecord(chapters.map((c) => c.id)),

  )

  const [selection, setSelection] = useState<LessonSelection | null>(null)

  const [atHome, setAtHome] = useState(true)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(true)

  const mainRef = useRef<HTMLElement>(null)



  const lesson = useMemo(() => useLessonFromSelection(selection), [selection])



  const activeChapterId = useMemo(() => {

    if (lesson) return lesson.chapter.id

    if (selection && !atHome) return selection.chapterId

    return chapters.find((c) => openChapters[c.id])?.id ?? null

  }, [lesson, selection, atHome, openChapters])



  const mobileLessonContext = useMemo(() => {

    if (lesson) {

      return {

        chapter: lesson.chapter.title,

        subchapter: lesson.leaf.title,

        color: lesson.chapter.color,

      }

    }

    return null

  }, [lesson])



  const showMobileLessonBar = !mobileMenuOpen && !atHome && mobileLessonContext !== null
  const shellMode = mobileMenuOpen ? 'is-mobile-menu' : 'is-mobile-content'
  const overviewImage = mediaUrl(OVERVIEW_IMAGE)



  const overviewPanel = (

    <div className="overview-panel">

      <div className="overview-intro">

        <p className="overview-lead">

          Explore cell biology from fundamentals through molecular processes and cancer biology.

          Open a theme on the left, pick a topic, then choose video, podcast, infographic, or

          questionnaire.

        </p>

        <ul className="overview-systems" aria-label="Course themes">

          {chapters.map((chapter) => (

            <li

              key={chapter.id}

              className="overview-systems__item"

              style={{ borderLeftColor: chapter.color }}

            >

              <strong>{chapter.title}</strong>

              <span>

                {chapter.leaves.length} {chapter.leaves.length === 1 ? 'topic' : 'topics'}

              </span>

            </li>

          ))}

        </ul>

      </div>

      <img

        src={overviewImage}

        alt={`${APP_TITLE} — course overview`}

        className="overview-infographic"

      />

      <p className="overview-hint muted">

        Open a coloured theme on the left, then choose a topic to start.

      </p>

      <button type="button" className="mobile-browse-btn" onClick={() => setMobileMenuOpen(true)}>

        Browse themes →

      </button>

    </div>

  )



  const toggleChapter = (id: string) => {

    setOpenChapters((o) => ({ ...o, [id]: !o[id] }))

  }



  const selectLesson = (sel: LessonSelection) => {

    setAtHome(false)

    setSelection(sel)

    setMobileMenuOpen(false)



    const nextChapters = collapsedRecord(chapters.map((c) => c.id))

    nextChapters[sel.chapterId] = true

    setOpenChapters(nextChapters)

  }



  const lessonScrollKey = lesson ? `${lesson.chapter.id}:${lesson.leaf.id}` : null



  useEffect(() => {

    if (!lessonScrollKey) return

    window.scrollTo({ top: 0, behavior: 'smooth' })

    mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  }, [lessonScrollKey])



  const goToEntry = () => {

    setAtHome(true)

    setSelection(null)

    setMobileMenuOpen(false)

    setOpenChapters(collapsedRecord(chapters.map((c) => c.id)))

  }



  return (

    <div className={`app-shell ${shellMode}`}>

      <header className={`app-header${showMobileLessonBar ? ' app-header--compact-mobile' : ''}`}>

        <button

          type="button"

          className="home-overview-btn"

          onClick={goToEntry}

          aria-label="Back to course overview"

        >

          <span className="home-overview-btn__media">

            <img

              src={overviewImage}

              alt=""

              onError={(e) => {

                e.currentTarget.style.display = 'none'

              }}

            />

            <span className="home-overview-btn__fallback" aria-hidden>

              ⊕

            </span>

          </span>

          <span className="home-overview-btn__label">Course overview</span>

        </button>

        <h1>{APP_TITLE}</h1>

        {userEmail ? (

          <div className="app-header__actions">

            <div className="auth-account">

              <span className="auth-account__email" title={userEmail}>

                {userEmail}

              </span>

              <button type="button" className="btn-ghost" onClick={() => void logout()}>

                Sair

              </button>

            </div>

          </div>

        ) : null}

      </header>



      {showMobileLessonBar && mobileLessonContext ? (

        <div

          className="mobile-lesson-bar"

          style={{ borderLeftColor: mobileLessonContext.color }}

        >

          <button type="button" className="mobile-menu-back" onClick={() => setMobileMenuOpen(true)}>

            ← Menu

          </button>

          <div className="mobile-lesson-bar__text">

            <span className="mobile-lesson-bar__chapter">{mobileLessonContext.chapter}</span>

            <span className="mobile-lesson-bar__sub">{mobileLessonContext.subchapter}</span>

          </div>

        </div>

      ) : null}



      <div className="layout">

        <div className="sidebar-column">

          <CourseNav

            openChapters={openChapters}

            selection={selection}

            onToggleChapter={toggleChapter}

            onSelectLesson={selectLesson}

          />

        </div>



        <main

          ref={mainRef}

          className={`main${atHome ? ' main--overview' : ''}`}

          data-system-tint={activeChapterId ?? undefined}

          style={

            lesson

              ? {

                  background: `linear-gradient(165deg, ${lesson.chapter.color}14 0%, var(--surface) 42%)`,

                  borderColor: `${lesson.chapter.color}33`,

                }

              : undefined

          }

        >

          {atHome ? overviewPanel : lesson ? <LessonContent lesson={lesson} /> : null}

        </main>

      </div>

    </div>

  )

}


