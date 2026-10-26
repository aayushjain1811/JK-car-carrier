import { SERVICE_NAMES } from '../data/services'
import type { QuoteDetails } from './whatsapp'

export type QuoteErrors = Partial<Record<keyof QuoteDetails, string>>

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export const todayISO = (): string => {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/**
 * Accepts Indian mobile numbers (10 digits starting 6–9, with optional +91 / 91 / 0 prefix)
 * or any international number written with a leading "+" (8–15 digits).
 */
export const isValidPhone = (raw: string): boolean => {
  const cleaned = raw.replace(/[\s\-().]/g, '')
  if (/^(?:\+?91|0)?[6-9]\d{9}$/.test(cleaned)) return true
  return /^\+\d{8,15}$/.test(cleaned)
}

export const validateQuote = (q: QuoteDetails): QuoteErrors => {
  const e: QuoteErrors = {}
  const name = q.name.trim()
  if (!name) e.name = 'Please enter your full name.'
  else if (name.length < 2) e.name = 'Name looks too short.'
  else if (name.length > 80) e.name = 'Please keep the name under 80 characters.'

  if (!q.phone.trim()) e.phone = 'Please enter your mobile number.'
  else if (!isValidPhone(q.phone))
    e.phone = 'Enter a valid 10-digit mobile number, or an international number starting with +.'

  if (!q.carModel.trim()) e.carModel = 'Please enter your car make and model.'
  else if (q.carModel.trim().length > 80) e.carModel = 'Please keep this under 80 characters.'

  if (!q.service) e.service = 'Please choose a service.'
  else if (!(SERVICE_NAMES as readonly string[]).includes(q.service))
    e.service = 'Please choose a service from the list.'

  if (!q.pickup.trim()) e.pickup = 'Please enter the pickup city.'
  if (!q.destination.trim()) e.destination = 'Please enter the destination city.'

  if (!q.date) e.date = 'Please choose your pickup date.'
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(q.date)) e.date = 'Please choose a valid date.'
  else if (q.date < todayISO()) e.date = 'The pickup date cannot be in the past.'

  if (q.notes.length > 1000) e.notes = 'Please keep this under 1000 characters.'
  return e
}
