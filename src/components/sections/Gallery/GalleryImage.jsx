import { useState } from 'react';

// Image with lazy loading and a gradient placeholder if the file is missing.
const GalleryImage = ({ src, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#0B2A5B] to-[#1D5BFF] text-[13px] font-medium text-white/80 ${className}`}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default GalleryImage;
