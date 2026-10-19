import { useMemo, useState } from 'react'
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

export default function VisaExplorer() {
  const { countries, status } = useCountries()
  const { code, typeId, selectCountry, selectType } = useVisaSelection()
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  const countryList = useMemo(() => buildCountryList(countries), [countries])

  const country =
    countryList.find((item) => item.code === code) ??
    countryList.find((item) => item.code === DEFAULT_VISA_COUNTRY) ??
    countryList[0]

  const content = getVisaContent(country.code)
  const type = content?.visaTypes.find((item) => item.id === typeId) ?? content?.visaTypes[0] ?? null
  const details = type?.details ?? null

  return (
    <section id="visa" className="scroll-mt-20 bg-tint py-10 sm:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
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
    </section>
  )
}
