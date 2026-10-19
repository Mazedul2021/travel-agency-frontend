import { useCallback, useEffect, useState } from 'react'
import { OTP_RESEND_SECONDS } from '@/constants'
import { checkLink, sendOtp, verifyOtp, VisaStatusError } from '@/services/visaStatus'
import { useCountdown } from './useCountdown'

const toError = (err) =>
  err instanceof VisaStatusError ? { code: err.code, retryAfter: err.retryAfter } : { code: 'NETWORK' }

/**
 * State of one visa status lookup: is the link good, which step the form is on, and what came back.
 * Mount it with key={ref}, so a different link starts from scratch.
 */
export function useStatusLookup(ref) {
  // link.state: 'checking' | 'valid' | 'invalid' | 'unavailable'
  const [link, setLink] = useState({ state: 'checking' })
  const [step, setStep] = useState('details') // 'details' | 'otp'
  const [busy, setBusy] = useState(null) // 'sending' | 'verifying' | null
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const { remaining, start, stop } = useCountdown()

  useEffect(() => {
    let cancelled = false

    checkLink(ref)
      .then(({ valid, demoHint }) => {
        if (!cancelled) setLink(valid ? { state: 'valid', demoHint } : { state: 'invalid' })
      })
      .catch(() => {
        if (!cancelled) setLink({ state: 'unavailable' })
      })

    return () => {
      cancelled = true
    }
  }, [ref])

  const send = useCallback(
    async ({ passportNo, phone }) => {
      setBusy('sending')
      setError(null)
      try {
        const { resendInSeconds = OTP_RESEND_SECONDS } = await sendOtp({ ref, passportNo, phone })
        setStep('otp')
        start(resendInSeconds)
        return true
      } catch (err) {
        setError(toError(err))
        return false
      } finally {
        setBusy(null)
      }
    },
    [ref, start],
  )

  const verify = useCallback(
    async ({ passportNo, phone, otp }) => {
      setBusy('verifying')
      setError(null)
      try {
        setResult(await verifyOtp({ ref, passportNo, phone, otp }))
        return true
      } catch (err) {
        const next = toError(err)
        // An expired code cannot be resent while the timer still runs, so free the resend link
        if (next.code === 'OTP_EXPIRED') stop()
        setError(next)
        return false
      } finally {
        setBusy(null)
      }
    },
    [ref, stop],
  )

  // Back to step 1: the passport or phone changed, or the result was closed. A code is never reused.
  const reset = useCallback(() => {
    setStep('details')
    setError(null)
    stop()
  }, [stop])

  const clearError = useCallback(() => setError(null), [])

  const closeResult = useCallback(() => {
    setResult(null)
    reset()
  }, [reset])

  return { link, step, busy, error, result, remaining, send, verify, reset, clearError, closeResult }
}

export default useStatusLookup
