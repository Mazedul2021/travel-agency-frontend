import { useState, useEffect } from 'react'
import TourHero from '@/components/tour-packages/TourHero'
import HorizontalActivityCard from '@/components/tour-packages/HorizontalActivityCard'
import VerticalActivityCard from '@/components/tour-packages/VerticalActivityCard'
import DestinationCard from '@/components/tour-packages/DestinationCard'
import CarouselSection from '@/components/tour-packages/CarouselSection'

import {
  RECENT_SEARCHES_INITIAL,
  RECOMMENDED_PARIS_TOURS,
  DESTINATIONS_SWIMLANE,
  UNFORGETTABLE_ORIGINALS,
} from '@/data/tourPackagesData'
import Breadcrumb from '@/components/common/Breadcrumb'

import { useNavigate } from 'react-router-dom'

export default function TourPackagePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  // City search state: hidden initially until user searches or picks a city
  const [searchedCity, setSearchedCity] = useState(null)

  // Clicked packages state: "Continue planning your trip" is hidden until user clicks any package
  const [plannedTours, setPlannedTours] = useState([])

  const [savedWishlistIds, setSavedWishlistIds] = useState(() => ['395320'])
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES_INITIAL)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Wishlist toggle handler
  const handleToggleWishlist = (tourId) => {
    setSavedWishlistIds((prev) =>
      prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]
    )
  }

  // Handle Search Submission: opens the new search results page exactly like the image
  const handleSearchSubmit = (cityQuery) => {
    if (!cityQuery || !cityQuery.trim()) return
    const formattedCity = cityQuery.trim()
    navigate(`/tour-packages/search?city=${encodeURIComponent(formattedCity)}`)
  }

  // When a destination card (e.g. Paris, Rome, Amsterdam) is clicked:
  const handleSelectDestination = (cityName) => {
    navigate(`/tour-packages/search?city=${encodeURIComponent(cityName)}`)
  }

  // When ANY tour package card is clicked, navigate to the detail page
  const handleTourCardClick = (tour) => {
    // Add to plannedTours if not already there, placing latest at the beginning
    setPlannedTours((prev) => {
      const exists = prev.some((t) => t.id === tour.id)
      if (exists) {
        return [tour, ...prev.filter((t) => t.id !== tour.id)]
      }
      return [tour, ...prev]
    })

    // Navigate to the detail page
    navigate(`/tour-packages/${tour.id}`)
  }

  // Clear search if user wants
  const handleClearCitySearch = () => {
    setSearchedCity(null)
    setSearchQuery('')
  }

  // Filter tours for "Based on your search in {City}"
  // If user searched Paris, show Paris tours. If another city, filter or show city activities.
  const cityFilteredTours = searchedCity
    ? RECOMMENDED_PARIS_TOURS.filter((t) => {
        const q = searchedCity.toLowerCase()
        return (
          t.city.toLowerCase().includes(q) ||
          t.context?.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q)
        )
      })
    : []

  // Fallback to Paris tours if the user searched "Paris" or generic term
  const displayedCityTours =
    cityFilteredTours.length > 0 ? cityFilteredTours : RECOMMENDED_PARIS_TOURS

  // 6 destinations for the "Things to do wherever you're going" section
  const topSixDestinations = DESTINATIONS_SWIMLANE.slice(0, 6)

  // 4 unforgettable originals from the picture
  const topFourOriginals = UNFORGETTABLE_ORIGINALS.slice(0, 4)

  return (
    <div className="min-h-screen bg-white font-sans text-[#181a1f] pb-16">
      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-4 pb-1">
        <Breadcrumb items={[{ label: 'Tour Packages' }]} />
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HERO BANNER: Centered Title & Elevated Pill Search      */}
      {/* ────────────────────────────────────────────────────────── */}
      <TourHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        recentSearches={recentSearches}
        onClearRecentSearches={() => setRecentSearches([])}
        onRemoveRecentSearch={(item) =>
          setRecentSearches((prev) => prev.filter((i) => i !== item))
        }
      />

      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 space-y-10 mt-2">
        {/* ────────────────────────────────────────────────────────── */}
        {/* 2. CONTINUE PLANNING YOUR TRIP                            */}
        {/* Appears ONLY when the user clicks any tour package card    */}
        {/* ────────────────────────────────────────────────────────── */}
        {plannedTours.length > 0 && (
          <section id="continue-planning-section" className="pt-2 animate-fade-in">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f] mb-4">
              Continue planning your trip
            </h2>
            <div className="flex flex-wrap gap-4">
              {plannedTours.map((tour) => (
                <HorizontalActivityCard
                  key={tour.id}
                  tour={tour}
                  isSaved={savedWishlistIds.includes(tour.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenDetails={handleTourCardClick}
                />
              ))}
            </div>
          </section>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 3. BASED ON YOUR SEARCH IN [CITY]                          */}
        {/* Appears ONLY when someone searches any city               */}
        {/* ────────────────────────────────────────────────────────── */}
        {searchedCity && (
          <div className="relative animate-fade-in">
            {/* Optional reset button to clear city search */}
            <div className="flex items-center justify-between mb-1">
              <span />
              <button
                type="button"
                onClick={handleClearCitySearch}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Clear filter
              </button>
            </div>

            <CarouselSection
              id="recommended-activities-0"
              title={`Based on your search in ${searchedCity}`}
            >
              {displayedCityTours.map((tour) => (
                <div
                  key={tour.id}
                  className="w-[260px] sm:w-[270px] lg:w-[280px] shrink-0"
                >
                  <VerticalActivityCard
                    tour={tour}
                    isSaved={savedWishlistIds.includes(tour.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onOpenDetails={handleTourCardClick}
                  />
                </div>
              ))}
            </CarouselSection>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 4. THINGS TO DO WHEREVER YOU'RE GOING                     */}
        {/* 6 Square cards: Rome, Paris, Amsterdam, NYC, Boston, Chicago */}
        {/* ────────────────────────────────────────────────────────── */}
        <section id="destinations-swimlane" className="py-2">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f] mb-4">
            Things to do wherever you&apos;re going
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {topSixDestinations.map((dest) => (
              <DestinationCard
                key={dest.name}
                destination={dest}
                onSelectDestination={handleSelectDestination}
              />
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 5. UNFORGETTABLE TRAVEL EXPERIENCES (ORIGINALS)           */}
        {/* 4 Cards: Göreme, Cape Sounion, Montserrat, Lisbon Food/Wine */}
        {/* ────────────────────────────────────────────────────────── */}
        <CarouselSection
          id="collection-swimlane-lazy"
          title="Unforgettable travel experiences"
        >
          {topFourOriginals.map((tour) => (
            <div
              key={tour.id}
              className="w-[260px] sm:w-[270px] lg:w-[280px] shrink-0"
            >
              <VerticalActivityCard
                tour={tour}
                isSaved={savedWishlistIds.includes(tour.id)}
                onToggleWishlist={handleToggleWishlist}
                onOpenDetails={handleTourCardClick}
              />
            </div>
          ))}
        </CarouselSection>
      </div>

    </div>
  )
}
