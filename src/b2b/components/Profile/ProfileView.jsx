import { useState } from 'react'
import {
  User,
  Edit3,
  FileText,
  FilePlus,
  Truck,
  Download,
  Check,
  Clock,
  X,
  ChevronDown,
  ArrowRight,
  MoreVertical,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react'

// Country flag badge component
function CountryFlag({ country }) {
  const flags = {
    China: { code: 'CN', color: 'bg-red-500', symbol: '🇨🇳' },
    Thailand: { code: 'TH', color: 'bg-blue-600', symbol: '🇹🇭' },
    Malaysia: { code: 'MY', color: 'bg-blue-800', symbol: '🇲🇾' },
    Singapore: { code: 'SG', color: 'bg-red-600', symbol: '🇸🇬' },
    UAE: { code: 'AE', color: 'bg-emerald-600', symbol: '🇦🇪' },
  }

  const flag = flags[country] || { symbol: '🌐' }

  return (
    <div className="flex items-center gap-2">
      <span className="text-base leading-none select-none">{flag.symbol}</span>
      <span className="font-semibold text-slate-800 text-xs sm:text-[13px]">
        {country}
      </span>
    </div>
  )
}

// Status badge renderer matching reference colors
function StatusBadge({ status }) {
  switch (status) {
    case 'Approved':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
          Approved
        </span>
      )
    case 'Processing':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
          Processing
        </span>
      )
    case 'Document Review':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/80">
          Document Review
        </span>
      )
    case 'On Hold':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
          On Hold
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
          {status}
        </span>
      )
  }
}

export default function ProfileView({
  onOpenNewApplication,
  onOpenNewPickup,
  onNavigateTab,
  onOpenCommissionVoucher,
}) {
  // Profile Data State
  const [profile, setProfile] = useState({
    fullName: 'Abdul Rahman',
    mobileNumber: '+880 1717-999637',
    emailAddress: 'ablpartner@gmail.com',
    companyName: 'Rahman International Travel',
    tradeLicenseFile: 'Trade_License.pdf',
    address: 'House #12, Road #5, Uttara, Dhaka 1230, Bangladesh',
  })

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({ ...profile })
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Selected Application for View Details Modal
  const [selectedApp, setSelectedApp] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Time filter dropdown state
  const [commissionFilter, setCommissionFilter] = useState('This Month')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // 5 Recent Applications matching reference screenshot
  const recentApplications = [
    {
      id: 1,
      applicantName: 'Md. Saiful Islam',
      country: 'China',
      applicationType: 'Tourist Visa',
      date: '12 Oct 2025',
      status: 'Processing',
      passportNo: 'A08942158',
      fee: 'BDT 14,500',
    },
    {
      id: 2,
      applicantName: 'Nur Jahan Akter',
      country: 'Thailand',
      applicationType: 'Tourist Visa',
      date: '10 Oct 2025',
      status: 'Approved',
      passportNo: 'B01764291',
      fee: 'BDT 6,800',
    },
    {
      id: 3,
      applicantName: 'Tanvir Ahmed',
      country: 'Malaysia',
      applicationType: 'Business Visa',
      date: '08 Oct 2025',
      status: 'Document Review',
      passportNo: 'A09321475',
      fee: 'BDT 9,200',
    },
    {
      id: 4,
      applicantName: 'Sabrina Khatun',
      country: 'Singapore',
      applicationType: 'Tourist Visa',
      date: '05 Oct 2025',
      status: 'Processing',
      passportNo: 'C02847192',
      fee: 'BDT 7,500',
    },
    {
      id: 5,
      applicantName: 'Kamal Uddin',
      country: 'UAE',
      applicationType: 'Visit Visa',
      date: '02 Oct 2025',
      status: 'On Hold',
      passportNo: 'A07194823',
      fee: 'BDT 16,000',
    },
  ]

  // 4 Recent Activities matching reference screenshot
  const recentActivities = [
    {
      id: 1,
      title: 'Passport Received',
      desc: 'Passport collected from your office',
      time: '2 hours ago',
      iconBg: 'bg-emerald-500 text-white',
      icon: Check,
    },
    {
      id: 2,
      title: 'Invoice Generated',
      desc: 'Invoice INV-2025-1042 generated',
      time: '5 hours ago',
      iconBg: 'bg-sky-500 text-white',
      icon: FileText,
    },
    {
      id: 3,
      title: 'Pickup Scheduled',
      desc: 'Our team will collect passports on 14 Oct',
      time: '1 day ago',
      iconBg: 'bg-amber-500 text-white',
      icon: Truck,
    },
    {
      id: 4,
      title: 'Commission Added',
      desc: 'BDT 2,500 added to your commission balance',
      time: '2 days ago',
      iconBg: 'bg-purple-600 text-white',
      icon: ShoppingBag,
    },
  ]

  // Monthly Commission Bar Chart Data
  const monthlyData = [
    { month: 'Jan', height: 48 },
    { month: 'Feb', height: 32 },
    { month: 'Mar', height: 44 },
    { month: 'Apr', height: 60 },
    { month: 'May', height: 40 },
    { month: 'Jun', height: 88, active: true },
  ]

  // Save profile edits
  const handleProfileSave = (e) => {
    e.preventDefault()
    setProfile({ ...editForm })
    setIsEditModalOpen(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  // Trigger quick notifications/feedback
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Save feedback toast */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800 animate-fade-in shadow-xs">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Profile Information updated successfully!</span>
        </div>
      )}

      {toastMessage && (
        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-sky-800 animate-fade-in shadow-xs">
          <CheckCircle2 className="size-4 text-sky-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* TOP ROW: Profile Information (5 cols) + Stats & Actions  */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Profile Information Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="size-5 text-[#0284c7]" strokeWidth={2.2} />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    Profile Information
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditForm({ ...profile })
                    setIsEditModalOpen(true)
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-sky-200/90 bg-sky-50/70 hover:bg-sky-100 text-[#0284c7] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  <Edit3 className="size-3.5" />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Information Rows */}
              <div className="divide-y divide-slate-100/90 text-xs sm:text-[13px] mt-1">
                {/* Full Name */}
                <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <span className="text-slate-400 font-medium sm:w-32 shrink-0">
                    Full Name
                  </span>
                  <span className="font-semibold text-slate-800 text-left sm:text-right">
                    {profile.fullName}
                  </span>
                </div>

                {/* Mobile Number */}
                <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <span className="text-slate-400 font-medium sm:w-32 shrink-0">
                    Mobile Number
                  </span>
                  <span className="font-semibold text-slate-800 text-left sm:text-right">
                    {profile.mobileNumber}
                  </span>
                </div>

                {/* Email Address */}
                <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <span className="text-slate-400 font-medium sm:w-32 shrink-0">
                    Email Address
                  </span>
                  <span className="font-semibold text-slate-800 text-left sm:text-right break-all">
                    {profile.emailAddress}
                  </span>
                </div>

                {/* Company Name */}
                <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <span className="text-slate-400 font-medium sm:w-32 shrink-0">
                    Company Name
                  </span>
                  <span className="font-semibold text-slate-800 text-left sm:text-right">
                    {profile.companyName}
                  </span>
                </div>

                {/* Trade License */}
                <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                  <span className="text-slate-400 font-medium sm:w-32 shrink-0">
                    Trade License
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* PDF Document Icon */}
                    <svg
                      className="size-4.5 text-rose-500 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 4h7v5h5v11H6V4zm2 8h8v2H8v-2zm0 4h5v2H8v-2z" />
                    </svg>
                    <button
                      type="button"
                      onClick={() =>
                        triggerToast('Downloading Trade License document...')
                      }
                      className="font-semibold text-[#0284c7] hover:underline cursor-pointer text-xs"
                    >
                      {profile.tradeLicenseFile}
                    </button>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/80">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="py-2.5 sm:py-3.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <span className="text-slate-400 font-medium sm:w-32 shrink-0">
                    Address
                  </span>
                  <span className="font-semibold text-slate-700 text-left sm:text-right leading-relaxed max-w-full sm:max-w-[280px]">
                    {profile.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Stat Cards + Quick Actions & Commission (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Top Row: 4 Metric Badges in a single row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            {/* Stat 1: Total Applications */}
            <div className="bg-[#f0f6ff]/80 border border-blue-100 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 shadow-2xs">
              <div className="size-9 sm:size-11 rounded-xl bg-[#0284c7]/15 text-[#0284c7] flex items-center justify-center shrink-0">
                <FileText className="size-4 sm:size-5" strokeWidth={2.2} />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">
                  68
                </span>
                <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 mt-1">
                  Total Applications
                </span>
              </div>
            </div>

            {/* Stat 2: Approved */}
            <div className="bg-[#f0fdf4]/80 border border-emerald-100 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 shadow-2xs">
              <div className="size-9 sm:size-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Check className="size-4 sm:size-5 stroke-[2.8]" />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">
                  32
                </span>
                <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 mt-1">
                  Approved
                </span>
              </div>
            </div>

            {/* Stat 3: Processing */}
            <div className="bg-[#fffbeb]/80 border border-amber-100 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 shadow-2xs">
              <div className="size-9 sm:size-11 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="size-4 sm:size-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">
                  28
                </span>
                <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 mt-1">
                  Processing
                </span>
              </div>
            </div>

            {/* Stat 4: On Hold */}
            <div className="bg-[#fff1f2]/80 border border-rose-100 rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 shadow-2xs">
              <div className="size-9 sm:size-11 rounded-full bg-rose-500/15 text-rose-600 flex items-center justify-center shrink-0">
                <X className="size-4 sm:size-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">
                  5
                </span>
                <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 mt-1">
                  On Hold
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Quick Actions Card + My Commission Card Side-by-Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 sm:mb-3.5">
                  Quick Actions
                </h4>

                <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {/* Action 1: New Visa Application */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenNewApplication) onOpenNewApplication()
                      else triggerToast('Launching Visa Application Drawer...')
                    }}
                    className="p-3 rounded-xl bg-slate-50/70 hover:bg-sky-50/60 border border-slate-100 hover:border-sky-200 transition-all text-left flex flex-row xs:flex-col items-center xs:items-start justify-start xs:justify-between gap-3 xs:gap-0 group cursor-pointer"
                  >
                    <div className="size-8 rounded-lg bg-sky-100/70 text-[#0284c7] flex items-center justify-center shrink-0 xs:mb-2.5 group-hover:scale-105 transition-transform">
                      <FilePlus className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800 leading-tight">
                        New Visa Application
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5 xs:mt-1 leading-snug">
                        Submit a new application
                      </span>
                    </div>
                  </button>

                  {/* Action 2: Request Passport Pickup */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenNewPickup) onOpenNewPickup()
                      else if (onNavigateTab) onNavigateTab('pickup')
                      else triggerToast('Opening Passport Pickup Scheduling...')
                    }}
                    className="p-3 rounded-xl bg-slate-50/70 hover:bg-sky-50/60 border border-slate-100 hover:border-sky-200 transition-all text-left flex flex-row xs:flex-col items-center xs:items-start justify-start xs:justify-between gap-3 xs:gap-0 group cursor-pointer"
                  >
                    <div className="size-8 rounded-lg bg-sky-100/70 text-[#0284c7] flex items-center justify-center shrink-0 xs:mb-2.5 group-hover:scale-105 transition-transform">
                      <Truck className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800 leading-tight">
                        Request Passport Pickup
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5 xs:mt-1 leading-snug">
                        Schedule from your office
                      </span>
                    </div>
                  </button>

                  {/* Action 3: Download Invoice */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenCommissionVoucher) {
                        onOpenCommissionVoucher()
                      } else {
                        triggerToast('Opening Commission Voucher INV-2025-0187...')
                      }
                    }}
                    className="p-3 rounded-xl bg-slate-50/70 hover:bg-sky-50/60 border border-slate-100 hover:border-sky-200 transition-all text-left flex flex-row xs:flex-col items-center xs:items-start justify-start xs:justify-between gap-3 xs:gap-0 group cursor-pointer"
                  >
                    <div className="size-8 rounded-lg bg-sky-100/70 text-[#0284c7] flex items-center justify-center shrink-0 xs:mb-2.5 group-hover:scale-105 transition-transform">
                      <Download className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800 leading-tight">
                        Download Invoice
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5 xs:mt-1 leading-snug">
                        Get commission invoice
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* My Commission Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-[#0284c7]" />
                    <h4 className="text-sm font-bold text-slate-900">
                      My Commission
                    </h4>
                  </div>

                  {/* Dropdown Filter */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 border border-slate-200 rounded-lg px-2.5 py-1 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{commissionFilter}</span>
                      <ChevronDown className="size-3 text-slate-400" />
                    </button>

                    {showFilterDropdown && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 animate-fade-in text-xs">
                        {['This Month', 'Last Month', 'Last 3 Months', 'Year to Date'].map(
                          (opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setCommissionFilter(opt)
                                setShowFilterDropdown(false)
                              }}
                              className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 ${
                                commissionFilter === opt
                                  ? 'font-bold text-[#0284c7]'
                                  : 'text-slate-700'
                              }`}
                            >
                              {opt}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount & Trend */}
                <div className="flex flex-col xs:flex-row xs:items-end justify-between gap-3.5 pt-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
                        <User className="size-4" />
                      </div>
                      <span className="text-xl sm:text-[22px] font-black text-slate-900 tracking-tight">
                        BDT 12 12,500
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 mt-1 ml-9">
                      ↑ 12% vs last month
                    </span>
                  </div>

                  {/* Monthly Bar Chart */}
                  <div className="flex items-end justify-between xs:justify-end gap-1.5 sm:gap-2 h-14 pb-0.5 w-full xs:w-auto">
                    {monthlyData.map((d) => (
                      <div
                        key={d.month}
                        className="flex flex-col items-center gap-1 group"
                      >
                        <div className="w-3.5 bg-slate-100 rounded-t h-12 flex items-end overflow-hidden">
                          <div
                            style={{ height: `${d.height}%` }}
                            className={`w-full rounded-t transition-all duration-500 ${
                              d.active
                                ? 'bg-[#0284c7] shadow-xs'
                                : 'bg-[#0284c7]/40 group-hover:bg-[#0284c7]/70'
                            }`}
                          />
                        </div>
                        <span className="text-[9px] font-medium text-slate-400">
                          {d.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM ROW: Recent Applications (8 cols) + Recent Activity */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Recent Applications Card (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-slate-100">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Recent Applications
              </h3>

              <button
                type="button"
                onClick={() => {
                  if (onNavigateTab) onNavigateTab('applications')
                  else triggerToast('Switching to Applications tab...')
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[620px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                    <th className="py-3 px-2 font-semibold">#</th>
                    <th className="py-3 px-2 font-semibold">Applicant Name</th>
                    <th className="py-3 px-2 font-semibold">Country</th>
                    <th className="py-3 px-2 font-semibold">Application Type</th>
                    <th className="py-3 px-2 font-semibold">Date</th>
                    <th className="py-3 px-2 font-semibold text-center">Status</th>
                    <th className="py-3 px-2 font-semibold text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                  {recentApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* # Number */}
                      <td className="py-3.5 px-2 font-semibold text-slate-500">
                        {app.id}
                      </td>

                      {/* Applicant Name */}
                      <td className="py-3.5 px-2 font-semibold text-slate-800 whitespace-nowrap">
                        {app.applicantName}
                      </td>

                      {/* Country with Flag */}
                      <td className="py-3.5 px-2 whitespace-nowrap">
                        <CountryFlag country={app.country} />
                      </td>

                      {/* Application Type */}
                      <td className="py-3.5 px-2 font-medium text-slate-600 whitespace-nowrap">
                        {app.applicationType}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-2 font-medium text-slate-500 whitespace-nowrap">
                        {app.date}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-2 text-center whitespace-nowrap">
                        <StatusBadge status={app.status} />
                      </td>

                      {/* Action View & Menu */}
                      <td className="py-3.5 px-2 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedApp(app)}
                            className="px-3 py-1 rounded-md text-xs font-semibold text-[#0284c7] bg-sky-50/80 hover:bg-sky-100 transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              triggerToast(`Options for ${app.applicantName}`)
                            }
                            className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <MoreVertical className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Recent Activity Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-slate-100">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Recent Activity
              </h3>

              <button
                type="button"
                onClick={() => triggerToast('Opening full Activity Log...')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Activity Items List */}
            <div className="divide-y divide-slate-100/90 mt-1">
              {recentActivities.map((act) => {
                const Icon = act.icon
                return (
                  <div
                    key={act.id}
                    className="py-3.5 flex items-start gap-3 group"
                  >
                    {/* Circle Icon Badge */}
                    <div
                      className={`size-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${act.iconBg}`}
                    >
                      <Icon className="size-4" strokeWidth={2.4} />
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-800 leading-snug">
                          {act.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EDIT PROFILE MODAL DIALOG                                */}
      {/* ======================================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-dark/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-5 sm:p-7 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Edit3 className="size-5 text-[#0284c7]" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Edit Profile Information
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-3.5 overflow-y-auto pr-0.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.fullName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, fullName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.mobileNumber}
                    onChange={(e) =>
                      setEditForm({ ...editForm, mobileNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={editForm.emailAddress}
                    onChange={(e) =>
                      setEditForm({ ...editForm, emailAddress: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.companyName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, companyName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0284c7] hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* APPLICATION DETAILS MODAL                                */}
      {/* ======================================================== */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-dark/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-5 sm:p-7 max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedApp(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">
                {selectedApp.country === 'China'
                  ? '🇨🇳'
                  : selectedApp.country === 'Thailand'
                  ? '🇹🇭'
                  : selectedApp.country === 'Malaysia'
                  ? '🇲🇾'
                  : selectedApp.country === 'Singapore'
                  ? '🇸🇬'
                  : '🇦🇪'}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedApp.applicantName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedApp.country} • {selectedApp.applicationType}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Application Status</span>
                <StatusBadge status={selectedApp.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Passport Number</span>
                <span className="font-mono font-semibold">
                  {selectedApp.passportNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Submission Date</span>
                <span className="font-semibold">{selectedApp.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Embassy &amp; Processing Fee</span>
                <span className="font-bold text-[#0284c7]">
                  {selectedApp.fee}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null)
                  triggerToast(
                    `Generating tracking sheet for ${selectedApp.applicantName}`
                  )
                }}
                className="w-full py-2.5 rounded-xl bg-[#0284c7] hover:bg-sky-600 text-white font-semibold text-xs shadow-md transition-all"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
