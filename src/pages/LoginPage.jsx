import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Users,
  ArrowRight,
  ShieldCheck,
  Palmtree,
  Headphones,
  CheckCircle2,
  X,
  FileCheck,
} from 'lucide-react'
import { useAuth, DEMO_B2B_PARTNER, DEMO_B2C_CUSTOMER } from '../context/AuthContext'
import { safeRedirectPath } from '@/utils'

/**
 * High-fidelity vector SVG logo for ABL Travels
 */
export function AblLogo({ className = 'h-10', showTagline = true, light = false }) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        <img
          src="/company_logo.png"
          alt="ABL Travels"
          width={48}
          height={48}
          draggable={false}
          className={`${light ? 'bg-white/10' : 'bg-white'} size-10 shrink-0 rounded-lg object-contain p-0.5 drop-shadow-sm`}
        />

        {/* Brand Text */}
        <span
          className={`text-2xl font-black italic tracking-tight ${
            light ? 'text-white' : 'text-[#2563eb]'
          }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          ABL Travels
        </span>
      </div>

      {showTagline && (
        <span
          className={`text-[9px] font-semibold tracking-[0.25em] uppercase mt-0.5 ${
            light ? 'text-white/80' : 'text-slate-400'
          }`}
        >
          Travel Beyond Borders
        </span>
      )}
    </div>
  )
}

/**
 * Vintage Travel Around the World Postmark Stamp
 */
function TravelStamp() {
  return (
    <div className="relative inline-flex items-center gap-2 select-none opacity-45 pointer-events-none rotate-6">
      {/* Stamp Circular Seal */}
      <div className="relative size-24 rounded-full border-2 border-dashed border-slate-700/60 p-1 flex items-center justify-center text-center">
        <div className="size-full rounded-full border border-slate-700/40 flex flex-col items-center justify-center p-1">
          <span className="text-[8px] font-bold tracking-widest uppercase text-slate-800">
            Travel
          </span>
          <span className="text-[10px] font-black tracking-wider uppercase text-slate-900 border-y border-slate-700/30 px-1 my-0.5">
            Around
          </span>
          <span className="text-[8px] font-bold tracking-widest uppercase text-slate-800">
            The World
          </span>
        </div>
      </div>

      {/* Postal Cancellation Waves */}
      <svg
        className="w-16 h-12 text-slate-700/60"
        viewBox="0 0 80 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M0 8 Q 10 2, 20 8 T 40 8 T 60 8 T 80 8" />
        <path d="M0 16 Q 10 10, 20 16 T 40 16 T 60 16 T 80 16" />
        <path d="M0 24 Q 10 18, 20 24 T 40 24 T 60 24 T 80 24" />
        <path d="M0 32 Q 10 26, 20 32 T 40 32 T 60 32 T 80 32" />
      </svg>
    </div>
  )
}

/**
 * 4 Banner Slides with High-Resolution Wallpaper, Thumbnails, & Dynamic Content
 */
const BANNER_SLIDES = [
  {
    id: 'china-visa',
    title: 'China Visa Processing',
    eyebrow: 'Travel Beyond Borders',
    headlineMain: 'Your Trusted',
    headlineSub: 'Travel Partner',
    description:
      'From China visa processing to unforgettable international tours, we make your travel journey simple, safe and hassle-free.',
    scriptWords: ['Explore', 'Dream', 'Discover'],
    bannerImage: '/images/login-banners/banner-0.jpg',
    thumbImage: '/images/login-thumbs/china-visa.jpg',
    pillIndex: 0,
  },
  {
    id: 'tour-packages',
    title: 'International Tour Packages',
    eyebrow: 'Worldwide Destinations',
    headlineMain: 'Journeys That',
    headlineSub: 'Inspire You',
    description:
      'Discover breathtaking beaches, tropical islands, and hand-crafted vacation packages curated for unforgettable escapes.',
    scriptWords: ['Wander', 'Dream', 'Escape'],
    bannerImage: '/images/login-banners/banner-1.jpg',
    thumbImage: '/images/login-thumbs/tour-packages.jpg',
    pillIndex: 2,
  },
  {
    id: 'custom-planning',
    title: 'Custom Tour Planning',
    eyebrow: 'Bespoke Itineraries',
    headlineMain: 'Tailored Just',
    headlineSub: 'For Your Style',
    description:
      'Personalized private journeys, luxury stays, and seamless flight bookings configured specifically to your schedule.',
    scriptWords: ['Imagine', 'Plan', 'Journey'],
    bannerImage: '/images/login-banners/banner-2.jpg',
    thumbImage: '/images/login-thumbs/custom-planning.jpg',
    pillIndex: 1,
  },
  {
    id: 'corporate-travel',
    title: 'Group & Corporate Travel',
    eyebrow: 'Business & Delegations',
    headlineMain: 'Seamless Group',
    headlineSub: 'Travel Solutions',
    description:
      'End-to-end corporate retreat management, trade exhibition visas, group ticketing, and dedicated 24/7 travel desk.',
    scriptWords: ['Connect', 'Explore', 'Together'],
    bannerImage: '/images/login-banners/banner-3.jpg',
    thumbImage: '/images/login-thumbs/corporate-travel.jpg',
    pillIndex: 3,
  },
]

const CURRENT_YEAR = new Date().getFullYear()

export default function LoginPage({ initialMode = 'login' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // ?next= carries the page the visitor came for (the visa status link); only paths on this site are followed
  const nextPath = safeRedirectPath(new URLSearchParams(location.search).get('next'))
  const destinationFor = (role) => nextPath || (role === 'B2B' ? '/b2b' : location.state?.from || '/')

  // State
  const [activeTab, setActiveTab] = useState('customer') // 'customer' | 'partner'
  const [authMode, setAuthMode] = useState(initialMode) // 'login' | 'register'
  const [emailOrPhone, setEmailOrPhone] = useState(DEMO_B2C_CUSTOMER.email)
  const [password, setPassword] = useState('CustomerPass2025!')
  const [fullName, setFullName] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(null)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  // Carousel banner active slide & hover pause
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Automatically cycle banner every 5 seconds; pauses when hovering over banner
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  // Current active slide data
  const currentBanner = BANNER_SLIDES[activeSlide]

  // Switch tab cleanly without effect cascading
  const handleTabSwitch = (tab) => {
    setActiveTab(tab)
    setErrorMessage('')
    if (tab === 'customer') {
      setEmailOrPhone(DEMO_B2C_CUSTOMER.email)
      setPassword('CustomerPass2025!')
    } else {
      setEmailOrPhone(DEMO_B2B_PARTNER.email)
      setPassword('PartnerPass2025!')
    }
  }

  // Handle Login submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')

    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or mobile number.')
      return
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.')
      return
    }

    setIsLoading(true)

    // Authentic slight latency for feedback
    await new Promise((r) => setTimeout(r, 600))

    const role = activeTab === 'partner' ? 'B2B' : 'B2C'
    const res = await login({
      email: emailOrPhone,
      password,
      role,
    })

    setIsLoading(false)

    if (res.success) {
      setLoginSuccess({
        name: res.user.name,
        role,
      })

      // Redirect after showing positive feedback
      setTimeout(() => navigate(destinationFor(role)), 700)
    } else {
      setErrorMessage('Authentication failed. Please verify your credentials.')
    }
  }

  // Handle Register submission
  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!fullName.trim() || !emailOrPhone.trim() || !password.trim()) {
      setErrorMessage('Please fill in all required fields.')
      return
    }

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    const role = activeTab === 'partner' ? 'B2B' : 'B2C'

    const res = await login({
      email: emailOrPhone,
      password,
      role,
    })

    setIsLoading(false)
    if (res.success) {
      setLoginSuccess({
        name: fullName || res.user.name,
        role,
      })
      setTimeout(() => navigate(destinationFor(role)), 800)
    }
  }

  // Handle Quick Demo Social Login
  const handleSocialLogin = async (provider) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 450))
    const role = activeTab === 'partner' ? 'B2B' : 'B2C'
    const res = await login({
      email: `${provider.toLowerCase()}.user@example.com`,
      role,
      isDemo: true,
    })
    setIsLoading(false)
    if (res.success) {
      setLoginSuccess({
        name: res.user.name,
        role,
      })
      setTimeout(() => navigate(destinationFor(role)), 700)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc] text-navy font-sans relative overflow-x-hidden">
      {/* ======================================================== */}
      {/* LEFT SECTION: Auto-Rotating & Clickable Scenic Banner    */}
      {/* ======================================================== */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full lg:w-[56%] min-h-[580px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden bg-slate-900 transition-colors"
      >
        {/* Layered Cross-fading Scenic Wallpapers with Zoom Animation */}
        <div className="absolute inset-0 z-0">
          {BANNER_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === idx
                  ? 'opacity-100 z-0'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.bannerImage}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                  activeSlide === idx ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          ))}

          {/* Soft luminous white gradient at top left so dark navy text is legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 via-45% to-transparent z-1" />

          {/* Golden sunrise glow accent */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none z-1" />

          {/* Dark gradient overlay at bottom for card and calligraphy readability */}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-1" />
        </div>

        {/* Vintage Postmark Stamp (positioned top right of left visual area) */}
        <div className="absolute top-10 right-10 z-10 hidden sm:block">
          <TravelStamp />
        </div>

        {/* Top Header & Dynamic Hero Text */}
        <div className="relative z-10 max-w-xl">
          {/* Top Left Brand Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/company_logo.png"
                alt="ABL Travels"
                width={48}
                height={48}
                draggable={false}
                className="size-10 shrink-0 rounded-lg bg-white object-contain p-0.5 drop-shadow-sm"
              />
              <span className="text-xl font-black italic text-[#2563eb]">
                ABL Travels
              </span>
            </div>
          </div>

          {/* Dynamic Content with Smooth Fade Animation */}
          <div key={currentBanner.id} className="animate-fade-in">
            {/* Subheading Tagline */}
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span>{currentBanner.eyebrow}</span>
              <span className="text-sm font-semibold">›</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0d2b59] leading-[1.08] tracking-tight">
              {currentBanner.headlineMain} <br />
              {currentBanner.headlineSub}
            </h1>

            {/* Description */}
            <p className="mt-3.5 text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-lg min-h-[48px]">
              {currentBanner.description}
            </p>
          </div>

          {/* 4 Feature Circles (Clickable & Highlight Active Service) */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3.5 mt-7 max-w-lg">
            {/* Feature 1: China Visa */}
            <div
              onClick={() => setActiveSlide(0)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div
                className={`size-13 sm:size-14 rounded-full p-1.5 transition-all duration-300 ${
                  currentBanner.pillIndex === 0
                    ? 'bg-white shadow-lg ring-3 ring-[#2563eb] scale-110'
                    : 'bg-white/90 backdrop-blur-md shadow-md ring-1 ring-white/60 group-hover:scale-105'
                }`}
              >
                <div
                  className={`size-full rounded-full flex items-center justify-center transition-colors ${
                    currentBanner.pillIndex === 0
                      ? 'bg-white text-[#2563eb]'
                      : 'bg-white text-[#0d2b59]'
                  }`}
                >
                  <FileCheck className="size-5 sm:size-6" strokeWidth={2} />
                </div>
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold mt-2 leading-tight transition-colors ${
                  currentBanner.pillIndex === 0 ? 'text-[#2563eb]' : 'text-[#0d2b59]'
                }`}
              >
                China Visa <br />
                Specialist
              </span>
            </div>

            {/* Feature 2: Trusted & Experienced */}
            <div
              onClick={() => setActiveSlide(2)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div
                className={`size-13 sm:size-14 rounded-full p-1.5 transition-all duration-300 ${
                  currentBanner.pillIndex === 1
                    ? 'bg-white shadow-lg ring-3 ring-[#2563eb] scale-110'
                    : 'bg-white/90 backdrop-blur-md shadow-md ring-1 ring-white/60 group-hover:scale-105'
                }`}
              >
                <div
                  className={`size-full rounded-full flex items-center justify-center transition-colors ${
                    currentBanner.pillIndex === 1
                      ? 'bg-white text-[#2563eb]'
                      : 'bg-white text-[#0d2b59]'
                  }`}
                >
                  <ShieldCheck className="size-5 sm:size-6" strokeWidth={2} />
                </div>
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold mt-2 leading-tight transition-colors ${
                  currentBanner.pillIndex === 1 ? 'text-[#2563eb]' : 'text-[#0d2b59]'
                }`}
              >
                Trusted <br />
                &amp; Experienced
              </span>
            </div>

            {/* Feature 3: Tour Packages */}
            <div
              onClick={() => setActiveSlide(1)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div
                className={`size-13 sm:size-14 rounded-full p-1.5 transition-all duration-300 ${
                  currentBanner.pillIndex === 2
                    ? 'bg-white shadow-lg ring-3 ring-[#2563eb] scale-110'
                    : 'bg-white/90 backdrop-blur-md shadow-md ring-1 ring-white/60 group-hover:scale-105'
                }`}
              >
                <div
                  className={`size-full rounded-full flex items-center justify-center transition-colors ${
                    currentBanner.pillIndex === 2
                      ? 'bg-white text-[#2563eb]'
                      : 'bg-white text-[#0d2b59]'
                  }`}
                >
                  <Palmtree className="size-5 sm:size-6" strokeWidth={2} />
                </div>
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold mt-2 leading-tight transition-colors ${
                  currentBanner.pillIndex === 2 ? 'text-[#2563eb]' : 'text-[#0d2b59]'
                }`}
              >
                Wide Range <br />
                of Tour Packages
              </span>
            </div>

            {/* Feature 4: Dedicated Support */}
            <div
              onClick={() => setActiveSlide(3)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div
                className={`size-13 sm:size-14 rounded-full p-1.5 transition-all duration-300 ${
                  currentBanner.pillIndex === 3
                    ? 'bg-white shadow-lg ring-3 ring-[#2563eb] scale-110'
                    : 'bg-white/90 backdrop-blur-md shadow-md ring-1 ring-white/60 group-hover:scale-105'
                }`}
              >
                <div
                  className={`size-full rounded-full flex items-center justify-center transition-colors ${
                    currentBanner.pillIndex === 3
                      ? 'bg-white text-[#2563eb]'
                      : 'bg-white text-[#0d2b59]'
                  }`}
                >
                  <Headphones className="size-5 sm:size-6" strokeWidth={2} />
                </div>
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold mt-2 leading-tight transition-colors ${
                  currentBanner.pillIndex === 3 ? 'text-[#2563eb]' : 'text-[#0d2b59]'
                }`}
              >
                Dedicated <br />
                Customer Support
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Dynamic Calligraphy Script & 4 Interactive Thumbnail Cards */}
        <div className="relative z-10 mt-12 pt-4">
          {/* Dynamic Calligraphy Script */}
          <div key={currentBanner.id} className="mb-4 sm:mb-5 select-none animate-fade-in">
            <div className="font-script text-white text-3xl sm:text-4xl md:text-[42px] leading-[0.9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] -rotate-6 transform origin-bottom-left">
              <div>{currentBanner.scriptWords[0]}</div>
              <div className="ml-3">{currentBanner.scriptWords[1]}</div>
              <div className="ml-6 relative inline-block">
                <span>{currentBanner.scriptWords[2]}</span>
                {/* Yellow/Golden brush underline stroke */}
                <svg
                  className="absolute -bottom-1.5 -left-1 w-full h-3 overflow-visible pointer-events-none"
                  viewBox="0 0 100 12"
                  fill="none"
                >
                  <path
                    d="M2 6 C 25 11, 60 2, 98 7"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 4 Cards Carousel Row: Clickable to Switch Banner Instantly */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {BANNER_SLIDES.map((card, idx) => {
              const isActive = activeSlide === idx
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`relative h-24 sm:h-28 rounded-2xl overflow-hidden group cursor-pointer border transition-all duration-300 shadow-md ${
                    isActive
                      ? 'border-white ring-3 ring-[#f97316] scale-[1.04] shadow-2xl z-10'
                      : 'border-white/25 hover:border-white/60 opacity-80 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                >
                  <img
                    src={card.thumbImage}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient scrim */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                      isActive
                        ? 'from-black/90 via-black/40 to-black/10'
                        : 'from-black/80 via-black/35 to-transparent'
                    }`}
                  />

                  {/* Active Slide Top Accent Line */}
                  {isActive && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#f97316] shadow-sm animate-pulse" />
                  )}

                  {/* Card Text & Arrow Button */}
                  <div className="absolute inset-x-0 bottom-0 p-2.5 flex items-end justify-between gap-1.5">
                    <span
                      className={`text-[11px] sm:text-xs font-bold leading-tight drop-shadow-sm line-clamp-2 transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-white/90 group-hover:text-white'
                      }`}
                    >
                      {card.title}
                    </span>
                    <span
                      className={`size-5 sm:size-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'bg-[#f97316] text-white border border-white shadow-md scale-105'
                          : 'bg-white/20 backdrop-blur-sm border border-white/40 text-white group-hover:bg-white group-hover:text-[#0d2b59]'
                      }`}
                    >
                      <ArrowRight className="size-3" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Carousel Pagination Dots: Fully Clickable */}
          <div className="flex items-center gap-2 mt-3.5">
            {BANNER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Switch to banner ${idx + 1}: ${slide.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx
                    ? 'w-7 bg-[#f97316] shadow-md ring-1 ring-white/50'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT SECTION: White Login Card & Watermark Background   */}
      {/* ======================================================== */}
      <div className="relative w-full lg:w-[44%] min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-10 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e8f1fc]">
        {/* Subtle Watermark Travel Illustrations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
          {/* Dotted Airplane Trail in top right */}
          <svg
            className="absolute top-10 right-10 w-48 h-48 text-slate-300"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M20 180 C 60 120, 120 140, 160 50"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Small jet silhouette */}
            <g transform="translate(155, 40) rotate(45)">
              <path
                d="M10 0 L15 15 L10 13 L5 15 Z"
                fill="currentColor"
              />
            </g>
          </svg>

          {/* Faint Passport / Globe Watermark at bottom right */}
          <div className="absolute -bottom-8 -right-8 w-60 h-60 rounded-3xl border-2 border-slate-200/80 rotate-12 flex items-center justify-center">
            <svg
              className="w-32 h-32 text-slate-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
        </div>

        {/* Top Right: Back to Home Button */}
        <div className="relative z-10 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-primary transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-white/80"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Center: Main Authentication Card */}
        <div className="relative z-10 my-auto py-6 flex justify-center">
          <div className="w-full max-w-[440px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100">
            {/* Top Logo */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <img
                  src="/company_logo.png"
                  alt="ABL Travels"
                  width={48}
                  height={48}
                  draggable={false}
                  className="size-11 shrink-0 rounded-xl bg-white object-contain p-0.5 drop-shadow-sm"
                />
                <span className="text-xl sm:text-2xl font-black italic text-[#2563eb]">
                  ABL Travels
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.25em] uppercase text-slate-400 mt-1">
                Travel Beyond Borders
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mt-4">
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0d2b59] tracking-tight">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
                {authMode === 'login'
                  ? 'Login to your account to continue your travel journey.'
                  : 'Join ABL Travels for smooth visa & tour management.'}
              </p>
            </div>

            {/* Dual Role Segmented Selector */}
            <div className="mt-5 grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => handleTabSwitch('customer')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'customer'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="size-4 shrink-0" />
                <span>Customer Login</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabSwitch('partner')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'partner'
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="size-4 shrink-0" />
                <span>Partner Login</span>
              </button>
            </div>

            {/* Success State */}
            {loginSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Welcome, {loginSuccess.name}!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  {loginSuccess.role === 'B2B'
                    ? 'Redirecting to your B2B Partner Dashboard...'
                    : 'Redirecting to your travel dashboard...'}
                </p>
                <div className="w-40 h-1 bg-slate-100 rounded-full mt-5 overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse w-full" />
                </div>
              </div>
            ) : (
              /* Main Form */
              <form
                onSubmit={authMode === 'login' ? handleSubmit : handleRegister}
                className="mt-5 space-y-3.5"
              >
                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Optional Full Name for Register Mode */}
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="size-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-[#2563eb] transition-all text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                )}

                {/* Email or Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email or Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="size-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="Enter your email or mobile number"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-[#2563eb] transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="size-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-[#2563eb] transition-all text-slate-800 placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-4 rounded text-[#2563eb] border-slate-300 focus:ring-sky-500 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700">
                      Remember me
                    </span>
                  </label>

                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotModal(true)
                        setForgotSent(false)
                        setForgotEmail(emailOrPhone || '')
                      }}
                      className="text-xs font-semibold text-[#2563eb] hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>

                {/* Primary Orange CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#f97316] text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin size-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <span>
                        {authMode === 'login' ? 'Login' : 'Create Account'}
                      </span>
                      <ArrowRight className="size-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>

                {/* Divider OR */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0">
                    OR
                  </span>
                  <div className="border-t border-slate-200 w-full" />
                </div>

                {/* 3 Outlined Social Buttons */}
                <div className="space-y-2">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* Facebook */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Facebook')}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                    <span>Continue with Facebook</span>
                  </button>

                  {/* Apple */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="#000000">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span>Continue with Apple</span>
                  </button>
                </div>

                {/* Footer Switcher */}
                <div className="pt-2 text-center text-xs text-slate-500">
                  {authMode === 'login' ? (
                    <span>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('register')
                          setErrorMessage('')
                        }}
                        className="font-bold text-[#2563eb] hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        Create Account <ArrowRight className="size-3" />
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login')
                          setErrorMessage('')
                        }}
                        className="font-bold text-[#2563eb] hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        Login <ArrowRight className="size-3" />
                      </button>
                    </span>
                  )}
                </div>

                {/* Partner registration entry (only on the Partner tab) */}
                {activeTab === 'partner' && authMode === 'login' && (
                  <div className="pt-1 text-center text-xs text-slate-500">
                    Want to join our network?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/register-partner')}
                      className="font-bold text-[#ff6b00] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      Become a Partner <ArrowRight className="size-3" />
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom subtle copyright */}
        <div className="relative z-10 text-center text-[11px] text-slate-400">
          © {CURRENT_YEAR} ABL Travels. All rights reserved.
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-2xl bg-sky-50 text-primary flex items-center justify-center mb-4">
              <Lock className="size-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Reset Password
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your email or phone number and we will send you a link or OTP
              to reset your credentials.
            </p>

            {forgotSent ? (
              <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle2 className="size-8 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-emerald-900">
                  Reset link dispatched!
                </h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Please check your inbox or SMS for instructions to reset your
                  password.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setForgotSent(true)
                }}
                className="mt-5 space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter registered email or phone"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#f97316] text-white font-bold text-sm shadow-md"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
