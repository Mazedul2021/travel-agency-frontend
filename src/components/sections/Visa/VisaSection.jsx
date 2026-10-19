import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { VISA_POINTS } from '@/constants'

/*
  Brand colors taken from the ABL Travels logo:
  blue   #0d81f0 (dark #0a5ec0)
  orange #ff9a00 (dark #b45f00 for small text)
  navy   #0b2a4a (text) / #061a33 (text on orange)
*/
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d81f0] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

export default function VisaSection() {
  return (
    <section
      id="china-visa"
      aria-labelledby="china-visa-title"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/china-visa-background.webp')",
        }}
        aria-hidden="true"
      />

      {/* Veil: keeps the text readable, leaves the scenery visible in the middle */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/75 via-white/55 to-white/70 lg:bg-gradient-to-r lg:from-white/85 lg:via-white/25 lg:to-white/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-0 lg:px-8">
        {/* Left: text */}
        <div className="lg:col-span-4">
          <p className="font-script text-3xl text-[#b45f00] sm:text-4xl">
            Our speciality
          </p>

          <h2
            id="china-visa-title"
            className="mt-2 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#0b2a4a] text-balance sm:text-5xl"
          >
            China visa
            <br className="hidden sm:block" /> made simple
          </h2>

          <span
            aria-hidden="true"
            className="mt-5 block h-[3px] w-16 rounded-full bg-gradient-to-r from-[#ff9a00] to-[#0d81f0]"
          />

          <p className="mt-5 max-w-md text-base leading-8 text-[#29445f]">
            Fast, reliable and hassle-free processing with expert guidance at
            every step.
          </p>

          <a
            href="/visa#visa/cn/tourist"
            className={`group mt-8 inline-flex items-center gap-3 rounded-full bg-[#ff9a00] px-7 py-4 text-[15px] font-semibold text-[#061a33] shadow-lg shadow-[#ff9a00]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffab2e] hover:shadow-xl hover:shadow-[#ff9a00]/40 active:scale-[0.98] ${focusRing}`}
          >
            Apply for China visa
            <ArrowRight
              className="size-[18px] transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </a>
        </div>

        {/* Center: left empty so the background scenery shows */}
        <div className="hidden lg:col-span-4 lg:block" aria-hidden="true" />

        {/* Right: why choose us */}
        <div className="lg:col-span-4 lg:translate-x-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_24px_50px_-20px_rgba(11,42,74,0.4)] backdrop-blur-md sm:p-8">
            {/* Brand line, same blue to orange as the header */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0d81f0] via-[#0d81f0] to-[#ff9a00]"
            />

            <h3 className="font-serif text-xl font-semibold leading-snug text-[#0b2a4a]">
              Why choose us for your China visa?
            </h3>

            <ul className="mt-5 divide-y divide-[#0b2a4a]/10">
              {VISA_POINTS.map((point) => (
                <li
                  key={point.title}
                  className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-[#0d81f0]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-[#0b2a4a]">
                      {point.title}
                    </p>

                    {point.sub && (
                      <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
                        {point.sub}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}