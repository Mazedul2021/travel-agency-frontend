/**
 * Demo implementation of the visa status API. Loaded only when VITE_DEMO_MODE=true.
 *
 * Links:  /visa-status/demo-<status>  for every status in VISA_STATUS_CONFIG (demo-docs for docs_required)
 * OTP:    123456 is accepted. 000000 answers "expired". Five wrong codes lock the link for 15 minutes.
 */
import { VisaStatusError } from './visaStatus'

const LATENCY_MS = 600
const OTP_VALID_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 5
const LOCK_SECONDS = 15 * 60

const DEMO_OTP = '123456'
const EXPIRED_OTP = '000000'

const wait = (ms = LATENCY_MS) => new Promise((resolve) => setTimeout(resolve, ms))

const record = ({ status, passportNo, phone, events }) => ({
  status,
  applicant: { fullName: 'Md. Arif Hossain', passportNo, phone },
  country: { code: 'cn', name: 'China' },
  visaType: 'Tourist Visa',
  entryType: 'Single Entry',
  applicationNo: 'ABL20250812001',
  submittedAt: events.submitted,
  processingTime: '15 Days (+/-)',
  events,
})

const SUBMITTED = '2025-08-12T04:30:00Z'
const PROCESSING = '2025-08-15T08:20:00Z'
const APPROVED = '2025-08-20T05:15:00Z'
const READY = '2025-08-24T06:00:00Z'
const COLLECTED = '2025-08-26T09:40:00Z'

const FIXTURES = {
  'demo-submitted': record({
    status: 'submitted',
    passportNo: 'A12345671',
    phone: '+880 1712 345671',
    events: { submitted: SUBMITTED },
  }),
  'demo-processing': record({
    status: 'processing',
    passportNo: 'A12345672',
    phone: '+880 1712 345672',
    events: { submitted: SUBMITTED, processing: PROCESSING },
  }),
  'demo-approved': record({
    status: 'approved',
    passportNo: 'A12345678',
    phone: '+880 1712 345678',
    events: { submitted: SUBMITTED, processing: PROCESSING, approved: APPROVED },
  }),
  'demo-ready': record({
    status: 'ready',
    passportNo: 'A12345674',
    phone: '+880 1712 345674',
    events: { submitted: SUBMITTED, processing: PROCESSING, approved: APPROVED, ready: READY },
  }),
  'demo-collected': record({
    status: 'collected',
    passportNo: 'A12345675',
    phone: '+880 1712 345675',
    events: {
      submitted: SUBMITTED,
      processing: PROCESSING,
      approved: APPROVED,
      ready: READY,
      collected: COLLECTED,
    },
  }),
  'demo-docs': record({
    status: 'docs_required',
    passportNo: 'A12345676',
    phone: '+880 1712 345676',
    events: { submitted: SUBMITTED, docs_required: PROCESSING },
  }),
  'demo-on_hold': record({
    status: 'on_hold',
    passportNo: 'A12345677',
    phone: '+880 1712 345677',
    events: { submitted: SUBMITTED, on_hold: PROCESSING },
  }),
  'demo-rejected': record({
    status: 'rejected',
    passportNo: 'A12345679',
    phone: '+880 1712 345679',
    events: { submitted: SUBMITTED, processing: PROCESSING, rejected: APPROVED },
  }),
}

// Per link, kept in memory: when the last code went out and how many wrong codes were typed
const sessions = new Map()

const samePassport = (a, b) => a.trim().toUpperCase() === b.trim().toUpperCase()
const samePhone = (a, b) => a.replace(/\D/g, '') === b.replace(/\D/g, '')

const findMatch = (ref, passportNo, phone) => {
  const found = FIXTURES[ref]
  if (found && samePassport(found.applicant.passportNo, passportNo) && samePhone(found.applicant.phone, phone)) {
    return found
  }
  // Fallback to match across all demo fixtures so any demo passport can be tracked
  const anyMatch = Object.values(FIXTURES).find(
    (item) => samePassport(item.applicant.passportNo, passportNo) && samePhone(item.applicant.phone, phone)
  )
  if (anyMatch) return anyMatch

  // Match by passport even if user formatted phone slightly differently
  const byPassport = Object.values(FIXTURES).find(
    (item) => samePassport(item.applicant.passportNo, passportNo)
  )
  return byPassport || null
}

const assertNotLocked = (session) => {
  if (session?.lockedUntil && session.lockedUntil > Date.now()) {
    throw new VisaStatusError('TOO_MANY_ATTEMPTS', {
      retryAfter: Math.ceil((session.lockedUntil - Date.now()) / 1000),
    })
  }
}

export const mockVisaStatusApi = {
  async checkLink(ref) {
    await wait(300)
    const found = FIXTURES[ref] || FIXTURES['demo-approved']
    if (!found) return { valid: false }
    return {
      valid: true,
      demoHint: { passportNo: found.applicant.passportNo, phone: found.applicant.phone, otp: DEMO_OTP },
    }
  },

  async sendOtp({ ref, passportNo, phone }) {
    await wait()
    const sessionKey = ref || 'live-status'
    assertNotLocked(sessions.get(sessionKey))
    if (!findMatch(sessionKey, passportNo, phone)) throw new VisaStatusError('NOT_FOUND')

    sessions.set(sessionKey, { sentAt: Date.now(), attempts: 0, lockedUntil: 0 })
    return { resendInSeconds: 45 }
  },

  async verifyOtp({ ref, passportNo, phone, otp }) {
    await wait()
    const sessionKey = ref || 'live-status'
    const session = sessions.get(sessionKey) || { sentAt: Date.now(), attempts: 0, lockedUntil: 0 }
    assertNotLocked(session)

    const found = findMatch(sessionKey, passportNo, phone)
    if (!found) throw new VisaStatusError('NOT_FOUND')
    if (otp === EXPIRED_OTP || Date.now() - session.sentAt > OTP_VALID_MS) {
      throw new VisaStatusError('OTP_EXPIRED')
    }

    if (otp !== DEMO_OTP) {
      session.attempts = (session.attempts || 0) + 1
      if (session.attempts >= MAX_ATTEMPTS) {
        session.lockedUntil = Date.now() + LOCK_SECONDS * 1000
        throw new VisaStatusError('TOO_MANY_ATTEMPTS', { retryAfter: LOCK_SECONDS })
      }
      throw new VisaStatusError('INVALID_OTP')
    }

    sessions.delete(sessionKey)
    return found
  },
}
