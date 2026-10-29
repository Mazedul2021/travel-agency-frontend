import { useState } from 'react'
import { CircleAlert, ClipboardList, LoaderCircle } from 'lucide-react'
import { OTP_LENGTH, VISA_STATUS_ERRORS, isValidPhone, maskPhone, toE164 } from '@/constants'
import { isDemoMode } from '@/services/visaStatus'
import OtpInput from './OtpInput'
import PhoneField from './PhoneField'

const PASSPORT_PATTERN = /^[A-Z0-9]{6,9}$/
const OTP_ERROR_CODES = ['INVALID_OTP', 'OTP_EXPIRED']

const inputClass = (invalid) =>
  `h-11 w-full rounded-xl border pl-11 pr-4 text-[15px] text-navy placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
    invalid
      ? 'border-rose-400 bg-white focus:border-rose-500 focus:ring-rose-200'
      : 'border-slate-200 bg-white focus:border-primary focus:ring-primary/20'
  } disabled:cursor-not-allowed disabled:bg-slate-50`

const clock = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

const messageFor = ({ code, retryAfter }) => {
  const base = VISA_STATUS_ERRORS[code] ?? VISA_STATUS_ERRORS.NETWORK
  if (code !== 'TOO_MANY_ATTEMPTS' || !retryAfter) return base
  const minutes = Math.ceil(retryAfter / 60)
  return `${base} Try again in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}.`
}

function StepHeading({ number, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white">
        {number}
      </span>
      <div className="min-w-0 pt-0.5">
        <h2 className="text-lg font-bold leading-tight text-navy">{title}</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-body sm:text-[13.5px]" aria-live="polite">
          {children}
        </p>
      </div>
    </div>
  )
}

function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
      {children}
    </p>
  )
}

export default function StatusLookupForm({ fullName, lookup }) {
  const { step, busy, error, remaining, send, verify, reset } = lookup

  const [passportNo, setPassportNo] = useState('')
  const [dial, setDial] = useState('+880')
  const [number, setNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [touched, setTouched] = useState({ passport: false, phone: false })
  const [focusKey, setFocusKey] = useState(0)

  const passport = passportNo.trim().toUpperCase()
  const passportError = !passport
    ? 'Enter your passport number.'
    : !PASSPORT_PATTERN.test(passport)
      ? 'Passport numbers have 6 to 9 letters and digits.'
      : ''
  const phoneError = !number.trim()
    ? 'Enter your phone number.'
    : !isValidPhone(dial, number)
      ? 'Enter a valid phone number for the selected country.'
      : ''

  const isLocked = error?.code === 'TOO_MANY_ATTEMPTS'
  const otpValue = step === 'otp' ? otp : ''
  // A running request keeps the button enabled (it shows a spinner); the handlers ignore a second click
  const canSend = step === 'details' && !passportError && !phoneError && !isLocked
  const canCheck = step === 'otp' && otpValue.length === OTP_LENGTH && !isLocked
  const otpError = error && OTP_ERROR_CODES.includes(error.code) ? messageFor(error) : ''
  const formError = error && !OTP_ERROR_CODES.includes(error.code) ? messageFor(error) : ''

  // Changing who is being looked up cancels the code that was sent
  const edit = (setter) => (value) => {
    setter(value)
    if (step === 'otp' || error) reset()
  }

  const handleSend = async () => {
    setTouched({ passport: true, phone: true })
    if (passportError || phoneError || busy || isLocked) return
    const sent = await send({ passportNo: passport, phone: toE164(dial, number) })
    if (sent) {
      setOtp('')
      setFocusKey((key) => key + 1)
    }
  }

  const handleCheck = async () => {
    if (!canCheck || busy) return
    const found = await verify({ passportNo: passport, phone: toE164(dial, number), otp: otpValue })
    if (!found) {
      setOtp('')
      setFocusKey((key) => key + 1)
    }
  }

  const showPassportError = touched.passport && passportError
  const showPhoneError = touched.phone && phoneError

  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' || event.target.tagName !== 'INPUT') return
        event.preventDefault()
        if (step === 'otp') handleCheck()
        else handleSend()
      }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-9"
    >
      {isDemoMode && lookup.link?.demoHint && (
        <div className="mb-6 flex flex-col gap-2.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/90 p-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">🧪 Demo Mode:</span> Passport{' '}
            <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">
              {lookup.link.demoHint.passportNo}
            </strong>
            , Phone{' '}
            <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">
              {lookup.link.demoHint.phone}
            </strong>
            , OTP{' '}
            <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">
              {lookup.link.demoHint.otp}
            </strong>
          </div>
          <button
            type="button"
            onClick={() => {
              setPassportNo(lookup.link.demoHint.passportNo)
              setDial('+880')
              setNumber('1712345678')
              if (step === 'otp') setOtp(lookup.link.demoHint.otp)
            }}
            className="cursor-pointer shrink-0 rounded-lg bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition active:scale-95"
          >
            Auto-fill Demo
          </button>
        </div>
      )}

      <StepHeading number={1} title="Enter Your Details">
        Provide your passport number and phone number to receive a verification code.
      </StepHeading>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="visa-status-name" className="mb-2 block text-sm font-semibold text-navy">
            Full Name
          </label>
          <input
            id="visa-status-name"
            type="text"
            readOnly
            value={fullName}
            placeholder="Auto fetched from our records"
            className="h-11 w-full cursor-default rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-[15px] text-navy placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="visa-status-passport" className="mb-2 block text-sm font-semibold text-navy">
            Passport Number
          </label>
          <div className="relative">
            <ClipboardList
              className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="visa-status-passport"
              type="text"
              autoComplete="off"
              autoCapitalize="characters"
              maxLength={12}
              value={passportNo}
              onChange={(event) => edit(setPassportNo)(event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, passport: true }))}
              placeholder="Enter your passport number"
              aria-invalid={Boolean(showPassportError)}
              aria-describedby={showPassportError ? 'visa-status-passport-error' : undefined}
              className={`${inputClass(showPassportError)} uppercase placeholder:normal-case`}
            />
          </div>
          <FieldError id="visa-status-passport-error">{showPassportError}</FieldError>
        </div>

        <div>
          <label htmlFor="visa-status-phone" className="mb-2 block text-sm font-semibold text-navy">
            Phone Number
          </label>
          <PhoneField
            id="visa-status-phone"
            dial={dial}
            number={number}
            onDialChange={edit(setDial)}
            onNumberChange={edit(setNumber)}
            onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
            invalid={Boolean(showPhoneError)}
            describedBy={showPhoneError ? 'visa-status-phone-error' : undefined}
          />
          <FieldError id="visa-status-phone-error">{showPhoneError}</FieldError>
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {busy === 'sending' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Send OTP'
          )}
        </button>
      </div>

      <div className="my-7 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-semibold text-body">OR</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <StepHeading number={2} title="Verify OTP">
        {step === 'otp'
          ? `We have sent a ${OTP_LENGTH}-digit OTP to ${maskPhone(dial, number)}.`
          : `We will send a ${OTP_LENGTH}-digit OTP to your phone number.`}
      </StepHeading>

      <div className="mt-6">
        <OtpInput
          value={otpValue}
          onChange={setOtp}
          disabled={step !== 'otp' || busy === 'verifying'}
          invalid={Boolean(otpError)}
          focusKey={focusKey}
          describedBy={otpError ? 'visa-status-otp-error' : undefined}
        />
        {otpError && (
          <p id="visa-status-otp-error" role="alert" className="mt-3 text-center text-xs font-medium text-rose-600">
            {otpError}
          </p>
        )}

        {step === 'otp' && (
          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-body">
              Didn&apos;t receive OTP?{' '}
              <button
                type="button"
                onClick={handleSend}
                disabled={remaining > 0 || Boolean(busy) || isLocked}
                className="cursor-pointer font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-60"
              >
                Resend OTP
              </button>
              {remaining > 0 && <span className="ml-1 tabular-nums">({clock(remaining)})</span>}
            </p>
            {isDemoMode && (
              <p>
                <button
                  type="button"
                  onClick={() => setOtp('123456')}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-md transition"
                >
                  ⚡ Auto-fill Demo Code (123456)
                </button>
              </p>
            )}
          </div>
        )}

        {formError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleCheck}
          disabled={!canCheck}
          className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {busy === 'verifying' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Checking...
            </>
          ) : (
            'Check Visa Status'
          )}
        </button>
      </div>
    </form>
  )
}
