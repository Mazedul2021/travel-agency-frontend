import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Upload,
  FileText,
  Users,
  TrendingUp,
  Coins,
  CheckCircle2,
  Globe2,
  Headset,
  Info,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/**
 * 4 Partner Perks shown as feature circles on the left banner.
 * Colored line icons inside white circles (matches the reference design).
 */
const PARTNER_PERKS = [
  { icon: Coins, color: '#f97316', title: 'Attractive', sub: 'Commission' },
  { icon: FileText, color: '#2563eb', title: 'Real-time', sub: 'Application Tracking' },
  { icon: Users, color: '#9333ea', title: 'Dedicated', sub: 'Partner Support' },
  { icon: TrendingUp, color: '#16a34a', title: 'Business', sub: 'Growth Opportunity' },
]

const STATS = [
  { icon: Users, value: '500+', label: 'Travel Partners' },
  { icon: Globe2, value: '20+', label: 'Destinations' },
  { icon: Headset, value: 'Dedicated', label: 'Support Team' },
]

const MAX_FILE_MB = 5
const ACCEPTED_TYPES = 'application/pdf,image/jpeg,image/png'
const CURRENT_YEAR = new Date().getFullYear()

export default function PartnerRegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Form state
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)

  // Document uploads: { tradeLicense, businessCard, otherDocs }
  const [docs, setDocs] = useState({ tradeLicense: null, businessCard: null, otherDocs: null })
  const [docError, setDocError] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(null)

  const tradeRef = useRef(null)
  const cardRef = useRef(null)
  const otherRef = useRef(null)

  const pickDoc = (key, file) => {
    if (!file) return
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setDocError(`"${file.name}" is larger than ${MAX_FILE_MB}MB. Please upload a smaller file.`)
      return
    }
    setDocError('')
    setDocs((prev) => ({ ...prev, [key]: file }))
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')

    if (!fullName.trim() || !mobile.trim() || !email.trim() || !password.trim() || !address.trim()) {
      setErrorMessage('Please fill in all required fields.')
      return
    }
    if (!docs.tradeLicense) {
      setErrorMessage('Trade License is required to become a partner.')
      return
    }
    if (!agree) {
      setErrorMessage('Please agree to the Terms & Conditions and Privacy Policy.')
      return
    }

    setIsLoading(true)
    // Simulate a short processing delay (no backend partner endpoint yet)
    await new Promise((r) => setTimeout(r, 800))

    const res = await login({ email, password, role: 'B2B' })
    setIsLoading(false)

    if (res.success) {
      setSuccess({ name: fullName || res.user.name })
      setTimeout(() => navigate('/b2b'), 1100)
    } else {
      setErrorMessage('Could not create your partner account. Please try again.')
    }
  }


  const inputClass =
    'w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-[#2563eb] transition-all text-slate-800 placeholder:text-slate-400'

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc] text-navy font-sans relative overflow-x-hidden">
      {/* ======================================================== */}
      {/* LEFT SECTION: Scenic Partner Banner                       */}
      {/* ======================================================== */}
      <div className="relative w-full lg:w-[52%] min-h-[560px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden bg-slate-900">
        {/* Scenic wallpaper */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/login-banners/banner-0.jpg"
            alt="Scenic travel destination"
            className="w-full h-full object-cover object-center"
          />
          {/* Top-left soft white glow so dark text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 via-45% to-transparent z-1" />
          {/* Bottom dark gradient for card & script readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-1" />
        </div>

        {/* Top: Brand + Hero copy */}
        <div className="relative z-10 max-w-xl">
          {/* Brand logo */}
          <div className="flex items-center gap-2.5 mb-6">
            <img
              src="/company_logo.png"
              alt="ABL Travels"
              width={48}
              height={48}
              draggable={false}
              className="size-10 shrink-0 rounded-lg bg-white object-contain p-0.5 drop-shadow-sm"
            />
            <span className="text-xl font-black italic text-[#2563eb]">ABL Travels</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 mb-3">
            <span>Partner with ABL Travels</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0d2b59] leading-[1.06] tracking-tight">
            Let&rsquo;s Grow <br />
            <span className="text-[#2563eb]">Together</span>
          </h1>

          {/* Description */}
          <p className="mt-3.5 text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-lg">
            Join our partner network and get access to China visa services, international tour
            packages, attractive commissions and dedicated support.
          </p>

          {/* 4 Partner Perks (white circles + colored icons) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-lg">
            {PARTNER_PERKS.map((perk) => (
              <div key={perk.sub} className="flex flex-col items-center text-center">
                <div className="size-14 rounded-full bg-white shadow-lg ring-1 ring-white/60 flex items-center justify-center">
                  <perk.icon className="size-6" style={{ color: perk.color }} strokeWidth={2.1} />
                </div>
                <span className="text-[11px] sm:text-xs font-bold mt-2 leading-tight text-[#0d2b59]">
                  {perk.title} <br />
                  {perk.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Stats bar + Script calligraphy */}
        <div className="relative z-10 mt-12">
          {/* Stats glass bar */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-9 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 px-5 py-4 max-w-lg">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="flex items-center justify-center size-11 rounded-full bg-white/10 text-white shrink-0">
                  <s.icon className="size-5" strokeWidth={2} />
                </span>
                <div className="leading-tight">
                  <span className="block text-lg font-black text-white">{s.value}</span>
                  <span className="block text-[11px] font-medium text-white/80">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Script calligraphy */}
          <div className="mt-6 select-none">
            <div className="font-script text-white text-3xl sm:text-4xl md:text-[40px] leading-[0.95] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] -rotate-6 transform origin-bottom-left">
              <div>More Destinations</div>
              <div className="ml-6 relative inline-block">
                <span>More Opportunities</span>
                {/* Golden brush underline */}
                <svg
                  className="absolute -bottom-1.5 -left-1 w-full h-3 overflow-visible pointer-events-none"
                  viewBox="0 0 100 12"
                  fill="none"
                >
                  <path
                    d="M2 6 C 25 11, 60 2, 98 7"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT SECTION: Partner Registration Card                 */}
      {/* ======================================================== */}
      <div className="relative w-full lg:w-[48%] min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-10 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e8f1fc]">
        {/* Top Right: Back to Login */}
        <div className="relative z-10 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#2563eb] transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-white/80"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Login</span>
          </button>
        </div>

        {/* Center: Registration Card */}
        <div className="relative z-10 my-auto py-6 flex justify-center">
          <div className="w-full max-w-[520px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100">
            {/* Card header: logo + titles */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <img
                  src="/company_logo.png"
                  alt="ABL Travels"
                  width={48}
                  height={48}
                  draggable={false}
                  className="size-11 shrink-0 rounded-xl bg-white object-contain p-0.5 drop-shadow-sm"
                />
                <span className="text-xl sm:text-2xl font-black italic text-[#2563eb]">
                  ABL Travels
                </span>
              </div>
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0d2b59] tracking-tight mt-3 text-center">
                Create Partner Account
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-1 text-center max-w-sm">
                Fill in your information and upload the required documents to become our travel
                partner.
              </p>
            </div>

            {success ? (
              <div className="py-10 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Welcome, {success.name}!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Your partner account is ready. Redirecting to your dashboard&hellip;
                </p>
                <div className="w-40 h-1 bg-slate-100 rounded-full mt-5 overflow-hidden">
                  <div className="h-full bg-[#2563eb] rounded-full animate-pulse w-full" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
                    {errorMessage}
                  </div>
                )}

                {/* Row 1: Full Name + Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="size-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="size-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter mobile number"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email + Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="size-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="size-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className={`${inputClass} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address (full width) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="size-4" />
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full address"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                {/* Upload Required Documents */}
                <div className="pt-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#0d2b59]">
                        Upload Required Documents
                      </span>
                      <Info className="size-4 text-slate-400" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400">
                      Accepted: PDF, JPG, PNG (Max {MAX_FILE_MB}MB each)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <DocBox
                      title="Trade License"
                      tag="(Required)"
                      file={docs.tradeLicense}
                      onPick={(f) => pickDoc('tradeLicense', f)}
                      onClear={() => setDocs((p) => ({ ...p, tradeLicense: null }))}
                      inputRef={tradeRef}
                    />
                    <DocBox
                      title="Business Card"
                      tag="(Optional)"
                      file={docs.businessCard}
                      onPick={(f) => pickDoc('businessCard', f)}
                      onClear={() => setDocs((p) => ({ ...p, businessCard: null }))}
                      inputRef={cardRef}
                    />
                    <DocBox
                      title="Other Documents"
                      tag="(Optional)"
                      file={docs.otherDocs}
                      onPick={(f) => pickDoc('otherDocs', f)}
                      onClear={() => setDocs((p) => ({ ...p, otherDocs: null }))}
                      inputRef={otherRef}
                    />
                  </div>

                  {docError && (
                    <p className="text-[11px] text-rose-600 mt-2">{docError}</p>
                  )}
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 size-4 rounded text-[#2563eb] border-slate-300 focus:ring-sky-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to the{' '}
                    <span className="font-semibold text-[#2563eb]">Terms &amp; Conditions</span> and{' '}
                    <span className="font-semibold text-[#2563eb]">Privacy Policy</span>
                  </span>
                </label>

                {/* Primary Orange CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-1 py-3 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#f97316] hover:from-[#ea580c] hover:to-[#f97316] text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin size-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Creating your account&hellip;
                    </span>
                  ) : (
                    <>
                      <span>Create Partner Account</span>
                      <ArrowRight className="size-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>


                {/* Switch to login */}
                <div className="pt-2 text-center text-xs text-slate-500">
                  Already have a partner account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-bold text-[#2563eb] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    Login Here <ArrowRight className="size-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10 text-center text-[11px] text-slate-400">
          &copy; {CURRENT_YEAR} ABL Travels. All rights reserved.
        </div>
      </div>
    </div>
  )
}

/**
 * Single document upload tile: dashed border, upload icon,
 * title + required/optional tag, and an "Upload File" button.
 */
function DocBox({ title, tag, file, onPick, onClear, inputRef }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
        file ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200 bg-slate-50/40'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={(e) => {
          onPick(e.target.files?.[0])
          e.target.value = ''
        }}
      />

      {file ? (
        <>
          <CheckCircle2 className="size-6 text-emerald-600" />
          <span className="text-[11px] font-semibold text-slate-700 line-clamp-1 max-w-full px-1">
            {file.name}
          </span>
          <button
            type="button"
            onClick={() => {
              onClear()
              inputRef.current?.click()
            }}
            className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#2563eb] hover:underline cursor-pointer"
          >
            <X className="size-3" /> Remove
          </button>
        </>
      ) : (
        <>
          <Upload className="size-5 text-[#2563eb]" strokeWidth={2.2} />
          <span className="text-xs font-bold text-[#0d2b59] leading-tight">{title}</span>
          <span className="text-[10px] text-slate-400 -mt-0.5">{tag}</span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-1 w-full py-1.5 rounded-lg bg-sky-50 text-[#2563eb] text-[11px] font-bold hover:bg-sky-100 transition-colors cursor-pointer"
          >
            Upload File
          </button>
        </>
      )}
    </div>
  )
}
