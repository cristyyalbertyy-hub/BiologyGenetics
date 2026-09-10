import type { TutorMode } from './tutor'

export const TUTOR_LANGS = ['en', 'es', 'fr', 'it', 'pt'] as const
export type TutorLang = (typeof TUTOR_LANGS)[number]

const TUTOR_LANG_KEY = 'studio9-tutor-lang'
const SITE_LANG_KEY = 'studio9-medical-lang'

export const TUTOR_LANG_OPTIONS: { id: TutorLang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'es', label: 'ES' },
  { id: 'fr', label: 'FR' },
  { id: 'it', label: 'IT' },
  { id: 'pt', label: 'PT' },
]

type TutorCopy = {
  eyebrow: string
  title: string
  language: string
  working: string
  send: string
  followPlaceholder: string
  answerPlaceholder: string
  pause: string
  modes: Record<TutorMode, string>
}

const COPY: Record<TutorLang, TutorCopy> = {
  en: {
    eyebrow: 'Tutor',
    title: 'On this topic',
    language: 'Language',
    working: 'Working…',
    send: 'Send',
    followPlaceholder: 'Go deeper on this point',
    answerPlaceholder: 'Your answer',
    pause: 'Pause a little and come back in an hour.',
    modes: {
      explain_differently: 'Explain differently',
      analogy: 'Analogy',
      story: 'Story',
      schematize: 'Schematize',
      test_me: 'Test me',
      find_my_gap: 'Find my gap',
    },
  },
  es: {
    eyebrow: 'Tutor',
    title: 'En este tema',
    language: 'Idioma',
    working: 'Trabajando…',
    send: 'Enviar',
    followPlaceholder: 'Profundiza este punto',
    answerPlaceholder: 'Tu respuesta',
    pause: 'Pausa un poco y vuelve dentro de una hora.',
    modes: {
      explain_differently: 'Explícalo de otra forma',
      analogy: 'Analogía',
      story: 'Historia',
      schematize: 'Esquematiza',
      test_me: 'Ponme a prueba',
      find_my_gap: 'Dónde fallo',
    },
  },
  fr: {
    eyebrow: 'Tuteur',
    title: 'Sur ce sujet',
    language: 'Langue',
    working: 'Préparation…',
    send: 'Envoyer',
    followPlaceholder: 'Approfondis ce point',
    answerPlaceholder: 'Ta réponse',
    pause: 'Fais une pause et reviens dans une heure.',
    modes: {
      explain_differently: 'Explique autrement',
      analogy: 'Analogie',
      story: 'Histoire',
      schematize: 'Schématise',
      test_me: 'Interroge-moi',
      find_my_gap: 'Où je bloque',
    },
  },
  it: {
    eyebrow: 'Tutor',
    title: 'Su questo argomento',
    language: 'Lingua',
    working: 'Sto preparando…',
    send: 'Invia',
    followPlaceholder: 'Approfondisci questo punto',
    answerPlaceholder: 'La tua risposta',
    pause: 'Fai una pausa e torna tra un’ora.',
    modes: {
      explain_differently: 'Spiega in un altro modo',
      analogy: 'Analogia',
      story: 'Storia',
      schematize: 'Schematizza',
      test_me: 'Metti alla prova',
      find_my_gap: 'Dove sbaglio',
    },
  },
  pt: {
    eyebrow: 'Tutor',
    title: 'Neste tópico',
    language: 'Língua',
    working: 'A trabalhar…',
    send: 'Enviar',
    followPlaceholder: 'Aprofunda este ponto',
    answerPlaceholder: 'A tua resposta',
    pause: 'Pausa um pouco e volta daqui a uma hora.',
    modes: {
      explain_differently: 'Explica de outra forma',
      analogy: 'Analogia',
      story: 'História',
      schematize: 'Esquematiza',
      test_me: 'Testa-me',
      find_my_gap: 'Onde falho',
    },
  },
}

export function isTutorLang(value: string): value is TutorLang {
  return (TUTOR_LANGS as readonly string[]).includes(value)
}

export function readTutorLang(): TutorLang {
  try {
    const stored = localStorage.getItem(TUTOR_LANG_KEY)
    if (stored && isTutorLang(stored)) return stored
    const site = localStorage.getItem(SITE_LANG_KEY)
    if (site && isTutorLang(site)) return site
  } catch {
    /* ignore */
  }
  const nav = String(navigator.language || 'en').slice(0, 2).toLowerCase()
  return isTutorLang(nav) ? nav : 'en'
}

export function writeTutorLang(lang: TutorLang) {
  try {
    localStorage.setItem(TUTOR_LANG_KEY, lang)
  } catch {
    /* ignore */
  }
}

export function tutorCopy(lang: TutorLang): TutorCopy {
  return COPY[lang] ?? COPY.en
}
