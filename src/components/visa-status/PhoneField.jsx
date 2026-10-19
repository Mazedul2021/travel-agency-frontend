import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Phone } from 'lucide-react'
import { COUNTRY_DIAL_CODES } from '@/constants'
import CountryFlag from '@/components/sections/VisaExplorer/CountryFlag'

const inputClass = (invalid) =>
  `h-11 w-full rounded-xl border bg-white pl-11 pr-4 text-[15px] text-navy placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
    invalid
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
      : 'border-slate-200 focus:border-primary focus:ring-primary/20'
  } disabled:cursor-not-allowed disabled:bg-slate-50`

export default function PhoneField({
  id,
  dial,
  number,
  onDialChange,
  onNumberChange,
  onBlur,
  invalid = false,
  describedBy,
  disabled = false,
}) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const selected = COUNTRY_DIAL_CODES.find((item) => item.dial === dial) ?? COUNTRY_DIAL_CODES[0]

  useEffect(() => {
    if (!open) return undefined

    const closeOnOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutside)
    document.addEventListener('keydown', closeOnEscape, true)
    return () => {
      document.removeEventListener('mousedown', closeOnOutside)
      document.removeEventListener('keydown', closeOnEscape, true)
    }
  }, [open])

  return (
    <div className="flex gap-3">
      <div ref={wrapperRef} className="relative shrink-0">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={`Country code, ${selected.label}`}
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-[104px] cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-[15px] font-medium text-navy transition-colors hover:bg-slate-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-50 sm:w-[132px]"
        >
          <CountryFlag code={selected.code} name="" width={26} />
          <span>{selected.dial}</span>
          <ChevronDown className="ml-auto size-4 text-slate-400" aria-hidden="true" />
        </button>

        {open && (
          <ul className="absolute left-0 top-full z-20 mt-1.5 max-h-60 w-60 overflow-y-auto rounded-xl border border-slate-100 bg-white py-1 shadow-widget">
            {COUNTRY_DIAL_CODES.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  onClick={() => {
                    onDialChange(item.dial)
                    setOpen(false)
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-primary-light ${
                    item.dial === dial ? 'bg-primary-light font-semibold text-primary' : 'text-navy'
                  }`}
                >
                  <CountryFlag code={item.code} name="" width={22} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative min-w-0 flex-1">
        <Phone
          className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={number}
          disabled={disabled}
          onChange={(event) => onNumberChange(event.target.value)}
          onBlur={onBlur}
          placeholder="Enter your phone number"
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={inputClass(invalid)}
        />
      </div>
    </div>
  )
}
