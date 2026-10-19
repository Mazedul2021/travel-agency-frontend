import { useCallback, useEffect, useState } from 'react'

/**
 * Counts down whole seconds. Time is read from the clock, so a throttled background tab still catches up.
 */
export function useCountdown() {
  const [endAt, setEndAt] = useState(0)
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    if (!endAt) return undefined

    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0) clearInterval(id)
    }, 250)

    return () => clearInterval(id)
  }, [endAt])

  const start = useCallback((seconds) => {
    setRemaining(seconds)
    setEndAt(Date.now() + seconds * 1000)
  }, [])

  const stop = useCallback(() => {
    setEndAt(0)
    setRemaining(0)
  }, [])

  return { remaining, start, stop }
}

export default useCountdown
