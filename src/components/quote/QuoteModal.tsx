import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useQuote } from '../../context/QuoteContext'
import { EASE } from '../ui/motion'
import { QuoteForm } from './QuoteForm'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function QuoteModal() {
  const { isOpen, preselected, pickup, closeQuote } = useQuote()
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    lastFocused.current = document.activeElement as HTMLElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus the first field (or the service-dependent next field) once the panel is in.
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('input,select,textarea')?.focus({ preventScroll: true })
    }, 80)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuote()
      if (e.key === 'Tab' && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      lastFocused.current?.focus?.({ preventScroll: true })
    }
  }, [isOpen, closeQuote])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={closeQuote} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-lift sm:rounded-[28px]"
          >
            <div className="relative shrink-0 overflow-hidden bg-navy-900 px-6 pt-7 pb-6 text-white sm:px-9">
              <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-orange-500/25 blur-2xl" aria-hidden="true" />
              <div className="relative pr-10">
                <p className="eyebrow text-orange-400">Free quotation</p>
                <h2 id="quote-modal-title" className="mt-2 text-2xl font-bold sm:text-[1.7rem]">
                  Tell us about your car
                </h2>
                <p className="mt-1.5 text-sm text-white/70">
                  Fill in a few details and send them to us on WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={closeQuote}
                aria-label="Close quote form"
                className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-9 sm:py-8">
              <QuoteForm preselected={preselected} defaultPickup={pickup} compact />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
