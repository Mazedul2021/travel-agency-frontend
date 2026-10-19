import {
  Phone,
  Mail,
  Globe,
  Check,
} from 'lucide-react'
import { COMMISSION_INVOICE_DEFAULT } from '../../data/commissionData'

// Vector Delta Origami Logo matching the voucher image
function VoucherBrandLogo() {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Delta origami fold with mini paper plane cutout */}
      <div className="relative w-13 h-13 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-13 h-13 drop-shadow-xs" fill="none">
          {/* Top Blue Wing */}
          <path
            d="M 12 16 L 82 16 L 46 86 Z"
            fill="url(#voucherBlueGrad)"
          />
          {/* Bottom Orange Wing */}
          <path
            d="M 46 86 L 82 16 L 94 44 Z"
            fill="url(#voucherOrangeGrad)"
          />
          {/* White Mini Origami Paper Plane Cutout inside blue wing */}
          <path
            d="M 38 28 L 68 28 L 52 48 Z"
            fill="#ffffff"
            opacity="0.95"
          />
          <path
            d="M 52 48 L 68 28 L 74 36 Z"
            fill="#f1f5f9"
            opacity="0.95"
          />
          <defs>
            <linearGradient id="voucherBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id="voucherOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div>
        <div className="flex items-center leading-none">
          <span className="text-2xl sm:text-[26px] font-black italic tracking-tight text-[#0066cc]">
            ABL <span className="font-extrabold text-[#004f9e] not-italic">Travels</span>
          </span>
        </div>
        <p className="font-script text-base sm:text-lg text-[#0066cc] mt-0.5 tracking-wide">
          Together We Explore More
        </p>
      </div>
    </div>
  )
}

// Circular Official Rubber Stamp matching reference exactly
function OfficialRubberStamp({ className = '' }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 160 160"
        className="w-24 h-24 sm:w-28 sm:h-28 text-[#0052cc] drop-shadow-xs rotate-[12deg] opacity-90"
        fill="currentColor"
      >
        {/* Outer solid border */}
        <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="2.8" />
        {/* Inner solid border */}
        <circle cx="80" cy="80" r="48" fill="none" stroke="currentColor" strokeWidth="1.8" />

        {/* Circular text paths */}
        <defs>
          <path id="stampTopArc" d="M 20,80 A 60,60 0 1,1 140,80" fill="none" />
          <path id="stampBottomArc" d="M 140,80 A 60,60 0 1,1 20,80" fill="none" />
        </defs>

        <text className="font-extrabold text-[11px] uppercase tracking-[0.24em]" fill="currentColor">
          <textPath href="#stampTopArc" startOffset="50%" textAnchor="middle">
            ABL TRAVELS
          </textPath>
        </text>
        <text className="font-bold text-[9.5px] tracking-[0.18em]" fill="currentColor">
          <textPath href="#stampBottomArc" startOffset="50%" textAnchor="middle">
            Dhaka, Bangladesh
          </textPath>
        </text>

        {/* 5-Point Stars on sides */}
        <g transform="translate(18, 77) scale(0.65)" fill="currentColor">
          <polygon points="5,0 6.5,3.5 10,3.5 7.2,5.5 8.3,9 5,7 1.7,9 2.8,5.5 0,3.5 3.5,3.5" />
        </g>
        <g transform="translate(136, 77) scale(0.65)" fill="currentColor">
          <polygon points="5,0 6.5,3.5 10,3.5 7.2,5.5 8.3,9 5,7 1.7,9 2.8,5.5 0,3.5 3.5,3.5" />
        </g>

        {/* Center Stylized Delta Logo (Number 7 origami fold) */}
        <g transform="translate(56, 56) scale(0.48)">
          <path d="M 15 15 L 75 15 L 45 85 Z" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinejoin="round" />
          <path d="M 45 85 L 75 15 L 85 40 Z" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinejoin="round" />
          <path d="M 26 36 L 58 36" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}

// Cursive Handwritten Signature
function CursiveSignature() {
  return (
    <div className="relative inline-block">
      <svg viewBox="0 0 160 55" className="w-28 sm:w-32 h-10 text-[#004f9e]" fill="none" stroke="currentColor">
        <path
          d="M 10 38 C 25 10, 35 12, 45 32 C 52 45, 60 20, 75 15 C 90 10, 85 42, 105 28 C 115 20, 125 35, 140 22 C 148 15, 155 18, 152 26"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 18 44 C 55 42, 110 38, 148 40"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function CommissionVoucherDocument({
  invoice = COMMISSION_INVOICE_DEFAULT,
}) {
  const rowsToShow = invoice.passports.slice(0, 10)

  return (
    <div
      id="printable-voucher"
      className="bg-white text-slate-800 font-sans max-w-[850px] mx-auto p-4 sm:p-8 md:p-10 shadow-xl rounded-2xl border border-slate-200 print:shadow-none print:border-none print:p-8 print:max-w-none print:rounded-none relative overflow-hidden"
    >
      {/* Thin Dark Top Page Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0d2b59]" />

      {/* ======================================================== */}
      {/* 1. TOP HEADER WITH LOGO, AIRPLANE ART & CONTACT INFO     */}
      {/* ======================================================== */}
      <div className="relative pt-2 pb-2">
        {/* Airplane & World Map Graphic in Header Center */}
        <div className="absolute left-[36%] sm:left-[42%] top-0 bottom-2 w-56 sm:w-64 pointer-events-none opacity-30 overflow-hidden hidden sm:block">
          <img
            src="/images/invoice-plane-header.jpg"
            alt="Commercial Airplane Flight"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          {/* Left Brand Wordmark & Slogan */}
          <VoucherBrandLogo />

          {/* Right Corporate Contact Details */}
          <div className="text-right text-[11px] sm:text-xs text-slate-600 space-y-1 self-end sm:self-auto">
            <h4 className="font-bold text-[#0c1a30] text-xs sm:text-[13px]">
              {invoice.company.name}
            </h4>
            <p className="text-slate-500">{invoice.company.address}</p>
            <div className="flex items-center justify-end gap-1.5 text-slate-700">
              <Phone className="w-3 h-3 text-[#0d2b59]" />
              <span>{invoice.company.phone}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-slate-700">
              <Mail className="w-3 h-3 text-[#0d2b59]" />
              <span>{invoice.company.email}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-slate-700">
              <Globe className="w-3 h-3 text-[#0d2b59]" />
              <span>{invoice.company.website}</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ELEGANT DUAL-CURVED GOLD & BLUE WAVE SWOOSH BANNER       */}
        {/* ======================================================== */}
        <div className="relative w-full h-11 mt-3 -mb-1 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1000 65" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="swooshBlueGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#2563eb" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#0052cc" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="swooshGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            {/* Blue Wave Shape */}
            <path
              d="M 0,26 Q 260,32 520,22 Q 780,12 1000,0 L 1000,65 L 0,65 Z"
              fill="url(#swooshBlueGrad)"
            />
            {/* Golden Accent Line along wave crest */}
            <path
              d="M 0,25 Q 260,31 520,21 Q 780,11 1000,0"
              fill="none"
              stroke="url(#swooshGoldGrad)"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DOCUMENT TITLE & TWO-COLUMN DETAILS GRID               */}
      {/* ======================================================== */}
      <div className="pt-4 pb-4">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-black text-[#0c1a30] tracking-tight uppercase">
            COMMISSION INVOICE
          </h1>
          <p className="text-xs sm:text-[13px] text-[#0066cc] font-medium mt-0.5">
            For B2B Partner
          </p>
        </div>

        {/* Two-Column Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Left Column: Partner Details */}
          <div className="space-y-1 text-xs sm:text-[13px]">
            <h3 className="font-bold text-[#0c1a30] text-xs sm:text-sm mb-1.5">
              Partner Details
            </h3>
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              {invoice.partner.name}
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-500">Partner ID:</span>{' '}
              <span className="font-semibold text-slate-800">{invoice.partner.id}</span>
            </p>
            <p className="text-slate-600">{invoice.partner.agency}</p>
            <p className="text-slate-500">{invoice.partner.address}</p>
          </div>

          {/* Right Column: Clean Boxed Metadata Table with Internal Grid */}
          <div className="sm:ml-auto w-full sm:w-[320px] border border-slate-200 rounded-lg overflow-hidden text-xs bg-white">
            <div className="divide-y divide-slate-200">
              {/* Row 1 */}
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                <span className="px-3 py-1.5 text-slate-600 font-medium">Invoice No.</span>
                <span className="px-3 py-1.5 font-bold text-[#0c1a30] font-mono">
                  {invoice.invoiceNo}
                </span>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                <span className="px-3 py-1.5 text-slate-600 font-medium">Invoice Date</span>
                <span className="px-3 py-1.5 font-semibold text-slate-800">
                  {invoice.invoiceDate}
                </span>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                <span className="px-3 py-1.5 text-slate-600 font-medium">Period</span>
                <span className="px-3 py-1.5 font-medium text-slate-700 whitespace-nowrap">
                  {invoice.period}
                </span>
              </div>
              {/* Row 4 */}
              <div className="grid grid-cols-2 divide-x divide-slate-200 items-center">
                <span className="px-3 py-1.5 text-slate-600 font-medium">Payment Status</span>
                <div className="px-3 py-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>{invoice.paymentStatus}</span>
                  </span>
                </div>
              </div>
              {/* Row 5 */}
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                <span className="px-3 py-1.5 text-slate-600 font-medium">Payment Date</span>
                <span className="px-3 py-1.5 font-semibold text-slate-800">
                  {invoice.paymentDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. COMMISSION ITEMS TABLE (EXACT NAVY HEADER & BORDERS)   */}
      {/* ======================================================== */}
      <div className="mt-3">
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[620px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0d2b59] text-white divide-x divide-white/20">
                <th className="py-2.5 px-3 font-semibold text-center w-10">#</th>
                <th className="py-2.5 px-3 font-semibold">Passport No.</th>
                <th className="py-2.5 px-3 font-semibold">Client Name</th>
                <th className="py-2.5 px-3 font-semibold">Application Type</th>
                <th className="py-2.5 px-3 font-semibold">Country</th>
                <th className="py-2.5 px-3 font-semibold">Completion Date</th>
                <th className="py-2.5 px-3 font-semibold text-center">Commission (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rowsToShow.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white hover:bg-slate-50/60 divide-x divide-slate-200"
                >
                  <td className="py-2 px-3 text-center text-slate-500 font-mono text-[11px]">
                    {row.id}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-800 font-mono">
                    {row.passportNo}
                  </td>
                  <td className="py-2 px-3 font-medium text-slate-900">
                    {row.clientName}
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    {row.applicationType}
                  </td>
                  <td className="py-2 px-3 text-slate-700 font-medium">
                    {row.country}
                  </td>
                  <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                    {row.completionDate}
                  </td>
                  <td className="py-2 px-3 text-center font-semibold text-slate-900">
                    {row.commission}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Sub-bar below table */}
          <div className="bg-[#f0f6ff] border-t border-slate-200 px-3 py-1.5 text-[11px] sm:text-xs text-slate-600">
            Showing 1 to 10 of {invoice.passports.length} entries
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. FINANCIAL SUMMARY CALCULATION BOX (RIGHT-ALIGNED)     */}
      {/* ======================================================== */}
      <div className="mt-4 flex justify-end">
        <div className="w-full sm:w-[320px] border border-slate-200 rounded-lg overflow-hidden text-xs bg-white">
          <div className="divide-y divide-slate-200">
            {/* Row 1 */}
            <div className="grid grid-cols-2 divide-x divide-slate-200">
              <span className="px-3.5 py-1.5 text-slate-700 font-medium">Total Completed Passports</span>
              <span className="px-3.5 py-1.5 font-bold text-slate-900 text-right">
                {invoice.metrics.totalPassports}
              </span>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-2 divide-x divide-slate-200">
              <span className="px-3.5 py-1.5 text-slate-700 font-medium">Commission Rate (Per Passport)</span>
              <span className="px-3.5 py-1.5 font-bold text-slate-900 text-right">
                {invoice.metrics.commissionRate}
              </span>
            </div>
            {/* Row 3 - Highlighted Light Blue */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 bg-[#e0f2fe]">
              <span className="px-3.5 py-1.5 font-bold text-[#0c1a30]">Total Commission</span>
              <span className="px-3.5 py-1.5 font-bold text-[#0c1a30] text-right">
                {invoice.metrics.totalCommission}
              </span>
            </div>
            {/* Row 4 */}
            <div className="grid grid-cols-2 divide-x divide-slate-200">
              <span className="px-3.5 py-1.5 text-slate-700 font-medium">Previous Balance</span>
              <span className="px-3.5 py-1.5 text-slate-800 text-right font-medium">
                {invoice.metrics.previousBalance}
              </span>
            </div>
            {/* Row 5 - Highlighted Blue Total Payable */}
            <div className="grid grid-cols-2 divide-x divide-slate-200 bg-[#dbeafe]">
              <span className="px-3.5 py-2 font-black text-[#0c1a30] text-xs sm:text-[13px]">
                Total Payable
              </span>
              <span className="px-3.5 py-2 font-black text-[#0c1a30] text-sm sm:text-base text-right">
                {invoice.metrics.totalPayable}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. TERMS & NOTES (LEFT) + SIGNATURE & RUBBER STAMP (RIGHT) */}
      {/* ======================================================== */}
      <div className="mt-7 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Left Terms & Notes */}
        <div className="space-y-1.5 text-[11px] sm:text-xs text-slate-600 max-w-md">
          <h4 className="font-bold text-[#0c1a30] text-xs sm:text-[13px]">
            Terms &amp; Notes:
          </h4>
          <ul className="space-y-1 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-[#0d2b59] font-bold">•</span>
              <span>Commission will be credited within 7 business days after client payment confirmation.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0d2b59] font-bold">•</span>
              <span>This invoice is computer generated and does not require a signature.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0d2b59] font-bold">•</span>
              <span>For any query, please contact partner support.</span>
            </li>
          </ul>
        </div>

        {/* Right Authorised Signature & Circular Rubber Stamp */}
        <div className="relative flex items-center justify-end gap-2 self-start sm:self-end pr-2">
          {/* Signature and Title */}
          <div className="text-center space-y-1 z-10">
            <CursiveSignature />
            <div className="border-t border-slate-400 pt-1">
              <p className="font-bold text-[#0c1a30] text-[11px] sm:text-xs">
                Authorised Signatory
              </p>
              <p className="text-[11px] text-slate-600">
                {invoice.company.name}
              </p>
            </div>
          </div>

          {/* Official Stamp overlapping signature nicely */}
          <OfficialRubberStamp className="-ml-8 -mt-2" />
        </div>
      </div>
    </div>
  )
}
