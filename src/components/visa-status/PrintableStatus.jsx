import { VISA_STATUS_CONFIG, buildTimeline } from '@/constants'
import { formatDate, formatDateTime } from '@/utils'

const STATE_MARK = { done: '[x]', current: '[~]', stopped: '[!]', pending: '[ ]' }

/**
 * The paper version of the result. It is invisible on screen and is the only thing the browser
 * prints (see the #printable-visa-status rules in index.css), so the buttons and the dialog never reach the page.
 */
export default function PrintableStatus({ result, generatedAt }) {
  const config = VISA_STATUS_CONFIG[result.status]
  const rows = [
    ['Full Name', result.applicant.fullName],
    ['Passport Number', result.applicant.passportNo],
    ['Phone Number', result.applicant.phone],
    ['Country', result.country.name],
    ['Visa Type', result.visaType],
    ['Entry Type', result.entryType],
    ['Application No.', result.applicationNo],
    ['Submission Date', formatDate(result.submittedAt)],
    ['Processing Time', result.processingTime],
  ]

  return (
    <div id="printable-visa-status" className="hidden bg-white font-sans text-navy print:block">
      <div className="flex items-center justify-between border-b-2 border-navy pb-4">
        <div className="flex items-center gap-3">
          <img src="/company_logo.png" alt="" className="size-12 object-contain" />
          <div>
            <p className="text-lg font-extrabold leading-none">ABL Travels</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-body">China &amp; Beyond</p>
          </div>
        </div>
        <p className="text-right text-xs text-body">
          Generated on {formatDateTime(generatedAt)}
        </p>
      </div>

      <h1 className="mt-6 text-2xl font-bold">Visa Status Report</h1>
      <p className="mt-1 text-lg font-semibold">{config.headline}</p>
      <p className="mt-1 text-sm text-body">{config.message}</p>

      <table className="mt-6 w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-300">
              <th className="w-48 py-2 text-left font-normal text-body">{label}</th>
              <td className="py-2 font-medium">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-8 text-base font-bold">Application Timeline</h2>
      <ul className="mt-2 space-y-1.5 text-sm">
        {buildTimeline(result.status, result.events).map((row) => (
          <li key={row.key} className="flex gap-3">
            <span className="w-8 font-mono">{STATE_MARK[row.state]}</span>
            <span className="w-52 font-semibold">{row.label}</span>
            <span className="text-body">{row.at ? formatDateTime(row.at) : 'Pending'}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 rounded border border-slate-300 p-3 text-sm">
        <strong>Important information: </strong>
        {config.notice}
      </p>

      <p className="mt-10 border-t border-slate-300 pt-3 text-center text-xs text-body">
        ABL Travels, House #1/B, Road #126, Gulshan 01, Dhaka 1212, Bangladesh. 01717-999637. abltravels.visa@gmail.com
      </p>
    </div>
  )
}
