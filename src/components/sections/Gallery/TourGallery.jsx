import { useState, useCallback } from 'react';
import { fetchTourGallery } from '../../../services/gallery';
import { useGalleryItems } from '../../../hooks/useGalleryItems';
import GallerySection from './GallerySection';
import GalleryTile from './GalleryTile';
import Lightbox from './Lightbox';
import { TileSkeleton } from './Skeletons';

const ASPECT = 'aspect-[16/9]';

const TourGallery = () => {
  const { items, loading } = useGalleryItems(fetchTourGallery);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <GallerySection
      id="tour-gallery"
      eyebrow="Our Journeys"
      title="Tour Gallery"
      subtitle="Explore beautiful destinations and memorable moments from our travelers around the world."
    >
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <TileSkeleton key={i} aspect={ASPECT} />)
          : items.map((item, i) => (
              <GalleryTile
                key={item.id}
                item={item}
                alt={`${item.country} tour`}
                aspect={ASPECT}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
      </div>

      <Lightbox items={items} index={lightboxIndex} onClose={close} onIndexChange={setLightboxIndex} />
    </GallerySection>
  );
};

export default TourGallery;
