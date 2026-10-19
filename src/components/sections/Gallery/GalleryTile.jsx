import GalleryImage from './GalleryImage';

// Image-only tile: rounded, soft shadow, zoom on hover, click opens the lightbox.
const GalleryTile = ({ item, alt, aspect, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Open photo: ${alt}`}
    className={`group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.08)] ${aspect}`}
  >
    <GalleryImage
      src={item.image}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <span className="pointer-events-none absolute inset-0 bg-[#0B2A5B]/0 transition-colors duration-300 group-hover:bg-[#0B2A5B]/10" />
  </button>
);

export default GalleryTile;
