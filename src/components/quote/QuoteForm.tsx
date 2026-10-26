import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Loader2, Pencil, RotateCcw } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { SERVICE_NAMES, type ServiceName } from '../../data/services'
import { todayISO, validateQuote, type QuoteErrors } from '../../lib/validation'
import {
  buildQuoteMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
  openWhatsApp,
  type QuoteDetails,
} from '../../lib/whatsapp'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

type Status = 'idle' | 'preparing' | 'opened' | 'blocked' | 'unconfigured'

const EMPTY: QuoteDetails = {
  name: '',
  phone: '',
  carModel: '',
  service: '',
  pickup: '',
  destination: '',
  date: '',
  notes: '',
}

const FIELD_ORDER: (keyof QuoteDetails)[] = ['name', 'phone', 'carModel', 'service', 'pickup', 'destination', 'date', 'notes']

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
  children: ReactNode
}

function Field({ id, label, error, hint, optional, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-slate-ink">(optional)</span>
        ) : (
          <span className="ml-0.5 text-orange-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key="err"
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-600"
          >
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-ink">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

interface QuoteFormProps {
  preselected?: ServiceName | ''
  /** Compact layout for the modal and hero */
  compact?: boolean
  /** Prefill the pickup city (used on city pages) */
  defaultPickup?: string
  /** Extra-short layout for the home page hero, so the hero fits on one screen */
  dense?: boolean
}

export function QuoteForm({ preselected = '', compact = false, defaultPickup = '', dense = false }: QuoteFormProps) {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<QuoteDetails>({ ...EMPTY, service: preselected, pickup: defaultPickup })
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteDetails, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [waUrl, setWaUrl] = useState<string | null>(null)
  const submitting = useRef(false)
  // Set after mount so the pre-rendered HTML and the browser agree (the date differs by time zone).
  const [minDate, setMinDate] = useState<string | undefined>(undefined)
  useEffect(() => setMinDate(todayISO()), [])

  const id = (k: keyof QuoteDetails) => `${uid}-${k}`

  const update = (k: keyof QuoteDetails, v: string) => {
    const next = { ...values, [k]: v }
    setValues(next)
    if (status === 'unconfigured') setStatus('idle')
    // Re-validate live only after the user has left the field once (less nagging while typing).
    if (touched[k] || errors[k]) setErrors((e) => ({ ...e, [k]: validateQuote(next)[k] }))
  }

  const blur = (k: keyof QuoteDetails) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors((e) => ({ ...e, [k]: validateQuote(values)[k] }))
  }

  const describedBy = (k: keyof QuoteDetails, hint?: boolean) =>
    errors[k] ? `${id(k)}-error` : hint ? `${id(k)}-hint` : undefined

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (submitting.current || status === 'preparing') return // guard against double submits

    const found = validateQuote(values)
    setErrors(found)
    setTouched(Object.fromEntries(FIELD_ORDER.map((k) => [k, true])))
    const firstInvalid = FIELD_ORDER.find((k) => found[k])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(firstInvalid))}`)?.focus()
      return
    }

    if (!isWhatsAppConfigured()) {
      setStatus('unconfigured')
      return
    }

    submitting.current = true
    setStatus('preparing')
    const url = buildWhatsAppUrl(buildQuoteMessage(values))!
    setWaUrl(url)
    // Open synchronously inside the submit event so it counts as a user action.
    const ok = openWhatsApp(url)
    // Brief "preparing" state, then show honest next-step instructions.
    window.setTimeout(() => {
      setStatus(ok ? 'opened' : 'blocked')
      submitting.current = false
    }, 700)
  }

  const reset = () => {
    setValues({ ...EMPTY, service: preselected, pickup: defaultPickup })
    setErrors({})
    setTouched({})
    setStatus('idle')
    setWaUrl(null)
  }

  const showResult = status === 'opened' || status === 'blocked'

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {showResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            role="status"
            aria-live="polite"
            className="py-4 text-center sm:py-8"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/12 text-[#1da851]">
              {status === 'opened' ? <CheckCircle2 className="h-8 w-8" /> : <WhatsAppIcon className="h-8 w-8" />}
            </span>
            <h3 className="mt-5 text-2xl font-bold">
              {status === 'opened' ? 'Almost done — tap Send in WhatsApp' : 'Open WhatsApp to send your request'}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-slate-ink">
              {status === 'opened'
                ? 'We have opened WhatsApp with your quote request already written. Your request reaches us only after you press Send inside WhatsApp.'
                : 'Your browser blocked the new window. Use the button below to open WhatsApp — your request reaches us only after you press Send there.'}
            </p>
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-7 bg-[#25D366] text-[#05391b] hover:bg-[#3ee07c]"
              >
                <WhatsAppIcon /> {status === 'opened' ? 'Open WhatsApp again' : 'Open WhatsApp'}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
              <button type="button" onClick={() => setStatus('idle')} className="inline-flex items-center gap-1.5 text-navy-900 hover:text-orange-600">
                <Pencil className="h-4 w-4" aria-hidden="true" /> Edit details
              </button>
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-navy-900 hover:text-orange-600">
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> New request
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Get a free quote"
            className={`grid gap-x-5 ${dense ? 'quote-dense gap-x-4 gap-y-3' : compact ? 'gap-y-4' : 'gap-y-5'} sm:grid-cols-2`}
          >
            <Field id={id('name')} label="Full Name" error={errors.name}>
              <input
                id={id('name')}
                name="name"
                className="field"
                autoComplete="name"
                placeholder="Your full name"
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                onBlur={() => blur('name')}
                aria-invalid={!!errors.name}
                aria-describedby={describedBy('name')}
                aria-required="true"
                maxLength={80}
              />
            </Field>

            <Field id={id('phone')} label="Mobile Number" error={errors.phone}>
              <input
                id={id('phone')}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="field"
                placeholder="10-digit mobile number"
                value={values.phone}
                onChange={(e) => update('phone', e.target.value)}
                onBlur={() => blur('phone')}
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy('phone')}
                aria-required="true"
                maxLength={20}
              />
            </Field>

            <Field id={id('carModel')} label="Car Make & Model" error={errors.carModel} className={dense ? '' : 'sm:col-span-2'}>
              <input
                id={id('carModel')}
                name="carModel"
                className="field"
                placeholder={dense ? 'e.g. Hyundai Creta' : 'e.g. Maruti Swift, Hyundai Creta, Toyota Innova'}
                value={values.carModel}
                onChange={(e) => update('carModel', e.target.value)}
                onBlur={() => blur('carModel')}
                aria-invalid={!!errors.carModel}
                aria-describedby={describedBy('carModel')}
                aria-required="true"
                maxLength={80}
              />
            </Field>

            <Field id={id('service')} label="Service Type" error={errors.service} className={dense ? '' : 'sm:col-span-2'}>
              <select
                id={id('service')}
                name="service"
                className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23101D35%22%20stroke-width=%222%22><path%20d=%22m6%209%206%206%206-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11"
                value={values.service}
                onChange={(e) => update('service', e.target.value)}
                onBlur={() => blur('service')}
                aria-invalid={!!errors.service}
                aria-describedby={describedBy('service')}
                aria-required="true"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICE_NAMES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={id('pickup')} label="Pickup City" error={errors.pickup}>
              <input
                id={id('pickup')}
                name="pickup"
                className="field"
                autoComplete="address-level2"
                placeholder="e.g. Gurugram"
                value={values.pickup}
                onChange={(e) => update('pickup', e.target.value)}
                onBlur={() => blur('pickup')}
                aria-invalid={!!errors.pickup}
                aria-describedby={describedBy('pickup')}
                aria-required="true"
                maxLength={80}
              />
            </Field>

            <Field id={id('destination')} label="Destination City" error={errors.destination}>
              <input
                id={id('destination')}
                name="destination"
                className="field"
                placeholder="e.g. Pune"
                value={values.destination}
                onChange={(e) => update('destination', e.target.value)}
                onBlur={() => blur('destination')}
                aria-invalid={!!errors.destination}
                aria-describedby={describedBy('destination')}
                aria-required="true"
                maxLength={80}
              />
            </Field>

            <Field id={id('date')} label="Pickup Date" error={errors.date} className="sm:col-span-2">
              <input
                id={id('date')}
                name="date"
                type="date"
                min={minDate}
                className="field"
                value={values.date}
                onChange={(e) => update('date', e.target.value)}
                onBlur={() => blur('date')}
                aria-invalid={!!errors.date}
                aria-describedby={describedBy('date')}
                aria-required="true"
              />
            </Field>

            {!dense && (
            <Field
              id={id('notes')}
              label="Additional Details"
              optional
              error={errors.notes}
              hint="Running or non-running car, number of cars, door-to-door pickup, enclosed carrier — anything that helps."
              className="sm:col-span-2"
            >
              <textarea
                id={id('notes')}
                name="notes"
                rows={compact ? 2 : 4}
                className="field resize-y"
                placeholder="Tell us anything we should know about your car or route"
                value={values.notes}
                onChange={(e) => update('notes', e.target.value)}
                onBlur={() => blur('notes')}
                aria-invalid={!!errors.notes}
                aria-describedby={describedBy('notes', true)}
                maxLength={1000}
              />
            </Field>
            )}

            <div className="sm:col-span-2">
              <AnimatePresence>
                {status === 'unconfigured' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="mb-4 overflow-hidden"
                  >
                    <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                      <p>
                        <strong>WhatsApp enquiries are not set up yet.</strong> The business WhatsApp number has not
                        been configured on this website, so your request has not been sent. Please try again later.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {dense ? (
                <p className="mb-3 flex items-center gap-2 text-[0.78rem] leading-snug text-slate-ink">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#1da851]" />
                  <span>Opens WhatsApp with your details — nothing is sent until you tap Send.</span>
                </p>
              ) : (
                <p className="mb-4 flex gap-2.5 rounded-xl bg-mist p-3.5 text-[0.82rem] leading-relaxed text-slate-ink">
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1da851]" />
                  <span>
                    By submitting, you choose to contact JK Car Carrier on WhatsApp. Your details are placed in a
                    WhatsApp message for you to review and send — nothing is sent or stored until you tap Send.
                  </span>
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'preparing'}
                whileHover={status === 'preparing' ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-primary group w-full text-base ${dense ? 'min-h-12' : 'min-h-14'}`}
              >
                {status === 'preparing' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Preparing your WhatsApp message…
                  </>
                ) : (
                  <>
                    <WhatsAppIcon /> Get My Quote on WhatsApp
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}