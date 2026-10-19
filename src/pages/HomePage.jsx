import {
  FeaturesBar,
  Hero,
  SearchWidget,
  ServicesSection,
  TourPackages,
  VisaSection,
  TrustedWorldwide,
} from '@/components/sections'

/**
 * HomePage View
 * Orchestrates main landing page sections
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <SearchWidget />
      <FeaturesBar />
      <VisaSection />
      <TrustedWorldwide />
      <TourPackages />
      <ServicesSection />
    </main>
  )
}
