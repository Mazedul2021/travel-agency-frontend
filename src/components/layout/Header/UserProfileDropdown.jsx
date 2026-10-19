import { useEffect, useRef } from 'react'
import { User, Mail, LogOut, ChevronDown, ExternalLink } from 'lucide-react'

/**
 * UserProfileDropdown
 * Replicates the exact B2B Partner and B2C Profile Dropdown modal
 * from the design specification screenshots.
 */
export default function UserProfileDropdown({
  user,
  isB2B,
  isOpen,
  onClose,
  onLogout,
  onNavigateToDashboard,
}) {
  const dropdownRef = useRef(null)

  // Close on click outside or escape key
  useEffect(() => {
    if (!isOpen) return undefined

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !user) return null

  const displayName = isB2B
    ? user.agencyName || user.name || 'Ajmal Travel Agency'
    : user.name || 'Md. Sajjad Hossen'

  const displayEmail = user.email || (isB2B ? 'ajmaltravel@gmail.com' : 'sajjad.hossen@gmail.com')
  const initial = isB2B ? (user.initials?.[0] || 'A') : (user.initials || 'SH')
  const avatarUrl = user.avatar || '/images/users/sajjad-avatar.jpg'

  return (
    <div
      ref={dropdownRef}
      role="menu"
      aria-label="User Profile Menu"
      className="absolute right-0 top-full mt-3.5 w-[330px] rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_50px_rgba(11,42,74,0.12),0_4px_16px_rgba(11,42,74,0.04)] z-50 animate-fade-in"
    >
      {/* Upward pointing triangle beak matching screenshot */}
      <div
        aria-hidden="true"
        className="absolute -top-[7px] right-[22px] size-3.5 rotate-45 border-l border-t border-slate-100 bg-white shadow-[-3px_-3px_5px_rgba(0,0,0,0.02)]"
      />

      {/* Header Profile Section */}
      <div className="relative flex items-center gap-3.5">
        {/* Avatar */}
        {isB2B ? (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#0066ff] text-2xl font-bold text-white shadow-sm select-none">
            {initial}
          </div>
        ) : (
          <div className="size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100 shadow-sm">
            <img
              src={avatarUrl}
              alt={displayName}
              className="size-full object-cover"
              onError={(e) => {
                // Graceful fallback to initial if image fails
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.classList.add(
                  'bg-gradient-to-br',
                  'from-blue-600',
                  'to-blue-700',
                  'flex',
                  'items-center',
                  'justify-center',
                  'text-white',
                  'font-bold',
                  'text-xl'
                )
                e.currentTarget.parentElement.innerText = initial
              }}
            />
          </div>
        )}

        {/* Identity Info */}
        <div className="min-w-0 flex-1">
          {isB2B && (
            <div className="mb-1">
              <span className="inline-flex items-center rounded-md bg-[#eef5ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#0066ff]">
                B2B Partner
              </span>
            </div>
          )}

          <h3 className="truncate text-[16px] font-bold text-[#0b2a4a] leading-snug">
            {displayName}
          </h3>

          <p className="truncate text-xs font-normal text-slate-500 mt-0.5">
            {displayEmail}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-100" />

      {/* Detail Rows */}
      <div className="space-y-0 text-[13.5px]">
        {/* Row 1: Name */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100/80 pb-3">
          <div className="flex items-center gap-2.5 text-slate-600">
            <User className="size-[18px] text-slate-500 shrink-0" strokeWidth={1.8} />
            <span className="font-medium text-slate-700">Name</span>
          </div>
          <span className="truncate font-normal text-slate-600 text-right max-w-[170px]" title={displayName}>
            {displayName}
          </span>
        </div>

        {/* Row 2: Gmail */}
        <div className="flex items-center justify-between gap-3 pt-3">
          <div className="flex items-center gap-2.5 text-slate-600">
            <Mail className="size-[18px] text-slate-500 shrink-0" strokeWidth={1.8} />
            <span className="font-medium text-slate-700">Gmail</span>
          </div>
          <span className="truncate font-normal text-slate-600 text-right max-w-[170px]" title={displayEmail}>
            {displayEmail}
          </span>
        </div>
      </div>

      {/* B2B Dashboard Quick Jump (subtle secondary link when partner) */}
      {isB2B && onNavigateToDashboard && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onClose()
              onNavigateToDashboard()
            }}
            className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-xs font-semibold text-[#0066ff] hover:bg-blue-50/70 transition-colors cursor-pointer"
          >
            <span>Open B2B Dashboard Portal</span>
            <ExternalLink className="size-3.5" />
          </button>
        </div>
      )}

      {/* Logout Button */}
      <button
        type="button"
        onClick={() => {
          onClose()
          onLogout()
        }}
        className="mt-4 flex w-full items-center gap-2.5 rounded-xl bg-[#fff2f2] px-4 py-3 text-sm font-medium text-[#ef4444] transition-all hover:bg-rose-100/90 active:scale-[0.99] cursor-pointer"
      >
        <LogOut className="size-4 shrink-0 text-[#ef4444]" strokeWidth={2} />
        <span>Logout</span>
      </button>
    </div>
  )
}
