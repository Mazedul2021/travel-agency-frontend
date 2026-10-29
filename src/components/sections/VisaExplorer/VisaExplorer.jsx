import { useMemo, useState, useEffect } from 'react'
import { Activity, ArrowRight } from 'lucide-react'
import { DEFAULT_VISA_COUNTRY, buildCountryList, getVisaContent } from '@/constants'
import { useCountries, useVisaSelection } from '@/hooks'
import CountrySidebar from './CountrySidebar'
import FeeCard from './FeeCard'
import OnRequestPanel from './OnRequestPanel'
import ProcessingDetails from './ProcessingDetails'
import RequirementsCard from './RequirementsCard'
import VisaHero from './VisaHero'
import VisaTypeTabs from './VisaTypeTabs'
import VisaApplyModal from './VisaApplyModal'
import { VisaTrackModal } from '@/components/visa-status'

export default function VisaExplorer() {
  const { countries, status } = useCountries()
  const { code, typeId, selectCountry, selectType } = useVisaSelection()
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false)

  // Allow URL hash or search param to open track modal directly (e.g. /visa#track)
  useEffect(() => {
    if (
      window.location.hash === '#track' ||
      window.location.hash === '#visa-status' ||
      new URLSearchParams(window.location.search).get('track') === 'true'
    ) {
      setIsTrackModalOpen(true)
    }
  }, [])

  const countryList = useMemo(() => buildCountryList(countries), [countries])

  const country =
    countryList.find((item) => item.code === code) ??
    countryList.find((item) => item.code === DEFAULT_VISA_COUNTRY) ??
    countryList[0]

  const content = getVisaContent(country.code)
  const type = content?.visaTypes.find((item) => item.id === typeId) ?? content?.visaTypes[0] ?? null
  const details = type?.details ?? null

  return (
    <section id="visa" className="scroll-mt-20 bg-tint py-8 sm:py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* LIVE VISA STATUS ACTION BANNER (ABOVE ALL COUNTRIES & CHINA VISA BANNER) */}
        {/* ======================================================== */}
        <div className="mb-6 sm:mb-8 overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-900/40 bg-gradient-to-r from-[#071933] via-[#0b2a4a] to-[#0c3966] p-4.5 sm:p-5 md:px-7 md:py-5 shadow-[0_12px_32px_-10px_rgba(11,42,74,0.35)] text-white">
          <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
            {/* Left side: Live indicator + title + subtitle */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="relative mt-0.5 flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-amber-400 shadow-inner">
                <Activity className="size-5 sm:size-6 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex size-3 rounded-full bg-emerald-500 border-2 border-[#0b2a4a]" />
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live Visa Tracking
                  </span>
                  <span className="hidden text-xs text-white/40 sm:inline">•</span>
                  <span className="text-xs font-medium text-white/80">
                    Real-time embassy & passport updates
                  </span>
                </div>

                <h3 className="mt-1 text-base sm:text-lg md:text-xl font-bold tracking-tight text-white">
                  Track Your Visa Application In Real-Time
                </h3>
                <p className="mt-0.5 text-xs sm:text-[13px] text-white/70 max-w-2xl leading-relaxed">
                  Already submitted your documents? Enter your passport number to check submission status, embassy verification, and passport delivery readiness.
                </p>
              </div>
            </div>

            {/* Right side: Live Visa Status Button */}
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                id="btn-live-visa-status"
                onClick={() => setIsTrackModalOpen(true)}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff9a00] via-[#ffaa2b] to-[#ff9a00] bg-[length:200%_auto] hover:bg-right px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-[#061a33] shadow-lg shadow-[#ff9a00]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ff9a00]/45 active:scale-95 cursor-pointer"
              >
                <Activity className="size-4 text-[#061a33] animate-pulse" />
                <span>Live Visa Status</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <CountrySidebar
            countries={countryList}
            activeCode={country.code}
            status={status}
            onSelect={selectCountry}
          />

          <div className="min-w-0 space-y-6">
            <VisaHero country={country} content={content} type={type} />

            {content && (
              <VisaTypeTabs types={content.visaTypes} activeId={type.id} onSelect={selectType} />
            )}

            <div
              role={content ? 'tabpanel' : undefined}
              id="visa-panel"
              aria-labelledby={type ? `visa-tab-${type.id}` : undefined}
            >
              {details ? (
                <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                  <RequirementsCard countryName={country.name} type={type} />
                  <div className="order-first space-y-6 xl:order-none">
                    <FeeCard
                      countryName={country.name}
                      type={type}
                      onApply={() => setIsApplyModalOpen(true)}
                    />
                    <ProcessingDetails facts={details.facts} />
                  </div>
                </div>
              ) : (
                <OnRequestPanel
                  subject={type ? `${country.name} ${type.label}` : `${country.name} visa`}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visa Application Popup Modal */}
      <VisaApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        country={country}
        type={type}
        content={content}
      />

      {/* Live Visa Status Tracking Popup Modal */}
      <VisaTrackModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />
    </section>
  )
}
