import { useRef, useEffect, useState } from 'react'
import {
  FileText,
  Truck,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export default function DashboardTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: FileText,
    },
    {
      id: 'applications',
      label: 'My Applications',
      icon: FileText,
    },
    {
      id: 'pickup',
      label: 'Passport Pickup',
      icon: Truck,
    },
    {
      id: 'invoices',
      label: 'Invoices & Commission',
      icon: FileText,
    },
    {
      id: 'support',
      label: 'Support',
      icon: Headphones,
    },
  ]

  const containerRef = useRef(null)
  const activeTabRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Track scroll position to conditionally render edge gradient cues and scroll chevrons
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setCanScrollLeft(scrollLeft > 6)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6)
    }
  }

  useEffect(() => {
    checkScroll()
    const timer = setTimeout(checkScroll, 150)
    window.addEventListener('resize', checkScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  // Auto-scroll active tab into view smoothly on mobile/tablet when activeTab changes
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current
      const activeEl = activeTabRef.current
      const containerRect = container.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()
      const currentRelativeLeft = activeRect.left - containerRect.left + container.scrollLeft
      const targetScrollLeft = currentRelativeLeft - (containerRect.width / 2) + (activeRect.width / 2)

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      })
    }
    const timer = setTimeout(checkScroll, 350)
    return () => clearTimeout(timer)
  }, [activeTab])

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkScroll, 250)
    }
  }

  return (
    <div className="w-full max-w-7xl min-w-0 mx-auto px-3 sm:px-6 lg:px-8 -mt-5 sm:-mt-7 relative z-20">
      <div className="w-full max-w-full min-w-0 bg-white rounded-2xl shadow-md border border-slate-100 p-1.5 sm:p-2 relative overflow-hidden">
        {/* Left Scroll Cue & Button for small screens */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none rounded-l-2xl z-10 flex items-center pl-1 sm:pl-1.5 lg:hidden animate-fade-in">
            <button
              onClick={() => handleScroll('left')}
              className="pointer-events-auto w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              aria-label="Scroll tabs left"
              type="button"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right Scroll Cue & Button for small screens */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none rounded-r-2xl z-10 flex items-center justify-end pr-1 sm:pr-1.5 lg:hidden animate-fade-in">
            <button
              onClick={() => handleScroll('right')}
              className="pointer-events-auto w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              aria-label="Scroll tabs right"
              type="button"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 5-Tab List */}
        <div
          ref={containerRef}
          onScroll={checkScroll}
          role="tablist"
          aria-label="Dashboard navigation tabs"
          className="w-full min-w-0 flex lg:grid lg:grid-cols-5 items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory overscroll-x-contain touch-pan-x py-0.5 scroll-px-2"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : null}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onTabChange(tab.id)}
                className={`group shrink-0 snap-center lg:shrink w-auto lg:w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#1d7bf2] text-white shadow-sm'
                    : 'text-slate-700 hover:text-[#1d7bf2] hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#1d7bf2]'
                  }`}
                  strokeWidth={2}
                />
                <span className="whitespace-nowrap shrink-0">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
