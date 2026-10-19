import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Pause, Play, Users } from 'lucide-react'
import { goToVisa } from '@/hooks'

/*
  Brand colors taken from the ABL Travels logo:
  blue   #0d81f0 (dark #0a5ec0, soft track #e3effc)
  orange #ff9a00 (dark #b45f00 for small text)
  navy   #0b2a4a (text)
*/
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d81f0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9fe]'

// The marquee speed is constant in px/second on every screen size.
// The loop duration is measured from the real track width, so mobile
// (narrower cards) and desktop scroll at exactly the same pace.
const MARQUEE_SPEED_PX_PER_SEC = 40
const DEFAULT_LOOP_SECONDS = 70 // fallback until the track is measured
const GAUGE_STAGGER_MS = 90 // delay between each gauge starting to fill

// Ultra-crisp Circular Vector Flags
function CircularFlag({ code, className = 'size-6' }) {
  switch (code) {
    case 'CN': // China
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white select-none`}>
          <circle cx="50" cy="50" r="50" fill="#de2910" />
          <polygon
            points="28,16 31,26 41,26 33,32 36,42 28,36 20,42 23,32 15,26 25,26"
            fill="#ffde00"
          />
          <circle cx="48" cy="18" r="3.2" fill="#ffde00" />
          <circle cx="54" cy="28" r="3.2" fill="#ffde00" />
          <circle cx="52" cy="40" r="3.2" fill="#ffde00" />
          <circle cx="44" cy="48" r="3.2" fill="#ffde00" />
        </svg>
      )
    case 'TH': // Thailand
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#ed1c24" />
          <rect y="16.6" width="100" height="66.8" fill="#ffffff" />
          <rect y="33.3" width="100" height="33.4" fill="#241d4f" />
        </svg>
      )
    case 'SG': // Singapore
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#ffffff" />
          <path d="M 0,0 L 100,0 L 100,50 L 0,50 Z" fill="#ed2939" />
          <path d="M 32,18 A 14,14 0 1 0 32,42 A 11,11 0 1 1 32,18 Z" fill="#ffffff" />
          <circle cx="39" cy="24" r="2.2" fill="#ffffff" />
          <circle cx="44" cy="27" r="2.2" fill="#ffffff" />
          <circle cx="43" cy="33" r="2.2" fill="#ffffff" />
          <circle cx="37" cy="35" r="2.2" fill="#ffffff" />
          <circle cx="34" cy="29" r="2.2" fill="#ffffff" />
        </svg>
      )
    case 'MY': // Malaysia
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect width="100" height="100" fill="#ffffff" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={i * 7.14} width="100" height="7.14" fill="#cc0000" />
          ))}
          <rect width="50" height="50" fill="#000066" />
          <path d="M 28,12 A 14,14 0 1 0 28,38 A 11,11 0 1 1 28,12 Z" fill="#ffcc00" />
          <polygon points="34,22 36,25 39,24 37,27 40,29 36,30 36,33 34,31 32,33 32,30 28,29 31,27 29,24 32,25" fill="#ffcc00" />
        </svg>
      )
    case 'AE': // UAE
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect y="0" width="100" height="33.3" fill="#00732f" />
          <rect y="33.3" width="100" height="33.4" fill="#ffffff" />
          <rect y="66.7" width="100" height="33.3" fill="#000000" />
          <rect x="0" y="0" width="30" height="100" fill="#ff0000" />
        </svg>
      )
    case 'TR': // Turkey
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#e30a17" />
          <path d="M 48,24 A 26,26 0 1 0 48,76 A 21,21 0 1 1 48,24 Z" fill="#ffffff" />
          <polygon
            points="60,40 63,47 70,47 65,52 67,59 60,55 53,59 55,52 50,47 57,47"
            fill="#ffffff"
          />
        </svg>
      )
    case 'IN': // India
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect y="0" width="100" height="33.3" fill="#ff9933" />
          <rect y="33.3" width="100" height="33.4" fill="#ffffff" />
          <rect y="66.7" width="100" height="33.3" fill="#128807" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="#000080" strokeWidth="2" />
          <circle cx="50" cy="50" r="3" fill="#000080" />
        </svg>
      )
    case 'GB': // United Kingdom
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#012169" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="#ffffff" strokeWidth="15" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#ffffff" strokeWidth="15" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="#c8102e" strokeWidth="7" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#c8102e" strokeWidth="7" />
          <rect x="38" y="0" width="24" height="100" fill="#ffffff" />
          <rect x="0" y="38" width="100" height="24" fill="#ffffff" />
          <rect x="43" y="0" width="14" height="100" fill="#c8102e" />
          <rect x="0" y="43" width="100" height="14" fill="#c8102e" />
        </svg>
      )
    case 'US': // United States
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <rect width="100" height="100" fill="#b22234" />
          {[1, 3, 5, 7, 9, 11].map((i) => (
            <rect key={i} y={i * 7.7} width="100" height="7.7" fill="#ffffff" />
          ))}
          <rect width="45" height="52" fill="#3c3b6e" />
          <circle cx="15" cy="14" r="2.5" fill="#ffffff" />
          <circle cx="30" cy="14" r="2.5" fill="#ffffff" />
          <circle cx="22" cy="26" r="2.5" fill="#ffffff" />
          <circle cx="15" cy="38" r="2.5" fill="#ffffff" />
          <circle cx="30" cy="38" r="2.5" fill="#ffffff" />
        </svg>
      )
    case 'JP': // Japan
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#ffffff" />
          <circle cx="50" cy="50" r="26" fill="#bc002d" />
        </svg>
      )
    case 'SA': // Saudi Arabia
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#006c35" />
          <path d="M 28,45 L 72,45 L 68,49 L 28,49 Z" fill="#ffffff" />
          <circle cx="50" cy="34" r="4.5" fill="#ffffff" />
          <path d="M 38,39 Q 50,43 62,39" stroke="#ffffff" strokeWidth="2.5" fill="none" />
        </svg>
      )
    case 'EU': // Schengen
    default:
      return (
        <svg viewBox="0 0 100 100" className={`${className} shrink-0 rounded-full shadow-xs ring-2 ring-white overflow-hidden select-none`}>
          <circle cx="50" cy="50" r="50" fill="#003399" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x = 50 + 30 * Math.cos(angle)
            const y = 50 + 30 * Math.sin(angle)
            return <circle key={i} cx={x} cy={y} r="3" fill="#ffcc00" />
          })}
        </svg>
      )
  }
}

// Country card data
const COUNTRIES = [
  {
    name: 'China',
    flagCode: 'CN',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=480&q=75',
    successRate: 98,
    visasIssued: '2,540',
  },
  {
    name: 'Thailand',
    flagCode: 'TH',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=480&q=75',
    successRate: 96,
    visasIssued: '1,820',
  },
  {
    name: 'Singapore',
    flagCode: 'SG',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=480&q=75',
    successRate: 97,
    visasIssued: '1,150',
  },
  {
    name: 'Malaysia',
    flagCode: 'MY',
    image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=480&q=75',
    successRate: 95,
    visasIssued: '1,430',
  },
  {
    name: 'UAE',
    flagCode: 'AE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=480&q=75',
    successRate: 94,
    visasIssued: '980',
  },
  {
    name: 'Turkey',
    flagCode: 'TR',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=480&q=75',
    successRate: 93,
    visasIssued: '720',
  },
  {
    name: 'India',
    flagCode: 'IN',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=480&q=75',
    successRate: 92,
    visasIssued: '1,680',
  },
  {
    name: 'Schengen',
    flagCode: 'EU',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=480&q=75',
    successRate: 91,
    visasIssued: '1,120',
  },
  {
    name: 'United Kingdom',
    flagCode: 'GB',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=480&q=75',
    successRate: 94,
    visasIssued: '890',
  },
  {
    name: 'United States',
    flagCode: 'US',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=480&q=75',
    successRate: 90,
    visasIssued: '650',
  },
  {
    name: 'Japan',
    flagCode: 'JP',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=480&q=75',
    successRate: 97,
    visasIssued: '1,240',
  },
  {
    name: 'Saudi Arabia',
    flagCode: 'SA',
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=480&q=75',
    successRate: 99,
    visasIssued: '3,100',
  },
]

// Open-arc gauge: percentage in the center, flag in the gap at the bottom.
// The arc fills in — with a small per-card stagger — once the section is in view.
function ArcGauge({ percent, flagCode, animate, delay = 0 }) {
  const cx = 50
  const cy = 48
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * (260 / 360)
  const progressLength = animate ? (percent / 100) * arcLength : 0

  return (
    <div
      className="relative mx-auto flex size-24 select-none items-center justify-center"
      role="img"
      aria-label={`${percent} percent visa success rate`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#e3effc"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(140 ${cx} ${cy})`}
        />

        {/* Progress arc: hidden (opacity 0) until it fills, so the round line
            cap never draws a stray dot at 0%. Delay creates the stagger. */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#0d81f0"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${progressLength} ${circumference}`}
          transform={`rotate(140 ${cx} ${cy})`}
          className="transition-[stroke-dasharray,opacity] duration-[1400ms] ease-out motion-reduce:transition-none"
          style={{
            opacity: animate ? 1 : 0,
            transitionDelay: `${delay}ms`,
          }}
        />

        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          className="select-none fill-[#0b2a4a] font-serif text-[20px] font-semibold"
        >
          {percent}%
        </text>
      </svg>

      <div
        className="pointer-events-none absolute inset-x-0 -bottom-1 z-10 flex justify-center"
        aria-hidden="true"
      >
        <CircularFlag code={flagCode} className="size-6 drop-shadow-sm" />
      </div>
    </div>
  )
}

// One country card: a single link, so it works with keyboard and screen readers
function CountryCard({ country, index, onSelect, animate, decorative = false }) {
  const code = country.flagCode.toLowerCase()

  return (
    <a
      href={`/visa#visa/${code}`}
      onClick={(e) => onSelect(e, code)}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
      tabIndex={decorative ? -1 : undefined}
      aria-hidden={decorative || undefined}
      aria-label={`${country.name}: ${country.successRate}% success rate, ${country.visasIssued} visas issued`}
      className={`group flex w-[200px] shrink-0 select-none flex-col overflow-hidden rounded-2xl border border-[#0b2a4a]/10 bg-white shadow-[0_10px_30px_-14px_rgba(11,42,74,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-16px_rgba(11,42,74,0.45)] sm:w-[215px] lg:w-[230px] ${focusRing}`}
    >
      {/* Photo */}
      <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-[#d7e8fb] to-[#eaf3fd] sm:h-32">
        {/* Responsive srcSet: phones download the 240w version, desktops the 480w one */}
        <img
          src={country.image}
          srcSet={`${country.image.replace('w=480', 'w=240')} 240w, ${country.image} 480w`}
          sizes="(max-width: 640px) 200px, 230px"
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.visibility = 'hidden'
          }}
          draggable="false"
          className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061a33]/55 via-transparent to-transparent" />
        {/* Brand line, same blue to orange as the header */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#0d81f0] via-[#0d81f0] to-[#ff9a00]" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center px-4 pb-4 pt-4 text-center">
        <h3 className="font-serif text-lg font-semibold tracking-tight text-[#0b2a4a]">
          {country.name}
        </h3>

        <div className="mt-3">
          <ArcGauge
            percent={country.successRate}
            flagCode={country.flagCode}
            animate={animate}
            delay={index * GAUGE_STAGGER_MS}
          />
        </div>

        <div className="mt-4 flex w-full flex-col items-center border-t border-[#0b2a4a]/10 pt-3">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-[#0d81f0]/10 text-[#0a5ec0]">
              <Users className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-semibold tabular-nums text-[#0a5ec0]">
              {country.visasIssued}
            </span>
          </div>
          <span className="mt-0.5 text-xs font-medium text-slate-500">
            Visas issued
          </span>
        </div>
      </div>
    </a>
  )
}

export default function TrustedWorldwide() {
  const sectionRef = useRef(null)
  const firstSetRef = useRef(null)
  const touchTimer = useRef(null)
  const [inView, setInView] = useState(false)
  const [loopSeconds, setLoopSeconds] = useState(DEFAULT_LOOP_SECONDS)
  const [userPaused, setUserPaused] = useState(false) // pause button
  const [touchPaused, setTouchPaused] = useState(false) // finger on the track
  const [keyboardFocus, setKeyboardFocus] = useState(false) // tabbing through cards

  const marqueePaused = userPaused || touchPaused

  // Link click: on /visa use the in-page handler, otherwise follow the link
  const handleSelectCountry = (e, code) => {
    if (window.location.pathname === '/visa') {
      e.preventDefault()
      goToVisa(code)
    }
  }

  // Keyboard users: stop the loop, lay the cards out from the start and
  // center every focused card so none of them can be "lost" off-screen.
  const handleRegionFocus = (e) => {
    if (!e.target.matches?.(':focus-visible')) return
    setKeyboardFocus(true)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Wait one frame so the track transform is cleared before centering
    window.requestAnimationFrame(() => {
      e.target.scrollIntoView?.({
        behavior: reduceMotion ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    })
  }

  const handleRegionBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return
    setKeyboardFocus(false)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      e.currentTarget.scrollLeft = 0
    }
  }

  // Touch users cannot hover, so holding a finger on the track pauses it
  // and lets it resume gently after they let go.
  const handleTouchStart = () => {
    window.clearTimeout(touchTimer.current)
    setTouchPaused(true)
  }
  const handleTouchEnd = () => {
    window.clearTimeout(touchTimer.current)
    touchTimer.current = window.setTimeout(() => setTouchPaused(false), 1600)
  }
  useEffect(() => () => window.clearTimeout(touchTimer.current), [])

  // Measure one full card set and derive the loop duration from it, so the
  // scroll speed is identical on mobile, tablet and desktop.
  useEffect(() => {
    const setEl = firstSetRef.current
    if (!setEl) return undefined

    const measure = () => {
      const width = setEl.offsetWidth // one full set, including the trailing gap
      if (width > 0) {
        setLoopSeconds(
          Math.round((width / MARQUEE_SPEED_PX_PER_SEC) * 10) / 10
        )
      }
    }

    measure()
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(measure)
    observer.observe(setEl)
    return () => observer.disconnect()
  }, [])

  // Fill the gauges once, when the section first comes into view
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window) || !sectionRef.current) {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trusted-worldwide-title"
      className="relative overflow-hidden bg-[#f5f9fe] py-16 sm:py-20 lg:py-24"
    >
      {/* Endless left-moving loop: the track holds two copies, so -50% is one full set */}
      <style>{`
        @keyframes trustedMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Soft blue glow + dotted pattern */}
      <div
        className="pointer-events-none absolute inset-0 select-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(13,129,240,0.10),transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 select-none opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0a5ec0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-[#b45f00] sm:text-4xl">
              Visa success rate
            </p>

            <h2
              id="trusted-worldwide-title"
              className="mt-2 font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-[#0b2a4a] text-balance sm:text-4xl lg:text-5xl"
            >
              Trusted by thousands worldwide
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
              From document checklist to final approval, our visa specialists
              manage every step of the journey — so your paperwork is one less
              thing to worry about.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            {/* Flight path */}
            <div
              className="pointer-events-none -mb-1 mr-4 hidden h-8 w-48 select-none items-center justify-end sm:flex"
              aria-hidden="true"
            >
              <svg viewBox="0 0 160 30" className="h-full w-full" fill="none">
                <path
                  d="M 5,22 Q 80,24 140,8"
                  stroke="#ff9a00"
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
                <g transform="translate(142, 6) rotate(-22)">
                  <path d="M 0,0 L 12,3.5 L 0,7 L 3,3.5 Z" fill="#ff9a00" />
                </g>
              </svg>
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
              {/* Pause / play for the moving slider */}
              <button
                type="button"
                onClick={() => setUserPaused((value) => !value)}
                aria-pressed={userPaused}
                aria-label={userPaused ? 'Play slider' : 'Pause slider'}
                title={userPaused ? 'Play slider' : 'Pause slider'}
                className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-[#0b2a4a]/20 bg-white/80 text-[#0b2a4a] backdrop-blur-sm transition-colors hover:border-[#0d81f0] hover:text-[#0a5ec0] motion-reduce:hidden ${focusRing}`}
              >
                {userPaused ? (
                  <Play className="size-4 fill-current" aria-hidden="true" />
                ) : (
                  <Pause className="size-4 fill-current" aria-hidden="true" />
                )}
              </button>

              <a
                href="/visa"
                className={`group inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-[#0b2a4a]/20 bg-white/80 px-6 py-3 text-sm font-semibold text-[#0b2a4a] backdrop-blur-sm transition-all duration-300 hover:border-[#0b2a4a] hover:bg-[#0b2a4a] hover:text-white sm:flex-none ${focusRing}`}
              >
                View all countries
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Real data. Real travelers. Real success.
            </p>
          </div>
        </div>
      </div>

      {/* Continuous slider: full width, soft fade on both edges. Pauses on
          hover, while touched, with the pause button, or during keyboard use. */}
      <div
        className="group/marquee relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]"
        role="region"
        aria-label="Visa success rate by country"
        onFocus={handleRegionFocus}
        onBlur={handleRegionBlur}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div
          className="flex w-max will-change-transform motion-safe:animate-[trustedMarquee_linear_infinite] motion-safe:group-hover/marquee:[animation-play-state:paused]"
          style={{
            animationDuration: `${loopSeconds}s`,
            ...(marqueePaused ? { animationPlayState: 'paused' } : {}),
            ...(keyboardFocus ? { animationName: 'none' } : {}),
          }}
        >
          {/* Set 1 */}
          <div ref={firstSetRef} className="flex gap-4 pr-4">
            {COUNTRIES.map((country, index) => (
              <CountryCard
                key={country.name}
                country={country}
                index={index}
                onSelect={handleSelectCountry}
                animate={inView}
              />
            ))}
          </div>

          {/* Set 2: identical copy that makes the loop seamless (hidden from assistive tech) */}
          <div className="flex gap-4 pr-4 motion-reduce:hidden" aria-hidden="true">
            {COUNTRIES.map((country, index) => (
              <CountryCard
                key={country.name}
                country={country}
                index={index}
                onSelect={handleSelectCountry}
                animate={inView}
                decorative
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}