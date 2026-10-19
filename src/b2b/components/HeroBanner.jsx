import { Camera } from 'lucide-react'
import { PARTNER_INFO } from '../data/partnerData'

export default function HeroBanner({ currentUser }) {
  const partner = currentUser || PARTNER_INFO

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 select-none min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] flex items-center">
      {/* Background Santorini Airplane Panorama Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{
          backgroundImage: "url('/images/santorini-plane-banner.jpg')",
          backgroundPosition: 'center 42%',
        }}
      />

      {/* Subtle darkening gradient on the left for text legibility, keeping sea and sunset bright */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-900/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      {/* Banner Content Container */}
      <div className="relative max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-10 sm:pb-14 flex items-center justify-between gap-6">
        {/* Left Side: Avatar Circle & Partner Details */}
        <div className="flex items-center gap-3.5 sm:gap-6">
          {/* Avatar Circle with Thick White Border + Camera Badge */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full bg-[#dbeafe] text-[#1e3a8a] font-extrabold text-xl xs:text-2xl sm:text-3xl flex items-center justify-center shadow-2xl ring-3 sm:ring-4 ring-white tracking-tight">
              {partner.initials || 'AR'}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 size-6 sm:size-7 rounded-full bg-[#0d2b59] text-white flex items-center justify-center shadow-md ring-2 ring-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Change profile picture"
            >
              <Camera className="size-3 sm:size-3.5" />
            </button>
          </div>

          {/* Welcome Text & Partner Details */}
          <div className="text-white space-y-0.5 sm:space-y-1">
            <span className="text-[11px] sm:text-[13px] font-normal text-white/90 tracking-wide block">
              Welcome Back,
            </span>

            {/* Name + B2B Partner Badge on the same line */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
              <h1 className="text-xl xs:text-2xl sm:text-[28px] lg:text-3xl font-extrabold text-white tracking-tight drop-shadow-md leading-tight">
                {partner.name || 'Abdul Rahman'}
              </h1>
              <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold bg-[#1d7bf2] text-white shadow-xs">
                B2B Partner
              </span>
            </div>

            {/* Partner ID */}
            <p className="text-[11px] sm:text-[13px] text-white/95 font-medium tracking-wide">
              Partner ID: {partner.partnerId || 'PRT-2025-00124'}
            </p>

            {/* Agency Trust subhead */}
            <p className="text-[10px] sm:text-xs text-white/80 font-normal">
              ABL Travels Trusted Partner Since 2024
            </p>
          </div>
        </div>

        {/* Right Side: Together We Explore More with Golden Accent Curve */}
        <div className="hidden lg:flex flex-col items-end justify-center pr-2 select-none">
          <p
            className="font-script text-white text-3xl sm:text-4xl lg:text-[44px] leading-[0.95] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] -rotate-3 text-right"
            style={{
              fontFamily: "'Great Vibes', cursive",
            }}
          >
            <span className="block">Together</span>
            <span className="relative inline-block mt-1">
              <span>We Explore More</span>
              {/* Vibrant golden/orange brush underline stroke */}
              <svg
                className="absolute -bottom-2 -left-1 w-full h-3.5 overflow-visible pointer-events-none"
                viewBox="0 0 100 12"
                fill="none"
              >
                <path
                  d="M 2,7 Q 50,13 98,4"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
