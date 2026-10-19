import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Link2Off, LoaderCircle, TriangleAlert } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useStatusLookup } from '@/hooks'
import { isDemoMode } from '@/services/visaStatus'
import SectionLabel from '@/components/sections/VisaExplorer/SectionLabel'
import StatusLookupForm from '@/components/visa-status/StatusLookupForm'
import StatusResultModal from '@/components/visa-status/StatusResultModal'

// This page is only reachable from the link we send by SMS. Keep it out of search results,
// and do not let the browser pass the link (it identifies one application) on to other sites.
function usePrivatePage(title) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const tags = [
      ['robots', 'noindex,nofollow'],
      ['referrer', 'no-referrer'],
    ].map(([name, content]) => {
      const tag = document.createElement('meta')
      tag.name = name
      tag.content = content
      document.head.appendChild(tag)
      return tag
    })

    return () => {
      tags.forEach((tag) => tag.remove())
      document.title = previousTitle
    }
  }, [title])
}

function MessageCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-card sm:p-12">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light text-primary">
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-body">{children}</p>
    </div>
  )
}

function StatusLookup({ linkRef }) {
  const { currentUser } = useAuth()
  const lookup = useStatusLookup(linkRef)
  const { link, result, closeResult } = lookup

  // The button that opened the dialog is disabled again once the form goes back to step 1, so focus the form instead
  const handleClose = () => {
    closeResult()
    requestAnimationFrame(() => document.getElementById('visa-status-passport')?.focus())
  }

  if (link.state === 'checking') {
    return (
      <div
        role="status"
        className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-12 text-sm text-body shadow-card"
      >
        <LoaderCircle className="size-5 animate-spin text-primary" aria-hidden="true" />
        Checking your link...
      </div>
    )
  }

  if (link.state === 'invalid') {
    return (
      <MessageCard icon={Link2Off} title="This link is not valid">
        It may have expired or been copied incorrectly. Please{' '}
        <Link to="/contact" className="font-semibold text-primary hover:underline">
          contact us
        </Link>{' '}
        and we will send you a new one.
      </MessageCard>
    )
  }

  if (link.state === 'unavailable') {
    return (
      <MessageCard icon={TriangleAlert} title="Visa status is not available right now">
        We could not load the visa status service. Please try again in a few minutes.
      </MessageCard>
    )
  }

  const { demoHint } = link

  return (
    <>
      <StatusLookupForm fullName={currentUser?.name ?? ''} lookup={lookup} />

      {isDemoMode && demoHint && (
        <p className="mt-4 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-center text-xs text-amber-800">
          Demo mode. Passport <strong>{demoHint.passportNo}</strong>, phone <strong>{demoHint.phone}</strong>, OTP{' '}
          <strong>{demoHint.otp}</strong>
        </p>
      )}

      {result && <StatusResultModal result={result} onClose={handleClose} />}
    </>
  )
}

export default function VisaStatusPage() {
  const { linkRef: paramRef } = useParams()
  const linkRef = paramRef || 'demo-approved'
  usePrivatePage('Track Your Visa Status | ABL Travels')

  return (
    <main className="px-4 pb-20 pt-10 sm:pt-12">
      <div className="mx-auto max-w-[672px]">
        <header className="text-center">
          <div className="flex justify-center">
            <SectionLabel>Visa Status</SectionLabel>
          </div>
          <h1 className="font-display mt-4 text-[34px] font-bold leading-tight text-navy sm:text-[44px]">
            Track Your Visa Status
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-body">
            Enter your details below to get real-time updates on your visa application.
          </p>
        </header>

        <div className="mt-8 sm:mt-9">
          <StatusLookup key={linkRef} linkRef={linkRef} />
        </div>
      </div>
    </main>
  )
}
