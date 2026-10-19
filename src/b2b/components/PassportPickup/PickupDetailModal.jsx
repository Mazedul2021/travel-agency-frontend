import { X, Truck, Phone, MapPin, Calendar, Clock, CheckCircle2, ShieldCheck } from 'lucide-react'

export default function PickupDetailModal({ pickup, onClose }) {
  if (!pickup) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0d2b59] px-5 sm:px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{pickup.requestId}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white">
                  {pickup.status}
                </span>
              </div>
              <p className="text-xs text-white/70">{pickup.applicantName} • {pickup.applications}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          {/* Dispatch Rider Card */}
          {pickup.assignedRider ? (
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3.5 sm:p-4 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {pickup.assignedRider.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{pickup.assignedRider.name}</p>
                  <p className="text-[11px] text-slate-500">{pickup.assignedRider.vehicle}</p>
                </div>
              </div>
              <a
                href={`tel:${pickup.assignedRider.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0066cc] hover:bg-[#004f9e] text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Courier</span>
              </a>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              No courier rider assigned yet. Dispatch will assign before the morning route.
            </div>
          )}

          {/* Location & Time */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-slate-400 block mb-1">Pickup Date &amp; Slot</span>
              <p className="font-semibold text-slate-800">{pickup.requestedDate}</p>
              <p className="text-slate-500">{pickup.preferredTime || '02:00 PM - 04:00 PM'}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-slate-400 block mb-1">Pickup Location</span>
              <p className="font-semibold text-slate-800">{pickup.pickupAddress}</p>
              <p className="text-slate-500 line-clamp-1">{pickup.fullAddress || 'Gulshan-2, Dhaka'}</p>
            </div>
          </div>

          {/* Passports Attached */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Passports in this Batch ({pickup.items?.length || 1})
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {pickup.items?.map((item, i) => (
                <div key={i} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    <p className="text-slate-500">{item.visa}</p>
                  </div>
                  <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {item.passport}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0d2b59] hover:bg-[#071933] rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
