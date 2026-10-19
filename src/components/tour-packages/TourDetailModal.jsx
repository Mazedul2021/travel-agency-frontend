import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  X,
  Star,
  Clock,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Heart,
  MapPin,
  Sparkles,
  Ticket,
  ChevronRight,
  Info,
} from 'lucide-react'

export default function TourDetailModal({
  tour,
  isOpen,
  onClose,
  isSaved,
  onToggleWishlist,
}) {
  const navigate = useNavigate()
  const [adults, setAdults] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  })
  const [selectedTime, setSelectedTime] = useState('10:00 AM')
  const [isBooked, setIsBooked] = useState(false)

  if (!isOpen || !tour) return null

  const unitPrice = tour.price || 50
  const totalPrice = adults * unitPrice + childrenCount * Math.round(unitPrice * 0.7)

  const handleBooking = (e) => {
    e.preventDefault()
    setIsBooked(true)
  }

  const times = ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 active:scale-95 transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Hero in Modal */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Badges on hero */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            {tour.badge && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md ${
                  tour.badgeType === 'critical'
                    ? 'bg-[#d9383a]'
                    : tour.isOriginal
                    ? 'bg-[#ff5533]'
                    : 'bg-slate-900/90'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {tour.badge}
              </span>
            )}

            <button
              type="button"
              onClick={() => onToggleWishlist(tour.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-md transition-all cursor-pointer ${
                isSaved ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-800 hover:bg-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
              <span>{isSaved ? 'Saved to Wishlist' : 'Save'}</span>
            </button>
          </div>

          {/* Title & Location on hero bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {tour.context || tour.city}, {tour.country || 'Global'}
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              {tour.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/90">
              <span className="flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {tour.rating}
              </span>
              <span>•</span>
              <span>{tour.reviewsCount} reviews</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-white/70" />
                {tour.duration || tour.attributes}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body: Two column layout on larger screens */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          {/* Left Column: Description & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Free Cancellation</h4>
                  <p className="text-[11px] text-slate-600">Cancel up to 24 hours in advance for a full refund</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Ticket className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Mobile Ticketing</h4>
                  <p className="text-[11px] text-slate-600">Instant barcode delivered to your phone</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                  Experience Highlights
                </h3>
                <ul className="space-y-2.5">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            {tour.included && tour.included.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                  What&rsquo;s Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tour.included.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Traveler Tips */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 space-y-1">
                <p className="font-bold">Important Information:</p>
                <p>Please arrive at least 15 minutes before your scheduled departure. Valid ID or passport matching ticket name is required.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Widget (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm">
              {isBooked ? (
                <div className="py-8 text-center space-y-3 animate-fade-in">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We have reserved your slot for <b>{adults + childrenCount} guest(s)</b> on <b>{selectedDate}</b> at <b>{selectedTime}</b>.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-left text-xs space-y-1">
                    <p className="font-bold text-slate-800">Booking Reference: GYG-849201</p>
                    <p className="text-slate-500">A confirmation voucher has been prepared for download.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBooked(false)}
                    className="w-full mt-3 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
                  >
                    Modify Booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Price Header */}
                  <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs text-slate-500">Starting from</span>
                      <div className="flex items-baseline gap-2">
                        {tour.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            ${tour.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-extrabold text-slate-900">
                          ${tour.price}
                        </span>
                        <span className="text-xs text-slate-500">/ person</span>
                      </div>
                    </div>
                    {tour.discounted && (
                      <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-[#c5182e]">
                        Save ${tour.originalPrice - tour.price}
                      </span>
                    )}
                  </div>

                  {/* Date Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>Select Date</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-xs focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Time Slot Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>Select Time</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {times.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                            selectedTime === time
                              ? 'bg-primary text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travelers Counter */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span>Participants</span>
                    </label>

                    {/* Adults */}
                    <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-slate-200 text-xs">
                      <div>
                        <span className="font-bold text-slate-800">Adults (Age 13+)</span>
                        <p className="text-[10px] text-slate-500">${unitPrice} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="h-7 w-7 rounded-lg border border-slate-200 bg-slate-50 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-slate-800">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="h-7 w-7 rounded-lg border border-slate-200 bg-slate-50 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-slate-200 text-xs">
                      <div>
                        <span className="font-bold text-slate-800">Children (Age 4-12)</span>
                        <p className="text-[10px] text-slate-500">${Math.round(unitPrice * 0.7)} each (30% off)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="h-7 w-7 rounded-lg border border-slate-200 bg-slate-50 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-slate-800">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="h-7 w-7 rounded-lg border border-slate-200 bg-slate-50 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Booking Submit */}
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Total Price (Taxes incl.)</span>
                      <span className="text-xl font-extrabold text-slate-900">
                        ${totalPrice}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark active:scale-[0.98] py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all cursor-pointer"
                    >
                      <span>Check Availability &amp; Book</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        navigate(
                          tour.id === 'delhi-city-tour' || tour.city?.toLowerCase() === 'delhi'
                            ? '/tour-packages/delhi-city-tour'
                            : `/tour-packages/${tour.id}`
                        )
                      }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      <span>Open Full Activity Page</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <p className="text-[10.5px] text-center text-slate-500">
                      Reserve now &amp; pay later to secure your spot
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
