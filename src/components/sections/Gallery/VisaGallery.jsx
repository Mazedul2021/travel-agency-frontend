import { useState, useCallback } from 'react';
import { fetchVisaGallery } from '../../../services/gallery';
import { useGalleryItems } from '../../../hooks/useGalleryItems';
import GallerySection from './GallerySection';
import GalleryTile from './GalleryTile';
import Lightbox from './Lightbox';
import { TileSkeleton } from './Skeletons';

const ASPECT = 'aspect-[2/1]';

const VisaGallery = () => {
  const { items, loading } = useGalleryItems(fetchVisaGallery);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <GallerySection
      id="visa-gallery"
      eyebrow="Our Success"
      title="Successful Visa Gallery"
      subtitle="Real people. Real visas. Real journeys. We are proud to be part of their success stories."
    >
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <TileSkeleton key={i} aspect={ASPECT} />)
          : items.map((item, i) => (
              <GalleryTile
                key={item.id}
                item={item}
                alt={`Successful visa story ${i + 1}`}
                aspect={ASPECT}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
      </div>

      <Lightbox items={items} index={lightboxIndex} onClose={close} onIndexChange={setLightboxIndex} />
    </GallerySection>
  );
};

export default VisaGallery;
