export function mediaUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const assetPath = path.startsWith('/') ? path.slice(1) : path
  const origin = import.meta.env.VITE_MEDIA_ORIGIN || import.meta.env.BASE_URL
  const normalized = origin.endsWith('/') ? origin : `${origin}/`
  return `${normalized}${assetPath}`
}
