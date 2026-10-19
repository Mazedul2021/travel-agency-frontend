import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Heart,
  Share2,
  Star,
  Clock,
  CalendarCheck,
  CreditCard,
  Zap,
  Flag,
  Bus,
  Accessibility,
  Users,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Map as MapIcon,
  MapPin,
  Printer,
} from 'lucide-react'

import Breadcrumb from '@/components/common/Breadcrumb'
import { DELHI_TOUR_DATA } from '@/data/delhiTourData'
import CustomTourBuilderModal from '@/components/tour-packages/CustomTourBuilderModal'

export default function TourDetailPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const tour = DELHI_TOUR_DATA

  // State
  const [isSaved, setIsSaved] = useState(false)
  const [showShareToast, setShowShareToast] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('opt-all-inclusive')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [selectedTime, setSelectedTime] = useState('09:00 AM')
  const [adults, setAdults] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  })
  const [minDate] = useState(() => new Date().toISOString().split('T')[0])
  const [isDescExpanded, setIsDescExpanded] = useState(false)
  const [selectedItineraryStop, setSelectedItineraryStop] = useState(null)
  const [isItineraryExpanded, setIsItineraryExpanded] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingRef, setBookingRef] = useState('DEL-849201')
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showCustomTourModal, setShowCustomTourModal] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Sticky subnav visibility tracking
  const [isStickyNavVisible, setIsStickyNavVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const bottom = heroRef.current.getBoundingClientRect().bottom
        setIsStickyNavVisible(bottom < 80)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard controls for Gallery Lightbox
  useEffect(() => {
    if (!isGalleryOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsGalleryOpen(false)
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % tour.gallery.length)
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGalleryOpen, tour.gallery.length])

  // Pricing calculations
  const activeOptionObj =
    tour.options.find((o) => o.id === selectedOption) || tour.options[0]
  const adultPrice = activeOptionObj.price
  const childPrice = Math.round(activeOptionObj.price * 0.65)
  const totalPrice = adults * adultPrice + childrenCount * childPrice

  // Handle Share
  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.shortDescription,
          url,
        })
        return
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(url)
    setShowShareToast(true)
    setTimeout(() => setShowShareToast(false), 3000)
  }

  // Handle Booking
  const handleBookNow = () => {
    setBookingRef(`DEL-${Math.floor(100000 + Math.random() * 900000)}`)
    setShowBookingModal(true)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. TOP BREADCRUMB & HEADER SECTION                          */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: 'Tour Packages', href: '/tour-packages' },
              { label: 'India', href: '/tour-packages/search?city=India' },
              { label: 'Delhi', href: '/tour-packages/search?city=Delhi' },
              { label: tour.shortTitle },
            ]}
          />
        </div>
      </div>

      {/* Floating Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Tour link copied to clipboard!</span>
        </div>
      )}

      {/* Sticky Secondary Nav Bar (appears when scrolled past hero) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${
          isStickyNavVisible
            ? 'translate-y-0 opacity-100 shadow-md'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 text-xs sm:text-sm font-semibold text-slate-600">
            <a
              href="#overview"
              className="hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              Overview
            </a>
            <a
              href="#key-details"
              className="hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              Key details
            </a>
            <a
              href="#itinerary"
              className="hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              Itinerary
            </a>
            <a
              href="#highlights"
              className="hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              Highlights
            </a>
            <a
              href="#inclusions"
              className="hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              Includes
            </a>
            <a
              href="#reviews"
              className="hover:text-blue-600 whitespace-nowrap transition-colors"
            >
              Reviews ({tour.reviewsCount})
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:block text-right">
              <span className="text-[11px] text-slate-500 block leading-none">From</span>
              <span className="text-base font-extrabold text-slate-900">${tour.price}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('booking-section')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-full bg-blue-600 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Check availability
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-6" ref={heroRef}>
        {/* Title & Metadata Top Row */}
        <div className="flex flex-col gap-3 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#1a2b4c] px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {tour.badge}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-600">
              Activity provider: <span className="font-semibold text-slate-800">{tour.provider}</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {tour.title}
            </h1>

            {/* Quick Actions (Wishlist & Share) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSaved
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Add to wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Share activity"
              >
                <Share2 className="w-4 h-4 text-slate-600" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Rating & Review summary snippet */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-slate-900 font-extrabold">{tour.rating}</span>
            </div>
            <span className="text-slate-300">•</span>
            <a
              href="#reviews"
              className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
            >
              {tour.reviewsCount} reviews
            </a>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">{tour.city}, India</span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2. MEDIA GALLERY (QUAD HERO MATCHING GETYOURGUIDE)         */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[340px] sm:h-[420px] md:h-[460px]">
            {/* Main Hero Image (Left 50%) */}
            <div
              onClick={() => {
                setActivePhotoIndex(0)
                setIsGalleryOpen(true)
              }}
              className="relative h-full w-full overflow-hidden cursor-pointer group"
            >
              <img
                src={tour.gallery[0].url}
                alt={tour.gallery[0].alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 group-hover:opacity-75 transition-opacity" />
              <div className="absolute bottom-4 left-4 z-10 text-white drop-shadow-md">
                <span className="inline-block rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-amber-300">
                  Featured Landmark
                </span>
                <p className="mt-1 text-sm font-semibold text-white/90">
                  {tour.gallery[0].title}
                </p>
              </div>
            </div>

            {/* Right 2x2 Grid (4 Images) */}
            <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-full">
              {tour.gallery.slice(1, 5).map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => {
                    setActivePhotoIndex(idx + 1)
                    setIsGalleryOpen(true)
                  }}
                  className="relative h-full w-full overflow-hidden cursor-pointer group"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* View All Photos Button Overlay */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs sm:text-sm font-bold text-slate-800 shadow-xl backdrop-blur-md hover:bg-white active:scale-95 transition-all cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <span>View all photos ({tour.gallery.length})</span>
          </button>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 3. MAIN CONTENT (2 COLUMNS: DETAILS + BOOKING CARD)        */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" id="overview">
          {/* LEFT COLUMN: TOUR DETAILS (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Short Narrative Overview */}
            <div className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              <p>{tour.shortDescription}</p>
            </div>

            {/* Travelers' Favorite Award Banner */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-rose-50/60 via-amber-50/40 to-white p-4 sm:p-5 flex items-center gap-4 shadow-2xs">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-sm shrink-0">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:divide-x sm:divide-slate-300 gap-1 sm:gap-3">
                <span className="text-sm font-bold text-slate-900">
                  {tour.travelerFavorite.title}
                </span>
                <span className="sm:pl-3 text-xs sm:text-sm text-slate-600 font-medium">
                  {tour.travelerFavorite.subtitle}
                </span>
              </div>
            </div>

            {/* Key Details Grid */}
            <div id="key-details" className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Key details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.keyDetails.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-2xs shrink-0 border border-slate-100">
                      {item.id === 'cancellation' && <CalendarCheck className="w-5 h-5" />}
                      {item.id === 'reserve' && <CreditCard className="w-5 h-5" />}
                      {item.id === 'duration' && <Clock className="w-5 h-5" />}
                      {item.id === 'skip' && <Zap className="w-5 h-5" />}
                      {item.id === 'guide' && <Flag className="w-5 h-5" />}
                      {item.id === 'pickup' && <Bus className="w-5 h-5" />}
                      {item.id === 'wheelchair' && <Accessibility className="w-5 h-5" />}
                      {item.id === 'group' && <Users className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-0.5 text-xs text-slate-500 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* What Travelers Loved (Highlighted Reviews block) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    What travelers loved
                  </h2>
                  <div
                    className="group relative cursor-pointer text-slate-400 hover:text-slate-600"
                    title="Real verified travelers who booked this private Delhi tour"
                  >
                    <Info className="w-4 h-4" />
                  </div>
                </div>

                <a
                  href="#reviews"
                  className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
                >
                  See all {tour.reviewsCount} reviews
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.reviews.slice(0, 2).map((rev) => (
                  <div
                    key={rev.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-sm transition-shadow"
                  >
                    <div>
                      {/* Star rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-sm text-slate-700 italic leading-relaxed">
                        “{rev.text}”
                      </p>
                    </div>

                    {/* Author & Verification */}
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white font-bold text-sm shrink-0"
                        style={{ backgroundColor: rev.avatarBg }}
                      >
                        {rev.initial}
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">
                          {rev.author} — {rev.country}
                        </span>
                        <span className="text-slate-500">Verified traveler</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* ────────────────────────────────────────────────────────── */}
            {/* ITINERARY (GetYourGuide Style Vertical Timeline - No Map)  */}
            {/* ────────────────────────────────────────────────────────── */}
            <div id="itinerary" className="scroll-mt-24">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Itinerary
                </h2>
              </div>

              <p className="text-sm text-slate-600 mb-6">
                Discover Delhi's greatest Mughal monuments, British ceremonial avenues, and sacred worship places in one seamless day.
              </p>

              {/* GYG Timeline List */}
              {isItineraryExpanded && (
                <div className="itinerary-timeline-container">
                  <ul className="activity-itinerary-timeline space-y-0">
                    {tour.itinerary.map((stop, index) => {
                      const isStart = stop.type === 'start'
                      const isEnd = stop.type === 'end'
                      const isLast = index === tour.itinerary.length - 1

                      return (
                        <li key={stop.id} className="relative flex items-stretch gap-4 group">
                          {/* Left Column: Timeline Icon + Orange Dotted Vertical Line */}
                          <div className="flex flex-col items-center shrink-0 w-8">
                            {/* Marker Icon */}
                            <div className="relative z-10 flex items-center justify-center my-0.5">
                              {isStart ? (
                                /* Starting location icon: Red outlined ring with red dot (GYG start marker) */
                                <div className="w-7 h-7 rounded-full bg-white border-2 border-[#d9383a] flex items-center justify-center shadow-xs">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#d9383a]" />
                                </div>
                              ) : isEnd ? (
                                /* End / Drop-off location icon: Red pin marker */
                                <div className="w-7 h-7 rounded-full bg-[#d9383a] flex items-center justify-center text-white shadow-xs">
                                  <MapPin className="w-3.5 h-3.5 fill-white" />
                                </div>
                              ) : (
                                /* Main Stop: Dark Midnight Navy location pin */
                                <div className="w-7 h-7 rounded-full bg-[#1a2b49] flex items-center justify-center text-white shadow-xs">
                                  <MapPin className="w-3.5 h-3.5 fill-white" />
                                </div>
                              )}
                            </div>

                            {/* Connecting Orange Dotted Line (not after the final item) */}
                            {!isLast && (
                              <div
                                className="w-0 flex-1 my-1 border-l-2 border-dotted border-[#ff5533]"
                                style={{ minHeight: '38px' }}
                              />
                            )}
                          </div>

                          {/* Right Column: Stop Details */}
                          <div className={`flex-1 min-w-0 ${isLast ? 'pb-2' : 'pb-6'}`}>
                            {/* Primary title */}
                            <h3 className="text-sm font-bold text-slate-900 leading-tight">
                              {isStart ? (
                                <>
                                  <span className="text-slate-900 font-bold">Starting location: </span>
                                  <span className="font-normal text-slate-700">{stop.title.replace(/^Pickup location:\s*/i, '')}</span>
                                </>
                              ) : isEnd ? (
                                <>
                                  <span className="text-slate-900 font-bold">Drop-off location: </span>
                                  <span className="font-normal text-slate-700">{stop.title.replace(/^Arrive back at:\s*/i, '')}</span>
                                </>
                              ) : (
                                stop.title
                              )}
                            </h3>

                            {/* Secondary info / subtitle */}
                            <div className="mt-1">
                              {isStart || isEnd ? (
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  {stop.description}
                                </p>
                              ) : (
                                <p className="text-xs text-slate-500">
                                  {stop.duration ? stop.duration.replace(/\s*\([^)]*\)/, '') : (stop.badge || 'Guided tour')}
                                </p>
                              )}
                            </div>

                            {/* Optional Sub-items (GYG nested timeline branch) */}
                            {stop.subitem && (
                              <div className="mt-3.5 pl-2 relative border-l-2 border-dotted border-slate-300 space-y-3">
                                <div className="relative flex items-start gap-3">
                                  {/* Sub-item circular outline icon */}
                                  <div className="shrink-0 -ml-[13px] mt-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-400 bg-white" />
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                                      {stop.subitem.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {stop.subitem.duration ? stop.subitem.duration.replace(/\s*\([^)]*\)/, '') : 'Visit'}
                                    </p>
                                    <span className="inline-block mt-0.5 text-[11px] text-slate-400 font-medium">
                                      {stop.subitem.meta || 'Optional'}
                                    </span>
                                  </div>
                                </div>

                                {stop.subitem.description && (
                                  <p className="text-xs text-slate-500 pl-4 italic">
                                    {stop.subitem.description}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Bottom Toggle Button (GYG style "Hide itinerary" / "Show itinerary") */}
              <div className="pt-2 pb-1">
                <button
                  type="button"
                  onClick={() => setIsItineraryExpanded(!isItineraryExpanded)}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span>{isItineraryExpanded ? 'Hide itinerary' : 'Show full itinerary'}</span>
                  {isItineraryExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Disclaimer */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>For reference only. Itineraries are subject to change.</span>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* ────────────────────────────────────────────────────────── */}
            {/* HIGHLIGHTS                                                */}
            {/* ────────────────────────────────────────────────────────── */}
            <div id="highlights" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Highlights
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
                        </div>
                        <span className="text-sm sm:text-base text-slate-800 leading-normal">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* ────────────────────────────────────────────────────────── */}
            {/* FULL DESCRIPTION                                          */}
            {/* ────────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Full description
                </h2>
              </div>
              <div className="md:col-span-9">
                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {tour.fullDescription
                    .slice(0, isDescExpanded ? tour.fullDescription.length : 2)
                    .map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}

                  {/* See more toggle */}
                  <button
                    type="button"
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer text-sm pt-2"
                  >
                    <span>{isDescExpanded ? 'See less' : 'See more'}</span>
                    {isDescExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* ────────────────────────────────────────────────────────── */}
            {/* INCLUDES & EXCLUDES                                        */}
            {/* ────────────────────────────────────────────────────────── */}
            <div id="inclusions" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Includes
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-6">
                  {/* Included list */}
                  <div className="space-y-2.5">
                    {tour.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Excluded list */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Not Included
                    </h3>
                    {tour.exclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* ────────────────────────────────────────────────────────── */}
            {/* IMPORTANT INFORMATION (BEFORE YOU GO)                      */}
            {/* ────────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Important info
                </h2>
              </div>
              <div className="md:col-span-9 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">What to bring:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tour.whatToBring.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-900 leading-relaxed">
                  <strong className="block mb-1 font-bold text-amber-950">
                    Know before you go:
                  </strong>
                  Shoes must be removed before entering temples and mosques (shoe check facilities or clean socks are recommended). Shoulders and knees must be respectfully covered.
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-slate-200" />

            {/* ────────────────────────────────────────────────────────── */}
            {/* REVIEWS & RATINGS COMPREHENSIVE BREAKDOWN                  */}
            {/* ────────────────────────────────────────────────────────── */}
            <div id="reviews" className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                Customer reviews
              </h2>

              {/* Rating Summary Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col sm:flex-row items-center gap-8 mb-8">
                <div className="text-center sm:text-left shrink-0">
                  <div className="text-5xl font-black text-slate-900">4.9</div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    Based on {tour.reviewsCount} verified reviews
                  </span>
                </div>

                {/* Star breakdown progress bars */}
                <div className="flex-1 w-full space-y-2">
                  {[
                    { stars: 5, pct: 92 },
                    { stars: 4, pct: 6 },
                    { stars: 3, pct: 1 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 0 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-slate-600 font-bold">
                        {row.stars} stars
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-slate-400">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {(showAllReviews ? tour.reviews : tour.reviews.slice(0, 3)).map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-white font-extrabold text-sm shrink-0"
                          style={{ backgroundColor: rev.avatarBg }}
                        >
                          {rev.initial}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {rev.author}
                          </h4>
                          <span className="text-xs text-slate-500">
                            {rev.country} • {rev.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                      {rev.text}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified booking</span>
                    </div>
                  </div>
                ))}

                {tour.reviews.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {showAllReviews ? 'Show fewer reviews' : `Show all reviews`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: STICKY BOOKING CARD                          */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 sticky top-24" id="booking-section">
            <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl overflow-hidden">

              {/* ── "Likely to sell out" Badge Header ── */}
              <div className="bg-[#1a2b4c] px-5 py-2.5 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                  Likely to sell out
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-4">

                {/* ── Price Row ── */}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-0.5">
                      From
                    </span>
                    <div className="flex items-baseline gap-2">
                      <del className="text-sm font-semibold text-slate-400">
                        ${activeOptionObj.originalPrice}
                      </del>
                      <ins className="no-underline text-3xl font-black text-[#d92228]">
                        ${activeOptionObj.price}
                      </ins>
                      <span className="text-[11px] text-slate-500 font-medium">per person</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end font-bold text-slate-900 text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                    <span className="text-[11px] text-slate-400">2,450 reviews</span>
                  </div>
                </div>

                {/* ── Pickers ── */}
                <div className="space-y-2.5">

                  {/* People Picker */}
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 hover:border-slate-300 transition-colors">
                    <Users className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Participants</span>
                        <span className="text-xs font-bold text-slate-800">
                          Adult × {adults}{childrenCount > 0 ? `, Child × ${childrenCount}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Adults */}
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => setAdults((p) => Math.max(1, p - 1))} disabled={adults <= 1}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 text-sm font-bold cursor-pointer">−</button>
                          <span className="w-4 text-center text-xs font-bold text-slate-800">{adults}</span>
                          <button type="button" onClick={() => setAdults((p) => p + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-sm font-bold cursor-pointer">+</button>
                        </div>
                        <div className="w-px h-4 bg-slate-200" />
                        {/* Children */}
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => setChildrenCount((p) => Math.max(0, p - 1))} disabled={childrenCount <= 0}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 text-sm font-bold cursor-pointer">−</button>
                          <span className="w-4 text-center text-xs font-bold text-slate-500">{childrenCount}</span>
                          <button type="button" onClick={() => setChildrenCount((p) => p + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-sm font-bold cursor-pointer">+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 hover:border-slate-300 transition-colors">
                    <CalendarCheck className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Select date</span>
                      <input
                        type="date"
                        value={selectedDate}
                        min={minDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Language Picker */}
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 hover:border-slate-300 transition-colors">
                    <Flag className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Language</span>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                      >
                        {tour.guideLanguages.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Starting Time */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-0.5">Starting time</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['08:00 AM', '09:00 AM', '10:00 AM'].map((time) => (
                        <button key={time} type="button" onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border py-2 text-xs font-bold transition-all cursor-pointer ${
                            selectedTime === time
                              ? 'border-[#1a2b4c] bg-[#1a2b4c] text-white shadow-sm'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >{time}</button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Price Summary ── */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>{adults} {adults === 1 ? 'Adult' : 'Adults'} × ${adultPrice}</span>
                    <span className="font-semibold text-slate-900">${adults * adultPrice}</span>
                  </div>
                  {childrenCount > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>{childrenCount} {childrenCount === 1 ? 'Child' : 'Children'} × ${childPrice}</span>
                      <span className="font-semibold text-slate-900">${childrenCount * childPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Hotel / Airport Pickup</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-slate-900">${totalPrice}</span>
                      <span className="block text-[10px] text-slate-400">All taxes &amp; fees included</span>
                    </div>
                  </div>
                </div>

                {/* ── Check Availability CTA ── */}
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full rounded-2xl bg-[#0071eb] hover:bg-[#005ec4] active:scale-[0.98] py-3.5 text-center text-sm sm:text-base font-extrabold text-white shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                >
                  Check availability
                </button>

                {/* ── Custom Tour Package Button ── */}
                <button
                  type="button"
                  id="custom-tour-btn"
                  onClick={() => setShowCustomTourModal(true)}
                  className="w-full rounded-2xl border-2 border-[#0071eb] bg-white hover:bg-blue-50 active:scale-[0.98] py-3.5 text-center text-sm sm:text-base font-extrabold text-[#0071eb] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Build Custom Tour Package
                </button>

                {/* ── Benefits Section ── */}
                <div className="pt-1 space-y-3">
                  <hr className="border-slate-100" />

                  {/* Free cancellation */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Free cancellation</span>
                      <span className="block text-[11px] text-slate-400 leading-snug">
                        Cancel up to 24 hours in advance for a full refund
                      </span>
                    </div>
                  </div>

                  {/* Reserve now, pay later */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Reserve now &amp; pay later</span>
                      <span className="block text-[11px] text-slate-400 leading-snug">
                        Keep your travel plans flexible — book your spot and pay nothing today
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>


        {/* ────────────────────────────────────────────────────────── */}
        {/* 4. RELATED EXPERIENCES IN DELHI                            */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                More top experiences in & around Delhi
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Handpicked guided tours and day excursions from Delhi
              </p>
            </div>
            <Link
              to="/tour-packages/search?city=Delhi"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Explore all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tour.relatedTours.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/tour-packages/search?city=Delhi')}
                className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                    {item.badge}
                  </span>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.city} • {item.duration}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 mr-1">from</span>
                      <span className="text-base font-extrabold text-slate-900">${item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. FULL LIGHTBOX GALLERY MODAL                             */}
      {/* ────────────────────────────────────────────────────────── */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close photo gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous photo */}
          <button
            type="button"
            onClick={() =>
              setActivePhotoIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next photo */}
          <button
            type="button"
            onClick={() => setActivePhotoIndex((prev) => (prev + 1) % tour.gallery.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Main Large Image Display */}
          <div className="flex flex-col items-center justify-center max-w-5xl w-full max-h-[85vh]">
            <img
              src={tour.gallery[activePhotoIndex].fullUrl}
              alt={tour.gallery[activePhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-base sm:text-lg font-bold">
                {tour.gallery[activePhotoIndex].title}
              </h3>
              <span className="text-xs text-white/60">
                Photo {activePhotoIndex + 1} of {tour.gallery.length}
              </span>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar max-w-full p-2">
              {tour.gallery.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActivePhotoIndex(i)}
                  className={`h-14 w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhotoIndex === i
                      ? 'border-blue-500 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.title} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. BOOKING CONFIRMATION MODAL & VOUCHER                     */}
      {/* ────────────────────────────────────────────────────────── */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Booking Confirmed!
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Your private Delhi city tour has been reserved. You pay nothing today!
              </p>
            </div>

            {/* Voucher Card */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-blue-600 text-sm">
                  {bookingRef}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tour:</span>
                <span className="font-bold text-slate-800 text-right max-w-[200px]">
                  {tour.shortTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Option:</span>
                <span className="font-semibold text-slate-800">{activeOptionObj.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Starting Time:</span>
                <span className="font-semibold text-slate-800">
                  {selectedDate} at {selectedTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Language:</span>
                <span className="font-semibold text-slate-800">{selectedLanguage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guests:</span>
                <span className="font-semibold text-slate-800">
                  {adults} {adults === 1 ? 'Adult' : 'Adults'}
                  {childrenCount > 0 ? `, ${childrenCount} Children` : ''}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 items-baseline">
                <span className="font-bold text-slate-900 text-sm">Total Guaranteed:</span>
                <span className="text-lg font-black text-slate-900">${totalPrice}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher</span>
              </button>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-center text-xs font-bold text-white shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 7. MOBILE STICKY BOTTOM BAR                                */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[11px] text-slate-500 block leading-none">From</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-slate-900">${tour.price}</span>
            <span className="text-xs text-slate-400">/ person</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('booking-section')
            el?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="rounded-full bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
        >
          Check availability
        </button>
      </div>
      {/* ────────────────────────────────────────────────────────── */}
      {/* 8. CUSTOM TOUR BUILDER MODAL                               */}
      {/* ────────────────────────────────────────────────────────── */}
      <CustomTourBuilderModal
        isOpen={showCustomTourModal}
        onClose={() => setShowCustomTourModal(false)}
      />
    </div>
  )
}
