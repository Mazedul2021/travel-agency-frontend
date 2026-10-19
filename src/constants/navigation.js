/**
 * Navigation and Link Constants for ABL Travels
 */

// Menu order matches the design: Home, Visa, Tour Packages, Destinations,
// B2B Partner, About Us, Contact Us.
// `children` (optional) = dropdown items. `hasDropdown` mirrors it so the
// existing Header can keep using the flag to show the chevron.
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Visa',
    href: '/visa',
    hasDropdown: true,
    children: [
      { label: 'Visa Services', href: '/visa' },
      { label: 'Visa Gallery', href: '/gallery#visa-gallery' },
    ],
  },
  {
    label: 'Tour Packages',
    href: '/tour-packages',
    hasDropdown: true,
    children: [
      { label: 'All Packages', href: '/tour-packages' },
      { label: 'Tour Gallery', href: '/gallery#tour-gallery' },
    ],
  },
  { label: 'Destinations', href: '/tour-packages' },
  { label: 'B2B Partner', href: '/b2b' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact Us', href: '/contact' },
]

// In page order. navHref is the nav link lit while the section is on screen, null lights none.
export const NAV_SECTIONS = [
  { id: 'home', navHref: '/' },
  { id: 'packages', navHref: '/tour-packages' },
  { id: 'services', navHref: null },
  { id: 'about', navHref: '/#about' },
  { id: 'contact', navHref: '/#contact' },
]

export const FOOTER_LINKS = {
  quick: [
    'Home',
    'About Us',
    'Visa Services',
    'Tour Packages',
    'Gallery',
    'Custom Tour',
    'Become a Partner',
    'Corporate Travel',
    'Contact Us',
  ],
  services: [
    'China Visa Processing',
    'Tour Packages',
    'Custom Tour Planning',
    'Corporate Travel',
    'Group Tours',
    'Visa Consultation',
    'Travel Insurance',
    'Travel Support',
  ],
  destinations: [
    'China',
    'Thailand',
    'Malaysia',
    'Singapore',
    'Dubai',
    'Bali',
    'Vietnam',
    'Bangladesh',
  ],
}
