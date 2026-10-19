/**
 * Seed data for the tour search results page
 * (src/pages/TourSearchResultsPage.jsx).
 *
 * Exported shapes match what the page and its card components render:
 *   CITY_SEARCH_RESULTS_PARIS / EXTRA_PARIS_TOURS : SearchResultCard
 *   TOP_SIGHTS_PARIS                             : image + activitiesCount tiles
 *   GO_BEYOND_PARIS                              : inline card + TourDetailModal
 *   TRAVEL_GUIDES_PARIS                          : { featured, articles[] }
 *   RECOMMENDED_LIST_PARIS                       : compact list rows
 *   PARIS_FAQS                                   : { question, answer }
 *
 * Tours carry a `category` used by the filter pills, and a `price` /
 * `rating` used by the price + rating filters in the Filters modal.
 */

const img = (id, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/** Categories align with the FILTER_PILLS in TourSearchResultsPage.jsx. */
const CATEGORIES = [
  'Boat cruises',
  'Dining cruises',
  'Photoshoots',
  'For kids',
  'Food & drink',
  'Walking tours',
]

/** Primary grid of results shown for Delhi search. */
export const CITY_SEARCH_RESULTS_DELHI = [
  {
    id: 'delhi-city-tour',
    title: 'Delhi: Private Full-Day City Tour of Old and New Delhi',
    image:
      'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=395%2Cheight=400%2Cdpr=2/tour_img/ef42dd0b7ba2ca26d721e3e26cae5b00e556b7e65a784641dc8f9f9003ee9fad.jpeg',
    price: 45,
    originalPrice: 55,
    discounted: true,
    rating: 4.9,
    reviewsCount: '2,450',
    context: 'DELHI • PRIVATE FULL DAY',
    city: 'Delhi',
    country: 'India',
    duration: '8 hours',
    category: 'Walking tours',
    perk: 'Private AC car, live guide, hotel pickup & tuk-tuk ride included',
    badge: 'Top rated',
    badgeType: 'best-match',
    highlights: [
      'Experience Old Delhi on a tuk-tuk through the bazaar',
      'Visit Qutub Minar, Humayun’s Tomb and Lotus Temple',
      'Private tour guide and private taxi for personalized comfort',
    ],
    included: ['Private AC vehicle', 'Professional Guide', 'Pickup & drop-off', 'Water bottles'],
  },
  {
    id: 'delhi-taj-mahal-express',
    title: 'From Delhi: Taj Mahal & Agra Fort Day Tour by Express Train',
    image:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    price: 79,
    rating: 4.9,
    reviewsCount: '4,812',
    context: 'AGRA & DELHI • EXPRESS TRAIN',
    city: 'Delhi',
    country: 'India',
    duration: '12 hours',
    category: 'Walking tours',
    perk: 'Fast Gatimaan Express train tickets, monument entries & lunch',
    badge: 'Best seller',
    badgeType: 'critical',
    highlights: [
      'Guided tour of the Taj Mahal and Agra Fort',
      'Round-trip Gatimaan train tickets',
      'Buffet lunch at a 5-star hotel',
    ],
    included: ['Train tickets', 'Buffet lunch', 'Tour guide', 'Monuments entry'],
  },
  {
    id: 'delhi-food-market-walk',
    title: 'Old Delhi Street Food Tasting & Chandni Chowk Bazaar Walk',
    image:
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    price: 32,
    rating: 4.8,
    reviewsCount: '1,490',
    context: 'OLD DELHI • FOOD & DRINK',
    city: 'Delhi',
    country: 'India',
    duration: '3 hours',
    category: 'Food & drink',
    perk: '7 authentic street food tastings and spice market visit',
    badge: 'Top rated',
    badgeType: 'best-match',
    highlights: [
      'Seven street food tastings including paranthas and jalebi',
      'Tuk-tuk ride through narrow alleyways',
      'Visit rooftop spice market overlook',
    ],
    included: ['All food tastings', 'Tuk-tuk ride', 'Foodie local guide'],
  },
]

/** Primary grid of results shown for a Paris search. */
export const CITY_SEARCH_RESULTS_PARIS = [
  {
    id: 'disneyland-paris-1day',
    title: 'Disneyland Paris: 1-Day Ticket with Hotel Transfer',
    image: img('1597466599360-3b9775841aec'),
    price: 109,
    rating: 4.7,
    reviewsCount: '24,310',
    context: 'PARIS • THEME PARK',
    city: 'Paris',
    country: 'France',
    duration: 'Full day',
    category: 'For kids',
    perk: 'Round-trip transfer from central Paris included',
    badge: 'Best match',
    badgeType: 'best-match',
    highlights: [
      'One-day access to both Disneyland Park and Walt Disney Studios',
      'Door-to-door coach transfer',
      'Free cancellation up to 24 hours in advance',
    ],
    included: ['1-day park ticket', 'Hotel transfers', 'Free cancellation'],
  },
  {
    id: 'paris-louvre-direct',
    title: 'Louvre Museum Fast-Track Entry with Audio Guide',
    image: img('1499856871958-5b9627545d1a'),
    price: 59,
    rating: 4.8,
    reviewsCount: '12,480',
    context: 'PARIS • MUSEUM',
    city: 'Paris',
    country: 'France',
    duration: '2 hours',
    category: 'Walking tours',
    perk: 'Skip the ticket line and explore at your own pace',
    badge: 'Likely to sell out',
    badgeType: 'critical',
    highlights: [
      'Timed fast-track entry',
      'Audio guide in 11 languages',
      'See the Mona Lisa and Venus de Milo',
    ],
    included: ['Skip-the-line entry', 'Audio guide'],
  },
  {
    id: 'paris-seine-cruise',
    title: 'Seine River Cruise: Paris by Night',
    image: img('1502602898657-3e91760cbb34'),
    price: 19,
    rating: 4.6,
    reviewsCount: '18,902',
    context: 'PARIS • BOAT CRUISE',
    city: 'Paris',
    country: 'France',
    duration: '1 hour',
    category: 'Boat cruises',
    perk: 'Illuminated landmarks reflected on the water',
    badge: 'New',
    badgeType: 'new',
    highlights: [
      'Open-air deck for photos',
      'Live commentary on 20+ sights',
      'Optional champagne upgrade',
    ],
    included: ['1-hour cruise', 'Audio commentary'],
  },
  {
    id: 'paris-photoshoot-1',
    title: 'Private Photoshoot at Iconic Paris Landmarks',
    image: img('1520939817895-060bdaf4fe1b'),
    price: 145,
    rating: 4.9,
    reviewsCount: '1,240',
    context: 'PARIS • PHOTOSHOOT',
    city: 'Paris',
    country: 'France',
    duration: '1 hour',
    category: 'Photoshoots',
    perk: 'Professional photographer and edited digital gallery',
    highlights: [
      '60-minute session with a local photographer',
      '30+ edited high-resolution photos',
      'Posing guidance provided',
    ],
    included: ['Photographer', '30+ edited photos'],
  },
  {
    id: 'paris-dinner-cruise',
    title: 'Seine Dinner Cruise with Live Music',
    image: img('1559339352-11d035aa65de'),
    price: 118,
    rating: 4.5,
    reviewsCount: '5,690',
    context: 'PARIS • DINING CRUISE',
    city: 'Paris',
    country: 'France',
    duration: '2.5 hours',
    category: 'Dining cruises',
    perk: 'Three-course French menu while gliding past the Eiffel Tower',
    highlights: [
      'Three-course seated dinner',
      'Live music on board',
      'Window table guaranteed',
    ],
    included: ['Dinner', 'Live music', 'Cruise'],
  },
  {
    id: 'paris-food-tour',
    title: 'Le Marais Evening Food & Wine Tour',
    image: img('1414235077428-338989a2e8c0'),
    price: 74,
    rating: 4.9,
    reviewsCount: '3,102',
    context: 'PARIS • FOOD & DRINK',
    city: 'Paris',
    country: 'France',
    duration: '3.5 hours',
    category: 'Food & drink',
    perk: 'Six tastings across the historic Marais district',
    highlights: [
      'Cheese, charcuterie and macaron tastings',
      'Wine at a family-run caveau',
      'Hidden courtyards tour',
    ],
    included: ['6 tastings', '2 glasses of wine'],
  },
  {
    id: 'paris-latin-quarter',
    title: 'Latin Quarter Walking Tour with Sorbonne',
    image: img('1560840881-6b0d0f0f0f0f'),
    price: 34,
    rating: 4.6,
    reviewsCount: '2,870',
    context: 'PARIS • WALKING TOUR',
    city: 'Paris',
    country: 'France',
    duration: '2 hours',
    category: 'Walking tours',
    perk: 'Shakespeare & Company, the Panthéon and the Sorbonne',
    highlights: [
      'Expert historian guide',
      'Pantheon exterior visit',
      'Shakespeare & Company bookshop',
    ],
    included: ['Live guide', 'Small group'],
  },
  {
    id: 'paris-kids-science',
    title: 'Cité des Sciences: Family Ticket for Kids',
    image: img('1560831686-3d3d3d3d3d3d'),
    price: 42,
    rating: 4.4,
    reviewsCount: '1,930',
    context: 'PARIS • FOR KIDS',
    city: 'Paris',
    country: 'France',
    duration: '4 hours',
    category: 'For kids',
    perk: 'Hands-on science exhibits children can touch and explore',
    highlights: [
      'All permanent exhibitions',
      'Geode IMAX screen option',
      'Right next to the Canal Saint-Martin',
    ],
    included: ['Museum entry', 'Interactive exhibits'],
  },
]

/** Extra results appended when "Show more" is pressed. */
export const EXTRA_PARIS_TOURS = [
  {
    id: 'paris-montmartre-extra',
    title: 'Montmartre & Sacré-Cœur Guided Walk',
    image: img('1549144511-f099e773c147'),
    price: 39,
    rating: 4.5,
    reviewsCount: '4,215',
    context: 'PARIS • WALKING TOUR',
    city: 'Paris',
    country: 'France',
    duration: '2 hours',
    category: 'Walking tours',
    perk: 'Artists’ quarter, vineyards and the Basilica',
    highlights: ['Sacré-Cœur Basilica', 'Place du Tertre', 'Last vineyard in Paris'],
    included: ['Local guide'],
  },
  {
    id: 'paris-boat-daylight',
    title: 'Daytime Seine Cruise with Open-Top Bus',
    image: img('1431274172761-fca41d930114'),
    price: 44,
    rating: 4.4,
    reviewsCount: '8,120',
    context: 'PARIS • BOAT CRUISE',
    city: 'Paris',
    country: 'France',
    duration: '2 hours',
    category: 'Boat cruises',
    perk: 'Hop-on hop-off bus plus a river cruise combo',
    highlights: ['24-hour bus pass', '1-hour cruise', 'Audio guide'],
    included: ['Bus pass', 'River cruise'],
  },
  {
    id: 'paris-moulin-rouge',
    title: 'Moulin Rouge: Féerie Show with Champagne',
    image: img('1516450360452-9312f5e86fc7'),
    price: 199,
    rating: 4.6,
    reviewsCount: '3,410',
    context: 'PARIS • DINING CRUISE',
    city: 'Paris',
    country: 'France',
    duration: '2 hours',
    category: 'Dining cruises',
    perk: 'Iconic cabaret with a glass of champagne',
    highlights: ['Half bottle of champagne', '50 performers', 'Reserved seating'],
    included: ['Show ticket', 'Champagne'],
  },
  {
    id: 'paris-cheese-class',
    title: 'French Cheese & Wine Tasting Class',
    image: img('1486297678162-eb2a19b0a32d'),
    price: 79,
    rating: 4.8,
    reviewsCount: '1,540',
    context: 'PARIS • FOOD & DRINK',
    city: 'Paris',
    country: 'France',
    duration: '2.5 hours',
    category: 'Food & drink',
    perk: 'Learn to pair five cheeses like a Parisian',
    highlights: ['5 regional cheeses', '3 wines', 'Recipe card to take home'],
    included: ['Tasting session', 'Wine pairing'],
  },
]

/** "Top sights in {city}" image tiles. */
export const TOP_SIGHTS_PARIS = [
  { name: 'Eiffel Tower', image: img('1511739001486-6bfe10ce785f', 400), activitiesCount: '312 activities' },
  { name: 'Louvre Museum', image: img('1499856871958-5b9627545d1a', 400), activitiesCount: '186 activities' },
  { name: 'Notre-Dame', image: img('1478391679764-b2d8b3cd1e94', 400), activitiesCount: '128 activities' },
  { name: 'Musée d’Orsay', image: img('1544207240-5a1e1e1e1e1e', 400), activitiesCount: '94 activities' },
  { name: 'Arc de Triomphe', image: img('1549144511-f099e773c147', 400), activitiesCount: '77 activities' },
  { name: 'Sacré-Cœur', image: img('1560840881-6b0d0f0f0f0f', 400), activitiesCount: '102 activities' },
  { name: 'Palace of Versailles', image: img('1591534577302-1cc7d31c3f4d', 400), activitiesCount: '63 activities' },
]

/** "Go beyond {city}" day-trip cards. */
export const GO_BEYOND_PARIS = [
  {
    id: 'beyond-versailles',
    title: 'Versailles Palace & Gardens Guided Tour',
    image: img('1591534577302-1cc7d31c3f4d'),
    price: 89,
    rating: 4.7,
    reviewsCount: '6,740',
    context: 'VERSAILLES',
    city: 'Versailles',
    country: 'France',
    duration: '7 hours',
    category: 'Landmarks',
    perk: 'Round-trip transport and skip-the-line entry',
    badge: 'Top pick',
    highlights: ['Hall of Mirrors', 'Royal apartments', 'Gardens free time'],
    included: ['Transport', 'Entry ticket', 'Guide'],
  },
  {
    id: 'beyond-giverny',
    title: 'Monet’s Garden at Giverny Day Trip',
    image: img('1470770903676-69b98201ea1c'),
    price: 72,
    rating: 4.6,
    reviewsCount: '2,340',
    context: 'GIVERNY',
    city: 'Giverny',
    country: 'France',
    duration: '6 hours',
    category: 'Nature & Relaxation',
    perk: 'Walk the water lily pond that inspired Monet',
    highlights: ['Claude Monet’s house', 'Japanese bridge', 'Flower gardens'],
    included: ['Transport', 'Entrance fee'],
  },
  {
    id: 'beyond-champagne',
    title: 'Champagne Region: Reims & Épernay Tasting',
    image: img('1510812431401-41d2bd2722f3'),
    price: 135,
    rating: 4.8,
    reviewsCount: '1,760',
    context: 'CHAMPAGNE',
    city: 'Reims',
    country: 'France',
    duration: '8 hours',
    category: 'Food & drink',
    perk: 'Two cellar visits with guided tastings',
    badge: 'Originals by GetYourGuide',
    highlights: ['Reims Cathedral', '2 cellar tours', 'Sparkling wine tasting'],
    included: ['Transport', '2 tastings', 'Guide'],
  },
  {
    id: 'beyond-loire',
    title: 'Loire Valley Châteaux & Wine Tour',
    image: img('1596627116790-af6f96d640a5'),
    price: 124,
    rating: 4.5,
    reviewsCount: '980',
    context: 'LOIRE VALLEY',
    city: 'Tours',
    country: 'France',
    duration: '9 hours',
    category: 'Landmarks',
    perk: 'Visit two fairytale châteaux with wine tasting',
    highlights: ['Chambord', 'Chenonceau', 'Wine tasting'],
    included: ['Transport', '2 entries', 'Tasting'],
  },
]

/** Travel guide editorial block: one featured + four compact rows. */
export const TRAVEL_GUIDES_PARIS = {
  featured: {
    id: 'guide-featured-1',
    image: img('1431274172761-fca41d930114', 900),
    title: 'The perfect 48 hours in Paris: a local’s itinerary',
    excerpt:
      'From a quiet croissant in the 6th to sunset over the Seine, this two-day plan hits the landmarks without the queue fatigue — plus the neighbourhood cafés the guidebooks skip. We break down the best metro strategy, when to book timed entries, and where to catch the city’s most photogenic golden hour.',
    author: 'Camille Rousseau',
    date: 'Aug 12, 2026',
  },
  articles: [
    {
      id: 'guide-a1',
      image: img('1502602898657-3e91760cbb34', 400),
      title: '10 things to do in Paris at night',
      excerpt: 'Illuminated cruises, rooftop bars and late-opening museums that come alive after dark.',
      author: 'Camille Rousseau',
      date: 'Aug 4, 2026',
    },
    {
      id: 'guide-a2',
      image: img('1499856871958-5b9627545d1a', 400),
      title: 'How to visit the Louvre without the crowds',
      excerpt: 'The entry times and side doors that let you skip the pyramid line entirely.',
      author: 'Thomas Meyer',
      date: 'Jul 28, 2026',
    },
    {
      id: 'guide-a3',
      image: img('1511739001486-6bfe10ce785f', 400),
      title: 'Eiffel Tower: which ticket is worth it',
      excerpt: 'Stairs vs. lift, summit access, and the best time slot for photos.',
      author: 'Camille Rousseau',
      date: 'Jul 19, 2026',
    },
    {
      id: 'guide-a4',
      image: img('1414235077428-338989a2e8c0', 400),
      title: 'A food lover’s guide to Le Marais',
      excerpt: 'Where to find the best falafel, pastry and natural wine in the district.',
      author: 'Sophie Laurent',
      date: 'Jul 9, 2026',
    },
  ],
}

/** Compact "most recommended" list rows. */
export const RECOMMENDED_LIST_PARIS = [
  {
    id: 'rec-1',
    image: img('1511739001486-6bfe10ce785f', 300),
    title: 'Eiffel Tower summit by elevator',
    description: 'Priority access to the top for the best panoramic view over Paris.',
  },
  {
    id: 'rec-2',
    image: img('1502602898657-3e91760cbb34', 300),
    title: 'Seine river cruise with champagne',
    description: 'A one-hour loop past Notre-Dame, the Louvre and the Eiffel Tower.',
  },
  {
    id: 'rec-3',
    image: img('1499856871958-5b9627545d1a', 300),
    title: 'Louvre skip-the-line guided tour',
    description: 'See the masterpieces with a licensed art historian in a small group.',
  },
  {
    id: 'rec-4',
    image: img('1591534577302-1cc7d31c3f4d', 300),
    title: 'Palace of Versailles day trip',
    description: 'Round-trip transport and timed entry to the Hall of Mirrors.',
  },
  {
    id: 'rec-5',
    image: img('1414235077428-338989a2e8c0', 300),
    title: 'Le Marais food & wine tasting',
    description: 'Six stops through Paris’s historic Jewish and artisan quarter.',
  },
  {
    id: 'rec-6',
    image: img('1560840881-6b0d0f0f0f0f', 300),
    title: 'Montmartre & Sacré-Cœur walk',
    description: 'Explore the artists’ quarter and the last vineyard in the city.',
  },
  {
    id: 'rec-7',
    image: img('1478391679764-b2d8b3cd1e94', 300),
    title: 'Notre-Dame exterior & Île de la Cité',
    description: 'Learn the cathedral’s history and restoration from a local guide.',
  },
  {
    id: 'rec-8',
    image: img('1544207240-5a1e1e1e1e1e', 300),
    title: 'Musée d’Orsay impressionist tour',
    description: 'Monet, Renoir and Van Gogh inside the former railway station.',
  },
  {
    id: 'rec-9',
    image: img('1549144511-f099e773c147', 300),
    title: 'Arc de Triomphe rooftop access',
    description: 'Climb 284 steps for a view straight down the Champs-Élysées.',
  },
  {
    id: 'rec-10',
    image: img('1559339352-11d035aa65de', 300),
    title: 'Paris night dinner cruise',
    description: 'Three courses, live music and the city lit up all around you.',
  },
]

/** FAQ accordion content. */
export const PARIS_FAQS = [
  {
    question: 'What is the best time of year to visit Paris?',
    answer:
      'April to June and September to October offer mild weather and fewer crowds. July and August are warm and busy, while winter (November to February) has the shortest lines and lowest prices, though some outdoor attractions close early.',
  },
  {
    question: 'Do I need to book attraction tickets in advance?',
    answer:
      'For the Louvre, Eiffel Tower summit and Versailles, timed-entry tickets sell out days ahead in peak season, so booking online is strongly recommended. Free-with-ticket sites and walking tours also benefit from advance reservations.',
  },
  {
    question: 'How do I get around the city?',
    answer:
      'The Métro is the fastest option; a carnet of tickets or a Navigo Easy card works across metro, bus and RER. Central Paris is very walkable, and bike-share (Vélib’) is popular for longer hops along the Seine.',
  },
  {
    question: 'How many days do I need in Paris?',
    answer:
      'Three full days covers the headline sights — Eiffel Tower, Louvre, Notre-Dame area and Montmartre. Add a fourth day for Versailles or a Champagne region day trip.',
  },
  {
    question: 'Is Paris an expensive city for tourists?',
    answer:
      'It can be, but it varies. Museum passes, advance tickets and neighbourhood bistros keep costs manageable. Many landmarks are free on the first Sunday of the month, and river cruises start at around $20.',
  },
  {
    question: 'Do people speak English in Paris?',
    answer:
      'Most tourism workers and younger Parisians speak English, especially in hotels, museums and restaurants. Learning a few French greetings goes a long way and is always appreciated.',
  },
]
