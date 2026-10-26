import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ServiceName } from '../data/services'

interface QuoteContextValue {
  isOpen: boolean
  preselected: ServiceName | ''
  pickup: string
  /** Opens the quote form popup, optionally with a service and/or pickup city filled in. */
  openQuote: (service?: ServiceName, pickup?: string) => void
  closeQuote: () => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [preselected, setPreselected] = useState<ServiceName | ''>('')
  const [pickup, setPickup] = useState('')

  const openQuote = useCallback((service?: ServiceName, city?: string) => {
    setPreselected(service ?? '')
    setPickup(city ?? '')
    setOpen(true)
  }, [])
  const closeQuote = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, preselected, pickup, openQuote, closeQuote }),
    [isOpen, preselected, pickup, openQuote, closeQuote],
  )
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>')
  return ctx
}
