import { useState } from 'react'

export default function DestinationCard({ destination, onSelectDestination }) {
  const [imgError, setImgError] = useState(false)

  const imageSrc = imgError
    ? 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80'
    : destination.image

  return (
    <div
      onClick={() => onSelectDestination(destination.name)}
      className="group cursor-pointer flex flex-col"
    >
      {/* Exact 1:1 Aspect Ratio Square with rounded corners from Picture */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
        <img
          src={imageSrc}
          alt={destination.name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Exact City Name Below the Image from Picture */}
      <span className="mt-2 text-[14px] sm:text-[15px] font-bold text-[#181a1f] group-hover:text-[#0071eb] transition-colors text-left">
        {destination.name}
      </span>
    </div>
  )
}
