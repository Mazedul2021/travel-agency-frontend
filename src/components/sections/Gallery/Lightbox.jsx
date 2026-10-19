import { useEffect } from 'react';

const Arrow = ({ dir }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
  </svg>
);

const Lightbox = ({ items, index, onClose, onIndexChange }) => {
  const open = index !== null && index >= 0 && items[index];
  const total = items.length;

  const prev = () => onIndexChange((index - 1 + total) % total);
  const next = () => onIndexChange((index + 1) % total);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onIndexChange((index - 1 + total) % total);
      if (e.key === 'ArrowRight') onIndexChange((index + 1) % total);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, index, total, onClose, onIndexChange]);

  if (!open) return null;
  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.country} preview`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>

      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:left-8"
          >
            <Arrow dir="left" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:right-8"
          >
            <Arrow dir="right" />
          </button>
        </>
      )}

      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.image}
          alt={item.country}
          className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
          onError={(e) => { e.currentTarget.style.opacity = 0.15; }}
        />
        <figcaption className="mt-3 flex items-center justify-between text-white">
          <span className="text-[15px] font-medium">
            {item.country}{item.type ? ` · ${item.type}` : ''}
          </span>
          <span className="text-[13px] text-white/70">{index + 1} / {total}</span>
        </figcaption>
      </figure>
    </div>
  );
};

export default Lightbox;
