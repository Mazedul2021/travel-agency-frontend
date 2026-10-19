import CountryFlag from '@/components/sections/VisaExplorer/CountryFlag'
import { formatDate } from '@/utils'

export default function ApplicationDetails({ result }) {
  const rows = [
    ['Full Name', result.applicant.fullName],
    ['Passport Number', result.applicant.passportNo],
    ['Phone Number', result.applicant.phone],
    [
      'Country',
      <span key="country" className="flex items-center gap-2">
        <CountryFlag code={result.country.code} name={result.country.name} width={26} />
        {result.country.name}
      </span>,
    ],
    ['Visa Type', result.visaType],
    ['Entry Type', result.entryType],
    ['Application No.', result.applicationNo],
    ['Submission Date', formatDate(result.submittedAt)],
    ['Processing Time', result.processingTime],
  ]

  return (
    <dl className="mt-3">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="grid grid-cols-[116px_1fr] items-center gap-3 border-b border-slate-100 py-2.5 text-sm last:border-b-0 sm:grid-cols-[132px_1fr]"
        >
          <dt className="text-body">{label}</dt>
          <dd className="min-w-0 break-words font-medium text-navy">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
