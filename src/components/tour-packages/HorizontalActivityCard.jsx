import { useState } from 'react'
import { Heart, Star } from 'lucide-react'

export default function HorizontalActivityCard({
  tour,
  isSaved,
  onToggleWishlist,
  onOpenDetails,
}) {
  const [imgError, setImgError] = useState(false)

  const imageSrc = imgError
    ? 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80'
    : tour.image

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(tour)}
      className="group relative flex w-full max-w-[430px] shrink-0 cursor-pointer flex-row rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200"
    >
      {/* Thumbnail with rounded corners & Heart in white circle */}
      <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <img
          src={imageSrc}
          alt={tour.title}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />

        {/* Wishlist Button Overlay matching picture */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(tour.id)
          }}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-1.5 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-xs transition-transform active:scale-90 cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
            }`}
          />
        </button>
      </div>

      {/* Card Info Right */}
      <div className="flex flex-1 flex-col justify-between pl-3 pr-0.5 min-w-0">
        <div>
          {/* Title from Picture */}
          <h3 className="text-[13.5px] font-bold text-[#181a1f] leading-snug line-clamp-2 group-hover:text-[#0071eb] transition-colors">
            {tour.title}
          </h3>

          {/* Duration */}
          <p className="mt-1 text-[11.5px] text-slate-500">
            {tour.duration || tour.attributes}
          </p>
        </div>

        {/* Bottom Row: Rating on left, Price on right */}
        <div className="mt-2 flex items-baseline justify-between gap-1">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-[#181a1f]">{tour.rating}</span>
            <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            <span className="text-[11px] text-slate-400">({tour.reviewsCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 text-right shrink-0">
            <span className="text-[11px] text-slate-400">From</span>
            {tour.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${tour.originalPrice}
              </span>
            )}
            <span className="text-sm font-extrabold text-[#d92228]">
              ${tour.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
