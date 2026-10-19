import { useState } from 'react'
import { Heart, Star } from 'lucide-react'

export default function VerticalActivityCard({
  tour,
  isSaved,
  onToggleWishlist,
  onOpenDetails,
}) {
  const [imgError, setImgError] = useState(false)

  const imageSrc = imgError
    ? 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80'
    : tour.image

  const isOriginal = tour.isOriginal || tour.badgeType === 'originals'

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(tour)}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* 3:2 Media Container */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={tour.title}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges Overlay from Picture */}
        <div className="absolute top-2 left-2 right-2 z-10 flex items-start justify-between gap-1.5">
          {/* Badge */}
          {tour.badge ? (
            tour.badgeType === 'critical' ? (
              <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold text-white shadow-xs bg-[#d9383a]">
                {tour.badge}
              </span>
            ) : isOriginal ? (
              <span className="inline-flex items-center gap-1 rounded bg-[#ff5533] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-white text-[#ff5533] text-[8px] font-black">
                  G
                </span>
                <span>Originals by GetYourGuide</span>
              </span>
            ) : (
              <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs bg-[#181a1f]">
                {tour.badge}
              </span>
            )
          ) : (
            <div />
          )}

          {/* Heart Button in White Circle from Picture */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleWishlist(tour.id)
            }}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-xs transition-transform active:scale-90 cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Red Accent Bar for Originals from Picture */}
      {isOriginal && (
        <div className="h-1.5 w-full bg-[#ff5533]" aria-hidden="true" />
      )}

      {/* Body Matching Picture */}
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          {/* Location Context uppercase */}
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            {tour.context || tour.city}
          </span>

          {/* Title */}
          <h3 className="text-[13.5px] font-bold text-[#181a1f] leading-snug line-clamp-2 group-hover:text-[#0071eb] transition-colors">
            {tour.title}
          </h3>

          {/* Duration */}
          <p className="mt-1 text-xs text-slate-500 line-clamp-1">
            {tour.attributes || tour.duration}
          </p>
        </div>

        {/* Rating and Price Row */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-baseline justify-between gap-1">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-[#181a1f]">{tour.rating}</span>
            <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            <span className="text-[11px] text-slate-400">
              ({tour.reviewsCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 text-right shrink-0">
            <span className="text-[11px] text-slate-400">From</span>
            {tour.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${tour.originalPrice}
              </span>
            )}
            <span
              className={`text-sm font-extrabold ${
                tour.discounted ? 'text-[#d92228]' : 'text-[#181a1f]'
              }`}
            >
              ${tour.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
