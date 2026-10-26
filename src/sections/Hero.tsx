import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Home, Route, ShieldCheck } from 'lucide-react'
import { useRef } from 'react'
import { IMAGES } from '../config/images'
import { Link } from 'react-router-dom'
import { QuoteForm } from '../components/quote/QuoteForm'
import { SmartImage } from '../components/ui/SmartImage'
import { EASE, fadeUp, stagger } from '../components/ui/motion'

const HIGHLIGHTS = [
  { icon: Home, label: 'Door-to-Door Pickup & Delivery' },
  { icon: ShieldCheck, label: 'Careful Loading & Securing' },
  { icon: Route, label: 'Intercity Car Transport Across India' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])

  const focusForm = () => {
    const el = document.getElementById('hero-quote')
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    window.setTimeout(() => el?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }), 450)
  }

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pt-28 pb-16 lg:h-[100svh] lg:min-h-[640px] lg:pt-24 lg:pb-8"
    >
      {/* Background photo with slow parallax + gentle ken-burns */}
      <motion.div style={{ y }} className="absolute inset-0 -z-20 will-change-transform">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.12 }}
          animate={{ scale: reduce ? 1.12 : 1.02 }}
          transition={{ duration: 14, ease: 'easeOut' }}
        >
          <SmartImage
            src={IMAGES.hero}
            fallbackSrc={IMAGES.heroFallback}
            alt="Car transporter truck carrying cars along the highway"
            priority
            sizes="100vw"
            className="h-[118%] w-full object-[center_40%]"
          />
        </motion.div>
      </motion.div>

      {/* Overlays for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/40" />
      <div className="bg-dots absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />

      <div className="container-x grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
        <motion.div variants={stagger(0.12, 0.15)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="eyebrow text-orange-400">
            Trusted Car Transport Across India
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-4 text-[2.5rem] leading-[1.05] font-extrabold text-white sm:text-6xl lg:text-[clamp(2.75rem,7vh,4.25rem)]"
          >
            Your Car, Delivered
            <span className="block text-white/90">
              <span className="text-orange-500">With Care.</span>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mt-4">
            Moving to a new city or sending a car across India? JK Car Carrier transports your car on car carrier
            trucks — with careful loading, planned pickup and clear communication from enquiry to delivery.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-6">
            <motion.button
              type="button"
              onClick={focusForm}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary group min-h-14 px-8 text-base lg:hidden"
            >
              Get Free Quote
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </motion.button>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/services" className="btn-ghost-light min-h-14 w-full px-8 text-base">
                Explore Our Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            aria-label="Highlights"
            className="mt-10 grid gap-3 border-t border-white/15 pt-7 sm:grid-cols-3 sm:gap-5 lg:mt-7 lg:pt-5"
          >
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30">
                  <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Quote form card */}
        <motion.div
          id="hero-quote"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
          className="relative scroll-mt-24"
        >
          <div className="absolute -inset-px rounded-[30px] bg-gradient-to-br from-orange-500/60 via-white/10 to-transparent" aria-hidden="true" />
          <div className="relative rounded-[29px] bg-white p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-navy-900">Get a Free Quote</h2>
                <p className="mt-1 text-sm text-slate-ink">Takes about a minute. Sent via WhatsApp.</p>
              </div>
              <span className="hidden rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 sm:inline-block">
                No obligation
              </span>
            </div>
            <QuoteForm compact dense />
          </div>
        </motion.div>
      </div>
    </section>
  )
}