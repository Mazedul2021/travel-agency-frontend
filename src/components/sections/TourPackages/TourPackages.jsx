import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mountain,
  Building2,
  Leaf,
  Umbrella,
} from 'lucide-react'
import { DESTINATIONS } from '@/constants'

const CATEGORY_STYLES = [
  { label: 'Beach & Islands', icon: Umbrella },
  { label: 'City & Culture', icon: Building2 },
  { label: 'Modern & Nature', icon: Leaf },
  { label: 'Luxury & City', icon: Building2 },
  { label: 'Nature & Relaxation', icon: Mountain },
]

const AUTO_SLIDE_DELAY = 4500 // ms between automatic slides
const RESUME_AFTER_TOUCH = 5000 // ms before autoplay resumes after a swipe

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50'

export default function TourPackages() {
  const destinations = DESTINATIONS
  const total = destinations.length

  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  const resumeTimer = useRef(null)

  // thumb = visible share of the track, offset = how far it has scrolled (0..1)
  const [scroll, setScroll] = useState({ thumb: 1, offset: 0 })
  const canScroll = scroll.thumb < 0.99

  const updateScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScroll({
      thumb: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      offset: max > 0 ? el.scrollLeft / max : 0,
    })
  }, [])

  const scrollByCard = useCallback((direction) => {
    const el = trackRef.current
    if (!el || !el.firstElementChild) return

    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = el.firstElementChild.getBoundingClientRect().width + gap
    const max = el.scrollWidth - el.clientWidth

    // Loop around at either end
    if (direction > 0 && el.scrollLeft >= max - 4) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (direction < 0 && el.scrollLeft <= 4) {
      el.scrollTo({ left: max, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: direction * step, behavior: 'smooth' })
    }
  }, [])

  // Track size + resize
  useEffect(() => {
    updateScroll()
    window.addEventListener('resize', updateScroll)
    return () => window.removeEventListener('resize', updateScroll)
  }, [updateScroll, total])

  // Auto slide (skipped for reduced-motion users, hidden tabs and while paused)
  useEffect(() => {
    if (total < 2) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return undefined

    const id = window.setInterval(() => {
      if (!pausedRef.current && !document.hidden) scrollByCard(1)
    }, AUTO_SLIDE_DELAY)

    return () => window.clearInterval(id)
  }, [scrollByCard, total])

  useEffect(() => () => window.clearTimeout(resumeTimer.current), [])

  const pause = () => {
    window.clearTimeout(resumeTimer.current)
    pausedRef.current = true
  }
  const resume = () => {
    window.clearTimeout(resumeTimer.current)
    pausedRef.current = false
  }
  const resumeLater = () => {
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(resume, RESUME_AFTER_TOUCH)
  }

  return (
    <section
      id="packages"
      className="relative isolate overflow-hidden bg-stone-50 py-16 sm:py-20 lg:py-28"
    >
      {/* Background image + warm veil */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none">
        <img
          src="/images/tour-packages-background1.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-amber-50/60 to-stone-50/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Heading row */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-amber-700 sm:text-4xl">
              Popular destinations
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-stone-900 text-balance sm:text-4xl lg:text-5xl">
              Explore our top tour packages
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-stone-600 sm:text-base sm:leading-8">
              Handpicked itineraries with flights, hotels and guided
              experiences. Just pack your bags and go.
            </p>
          </div>

          <a
            href="/tour-packages"
            className={`group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-amber-900/20 bg-white/70 px-6 py-3 text-sm font-semibold text-stone-900 backdrop-blur-sm transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-amber-50 ${focusRing}`}
          >
            View all packages
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Carousel */}
        <div
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resumeLater}
        >
          <ul
            ref={trackRef}
            onScroll={updateScroll}
            role="list"
            aria-roledescription="carousel"
            aria-label="Tour package destinations"
            className="-mx-5 -my-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-px-5 sm:-mx-8 sm:px-8 sm:scroll-px-8 lg:-mx-3 lg:px-3 lg:scroll-px-3"
          >
            {destinations.map((destination, index) => {
              const category = CATEGORY_STYLES[index % CATEGORY_STYLES.length]
              const CategoryIcon = category.icon
              const count = destination.packages

              return (
                <li
                  key={`${destination.name}-${index}`}
                  className="shrink-0 grow-0 basis-[78%] snap-start sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)] xl:basis-[calc(25%-0.75rem)] min-[1360px]:basis-[calc(20%-0.8rem)]"
                >
                  <a
                    href={`/tour-packages/search?city=${encodeURIComponent(destination.name)}`}
                    aria-label={`Explore ${destination.name} tour packages`}
                    className={`group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/70 bg-stone-200 shadow-[0_10px_30px_-12px_rgba(68,40,10,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-14px_rgba(68,40,10,0.45)] ${focusRing}`}
                  >
                    <img
                      src={destination.image}
                      alt={`${destination.name} travel destination`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent" />
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />

                    {/* Category badge */}
                    <span className="absolute left-3.5 top-3.5 inline-flex max-w-[calc(100%-1.75rem)] items-center gap-1.5 rounded-full border border-white/50 bg-stone-50/80 px-3 py-1.5 text-xs font-medium text-stone-800 backdrop-blur-md">
                      <CategoryIcon
                        className="size-3.5 shrink-0 text-amber-700"
                        strokeWidth={2}
                      />
                      <span className="truncate">{category.label}</span>
                    </span>

                    {/* Info */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-xl font-semibold text-amber-50 sm:text-2xl">
                          {destination.name}
                        </h3>
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-stone-200 sm:text-[13px]">
                          <MapPin
                            className="size-3.5 shrink-0 text-amber-300"
                            strokeWidth={2}
                          />
                          {count} {count === 1 ? 'package' : 'packages'}
                        </p>
                      </div>

                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-amber-200/70 bg-white/10 text-amber-50 backdrop-blur-sm transition-all duration-300 group-hover:border-amber-200 group-hover:bg-amber-200 group-hover:text-stone-900">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Progress + arrows */}
          {canScroll && (
            <div className="mt-8 flex items-center gap-5 sm:mt-10 sm:gap-8">
              <div
                aria-hidden="true"
                className="relative h-px flex-1 bg-amber-900/20"
              >
                <span
                  className="absolute -top-px h-[3px] rounded-full bg-amber-600 transition-[left,width] duration-300"
                  style={{
                    width: `${scroll.thumb * 100}%`,
                    left: `${scroll.offset * (1 - scroll.thumb) * 100}%`,
                  }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous destinations"
                  className={`flex size-11 items-center justify-center rounded-full border border-amber-900/25 bg-white/70 text-stone-800 backdrop-blur-sm transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-amber-50 sm:size-12 ${focusRing}`}
                >
                  <ChevronLeft className="size-5" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next destinations"
                  className={`flex size-11 items-center justify-center rounded-full border border-amber-900/25 bg-white/70 text-stone-800 backdrop-blur-sm transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-amber-50 sm:size-12 ${focusRing}`}
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}