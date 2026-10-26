/**
 * ============================================================
 *  JK CAR CARRIER — BUSINESS CONFIGURATION
 *  Everything business-specific lives in this one file.
 *  Leave a value as an empty string ("") to hide it on the site.
 * ============================================================
 */

/**
 * WhatsApp business number.
 * International format, DIGITS ONLY — no "+", spaces or dashes.
 * Example for an Indian number +91 98765 43210  →  "919876543210"
 *
 * Until this is replaced, the quote form and WhatsApp buttons will
 * NOT open WhatsApp; they show a "not configured yet" notice instead.
 */
export const WHATSAPP_NUMBER = '919992007500'

/** Contact details shown in the Contact section and footer. Empty = hidden. */
export const CONTACT = {
  /** Display format, e.g. "+91 98765 43210" */
  phone: '+91 99920 07500',
  email: '',
  address: 'Shop no 6, Bhardwaj Complex, near pareena laxmi apartment, Sector 99A, Gurugram, Haryana 122505',
  /** Optional business hours text, e.g. "Mon–Sat, 9:00 AM – 7:00 PM" */
  hours: '',
}


/**
 * Verified customer testimonials ONLY (with the customer's permission).
 * While this list is empty, the testimonials section is not shown.
 */
export interface Testimonial {
  quote: string
  name: string
  /** e.g. "Car transport, Delhi to Pune" */
  context?: string
}
export const TESTIMONIALS: Testimonial[] = []

/**
 * Your live website address, WITHOUT a trailing slash — e.g. 'https://www.yourdomain.com'.
 * Needed for SEO: canonical links, sitemap.xml and robots.txt are only generated once this is set.
 */
export const SITE_URL: string = ''

export const BRAND = {
  name: 'JK Car Carrier',
  short: 'JK Car Carrier',
  tagline: 'Your trusted car transport partner',
  description:
    'JK Car Carrier helps customers move their cars between cities with careful loading, planned transport and clear communication from enquiry to delivery.',
}