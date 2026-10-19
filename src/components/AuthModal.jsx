import { useState, useEffect } from 'react'
import {
  X,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Plane,
  Building2,
  FileCheck2,
  DollarSign,
  Truck,
} from 'lucide-react'
import { useAuth, DEMO_B2B_PARTNER, DEMO_B2C_CUSTOMER } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose, defaultTab = 'b2b', onRedirectToDashboard }) {
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState(defaultTab) // 'b2b' | 'customer'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(null) // null | { name, role }

  // Sync default tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab)
      setLoginSuccess(null)
      setIsLoading(false)
      if (defaultTab === 'b2b') {
        setEmail(DEMO_B2B_PARTNER.email)
        setPassword('PartnerPass2025!')
      } else {
        setEmail(DEMO_B2C_CUSTOMER.email)
        setPassword('CustomerPass2025!')
      }
    }
  }, [isOpen, defaultTab])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setLoginSuccess(null)
    if (tab === 'b2b') {
      setEmail(DEMO_B2B_PARTNER.email)
      setPassword('PartnerPass2025!')
    } else {
      setEmail(DEMO_B2C_CUSTOMER.email)
      setPassword('CustomerPass2025!')
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setIsLoading(true)

    // Simulate authentic network latency for realism
    await new Promise((res) => setTimeout(res, 500))

    const role = activeTab === 'b2b' ? 'B2B' : 'B2C'
    const res = await login({ email, password, role })

    setIsLoading(false)
    if (res.success) {
      setLoginSuccess({
        name: res.user.name,
        role,
      })

      // Redirect after showing positive feedback
      setTimeout(() => {
        onClose()
        if (role === 'B2B' && onRedirectToDashboard) {
          onRedirectToDashboard()
        }
      }, 700)
    }
  }

  const handleQuickDemoLogin = async (role) => {
    setIsLoading(true)
    await new Promise((res) => setTimeout(res, 400))
    const res = await login({ role, isDemo: true })
    setIsLoading(false)
    if (res.success) {
      setLoginSuccess({
        name: res.user.name,
        role,
      })
      setTimeout(() => {
        onClose()
        if (role === 'B2B' && onRedirectToDashboard) {
          onRedirectToDashboard()
        }
      }, 700)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-navy-dark/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 transition-all animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Decorative Banner */}
        <div className="relative bg-gradient-to-r from-[#0d2b59] via-[#1565c0] to-[#0d47a1] px-6 pt-7 pb-6 text-white overflow-hidden">
          {/* Subtle background glow circles */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <span className="relative flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-md">
              <Plane className="size-5 text-white" strokeWidth={2.4} />
            </span>
            <div>
              <span className="text-xl font-extrabold tracking-tight">
                ABL <span className="text-accent">Travels</span>
              </span>
              <p className="text-xs text-white/80 font-medium">
                Identity & Access Management Portal
              </p>
            </div>
          </div>

          {/* Dual Role Selector Tabs */}
          <div className="mt-6 grid grid-cols-2 p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <button
              type="button"
              onClick={() => handleTabChange('b2b')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'b2b'
                  ? 'bg-white text-[#0d2b59] shadow-md shadow-black/10'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>B2B Partner Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('customer')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-white text-[#0d2b59] shadow-md shadow-black/10'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Customer / Traveler</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {loginSuccess ? (
            /* Success Feedback State */
            <div className="py-8 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="size-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Welcome back, {loginSuccess.name}!
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                {loginSuccess.role === 'B2B'
                  ? 'Authentication successful! Redirecting you to your B2B Partner Dashboard...'
                  : 'Welcome to ABL Travels! You are now logged in.'}
              </p>

              {/* Animated Progress Bar */}
              <div className="w-48 h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse w-full" />
              </div>
            </div>
          ) : (
            /* Standard Login Form */
            <div>
              {/* Tab Info Sub-banner */}
              {activeTab === 'b2b' ? (
                <div className="mb-5 rounded-2xl bg-[#eaf2fc]/70 border border-[#1565c0]/15 p-3.5 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-primary text-white shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary">
                      Authorized B2B Partner Access
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                      Direct access for travel agents, tour operators & corporate partners.
                      Instant redirect to applications, courier pickups, and ledger.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-5 rounded-2xl bg-amber-50/80 border border-amber-200/40 p-3.5 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-accent text-white shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">
                      Traveler Account
                    </h4>
                    <p className="text-[11px] text-amber-800 leading-snug mt-0.5">
                      Track your personal visa submissions, tour bookings, and custom travel itineraries.
                    </p>
                  </div>
                </div>
              )}

              {/* 1-Click Instant Demo Login Button */}
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin(activeTab === 'b2b' ? 'B2B' : 'B2C')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border-2 border-dashed border-primary/40 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/70 hover:border-primary hover:bg-blue-50 text-slate-800 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-8 rounded-xl bg-primary text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ⚡
                    </span>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-primary group-hover:text-primary-dark">
                        {activeTab === 'b2b'
                          ? '1-Click Demo Login as B2B Partner'
                          : '1-Click Demo Login as Traveler'}
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        {activeTab === 'b2b'
                          ? 'Ajmal Travel Agency (B2B Partner)'
                          : 'Md. Sajjad Hossen (Customer)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Enter <ArrowRight className="size-3.5" />
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400 shrink-0">
                  Or enter credentials
                </span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {activeTab === 'b2b' ? 'Partner Business Email' : 'Email Address'}
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
                      placeholder={activeTab === 'b2b' ? 'agency@abltravels.com' : 'you@example.com'}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    <a
                      href="#forgot-password"
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Password reset link will be sent to your registered email.')
                      }}
                      className="text-[11px] font-medium text-primary hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="size-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <span>
                        {activeTab === 'b2b'
                          ? 'Sign In to B2B Partner Portal'
                          : 'Sign In to My Account'}
                      </span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>

              {/* B2B Partner Highlights pill footer */}
              {activeTab === 'b2b' && (
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <FileCheck2 className="size-4 text-primary mb-1" />
                    <span className="text-[10px] font-semibold text-slate-700">Bulk Visa Ops</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="size-4 text-accent mb-1" />
                    <span className="text-[10px] font-semibold text-slate-700">Passport Courier</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <DollarSign className="size-4 text-emerald-600 mb-1" />
                    <span className="text-[10px] font-semibold text-slate-700">Instant Ledger</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
