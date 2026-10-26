import { BRAND, WHATSAPP_NUMBER } from '../config/site'

/** True only when WHATSAPP_NUMBER is a real, digits-only international number. */
export const isWhatsAppConfigured = (): boolean => /^\d{8,15}$/.test(WHATSAPP_NUMBER)

/** Builds a wa.me click-to-chat URL with a URL-encoded message. */
export const buildWhatsAppUrl = (message: string): string | null => {
  if (!isWhatsAppConfigured()) return null
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const GREETING_MESSAGE = `Hello ${BRAND.name}, I would like to enquire about transporting my car.`

export interface QuoteDetails {
  name: string
  phone: string
  carModel: string
  service: string
  pickup: string
  destination: string
  date: string // YYYY-MM-DD
  notes: string
}

export const formatMovingDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const buildQuoteMessage = (q: QuoteDetails): string =>
  [
    `New Car Transport Quote Request — ${BRAND.name}`,
    '',
    `Customer Name: ${q.name.trim()}`,
    `Mobile Number: ${q.phone.trim()}`,
    `Car Make & Model: ${q.carModel.trim()}`,
    `Service Required: ${q.service}`,
    `Pickup City: ${q.pickup.trim()}`,
    `Destination City: ${q.destination.trim()}`,
    `Pickup Date: ${formatMovingDate(q.date)}`,
    `Additional Details: ${q.notes.trim() || 'None mentioned'}`,
    '',
    'Please contact the customer regarding their car transport quotation.',
  ].join('\n')

const isMobileDevice = () =>
  typeof navigator !== 'undefined' &&
  /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(navigator.userAgent)

/**
 * Opens WhatsApp. Must be called directly inside a click/submit handler
 * so browsers treat it as a user action (avoids popup blocking).
 * Returns false if a desktop popup was blocked — callers should then
 * show a visible link the user can tap themselves.
 */
export const openWhatsApp = (url: string): boolean => {
  if (isMobileDevice()) {
    // Same-tab navigation is the most reliable way to trigger the app deep link on phones.
    window.location.href = url
    return true
  }
  const win = window.open(url, '_blank')
  if (!win) return false
  try {
    win.opener = null
  } catch {
    /* ignore */
  }
  return true
}
