import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Download,
  Info,
  Printer,
  RotateCcw,
  ShieldCheck,
  X,
  LoaderCircle,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useStatusLookup } from '@/hooks'
import { VISA_STATUS_CONFIG } from '@/constants'
import Modal from '@/components/ui/Modal'
import StatusLookupForm from './StatusLookupForm'
import StatusBanner from './StatusBanner'
import ApplicationDetails from './ApplicationDetails'
import StatusTimeline from './StatusTimeline'
import PrintableStatus from './PrintableStatus'

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
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs">
      <h3 className="text-[15px] font-bold text-navy">{title}</h3>
      {children}
    </section>
  )
}

function ModalContent({ onClose, defaultLinkRef }) {
  const { currentUser } = useAuth()
  const lookup = useStatusLookup(defaultLinkRef)
  const { link, result, closeResult } = lookup
  const [generatedAt] = useState(() => new Date().toISOString())

  const handleTrackAnother = () => {
    closeResult()
    requestAnimationFrame(() => {
      document.getElementById('visa-status-passport')?.focus()
    })
  }

  const config = result ? VISA_STATUS_CONFIG[result.status] : null
  const fileName = result ? `ABL-Visa-Status-${result.applicationNo}` : 'ABL-Visa-Status'

  return (
    <div className="relative">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute -right-1 -top-1 sm:right-0 sm:top-0 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {/* Header */}
      <div className="pr-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-emerald-700">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            LIVE VISA TRACKING
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
            <ShieldCheck className="size-3" />
            Verified
          </span>
        </div>

        <h2 id="visa-track-modal-title" className="font-display mt-2.5 text-2xl font-black text-navy sm:text-3xl">
          {result ? 'Your Visa Application Status' : 'Track Your Visa Status'}
        </h2>
        <p className="mt-1 text-sm text-body">
          {result
            ? 'Real-time record retrieved from the visa processing system.'
            : 'Enter your passport number and phone number below to receive instant updates on your application.'}
        </p>
      </div>

      {/* Body content */}
      <div className="mt-6">
        {link.state === 'checking' ? (
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-12 text-sm text-body shadow-xs">
            <LoaderCircle className="size-5 animate-spin text-primary" aria-hidden="true" />
            Connecting to visa tracking database...
          </div>
        ) : !result ? (
          <div>
            <StatusLookupForm fullName={currentUser?.name ?? ''} lookup={lookup} />
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <StatusBanner status={result.status} />

            <div className="grid gap-4 md:grid-cols-[1.15fr_1fr]">
              <Panel title="Application Details">
                <ApplicationDetails result={result} />
              </Panel>
              <Panel title="Application Timeline">
                <StatusTimeline status={result.status} events={result.events} />
              </Panel>
            </div>

            {config?.notice && (
              <div className="flex items-start gap-3 rounded-2xl bg-primary-light/70 border border-primary/20 px-4 py-4 sm:px-5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Info className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-primary">Important Embassy Notice</p>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-body">{config.notice}</p>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={handleTrackAnother}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-navy transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <RotateCcw className="size-4 text-slate-500" aria-hidden="true" />
                Track Another Application
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => printAs(fileName)}
                  className="flex-1 sm:flex-none inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary transition-colors hover:bg-primary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Printer className="size-4" aria-hidden="true" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => printAs(fileName)}
                  className="flex-1 sm:flex-none inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download Details
                </button>
              </div>
            </div>

            {createPortal(<PrintableStatus result={result} generatedAt={generatedAt} />, document.body)}
          </div>
        )}
      </div>
    </div>
  )
}

export default function VisaTrackModal({ isOpen, onClose, defaultLinkRef = 'demo-approved' }) {
  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="visa-track-modal-title"
      className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 md:p-8 shadow-2xl"
    >
      <ModalContent onClose={onClose} defaultLinkRef={defaultLinkRef} />
    </Modal>
  )
}
