import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BRAND, CONTACT } from '../../config/site'
import { SERVICES } from '../../data/services'
import { POPULAR_CITIES } from '../../data/cities'
import { useQuote } from '../../context/QuoteContext'
import { Logo } from '../ui/Logo'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { useWhatsAppChat, WHATSAPP_NOT_CONFIGURED_TEXT } from '../whatsapp/useWhatsAppChat'
import { NAV_LINKS } from '../../data/nav'

export function Footer() {
  const { openQuote } = useQuote()
  const wa = useWhatsAppChat()
  const year = new Date().getFullYear()

  const linkCls = 'text-[0.95rem] text-white/65 transition-colors hover:text-orange-400'

  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-950 text-white">
      <div className="bg-dots absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:py-20">
        <div>
          <Link to="/" aria-label="JK Car Carrier — home">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/60">
            Car transport across India with careful loading and clear communication — from enquiry to delivery.
          </p>
          <a
            href={wa.href ?? '#'}
            onClick={wa.onClick}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366]/12 px-4 py-2.5 text-sm font-semibold text-[#4ee88a] ring-1 ring-[#25D366]/30 transition-colors hover:bg-[#25D366]/20"
          >
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
          {wa.notice && (
            <p role="status" className="mt-2 max-w-xs text-xs text-amber-300">
              {WHATSAPP_NOT_CONFIGURED_TEXT}
            </p>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold tracking-[0.18em] text-white uppercase">Company</h2>
          <ul className="mt-5 space-y-3">
            {[...NAV_LINKS, { to: '/faq', label: 'FAQ' }, { to: '/get-quote', label: 'Get a Quote' }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.18em] text-white uppercase">Services</h2>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to={`/services/${s.id}`} className={linkCls}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-[0.18em] text-white uppercase">Contact</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem] text-white/65">
            {CONTACT.phone && (
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="hover:text-orange-400">
                  {CONTACT.phone}
                </a>
              </li>
            )}
            {CONTACT.email && (
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-orange-400">
                  {CONTACT.email}
                </a>
              </li>
            )}
            {CONTACT.address && (
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                <span>{CONTACT.address}</span>
              </li>
            )}
            <li>
              <button type="button" onClick={() => openQuote()} className="btn-primary mt-1 min-h-11 px-5 text-sm">
                Get Free Quote
              </button>
            </li>
          </ul>
        </div>
      </div>

      <nav aria-label="Popular cities" className="container-x relative border-t border-white/10 py-8">
        <h2 className="font-display text-sm font-semibold tracking-[0.18em] text-white uppercase">Car transport in</h2>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {POPULAR_CITIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/car-transport/${c.slug}`} className="text-sm text-white/55 hover:text-orange-400">
                {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/locations" className="text-sm font-semibold text-orange-400 hover:text-orange-300">
              All cities →
            </Link>
          </li>
        </ul>
      </nav>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 pb-24 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-orange-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-orange-400">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
