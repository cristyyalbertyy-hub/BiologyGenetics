import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { APP_TITLE } from '../data/curriculum'
import { ProgressLink } from './ProgressLink'

const OVERVIEW_IMAGE = '/Biology.png'

export type MobileLessonBarProps = {
  chapterTitle: string
  subTitle: string
  backTo: string
  backLabel?: string
  accentColor?: string
}

type AppLayoutProps = {
  children: ReactNode
  showHomeButton?: boolean
  hideHeaderOnMobile?: boolean
  mobileLessonBar?: MobileLessonBarProps
  footerTagline?: string
}

export function AppLayout({
  children,
  showHomeButton = true,
  hideHeaderOnMobile = false,
  mobileLessonBar,
  footerTagline,
}: AppLayoutProps) {
  const headerClass = hideHeaderOnMobile
    ? 'app-header app-header--compact-mobile'
    : 'app-header'

  return (
    <div className="app-shell">
      <header className={headerClass}>
        {showHomeButton ? (
          <Link
            to="/app"
            className="home-overview-btn"
            aria-label="Back to course overview"
          >
            <span className="home-overview-btn__media">
              <img
                src={OVERVIEW_IMAGE}
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
          </Link>
        ) : null}
        <h1>{APP_TITLE}</h1>
        <ProgressLink className="progress-link--header" compact />
      </header>

      {mobileLessonBar ? (
        <div
          className="mobile-lesson-bar"
          style={
            mobileLessonBar.accentColor
              ? { borderLeftColor: mobileLessonBar.accentColor }
              : undefined
          }
        >
          <Link
            to={mobileLessonBar.backTo}
            className="mobile-menu-back"
          >
            {mobileLessonBar.backLabel ?? '← Back'}
          </Link>
          <div className="mobile-lesson-bar__text">
            <span className="mobile-lesson-bar__chapter">
              {mobileLessonBar.chapterTitle}
            </span>
            <span className="mobile-lesson-bar__sub">
              {mobileLessonBar.subTitle}
            </span>
          </div>
        </div>
      ) : null}

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <ProgressLink className="progress-link--footer" />
        {footerTagline ? (
          <p className="app-footer__tagline">{footerTagline}</p>
        ) : null}
      </footer>
    </div>
  )
}
