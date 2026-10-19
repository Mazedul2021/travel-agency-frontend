/**
 * Visa status tracking: stages, per-status copy and colours, and the timeline builder
 */

export const OTP_LENGTH = 6
export const OTP_RESEND_SECONDS = 45

export const VISA_STAGES = [
  { key: 'submitted', label: 'Application Submitted' },
  { key: 'processing', label: 'Under Process' },
  { key: 'approved', label: 'Visa Approved' },
  { key: 'ready', label: 'Ready for Pickup' },
  { key: 'collected', label: 'Collected' },
]

// Full class strings, so Tailwind can see every one of them
export const STATUS_TONES = {
  green: {
    banner: 'border-emerald-100 bg-emerald-50/70',
    halo: 'bg-emerald-100',
    badge: 'bg-emerald-600 text-white',
    headline: 'text-emerald-600',
    marker: 'border-emerald-500 bg-emerald-500 text-white',
    line: 'bg-emerald-500',
  },
  blue: {
    banner: 'border-sky-100 bg-sky-50/70',
    halo: 'bg-sky-100',
    badge: 'bg-primary text-white',
    headline: 'text-primary',
    marker: 'border-primary bg-white text-primary',
    line: 'bg-primary',
  },
  amber: {
    banner: 'border-amber-100 bg-amber-50/70',
    halo: 'bg-amber-100',
    badge: 'bg-amber-500 text-white',
    headline: 'text-amber-600',
    marker: 'border-amber-500 bg-amber-500 text-white',
    line: 'bg-amber-500',
  },
  red: {
    banner: 'border-rose-100 bg-rose-50/70',
    halo: 'bg-rose-100',
    badge: 'bg-rose-600 text-white',
    headline: 'text-rose-600',
    marker: 'border-rose-500 bg-rose-500 text-white',
    line: 'bg-rose-500',
  },
}

/**
 * stage       index in VISA_STAGES the status sits on
 * inProgress  the stage is happening now (ring) instead of finished (check)
 * interrupt   replaces the stage at `stage` with a stop marker; `keepRest` keeps the later stages as pending
 */
export const VISA_STATUS_CONFIG = {
  submitted: {
    stage: 0,
    tone: 'blue',
    headline: 'Application Submitted',
    message: 'We have received your application. It is waiting to be picked up by our visa team.',
    notice: 'No action is needed from you right now. We will notify you via SMS when the status changes.',
  },
  processing: {
    stage: 1,
    inProgress: true,
    tone: 'blue',
    headline: 'Under Process',
    message: 'Your application is being processed. We will update you as soon as there is progress.',
    notice: 'Processing time is an estimate and can change. We will notify you via SMS when there is an update.',
  },
  approved: {
    stage: 2,
    tone: 'green',
    headline: 'Visa Approved',
    message: 'Your visa has been approved. Please follow the collection instructions.',
    notice: 'Please keep your original passport ready for collection. We will notify you via SMS once it is ready.',
  },
  ready: {
    stage: 3,
    tone: 'green',
    headline: 'Ready for Pickup',
    message: 'Your passport with the visa is ready. Please collect it from our office.',
    notice: 'Please collect your passport from our office. Contact us if you have any questions about the collection.',
  },
  collected: {
    stage: 4,
    tone: 'green',
    headline: 'Collected',
    message: 'Your passport has been collected. Thank you for choosing ABL Travels.',
    notice: 'Check the visa details on your passport before you travel. Contact us if anything looks wrong.',
  },
  docs_required: {
    stage: 1,
    tone: 'amber',
    headline: 'Documents Required',
    message: 'We need additional documents to continue with your application.',
    notice: 'Our team will contact you with the list of documents. Your application resumes as soon as we receive them.',
    interrupt: { label: 'Documents Required', keepRest: true },
  },
  on_hold: {
    stage: 1,
    tone: 'amber',
    headline: 'On Hold',
    message: 'Your application is on hold. Please contact our support team.',
    notice: 'Call 01717-999637 or email abltravels.visa@gmail.com and mention your application number.',
    interrupt: { label: 'On Hold', keepRest: true },
  },
  rejected: {
    stage: 2,
    tone: 'red',
    headline: 'Visa Rejected',
    message: 'Unfortunately your visa application was not approved.',
    notice: 'Please contact our team to understand the reason and the options for a new application.',
    interrupt: { label: 'Visa Rejected', keepRest: false },
  },
}

/**
 * Turns a status plus the dates of each stage into the rows of the timeline.
 * state: 'done' | 'current' | 'pending' | 'stopped'
 */
export function buildTimeline(status, events = {}) {
  const config = VISA_STATUS_CONFIG[status] ?? VISA_STATUS_CONFIG.submitted

  const rows = VISA_STAGES.map((stage, index) => {
    let state = 'pending'
    if (index < config.stage) state = 'done'
    else if (index === config.stage) state = config.inProgress ? 'current' : 'done'
    return { key: stage.key, label: stage.label, at: events[stage.key] ?? null, state }
  })

  if (!config.interrupt) return rows

  const stopped = {
    key: status,
    label: config.interrupt.label,
    at: events[status] ?? null,
    state: 'stopped',
  }
  const before = rows.slice(0, config.stage)
  const after = config.interrupt.keepRest ? rows.slice(config.stage + 1) : []
  return [...before, stopped, ...after]
}

export const VISA_STATUS_ERRORS = {
  NOT_FOUND: "We couldn't find an application matching these details. Please check your passport and phone number.",
  INVALID_OTP: 'That code is incorrect. Please check it and try again.',
  OTP_EXPIRED: 'That code has expired. Please request a new one.',
  TOO_MANY_ATTEMPTS: 'Too many attempts. Please wait before trying again.',
  NETWORK: 'We could not reach the server. Please check your connection and try again.',
  SERVICE_UNAVAILABLE: 'Visa status lookup is not available right now. Please try again later.',
}
