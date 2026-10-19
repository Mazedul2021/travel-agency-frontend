import { useState, useMemo } from 'react'
import {
  Plus,
  Search,
  RotateCcw,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Info,
  Check,
  Calendar,
  MapPin,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'
import { PICKUP_METRICS, PICKUPS_DATA } from '../../data/pickupsData'

export default function PassportPickupView({ onOpenNewPickupModal, onSelectPickup }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [selectedDateRange, setSelectedDateRange] = useState('')
  const [openActionId, setOpenActionId] = useState(null)

  // Filter Data
  const filteredPickups = useMemo(() => {
    return PICKUPS_DATA.filter((item) => {
      if (selectedStatus !== 'All Status' && item.status !== selectedStatus) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesId = item.requestId.toLowerCase().includes(q)
        const matchesName = item.applicantName.toLowerCase().includes(q)
        const matchesAddress = item.pickupAddress.toLowerCase().includes(q)
        if (!matchesId && !matchesName && !matchesAddress) return false
      }
      return true
    })
  }, [selectedStatus, searchQuery])

  const handleReset = () => {
    setSearchQuery('')
    setSelectedStatus('All Status')
    setSelectedDateRange('')
  }

  // Render Metric Icon
  const getMetricIcon = (type) => {
    switch (type) {
      case 'truck':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'clock':
        return <Clock className="w-5 h-5 text-amber-600" />
      case 'check':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      case 'x':
        return <XCircle className="w-5 h-5 text-rose-600" />
      default:
        return <Truck className="w-5 h-5 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight">
            Passport Pickup
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Request passport pickup from your office and track the status.
          </p>
        </div>

        {/* Action Button: + Request Passport Pickup */}
        <button
          onClick={onOpenNewPickupModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0d2b59] hover:bg-[#071933] text-white text-sm font-semibold shadow-sm transition-all hover:shadow cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span>Request Passport Pickup</span>
        </button>
      </div>

      {/* Summary Metrics Cards (Row of 4) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {PICKUP_METRICS.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-xs hover:shadow-sm transition-shadow"
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${metric.iconColor}`}
            >
              {getMetricIcon(metric.type)}
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500">{metric.title}</p>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-0.5">
                {metric.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column (Table & Filters) - expands to 9 cols on xl for wide full view */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3 items-center">
              {/* Search input */}
              <div className="col-span-1 sm:col-span-2 md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by request ID, application name or pickup address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] outline-none transition-all"
                />
              </div>

              {/* Status Dropdown */}
              <div className="col-span-1 sm:col-span-1 md:col-span-3 relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full appearance-none px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8 whitespace-nowrap"
                >
                  <option value="All Status">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Collected">Collected</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Date Range Dropdown */}
              <div className="col-span-1 sm:col-span-1 md:col-span-3 relative">
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8 whitespace-nowrap"
                >
                  <option value="">Select date range</option>
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Reset */}
              <div className="col-span-1 sm:col-span-2 md:col-span-1 flex justify-start sm:justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#0066cc] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  title="Reset filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left border-collapse text-xs sm:text-[13px]">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-600 font-semibold text-[11px] sm:text-xs">
                    <th className="py-3.5 px-2.5 sm:px-3 w-8 sm:w-10 text-center whitespace-nowrap">#</th>
                    <th className="py-3.5 px-2.5 sm:px-3 font-semibold whitespace-nowrap">Request ID</th>
                    <th className="py-3.5 px-2.5 sm:px-3 font-semibold whitespace-nowrap">Applicant Name</th>
                    <th className="py-3.5 px-2 sm:px-3 font-semibold whitespace-nowrap">Applications</th>
                    <th className="py-3.5 px-2.5 sm:px-3 font-semibold whitespace-nowrap">Pickup Address</th>
                    <th className="py-3.5 px-2 sm:px-3 font-semibold whitespace-nowrap">Requested Date</th>
                    <th className="py-3.5 px-2 sm:px-3 font-semibold text-center whitespace-nowrap">Status</th>
                    <th className="py-3.5 px-2 sm:px-3 font-semibold text-center whitespace-nowrap">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredPickups.length > 0 ? (
                    filteredPickups.map((row, idx) => (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Index */}
                        <td className="py-3.5 px-2.5 sm:px-3 text-center text-slate-500 font-medium text-xs whitespace-nowrap">
                          {idx + 1}
                        </td>

                        {/* Request ID */}
                        <td className="py-3.5 px-2.5 sm:px-3 font-mono text-xs font-semibold text-slate-800 whitespace-nowrap">
                          <button
                            onClick={() => onSelectPickup(row)}
                            className="hover:text-[#0066cc] cursor-pointer"
                          >
                            {row.requestId}
                          </button>
                        </td>

                        {/* Applicant Name */}
                        <td className="py-3.5 px-2.5 sm:px-3 font-medium text-slate-800 whitespace-nowrap">
                          {row.applicantName}
                        </td>

                        {/* Applications / Passports Count */}
                        <td className="py-3.5 px-2 sm:px-3 text-slate-600 whitespace-nowrap">
                          {row.applications}
                        </td>

                        {/* Pickup Address */}
                        <td className="py-3.5 px-2.5 sm:px-3 text-slate-600 whitespace-nowrap">
                          {row.pickupAddress}
                        </td>

                        {/* Requested Date */}
                        <td className="py-3.5 px-2 sm:px-3 text-slate-600 whitespace-nowrap">
                          {row.requestedDate}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-2 sm:px-3 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ring-1 ${row.statusBadgeColor}`}
                          >
                            {row.status}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-2 sm:px-3 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => onSelectPickup(row)}
                              className="text-[#0066cc] hover:text-[#004f9e] font-semibold text-xs px-2 py-0.5 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              View
                            </button>

                            <div className="relative">
                              <button
                                onClick={() =>
                                  setOpenActionId(
                                    openActionId === row.id ? null : row.id
                                  )
                                }
                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>


                              {openActionId === row.id && (
                                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 text-left animate-fade-in">
                                  <button
                                    onClick={() => {
                                      setOpenActionId(null)
                                      onSelectPickup(row)
                                    }}
                                    className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                                  >
                                    View Courier Status
                                  </button>
                                  <button
                                    onClick={() => {
                                      setOpenActionId(null)
                                      alert(`Calling courier dispatch for ${row.requestId}`)
                                    }}
                                    className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                                  >
                                    Call Dispatch
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        No pickup requests match the filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Cards matching Image 2 right column) - 3 cols on xl */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-5">
          {/* Card 1: Request a Passport Pickup CTA Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-5 space-y-4">
            {/* Visual Graphic: Passport Handover & Courier Van badge */}
            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                alt="Passport Handover"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent" />

              {/* Floating Delivery Truck Icon & Curved Arrow */}
              <div className="absolute left-4 bottom-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white text-[#0d2b59] flex items-center justify-center shadow-lg ring-2 ring-white/50">
                  <Truck className="w-6 h-6 text-[#0d2b59]" />
                </div>
                {/* Curved Arrow Vector */}
                <svg
                  className="w-16 h-8 text-white/90"
                  viewBox="0 0 60 30"
                  fill="none"
                >
                  <path
                    d="M 5 20 Q 30 -5 55 18"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    fill="none"
                  />
                  <polygon points="55,18 48,15 50,22" fill="white" />
                </svg>
              </div>
            </div>

            {/* Title & Copy */}
            <div>
              <h3 className="text-base font-bold text-[#0f172a]">
                Request a Passport Pickup
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our team will collect passports from your office at your preferred date and time.
              </p>
            </div>

            {/* Button: + New Pickup Request */}
            <button
              onClick={onOpenNewPickupModal}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0d2b59] hover:bg-[#071933] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span>New Pickup Request</span>
            </button>
          </div>

          {/* Card 2: Important Notes Card with Checkmarked list */}
          <div className="bg-[#f2f7fd] border border-blue-100 rounded-2xl p-5 space-y-3.5">
            {/* Header */}
            <div className="flex items-center gap-2 text-slate-800">
              <div className="w-6 h-6 rounded-full bg-[#0066cc] text-white flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Important Notes</h4>
            </div>

            {/* Checklist matching Image 2 */}
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-slate-600" strokeWidth={3} />
                </div>
                <span>Request at least 1 working day in advance.</span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-slate-600" strokeWidth={3} />
                </div>
                <span>Ensure passports are ready with a copy of the application list.</span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-slate-600" strokeWidth={3} />
                </div>
                <span>Our team will confirm the pickup time via phone or email.</span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-slate-600" strokeWidth={3} />
                </div>
                <span>You will receive a notification once the passports are collected.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
