import React from 'react'

/**
 * Prepend https:// to a URL if not present.
 */
function ensureHttp(url) {
  if (!url) return ''
  const trimmed = url.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return `https://${trimmed}`
}

/**
 * Formats raw contact field values into appropriate clickable href link strings.
 */
export function formatContactLink(type, value) {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed) return ''

  switch (type) {
    case 'email':
      return trimmed.toLowerCase().startsWith('mailto:') ? trimmed : `mailto:${trimmed}`
    case 'phone':
      return trimmed.toLowerCase().startsWith('tel:') ? trimmed : `tel:${trimmed}`
    case 'linkedin':
      if (trimmed.includes('linkedin.com')) {
        return ensureHttp(trimmed)
      }
      return `https://linkedin.com/in/${trimmed}`
    case 'github':
      if (trimmed.includes('github.com')) {
        return ensureHttp(trimmed)
      }
      return `https://github.com/${trimmed}`
    case 'twitter':
      if (trimmed.includes('twitter.com') || trimmed.includes('x.com')) {
        return ensureHttp(trimmed)
      }
      return `https://twitter.com/${trimmed}`
    case 'website':
      return ensureHttp(trimmed)
    default:
      return trimmed
  }
}

/**
 * Parses markdown-style links [Label](url) and raw URLs,
 * returning an array of JSX nodes and strings.
 */
export function renderTextWithLinks(text) {
  if (!text) return ''
  
  // Matches [label](url) first, then plain URLs (http:// or https://)
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s()<>]+)\)|(https?:\/\/[^\s()<>]+)/g
  
  const parts = []
  let lastIndex = 0
  let match
  
  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index
    
    // Push normal text before the link match
    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex))
    }
    
    if (match[1] && match[2]) {
      // Markdown link: [label](url)
      const label = match[1]
      const url = match[2]
      parts.push(
        <a 
          key={matchIndex} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="resume-link"
        >
          {label}
        </a>
      )
    } else if (match[3]) {
      // Raw URL: https://example.com
      const url = match[3]
      parts.push(
        <a 
          key={matchIndex} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="resume-link"
        >
          {url}
        </a>
      )
    }
    
    lastIndex = regex.lastIndex
  }
  
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  
  return parts.length > 0 ? parts : text
}
