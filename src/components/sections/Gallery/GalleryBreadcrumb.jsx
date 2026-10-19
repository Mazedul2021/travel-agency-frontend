const GalleryBreadcrumb = () => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-[14px] text-[#0F172A]">
    <a href="/" className="hover:text-[#1D5BFF]">Home</a>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
    <span aria-current="page">Gallery</span>
  </nav>
);

export default GalleryBreadcrumb;
