import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useQuote } from '../../context/QuoteContext'
import { NAV_LINKS } from '../../data/nav'
import { SERVICES } from '../../data/services'
import { Logo } from '../ui/Logo'
import { EASE } from '../ui/motion'

function ServicesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const show = () => {
    window.clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    timer.current = window.setTimeout(() => setOpen(false), 120)
  }

  return (
    <li className="relative" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <NavLink
        to="/services"
        aria-haspopup="true"
        aria-expanded={open}
        className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
          active ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
      >
        Services
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        {active && (
          <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-orange-500" />
        )}
      </NavLink>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3"
          >
            <ul className="grid grid-cols-2 gap-1 rounded-2xl bg-white p-2 shadow-lift ring-1 ring-line">
              {SERVICES.map((s) => {
                const Icon = s.icon
                return (
                  <li key={s.id}>
                    <Link to={`/services/${s.id}`} className="group flex items-center gap-3 rounded-xl p-3 hover:bg-mist">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-orange-400 transition-colors group-hover:bg-orange-500 group-hover:text-navy-950">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-navy-900">{s.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { openQuote } = useQuote()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Transparent over the photo at the top of each page, solid once scrolled.
  const solid = scrolled || open
  const isActive = (to: string) => (to === '/' ? isHome : pathname === to || pathname.startsWith(`${to}/`) || (to === '/locations' && pathname.startsWith('/car-transport/')))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? 'bg-navy-900/90 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link to="/" aria-label="JK Car Carrier — home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((l) =>
            l.to === '/services' ? (
              <ServicesMenu key={l.to} active={isActive(l.to)} />
            ) : (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={isActive(l.to) ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
                    isActive(l.to) ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-orange-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => openQuote()}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary group hidden min-h-11 px-5 text-sm sm:inline-flex"
          >
            Get Free Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </motion.button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white xl:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-white/10 xl:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } }}
              className="container-x flex max-h-[calc(100dvh-4.5rem)] flex-col gap-1 overflow-y-auto py-5"
            >
              {NAV_LINKS.map((l) => (
                <motion.li key={l.to} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.to) ? 'page' : undefined}
                    className={`flex min-h-12 items-center rounded-xl px-4 font-display text-lg font-semibold transition-colors ${
                      isActive(l.to) ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </Link>
                  {l.to === '/services' && (
                    <ul className="mt-1 mb-2 grid grid-cols-2 gap-1 pl-4">
                      {SERVICES.map((s) => (
                        <li key={s.id}>
                          <Link
                            to={`/services/${s.id}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-white/65 hover:bg-white/5 hover:text-white"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    openQuote()
                  }}
                  className="btn-primary w-full"
                >
                  Get Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
