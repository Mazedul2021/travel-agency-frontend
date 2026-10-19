import { useState, useRef, useEffect } from 'react'
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  DollarSign,
  LogOut,
} from 'lucide-react'
import Logo from './common/Logo'
import { PARTNER_INFO, TOP_NAV_ITEMS } from '../data/partnerData'
import UserProfileDropdown from '@/components/layout/Header/UserProfileDropdown'

export default function Header({
  onTabChange,
  activeTab,
  onNavigateToStorefront,
  onLogout,
  currentUser,
}) {
  const partner = currentUser || PARTNER_INFO
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const notifRef = useRef(null)
  const profileRef = useRef(null)

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const notifications = [
    {
      id: 1,
      title: 'Visa Application Approved',
      desc: 'Tanvir Ahmed (Malaysia Business Visa) has been approved by embassy.',
      time: '15 mins ago',
      unread: true,
      icon: CheckCircle2,
      iconColor: 'text-emerald-500 bg-emerald-50',
    },
    {
      id: 2,
      title: 'Passport Courier Scheduled',
      desc: 'Pickup #PKP-2025-018 rider Tariqul Islam is on the way to Gulshan-2.',
      time: '1 hour ago',
      unread: true,
      icon: Clock,
      iconColor: 'text-blue-500 bg-blue-50',
    },
    {
      id: 3,
      title: 'New Commission Credited',
      desc: '$320.00 commission for PKP-2025-0789 credited to your ledger.',
      time: '3 hours ago',
      unread: true,
      icon: DollarSign,
      iconColor: 'text-amber-500 bg-amber-50',
    },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 xl:gap-6 flex-nowrap">
          {/* Logo and Nav Items Container */}
          <div className="flex items-center gap-3 lg:gap-5 xl:gap-8 flex-nowrap shrink-0 min-w-0">
            <button
              onClick={() => onTabChange('applications')}
              className="focus:outline-none cursor-pointer shrink-0"
            >
              <Logo />
            </button>

            {/* Desktop Navigation - Always in ONE line */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 text-[13px] xl:text-[14px] font-medium text-slate-700 whitespace-nowrap shrink-0 flex-nowrap">
              {TOP_NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative group shrink-0"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-colors hover:text-[#0066cc] hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0 ${
                      activeDropdown === item.label ? 'text-[#0066cc]' : ''
                    }`}
                  >
                    <span className="whitespace-nowrap shrink-0">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066cc] transition-transform duration-200 group-hover:rotate-180 shrink-0" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-1.5 w-56 animate-fade-in z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                        {item.items.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setActiveDropdown(null)
                              if (sub.includes('Commission')) onTabChange('invoices')
                              else if (sub.includes('Tracking') || sub.includes('Visa')) onTabChange('applications')
                              else if (sub.includes('Agent Guidelines') || sub.includes('Portal')) onTabChange('profile')
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] transition-colors flex items-center justify-between whitespace-nowrap"
                          >
                            <span className="whitespace-nowrap">{sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 whitespace-nowrap flex-nowrap">
            {/* Return to Storefront button */}
            {onNavigateToStorefront && (
              <button
                type="button"
                onClick={onNavigateToStorefront}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-[#0066cc] border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
                title="View public storefront website"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>Storefront</span>
              </button>
            )}

            {/* Quick Search */}
            <div className="relative shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-[#0066cc] hover:bg-slate-100 transition-colors shrink-0"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-xl shadow-xl border border-slate-100 p-3 z-50 animate-fade-in">
                  <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:border-[#0066cc]">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search passports, visas, invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative shrink-0" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-[#0066cc] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                      <span className="px-2 py-0.5 text-xs bg-rose-100 text-rose-700 rounded-full font-medium">3 unread</span>
                    </div>
                    <button className="text-xs text-[#0066cc] hover:underline font-medium">Mark all read</button>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((n) => {
                      const Icon = n.icon
                      return (
                        <div key={n.id} className="p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3">
                          <div className={`p-2 rounded-xl shrink-0 ${n.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setNotificationsOpen(false)
                        onTabChange('applications')
                      }}
                      className="text-xs text-[#0066cc] font-medium hover:underline"
                    >
                      View all partner activity →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative shrink-0" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-1.5 cursor-pointer rounded-full p-0.5 transition-transform hover:opacity-95 active:scale-95 focus:outline-none"
                aria-label="Toggle user profile menu"
                aria-expanded={profileMenuOpen}
              >
                <div className="flex size-9.5 items-center justify-center rounded-full bg-[#0066ff] text-sm font-bold text-white shadow-sm select-none">
                  {partner.initials?.[0] || 'A'}
                </div>
                <ChevronDown className={`size-3.5 text-slate-700 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <UserProfileDropdown
                user={partner}
                isB2B={true}
                isOpen={profileMenuOpen}
                onClose={() => setProfileMenuOpen(false)}
                onLogout={onLogout}
                onNavigateToDashboard={() => onTabChange('profile')}
              />
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-3 space-y-1 animate-fade-in">
            {TOP_NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (item.label === 'Support') onTabChange('support')
                    else if (item.label === 'B2B Partner') onTabChange('profile')
                    else onTabChange('applications')
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0066cc] rounded-lg"
                >
                  {item.label}
                </button>
              </div>
            ))}

            {onNavigateToStorefront && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToStorefront()
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-[#0066cc] hover:bg-blue-50 rounded-lg flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Storefront Website</span>
              </button>
            )}

            {onLogout && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onLogout()
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
