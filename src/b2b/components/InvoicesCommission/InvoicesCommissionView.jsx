import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  FileText,
  Wallet,
  CreditCard,
  Clock,
  CheckCircle2,
  BarChart2,
  ArrowRight,
  Info,
  Headphones,
  Download,
  Eye,
} from 'lucide-react'
import {
  COMMISSION_STATS,
  COMMISSION_BREAKDOWN,
  COMMISSION_DETAILS_ROWS,
  INVOICES_DATA,
} from '../../data/commissionData'

export default function InvoicesCommissionView({
  onSelectCommission,
  onOpenSupportModal,
  onOpenReportModal,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months')
  const [activeSubTab, setActiveSubTab] = useState('details') // 'details' or 'invoices'
  const [currentPage, setCurrentPage] = useState(1)

  // Sparkline SVG generator for stat cards 1 & 2
  const renderSparkline = (points, color = '#2563eb') => {
    const max = Math.max(...points)
    const min = Math.min(...points)
    const width = 140
    const height = 34
    const step = width / (points.length - 1)

    const coords = points.map((val, i) => {
      const x = i * step
      const y = height - ((val - min) / (max - min || 1)) * (height - 6) - 3
      return `${x},${y}`
    })

    const pathData = `M 0,${height} L ${coords.join(' L ')} L ${width},${height} Z`
    const lineData = `M ${coords.join(' L ')}`

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-8 overflow-visible opacity-90"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={pathData} fill={`url(#grad-${color.replace('#', '')})`} />
        <path d={lineData} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // Donut Chart SVG calculations
  // Total: 4850.75
  // Visa: 2850.50 (58.76%)
  // Tours: 1520.25 (31.34%)
  // Other: 480.00 (9.90%)
  const radius = 54
  const circumference = 2 * Math.PI * radius // ~339.29
  const visaLength = circumference * 0.588
  const tourLength = circumference * 0.313
  const otherLength = circumference * 0.099

  return (
    <div className="space-y-6">
      {/* Title & Timeframe Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight">
            Invoices &amp; Commission
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View your invoices, commission details and download reports.
          </p>
        </div>

        {/* Timeframe Selector Dropdown */}
        <div className="relative self-start sm:self-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 shadow-xs text-xs sm:text-sm font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4 text-slate-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-transparent outline-none cursor-pointer pr-4 appearance-none"
            >
              <option value="This Month">This Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="This Year">This Year 2025</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row matching Image 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Commission Earned */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-3 h-3" />
              +12%
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Commission Earned</p>
            <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#0f172a] tracking-tight mt-1">
              $4,850.75
            </h3>
          </div>

          {/* Smooth Trend Wave */}
          <div className="mt-3 -mx-2 -mb-2">
            {renderSparkline([25, 28, 22, 35, 30, 42, 48, 45, 52, 60], '#2563eb')}
          </div>
        </div>

        {/* Card 2: Total Invoices */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
              <TrendingUp className="w-3 h-3" />
              +1 new
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Invoices</p>
            <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#0f172a] tracking-tight mt-1">
              12
            </h3>
          </div>

          {/* Smooth Trend Wave */}
          <div className="mt-3 -mx-2 -mb-2">
            {renderSparkline([4, 5, 6, 6, 8, 9, 10, 11, 11, 12], '#8b5cf6')}
          </div>
        </div>

        {/* Card 3: Pending Commission */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Pending Commission</p>
            <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#0f172a] tracking-tight mt-1">
              $420.00
            </h3>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Next Payout: Oct 25, 2025</span>
          </div>
        </div>

        {/* Card 4: Last Payout */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Last Payout</p>
            <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#0f172a] tracking-tight mt-1">
              $1,200.00
            </h3>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Paid on Sep 25, 2025</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Subtabs & Table) - 8 cols */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sub-tab Switcher: Commission Details vs Invoices */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSubTab('details')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === 'details'
                  ? 'bg-[#0d2b59] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Commission Details</span>
            </button>

            <button
              onClick={() => setActiveSubTab('invoices')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === 'invoices'
                  ? 'bg-[#0d2b59] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Invoices</span>
            </button>
          </div>

          {/* Sub-Tab 1: Commission Details Table (Image 3) */}
          {activeSubTab === 'details' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-600 font-semibold text-[11px] sm:text-xs">
                      <th className="py-3.5 px-4 font-semibold">Date</th>
                      <th className="py-3.5 px-4 font-semibold">Description</th>
                      <th className="py-3.5 px-4 font-semibold">Application / Booking No.</th>
                      <th className="py-3.5 px-4 font-semibold">Amount</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {COMMISSION_DETAILS_ROWS.slice(0, 5).map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Date */}
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          {row.date}
                        </td>

                        {/* Description */}
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {row.description}
                        </td>

                        {/* App / Booking No. */}
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                          {row.referenceNo}
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {row.amount}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                            {row.status}
                          </span>
                        </td>

                        {/* Action: View Details -> */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => onSelectCommission(row)}
                            className="inline-flex items-center gap-1 text-[#0066cc] hover:text-[#004f9e] font-semibold text-xs hover:underline cursor-pointer"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white border-t border-slate-200 px-3 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
                <div className="text-center sm:text-left">
                  Showing <span className="font-semibold text-slate-800">1</span> to{' '}
                  <span className="font-semibold text-slate-800">5</span> of{' '}
                  <span className="font-semibold text-slate-800">12</span> entries
                </div>

                <div className="flex items-center justify-center gap-1 self-center sm:self-auto flex-wrap">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer text-xs"
                  >
                    &lt;
                  </button>
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
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Invoices List */}
          {activeSubTab === 'invoices' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-600 font-semibold text-[11px] sm:text-xs">
                      <th className="py-3.5 px-4 font-semibold">Invoice No.</th>
                      <th className="py-3.5 px-4 font-semibold">Date</th>
                      <th className="py-3.5 px-4 font-semibold">Billing Period</th>
                      <th className="py-3.5 px-4 font-semibold">Commission Total</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INVOICES_DATA.map((inv) => (
                      <tr key={inv.invoiceId} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                          {inv.invoiceId}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.date}</td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.period}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{inv.amount}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                            {inv.payoutStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onSelectCommission({ ...inv, view: 'voucher' })}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#0066cc] bg-blue-50/70 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Voucher</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Donut Chart & Help Cards) - 4 cols */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Commission Overview with Donut Chart */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
            {/* Header with View Report link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#0066cc]" />
                <h3 className="text-sm font-bold text-slate-800">Commission Overview</h3>
              </div>
              <button
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0066cc] hover:underline cursor-pointer"
              >
                <span>View Report</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Donut Chart & Legend Row */}
            <div className="flex flex-col xs:flex-row items-center justify-between gap-4 py-2">
              {/* Donut Chart SVG */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 140 140">
                  {/* Background Track */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="14"
                  />
                  {/* Segment 1: Visa Services (Blue) */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="14"
                    strokeDasharray={`${visaLength} ${circumference}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Segment 2: Tour Packages (Purple) */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="14"
                    strokeDasharray={`${tourLength} ${circumference}`}
                    strokeDashoffset={-visaLength}
                    strokeLinecap="round"
                  />
                  {/* Segment 3: Other Services (Teal) */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="14"
                    strokeDasharray={`${otherLength} ${circumference}`}
                    strokeDashoffset={-(visaLength + tourLength)}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-sm font-extrabold text-slate-800 leading-tight">
                    $4,850.75
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Total
                  </span>
                </div>
              </div>

              {/* Donut Legend */}
              <div className="space-y-2.5 flex-1 min-w-0 text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shrink-0" />
                    <span className="text-slate-600 truncate">Visa Services</span>
                  </div>
                  <span className="font-bold text-slate-800 block pl-4 text-xs">
                    $2,850.50
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] shrink-0" />
                    <span className="text-slate-600 truncate">Tour Packages</span>
                  </div>
                  <span className="font-bold text-slate-800 block pl-4 text-xs">
                    $1,520.25
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] shrink-0" />
                    <span className="text-slate-600 truncate">Other Services</span>
                  </div>
                  <span className="font-bold text-slate-800 block pl-4 text-xs">
                    $480.00
                  </span>
                </div>
              </div>
            </div>

            {/* Info Callout Box */}
            <div className="bg-[#eff6ff] border border-blue-100 rounded-xl p-3 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" />
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Your commission will be credited within 7 business days after the client&apos;s payment is confirmed.
              </p>
            </div>
          </div>

          {/* Card 2: Need Help? Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#0066cc] text-[#0066cc] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Need Help?</h4>
                <p className="text-xs text-slate-500">
                  Our partner support team is here to assist you.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenSupportModal}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-[#0066cc] text-slate-700 hover:text-[#0066cc] text-xs font-semibold transition-all hover:bg-slate-50 cursor-pointer"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
