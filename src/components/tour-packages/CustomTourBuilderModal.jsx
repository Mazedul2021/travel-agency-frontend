import { useState } from 'react'
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Users,
  Building,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Download,
  Printer,
  FileText,
  AlertCircle,
  Compass,
} from 'lucide-react'

const STEPS = [
  { key: 'customer', label: 'Customer' },
  { key: 'trip', label: 'Trip & dates' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'activities', label: 'Activities' },
]

const HOTEL_OPTIONS = [
  { value: 'budget', label: 'Budget / guesthouse' },
  { value: '3-star', label: '3-star hotel' },
  { value: '4-star', label: '4-star hotel' },
  { value: '5-star', label: '5-star luxury hotel' },
  { value: 'resort', label: 'Beach resort' },
  { value: 'villa', label: 'Private villa' },
]

const TRANSPORT_OPTIONS = ['Flight', 'Private car', 'Minibus', 'Train', 'Self-drive']

const SUGGESTED_ACTIVITIES = [
  'City tour',
  'Beach day',
  'Snorkeling / diving',
  'Hiking',
  'Museum visits',
  'Food tour',
  'Shopping',
  'Wildlife safari',
]

const HOTEL_LABELS = Object.fromEntries(
  HOTEL_OPTIONS.map((option) => [option.value, option.label])
)

const MS_PER_DAY = 86400000

function tripDays(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0
  return Math.max(1, Math.min(21, Math.round((end - start) / MS_PER_DAY) + 1))
}

function describeDay(title, values) {
  if (title === 'Rest & local time') {
    return 'A slower day for the pool, spa or optional leisure add-ons before the next excursion.'
  }
  if (title === 'Free exploration') {
    return 'A flexible day to explore the local culture and hidden gems at your own pace.'
  }
  return `Reserved for ${title.toLowerCase()} in and around ${values.destination}, arranged at your preferred pace with private transport.`
}

function buildItinerary(values) {
  const days = tripDays(values.startDate, values.endDate)
  const activities = [
    ...values.activities,
    ...values.otherActivities
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  ]
  const arrival = {
    day: 1,
    title: `Arrival in ${values.destination}`,
    description: `${values.transportation} arrival, seamless check-in at your ${
      HOTEL_LABELS[values.hotel] ?? 'chosen'
    } accommodation and an orientation evening.`,
  }

  if (days <= 2) {
    const single = [
      arrival,
      {
        day: days,
        title: activities[0] ?? 'Day trip & departure',
        description: activities[0]
          ? describeDay(activities[0], values)
          : 'Explore the highlights and depart in the evening.',
      },
    ]
    return single
  }

  const middleDays = days - 2
  const middle = []
  if (activities.length === 0) {
    for (let index = 0; index < middleDays; index += 1) {
      middle.push(index === 0 ? 'Free exploration' : 'Rest & local time')
    }
  } else if (activities.length >= middleDays) {
    const perDay = Math.ceil(activities.length / middleDays)
    for (let index = 0; index < middleDays; index += 1) {
      middle.push(activities.slice(index * perDay, (index + 1) * perDay).join(' & '))
    }
  } else {
    activities.forEach((activity) => middle.push(activity))
    while (middle.length < middleDays) middle.push('Rest & local time')
  }

  const plan = [arrival]
  middle.forEach((title) => {
    plan.push({ day: plan.length + 1, title, description: describeDay(title, values) })
  })
  plan.push({
    day: days,
    title: 'Departure',
    description: `Check-out and ${values.transportation.toLowerCase()} transfer for the return journey home.`,
  })
  return plan
}

export default function CustomTourBuilderModal({
  isOpen,
  onClose,
  initialDestination = '',
}) {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({
    customer: '',
    phone: '',
    destination: initialDestination,
    startDate: '',
    endDate: '',
    travelers: '2',
    hotel: '4-star',
    transportation: 'Private car',
    activities: ['City tour'],
    otherActivities: '',
    requirements: '',
  })
  const [errors, setErrors] = useState({})
  const [itinerary, setItinerary] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [requestRef, setRequestRef] = useState('')

  if (!isOpen) return null

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function toggleActivity(activity) {
    setValues((current) => ({
      ...current,
      activities: current.activities.includes(activity)
        ? current.activities.filter((item) => item !== activity)
        : [...current.activities, activity],
    }))
  }

  function validateStep(index) {
    const key = STEPS[index].key
    const newErrors = {}
    if (key === 'customer') {
      if (!values.customer.trim()) newErrors.customer = 'Customer name is required.'
      if (!values.phone.trim() || values.phone.trim().length < 6) {
        newErrors.phone = 'Please enter a valid phone number.'
      }
    }
    if (key === 'trip') {
      if (!values.destination.trim()) newErrors.destination = 'Destination is required.'
      if (!values.startDate) newErrors.startDate = 'Pick a travel start date.'
      if (!values.endDate) newErrors.endDate = 'Pick a travel end date.'
      if (
        values.startDate &&
        values.endDate &&
        new Date(values.endDate) < new Date(values.startDate)
      ) {
        newErrors.endDate = 'End date must be on or after start date.'
      }
      if (!Number(values.travelers) || Number(values.travelers) < 1) {
        newErrors.travelers = 'Enter at least 1 traveler.'
      }
    }
    if (key === 'preferences' && !values.hotel) {
      newErrors.hotel = 'Select a hotel preference.'
    }
    return newErrors
  }

  function goNext() {
    const stepErrors = validateStep(step)
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setStep((current) => current + 1)
  }

  function goBack() {
    setErrors({})
    setStep((current) => Math.max(0, current - 1))
  }

  function handleGenerate(e) {
    if (e) e.preventDefault()
    const stepErrors = validateStep(step)
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors)
      return
    }
    const generated = buildItinerary(values)
    setItinerary(generated)
  }

  function handleDownloadPrint() {
    window.print()
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const generatedRef = `CT-${Math.floor(100000 + Math.random() * 900000)}`
      setRequestRef(generatedRef)

      // Store in localStorage for persistence across B2C/B2B
      const existing = JSON.parse(localStorage.getItem('customTourRequests') || '[]')
      const newEntry = {
        id: Date.now(),
        ref: generatedRef,
        customer: values.customer.trim(),
        phone: values.phone.trim(),
        destination: values.destination.trim(),
        travelers: Number(values.travelers) || 1,
        startDate: values.startDate,
        endDate: values.endDate,
        hotel: values.hotel,
        transportation: values.transportation,
        activities: values.activities,
        otherActivities: values.otherActivities,
        requirements: values.requirements.trim(),
        itinerary,
        status: 'NEW',
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('customTourRequests', JSON.stringify([newEntry, ...existing]))

      // Simulate small server roundtrip
      await new Promise((r) => setTimeout(r, 600))
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const currentKey = STEPS[step].key

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Custom Tour Package Builder
              </h2>
              <p className="text-xs text-slate-500">
                Design your tailor-made itinerary and get instant customized plan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close custom tour builder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Custom Itinerary Request Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-800">{values.customer}</strong>! Our travel specialists have received your custom tour plan for{' '}
                <strong className="text-blue-600">{values.destination}</strong>.
              </p>

              {/* Reference Box */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 max-w-md mx-auto text-xs text-left space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-semibold">Request Reference:</span>
                  <span className="font-mono font-bold text-blue-600 text-sm">
                    {requestRef}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travel Dates:</span>
                  <span className="font-semibold text-slate-800">
                    {values.startDate} to {values.endDate} ({tripDays(values.startDate, values.endDate)} days)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Party Size:</span>
                  <span className="font-semibold text-slate-800">{values.travelers} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hotel Style:</span>
                  <span className="font-semibold text-slate-800">
                    {HOTEL_LABELS[values.hotel] ?? values.hotel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleDownloadPrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : itinerary ? (
            /* ── GENERATED ITINERARY VIEW ── */
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Generated Proposal
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {values.destination} • {itinerary.length} Days Custom Plan
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setItinerary(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Edit Answers
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left: Summary (5 cols) */}
                <div className="md:col-span-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-800 text-sm">Trip Summary</h4>
                  <div className="space-y-1.5 text-slate-600">
                    <p>
                      <strong>Client:</strong> {values.customer} ({values.phone})
                    </p>
                    <p>
                      <strong>Guests:</strong> {values.travelers} Pax
                    </p>
                    <p>
                      <strong>Dates:</strong> {values.startDate} – {values.endDate}
                    </p>
                    <p>
                      <strong>Hotel:</strong> {HOTEL_LABELS[values.hotel] ?? values.hotel}
                    </p>
                    <p>
                      <strong>Transport:</strong> {values.transportation}
                    </p>
                    {values.activities.length > 0 && (
                      <p>
                        <strong>Activities:</strong> {values.activities.join(', ')}
                      </p>
                    )}
                    {values.requirements && (
                      <p className="pt-2 border-t border-slate-200 text-slate-500">
                        <strong>Requirements:</strong> {values.requirements}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Day-by-Day Timeline (7 cols) */}
                <div className="md:col-span-7 space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">
                          {item.day}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-7">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Itinerary</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setItinerary(null)}
                    className="flex-1 sm:flex-none rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Back to Form
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmit}
                    className="flex-1 sm:flex-none rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs font-bold text-white shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? 'Submitting...' : 'Submit Custom Request'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── STEPPED BUILDER FORM ── */
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (step === STEPS.length - 1) handleGenerate(e)
                else goNext()
              }}
              className="space-y-6"
            >
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                {STEPS.map((item, index) => {
                  const isDone = index < step
                  const isCurrent = index === step
                  return (
                    <div key={item.key} className="flex items-center gap-2">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : index + 1}
                      </div>
                      <span
                        className={`hidden sm:inline text-xs font-bold ${
                          isCurrent ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Step 1: Customer */}
              {currentKey === 'customer' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={values.customer}
                        onChange={(e) => update('customer', e.target.value)}
                        placeholder="e.g. Sarah & Michael Jenkins"
                        className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none ${
                          errors.customer
                            ? 'border-rose-400 bg-rose-50/30'
                            : 'border-slate-200 focus:border-blue-500 bg-white'
                        }`}
                      />
                    </div>
                    {errors.customer && (
                      <p className="mt-1 text-xs text-rose-600">{errors.customer}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={values.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="+880 1XXX XXXXXX or +1 (555) 000-0000"
                        className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none ${
                          errors.phone
                            ? 'border-rose-400 bg-rose-50/30'
                            : 'border-slate-200 focus:border-blue-500 bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Trip & Dates */}
              {currentKey === 'trip' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Destination City or Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={values.destination}
                        onChange={(e) => update('destination', e.target.value)}
                        placeholder="e.g. Delhi, India or Paris, France"
                        className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none ${
                          errors.destination
                            ? 'border-rose-400 bg-rose-50/30'
                            : 'border-slate-200 focus:border-blue-500 bg-white'
                        }`}
                      />
                    </div>
                    {errors.destination && (
                      <p className="mt-1 text-xs text-rose-600">{errors.destination}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={values.startDate}
                        onChange={(e) => update('startDate', e.target.value)}
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none ${
                          errors.startDate
                            ? 'border-rose-400 bg-rose-50/30'
                            : 'border-slate-200 focus:border-blue-500 bg-white'
                        }`}
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-xs text-rose-600">{errors.startDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={values.endDate}
                        min={values.startDate}
                        onChange={(e) => update('endDate', e.target.value)}
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none ${
                          errors.endDate
                            ? 'border-rose-400 bg-rose-50/30'
                            : 'border-slate-200 focus:border-blue-500 bg-white'
                        }`}
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-xs text-rose-600">{errors.endDate}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Number of Travelers *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={values.travelers}
                        onChange={(e) => update('travelers', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {currentKey === 'preferences' && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Hotel Style Preference *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {HOTEL_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update('hotel', opt.value)}
                          className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                            values.hotel === opt.value
                              ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <Building className="w-4 h-4 mb-1 text-slate-500" />
                          <span className="text-xs font-bold block">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Transportation Mode
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {TRANSPORT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update('transportation', opt)}
                          className={`rounded-xl border p-2.5 text-center transition-all cursor-pointer ${
                            values.transportation === opt
                              ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 text-xs'
                          }`}
                        >
                          <span className="text-xs font-semibold">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Activities & Requirements */}
              {currentKey === 'activities' && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Preferred Activities
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_ACTIVITIES.map((act) => {
                        const active = values.activities.includes(act)
                        return (
                          <button
                            key={act}
                            type="button"
                            onClick={() => toggleActivity(act)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              active
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {active && <Check className="w-3 h-3" />}
                            <span>{act}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Other Activities / Specific Sites
                    </label>
                    <input
                      type="text"
                      value={values.otherActivities}
                      onChange={(e) => update('otherActivities', e.target.value)}
                      placeholder="e.g. Hot air balloon, cooking class, Taj Mahal sunrise"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Special Requirements or Requests
                    </label>
                    <textarea
                      rows={3}
                      value={values.requirements}
                      onChange={(e) => update('requirements', e.target.value)}
                      placeholder="Dietary preferences, accessibility needs, anniversaries, guide language..."
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step === STEPS.length - 1 ? (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Custom Itinerary</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
