import { useState } from 'react'
import {
  Headphones,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  HelpCircle,
  Send,
  CheckCircle2,
  FileQuestion,
  ChevronRight,
} from 'lucide-react'
import { PARTNER_INFO } from '../../data/partnerData'

export default function SupportView() {
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: 'Visa Status Escalation',
    applicationRef: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setTicketData({
          subject: '',
          category: 'Visa Status Escalation',
          applicationRef: '',
          message: '',
        })
      }, 3000)
    }, 700)
  }

  const faqs = [
    {
      q: 'How fast are passports collected after scheduling?',
      a: 'Our dispatch couriers collect passports within 2-4 hours of your chosen time window in Gulshan, Banani, Uttara, and Dhanmondi zones.',
    },
    {
      q: 'When are commission payouts deposited to bank accounts?',
      a: 'Bi-weekly settlements are generated automatically on the 10th and 25th of each month into your City Bank account.',
    },
    {
      q: 'Can I upload additional documents if embassy requests clarification?',
      a: 'Yes, click "View" on any application in "On Hold" or "Document Review" and upload the requested supplementary documents immediately.',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight">
          Partner Support &amp; Help Desk
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Direct priority communication channel with your ABL Travels account manager.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Account Manager Card & FAQs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Account Manager Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0066cc] to-[#0d2b59] text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                AM
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#0066cc] uppercase tracking-wider block">
                  Your Dedicated Account Manager
                </span>
                <h3 className="text-lg font-bold text-slate-900">{PARTNER_INFO.manager.name}</h3>
                <p className="text-xs text-slate-500">{PARTNER_INFO.manager.title}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Available 7 days a week (9:00 AM – 9:00 PM) for urgent embassy submissions, special group discounts, and expedited passport collections.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={`tel:${PARTNER_INFO.manager.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0066cc]" />
                <span>{PARTNER_INFO.manager.phone}</span>
              </a>

              <a
                href={`https://wa.me/${PARTNER_INFO.manager.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#0066cc]" />
              <h4 className="text-sm font-bold text-slate-800">Frequently Asked Partner Questions</h4>
            </div>

            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                  <p className="text-xs font-bold text-slate-800">{f.q}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Submission (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Send className="w-4 h-4 text-[#0066cc]" />
              <h3 className="text-sm font-bold text-slate-800">Submit Priority Ticket</h3>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Ticket Dispatched!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Ticket #{Math.floor(100000 + Math.random() * 900000)} has been sent to Asif Mahmud. You will receive an update shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Issue Category *</label>
                  <select
                    value={ticketData.category}
                    onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#0066cc] bg-white"
                  >
                    <option value="Visa Status Escalation">Visa Status Escalation</option>
                    <option value="Urgent Passport Pickup">Urgent Passport Pickup</option>
                    <option value="Commission Discrepancy">Commission Discrepancy</option>
                    <option value="Tour Package Custom Pricing">Tour Package Custom Pricing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Related Application Ref (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. APP-2025-1089"
                    value={ticketData.applicationRef}
                    onChange={(e) => setTicketData({ ...ticketData, applicationRef: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief subject of the inquiry"
                    value={ticketData.subject}
                    onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message Details *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Provide detailed instructions or question..."
                    value={ticketData.message}
                    onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 bg-[#0d2b59] hover:bg-[#071933] text-white font-semibold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Send to Relationship Desk'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
