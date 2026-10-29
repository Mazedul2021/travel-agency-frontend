import { useState, useRef, useEffect, useMemo } from 'react'
import {
  X,
  Calendar,
  Menu,
  Maximize2,
  Minimize2,
  Plus,
  Trash2,
  MoreHorizontal,
  Compass,
  BedDouble,
  CheckCircle2,
  Sparkles,
  Pencil,
  MapPin,
  Search,
  ChevronDown,
  ChevronLeft,
  PlusCircle,
} from 'lucide-react'

export const ALL_BROWSE_ATTRACTIONS = [
  {
    id: 'palace-museum',
    name: 'The Palace Museum',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Beijing',
    distance: '1.7 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'west-lake',
    name: 'West Lake',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Hangzhou',
    distance: '6.6 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'the-bund',
    name: 'The Bund',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Shanghai',
    distance: '1.8 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'badaling-great-wall',
    name: 'Badaling Great Wall',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Beijing',
    distance: '59.7 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'universal-beijing',
    name: 'Universal Beijing Resort',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Beijing',
    distance: '24.1 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'jeju-island',
    name: 'Jeju Island',
    heat: 10,
    award: 'No. 1 of Best Things to Do in South Korea',
    city: 'Jeju City',
    distance: '13.9 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'terracotta-museum',
    name: "Emperor Qinshihuang's Mausoleum Site Museum",
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: "Xi'an",
    distance: '33.9 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'shanghai-disney',
    name: 'Shanghai Disney Resort',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Shanghai',
    distance: '20.5 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'hong-kong-disneyland',
    name: 'Hong Kong Disneyland',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Hong Kong',
    distance: '14.2 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'qutb-minar',
    name: 'Qutb Minar & Archeological Complex',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Delhi',
    distance: '14.5 km from city center (straight-line)',
    image:
      'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=395%2Cheight=400%2Cdpr=2/tour_img/f53ae6d9b045f3d5dadc0c1613d74e5ecbdbbff9e1984060805fe91f77c4c253.jpeg',
    category: 'Attractions',
  },
  {
    id: 'humayuns-tomb',
    name: 'Humayun’s Tomb',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Delhi',
    distance: '5.2 km from city center (straight-line)',
    image:
      'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=395%2Cheight=400%2Cdpr=2/tour_img/c511d0b841dbc5e43feade83bfe0887459e9ea7b4f0c7f70bf08ed6489509836.jpeg',
    category: 'Attractions',
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal & Agra Fort',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Agra',
    distance: '3.8 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'louvre-museum',
    name: 'Louvre Museum & Glass Pyramid',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Paris',
    distance: '0.8 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower & Summit',
    heat: 10,
    award: '2026 Global 100 · Best Things to Do',
    city: 'Paris',
    distance: '4.1 km from city center (straight-line)',
    image:
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80',
    category: 'Attractions',
  },
]

export const EXISTING_TOUR_PACKAGES = [
  {
    id: 'delhi-full-day',
    title: 'Delhi: Private Full-Day City Tour of Old and New Delhi',
    destination: 'Delhi, India',
    places: [
      {
        name: 'Chandni Chowk',
        badge: 'Old Delhi',
        type: 'Heritage Bazaar & Rickshaw Walk',
        image:
          'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=395%2Cheight=400%2Cdpr=2/tour_img/c02037000e4f7f894ef00483793bbcef6cc82f39248a8f26c25d3c99e7d02805.jpeg',
      },
      {
        name: 'Jama Masjid',
        badge: 'Main stop',
        type: 'Grand Mughal Mosque',
        image:
          'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Red Fort, New Delhi',
        badge: 'Landmark',
        type: 'Historic Mughal Fort',
        image:
          'https://images.unsplash.com/photo-1592635196078-9fe3d54f2377?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Khari Baoli (Spice Market)',
        badge: 'Main stop',
        type: 'Asia’s Largest Spice Market',
        image:
          'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Gurudwara Bangla Sahib',
        badge: 'Main stop',
        type: 'Sikh Shrine & Langar Kitchen',
        image:
          'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Qutb Minar',
        badge: 'UNESCO Heritage',
        type: 'Victory Minaret & Complex',
        image:
          'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=395%2Cheight=400%2Cdpr=2/tour_img/f53ae6d9b045f3d5dadc0c1613d74e5ecbdbbff9e1984060805fe91f77c4c253.jpeg',
      },
      {
        name: 'India Gate & Rajpath',
        badge: 'Memorial',
        type: 'War Memorial & Central Avenue',
        image:
          'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=395%2Cheight=400%2Cdpr=2/tour_img/47a44f8c98cc132f3ba12a876c856bf7a0c7db5ae3f4f43ceae3643912a19e75.jpg',
      },
      {
        name: 'Parliament Building & Central Vista',
        badge: 'Govt precinct',
        type: 'Democratic Architecture',
        image:
          'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Humayun’s Tomb',
        badge: 'UNESCO Heritage',
        type: 'Mughal Garden Mausoleum',
        image:
          'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=395%2Cheight=400%2Cdpr=2/tour_img/c511d0b841dbc5e43feade83bfe0887459e9ea7b4f0c7f70bf08ed6489509836.jpeg',
      },
      {
        name: 'Laxmi Narayan Temple (Birla Mandir)',
        badge: 'Main stop',
        type: 'Historic Hindu Temple',
        image:
          'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Lotus Temple',
        badge: 'Main stop',
        type: 'Baháʼí House of Worship',
        image:
          'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Rashtrapati Bhavan',
        badge: 'Landmark',
        type: 'Presidential Palace',
        image:
          'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'taj-mahal-agra',
    title: 'From Delhi: Taj Mahal & Agra Fort Day Tour by Express Train',
    destination: 'Agra, India',
    places: [
      {
        name: 'Taj Mahal, Agra',
        badge: 'World Wonder',
        type: 'UNESCO Marble Mausoleum',
        image:
          'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Agra Fort',
        badge: 'UNESCO Heritage',
        type: 'Imperial Mughal Fortress',
        image:
          'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mehtab Bagh',
        badge: 'Sunset View',
        type: 'Moonlight River Gardens',
        image:
          'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tomb of I’timād-ud-Daulah (Baby Taj)',
        badge: 'Historical',
        type: 'Pietra Dura Masterpiece',
        image:
          'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'old-delhi-street-food',
    title: 'Old Delhi Street Food Tasting & Chandni Chowk Bazaar Walk',
    destination: 'Old Delhi, India',
    places: [
      {
        name: 'Paranthe Wali Gali',
        badge: 'Culinary',
        type: 'Traditional Fried Flatbreads',
        image:
          'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Khari Baoli Rooftop Spice Overlook',
        badge: 'Scenic',
        type: 'Panoramic Spice Market Vista',
        image:
          'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Dariba Kalan Jewelry Lane',
        badge: 'Artisan',
        type: '17th-Century Silver Street',
        image:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Fatehpuri Masjid',
        badge: 'Heritage',
        type: 'Historic Mughal Mosque',
        image:
          'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'paris-louvre',
    title: 'Skip-the-Line Louvre Museum Guided Tour',
    destination: 'Paris, France',
    places: [
      {
        name: 'Louvre Museum Glass Pyramid',
        badge: 'Iconic',
        type: 'Masterpiece Collections',
        image:
          'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mona Lisa & Renaissance Wing',
        badge: 'Top Highlight',
        type: 'Da Vinci Masterwork',
        image:
          'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Venus de Milo & Winged Victory',
        badge: 'Ancient Art',
        type: 'Greek Antiquities Hall',
        image:
          'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Tuileries Garden & Carrousel',
        badge: 'Scenic Walk',
        type: 'Royal Public Gardens',
        image:
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'paris-eiffel',
    title: 'Eiffel Tower Summit Access with Priority Entry',
    destination: 'Paris, France',
    places: [
      {
        name: 'Eiffel Tower Summit Observation Deck',
        badge: 'Panoramic',
        type: 'City Skyline Viewpoint',
        image:
          'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Champ de Mars',
        badge: 'Landmark',
        type: 'Public Greenspace',
        image:
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Trocadéro Esplanade',
        badge: 'Photo Spot',
        type: 'Iconic Tower Framing',
        image:
          'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'paris-versailles',
    title: 'Palace of Versailles Full-Day Trip from Paris',
    destination: 'Versailles, France',
    places: [
      {
        name: 'Hall of Mirrors (Palace of Versailles)',
        badge: 'Royal Palace',
        type: 'Baroque State Room',
        image:
          'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'The King’s Grand State Apartments',
        badge: 'Historic',
        type: 'Royal Residence Suites',
        image:
          'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Versailles Musical Gardens & Fountains',
        badge: 'UNESCO',
        type: 'Formal French Gardens',
        image:
          'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'The Grand Trianon & Queen’s Hamlet',
        badge: 'Heritage',
        type: 'Rustic Retreat',
        image:
          'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'paris-seine',
    title: 'Seine River Cruise with Champagne',
    destination: 'Paris, France',
    places: [
      {
        name: 'Notre-Dame Cathedral (from Seine)',
        badge: 'Gothic Icon',
        type: 'Medieval Facade View',
        image:
          'https://images.unsplash.com/photo-1478359844494-1092259d93e4?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Pont Neuf & Île de la Cité',
        badge: 'Scenic',
        type: 'Historic River Crossing',
        image:
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Musée d’Orsay Riverbank',
        badge: 'Cultural',
        type: 'Beaux-Arts Waterfront',
        image:
          'https://images.unsplash.com/photo-1520939817895-060bdef4dc1b?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'paris-montmartre',
    title: 'Montmartre & Sacré-Cœur Walking Tour',
    destination: 'Paris, France',
    places: [
      {
        name: 'Sacré-Cœur Basilica',
        badge: 'Top Landmark',
        type: 'Romano-Byzantine Dome',
        image:
          'https://images.unsplash.com/photo-1508050919630-b135583b29ab?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Place du Tertre Artists’ Square',
        badge: 'Bohemian',
        type: 'Open-Air Painter Plaza',
        image:
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Clos Montmartre Historic Vineyard',
        badge: 'Hidden Gem',
        type: 'Working Urban Vineyard',
        image:
          'https://images.unsplash.com/photo-1508050919630-b135583b29ab?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'goreme-balloon',
    title: 'Göreme Hot Air Balloon Ride at Sunrise',
    destination: 'Cappadocia, Turkey',
    places: [
      {
        name: 'Göreme Valley Sunrise Balloon Flight',
        badge: 'Aerial View',
        type: 'Hot Air Flight Experience',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Göreme Open-Air Museum',
        badge: 'UNESCO',
        type: 'Rock-Cut Byzantine Churches',
        image:
          'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Love Valley & Fairy Chimneys',
        badge: 'Natural Wonder',
        type: 'Volcanic Tuff Formations',
        image:
          'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
]

export default function CustomTourBuilderModal({
  isOpen,
  onClose,
  defaultDestination = 'Delhi',
  currentTour = null,
}) {
  const [activeTab, setActiveTab] = useState('itinerary') // 'itinerary' | 'ideas'
  const [activePill, setActivePill] = useState('overview')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [itineraryTitle, setItineraryTitle] = useState(() =>
    currentTour?.shortTitle ? `Custom ${currentTour.shortTitle}` : 'Itinerary for anywhere'
  )
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [departureDate, setDepartureDate] = useState('')
  const [minDate] = useState(() => new Date().toISOString().split('T')[0])
  const [days, setDays] = useState([
    {
      id: 'day-1',
      dayNumber: 1,
      title: 'Day 1 · Edit title',
      notes: '',
      isEditingNotes: false,
      transportation: [],
      attractions: [],
      stay: '',
    },
  ])
  const [toBePlannedPlaces, setToBePlannedPlaces] = useState([])
  const [isAddingPlace, setIsAddingPlace] = useState(false)
  const [newPlaceInput, setNewPlaceInput] = useState('')
  const [generalNotes, setGeneralNotes] = useState('')
  const [activeAddModal, setActiveAddModal] = useState(null) // { dayId, type: 'transport' | 'attractions' }
  const [selectedPackageFilter, setSelectedPackageFilter] = useState('all')
  const [placeSearchQuery, setPlaceSearchQuery] = useState('')
  const [customItemInput, setCustomItemInput] = useState('')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [openDayMenuId, setOpenDayMenuId] = useState(null)
  const [browsePlacesDayId, setBrowsePlacesDayId] = useState(null)
  const [browseActiveTab, setBrowseActiveTab] = useState('recommend') // 'recommend' | 'packages' | 'bookings' | 'saved'
  const [browseSearchQuery, setBrowseSearchQuery] = useState('')
  const [openTourPlacesDayId, setOpenTourPlacesDayId] = useState(null)
  const [tourPlaceSearch, setTourPlaceSearch] = useState('')

  // Flattened all tour package places for easy card list rendering
  const allTourPackagePlaces = useMemo(() => {
    const list = []
    EXISTING_TOUR_PACKAGES.forEach((pkg) => {
      pkg.places.forEach((p) => {
        list.push({
          ...p,
          packageId: pkg.id,
          packageTitle: pkg.title,
          destination: pkg.destination,
        })
      })
    })
    return list
  }, [])

  // Filtered tour package places for the custom selector
  const filteredTourPackagePlaces = useMemo(() => {
    let list = allTourPackagePlaces
    if (selectedPackageFilter !== 'all') {
      list = list.filter((p) => p.packageId === selectedPackageFilter)
    }
    if (tourPlaceSearch.trim()) {
      const q = tourPlaceSearch.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.packageTitle.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.badge?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q)
      )
    }
    return list
  }, [allTourPackagePlaces, selectedPackageFilter, tourPlaceSearch])

  // Helper to get image, location & badge for ANY attraction name
  const getAttractionDetails = (name) => {
    if (!name) return { name: '', image: '', city: '', badge: '', type: '' }
    const browseItem = ALL_BROWSE_ATTRACTIONS.find(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    )
    if (browseItem) {
      return {
        name: browseItem.name,
        image: browseItem.image,
        city: browseItem.city,
        badge: browseItem.category || 'Attractions',
        type: browseItem.award,
      }
    }
    for (const pkg of EXISTING_TOUR_PACKAGES) {
      const place = pkg.places.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      )
      if (place) {
        return {
          name: place.name,
          image:
            place.image ||
            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80',
          city: pkg.destination.split(',')[0],
          badge: place.badge,
          type: place.type,
          packageTitle: pkg.title,
        }
      }
    }
    return {
      name,
      image:
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80',
      city: 'Delhi',
      badge: 'Attraction',
      type: 'Tour Landmark',
    }
  }

  // Filtered browse attractions matching the reference design
  const filteredBrowseAttractions = useMemo(() => {
    if (!browseSearchQuery.trim()) return ALL_BROWSE_ATTRACTIONS
    const q = browseSearchQuery.toLowerCase()
    return ALL_BROWSE_ATTRACTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.award.toLowerCase().includes(q)
    )
  }, [browseSearchQuery])

  // Currently selected day for browsing places
  const currentBrowseDay = useMemo(
    () => days.find((d) => d.id === browsePlacesDayId),
    [days, browsePlacesDayId]
  )

  // Toggle attraction in day
  const handleToggleBrowseAttraction = (dayId, attractionName) => {
    const targetDay = days.find((d) => d.id === dayId)
    if (!targetDay) return
    const existing = targetDay.attractions.find((a) => a.text === attractionName)
    if (existing) {
      handleRemoveItem(dayId, 'attractions', existing.id)
    } else {
      handleAddItemToDay(dayId, 'attractions', attractionName)
    }
  }

  const dateInputRef = useRef(null)
  const overviewRef = useRef(null)
  const toBePlannedRef = useRef(null)
  const notesRef = useRef(null)

  // Filtered places for modal
  const filteredTourPlaces = useMemo(() => {
    let list = []
    EXISTING_TOUR_PACKAGES.forEach((pkg) => {
      if (selectedPackageFilter === 'all' || selectedPackageFilter === pkg.id) {
        pkg.places.forEach((p) => {
          list.push({
            ...p,
            packageId: pkg.id,
            packageTitle: pkg.title,
            destination: pkg.destination,
          })
        })
      }
    })
    if (placeSearchQuery.trim()) {
      const q = placeSearchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.packageTitle.toLowerCase().includes(q) ||
          p.badge?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q)
      )
    }
    return list
  }, [selectedPackageFilter, placeSearchQuery])

  // Featured places for Ideas tab
  const allFeaturedPlaces = useMemo(() => {
    const list = []
    EXISTING_TOUR_PACKAGES.forEach((pkg) => {
      pkg.places.forEach((p) => {
        list.push({ ...p, packageTitle: pkg.title, packageId: pkg.id })
      })
    })
    return list.slice(0, 10)
  }, [])

  // Scroll to section when pill clicked
  const scrollToSection = (pill) => {
    setActivePill(pill)
    if (pill === 'overview' && overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (pill === 'tobeplanned' && toBePlannedRef.current) {
      toBePlannedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (pill === 'notes' && notesRef.current) {
      notesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (pill.startsWith('day-')) {
      const el = document.getElementById(pill)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Add a new day
  const handleAddDay = () => {
    const nextNum = days.length + 1
    const newDay = {
      id: `day-${nextNum}`,
      dayNumber: nextNum,
      title: `Day ${nextNum} · Edit title`,
      notes: '',
      isEditingNotes: false,
      transportation: [],
      attractions: [],
      stay: '',
    }
    setDays((prev) => [...prev, newDay])
    setTimeout(() => scrollToSection(`day-${nextNum}`), 100)
  }

  // Remove a day
  const handleDeleteDay = (dayId) => {
    if (days.length <= 1) return
    setDays((prev) =>
      prev
        .filter((d) => d.id !== dayId)
        .map((d, index) => ({
          ...d,
          dayNumber: index + 1,
          id: `day-${index + 1}`,
          title: d.title.startsWith(`Day ${d.dayNumber}`)
            ? d.title.replace(`Day ${d.dayNumber}`, `Day ${index + 1}`)
            : d.title,
        }))
    )
    setOpenDayMenuId(null)
  }

  // Update Day Title
  const handleUpdateDayTitle = (dayId, newTitle) => {
    setDays((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, title: newTitle } : d))
    )
  }

  // Update Day Stay (text field)
  const handleUpdateDayStay = (dayId, stayText) => {
    setDays((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, stay: stayText } : d))
    )
  }

  // Add Item to Day
  const handleAddItemToDay = (dayId, type, item) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d
        if (type === 'transport') {
          return {
            ...d,
            transportation: [...d.transportation, { id: Date.now(), text: item }],
          }
        }
        if (type === 'attractions') {
          return {
            ...d,
            attractions: [...d.attractions, { id: Date.now(), text: item }],
          }
        }
        if (type === 'stay') {
          return {
            ...d,
            stay: item,
          }
        }
        return d
      })
    )
    setActiveAddModal(null)
    setCustomItemInput('')
  }

  // Remove Item from Day
  const handleRemoveItem = (dayId, type, itemId) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d
        if (type === 'transport') {
          return {
            ...d,
            transportation: d.transportation.filter((t) => t.id !== itemId),
          }
        }
        if (type === 'attractions') {
          return {
            ...d,
            attractions: d.attractions.filter((a) => a.id !== itemId),
          }
        }
        if (type === 'stay') {
          return { ...d, stay: '' }
        }
        return d
      })
    )
  }

  // Add place to plan later
  const handleAddPlace = () => {
    if (!newPlaceInput.trim()) return
    setToBePlannedPlaces((prev) => [...prev, newPlaceInput.trim()])
    setNewPlaceInput('')
    setIsAddingPlace(false)
  }

  // Remove place to plan later
  const handleRemovePlace = (index) => {
    setToBePlannedPlaces((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle final submission
  const handleSubmitPlan = (e) => {
    e.preventDefault()
    setIsSubmittedSuccess(true)
    setTimeout(() => {
      setIsSubmittedSuccess(false)
      setShowSubmitModal(false)
      onClose()
    }, 2500)
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-hidden animate-fade-in ${
        isFullScreen ? 'p-0' : ''
      }`}
    >
      <div
        className={`relative w-full bg-white flex flex-col shadow-2xl transition-all duration-300 ${
          isFullScreen
            ? 'h-full w-full rounded-none'
            : 'max-w-2xl max-h-[92vh] rounded-3xl border border-slate-200/90'
        }`}
      >
        {/* ──────────────────────────────────────────────────────────── */}
        {/* 1. TOP HEADER BAR                                             */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-6 py-3.5 bg-white shrink-0 z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Loop Route Icon */}
            <div className="flex items-center justify-center size-8 rounded-lg bg-blue-50 text-[#2c61fe] shrink-0">
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="18" r="3" />
                <path d="M6 9a9 9 0 0 0 9 9h3" />
              </svg>
            </div>

            <span className="text-slate-300 font-light">|</span>

            <Menu className="size-4 text-slate-800 shrink-0 cursor-pointer hover:text-blue-600 transition-colors" />

            {/* Editable Title */}
            {isEditingTitle ? (
              <input
                type="text"
                autoFocus
                value={itineraryTitle}
                onChange={(e) => setItineraryTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                className="text-sm sm:text-base font-bold text-[#121826] bg-slate-50 border border-blue-400 rounded-md px-2 py-0.5 outline-none max-w-[200px] sm:max-w-xs"
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                className="flex items-center gap-1.5 cursor-pointer group min-w-0"
                title="Click to edit title"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#121826] truncate group-hover:text-blue-600 transition-colors">
                  {itineraryTitle}
                </h3>
                <Pencil className="size-3 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            {/* Departure date button */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()
                }
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#2c61fe] hover:bg-blue-50/60 px-2 py-1 rounded-md transition-colors cursor-pointer"
              >
                <Calendar className="size-3.5 text-slate-400" />
                <span className="font-medium whitespace-nowrap">
                  {departureDate ? departureDate : 'Set departure date'}
                </span>
              </button>
              <input
                ref={dateInputRef}
                type="date"
                min={minDate}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="sr-only"
                tabIndex={-1}
              />
            </div>
          </div>

          {/* Right Header Actions: Fullscreen & Close */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullScreen ? (
                <Minimize2 className="size-4" />
              ) : (
                <Maximize2 className="size-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {browsePlacesDayId ? (
          /* ──────────────────────────────────────────────────────────── */
          /* BROWSE ALL PLACES / ADD TO DAY VIEW (EXACT USER SCREENSHOT)  */
          /* ──────────────────────────────────────────────────────────── */
          <div className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden">
            {/* Sub-header: Back arrow + "Add to Day X" */}
            <div className="flex items-center gap-3 px-4 pt-3.5 pb-2 bg-white shrink-0">
              <button
                type="button"
                onClick={() => setBrowsePlacesDayId(null)}
                className="p-1 -ml-1 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer rounded-full hover:bg-slate-100"
                aria-label="Back to itinerary"
              >
                <ChevronLeft className="size-6 text-slate-800" strokeWidth={2.5} />
              </button>
              <h4 className="text-base sm:text-lg font-bold text-[#121826]">
                Add to Day {currentBrowseDay?.dayNumber || 1}
              </h4>
            </div>

            {/* Search Input matching reference screenshot */}
            <div className="px-4 pb-2.5 bg-white shrink-0">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search anywhere in the world"
                  value={browseSearchQuery}
                  onChange={(e) => setBrowseSearchQuery(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-10 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Four navigation tabs: Recommend, Tour Packages, My Bookings, Saved places */}
            <div className="flex items-center gap-6 px-4 border-b border-slate-100 bg-white shrink-0 text-xs sm:text-sm overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setBrowseActiveTab('recommend')}
                className={`pb-2.5 font-bold transition-colors cursor-pointer relative shrink-0 ${
                  browseActiveTab === 'recommend'
                    ? 'text-[#0071eb]'
                    : 'text-slate-700 hover:text-slate-900 font-semibold'
                }`}
              >
                Recommend
                {browseActiveTab === 'recommend' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071eb] rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setBrowseActiveTab('packages')}
                className={`pb-2.5 transition-colors cursor-pointer relative shrink-0 ${
                  browseActiveTab === 'packages'
                    ? 'text-[#0071eb] font-bold'
                    : 'text-slate-700 hover:text-slate-900 font-semibold'
                }`}
              >
                Tour Packages
                {browseActiveTab === 'packages' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071eb] rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setBrowseActiveTab('bookings')}
                className={`pb-2.5 transition-colors cursor-pointer relative shrink-0 ${
                  browseActiveTab === 'bookings'
                    ? 'text-[#0071eb] font-bold'
                    : 'text-slate-700 hover:text-slate-900 font-medium'
                }`}
              >
                My Bookings
                {browseActiveTab === 'bookings' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071eb] rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setBrowseActiveTab('saved')}
                className={`pb-2.5 transition-colors cursor-pointer relative shrink-0 ${
                  browseActiveTab === 'saved'
                    ? 'text-[#0071eb] font-bold'
                    : 'text-slate-700 hover:text-slate-900 font-medium'
                }`}
              >
                Saved places
                {browseActiveTab === 'saved' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0071eb] rounded-full" />
                )}
              </button>
            </div>

            {/* Attractions List Area */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {browseActiveTab === 'recommend' && (
                <>
                  {filteredBrowseAttractions.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs space-y-1">
                      <p>No places found matching "{browseSearchQuery}"</p>
                      <button
                        type="button"
                        onClick={() => setBrowseSearchQuery('')}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    filteredBrowseAttractions.map((item) => {
                      const isAdded = currentBrowseDay?.attractions?.some(
                        (a) => a.text === item.name
                      )
                      return (
                        <div
                          key={item.id}
                          className={`px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                            isAdded ? 'bg-blue-50/40' : 'hover:bg-slate-50/70'
                          }`}
                        >
                          {/* Left: Square Thumbnail with "Attractions" overlay */}
                          <div className="relative size-18 sm:size-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="size-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/65 py-0.5 text-center">
                              <span className="text-[10px] font-bold text-white tracking-tight leading-none block">
                                {item.category || 'Attractions'}
                              </span>
                            </div>
                          </div>

                          {/* Middle: Details */}
                          <div className="flex-1 min-w-0 flex flex-col gap-1 pr-1">
                            {/* Title + Flame */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-[#121826] text-sm leading-snug truncate">
                                {item.name}
                              </span>
                              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#ff4d4f]">
                                <span className="text-xs">🔥</span>
                                {item.heat}
                              </span>
                            </div>

                            {/* Award line */}
                            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#8c531b] font-medium leading-tight">
                              <span className="inline-flex items-center px-1 py-0.2 rounded text-[10px] font-bold bg-[#fbf5ee] text-[#8c531b] border border-[#e8d8c3]/60 shrink-0">
                                ❨Trip.Best❩
                              </span>
                              <span className="truncate">{item.award}</span>
                            </div>

                            {/* Location & Distance */}
                            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 leading-tight">
                              <MapPin className="size-3 text-slate-400 shrink-0" />
                              <span className="font-medium text-slate-600">{item.city}</span>
                              <span className="text-slate-300">|</span>
                              <span className="truncate">{item.distance}</span>
                            </div>
                          </div>

                          {/* Right: Sparkle + Plus/Check button */}
                          <div className="flex items-center gap-3 shrink-0 self-center pl-1">
                            <button
                              type="button"
                              className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                              title="AI highlights & details"
                              onClick={() => {}}
                            >
                              <Sparkles className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleBrowseAttraction(browsePlacesDayId, item.name)
                              }
                              className={`p-1 transition-all cursor-pointer ${
                                isAdded
                                  ? 'text-emerald-600 hover:text-emerald-700'
                                  : 'text-slate-400 hover:text-[#0071eb]'
                              }`}
                              title={isAdded ? 'Remove from Day' : 'Add to Day'}
                            >
                              {isAdded ? (
                                <CheckCircle2 className="size-5 fill-emerald-50 text-emerald-600" />
                              ) : (
                                <PlusCircle className="size-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </>
              )}

              {browseActiveTab === 'packages' && (
                <>
                  {/* Tour Package Filter Pills */}
                  <div className="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setSelectedPackageFilter('all')}
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedPackageFilter === 'all'
                          ? 'bg-[#121826] text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      All Packages ({allTourPackagePlaces.length})
                    </button>
                    {EXISTING_TOUR_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageFilter(pkg.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                          selectedPackageFilter === pkg.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pkg.destination.split(',')[0]} ({pkg.places.length})
                      </button>
                    ))}
                  </div>

                  {filteredTourPackagePlaces.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      No attractions found.
                    </div>
                  ) : (
                    filteredTourPackagePlaces.map((place) => {
                      const isAdded = currentBrowseDay?.attractions?.some(
                        (a) => a.text === place.name
                      )
                      return (
                        <div
                          key={place.name}
                          className={`px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                            isAdded ? 'bg-blue-50/40' : 'hover:bg-slate-50/70'
                          }`}
                        >
                          <div className="relative size-18 sm:size-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <img
                              src={place.image}
                              alt={place.name}
                              className="size-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/65 py-0.5 text-center">
                              <span className="text-[10px] font-bold text-white tracking-tight leading-none block">
                                Attractions
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col gap-1 pr-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-[#121826] text-sm leading-snug truncate">
                                {place.name}
                              </span>
                              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#ff4d4f]">
                                <span className="text-xs">🔥</span>10
                              </span>
                              {place.badge && (
                                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#fbf5ee] text-[#8c531b] border border-[#e8d8c3]/60">
                                  {place.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#8c531b] font-medium leading-tight">
                              <span className="inline-flex items-center px-1 py-0.2 rounded text-[10px] font-bold bg-[#fbf5ee] text-[#8c531b] border border-[#e8d8c3]/60 shrink-0">
                                ❨Tour Package❩
                              </span>
                              <span className="truncate">{place.packageTitle}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 leading-tight">
                              <MapPin className="size-3 text-slate-400 shrink-0" />
                              <span className="font-medium text-slate-600">{place.destination}</span>
                              <span className="text-slate-300">|</span>
                              <span className="truncate">{place.type}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-center pl-1">
                            <button
                              type="button"
                              className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                              title="AI highlights & details"
                            >
                              <Sparkles className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleBrowseAttraction(browsePlacesDayId, place.name)
                              }
                              className={`p-1 transition-all cursor-pointer ${
                                isAdded
                                  ? 'text-emerald-600 hover:text-emerald-700'
                                  : 'text-slate-400 hover:text-[#0071eb]'
                              }`}
                              title={isAdded ? 'Remove from Day' : 'Add to Day'}
                            >
                              {isAdded ? (
                                <CheckCircle2 className="size-5 fill-emerald-50 text-emerald-600" />
                              ) : (
                                <PlusCircle className="size-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </>
              )}

              {browseActiveTab === 'bookings' && (
                <div className="py-14 text-center px-6 space-y-2">
                  <div className="size-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Compass className="size-5" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-800">No Bookings Yet</h5>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    You don't have existing reservations for this destination yet. Switch to "Recommend" to explore top attractions worldwide.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBrowseActiveTab('recommend')}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Explore Recommended
                  </button>
                </div>
              )}

              {browseActiveTab === 'saved' && (
                <div className="py-14 text-center px-6 space-y-2">
                  <div className="size-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                    <Sparkles className="size-5" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-800">Saved Places</h5>
                  {toBePlannedPlaces.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                      {toBePlannedPlaces.map((place, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            handleToggleBrowseAttraction(browsePlacesDayId, place)
                          }
                          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="size-3 text-blue-600" />
                          <span>{place}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      No saved places yet. Add places to your "To be planned" list in the Itinerary tab to quickly access them here.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom bar of Browse View */}
            <div className="border-t border-slate-100 px-5 py-3.5 bg-slate-50/90 flex items-center justify-between shrink-0 rounded-b-3xl">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">
                  Day {currentBrowseDay?.dayNumber || 1}
                </span>{' '}
                · {currentBrowseDay?.attractions?.length || 0} attractions selected
              </div>
              <button
                type="button"
                onClick={() => setBrowsePlacesDayId(null)}
                className="px-5 py-2 rounded-xl bg-[#0071eb] hover:bg-[#005ec4] active:scale-95 text-xs sm:text-sm font-bold text-white shadow-sm transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ──────────────────────────────────────────────────────────── */}
            {/* 2. TAB ROW (ITINERARY / IDEAS)                                */}
            {/* ──────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 pt-2.5 bg-white shrink-0">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('itinerary')}
              className={`pb-2.5 text-sm font-bold transition-colors cursor-pointer relative ${
                activeTab === 'itinerary'
                  ? 'text-[#121826]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Itinerary
              {activeTab === 'itinerary' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#121826] rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ideas')}
              className={`pb-2.5 text-sm font-bold transition-colors cursor-pointer relative ${
                activeTab === 'ideas'
                  ? 'text-[#121826]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Ideas
              {activeTab === 'ideas' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#121826] rounded-full" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            title="Expand view"
          >
            <Maximize2 className="size-3.5" />
          </button>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 3. HORIZONTAL PILL NAV ROW                                    */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2 px-6 py-3 border-b border-slate-100/80 bg-white shrink-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {/* Overview Pill */}
            <button
              type="button"
              onClick={() => scrollToSection('overview')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activePill === 'overview'
                  ? 'bg-[#121826] text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-800 hover:border-slate-400'
              }`}
            >
              Overview
            </button>

            {/* Dynamic Day Pills */}
            {days.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => scrollToSection(day.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activePill === day.id
                    ? 'bg-[#121826] text-white shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 hover:border-slate-400'
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}

            {/* To be planned Pill */}
            <button
              type="button"
              onClick={() => scrollToSection('tobeplanned')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activePill === 'tobeplanned'
                  ? 'bg-[#121826] text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-800 hover:border-slate-400'
              }`}
            >
              To be planned
            </button>

            {/* Notes Pill */}
            <button
              type="button"
              onClick={() => scrollToSection('notes')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activePill === 'notes'
                  ? 'bg-[#121826] text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-800 hover:border-slate-400'
              }`}
            >
              Notes
            </button>
          </div>

          {/* Right Blue Circular Plus Button (Add Day) */}
          <button
            type="button"
            onClick={handleAddDay}
            className="size-6 rounded-full bg-[#2c61fe] hover:bg-blue-600 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer transition-all ml-2"
            title="Add 1 day"
          >
            <Plus className="size-3.5 stroke-[3]" />
          </button>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 4. MAIN SCROLLABLE CONTENT AREA                               */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 space-y-6">
          {activeTab === 'ideas' ? (
            /* IDEAS & INSPIRATION TAB CONTENT */
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-base font-bold text-[#121826]">
                  Popular Travel Places from Tour Packages
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any landmark or activity to add directly to your itinerary.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allFeaturedPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-300 transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="flex items-center gap-1.5 text-blue-600 text-[11px] font-bold truncate">
                          <Sparkles className="size-3.5 shrink-0" />
                          <span className="truncate">{place.packageTitle}</span>
                        </span>
                        {place.badge && (
                          <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full shrink-0">
                            {place.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#121826] leading-snug">
                        {place.name}
                      </h4>
                      {place.type && (
                        <p className="text-xs text-slate-500 mt-0.5">{place.type}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleAddItemToDay(days[0].id, 'attractions', place.name)
                        setActiveTab('itinerary')
                      }}
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-white border border-slate-200 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-2xs cursor-pointer"
                    >
                      <Plus className="size-3.5" />
                      Add to Day 1
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ITINERARY TAB CONTENT */
            <div className="space-y-6 animate-fade-in">
              {/* ── SECTION A: OVERVIEW ── */}
              <div ref={overviewRef} className="space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-[#121826]">
                  Overview
                </h4>

                <div className="space-y-2.5">
                  {/* Dynamic Day Cards */}
                  {days.map((day) => (
                    <div
                      key={day.id}
                      onClick={() => scrollToSection(day.id)}
                      className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-1 h-4 rounded-full bg-[#618bff] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-[#121826] truncate">
                          Day {day.dayNumber}
                          {day.title !== `Day ${day.dayNumber} · Edit title` && (
                            <span className="font-normal text-slate-500 ml-1.5">
                              · {day.title.replace(/^Day \d+\s*·\s*/, '')}
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                        View details →
                      </span>
                    </div>
                  ))}

                  {/* To be planned Card */}
                  <div
                    onClick={() => scrollToSection('tobeplanned')}
                    className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="relative font-bold text-xs sm:text-sm text-[#121826] inline-block">
                        <span className="relative z-10">To be</span>
                        <span className="absolute left-0 bottom-0.5 w-full h-2 bg-[#bae0ff]/70 -z-0 rounded-xs" />
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[#121826]">
                        planned
                      </span>
                      {toBePlannedPlaces.length > 0 && (
                        <span className="ml-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {toBePlannedPlaces.length}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Notes Card */}
                  <div
                    onClick={() => scrollToSection('notes')}
                    className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="relative font-bold text-xs sm:text-sm text-[#121826] inline-block">
                        <span className="relative z-10">Notes</span>
                        <span className="absolute left-0 bottom-0.5 w-full h-2 bg-[#bae0ff]/70 -z-0 rounded-xs" />
                      </span>
                      {generalNotes && (
                        <span className="text-xs text-slate-400 truncate max-w-[200px]">
                          — {generalNotes.slice(0, 30)}...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SECTION B: DAY DETAILS (DAY 1, DAY 2, ...) ── */}
              {days.map((day, dayIndex) => (
                <div
                  key={day.id}
                  id={day.id}
                  className="pt-4 border-t border-slate-100 scroll-mt-28 space-y-4"
                >
                  {/* Day Header Title + Actions */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 group">
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => handleUpdateDayTitle(day.id, e.target.value)}
                          className="font-bold text-base sm:text-lg text-[#121826] bg-transparent hover:bg-slate-50 focus:bg-slate-50 border-b border-transparent focus:border-blue-500 rounded px-1 -ml-1 outline-none w-full transition-colors"
                          placeholder={`Day ${day.dayNumber} · Edit title`}
                        />
                        <Pencil className="size-3.5 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Add notes line */}
                      {day.isEditingNotes ? (
                        <div className="mt-2">
                          <textarea
                            autoFocus
                            value={day.notes}
                            onChange={(e) =>
                              setDays((prev) =>
                                prev.map((d) =>
                                  d.id === day.id ? { ...d, notes: e.target.value } : d
                                )
                              )
                            }
                            placeholder="Add notes for this day..."
                            className="w-full text-xs text-slate-700 p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 outline-none"
                            rows={2}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setDays((prev) =>
                                prev.map((d) =>
                                  d.id === day.id ? { ...d, isEditingNotes: false } : d
                                )
                              )
                            }
                            className="mt-1 text-xs font-bold text-blue-600 hover:underline"
                          >
                            Save notes
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setDays((prev) =>
                              prev.map((d) =>
                                d.id === day.id ? { ...d, isEditingNotes: true } : d
                              )
                            )
                          }
                          className="text-xs text-slate-400 hover:text-blue-600 block mt-0.5 text-left transition-colors cursor-pointer"
                        >
                          {day.notes ? (
                            <span className="text-slate-600 italic">“{day.notes}”</span>
                          ) : (
                            'Add notes'
                          )}
                        </button>
                      )}
                    </div>

                    {/* Three dots menu */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDayMenuId(openDayMenuId === day.id ? null : day.id)
                        }
                        className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>

                      {openDayMenuId === day.id && (
                        <div className="absolute right-0 top-full mt-1 z-30 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl space-y-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              handleUpdateDayTitle(day.id, `Day ${day.dayNumber} · Edit title`)
                              setOpenDayMenuId(null)
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                          >
                            Reset Title
                          </button>
                          {days.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteDay(day.id)}
                              className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-1.5"
                            >
                              <Trash2 className="size-3" />
                              Delete Day
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connected Timeline Elements */}
                  <div className="relative pl-2 sm:pl-3 space-y-6">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-[22px] sm:left-[26px] top-4 bottom-4 w-0.5 bg-[#ebedf1]" />

                    {/* ── 1. What to See & Do? ── */}
                    <div className="relative flex items-start gap-3.5 sm:gap-4 group">
                      <div className="relative z-10 size-7 sm:size-8 rounded-full bg-[#618bff] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Compass className="size-3.5 sm:size-4" />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-[#121826]">
                            What to See &amp; Do?
                          </h5>
                          <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                            Select existing tour place
                          </span>
                        </div>

                        {/* Added Attractions Card List in Day Itinerary */}
                        {day.attractions.length > 0 && (
                          <div className="mt-2.5 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Day {day.dayNumber} Attractions ({day.attractions.length})
                              </span>
                              <span className="text-[11px] text-blue-600 font-medium">
                                Selected places
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {day.attractions.map((a) => {
                                const info = getAttractionDetails(a.text)
                                return (
                                  <div
                                    key={a.id}
                                    className="flex items-center justify-between gap-2.5 p-2 rounded-xl border border-slate-200/90 bg-white hover:border-blue-300 shadow-2xs group transition-all"
                                  >
                                    {/* Thumbnail with "Attractions" overlay */}
                                    <div className="relative size-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                      <img
                                        src={info.image}
                                        alt={a.text}
                                        className="size-full object-cover"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-x-0 bottom-0 bg-black/65 py-0.2 text-center">
                                        <span className="text-[8px] font-bold text-white tracking-tight leading-none block">
                                          Attraction
                                        </span>
                                      </div>
                                    </div>

                                    {/* Place Details */}
                                    <div className="flex-1 min-w-0 pr-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-xs font-bold text-slate-900 truncate">
                                          {a.text}
                                        </span>
                                        {info.badge && (
                                          <span className="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                            {info.badge}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                                        <span className="font-medium text-slate-600">{info.city || 'Tour Stop'}</span>
                                        {info.type && (
                                          <>
                                            <span className="text-slate-300"> · </span>
                                            <span className="truncate">{info.type}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveItem(day.id, 'attractions', a.id)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                                      title="Remove from Day"
                                    >
                                      <Trash2 className="size-3.5" />
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Select place from tour packages custom button + browse button */}
                        <div className="mt-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenTourPlacesDayId(openTourPlacesDayId === day.id ? null : day.id)
                              setTourPlaceSearch('')
                            }}
                            className={`flex-1 inline-flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                              openTourPlacesDayId === day.id
                                ? 'border-blue-500 bg-blue-50/80 text-blue-900 ring-2 ring-blue-100'
                                : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-900'
                            }`}
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <Sparkles className="size-3.5 text-blue-600 shrink-0" />
                              <span>+ Select place from tour packages...</span>
                            </span>
                            <ChevronDown
                              className={`size-3.5 text-blue-600 transition-transform ${
                                openTourPlacesDayId === day.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setBrowsePlacesDayId(day.id)
                              setBrowseSearchQuery('')
                              setBrowseActiveTab('recommend')
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer shrink-0"
                          >
                            <Search className="size-3.5 text-blue-600" />
                            <span>Browse all places</span>
                          </button>
                        </div>

                        {/* Custom Attractions Card List Dropdown Panel */}
                        {openTourPlacesDayId === day.id && (
                          <div className="mt-2.5 rounded-2xl border border-blue-200 bg-white p-3.5 shadow-xl space-y-3 animate-fade-in">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="size-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                  <Sparkles className="size-4" />
                                </div>
                                <div className="min-w-0">
                                  <h6 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                    Select Attractions from Tour Packages
                                  </h6>
                                  <p className="text-[11px] text-slate-500 truncate">
                                    Adding to Day {day.dayNumber} · Tap + to add to itinerary
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setOpenTourPlacesDayId(null)}
                                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                              >
                                <X className="size-4" />
                              </button>
                            </div>

                            {/* Search & Package Filters */}
                            <div className="space-y-2">
                              <div className="relative w-full">
                                <input
                                  type="text"
                                  placeholder="Search tour attractions (e.g. Chandni Chowk, Taj Mahal)..."
                                  value={tourPlaceSearch}
                                  onChange={(e) => setTourPlaceSearch(e.target.value)}
                                  className="w-full h-8.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                />
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
                              </div>

                              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedPackageFilter('all')}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                    selectedPackageFilter === 'all'
                                      ? 'bg-[#121826] text-white'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  All ({allTourPackagePlaces.length})
                                </button>
                                {EXISTING_TOUR_PACKAGES.map((pkg) => (
                                  <button
                                    key={pkg.id}
                                    type="button"
                                    onClick={() => setSelectedPackageFilter(pkg.id)}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                      selectedPackageFilter === pkg.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                  >
                                    {pkg.destination.split(',')[0]} ({pkg.places.length})
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Attractions Card List */}
                            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-xl bg-slate-50/50">
                              {filteredTourPackagePlaces.length === 0 ? (
                                <div className="py-8 text-center text-xs text-slate-400">
                                  No attractions found matching "{tourPlaceSearch}"
                                </div>
                              ) : (
                                filteredTourPackagePlaces.map((place) => {
                                  const isAdded = day.attractions.some((a) => a.text === place.name)
                                  return (
                                    <div
                                      key={place.name}
                                      className={`p-2.5 flex items-center justify-between gap-3 transition-colors ${
                                        isAdded ? 'bg-blue-50/70' : 'hover:bg-white bg-white/60'
                                      }`}
                                    >
                                      {/* Left: Square Thumbnail with "Attractions" overlay */}
                                      <div className="relative size-14 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                                        <img
                                          src={place.image}
                                          alt={place.name}
                                          className="size-full object-cover"
                                          loading="lazy"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-black/65 py-0.2 text-center">
                                          <span className="text-[8px] font-bold text-white tracking-tight leading-none block">
                                            Attraction
                                          </span>
                                        </div>
                                      </div>

                                      {/* Middle: Details */}
                                      <div className="flex-1 min-w-0 pr-1">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                                            {place.name}
                                          </span>
                                          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#ff4d4f]">
                                            <span className="text-[10px]">🔥</span>10
                                          </span>
                                          {place.badge && (
                                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#fbf5ee] text-[#8c531b] border border-[#e8d8c3]/60">
                                              {place.badge}
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                          <span className="font-medium text-slate-700">{place.destination}</span> · {place.type}
                                        </div>
                                        <div className="text-[10px] text-blue-600 truncate">
                                          Tour: {place.packageTitle}
                                        </div>
                                      </div>

                                      {/* Right: Add / Remove Button */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (isAdded) {
                                            const existing = day.attractions.find((a) => a.text === place.name)
                                            if (existing) handleRemoveItem(day.id, 'attractions', existing.id)
                                          } else {
                                            handleAddItemToDay(day.id, 'attractions', place.name)
                                          }
                                        }}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                                          isAdded
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                                        }`}
                                      >
                                        {isAdded ? (
                                          <>
                                            <CheckCircle2 className="size-3.5 text-emerald-600" />
                                            <span>Added</span>
                                          </>
                                        ) : (
                                          <>
                                            <Plus className="size-3.5" />
                                            <span>Add</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  )
                                })
                              )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-1 text-xs">
                              <span className="text-slate-500 font-medium">
                                {day.attractions.length} attraction{day.attractions.length === 1 ? '' : 's'} in Day {day.dayNumber}
                              </span>
                              <button
                                type="button"
                                onClick={() => setOpenTourPlacesDayId(null)}
                                className="px-3 py-1 rounded-lg bg-[#121826] text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── 3. Where to Stay? (Text Field, No Selection Option) ── */}
                    <div className="relative flex items-start gap-3.5 sm:gap-4 group">
                      <div className="relative z-10 size-7 sm:size-8 rounded-full bg-[#618bff] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <BedDouble className="size-3.5 sm:size-4" />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-[#121826]">
                            Where to Stay?
                          </h5>
                          <span className="text-[11px] font-medium text-slate-400">
                            Type hotel or stay
                          </span>
                        </div>

                        {/* Text Field for accommodation */}
                        <div className="mt-2 relative max-w-md">
                          <input
                            type="text"
                            value={day.stay || ''}
                            onChange={(e) => handleUpdateDayStay(day.id, e.target.value)}
                            placeholder="Enter hotel name, resort, or where you'd like to stay..."
                            className="w-full text-xs sm:text-sm pl-3 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder:text-slate-400 transition-all shadow-2xs"
                          />
                          {day.stay && (
                            <button
                              type="button"
                              onClick={() => handleUpdateDayStay(day.id, '')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
                              title="Clear text"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add 1 day action divider between days */}
                  {dayIndex === days.length - 1 && (
                    <div className="pt-2 flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-200/80" />
                      <button
                        type="button"
                        onClick={handleAddDay}
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-xs font-bold text-[#2c61fe] hover:bg-blue-50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Plus className="size-3.5" />
                        <span>Add 1 day</span>
                      </button>
                      <div className="h-px flex-1 bg-slate-200/80" />
                    </div>
                  )}
                </div>
              ))}

              {/* ── SECTION C: TO BE PLANNED ── */}
              <div ref={toBePlannedRef} className="pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="relative font-bold text-sm sm:text-base text-[#121826] inline-block">
                    <span className="relative z-10">To be</span>
                    <span className="absolute left-0 bottom-0.5 w-full h-2 bg-[#bae0ff]/70 -z-0 rounded-xs" />
                  </span>
                  <span className="font-bold text-sm sm:text-base text-[#121826]">
                    planned
                  </span>
                </div>

                {/* Added Places */}
                {toBePlannedPlaces.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {toBePlannedPlaces.map((place, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800"
                      >
                        <MapPin className="size-3 text-slate-500" />
                        {place}
                        <button
                          type="button"
                          onClick={() => handleRemovePlace(index)}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {isAddingPlace ? (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      autoFocus
                      value={newPlaceInput}
                      onChange={(e) => setNewPlaceInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddPlace()}
                      placeholder="Enter a landmark or place name..."
                      className="text-xs p-2 rounded-xl border border-slate-300 w-full max-w-sm outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddPlace}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingPlace(false)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingPlace(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2c61fe] hover:underline cursor-pointer"
                  >
                    <Plus className="size-3.5" />
                    <span>Add places to plan later</span>
                  </button>
                )}
              </div>

              {/* ── SECTION D: NOTES ── */}
              <div ref={notesRef} className="pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="relative font-bold text-sm sm:text-base text-[#121826] inline-block">
                    <span className="relative z-10">Notes</span>
                    <span className="absolute left-0 bottom-0.5 w-full h-2 bg-[#bae0ff]/70 -z-0 rounded-xs" />
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs space-y-2">
                  <textarea
                    rows={3}
                    maxLength={2000}
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="Record your ideas, plans, and important information here..."
                    className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent outline-none resize-none"
                  />
                  <div className="text-right text-[11px] font-medium text-slate-400">
                    {generalNotes.length}/2000
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 5. BOTTOM ACTION FOOTER BAR                                   */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="border-t border-slate-200/90 px-6 py-4 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 rounded-b-3xl">
          <div className="text-xs text-slate-500">
            <span className="font-bold text-slate-800">{days.length} Day Itinerary</span>{' '}
            • {days.reduce((acc, d) => acc + d.attractions.length, 0)} activities planned
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0071eb] hover:bg-[#005ec4] active:scale-95 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="size-4" />
              <span>Save &amp; Request Quote</span>
            </button>
          </div>
        </div>
          </>
        )}



        {/* ──────────────────────────────────────────────────────────── */}
        {/* MODAL: SUBMIT CUSTOM ITINERARY REQUEST                        */}
        {/* ──────────────────────────────────────────────────────────── */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Sparkles className="size-4" />
                  </div>
                  <h4 className="text-base font-bold text-[#121826]">
                    Submit Custom Tour Package
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="size-4" />
                </button>
              </div>

              {isSubmittedSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <h5 className="text-base font-bold text-[#121826]">
                    Custom Itinerary Submitted!
                  </h5>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Our Senior Tour Specialist will curate pricing, private guides, and reservations, contacting you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitPlan} className="space-y-3.5">
                  <div className="p-3 rounded-2xl bg-slate-50 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{itineraryTitle}</span>
                      <span>{days.length} Days</span>
                    </div>
                    {departureDate && <div>Departure: {departureDate}</div>}
                    <div>
                      {days.reduce((acc, d) => acc + d.attractions.length, 0)} custom activities selected
                    </div>
                    {days.some((d) => d.stay) && (
                      <div className="text-[11px] text-slate-500 truncate">
                        Accommodations: {days.map((d) => d.stay).filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arif Hossain"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712 345678"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md shadow-blue-500/20"
                    >
                      Confirm &amp; Send
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
