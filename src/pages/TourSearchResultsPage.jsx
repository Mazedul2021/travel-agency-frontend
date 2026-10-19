import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  SlidersHorizontal,
  Calendar,
  Map as MapIcon,
  ChevronRight,
  ChevronDown,
  Info,
  X,
  Search,
  Check,
  MapPin,
  Heart,
  Star,
  Mail,
} from 'lucide-react'

import SearchResultCard from '@/components/tour-packages/SearchResultCard'
import Breadcrumb from '@/components/common/Breadcrumb'
import {
  CITY_SEARCH_RESULTS_DELHI,
  CITY_SEARCH_RESULTS_PARIS,
  EXTRA_PARIS_TOURS,
  TOP_SIGHTS_PARIS,
  GO_BEYOND_PARIS,
  TRAVEL_GUIDES_PARIS,
  RECOMMENDED_LIST_PARIS,
  PARIS_FAQS,
} from '@/data/citySearchResultsData'

export default function TourSearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const scrollChipsRef = useRef(null)
  const sightsScrollRef = useRef(null)
  const beyondScrollRef = useRef(null)

  const cityParam = searchParams.get('city') || searchParams.get('q') || 'Paris'
  const [searchInput, setSearchInput] = useState(cityParam)
  const [activeCategory, setActiveCategory] = useState('all')
  const [savedWishlistIds, setSavedWishlistIds] = useState(() => ['disneyland-paris-1day'])
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [maxPrice, setMaxPrice] = useState(250)
  const [minRating, setMinRating] = useState(4.0)

  // Show more state
  const [isExpanded, setIsExpanded] = useState(false)

  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // FAQ accordion state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [cityParam])

  // Category filter chips matching the picture
  const FILTER_PILLS = [
    'All',
    'Boat cruises',
    'Dining cruises',
    'Photoshoots',
    'For kids',
    'Food & drink',
    'Walking tours',
  ]

  // Wishlist toggle
  const handleToggleWishlist = (tourId) => {
    setSavedWishlistIds((prev) =>
      prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]
    )
  }

  // Handle new search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ city: searchInput.trim() })
    }
  }

  // Horizontal scroll helpers
  const scrollHorizontally = (ref, amount) => {
    if (ref.current) {
      ref.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  // Base list + extra tours when expanded
  const allTours = useMemo(() => {
    if (cityParam && cityParam.toLowerCase().includes('delhi')) {
      return CITY_SEARCH_RESULTS_DELHI
    }
    return isExpanded
      ? [...CITY_SEARCH_RESULTS_PARIS, ...EXTRA_PARIS_TOURS]
      : CITY_SEARCH_RESULTS_PARIS
  }, [isExpanded, cityParam])

  // Filter the tours
  const filteredTours = useMemo(() => {
    return allTours.filter((tour) => {
      if (activeCategory !== 'all' && tour.category !== activeCategory) {
        return false
      }
      if (tour.price > maxPrice) {
        return false
      }
      if (tour.rating && tour.rating < minRating) {
        return false
      }
      return true
    })
  }, [allTours, activeCategory, maxPrice, minRating])

  return (
    <div className="min-h-screen bg-white font-sans text-[#181a1f] pb-24">
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. TOP HEADER & SEARCH BAR NAVIGATION                       */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 bg-slate-50/80 sticky top-20 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-2xs focus-within:border-[#0071eb] w-full max-w-sm sm:max-w-md"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search another city or activity"
              className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none"
            />
            <button
              type="submit"
              className="text-xs font-bold text-[#0071eb] hover:text-[#005ec4] ml-2 shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Back to Overview link */}
          <button
            type="button"
            onClick={() => navigate('/tour-packages')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Back to Tour Packages</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb Navigation */}
        <div className="pb-3">
          <Breadcrumb
            items={[
              { label: 'Tour Packages', href: '/tour-packages' },
              { label: `Things to do in ${cityParam}` },
            ]}
          />
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2. TOP FILTER BAR EXACTLY MATCHING PICTURE                 */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2.5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
            {/* Filters Button */}
            <button
              type="button"
              onClick={() => setIsFiltersModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-[#181a1f] shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-700" />
              <span>Filters</span>
            </button>

            {/* Dates Button */}
            <button
              type="button"
              onClick={() => setIsDateModalOpen(true)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-[#181a1f] shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer ${
                selectedDate ? 'border-[#0071eb] text-[#0071eb]' : ''
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-slate-700" />
              <span>{selectedDate ? selectedDate : 'Dates'}</span>
            </button>

            {/* Scrollable Pills matching Picture */}
            <div
              ref={scrollChipsRef}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pl-1"
            >
              {FILTER_PILLS.map((pill) => {
                const isActive = activeCategory === (pill === 'All' ? 'all' : pill)
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setActiveCategory(pill === 'All' ? 'all' : pill)}
                    className={`inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pill}
                  </button>
                )
              })}
            </div>

            {/* Right Arrow for Pills */}
            <button
              type="button"
              onClick={() => scrollHorizontally(scrollChipsRef, 200)}
              aria-label="Scroll more categories"
              className="hidden sm:flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-2xs text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Open Map Blue Button from Picture */}
          <button
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0071eb] hover:bg-[#005ec4] active:scale-95 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Open map</span>
          </button>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 3. RESULTS COUNT SUBHEADER FROM PICTURE                   */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="py-4 flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
          <span className="font-semibold text-slate-700">
            500+ results: <span className="capitalize">{cityParam}</span>
          </span>
          <button
            type="button"
            title="Results based on verified traveler interest and customer bookings"
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 4. 4-COLUMN ACTIVITY CARDS GRID MATCHING PICTURE          */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredTours.map((tour) => (
            <SearchResultCard
              key={tour.id}
              tour={tour}
              isSaved={savedWishlistIds.includes(tour.id)}
              onToggleWishlist={handleToggleWishlist}
              onOpenDetails={(t) => navigate(`/tour-packages/${t.id}`)}
            />
          ))}
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 5. SHOW MORE BUTTON EXACTLY MATCHING PICTURE               */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="mt-8 mb-12 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full border border-[#0071eb] text-[#0071eb] font-bold text-xs sm:text-sm px-8 py-2.5 hover:bg-blue-50/70 transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 6. TOP SIGHTS IN PARIS MATCHING PICTURE                    */}
        {/* ────────────────────────────────────────────────────────── */}
        <section className="pt-2 pb-8 border-t border-slate-100">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f] mb-4">
            Top sights in {cityParam}
          </h2>

          <div className="relative group/sights">
            <div
              ref={sightsScrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
            >
              {TOP_SIGHTS_PARIS.map((sight) => (
                <div
                  key={sight.name}
                  onClick={() => setSearchParams({ city: sight.name })}
                  className="w-[180px] sm:w-[210px] shrink-0 cursor-pointer group flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={sight.image}
                      alt={sight.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-[#181a1f] group-hover:text-[#0071eb] transition-colors line-clamp-1">
                    {sight.name}
                  </h4>
                  <p className="text-[11.5px] text-slate-400">
                    {sight.activitiesCount}
                  </p>
                </div>
              ))}
            </div>

            {/* Floating Right Chevron Button from Picture */}
            <button
              type="button"
              onClick={() => scrollHorizontally(sightsScrollRef, 240)}
              aria-label="Scroll more sights"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0071eb] shadow-md hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 7. GO BEYOND PARIS MATCHING PICTURE                        */}
        {/* ────────────────────────────────────────────────────────── */}
        <section className="py-8 border-t border-slate-100">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f] mb-4">
            Go beyond {cityParam}
          </h2>

          <div className="relative group/beyond">
            <div
              ref={beyondScrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
            >
              {GO_BEYOND_PARIS.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => navigate(`/tour-packages/${tour.id}`)}
                  className="w-[260px] sm:w-[280px] shrink-0 cursor-pointer flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top left badge if any */}
                    {tour.badge && (
                      <span className="absolute top-2 left-2 z-10 rounded bg-[#181a1f] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        {tour.badge}
                      </span>
                    )}

                    {/* White circle heart button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleWishlist(tour.id)
                      }}
                      className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-xs"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          savedWishlistIds.includes(tour.id)
                            ? 'fill-rose-500 text-rose-500'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {tour.context}
                      </span>
                      <h4 className="text-[13.5px] font-bold text-[#181a1f] leading-snug line-clamp-2 group-hover:text-[#0071eb] transition-colors">
                        {tour.title}
                      </h4>
                      {tour.perk && (
                        <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                          {tour.perk}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#181a1f]">{tour.rating}</span>
                        <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                        <span className="text-[11px] text-slate-400">({tour.reviewsCount})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 mr-1">From</span>
                        <span className="text-sm font-extrabold text-[#181a1f]">${tour.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Right Chevron Button from Picture */}
            <button
              type="button"
              onClick={() => scrollHorizontally(beyondScrollRef, 280)}
              aria-label="Scroll more day trips"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0071eb] shadow-md hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 8. YOUR PARIS ITINERARY IS WAITING (BANNER)                */}
        {/* ────────────────────────────────────────────────────────── */}
        <section className="my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-sm">
            {/* Left Photo: Woman looking through telescope over Paris */}
            <div className="relative h-64 md:h-auto min-h-[220px] bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80"
                alt="View over Paris rooftops"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Sky Blue Form matching Picture */}
            <div className="bg-[#549bf7] p-6 sm:p-8 flex flex-col justify-center text-white">
              <h3 className="text-2xl sm:text-[26px] font-black leading-tight tracking-tight">
                Your Paris itinerary is waiting
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/95 leading-relaxed">
                Receive a curated 48-hour itinerary featuring the most iconic experiences in Paris, straight to your inbox.
              </p>

              {newsletterSubscribed ? (
                <div className="mt-4 p-3 rounded-xl bg-white/20 text-white text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Thank you! Your 48-hour Paris itinerary is on its way.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newsletterEmail) setNewsletterSubscribed(true)
                  }}
                  className="mt-4 flex items-center rounded-full bg-white pl-4 pr-1.5 py-1.5 shadow-sm max-w-md"
                >
                  <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#0071eb] hover:bg-[#005ec4] active:scale-95 px-5 py-2 text-xs font-bold text-white shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    Sign up
                  </button>
                </form>
              )}
            </div>
          </div>
          {/* Disclaimer beneath banner card matching picture */}
          <p className="mt-2.5 text-[11px] text-slate-500 leading-normal">
            By signing up, you agree to receive promotional emails on activities and insider tips. You can unsubscribe or withdraw your consent at any time with future effect. For more information, read our <span className="underline cursor-pointer hover:text-slate-700">Privacy Statement</span>.
          </p>
        </section>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 9. ESSENTIAL PARIS TRAVEL GUIDES MATCHING PICTURE          */}
        {/* ────────────────────────────────────────────────────────── */}
        <section className="py-8 border-t border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f]">
              Essential Paris travel guides
            </h2>
            <button
              type="button"
              className="rounded-full border border-[#0071eb] text-[#0071eb] font-bold text-xs px-4 py-1.5 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Explore all
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Large Featured Article from Picture */}
            <div className="lg:col-span-6 flex flex-col group cursor-pointer">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={TRAVEL_GUIDES_PARIS.featured.image}
                  alt={TRAVEL_GUIDES_PARIS.featured.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#181a1f] group-hover:text-[#0071eb] transition-colors leading-snug">
                {TRAVEL_GUIDES_PARIS.featured.title}
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-4">
                {TRAVEL_GUIDES_PARIS.featured.excerpt}
              </p>
              <span className="mt-2 text-[11px] text-slate-400">
                {TRAVEL_GUIDES_PARIS.featured.author} • {TRAVEL_GUIDES_PARIS.featured.date}
              </span>
            </div>

            {/* Right 4 Compact Article Rows from Picture */}
            <div className="lg:col-span-6 flex flex-col justify-between divide-y divide-slate-100">
              {TRAVEL_GUIDES_PARIS.articles.map((art) => (
                <div
                  key={art.id}
                  className="py-3 first:pt-0 last:pb-0 flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] sm:text-sm font-bold text-[#181a1f] leading-snug line-clamp-2 group-hover:text-[#0071eb] transition-colors">
                      {art.title}
                    </h4>
                    <p className="mt-1 text-[11.5px] text-slate-500 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                    <span className="mt-1 block text-[10.5px] text-slate-400">
                      {art.author} • {art.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 10. OUR MOST RECOMMENDED THINGS TO DO IN PARIS             */}
        {/* 2-Column Grid (10 items total) matching Picture            */}
        {/* ────────────────────────────────────────────────────────── */}
        <section className="py-8 border-t border-slate-100">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f] mb-5">
            Our most recommended things to do in {cityParam}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {RECOMMENDED_LIST_PARIS.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="h-20 w-24 sm:h-22 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[13.5px] font-bold text-[#181a1f] leading-snug line-clamp-2 group-hover:text-[#0071eb] transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[11.5px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTour({
                          id: item.id,
                          title: item.title,
                          image: item.image,
                          context: `${cityParam.toUpperCase()} • TOP RECOMMENDATION`,
                          price: 49,
                          rating: 4.7,
                          reviewsCount: '8,420',
                          category: 'Recommended',
                          highlights: [item.description],
                          included: ['Entry ticket & audio companion', 'Instant digital voucher'],
                        })
                        setIsModalOpen(true)
                      }}
                      className="text-[11px] font-bold text-[#0071eb] hover:underline cursor-pointer"
                    >
                      See more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 11. FREQUENTLY ASKED QUESTIONS ABOUT PARIS                 */}
        {/* ────────────────────────────────────────────────────────── */}
        <section className="py-8 border-t border-slate-100">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f] mb-5">
            Frequently asked questions about {cityParam}
          </h2>

          <div className="divide-y divide-slate-100 border-y border-slate-100">
            {PARIS_FAQS.map((faq, index) => {
              const isFaqOpen = expandedFaqIndex === index
              return (
                <div key={index} className="py-3.5">
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(isFaqOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left text-sm font-bold text-[#181a1f] hover:text-[#0071eb] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isFaqOpen ? 'rotate-180 text-[#0071eb]' : ''
                      }`}
                    />
                  </button>
                  {isFaqOpen && (
                    <p className="mt-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed animate-fade-in pr-4">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 12. INTERACTIVE MAP MODAL ("Open map" button)              */}
      {/* ────────────────────────────────────────────────────────── */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-5xl h-[82vh] rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <MapIcon className="w-4 h-4 text-[#0071eb]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Interactive Map: Attractions in {cityParam}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-[#e5e3df] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                alt="Map Background"
                className="w-full h-full object-cover opacity-60"
              />

              <div
                onClick={() => {
                  setSelectedTour(filteredTours[0])
                  setIsModalOpen(true)
                }}
                className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-3 h-3 text-[#ff5533]" />
                  <span>Eiffel Tower • $44</span>
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectedTour(filteredTours[6] || filteredTours[0])
                  setIsModalOpen(true)
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="flex items-center gap-1 rounded-full bg-[#0071eb] px-2.5 py-1 text-[11px] font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-3 h-3 text-white" />
                  <span>Louvre Museum • $73</span>
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectedTour(filteredTours[0])
                  setIsModalOpen(true)
                }}
                className="absolute top-3/5 left-1/3 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="flex items-center gap-1 rounded-full bg-[#d92228] px-2.5 py-1 text-[11px] font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-3 h-3 text-white" />
                  <span>Seine Cruise • $19</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-xl flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">
                  Click any marker above to view activity details and book.
                </span>
                <button
                  type="button"
                  onClick={() => setIsMapOpen(false)}
                  className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold cursor-pointer"
                >
                  Close Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 13. FILTER MODAL ("Filters" button)                        */}
      {/* ────────────────────────────────────────────────────────── */}
      {isFiltersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Filter Activities</h3>
              <button
                type="button"
                onClick={() => setIsFiltersModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Maximum Price</span>
                <span className="text-[#0071eb]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="15"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#0071eb]"
              />
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 mb-2">
                Minimum Rating
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[4.0, 4.3, 4.5, 4.7].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      minRating === r
                        ? 'bg-[#0071eb] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    ★ {r}+
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setMaxPrice(250)
                  setMinRating(4.0)
                  setActiveCategory('all')
                }}
                className="flex-1 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => setIsFiltersModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-900 text-xs font-bold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 14. DATE PICKER MODAL ("Dates" button)                     */}
      {/* ────────────────────────────────────────────────────────── */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Select Travel Date</h3>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0071eb]"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDate('')
                  setIsDateModalOpen(false)
                }}
                className="flex-1 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Clear Date
              </button>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-[#0071eb] text-xs font-bold text-white hover:bg-[#005ec4] cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
