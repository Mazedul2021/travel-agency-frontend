// Section shell: orange line + letter-spaced eyebrow, serif title, subtitle, content.
const GallerySection = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3">
      <span className="h-[3px] w-10 rounded-full bg-[#FF8A00]" />
      <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#334155]">
        {eyebrow}
      </span>
    </div>

    <h2
      className="mt-3 text-[32px] font-bold leading-tight text-[#0B2A5B] md:text-[44px]"
      style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
    >
      {title}
    </h2>
    <p className="mt-2 max-w-3xl text-[15px] text-[#64748B] md:text-[17px]">{subtitle}</p>

    <div className="mt-6">{children}</div>
  </section>
);

export default GallerySection;
