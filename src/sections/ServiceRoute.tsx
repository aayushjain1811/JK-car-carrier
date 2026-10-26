import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SERVICE_DETAILS } from '../data/serviceDetails'
import { SERVICES, type Service } from '../data/services'
import { EASE, inView } from '../components/ui/motion'

/**
 * "Service route" — the six services drawn as stops along a moving route,
 * with a truck travelling the line. Horizontal on desktop, vertical on phones.
 */

function StopCard({ s, i, place }: { s: Service; i: number; place: 'top' | 'bottom' | 'side' }) {
  const Icon = s.icon
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: place === 'top' ? -18 : 18 },
        show: { opacity: 1, y: 0, transition: { delay: 0.35 + i * 0.12, duration: 0.6, ease: EASE } },
      }}
    >
      <Link
        to={`/services/${s.id}`}
        className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm sm:p-4 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-white/[0.08]"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/25 sm:h-11 sm:w-11 transition-colors group-hover:bg-orange-500 group-hover:text-navy-950">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xs font-bold text-white/30">0{i + 1}</span>
        </div>
        <h3 className="mt-2.5 text-[0.85rem] leading-snug font-bold text-white sm:mt-3 sm:text-[0.98rem]">{s.name}</h3>
        <p className="mt-1 text-[0.7rem] leading-snug text-white/55 sm:text-xs">{SERVICE_DETAILS[s.id].tagline}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-orange-400 sm:mt-3 sm:text-xs">
          Explore
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  )
}

function Stop({ i }: { i: number }) {
  return (
    <motion.span
      variants={{
        hidden: { scale: 0 },
        show: { scale: 1, transition: { delay: 0.25 + i * 0.12, type: 'spring', stiffness: 320, damping: 18 } },
      }}
      className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-navy-950 ring-2 ring-orange-500"
      aria-hidden="true"
    >
      <span className="h-2 w-2 rounded-full bg-orange-500" />
    </motion.span>
  )
}

export function ServiceRoute() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative overflow-hidden rounded-[32px] bg-navy-900 px-5 py-10 sm:px-10 lg:px-12 lg:py-14"
    >
      <div className="bg-dots absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-10">
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-orange-400 uppercase">Our service route</p>
          <p className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">One carrier. Every kind of car move.</p>
        </div>
        <Link to="/services" className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline">
          View all services
        </Link>
      </div>

      {/* Desktop: horizontal route with stops above and below the line */}
      <div className="relative hidden lg:block">
        <div className="grid grid-cols-6 gap-4">
          {SERVICES.map((s, i) => (
            <div key={s.id} className="flex flex-col items-stretch">
              <div className="flex h-48 flex-col justify-end pb-4">
                {i % 2 === 0 && <StopCard s={s} i={i} place="top" />}
              </div>
              <div className="relative flex h-6 items-center justify-center">
                <span className="absolute left-1/2 h-4 w-px -translate-x-1/2 bg-orange-500/40" style={{ top: i % 2 === 0 ? '-0.9rem' : 'auto', bottom: i % 2 === 1 ? '-0.9rem' : 'auto' }} aria-hidden="true" />
                <Stop i={i} />
              </div>
              <div className="flex h-48 flex-col justify-start pt-4">
                {i % 2 === 1 && <StopCard s={s} i={i} place="bottom" />}
              </div>
            </div>
          ))}
        </div>

        {/* the road */}
        <div className="pointer-events-none absolute inset-x-0 top-[calc(12rem+0.75rem)] h-0" aria-hidden="true">
          <div className="absolute inset-x-0 -translate-y-1/2 border-t-2 border-dashed border-white/15" />
          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: EASE } } }}
            className="absolute inset-x-0 h-0.5 origin-left -translate-y-1/2 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0"
          />
          {!reduce && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-[130%]"
              initial={{ left: '0%' }}
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 1.6 }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-navy-950 shadow-glow">
                <Truck className="h-5 w-5" />
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Phones & tablets: a road down the middle, two columns of stops, and a truck driving down it */}
      <div className="relative lg:hidden">
        <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-0 -translate-x-1/2" aria-hidden="true">
          <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-dashed border-white/15" />
          <motion.div
            variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.6, ease: EASE } } }}
            className="absolute inset-y-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0"
          />
          {!reduce && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 1.6 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-navy-950 shadow-glow">
                <Truck className="h-4 w-4 rotate-90" />
              </span>
            </motion.div>
          )}
        </div>

        <ul className="relative grid grid-cols-2 gap-x-8 gap-y-5 pb-16 sm:gap-x-12">
          {SERVICES.map((s, i) => {
            const left = i % 2 === 0
            return (
              <li key={s.id} className={`relative ${left ? '' : 'translate-y-16'}`}>
                <span
                  className={`absolute top-6 z-10 ${left ? '-right-[1.625rem] sm:-right-[2.125rem]' : '-left-[1.625rem] sm:-left-[2.125rem]'}`}
                  aria-hidden="true"
                >
                  <Stop i={i} />
                </span>
                <span
                  className={`absolute top-[2.15rem] h-px w-4 bg-orange-500/40 sm:w-6 ${left ? '-right-4 sm:-right-6' : '-left-4 sm:-left-6'}`}
                  aria-hidden="true"
                />
                <StopCard s={s} i={i} place="side" />
              </li>
            )
          })}
        </ul>
      </div>
    </motion.div>
  )
}