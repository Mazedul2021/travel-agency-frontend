// Gallery fallback data (used when the API is unreachable).
//
// HOW TO ADD IMAGES: paste one URL (or a /public path) per line below.
//   - full URL:    'https://your-cdn.com/tour-1.jpg'
//   - local file:  '/gallery/tours/tour-01.jpg'  (file lives in public/gallery/tours/)
// Order = newest first. Visa photos must have faces and personal details
// blurred BEFORE upload. A broken image shows a gradient placeholder.

const TOUR_IMAGES = [
  {
    country: 'Thailand', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10',
  },
  { country: 'Singapore', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'Japan', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'China', url: '/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'Dubai', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'Maldives', url: '/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'Italy', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'Thailand', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'Singapore', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
  { country: 'Greece', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9Z--5V83pQDU8xQR2XeE9RZcniKMzR1OPGGnLusWA51p3c84y0bOuGQ&s=10' },
]
const VISA_IMAGES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAz1ifQ6NTPGEV75amx5q7AoVQLecTdM-ps7vBjpiPA&s',
  // ...
]
// ---- no need to edit below this line ----
const day = (n) => new Date(Date.UTC(2026, 9, 16 - n)).toISOString()

export const FALLBACK_TOURS = TOUR_IMAGES.map((item, i) => ({
  id: `t${i + 1}`,
  country: item.country,
  type: 'Tour Moment',
  image: item.url,
  createdAt: day(i),
}))

export const FALLBACK_VISAS = VISA_IMAGES.map((url, i) => ({
  id: `v${i + 1}`,
  country: 'Visa Approved',
  type: 'Success Story',
  image: url,
  createdAt: day(i),
}))