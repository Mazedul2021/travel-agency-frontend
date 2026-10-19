import { useEffect } from 'react';
import { GalleryBreadcrumb, TourGallery, VisaGallery } from '../components/sections/Gallery';

// Page content only. Header and Footer are added by GalleryPageView in App.jsx,
// the same way HomePage and VisaPage are wrapped.
const GalleryPage = () => {
  useEffect(() => {
    // Deep links like /gallery#visa-gallery jump to that section; otherwise start at the top.
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="font-[Inter,sans-serif] text-[#0F172A]">
      <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-6 lg:px-[70px]">
        <GalleryBreadcrumb />

        <div className="mt-8 space-y-16">
          <TourGallery />
          <VisaGallery />
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;