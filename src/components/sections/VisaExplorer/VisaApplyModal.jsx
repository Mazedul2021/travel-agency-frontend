import { useState, useEffect, useRef } from 'react'
import {
  X,
  User,
  CreditCard,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Check,
  CheckCircle2,
  Trash2,
} from 'lucide-react'
import CountryFlag from './CountryFlag'
import { COUNTRY_DIAL_CODES } from '@/constants/phone'

// 10 Upload Documents with specific attributes
const DOCUMENT_FIELDS = [
  {
    id: 'passportCopy',
    title: 'Passport Copy *',
    required: true,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'photo',
    title: 'Photo (33x48mm) *',
    required: true,
    formats: 'JPG, PNG',
    accept: '.jpg,.jpeg,.png',
  },
  {
    id: 'visitingCard',
    title: 'Visiting Card',
    required: false,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'nationalId',
    title: 'National ID Card',
    required: false,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'tradeLicense',
    title: 'N.O.C / G.O / Trade License',
    required: false,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'bankStatement',
    title: 'Bank Statement (6 Months) *',
    required: true,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'bankSolvency',
    title: 'Bank Solvency Certificate',
    required: false,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'returnTicket',
    title: 'Return Air Ticket',
    required: false,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'studentId',
    title: 'Student ID (If Child)',
    required: false,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'marriageCert',
    title: 'Birth / Marriage Certificate',
    required: false,
    formats: 'PDF, JPG, PNG',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
]

// Custom pixel-accurate SVG icons matching the reference image exactly
function DocumentIcon({ id, className = 'w-7 h-7 text-[#1877f2]' }) {
  switch (id) {
    case 'passportCopy':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2.5" fill="#1877f2" />
          <circle cx="12" cy="9" r="2.8" stroke="white" strokeWidth="1.5" />
          <rect x="8" y="15" width="8" height="1.8" rx="0.9" fill="white" />
        </svg>
      )
    case 'photo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#1877f2" />
          <circle cx="8" cy="8" r="2.2" fill="white" />
          <path d="M4 18L10 12L14.5 16.5L17 14L20 18H4Z" fill="white" />
        </svg>
      )
    case 'visitingCard':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <circle cx="9" cy="10" r="2.2" />
          <path d="M6 16.5c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5" />
          <line x1="15" y1="9" x2="19" y2="9" />
          <line x1="15" y1="12" x2="19" y2="12" />
          <line x1="15" y1="15" x2="18" y2="15" />
        </svg>
      )
    case 'nationalId':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <rect x="6" y="8" width="4.5" height="4.5" rx="0.5" />
          <circle cx="16" cy="10.5" r="2" />
          <path d="M13.5 16c0-1.4 1.1-2.2 2.5-2.2s2.5.8 2.5 2.2" />
        </svg>
      )
    case 'tradeLicense':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    case 'bankStatement':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7H22L12 2Z" />
          <rect x="4" y="9" width="3" height="9" rx="0.5" />
          <rect x="10.5" y="9" width="3" height="9" rx="0.5" />
          <rect x="17" y="9" width="3" height="9" rx="0.5" />
          <rect x="2" y="19" width="20" height="3" rx="0.5" />
        </svg>
      )
    case 'bankSolvency':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      )
    case 'returnTicket':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
        </svg>
      )
    case 'studentId':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" />
          <path d="M5 13.18V17.5C5 19.43 8.13 21 12 21C15.87 21 19 19.43 19 17.5V13.18L12 17L5 13.18Z" />
        </svg>
      )
    case 'marriageCert':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
          <circle cx="18" cy="8" r="2.5" />
          <path d="M19.5 13.5C21 14.3 22 15.5 22 17V19H20.5V17C20.5 15.6 19.8 14.4 18.6 13.6C18.9 13.5 19.2 13.5 19.5 13.5Z" />
          <circle cx="6" cy="8" r="2.5" />
          <path d="M4.5 13.5C4.2 13.5 3.9 13.5 3.6 13.6C2.4 14.4 1.7 15.6 1.7 17V19H3.2V17C3.2 15.5 4.2 14.3 5.7 13.5Z" />
        </svg>
      )
    default:
      return null
  }
}

export default function VisaApplyModal({
  isOpen,
  onClose,
  country = { code: 'cn', name: 'China' },
  type = { id: 'tourist', label: 'Tourist Visa' },
  content = null,
}) {
  const [formData, setFormData] = useState({
    givenName: '',
    surname: '',
    passportNumber: '',
    countryDialCode: '+880',
    contactNumber: '',
    email: '',
    submissionMethod: 'pickup', // 'pickup' | 'office'
    pickupAddress: '',
  })

  const [uploadedFiles, setUploadedFiles] = useState({})
  const [dragActiveId, setDragActiveId] = useState(null)
  const [showDialDropdown, setShowDialDropdown] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')

  const fileInputRefs = useRef({})
  const dialDropdownRef = useRef(null)

  // Handle ESC key & body overflow
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Click outside dial dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialDropdownRef.current && !dialDropdownRef.current.contains(e.target)) {
        setShowDialDropdown(false)
      }
    }
    if (showDialDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDialDropdown])

  if (!isOpen) return null

  // Country & Visa Type Metadata
  const countryName = country?.name || 'China'
  const visaTypeLabel = type?.label || 'Tourist Visa'
  const facts = type?.details?.facts || {
    processing: '15 Days (+/-)',
    stay: 'Up to 30 Days',
    entry: 'Single Entry',
  }
  const feeAmount = type?.details?.fee?.amount
    ? `BDT ${type.details.fee.amount.toLocaleString('en-US')}/-`
    : 'BDT 12,500/-'
  const feeNote = type?.details?.fee?.note || 'All Inclusive'
  const heroImage =
    country?.code === 'cn'
      ? '/images/hero-china.webp'
      : content?.heroImage || '/images/hero-china.webp'

  // Input change handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  // File upload handlers
  const handleFileSelect = (docId, file) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert(`File size exceeds 5MB limit: ${file.name}`)
      return
    }
    setUploadedFiles((prev) => ({
      ...prev,
      [docId]: {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        file,
      },
    }))
    if (errors[docId]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[docId]
        return copy
      })
    }
  }

  const handleRemoveFile = (e, docId) => {
    e.stopPropagation()
    setUploadedFiles((prev) => {
      const copy = { ...prev }
      delete copy[docId]
      return copy
    })
    if (fileInputRefs.current[docId]) {
      fileInputRefs.current[docId].value = ''
    }
  }

  const handleDragOver = (e, docId) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActiveId(docId)
  }

  const handleDragLeave = (e, docId) => {
    e.preventDefault()
    e.stopPropagation()
    if (dragActiveId === docId) {
      setDragActiveId(null)
    }
  }

  const handleDrop = (e, docId) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActiveId(null)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(docId, files[0])
    }
  }

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.givenName.trim()) newErrors.givenName = 'Required'
    if (!formData.surname.trim()) newErrors.surname = 'Required'
    if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Required'
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Required'
    if (!formData.email.trim()) {
      newErrors.email = 'Required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }

    if (formData.submissionMethod === 'pickup' && !formData.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Pickup address required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate server processing
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      const randomRef = 'ABL-' + Math.floor(100000 + Math.random() * 900000)
      setRefNumber(randomRef)
    }, 700)
  }

  const handleResetAndClose = () => {
    setIsSubmitted(false)
    setFormData({
      givenName: '',
      surname: '',
      passportNumber: '',
      countryDialCode: '+880',
      contactNumber: '',
      email: '',
      submissionMethod: 'pickup',
      pickupAddress: '',
    })
    setUploadedFiles({})
    setErrors({})
    onClose()
  }

  const selectedDialInfo =
    COUNTRY_DIAL_CODES.find((c) => c.dial === formData.countryDialCode) || COUNTRY_DIAL_CODES[0]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="visa-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 -z-10 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Card: Larger and more spacious square layout, fits comfortably in one page */}
      <div className="relative w-full max-w-[1240px] xl:max-w-[1280px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto h-[95vh] max-h-[920px] min-h-[760px] flex flex-col md:flex-row transition-all duration-300">
        {/* ======================================================== */}
        {/* SUCCESS CONFIRMATION STATE                               */}
        {/* ======================================================== */}
        {isSubmitted ? (
          <div className="w-full p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-white min-h-[480px]">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50/60">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Application Submitted Successfully!
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md">
              Thank you for applying for the <strong className="text-slate-800">{countryName} {visaTypeLabel}</strong>. Our senior visa processing team has received your application and documents.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-left max-w-md w-full">
              <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 mb-1.5">
                <span>Application Reference:</span>
                <span className="font-mono font-bold text-blue-700">{refNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 mb-1.5">
                <span>Submission Method:</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {formData.submissionMethod === 'pickup' ? 'Home/Office Pickup' : 'Drop at Office'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600">
                <span>Uploaded Documents:</span>
                <span className="font-semibold text-slate-800">
                  {Object.keys(uploadedFiles).length} files attached
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              We will contact you via phone or email within 24 hours regarding document verification.
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition active:scale-95 cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <>
            {/* ======================================================== */}
            {/* LEFT COLUMN: VISA SUMMARY, PRICING & TERMS               */}
            {/* ======================================================== */}
            <div className="w-full md:w-[335px] lg:w-[355px] shrink-0 p-5 sm:p-5.5 bg-white border-b md:border-b-0 md:border-r border-slate-100 flex flex-col gap-3.5 sm:gap-4 overflow-hidden justify-between">
              {/* 1. Country & Visa Hero Banner Image */}
              <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-slate-100 shrink-0">
                <img
                  src={heroImage}
                  alt={`${countryName} Visa`}
                  className="w-full h-full object-cover object-center"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-35% to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2.5">
                    <CountryFlag
                      code={country.code}
                      name={countryName}
                      width={42}
                      className="rounded-xs shadow-md border border-white/20"
                    />
                    <div className="text-white leading-tight">
                      <h4 className="font-bold text-lg sm:text-xl tracking-tight text-white drop-shadow-xs">
                        {countryName}
                      </h4>
                      <p className="font-bold text-lg sm:text-xl tracking-tight text-white drop-shadow-xs">
                        {visaTypeLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Processing Time Card */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f0f6ff] border border-blue-100/60 flex items-center gap-3.5 shrink-0">
                <div className="w-9 h-9 rounded-full bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 leading-none">
                    Processing Time
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {facts?.processing || '15 Days (+/-)'}
                  </p>
                </div>
              </div>

              {/* 3. Visa Fee Card */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f0f6ff] border border-blue-100/60 shrink-0">
                <p className="text-xs font-medium text-slate-500 leading-none">
                  Visa Fee (Individual - B2C)
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-2xl sm:text-[27px] font-black text-[#0f2942] tracking-tight">
                    {feeAmount}
                  </span>
                  <span className="text-xs font-bold text-blue-600 bg-white border border-blue-200 px-2.5 py-0.5 rounded-md shadow-2xs">
                    {feeNote}
                  </span>
                </div>
              </div>

              {/* 4. Important Note Card with Scenic Background Image filling remaining height */}
              <div className="flex-1 min-h-[235px] rounded-2xl bg-[#f0f6ff]/80 border border-blue-100/80 p-4 sm:p-4.5 relative overflow-hidden flex flex-col justify-between shadow-2xs">
                {/* Great Wall Scenic Background Image */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <img
                    src="/images/china-visa-background.webp"
                    alt=""
                    className="absolute bottom-0 inset-x-0 w-full h-[55%] object-cover object-bottom opacity-60 mix-blend-multiply"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#f0f6ff] via-[#f0f6ff]/90 via-45% to-transparent" />
                </div>

                {/* Note Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs">
                      i
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">Important Note</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-700 text-xs sm:text-[12.5px] leading-relaxed marker:text-slate-500 font-normal">
                    <li>Visa fee is non-refundable.</li>
                    <li>Visa approval is at the sole discretion of the Embassy.</li>
                    <li>Please provide authentic and complete documents.</li>
                    <li>We provide guidance and processing assistance only.</li>
                    <li>Processing time may vary depending on Embassy operations.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN: APPLICATION FORM & UPLOAD DOCUMENTS        */}
            {/* ======================================================== */}
            <div className="flex-1 p-5 sm:p-6 lg:p-7 bg-white relative flex flex-col justify-between overflow-hidden">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-3 sm:space-y-3.5">
                {/* Top Header */}
                <div className="pr-8">
                  <h2
                    id="visa-modal-title"
                    className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-tight"
                  >
                    Apply for {countryName} {visaTypeLabel}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-normal mt-1">
                    Fill in your information and upload the required documents. Our team will review and contact you soon.
                  </p>
                </div>

                {/* 1. Personal Information Input Grid (Larger and more spacious) */}
                <div className="space-y-2.5">
                  {/* Row 1: Given Name & Surname */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                        Given Name (First Name) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.givenName}
                          onChange={(e) => handleInputChange('givenName', e.target.value)}
                          placeholder="Enter given name"
                          className={`w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border ${
                            errors.givenName ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                          } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                        Surname (Last Name) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.surname}
                          onChange={(e) => handleInputChange('surname', e.target.value)}
                          placeholder="Enter surname"
                          className={`w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border ${
                            errors.surname ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                          } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Passport Number & Contact Number */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                        Passport Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.passportNumber}
                          onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                          placeholder="Enter passport number"
                          className={`w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border ${
                            errors.passportNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                          } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 uppercase transition`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex relative">
                        <div ref={dialDropdownRef} className="relative">
                          <button
                            type="button"
                            onClick={() => setShowDialDropdown(!showDialDropdown)}
                            className="flex items-center gap-1.5 px-3 h-10 sm:h-11 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                          >
                            <CountryFlag code={selectedDialInfo.code} name="" width={18} className="rounded-2xs" />
                            <span>{formData.countryDialCode}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </button>

                          {showDialDropdown && (
                            <div className="absolute left-0 top-full mt-1 w-48 max-h-48 overflow-y-auto bg-white rounded-lg shadow-xl border border-slate-100 z-50 py-1">
                              {COUNTRY_DIAL_CODES.map((item) => (
                                <button
                                  key={item.code}
                                  type="button"
                                  onClick={() => {
                                    handleInputChange('countryDialCode', item.dial)
                                    setShowDialDropdown(false)
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-slate-700 hover:bg-blue-50 transition"
                                >
                                  <CountryFlag code={item.code} name="" width={16} />
                                  <span className="font-medium">{item.dial}</span>
                                  <span className="text-[11px] text-slate-400">({item.code.toUpperCase()})</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <input
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                          placeholder="Enter contact number"
                          className={`flex-1 h-10 sm:h-11 px-3 rounded-r-xl border ${
                            errors.contactNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                          } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Email Address (Full Width) */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                        className={`w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                        } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition`}
                      />
                    </div>
                  </div>
                </div>

                {/* ======================================================== */}
                {/* 2. UPLOAD DOCUMENTS SECTION (EXACT DESIGN MATCH)         */}
                {/* ======================================================== */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Upload Documents
                    </h3>
                    <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                      Accepted formats: JPG, PNG, PDF (Max 5MB each)
                    </span>
                  </div>

                  {/* 10 Cards in 2 rows of 5 with inner dashed box & left-aligned titles (Larger size) */}
                  <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
                    {DOCUMENT_FIELDS.map((doc) => {
                      const fileInfo = uploadedFiles[doc.id]
                      const isDragged = dragActiveId === doc.id

                      return (
                        <div
                          key={doc.id}
                          className="rounded-xl border border-slate-200/90 bg-white p-2.5 sm:p-3 flex flex-col justify-between shadow-2xs hover:border-blue-300 transition"
                        >
                          {/* Left-aligned top label */}
                          <p className="text-xs sm:text-[12.5px] font-semibold text-slate-800 leading-tight truncate px-0.5 pt-0.5">
                            {doc.title.includes('*') ? (
                              <>
                                {doc.title.replace('*', '').trim()}
                                <span className="text-red-500 font-bold ml-0.5">*</span>
                              </>
                            ) : (
                              doc.title
                            )}
                          </p>

                          {/* Hidden File Input */}
                          <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[doc.id] = el)}
                            accept={doc.accept}
                            onChange={(e) => handleFileSelect(doc.id, e.target.files?.[0])}
                            className="hidden"
                          />

                          {/* Inner Dashed Box (Larger and spacious matching reference image) */}
                          <div
                            onClick={() => fileInputRefs.current[doc.id]?.click()}
                            onDragOver={(e) => handleDragOver(e, doc.id)}
                            onDragLeave={(e) => handleDragLeave(e, doc.id)}
                            onDrop={(e) => handleDrop(e, doc.id)}
                            className={`mt-2 rounded-xl border border-dashed ${
                              fileInfo
                                ? 'border-blue-400 bg-blue-50/30'
                                : isDragged
                                ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-300'
                                : 'border-blue-200/90 bg-[#fbfdff] hover:bg-blue-50/40 hover:border-blue-400'
                            } py-2.5 sm:py-3 px-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[88px] sm:min-h-[94px] group`}
                          >
                            {fileInfo ? (
                              <div className="flex flex-col items-center w-full px-1">
                                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-0.5">
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                </div>
                                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 truncate w-full" title={fileInfo.name}>
                                  {fileInfo.name}
                                </span>
                                <span className="text-[9px] text-slate-400">{fileInfo.size}</span>
                                <button
                                  type="button"
                                  onClick={(e) => handleRemoveFile(e, doc.id)}
                                  className="text-[9px] text-red-500 hover:underline flex items-center gap-0.5 cursor-pointer mt-0.5"
                                >
                                  <Trash2 className="w-2.5 h-2.5" /> Remove
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="mb-1.5 group-hover:scale-105 transition-transform">
                                  <DocumentIcon id={doc.id} className="w-7 h-7 text-[#1877f2]" />
                                </div>
                                <p className="text-[11px] sm:text-xs font-bold text-[#1877f2] leading-tight hover:underline">
                                  Click to upload
                                </p>
                                <p className="text-[9.5px] sm:text-[10px] text-slate-400 leading-tight">or drag &amp; drop</p>
                                <p className="text-[8.5px] sm:text-[9px] text-slate-400 font-medium uppercase mt-0.5 tracking-wider leading-tight">
                                  {doc.formats}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* ======================================================== */}
                {/* 3. PASSPORT SUBMISSION SECTION                           */}
                {/* ======================================================== */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Passport Submission
                    </h3>
                    <span className="text-[11px] sm:text-xs font-semibold text-red-500">
                      (Required for {countryName} Visa)
                    </span>
                  </div>

                  {/* Radio Choice Cards */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Option 1: Pickup Request */}
                    <div
                      onClick={() => handleInputChange('submissionMethod', 'pickup')}
                      className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                        formData.submissionMethod === 'pickup'
                          ? 'border-blue-400 bg-blue-50/70'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                          formData.submissionMethod === 'pickup'
                            ? 'border-blue-600 bg-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {formData.submissionMethod === 'pickup' && (
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <div className="leading-tight">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                          Pickup Request
                        </p>
                        <p className="mt-1 text-xs text-slate-500 leading-tight">
                          We will pick up the passport from your address.
                        </p>
                      </div>
                    </div>

                    {/* Option 2: Drop at Our Office */}
                    <div
                      onClick={() => handleInputChange('submissionMethod', 'office')}
                      className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                        formData.submissionMethod === 'office'
                          ? 'border-blue-400 bg-blue-50/70'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                          formData.submissionMethod === 'office'
                            ? 'border-blue-600 bg-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {formData.submissionMethod === 'office' && (
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <div className="leading-tight">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                          Drop at Our Office
                        </p>
                        <p className="mt-1 text-xs text-slate-500 leading-tight">
                          You will submit the passport at our office.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pickup Address & Office Address Row */}
                  <div className="grid grid-cols-2 gap-3.5 mt-2">
                    <div>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        <textarea
                          rows={1}
                          value={formData.pickupAddress}
                          onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                          placeholder="Enter your complete address for passport pickup"
                          className={`w-full h-11 sm:h-12 pl-9 pr-3 pt-2.5 rounded-xl border ${
                            errors.pickupAddress ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                          } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition leading-tight`}
                        />
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#f0f6ff] border border-blue-100 flex items-center gap-3 h-11 sm:h-12">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="leading-tight overflow-hidden">
                        <p className="text-xs font-bold text-slate-900 leading-none">Our Office Address</p>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-tight truncate mt-0.5">
                          House #1/B, Road #126, Gulshan 01, Dhaka 1212
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================================================== */}
                {/* 4. FOOTER ACTION BUTTONS                                 */}
                {/* ======================================================== */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition cursor-pointer active:scale-95"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#006ce4] hover:bg-[#0057b8] shadow-sm flex items-center gap-2 transition cursor-pointer active:scale-95 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
