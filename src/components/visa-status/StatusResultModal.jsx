import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Download, Info, Printer, X } from 'lucide-react'
import { VISA_STATUS_CONFIG } from '@/constants'
import Modal from '@/components/ui/Modal'
import ApplicationDetails from './ApplicationDetails'
import PrintableStatus from './PrintableStatus'
import StatusBanner from './StatusBanner'
import StatusTimeline from './StatusTimeline'

// The browser has no "save this as a file" call, so Download opens the print dialog with a file name
// ready for "Save as PDF". The title is put back once the dialog closes, whichever button opened it.
let titleBeforePrint = null

const restoreTitle = () => {
  if (titleBeforePrint !== null) document.title = titleBeforePrint
  titleBeforePrint = null
  window.removeEventListener('afterprint', restoreTitle)
}

const printAs = (title) => {
  if (titleBeforePrint === null) titleBeforePrint = document.title
  document.title = title
  window.addEventListener('afterprint', restoreTitle)
  window.print()
}

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
      <h3 className="text-[15px] font-bold text-navy">{title}</h3>
      {children}
    </section>
  )
}

export default function StatusResultModal({ result, onClose }) {
  const [generatedAt] = useState(() => new Date().toISOString())

  if (!result) return null

  const config = VISA_STATUS_CONFIG[result.status]
  const fileName = `ABL-Visa-Status-${result.applicationNo}`

  return (
    <>
      <Modal
        isOpen
        onClose={onClose}
        labelledBy="visa-status-result-title"
        className="w-full max-w-[736px] rounded-3xl bg-white p-5 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-full text-navy transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-6 sm:top-6"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <h2 id="visa-status-result-title" className="font-display pr-10 text-3xl font-bold text-navy">
          Visa Status
        </h2>
        <p className="mt-1 text-sm text-body">Here is the latest status of your visa application.</p>

        <div className="mt-5">
          <StatusBanner status={result.status} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.12fr_1fr]">
          <Panel title="Application Details">
            <ApplicationDetails result={result} />
          </Panel>
          <Panel title="Application Timeline">
            <StatusTimeline status={result.status} events={result.events} />
          </Panel>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-primary-light px-4 py-4 sm:px-5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Info className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-bold text-primary">Important Information</p>
            <p className="mt-1 text-sm leading-relaxed text-body">{config.notice}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => printAs(fileName)}
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Printer className="size-[18px]" aria-hidden="true" />
            Print
          </button>
          <button
            type="button"
            onClick={() => printAs(fileName)}
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Download className="size-[18px]" aria-hidden="true" />
            Download Details
          </button>
        </div>
      </Modal>

      {createPortal(<PrintableStatus result={result} generatedAt={generatedAt} />, document.body)}
    </>
  )
}
