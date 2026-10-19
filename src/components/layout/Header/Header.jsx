import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Check,
  Copy,
  Headset,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Phone,
  X,
  Search,
  Globe,
  ChevronDown,
  User,
} from 'lucide-react'
import { NAV_LINKS, NAV_SECTIONS } from '@/constants'
import { useAuth } from '@/context/AuthContext'
import { useScrollSpy } from '@/hooks'
import UserProfileDropdown from './UserProfileDropdown'

/*
  ABL Travels — brand tokens (taken from the logo):
  blue   #0d81f0 (dark #0a5ec0, soft #eaf3fd)
  orange #ff9a00 (dark #b45f00 for small text)
  navy   #0b2a4a (text)
*/

// TODO: replace with the real ABL Travels helpline details
const SUPPORT_CONTACT = {
  phone: '+880 1XXX-XXXXXX',
  email: 'support@abltravel.com',
}

const SPY_IDS = NAV_SECTIONS?.map((section) => section.id) ?? []

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d81f0] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

// One shared premium CTA style — every primary button looks and behaves the same
const primaryCta =
  'flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#0d81f0] to-[#0a5ec0] font-semibold text-white shadow-lg shadow-[#0d81f0]/30 transition-all duration-300 hover:-translate-y-px hover:shadow-xl hover:shadow-[#0d81f0]/40 active:translate-y-0'

function Logo({ onClick }) {
  return (
    <a
      href="/"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      className={`group flex shrink-0 cursor-pointer items-center gap-3 whitespace-nowrap rounded-xl ${focusRing}`}
    >
      {/* width/height prevent layout shift while the logo loads */}
      <img
        src="/company_logo.png"
        alt="ABL Travels"
        width={48}
        height={48}
        draggable={false}
        className="size-12 shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
      />

      {/* Navy + brand blue reads more premium than two near-identical blues */}
      <span className="whitespace-nowrap text-xl font-extrabold italic leading-none tracking-tight">
        <span className="text-[#0b2a4a]">ABL</span>{' '}
        <span className="text-[#0d81f0]">Travels</span>
      </span>
    </a>
  )
}

// One row in the help popup: icon, label, value (link) and a copy button
function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  copyLabel,
  copied,
  onCopy,
  onNavigate,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#0b2a4a]/10 bg-white p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf3fd] text-[#0a5ec0]">
        <Icon className="size-[18px]" strokeWidth={2} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <a
          href={href}
          onClick={onNavigate}
          className={`block truncate rounded text-[15px] font-semibold text-[#0b2a4a] transition-colors hover:text-[#0a5ec0] ${focusRing}`}
        >
          {value}
        </a>
      </div>

      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${copyLabel}`}
        className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-[#eaf3fd] hover:text-[#0a5ec0] ${focusRing}`}
      >
        {copied ? (
          <Check className="size-4 text-emerald-600" strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

// Headset button + popup with the helpline details
function HelpMenu() {
  const [open, setOpen] = useState(false)
  const [copiedKey, setCopiedKey] = useState(null)
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)
  const copyTimer = useRef(null)
  const location = useLocation()

  // Close on outside click / tap and on Escape (focus returns to the trigger)
  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Any route change should collapse the popup
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  const copy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Fallback for browsers or pages without clipboard permission
      const field = document.createElement('textarea')
      field.value = value
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand('copy')
      } catch {
        /* nothing else to try */
      }
      field.remove()
    }
    setCopiedKey(key)
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopiedKey(null), 1800)
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Help and contact"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="help-popup"
        onClick={() => setOpen((value) => !value)}
        className={`flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${focusRing} ${open
          ? 'border-[#0d81f0]/40 bg-[#eaf3fd] text-[#0a5ec0]'
          : 'border-[#0b2a4a]/15 text-[#0b2a4a]/80 hover:bg-[#eaf3fd] hover:text-[#0a5ec0]'
          }`}
      >
        <Headset className="size-[18px]" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="help-popup"
          role="dialog"
          aria-label="Help and contact"
          className="fixed inset-x-4 top-[5.5rem] z-50 overflow-hidden rounded-2xl border border-[#0b2a4a]/10 bg-white shadow-[0_24px_60px_-20px_rgba(11,42,74,0.45)] animate-fade-in sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[21rem]"
        >
          {/* Top: who we are */}
          <div className="flex items-center gap-4 bg-gradient-to-b from-[#eaf3fd] to-white p-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d81f0] to-[#0a5ec0] text-white shadow-lg shadow-[#0d81f0]/30">
              <Headset className="size-7" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="font-serif text-xl font-semibold leading-tight text-[#0b2a4a]">
                We&rsquo;re here to help
              </p>
              <p className="mt-1 text-sm leading-snug text-slate-600">
                Speak with a real travel expert — anytime, day or night.
              </p>
            </div>
          </div>

          <div className="space-y-3 p-4 pt-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600">
                Dedicated 24/7 helpline
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span
                  className="size-1.5 animate-pulse rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                Always open
              </span>
            </div>

            <ContactRow
              icon={Phone}
              label="Call us"
              value={SUPPORT_CONTACT.phone}
              href={`tel:${SUPPORT_CONTACT.phone.replace(/[^\d+]/g, '')}`}
              copyLabel="phone number"
              copied={copiedKey === 'phone'}
              onCopy={() => copy('phone', SUPPORT_CONTACT.phone)}
              onNavigate={() => setOpen(false)}
            />

            <ContactRow
              icon={Mail}
              label="Email us"
              value={SUPPORT_CONTACT.email}
              href={`mailto:${SUPPORT_CONTACT.email}`}
              copyLabel="email address"
              copied={copiedKey === 'email'}
              onCopy={() => copy('email', SUPPORT_CONTACT.email)}
              onNavigate={() => setOpen(false)}
            />

            <p className="sr-only" aria-live="polite">
              {copiedKey ? 'Copied to clipboard' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header({
  onOpenLogin,
  onNavigateToDashboard,
  onNavigateToStorefront,
  isDashboardView = false,
  onLogout,
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuToggleRef = useRef(null)
  const location = useLocation()
  const isVisaPage = location?.pathname === '/visa'
  const isHomePage = location?.pathname === '/'
  const isContactPage = location?.pathname === '/contact'

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')
  const searchWrapRef = useRef(null)
  const langWrapRef = useRef(null)

  const { currentUser, isAuthenticated, isB2BPartner, logout } = useAuth()
  const currentSection = useScrollSpy(SPY_IDS)
  const activeHref = isHomePage
    ? NAV_SECTIONS?.find((section) => section.id === currentSection)?.navHref
    : null

  // Premium detail: the header shadow only appears once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close search and lang popups on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
      if (langWrapRef.current && !langWrapRef.current.contains(e.target)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Escape closes the mobile menu and returns focus to the burger button
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Any navigation should collapse menus
  useEffect(() => {
    setOpen(false)
    setProfileDropdownOpen(false)
    setSearchOpen(false)
    setLangMenuOpen(false)
  }, [location.pathname])

  // App-like feel: lock the background while the mobile menu is open
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const handleLogout = () => {
    setProfileDropdownOpen(false)
    if (onLogout) {
      onLogout()
    } else {
      logout()
    }
  }

  const headerLinks = NAV_LINKS
    .filter((link) => link.label !== 'Become a Partner')
    .map((link) => {
      let href = link.href
      let active = false

      if (link.label === 'Visa') {
        href = '/visa'
        active = isVisaPage
      } else if (link.label === 'Contact Us') {
        href = '/contact'
        active = isContactPage
      } else if (link.label === 'Home') {
        href = '/'
        active = isHomePage && (!activeHref || activeHref === '/' || activeHref === '#home')
      } else {
        // For section anchors like #packages, #about, #contact
        href = !isHomePage && link.href.startsWith('#') ? `/${link.href}` : link.href
        active = isHomePage && (link.href === activeHref || `/${link.href}` === activeHref)
      }

      if (isDashboardView) {
        active = false
      }

      return {
        ...link,
        href,
        active,
        hasDropdown: Boolean(link.hasDropdown),
      }
    })

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80 ${scrolled
        ? 'shadow-[0_8px_30px_-18px_rgba(11,42,74,0.35)]'
        : 'shadow-none'
        }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl flex-nowrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:gap-8">
        <Logo onClick={onNavigateToStorefront} />

        {/* Desktop Navigation - strictly one line */}
        <nav
          aria-label="Main"
          className="hidden shrink-0 flex-nowrap items-center gap-5 whitespace-nowrap lg:flex xl:gap-7"
        >
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={`group relative flex items-center gap-1.5 whitespace-nowrap rounded py-2 text-[14px] font-medium tracking-wide transition-colors xl:text-[15px] ${focusRing} ${link.active
                ? 'text-[#0a5ec0]'
                : 'text-[#0b2a4a]/85 hover:text-[#0a5ec0]'
                }`}
            >
              <span>{link.label}</span>
              {link.hasDropdown && (
                <ChevronDown className="size-3.5 text-slate-500 group-hover:text-[#0a5ec0] transition-transform duration-200" />
              )}

              <span
                aria-hidden="true"
                className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-[#ff9a00] transition-transform duration-300 ${link.active
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
                  }`}
              />
            </a>
          ))}
        </nav>

        {/* Desktop Actions - strictly one line matching design screenshot */}
        <div className="hidden shrink-0 flex-nowrap items-center gap-3 whitespace-nowrap lg:flex xl:gap-5">
          {/* 1. Quick Search Icon */}
          <div className="relative" ref={searchWrapRef}>
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="flex size-9 items-center justify-center rounded-full text-slate-700 hover:text-[#0d81f0] hover:bg-slate-100/70 transition-colors cursor-pointer"
            >
              <Search className="size-[20px]" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-72 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl z-50 animate-fade-in">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200/80 focus-within:border-[#0d81f0] focus-within:bg-white">
                  <Search className="size-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tours, visas..."
                    className="w-full text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2. Language Selector with Globe */}
          <div className="relative" ref={langWrapRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-[14px] font-medium text-slate-700 hover:text-[#0d81f0] transition-colors cursor-pointer select-none"
            >
              <Globe className="size-[18px] text-slate-700" />
              <span className="font-semibold text-xs tracking-wide">{currentLang}</span>
              <ChevronDown className={`size-3.5 text-slate-600 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-28 rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg z-50 animate-fade-in text-xs font-semibold text-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang('EN')
                    setLangMenuOpen(false)
                  }}
                  className={`w-full px-3 py-1.5 text-left hover:bg-blue-50 hover:text-[#0d81f0] flex items-center justify-between ${currentLang === 'EN' ? 'text-[#0d81f0] font-bold' : ''}`}
                >
                  <span>EN</span>
                  {currentLang === 'EN' && <span>✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLang('BN')
                    setLangMenuOpen(false)
                  }}
                  className={`w-full px-3 py-1.5 text-left hover:bg-blue-50 hover:text-[#0d81f0] flex items-center justify-between ${currentLang === 'BN' ? 'text-[#0d81f0] font-bold' : ''}`}
                >
                  <span>BN</span>
                  {currentLang === 'BN' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* 3. User Profile Dropdown Trigger & Dropdown Modal */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 cursor-pointer rounded-full p-0.5 transition-transform hover:opacity-95 active:scale-95 focus:outline-none"
                aria-label="Toggle user profile menu"
                aria-expanded={profileDropdownOpen}
              >
                {isB2BPartner ? (
                  /* B2B Partner: Vibrant Blue Circle with White Letter 'A' */
                  <div className="flex size-9.5 items-center justify-center rounded-full bg-[#0066ff] text-sm font-bold text-white shadow-sm select-none">
                    {currentUser?.initials?.[0] || 'A'}
                  </div>
                ) : (
                  /* B2C Customer: Circular Headshot Photo with Blue Ring */
                  <div className="size-9.5 rounded-full ring-2 ring-[#0d81f0] overflow-hidden shadow-sm">
                    <img
                      src={currentUser?.avatar || '/images/users/sajjad-avatar.jpg'}
                      alt={currentUser?.name || 'Md. Sajjad Hossen'}
                      className="size-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.classList.add(
                          'bg-blue-600',
                          'flex',
                          'items-center',
                          'justify-center',
                          'text-white',
                          'font-bold',
                          'text-xs'
                        )
                        e.currentTarget.parentElement.innerText = currentUser?.initials || 'SH'
                      }}
                    />
                  </div>
                )}
                <ChevronDown
                  className={`size-3.5 text-slate-700 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Exact B2B & B2C Profile Dropdown Card */}
              <UserProfileDropdown
                user={currentUser}
                isB2B={isB2BPartner}
                isOpen={profileDropdownOpen}
                onClose={() => setProfileDropdownOpen(false)}
                onLogout={handleLogout}
                onNavigateToDashboard={onNavigateToDashboard}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenLogin && onOpenLogin('b2b')}
              className={`${primaryCta} px-6 py-2.5 text-sm ${focusRing}`}
            >
              <LogIn className="size-4" aria-hidden="true" />
              <span>Login</span>
            </button>
          )}

          {/* Helpline icon */}
          <HelpMenu />
        </div>

        {/* Mobile: help + menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <HelpMenu />

          <button
            ref={menuToggleRef}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={`flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#0b2a4a]/15 text-[#0b2a4a] transition-colors hover:bg-[#eaf3fd] ${focusRing}`}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Brand line: blue to orange, taken from the logo */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#0d81f0] via-[#0d81f0] to-[#ff9a00]"
      />

      {/* Mobile Navigation */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5.25rem)] overflow-y-auto border-t border-[#0b2a4a]/10 bg-white px-4 pb-6 pt-2 animate-fade-in lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {headerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={link.active ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-[#0b2a4a]/10 py-4 text-base font-medium ${link.active ? 'text-[#0a5ec0]' : 'text-[#0b2a4a]'
                  }`}
              >
                {link.label}
                {link.active && (
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-[#ff9a00]"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            {isAuthenticated ? (
              <div className="space-y-3">
                {isB2BPartner && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      if (onNavigateToDashboard) onNavigateToDashboard()
                    }}
                    className={`${primaryCta} w-full px-5 py-3.5 text-sm ${focusRing}`}
                  >
                    <LayoutDashboard className="size-4" aria-hidden="true" />
                    <span>Go to B2B Dashboard</span>
                  </button>
                )}

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    {isB2BPartner ? (
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0066ff] text-xl font-bold text-white shadow-xs select-none">
                        {currentUser?.initials?.[0] || 'A'}
                      </div>
                    ) : (
                      <div className="size-12 shrink-0 rounded-full ring-2 ring-[#0d81f0] overflow-hidden shadow-xs">
                        <img
                          src={currentUser?.avatar || '/images/users/sajjad-avatar.jpg'}
                          alt={currentUser?.name || 'Customer'}
                          className="size-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      {isB2BPartner && (
                        <span className="mb-0.5 inline-flex items-center rounded-md bg-[#eef5ff] px-2 py-0.5 text-[10px] font-semibold text-[#0066ff]">
                          B2B Partner
                        </span>
                      )}
                      <p className="text-sm font-bold text-[#0b2a4a] truncate">
                        {isB2BPartner ? (currentUser?.agencyName || currentUser?.name) : currentUser?.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>

                  <div className="my-3 border-t border-slate-100" />

                  {/* Name and Gmail detail rows */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2">
                        <User className="size-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">Name</span>
                      </div>
                      <span className="font-normal text-slate-600 truncate max-w-[170px]">
                        {isB2BPartner ? (currentUser?.agencyName || currentUser?.name) : currentUser?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail className="size-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">Gmail</span>
                      </div>
                      <span className="font-normal text-slate-600 truncate max-w-[170px]">
                        {currentUser?.email}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      handleLogout()
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff2f2] py-2.5 text-xs font-semibold text-[#ef4444] hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <LogOut className="size-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  if (onOpenLogin) onOpenLogin('b2b')
                }}
                className={`${primaryCta} w-full px-5 py-3.5 text-sm ${focusRing}`}
              >
                <LogIn className="size-4" aria-hidden="true" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Quiet brand signature closes the menu */}
          <p className="mt-6 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
            ABL Travels · Journeys crafted with care
          </p>
        </div>
      )}
    </header>
  )
}