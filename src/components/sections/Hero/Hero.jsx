import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { HERO_SLIDES } from '@/constants'
import { useCarousel } from '@/hooks'

export default function Hero() {
  const {
    activeIndex: active,
    setActiveIndex: setActive,
    next,
    previous,
  } = useCarousel({ total: HERO_SLIDES.length, autoPlay: true, interval: 7000 })

  const slide = HERO_SLIDES[active]

  return (
    <section
      id="home"
      className="relative isolate min-h-[590px] overflow-hidden bg-slate-950 md:min-h-[650px]"
    >
      {/* Background Slides */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {HERO_SLIDES.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${index === active ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </div>

      {/* Light overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/15 via-slate-950/40 to-slate-950/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/5" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[590px] w-full max-w-7xl items-center justify-between gap-8 px-5 py-20 sm:px-8 md:min-h-[650px] lg:px-10">
        <div className="max-w-2xl text-white">
          <p className="font-script text-4xl text-white/90 sm:text-5xl">
            {slide.eyebrow}
          </p>

          <h1 className="mt-2 max-w-2xl text-4xl font-extrabold uppercase leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/90 sm:text-base">
            {slide.description}
          </p>

          <a
            href={slide.href}
            className="mt-7 inline-flex items-center gap-3 font-semibold text-white transition hover:text-sky-200"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-white/80 bg-sky-700/80 shadow-lg transition hover:scale-105">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>

            <span>Explore {slide.label}</span>
          </a>

          {/* Slide Indicators */}
          <div
            className="mt-9 flex items-center gap-2"
            aria-label="Choose hero slide"
          >
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${item.label}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={`relative z-20 h-2 rounded-full transition-all ${index === active
                  ? 'w-7 bg-white'
                  : 'w-2 bg-white/55 hover:bg-white/90'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Destination Cards */}
        <div className="hidden w-52 shrink-0 flex-col gap-3 lg:flex xl:w-56">
          {HERO_SLIDES.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${item.label} slide`}
              aria-pressed={index === active}
              className={`group relative h-28 overflow-hidden rounded-2xl border-2 shadow-xl transition ${index === active
                ? 'border-white'
                : 'border-white/50 hover:border-white'
                }`}
            >
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                aria-hidden="true"
              />

              <span className="pointer-events-none absolute bottom-3 left-3 right-2 text-left text-sm font-semibold text-white">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Slider Controls */}
      <div className="absolute bottom-6 right-6 z-30 flex gap-3 sm:bottom-8 sm:right-10">
        <button
          type="button"
          aria-label="Previous hero slide"
          onClick={previous}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-slate-950/30 text-white shadow-lg backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Next hero slide"
          onClick={next}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-slate-950/30 text-white shadow-lg backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  )
}
