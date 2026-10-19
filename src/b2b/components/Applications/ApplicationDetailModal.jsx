import {
  X,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  Copy,
  Check,
  Building,
  User,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import CountryFlag from '../common/CountryFlag'

export default function ApplicationDetailModal({ application, onClose }) {
  const [copied, setCopied] = useState(false)

  if (!application) return null

  const handleCopy = (txt) => {
    navigator.clipboard.writeText(txt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0d2b59] px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <CountryFlag countryCode={application.countryCode} countryName={application.country} className="w-5 h-4 sm:w-6 sm:h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">{application.applicantName}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white`}>
                  {application.status}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-white/70">
                {application.country} • {application.applicationType} • Ref: {application.appRef}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          {/* Key Metric Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-[11px] text-slate-500 block">Passport Number</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-mono text-xs font-bold text-slate-800">{application.passportNo}</span>
                <button
                  onClick={() => handleCopy(application.passportNo)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-[11px] text-slate-500 block">Apply Date</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block">{application.applyDate}</span>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-[11px] text-slate-500 block">Embassy Fee</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block">{application.fee || '$160.00'}</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
              <span className="text-[11px] text-emerald-700 block">Partner Commission</span>
              <span className="text-xs font-bold text-emerald-800 mt-0.5 block">{application.commission || '$32.00'}</span>
            </div>
          </div>

          {/* Embassy Reference & Notes */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0066cc] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Embassy Tracking Reference: <span className="font-mono text-[#0066cc]">{application.embassyReference || 'CN-DAC-90412'}</span>
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {application.notes || 'Application documents checked and verified by ABL processing officers.'}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Application Processing Stages
            </h4>
            <div className="space-y-3">
              {application.timeline?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {item.done ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : item.current ? (
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${item.current ? 'text-amber-800 font-bold' : item.done ? 'text-slate-800' : 'text-slate-400'}`}>
                        {item.step}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => alert(`Downloading visa dossier for ${application.applicantName}`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0d2b59] hover:bg-[#071933] rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Voucher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
