/**
 * Navigation and Link Constants for ABL Travels
 */

// Menu order: Home, Visa, Tour Packages, Gallery, About Us, Contact Us.
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Visa', href: '/visa' },
  { label: 'Tour Packages', href: '/tour-packages' },
  { label: 'Gallery', href: '/gallery' },
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
