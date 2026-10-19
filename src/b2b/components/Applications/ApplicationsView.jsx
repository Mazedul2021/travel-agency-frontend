import { useState, useMemo } from 'react'
import {
  Plus,
  Search,
  RotateCcw,
  Copy,
  Check,
  MoreVertical,
  Clock,
  CheckCircle2,
  Ban,
  FileText,
  XCircle,
  Eye,
  ChevronDown,
  Download,
  ExternalLink,
  Layers,
} from 'lucide-react'
import CountryFlag from '../common/CountryFlag'
import { APPLICATION_STATUS_TABS, APPLICATIONS_DATA } from '../../data/applicationsData'

export default function ApplicationsView({ onOpenNewModal, onSelectApplication }) {
  const [activeStatusTab, setActiveStatusTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState('')
  const [copiedPassport, setCopiedPassport] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [openActionMenuId, setOpenActionMenuId] = useState(null)

  // Copy Passport Number
  const handleCopyPassport = (passportNo) => {
    navigator.clipboard.writeText(passportNo)
    setCopiedPassport(passportNo)
    setTimeout(() => setCopiedPassport(null), 2000)
  }

  // Filter Data
  const filteredApplications = useMemo(() => {
    return APPLICATIONS_DATA.filter((app) => {
      // Status Filter
      if (activeStatusTab !== 'all' && app.statusKey !== activeStatusTab) {
        return false
      }
      // Type Filter
      if (selectedType && app.applicationType !== selectedType) {
        return false
      }
      // Country Filter
      if (selectedCountry && app.country !== selectedCountry) {
        return false
      }
      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = app.applicantName.toLowerCase().includes(query)
        const matchesPassport = app.passportNo.toLowerCase().includes(query)
        const matchesCountry = app.country.toLowerCase().includes(query)
        if (!matchesName && !matchesPassport && !matchesCountry) return false
      }
      return true
    })
  }, [activeStatusTab, selectedType, selectedCountry, searchQuery])

  // Reset all filters
  const handleReset = () => {
    setActiveStatusTab('all')
    setSearchQuery('')
    setSelectedType('')
    setSelectedCountry('')
    setSelectedDateRange('')
    setCurrentPage(1)
  }

  // Status tab card styling configs with distinct backgrounds for all 6 statuses
  const STATUS_TAB_STYLES = {
    all: {
      inactive: 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-2xs hover:border-slate-300',
      active: 'bg-[#0d2b59] text-white border-[#0d2b59] shadow-md shadow-[#0d2b59]/25 ring-2 ring-[#0d2b59]/20 font-bold',
      iconInactive: 'bg-blue-50 border-blue-200/70 text-[#0066cc]',
      iconActive: 'bg-white/15 border-white/25 text-white',
      countInactive: 'bg-slate-100 text-slate-700',
      countActive: 'bg-white/20 text-white',
    },
    processing: {
      inactive: 'bg-amber-50/80 hover:bg-amber-100/70 text-amber-900 border-amber-200/80 shadow-2xs hover:border-amber-300',
      active: 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25 ring-2 ring-amber-500/20 font-bold',
      iconInactive: 'bg-white/90 border-amber-200/90 text-amber-600',
      iconActive: 'bg-white/20 border-white/30 text-white',
      countInactive: 'bg-amber-100 text-amber-800',
      countActive: 'bg-white/20 text-white',
    },
    approved: {
      inactive: 'bg-emerald-50/80 hover:bg-emerald-100/70 text-emerald-900 border-emerald-200/80 shadow-2xs hover:border-emerald-300',
      active: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-600/20 font-bold',
      iconInactive: 'bg-white/90 border-emerald-200/90 text-emerald-600',
      iconActive: 'bg-white/20 border-white/30 text-white',
      countInactive: 'bg-emerald-100 text-emerald-800',
      countActive: 'bg-white/20 text-white',
    },
    on_hold: {
      inactive: 'bg-rose-50/80 hover:bg-rose-100/70 text-rose-900 border-rose-200/80 shadow-2xs hover:border-rose-300',
      active: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/25 ring-2 ring-rose-600/20 font-bold',
      iconInactive: 'bg-white/90 border-rose-200/90 text-rose-600',
      iconActive: 'bg-white/20 border-white/30 text-white',
      countInactive: 'bg-rose-100 text-rose-800',
      countActive: 'bg-white/20 text-white',
    },
    document_review: {
      inactive: 'bg-purple-50/80 hover:bg-purple-100/70 text-purple-900 border-purple-200/80 shadow-2xs hover:border-purple-300',
      active: 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25 ring-2 ring-purple-600/20 font-bold',
      iconInactive: 'bg-white/90 border-purple-200/90 text-purple-600',
      iconActive: 'bg-white/20 border-white/30 text-white',
      countInactive: 'bg-purple-100 text-purple-800',
      countActive: 'bg-white/20 text-white',
    },
    rejected: {
      inactive: 'bg-red-50/80 hover:bg-red-100/70 text-red-900 border-red-200/80 shadow-2xs hover:border-red-300',
      active: 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/25 ring-2 ring-red-600/20 font-bold',
      iconInactive: 'bg-white/90 border-red-200/90 text-red-600',
      iconActive: 'bg-white/20 border-white/30 text-white',
      countInactive: 'bg-red-100 text-red-800',
      countActive: 'bg-white/20 text-white',
    },
  }

  // Render Status Icon for filter tabs (Card type with rounded rectangular)
  const renderStatusIcon = (tab, isActive = false) => {
    const style = STATUS_TAB_STYLES[tab.id] || STATUS_TAB_STYLES.all
    const iconClass = isActive ? style.iconActive : style.iconInactive

    switch (tab.id) {
      case 'all':
        return (
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 shadow-2xs ${iconClass}`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        )
      case 'processing':
        return (
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 shadow-2xs ${iconClass}`}
          >
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        )
      case 'approved':
        return (
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 shadow-2xs ${iconClass}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        )
      case 'on_hold':
        return (
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 shadow-2xs ${iconClass}`}
          >
            <Ban className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        )
      case 'document_review':
        return (
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 shadow-2xs ${iconClass}`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        )
      case 'rejected':
        return (
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 shadow-2xs ${iconClass}`}
          >
            <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight">
            My Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track and manage all your visa applications in one place.
          </p>
        </div>

        {/* Primary Action Button: + New Application */}
        <button
          onClick={onOpenNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0d2b59] hover:bg-[#071933] text-white text-sm font-semibold shadow-sm transition-all hover:shadow cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span>New Application</span>
        </button>
      </div>

      {/* Status Filter Tabs / Status Cards with Custom Backgrounds */}
      <div className="overflow-x-auto no-scrollbar scroll-smooth py-1">
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {APPLICATION_STATUS_TABS.map((tab) => {
            const isActive = activeStatusTab === tab.id
            const style = STATUS_TAB_STYLES[tab.id] || STATUS_TAB_STYLES.all

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveStatusTab(tab.id)
                  setCurrentPage(1)
                }}
                className={`group shrink-0 flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border transition-all duration-200 whitespace-nowrap cursor-pointer select-none text-xs sm:text-sm font-semibold ${
                  isActive ? style.active : style.inactive
                }`}
              >
                {renderStatusIcon(tab, isActive)}
                <span>{tab.label}</span>

                {/* Badge Count in rounded rectangular pill */}
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                    isActive ? style.countActive : style.countInactive
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="col-span-1 sm:col-span-2 md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by applicant name, passport number or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] outline-none transition-all"
            />
          </div>

          {/* Application Type Dropdown */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8"
            >
              <option value="">Application Type</option>
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Business Visa">Business Visa</option>
              <option value="Visit Visa">Visit Visa</option>
              <option value="Umrah Visa">Umrah Visa</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Country Dropdown */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8"
            >
              <option value="">Country</option>
              <option value="China">China</option>
              <option value="Thailand">Thailand</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Singapore">Singapore</option>
              <option value="UAE">UAE</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Turkey">Turkey</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Range Dropdown */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 relative">
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8"
            >
              <option value="">Date Range</option>
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="month">This Month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Button */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 flex justify-start sm:justify-end">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#0066cc] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse text-xs sm:text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-600 font-semibold text-[11px] sm:text-xs tracking-wider whitespace-nowrap">
                <th className="py-3.5 px-4 w-12 text-center whitespace-nowrap">#</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[170px]">Applicant Name</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Passport No.</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Country</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[150px]">Application Type</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[125px]">Apply Date</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap min-w-[125px]">Status</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap min-w-[100px]">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app, index) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Index */}
                    <td className="py-3.5 px-4 text-center text-slate-500 font-medium text-xs">
                      {index + 1}
                    </td>

                    {/* Applicant Name */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <button
                        onClick={() => onSelectApplication(app)}
                        className="text-left hover:text-[#0066cc] transition-colors cursor-pointer"
                      >
                        {app.applicantName}
                      </button>
                    </td>

                    {/* Passport Number with Copy Icon */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <span>{app.passportNo}</span>
                        <button
                          onClick={() => handleCopyPassport(app.passportNo)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                          title="Copy passport number"
                        >
                          {copiedPassport === app.passportNo ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Country with Flag */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <CountryFlag countryCode={app.countryCode} countryName={app.country} />
                        <span className="text-slate-700 font-medium">{app.country}</span>
                      </div>
                    </td>

                    {/* Application Type */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {app.applicationType}
                    </td>

                    {/* Apply Date */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {app.applyDate}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ${app.statusBadgeColor}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Actions: View & 3-Dots */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onSelectApplication(app)}
                          className="text-[#0066cc] hover:text-[#004f9e] font-semibold text-xs px-2.5 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          View
                        </button>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenActionMenuId(
                                openActionMenuId === app.id ? null : app.id
                              )
                            }
                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openActionMenuId === app.id && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 text-left animate-fade-in">
                              <button
                                onClick={() => {
                                  setOpenActionMenuId(null)
                                  onSelectApplication(app)
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Full File</span>
                              </button>
                              <button
                                onClick={() => {
                                  setOpenActionMenuId(null)
                                  alert(`Downloading visa packet for ${app.applicantName}`)
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <Download className="w-3.5 h-3.5 text-slate-400" />
                                <span>Download PDF</span>
                              </button>
                              <button
                                onClick={() => {
                                  setOpenActionMenuId(null)
                                  alert(`Requesting update from embassy desk for ${app.appRef}`)
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                <span>Track Embassy</span>
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
                    <p className="text-sm">No applications found matching the selected filters.</p>
                    <button
                      onClick={handleReset}
                      className="mt-2 text-xs font-semibold text-[#0066cc] hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination matching Image 1 */}
        <div className="bg-white border-t border-slate-200 px-3 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div className="text-center sm:text-left">
            Showing <span className="font-semibold text-slate-800">1</span> to{' '}
            <span className="font-semibold text-slate-800">{filteredApplications.length}</span> of{' '}
            <span className="font-semibold text-slate-800">68</span> applications
          </div>

          <div className="flex items-center justify-center gap-1 self-center sm:self-auto flex-wrap">
            {/* Prev Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer text-xs"
            >
              &lt;
            </button>

            {/* Page 1 (Active) */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer ${
                currentPage === 1
                  ? 'bg-[#0d2b59] text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              1
            </button>

            {/* Page 2 */}
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer ${
                currentPage === 2
                  ? 'bg-[#0d2b59] text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              2
            </button>

            {/* Page 3 */}
            <button
              onClick={() => setCurrentPage(3)}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer ${
                currentPage === 3
                  ? 'bg-[#0d2b59] text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              3
            </button>

            {/* Ellipsis */}
            <span className="w-6 sm:w-8 h-7 sm:h-8 flex items-center justify-center text-slate-400 text-xs">
              ...
            </span>

            {/* Page 9 */}
            <button
              onClick={() => setCurrentPage(9)}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              9
            </button>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(9, p + 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer text-xs"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
