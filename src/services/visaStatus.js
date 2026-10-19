/**
 * Visa status lookup. The UI only talks to these three functions.
 *
 *   checkLink(ref)                                  -> { valid, demoHint? }
 *   sendOtp({ ref, passportNo, phone })             -> { resendInSeconds }
 *   verifyOtp({ ref, passportNo, phone, otp })      -> VisaStatusResult
 *
 * VisaStatusResult
 *   status        key of VISA_STATUS_CONFIG
 *   applicant     { fullName, passportNo, phone }
 *   country       { code, name }
 *   visaType, entryType, applicationNo, submittedAt, processingTime
 *   events        ISO date of each stage reached, keyed by stage key
 *
 * Until the API exists the only implementation is the demo one, and it is off unless VITE_DEMO_MODE=true.
 * Without it every call fails with SERVICE_UNAVAILABLE, so the page never pretends an OTP was checked.
 * Swap `loadApi` for a real client when the endpoints are ready.
 */

export class VisaStatusError extends Error {
  constructor(code, { retryAfter } = {}) {
    super(code)
    this.name = 'VisaStatusError'
    this.code = code
    this.retryAfter = retryAfter
  }
}

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

const unavailable = () => Promise.reject(new VisaStatusError('SERVICE_UNAVAILABLE'))

const loadApi = async () => {
  if (isDemoMode) return (await import('./visaStatus.mock')).mockVisaStatusApi
  return { checkLink: unavailable, sendOtp: unavailable, verifyOtp: unavailable }
}

export const checkLink = async (ref) => (await loadApi()).checkLink(ref)
export const sendOtp = async (params) => (await loadApi()).sendOtp(params)
export const verifyOtp = async (params) => (await loadApi()).verifyOtp(params)
