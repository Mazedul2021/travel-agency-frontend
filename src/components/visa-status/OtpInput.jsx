import { useEffect, useRef } from 'react'
import { OTP_LENGTH } from '@/constants'

/**
 * Six single-digit boxes that behave like one field: typing moves on, backspace moves back,
 * and a pasted or auto-filled code (SMS suggestion) spreads over the boxes.
 * `focusKey` moves focus to the first box each time it changes.
 */
export default function OtpInput({ value, onChange, disabled = false, invalid = false, focusKey = 0, describedBy }) {
  const boxes = useRef([])
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => value[index] ?? '')

  useEffect(() => {
    if (focusKey) boxes.current[0]?.focus()
  }, [focusKey])

  const focusBox = (index) => boxes.current[Math.min(Math.max(index, 0), OTP_LENGTH - 1)]?.focus()

  const write = (index, incoming) => {
    const typed = incoming.replace(/\D/g, '')
    if (!typed) return
    const next = digits.slice()
    typed
      .slice(0, OTP_LENGTH - index)
      .split('')
      .forEach((digit, offset) => {
        next[index + offset] = digit
      })
    onChange(next.join('').slice(0, OTP_LENGTH))
    focusBox(index + typed.length)
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      if (digits[index]) {
        const next = digits.slice()
        next[index] = ''
        onChange(next.join(''))
      } else if (index > 0) {
        const next = digits.slice()
        next[index - 1] = ''
        onChange(next.join(''))
        focusBox(index - 1)
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusBox(index - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusBox(index + 1)
    }
  }

  return (
    <div role="group" aria-label="One-time password" aria-describedby={describedBy} className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            boxes.current[index] = node
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={OTP_LENGTH}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
          aria-invalid={invalid}
          placeholder="–"
          onChange={(event) => write(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onFocus={(event) => event.target.select()}
          onPaste={(event) => {
            event.preventDefault()
            write(index, event.clipboardData.getData('text'))
          }}
          className={`size-11 rounded-xl border bg-white text-center text-lg font-semibold text-navy transition-colors placeholder:text-slate-300 focus:outline-none focus:ring-2 sm:h-14 sm:w-[58px] ${
            invalid
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-200 focus:border-primary focus:ring-primary/20'
          } disabled:cursor-not-allowed disabled:bg-slate-50`}
        />
      ))}
    </div>
  )
}
