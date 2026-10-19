/**
 * Phone number helpers shared by the visa forms
 */

export const COUNTRY_DIAL_CODES = [
  { code: 'bd', dial: '+880', label: 'Bangladesh (+880)' },
  { code: 'cn', dial: '+86', label: 'China (+86)' },
  { code: 'ae', dial: '+971', label: 'UAE (+971)' },
  { code: 'sa', dial: '+966', label: 'Saudi Arabia (+966)' },
  { code: 'in', dial: '+91', label: 'India (+91)' },
  { code: 'my', dial: '+60', label: 'Malaysia (+60)' },
  { code: 'sg', dial: '+65', label: 'Singapore (+65)' },
  { code: 'th', dial: '+66', label: 'Thailand (+66)' },
  { code: 'gb', dial: '+44', label: 'UK (+44)' },
  { code: 'us', dial: '+1', label: 'USA (+1)' },
]

// Bangladesh mobile numbers are 1XXXXXXXXX once the leading 0 is dropped (01712-345678 -> 1712345678)
const BD_MOBILE = /^1[3-9]\d{8}$/
const E164_MAX_DIGITS = 15

// Digits only, without the trunk 0 people type in front of a local number
export function localDigits(raw = '') {
  return String(raw).replace(/\D/g, '').replace(/^0+/, '')
}

export function isValidPhone(dial, raw) {
  const digits = localDigits(raw)
  if (dial === '+880') return BD_MOBILE.test(digits)
  return digits.length >= 6 && digits.length + dial.length - 1 <= E164_MAX_DIGITS
}

export function toE164(dial, raw) {
  return `${dial}${localDigits(raw)}`
}

// +880 1712 345678 -> +880 ••••• 5678, so the number on screen is never fully shown
export function maskPhone(dial, raw) {
  const digits = localDigits(raw)
  return `${dial} ${'•'.repeat(Math.max(digits.length - 4, 3))} ${digits.slice(-4)}`
}
