import { PACKAGE_ID } from './firebase'

export const TUTOR_PACKAGE_ID = 'medical-biology'

export type TutorMode =
  | 'explain_differently'
  | 'analogy'
  | 'story'
  | 'schematize'
  | 'test_me'
  | 'find_my_gap'

export type TutorTurn = {
  role: 'user' | 'assistant'
  content: string
}

function tutorApiUrl(): string {
  const fromEnv = import.meta.env.VITE_TUTOR_API_URL as string | undefined
  if (fromEnv) return fromEnv
  const host = window.location.hostname
  const path = window.location.pathname
  if (
    host === 'studio9medical.com' ||
    host === 'www.studio9medical.com' ||
    (host.endsWith('.vercel.app') && path.startsWith('/medical-biology'))
  ) {
    return `${window.location.origin}/api/tutor`
  }
  return 'https://studio9medical.com/api/tutor'
}

export async function fetchTutor(body: Record<string, unknown>) {
  const res = await fetch(tutorApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ package_id: PACKAGE_ID || TUTOR_PACKAGE_ID, ...body }),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

export const TUTOR_MODES: { id: TutorMode; label: string }[] = [
  { id: 'explain_differently', label: 'Explain differently' },
  { id: 'analogy', label: 'Analogy' },
  { id: 'story', label: 'Story' },
  { id: 'schematize', label: 'Schematize' },
  { id: 'test_me', label: 'Test me' },
  { id: 'find_my_gap', label: 'Find my gap' },
]
