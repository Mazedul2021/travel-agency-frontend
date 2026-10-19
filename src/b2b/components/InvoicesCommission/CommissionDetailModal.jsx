import { useState, useEffect } from 'react'
import {
  X,
  Download,
  Printer,
  Mail,
  FileText,
  CreditCard,
  Wallet,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react'
import { COMMISSION_INVOICE_DEFAULT } from '../../data/commissionData'
import CommissionVoucherDocument from './CommissionVoucherDocument'

export default function CommissionDetailModal({ commission, onClose }) {
  // View mode: 'voucher' (Official A4 Voucher) vs 'modal' (Invoice Details Overview)
  const [viewMode, setViewMode] = useState(commission?.view || 'voucher')
  const [currentPage, setCurrentPage] = useState(1)
  const [emailStatus, setEmailStatus] = useState('')

  useEffect(() => {
    if (commission?.view) {
      setViewMode(commission.view)
    }
  }, [commission?.view])

  // If commission is false/null, don't render
  if (!commission) return null

  // Use commission details or fallback to exact default invoice INV-2025-0187
  const invoiceData = COMMISSION_INVOICE_DEFAULT
  const pageSize = 8
  const totalEntries = invoiceData.passports.length
  const totalPages = Math.ceil(totalEntries / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const currentPassports = invoiceData.passports.slice(startIndex, startIndex + pageSize)

  const handleSendEmail = () => {
    setEmailStatus('sending')
    setTimeout(() => {
      setEmailStatus('sent')
      setTimeout(() => setEmailStatus(''), 4000)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      {/* Background click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div
        className={`relative w-full ${
          viewMode === 'voucher' ? 'max-w-4xl' : 'max-w-3xl'
        } bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[94vh] flex flex-col transition-all duration-300`}
      >
        {/* ======================================================== */}
        {/* TOP MODAL HEADER: Clean Title & Bare Close Button        */}
        {/* ======================================================== */}
        <div className="px-4 sm:px-8 pt-5 sm:pt-6 pb-3 sm:pb-4 flex items-center justify-between gap-4 shrink-0 bg-white">
          <h2 className="text-lg sm:text-[22px] font-extrabold text-[#0c1a30] tracking-tight">
            {viewMode === 'voucher' ? 'Official Commission Voucher' : 'Invoice Details'}
          </h2>

          <div className="flex items-center gap-2">
            {viewMode === 'voucher' && (
              <button
                type="button"
                onClick={() => setViewMode('modal')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer mr-2"
              >
                ← Back to Invoice Details
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-800 hover:text-slate-600 transition-colors p-1 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* EMAIL TOAST NOTIFICATION                                 */}
        {/* ======================================================== */}
        {emailStatus === 'sent' && (
          <div className="mx-4 sm:mx-8 mb-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-emerald-800 animate-fade-in shadow-2xs">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>
              Invoice INV-2025-0187 has been successfully sent to {invoiceData.partner.email}!
            </span>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL BODY (SCROLLABLE)                                  */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-6 pt-1 space-y-6">
          {viewMode === 'voucher' ? (
            /* Official Printable Document View (Right Side in image) */
            <div className="animate-fade-in">
              <CommissionVoucherDocument invoice={invoiceData} showFullList={false} />
            </div>
          ) : (
            /* Left Side Modal View Exactly Matching Screenshot */
            <div className="space-y-6 animate-fade-in">
              {/* 1. Status Highlight Card & Invoice Metadata (Exact Match) */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Green Paid Badge Card with Double Halo Icon */}
                <div className="flex-1 bg-[#ebf8f2] rounded-2xl px-5 py-4 flex items-center gap-4">
                  {/* Concentric Double Circle Checkmark */}
                  <div className="w-12 h-12 rounded-full bg-[#a7f3d0]/80 flex items-center justify-center shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[19px] sm:text-[20px] font-bold text-[#065f46] leading-tight">
                      Paid
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-[#047857] font-medium mt-0.5">
                      Commission has been paid to your account.
                    </p>
                  </div>
                </div>

                {/* Vertical Divider Line */}
                <div className="hidden lg:block w-px bg-slate-200 self-stretch my-1" />

                {/* Right: Invoice Metadata Details Grid */}
                <div className="lg:w-[48%] flex flex-col justify-between py-0.5">
                  {/* Row 1: Invoice No. and Date */}
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="text-[12px] text-slate-500 block font-normal">
                        Invoice No.
                      </span>
                      <span className="font-extrabold text-[#0c1a30] text-[20px] sm:text-[21px] tracking-tight block mt-0.5 font-mono">
                        {invoiceData.invoiceNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-[12px] text-slate-500 block font-normal">
                        Date
                      </span>
                      <span className="font-semibold text-slate-800 text-[14px] sm:text-[15px] block mt-1">
                        {invoiceData.invoiceDate}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Period */}
                  <div className="mt-3">
                    <span className="text-[12px] text-slate-500 block font-normal">
                      Period
                    </span>
                    <span className="font-medium text-slate-700 text-[13px] block mt-0.5">
                      {invoiceData.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. 4 Metric Cards in a single row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                {/* Card 1: Total Passports */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-[#0066cc] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">
                      Total Passports
                    </span>
                    <span className="block text-xl font-black text-slate-900 leading-tight">
                      {invoiceData.metrics.totalPassports}
                    </span>
                    <span className="block text-[11px] text-emerald-600 font-semibold">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Card 2: Commission Rate */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">
                      Commission Rate
                    </span>
                    <span className="block text-xl font-black text-slate-900 leading-tight">
                      {invoiceData.metrics.commissionRate}
                    </span>
                    <span className="block text-[11px] text-slate-400 font-medium">
                      Per Passport
                    </span>
                  </div>
                </div>

                {/* Card 3: Total Commission */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">
                      Total Commission
                    </span>
                    <span className="block text-xl font-black text-slate-900 leading-tight">
                      {invoiceData.metrics.totalCommission}
                    </span>
                    <span className="block text-[11px] text-slate-400 font-medium">
                      USD
                    </span>
                  </div>
                </div>

                {/* Card 4: Payment Status */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-100/80 text-rose-500 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium">
                      Payment Status
                    </span>
                    <span className="block text-xl font-black text-slate-900 leading-tight">
                      {invoiceData.paymentStatus}
                    </span>
                    <span className="block text-[11px] text-slate-400 font-medium whitespace-nowrap">
                      On {invoiceData.paymentDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Passport Details Table (28) */}
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Passport Details ({invoiceData.metrics.totalPassports})
                </h3>

                <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f1f5f9] text-slate-700">
                        <th className="py-3 px-3.5 font-semibold text-center w-10">#</th>
                        <th className="py-3 px-3.5 font-semibold">Passport No.</th>
                        <th className="py-3 px-3.5 font-semibold">Client Name</th>
                        <th className="py-3 px-3.5 font-semibold">Application Type</th>
                        <th className="py-3 px-3.5 font-semibold">Country</th>
                        <th className="py-3 px-3.5 font-semibold">Completion Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentPassports.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-2.5 px-3.5 text-center text-slate-400 font-mono text-[11px]">
                            {row.id}
                          </td>
                          <td className="py-2.5 px-3.5 font-semibold text-slate-800 font-mono">
                            {row.passportNo}
                          </td>
                          <td className="py-2.5 px-3.5 font-medium text-slate-900">
                            {row.clientName}
                          </td>
                          <td className="py-2.5 px-3.5 text-slate-600">
                            {row.applicationType}
                          </td>
                          <td className="py-2.5 px-3.5 text-slate-800 font-medium">
                            {row.country}
                          </td>
                          <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                            {row.completionDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer: Showing entries + Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-slate-500">
                  <div>
                    Showing {startIndex + 1} to{' '}
                    {Math.min(startIndex + pageSize, totalEntries)} of {totalEntries}{' '}
                    entries
                  </div>

                  {/* Pagination numbers matching reference */}
                  <div className="flex items-center gap-1 self-center sm:self-auto">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCurrentPage(num)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          currentPage === num
                            ? 'bg-[#0d2b59] text-white'
                            : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* MODAL FOOTER ACTION BUTTONS                              */}
        {/* ======================================================== */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          {/* Left Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Download Button */}
            <button
              type="button"
              onClick={() => {
                setViewMode('voucher')
                setTimeout(() => window.print(), 250)
              }}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0d2b59] hover:bg-[#071933] text-white text-xs sm:text-[13px] font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice (PDF)</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={() => {
                setViewMode('voucher')
                setTimeout(() => window.print(), 250)
              }}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print</span>
            </button>

            {/* Send to Email Button */}
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={emailStatus === 'sending'}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4 text-slate-500" />
              <span>
                {emailStatus === 'sending' ? 'Sending...' : 'Send to Email'}
              </span>
            </button>
          </div>

          {/* Quick toggle button */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'modal' ? 'voucher' : 'modal')}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:underline cursor-pointer py-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>
              {viewMode === 'modal' ? 'Preview Official Voucher (A4)' : 'Back to Modal View'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
