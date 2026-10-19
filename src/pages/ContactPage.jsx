import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  ChevronRight,
  Compass,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  MessageCircle,
} from 'lucide-react'

// Custom SVGs matching the reference image for WhatsApp, Messenger, and Socials
function WhatsAppIcon({ className = 'w-5 h-5 text-white' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function MessengerIcon({ className = 'w-5 h-5 text-white' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.914 1.455 5.518 3.735 7.208V22l3.39-1.86c.915.254 1.884.39 2.875.39 5.523 0 10-4.145 10-9.272C22 6.145 17.523 2 12 2zm1.066 12.443-2.73-2.91-5.328 2.91 5.86-6.222 2.799 2.91 5.259-2.91-5.86 6.222z" />
    </svg>
  )
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

// 6 Frequently Asked Questions matching reference image exactly
const FAQ_ITEMS = [
  {
    question: 'How can I apply for a visa?',
    answer:
      'You can apply directly through our website by visiting the Visa page, selecting your desired destination country, filling out the online application form, and uploading the required documents. Our visa experts will review your submission and contact you for the next steps.',
  },
  {
    question: 'What documents are required for a tourist visa?',
    answer:
      'Standard requirements typically include an original passport with at least 6 months validity, recent passport-size photographs, bank statement for the last 6 months with solvency certificate, profession proof (visiting card / trade license / NOC), and round-trip flight booking.',
  },
  {
    question: 'How long does visa processing take?',
    answer:
      'Processing duration varies by destination. For instance, China visas usually take 10–15 working days, while Thailand, Malaysia, and Singapore take 5–7 working days. Rush or express processing is available for eligible categories upon request.',
  },
  {
    question: 'Can I book a tour package directly from your website?',
    answer:
      'Yes, you can browse all featured packages on our Tour Packages section, check complete day-wise itineraries, inclusions and exclusions, and click "Book Now" or contact our consultants for customized group discounts.',
  },
  {
    question: 'Do you provide custom tour packages?',
    answer:
      'Yes, absolutely! We specialize in tailored itineraries for solo travelers, families, corporate retreats, and honeymooners. Contact our specialists with your preferred dates, budget, and destinations to receive a customized quote.',
  },
  {
    question: 'How can I track my visa application?',
    answer:
      'Upon submitting your application, you will receive a unique Reference Number (e.g., ABL-XXXXXX). You can check the current status in your account dashboard or simply message our support desk with your reference ID.',
  },
]

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // FAQ Accordion State (Accordion toggle)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  // Map Zoom State
  const [zoomLevel, setZoomLevel] = useState(15)

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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required'
    if (!formData.subject) newErrors.subject = 'Please select a subject'
    if (!formData.message.trim()) newErrors.message = 'Please type your message'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        subject: '',
        message: '',
      })
      setTimeout(() => setSubmitSuccess(false), 6000)
    }, 700)
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) return
    setNewsletterSuccess(true)
    setNewsletterEmail('')
    setTimeout(() => setNewsletterSuccess(false), 5000)
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* ======================================================== */}
      {/* 1. HERO SECTION WITH TROPICAL BAY & LONGTAIL BOAT        */}
      {/* ======================================================== */}
      <section className="relative h-[280px] sm:h-[340px] lg:h-[380px] w-full overflow-hidden">
        {/* Background photo */}
        <img
          src="/images/contact-hero-beach.jpg"
          alt="Contact Us - ABL Travels"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay matching reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031b33]/90 via-[#031b33]/65 via-45% to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium mb-3">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-white font-semibold">Contact Us</span>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-sm">
            Contact Us
          </h1>

          {/* Subtitle */}
          <p className="mt-3 max-w-xl text-xs sm:text-sm lg:text-[15px] leading-relaxed text-slate-200 font-normal drop-shadow-xs">
            We&apos;re here to help you with your travel and visa needs.
            <br className="hidden sm:inline" />
            Get in touch with our team for any questions, support
            <br className="hidden sm:inline" />
            or travel planning assistance.
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FOUR QUICK INFO CARDS                                 */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Call Us */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-blue-100 group">
            <div className="w-12 h-12 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5 fill-current" />
            </div>
            <div className="leading-tight">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">Call Us</h4>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                <a href="tel:+8801717999637" className="hover:text-blue-600 transition">
                  +880 1717-999637
                </a>
              </p>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                <a href="tel:+880255012345" className="hover:text-blue-600 transition">
                  +880 2 5501 2345
                </a>
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 font-normal">
                Sun - Thu, 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Card 2: Email Us */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-blue-100 group">
            <div className="w-12 h-12 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5 fill-current" />
            </div>
            <div className="leading-tight">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">Email Us</h4>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                <a href="mailto:info@abltravels.com" className="hover:text-blue-600 transition">
                  info@abltravels.com
                </a>
              </p>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                <a href="mailto:support@abltravels.com" className="hover:text-blue-600 transition">
                  support@abltravels.com
                </a>
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 font-normal">
                We reply within 24 hours
              </p>
            </div>
          </div>

          {/* Card 3: Visit Our Office */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-blue-100 group">
            <div className="w-12 h-12 rounded-full bg-[#ffedd5] text-[#f97316] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">Visit Our Office</h4>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                House 12, Road 3, Dhanmondi
              </p>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                Dhaka 1205, Bangladesh
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 font-normal">
                Sun - Thu, 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Card 4: Working Hours */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-blue-100 group">
            <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">Working Hours</h4>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                Sunday - Thursday
              </p>
              <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                9:00 AM - 6:00 PM
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 font-normal">
                Friday &amp; Saturday Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. MAIN 2-COLUMN SECTION                                 */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* ====================================================== */}
          {/* LEFT COLUMN: TOP - SEND US A MESSAGE                   */}
          {/* ====================================================== */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-emerald-900">Message Sent Successfully!</p>
                  <p className="mt-0.5 text-emerald-700">
                    Thank you for contacting ABL Travels. Our travel consultants will get back to you shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full h-11 px-3.5 rounded-xl border ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                    } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className={`w-full h-11 px-3.5 rounded-xl border ${
                      errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                    } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Contact Number & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    placeholder="Enter your contact number"
                    className={`w-full h-11 px-3.5 rounded-xl border ${
                      errors.contactNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                    } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition`}
                  />
                  {errors.contactNumber && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.contactNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full h-11 px-3.5 pr-9 rounded-xl border appearance-none ${
                        errors.subject ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                      } text-xs sm:text-sm ${
                        formData.subject ? 'text-slate-900' : 'text-slate-400'
                      } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer`}
                    >
                      <option value="">Select a subject</option>
                      <option value="Visa Processing Inquiry">Visa Processing Inquiry</option>
                      <option value="China Visa Processing">China Visa Processing</option>
                      <option value="Tour Package Booking">Tour Package Booking</option>
                      <option value="Custom Tour Planning">Custom Tour Planning</option>
                      <option value="B2B Partnership">B2B Partnership</option>
                      <option value="Feedback / Other Inquiry">Feedback / Other Inquiry</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  {errors.subject && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Your Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Type your message here..."
                  className={`w-full p-3.5 rounded-xl border ${
                    errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                  } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="text-base leading-none">&rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: TOP - OUR OFFICE LOCATION                */}
          {/* ====================================================== */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 flex flex-col justify-between">
            <div>
              {/* Header with Title and Get Directions Button */}
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Our Office Location
                </h2>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=House+12,+Road+3,+Dhanmondi,+Dhaka+1205,+Bangladesh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-600 text-xs font-bold transition shadow-2xs cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-4">
                Visit us at our office or find us on the map below.
              </p>

              {/* Map Preview Container */}
              <div className="relative w-full h-[210px] sm:h-[230px] rounded-xl overflow-hidden border border-slate-200 shadow-2xs group">
                {/* Clean Embedded OpenStreetMap / Stylized Map of Dhanmondi */}
                <iframe
                  title="ABL Travels Dhanmondi Office Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=90.366%2C23.740%2C90.384%2C23.754&layer=mapnik&marker=23.7461%2C90.3752"
                  className="w-full h-full border-0 pointer-events-auto"
                  loading="lazy"
                />

                {/* Styled Pin Badge Overlay matching reference screenshot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-md shadow-md border border-slate-200 text-[11px] font-bold text-slate-900 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>ABL Travels</span>
                  </div>
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white drop-shadow-xs" />
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white shadow-md -mt-1" />
                </div>

                {/* Map Controls (+ / -) in bottom-right */}
                <div className="absolute right-3 bottom-3 flex flex-col bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden z-10">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(z + 1, 19))}
                    className="p-1.5 hover:bg-slate-100 text-slate-600 transition"
                    title="Zoom in"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-px bg-slate-200" />
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(z - 1, 10))}
                    className="p-1.5 hover:bg-slate-100 text-slate-600 transition"
                    title="Zoom out"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Office Photo Below Map */}
              <div className="relative mt-4 w-full h-[180px] sm:h-[195px] rounded-xl overflow-hidden border border-slate-200 shadow-2xs group">
                <img
                  src="/images/office-reception.jpg"
                  alt="ABL Travels Corporate Reception - Dhanmondi Office"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                />
                {/* Backlit Overlay & Subtle Label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white text-xs font-bold drop-shadow-sm">
                      ABL Travels Reception &amp; Customer Lounge
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* LEFT COLUMN: BOTTOM - FREQUENTLY ASKED QUESTIONS       */}
          {/* ====================================================== */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
              Find quick answers to common questions.
            </p>

            <div className="space-y-2.5">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={item.question}
                    className="rounded-xl border border-slate-200/90 bg-white overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 hover:bg-slate-50/50 transition cursor-pointer"
                    >
                      <span className="leading-snug">{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100 bg-[#fbfcfe]">
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: BOTTOM - NEED IMMEDIATE ASSISTANCE?      */}
          {/* ====================================================== */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Need Immediate Assistance?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                For urgent inquiries, you can reach us directly through the following channels.
              </p>

              <div className="space-y-3.5">
                {/* 1. WhatsApp Channel */}
                <a
                  href="https://wa.me/8801717999637"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 flex items-center justify-between gap-4 transition group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <WhatsAppIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        WhatsApp
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 font-medium leading-tight">
                        +880 1717-999637
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
                </a>

                {/* 2. Facebook Messenger Channel */}
                <a
                  href="https://m.me/abltravels"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 flex items-center justify-between gap-4 transition group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#0084FF] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <MessengerIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        Facebook Messenger
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 font-medium leading-tight">
                        m.me/abltravels
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                </a>

                {/* 3. Email Support Channel */}
                <a
                  href="mailto:support@abltravels.com"
                  className="p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 flex items-center justify-between gap-4 transition group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        Email Support
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 font-medium leading-tight">
                        support@abltravels.com
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. EXACT FOOTER MATCHING REFERENCE IMAGE                 */}
      {/* ======================================================== */}
      <footer className="bg-[#0b1a2e] text-white pt-14 pb-8 relative overflow-hidden border-t border-slate-800">
        {/* Subtle background landscape tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a2e]/95 to-[#06101e] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-4">
              <a href="/" className="inline-flex items-center gap-2.5">
                <img
                  src="/company_logo.png"
                  alt="ABL Travels Logo"
                  className="w-10 h-10 object-contain rounded-lg bg-white p-0.5 shadow-md"
                />
                <span className="text-xl font-black italic tracking-tight text-white">
                  ABL <span className="font-extrabold not-italic text-white">Travels</span>
                </span>
              </a>

              <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-slate-300 max-w-sm font-normal">
                Your trusted travel and visa partner. We make your travel dreams simple, safe and
                memorable with reliable services and expert support.
              </p>

              {/* Social icons in circular dark pills */}
              <div className="mt-6 flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-pink-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-sky-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white tracking-wide mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-300 font-normal">
                <li>
                  <a href="/" className="hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/visa" className="hover:text-white transition">
                    Visa
                  </a>
                </li>
                <li>
                  <a href="/tour-packages" className="hover:text-white transition">
                    Tour Packages
                  </a>
                </li>
                <li>
                  <a href="/#destinations" className="hover:text-white transition">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="/b2b" className="hover:text-white transition">
                    B2B Partner
                  </a>
                </li>
                <li>
                  <a href="/#about" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition text-white font-semibold">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-bold text-white tracking-wide mb-4">Contact Info</h4>
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-slate-300 font-normal">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    House 12, Road 3, Dhanmondi
                    <br />
                    Dhaka 1205, Bangladesh
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <p>+880 1717-999637</p>
                    <p>+880 2 5501 2345</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <p>info@abltravels.com</p>
                    <p>support@abltravels.com</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-bold text-white tracking-wide mb-4">Newsletter</h4>
              <p className="text-xs sm:text-[13px] text-slate-300 mb-4 leading-relaxed font-normal">
                Subscribe to get the latest travel deals and updates.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex rounded-xl overflow-hidden shadow-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-3.5 py-2.5 text-xs bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs font-bold px-4 py-2.5 transition cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterSuccess && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    Thank you for subscribing to our newsletter!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Terms */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-normal">
            <p>&copy; 2026 ABL Travels. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <span className="text-slate-600">|</span>
              <a href="#" className="hover:text-white transition">
                Terms &amp; Conditions
              </a>
              <span className="text-slate-600">|</span>
              <a href="#" className="hover:text-white transition">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
