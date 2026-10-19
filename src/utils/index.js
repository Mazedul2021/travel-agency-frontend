/**
 * General utility functions
 */

/**
 * Creates a URL-friendly slug from text
 * @param {string} text
 * @returns {string}
 */
export function slugify(text = '') {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

/**
 * Utility for joining conditional CSS classes together
 * @param  {...any} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Dates are shown in Dhaka time, whatever the visitor's own time zone is
const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Dhaka',
})
const TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Dhaka',
})

/** "12 Aug 2025" */
export function formatDate(iso) {
  return iso ? DATE_FORMAT.format(new Date(iso)) : ''
}

/** "12 Aug 2025, 10:30 AM" */
export function formatDateTime(iso) {
  return iso ? `${DATE_FORMAT.format(new Date(iso))}, ${TIME_FORMAT.format(new Date(iso))}` : ''
}

/**
 * Returns `path` only when it stays on this site ("/visa-status/abc"), so a ?next= link cannot send
 * someone to another domain after they log in. Anything else gives null.
 * @param {string | null | undefined} path
 * @returns {string | null}
 */
export function safeRedirectPath(path) {
  if (typeof path !== 'string') return null
  if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/\\')) return null
  return path
}
