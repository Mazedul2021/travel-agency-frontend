import { Check, X } from 'lucide-react'
import { STATUS_TONES, VISA_STATUS_CONFIG, buildTimeline } from '@/constants'
import { formatDateTime } from '@/utils'

const STATE_TEXT = {
  done: 'Completed',
  current: 'In progress',
  stopped: 'Stopped',
  pending: 'Pending',
}

function Marker({ state, tone }) {
  if (state === 'pending') {
    return <span className="block size-6 rounded-full border-2 border-slate-300 bg-white" />
  }
  if (state === 'current') {
    return (
      <span className={`flex size-6 items-center justify-center rounded-full border-2 ${STATUS_TONES.blue.marker}`}>
        <span className="size-2 rounded-full bg-primary" />
      </span>
    )
  }
  if (state === 'stopped') {
    const Icon = tone === 'red' ? X : Check
    return (
      <span className={`flex size-6 items-center justify-center rounded-full border-2 ${STATUS_TONES[tone].marker}`}>
        <Icon className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className={`flex size-6 items-center justify-center rounded-full border-2 ${STATUS_TONES.green.marker}`}>
      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
    </span>
  )
}

export default function StatusTimeline({ status, events }) {
  const rows = buildTimeline(status, events)
  const tone = VISA_STATUS_CONFIG[status]?.tone ?? 'blue'

  return (
    <ol aria-label="Application timeline" className="mt-5">
      {rows.map((row, index) => {
        const next = rows[index + 1]
        const isLast = !next
        const reached = row.state !== 'pending' && next && next.state !== 'pending'
        const lineTone = row.state === 'stopped' ? STATUS_TONES[tone].line : STATUS_TONES.green.line

        return (
          <li key={row.key} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[11px] top-7 h-[calc(100%-1.75rem)] w-0.5 ${reached ? lineTone : 'bg-slate-200'}`}
              />
            )}
            <span className="relative z-10 shrink-0">
              <Marker state={row.state} tone={tone} />
            </span>
            <div className="min-w-0 -mt-0.5">
              <p className="text-sm font-bold text-navy">
                {row.label}
                <span className="sr-only"> ({STATE_TEXT[row.state]})</span>
              </p>
              <p className="mt-0.5 text-[13px] text-body">
                {row.at ? formatDateTime(row.at) : row.state === 'stopped' ? STATE_TEXT.stopped : 'Pending'}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
