import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { formatFee } from '@/constants'
import SectionLabel from './SectionLabel'

// Placeholder until a real application form exists
const APPLY_HREF = '#contact'

export default function FeeCard({ countryName, type, onApply }) {
  const { title, fee, includes } = type.details

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <SectionLabel>Visa Fee</SectionLabel>
      <h3 className="mt-3 text-lg font-bold leading-snug text-navy">{title}</h3>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-primary-light px-4 py-4">
        <p className="whitespace-nowrap text-2xl font-extrabold tracking-tight text-primary-dark sm:text-[26px]">
          {formatFee(fee)}
        </p>
        {fee.note && (
          <span className="shrink-0 rounded-md border border-primary/20 bg-white/70 px-2.5 py-1 text-xs font-semibold text-primary">
            {fee.note}
          </span>
        )}
      </div>

      <ul className="mt-4 space-y-3 rounded-xl bg-tint px-4 py-4">
        {includes.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-navy/85">
            <CheckCircle2 className="size-[18px] shrink-0 text-primary" strokeWidth={1.8} />
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onApply}
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-dark px-5 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:shadow-accent/40 active:scale-[0.99] cursor-pointer"
      >
        Apply for {countryName} {type.label}
        <ArrowRight className="size-[18px]" strokeWidth={2.5} />
      </button>
    </div>
  )
}
