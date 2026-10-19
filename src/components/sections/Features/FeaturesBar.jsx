import {
  Briefcase,
  Globe2,
  Headset,
  Route,
  ShieldCheck,
  Stamp,
} from 'lucide-react'
import { FEATURES } from '@/constants'

/*
  Brand colors taken from the ABL Travels logo:
  blue   #0d81f0 (dark #0a5ec0)
  orange #ff9a00
  navy   #0b2a4a (text)
*/
const ICONS = { Stamp, ShieldCheck, Globe2, Route, Briefcase, Headset }

export default function FeaturesBar() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-10 rounded-3xl border border-[#0b2a4a]/10 bg-[#f5f9fe] px-4 py-9 shadow-[0_20px_44px_-28px_rgba(11,42,74,0.35)] sm:px-8 sm:py-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-0 lg:divide-x lg:divide-[#0b2a4a]/10"
        >
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon]

            return (
              <li
                key={f.title}
                className="group flex flex-col items-center gap-4 text-center lg:px-4"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-white text-[#0a5ec0] shadow-[0_8px_20px_-8px_rgba(13,129,240,0.45)] ring-1 ring-[#0d81f0]/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-[#0d81f0] group-hover:to-[#0a5ec0] group-hover:text-white group-hover:ring-transparent motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  {Icon && (
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  )}
                </span>

                <div>
                  <p className="text-sm font-semibold leading-snug text-[#0b2a4a] sm:text-[15px]">
                    {f.title}
                  </p>

                  {/* Small orange line grows in on hover */}
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-2 block h-[2px] w-0 rounded-full bg-[#ff9a00] transition-all duration-300 group-hover:w-8 motion-reduce:transition-none"
                  />

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                    {f.sub}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}