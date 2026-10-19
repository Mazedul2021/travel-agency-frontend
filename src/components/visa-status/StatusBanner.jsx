import { CircleCheck, CirclePause, FileCheck2, FileClock, FileText, FileWarning, FileX2 } from 'lucide-react'
import { STATUS_TONES, VISA_STATUS_CONFIG } from '@/constants'

const STATUS_ICONS = {
  submitted: FileText,
  processing: FileClock,
  approved: FileCheck2,
  ready: FileCheck2,
  collected: CircleCheck,
  docs_required: FileWarning,
  on_hold: CirclePause,
  rejected: FileX2,
}

export default function StatusBanner({ status }) {
  const config = VISA_STATUS_CONFIG[status]
  const tone = STATUS_TONES[config.tone]
  const Icon = STATUS_ICONS[status]

  return (
    <section
      aria-label="Current status"
      className={`flex items-center gap-4 rounded-2xl border p-4 sm:gap-6 sm:p-5 ${tone.banner}`}
    >
      <span className={`flex size-16 shrink-0 items-center justify-center rounded-full sm:size-[76px] ${tone.halo}`}>
        <span className={`flex size-11 items-center justify-center rounded-full sm:size-[52px] ${tone.badge}`}>
          <Icon className="size-6 sm:size-7" aria-hidden="true" />
        </span>
      </span>

      <span className="hidden h-14 w-px shrink-0 bg-slate-200 sm:block" aria-hidden="true" />

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy/70">Current Status</p>
        <h3 className={`mt-0.5 font-display text-2xl font-bold leading-tight sm:text-[28px] ${tone.headline}`}>
          {config.headline}
        </h3>
        <p className="mt-1 text-sm text-body">{config.message}</p>
      </div>
    </section>
  )
}
