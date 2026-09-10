function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function applyInline(value: string): string {
  return value
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2
}

function isTableSep(line: string): boolean {
  const trimmed = line.trim()
  return /^\|[-:| ]+\|$/.test(trimmed)
}

function splitCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => applyInline(cell.trim()))
}

function formatTable(rows: string[]): string {
  const header = splitCells(rows[0])
  const body = rows.slice(2).map(splitCells)
  const thead = `<thead><tr>${header.map((cell) => `<th>${cell}</th>`).join('')}</tr></thead>`
  const tbody = `<tbody>${body
    .map((cells) => `<tr>${cells.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('')}</tbody>`
  return `<table>${thead}${tbody}</table>`
}

export function formatTutorHtml(raw: string): string {
  const lines = escapeHtml(String(raw ?? '').replace(/\r\n/g, '\n').trim()).split('\n')
  const html: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }
    if (/^---+$/.test(line.trim())) {
      html.push('<hr />')
      i += 1
      continue
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      const level = Math.min(heading[1].length + 1, 4)
      html.push(`<h${level}>${applyInline(heading[2])}</h${level}>`)
      i += 1
      continue
    }

    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const rows = [line, lines[i + 1]]
      i += 2
      while (i < lines.length && isTableRow(lines[i]) && !isTableSep(lines[i])) {
        rows.push(lines[i])
        i += 1
      }
      html.push(formatTable(rows))
      continue
    }

    const listMarker = line.trim().match(/^([-*]|\d+\.)\s+/)
    if (listMarker) {
      const ordered = /^\d+\./.test(listMarker[1])
      const items: string[] = []
      while (i < lines.length) {
        const current = lines[i]
        if (!current.trim()) break
        const nested = current.match(/^\s{2,}[-*]\s+(.+)$/)
        if (nested && items.length) {
          const last = items.pop() ?? ''
          items.push(`${last}<br />${applyInline(nested[1])}`)
          i += 1
          continue
        }
        const item = current.trim().match(/^([-*]|\d+\.)\s+(.+)$/)
        if (!item) break
        items.push(applyInline(item[2]))
        i += 1
      }
      const tag = ordered ? 'ol' : 'ul'
      html.push(`<${tag}>${items.map((item) => `<li>${item}</li>`).join('')}</${tag}>`)
      continue
    }

    const paragraph: string[] = [applyInline(line)]
    i += 1
    while (i < lines.length && lines[i].trim()) {
      if (
        /^#{1,3}\s+/.test(lines[i]) ||
        /^---+$/.test(lines[i].trim()) ||
        /^([-*]|\d+\.)\s+/.test(lines[i].trim()) ||
        (isTableRow(lines[i]) && i + 1 < lines.length && isTableSep(lines[i + 1]))
      ) {
        break
      }
      paragraph.push(applyInline(lines[i]))
      i += 1
    }
    html.push(`<p>${paragraph.join('<br />')}</p>`)
  }

  return html.join('')
}
