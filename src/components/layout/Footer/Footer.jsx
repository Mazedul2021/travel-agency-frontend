import {
  ArrowRight,
  Award,
  Clock,
  Globe2,
  Headset,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ThumbsUp,
} from 'lucide-react'
import { FOOTER_LINKS, VALUE_BADGES } from '@/constants'

/*
  Brand colors taken from the ABL Travels logo:
  blue   #0d81f0 (light #4da3f5 for dark backgrounds)
  orange #ff9a00 (light #ffb84d for text)
  navy   #061a33 (footer) / #030d1a (bottom bar)
  muted text on navy: #9db3cb
*/
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9a00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061a33]'

/* ---------- Social Icons ---------- */

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

// TODO: add the real profile links in `href`
const SOCIALS = [
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: YoutubeIcon, label: 'YouTube', href: '#' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { icon: WhatsappIcon, label: 'WhatsApp', href: '#' },
]

const BADGE_ICONS = { ShieldCheck, Headset, ThumbsUp, Globe2, Award }

// Contact details (phone numbers also work as tap-to-call links)
const PHONES = ['01717-999637', '+880 1346-808815']
const EMAIL = 'abltravels.visa@gmail.com'

const toTel = (number) => `tel:${number.replace(/[^\d+]/g, '')}`

function ColumnHeading({ children }) {
  return (
    <div>
      <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
        {children}
      </h3>
      <span
        aria-hidden="true"
        className="mt-2 block h-[2px] w-8 rounded-full bg-[#ff9a00]"
      />
    </div>
  )
}

// Real destinations for footer links that map to app routes.
// Everything else stays a placeholder '#' until those pages exist.
const LINK_HREFS = {
  'Become a Partner': '/register-partner',
  'Tour Packages': '/tour-packages',
}

function LinkList({ links, withArrows = [] }) {
  return (
    <ul role="list" className="mt-5 space-y-3">
      {links.map((l) => (
        <li key={l}>
          <a
            href={LINK_HREFS[l] || '#'}
            className={`group inline-flex items-center gap-1.5 rounded text-sm text-[#9db3cb] transition-colors hover:text-white ${focusRing}`}
          >
            {l}
            {withArrows.includes(l) && (
              <ArrowRight className="size-3.5 text-[#ff9a00] transition-transform group-hover:translate-x-0.5" />
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

function PaymentBadges() {
  return (
    <div className="flex items-center gap-2">
      {/* VISA */}
      <span className="flex h-7 items-center rounded-md bg-white px-2.5 text-[13px] font-black italic tracking-tight text-[#1a1f71] shadow-sm">
        VISA
      </span>

      {/* MasterCard */}
      <span className="flex h-7 items-center rounded-md bg-white px-2 shadow-sm">
        <svg viewBox="0 0 32 16" className="h-4 w-8" aria-label="MasterCard">
          <circle cx="12" cy="8" r="8" fill="#eb001b" />
          <circle cx="20" cy="8" r="8" fill="#f79e1b" fillOpacity="0.88" />
        </svg>
      </span>

      {/* bKash */}
      <span className="flex h-7 items-center gap-1 rounded-md bg-white px-2.5 text-[11px] font-extrabold text-[#e2136e] shadow-sm">
        <svg viewBox="0 0 24 24" className="size-3.5 fill-[#e2136e]" aria-hidden="true">
          <path d="M12 2 L22 12 L12 22 L2 12 Z" />
        </svg>
        bKash
      </span>

      {/* Nagad */}
      <span className="flex h-7 items-center gap-1 rounded-md bg-white px-2.5 text-[11px] font-extrabold text-[#f26522] shadow-sm">
        <span className="size-2 rounded-full bg-gradient-to-br from-[#f26522] to-[#f9a02b]" />
        Nagad
      </span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="relative">


      {/* Main dark footer */}
      <div className="relative overflow-hidden bg-[#061a33] text-white">
        {/* Brand line: blue to orange, same as the header */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-[#0d81f0] via-[#0d81f0] to-[#ff9a00]"
        />

        {/* Left scenery (pagoda, lake and bridge) */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[500px] max-w-[50vw] select-none overflow-hidden">
          <img
            src="/FooterImages/left-footer-bg.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-left-bottom opacity-60 sm:opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#061a33]/55 to-[#061a33]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#061a33]/45 to-[#061a33]" />
        </div>

        {/* Right scenery (mountain village and terraces) */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[500px] max-w-[50vw] select-none overflow-hidden">
          <img
            src="/FooterImages/right-footer-bg.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-right-bottom opacity-60 sm:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#061a33]/55 to-[#061a33]" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#061a33]/45 to-[#061a33]" />
        </div>

        {/* Flight route in the upper-right sky */}
        <svg
          className="pointer-events-none absolute right-4 top-6 z-10 hidden h-48 w-80 select-none opacity-80 md:block lg:h-60 lg:w-[420px]"
          viewBox="0 0 420 220"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 20 185 C 145 165, 255 110, 340 40"
            stroke="#ff9a00"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            opacity="0.6"
          />
          <g transform="translate(340, 40) rotate(-16)">
            <path
              d="M 0 0 L 18 1.5 L 32 -8 L 34 -6.5 L 27 2 L 36 3 L 42 -1 L 43 0 L 39 5.5 L 43 11 L 42 12 L 36 7.5 L 27 8.5 L 34 16 L 32 17.5 L 18 9.5 L 0 11 Z"
              fill="#ff9a00"
            />
          </g>
        </svg>

        {/* Main columns */}
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-14 pt-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-3">
            <a
              href="#home"
              className={`group inline-flex items-center gap-3 rounded-xl ${focusRing}`}
            >
              <img
                src="/company_logo.png"
                alt="ABL Travels Logo"
                className="size-12 shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
              />
              <span className="leading-none">
                <span className="block text-2xl font-extrabold italic tracking-tight text-white">
                  ABL <span className="text-[#4da3f5]">Travels</span>
                </span>
                <span className="mt-1 block font-script text-lg leading-none text-[#ffb84d]">
                  China &amp; Beyond
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-[300px] text-sm leading-7 text-[#9db3cb]">
              Your trusted travel partner for China visa processing,
              international tours and unforgettable travel experiences.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#b8cadd] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0d81f0] hover:bg-[#0d81f0] hover:text-white ${focusRing}`}
                >
                  <s.icon className="size-[18px]" />
                </a>
              ))}
            </div>

            {/* Script tagline over the lower-left scenery */}
            <p
              aria-hidden="true"
              className="mt-8 -rotate-3 select-none font-script text-[42px] leading-[1.05] text-white/95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] lg:text-[46px]"
            >
              Travel
              <br />
              <span className="ml-4">Beyond Borders</span>
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="lg:col-span-2">
            <ColumnHeading>Quick Links</ColumnHeading>
            <LinkList
              links={FOOTER_LINKS.quick}
              withArrows={['Visa Services', 'Tour Packages']}
            />
          </nav>

          {/* Services */}
          <nav aria-label="Our services" className="lg:col-span-2">
            <ColumnHeading>Our Services</ColumnHeading>
            <LinkList links={FOOTER_LINKS.services} />
          </nav>

          {/* Destinations */}
          <nav aria-label="Popular destinations" className="lg:col-span-2">
            <ColumnHeading>Popular Destinations</ColumnHeading>
            <LinkList links={FOOTER_LINKS.destinations} />
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <ColumnHeading>Contact Information</ColumnHeading>

            <ul role="list" className="mt-5 space-y-4 text-sm text-[#9db3cb]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#4da3f5]" aria-hidden="true" />
                <address className="not-italic leading-snug">
                  House #1/B, Road #126,
                  <br />
                  Gulshan 01, Dhaka 1212, Bangladesh
                </address>
              </li>

              {PHONES.map((number) => (
                <li key={number} className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-[#4da3f5]" aria-hidden="true" />
                  <a
                    href={toTel(number)}
                    className={`rounded transition-colors hover:text-white ${focusRing}`}
                  >
                    {number}
                  </a>
                </li>
              ))}

              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#4da3f5]" aria-hidden="true" />
                <a
                  href={`mailto:${EMAIL}`}
                  className={`break-all rounded transition-colors hover:text-white ${focusRing}`}
                >
                  {EMAIL}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-[#4da3f5]" aria-hidden="true" />
                <div className="leading-snug">
                  Sunday – Thursday
                  <br />
                  9:00 AM – 6:00 PM
                </div>
              </li>
            </ul>

            <a
              href="https://maps.google.com/?q=Gulshan+1,+Dhaka"
              target="_blank"
              rel="noreferrer"
              className={`group mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#ff9a00] hover:bg-[#ff9a00] hover:text-[#061a33] ${focusRing}`}
            >
              <MapPin className="size-4" aria-hidden="true" />
              <span>View on map</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Value badges */}
        <div className="relative z-10 border-t border-white/10">
          <ul
            role="list"
            className="mx-auto grid max-w-7xl grid-cols-1 gap-y-5 px-4 py-7 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:divide-x lg:divide-white/10 lg:px-8"
          >
            {VALUE_BADGES.map((b) => {
              const Icon = BADGE_ICONS[b.icon]
              return (
                <li
                  key={b.title}
                  className="flex items-center gap-3.5 sm:justify-center lg:px-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#0d81f0]/40 bg-[#0d81f0]/10 text-[#4da3f5]">
                    {Icon && <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />}
                  </span>
                  <p className="text-sm font-semibold leading-tight text-white">
                    {b.title}
                    <span className="mt-0.5 block text-xs font-normal text-[#8aa2bc]">
                      {b.sub}
                    </span>
                  </p>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Copyright and payment methods */}
        <div className="relative z-10 border-t border-white/5 bg-[#030d1a]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-[#8aa2bc] sm:px-6 md:flex-row lg:px-8">
            <p>© {new Date().getFullYear()} ABL Travels. All rights reserved.</p>

            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
            >
              <a href="#" className={`rounded transition-colors hover:text-white ${focusRing}`}>
                Privacy Policy
              </a>
              <span aria-hidden="true" className="text-white/20">|</span>
              <a href="#" className={`rounded transition-colors hover:text-white ${focusRing}`}>
                Terms &amp; Conditions
              </a>
              <span aria-hidden="true" className="text-white/20">|</span>
              <a href="#" className={`rounded transition-colors hover:text-white ${focusRing}`}>
                Refund Policy
              </a>
              <span aria-hidden="true" className="text-white/20">|</span>
              <a href="#" className={`rounded transition-colors hover:text-white ${focusRing}`}>
                Sitemap
              </a>
            </nav>

            <PaymentBadges />
          </div>
        </div>
      </div>
    </footer>
  )
}