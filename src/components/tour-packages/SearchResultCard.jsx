import { useState } from 'react'
import { Heart, Star, Sparkles } from 'lucide-react'

export default function SearchResultCard({
  tour,
  isSaved,
  onToggleWishlist,
  onOpenDetails,
}) {
  const [imgError, setImgError] = useState(false)

  const imageSrc = imgError
    ? 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80'
    : tour.image

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(tour)}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* 3:2 Media Thumbnail Container */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={tour.title}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges Overlay Matching Picture */}
        <div className="absolute top-2 left-2 right-2 z-10 flex items-start justify-between gap-1.5">
          {/* Badge Left */}
          {tour.badge ? (
            tour.badgeType === 'best-match' ? (
              <span className="inline-flex items-center gap-1 rounded bg-[#182337] px-2.5 py-0.5 text-[10.5px] font-bold text-white shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{tour.badge}</span>
              </span>
            ) : tour.badgeType === 'new' ? (
              <span className="inline-flex items-center rounded bg-[#0071eb] px-2.5 py-0.5 text-[10.5px] font-bold text-white shadow-xs">
                {tour.badge}
              </span>
            ) : tour.badgeType === 'critical' ? (
              <span className="inline-flex items-center rounded bg-[#d9383a] px-2.5 py-0.5 text-[10.5px] font-bold text-white shadow-xs">
                {tour.badge}
              </span>
            ) : tour.badgeType === 'certified' ? (
              <span className="inline-flex items-center gap-1 rounded bg-white/95 border border-slate-200 px-2 py-0.5 text-[10.5px] font-bold text-slate-900 shadow-2xs backdrop-blur-xs">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5533] text-white text-[8px] font-black">
                  G
                </span>
                <span>{tour.badge}</span>
              </span>
            ) : (
              <span className="inline-flex items-center rounded bg-slate-900 px-2.5 py-0.5 text-[10.5px] font-bold text-white shadow-xs">
                {tour.badge}
              </span>
            )
          ) : (
            <div />
          )}

          {/* White Circular Heart Wishlist Button from Picture */}
          {/* White Circular Heart Wishlist Button from Picture */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleWishlist(tour.id)
            }}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-90 hover:scale-105 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card Content Matching Picture */}
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          {/* Location & Duration Context uppercase */}
          <span className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            {tour.context}
          </span>

          {/* Title */}
          <h3 className="text-[13.5px] font-bold text-[#181a1f] leading-snug line-clamp-2 group-hover:text-[#0071eb] transition-colors">
            {tour.title}
          </h3>

          {/* Perk subtitle if available */}
          {tour.perk && (
            <p className="mt-1 text-xs text-slate-500 line-clamp-1">
              {tour.perk}
            </p>
          )}
        </div>

        {/* Rating and Price Row at Bottom */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-baseline justify-between gap-1">
          {/* Rating */}
          {tour.rating ? (
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#181a1f]">{tour.rating}</span>
              <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
              <span className="text-[11px] text-slate-400">
                ({tour.reviewsCount})
              </span>
            </div>
          ) : (
            <div />
          )}

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
