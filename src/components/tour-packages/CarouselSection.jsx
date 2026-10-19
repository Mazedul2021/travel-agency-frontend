import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CarouselSection({
  id,
  title,
  children,
  showControls = true,
  className = '',
}) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true })
      window.addEventListener('resize', checkScroll)
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [children])

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollAmount = container.clientWidth * 0.75
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section id={id} className={`py-4 ${className}`}>
      {/* Title Matching Picture */}
      <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181a1f] mb-4">
        {title}
      </h2>

      {/* Relative Carousel Container with Floating Next Arrow from Picture */}
      <div className="relative group/carousel">
        {/* Left Arrow (only when scrolled) */}
        {showControls && canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous items"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0071eb] shadow-md hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
        >
          {children}
        </div>

        {/* Floating Right Arrow as in the Picture */}
        {showControls && canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next items"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0071eb] shadow-md hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  )
}
