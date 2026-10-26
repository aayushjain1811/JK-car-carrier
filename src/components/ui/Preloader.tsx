import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EASE } from './motion'

/** Shortest time the loading screen stays up, so it doesn't just flash (ms). */
const MIN_TIME = 1700
/** Longest time it can stay up, even on a slow connection (ms). */
const MAX_TIME = 3500

/**
 * Full-screen loading screen shown when the website first opens.
 * It hides when the page has finished loading (between MIN_TIME and MAX_TIME).
 * Moving between pages inside the site does not show it again.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    const start = performance.now()
    let hideTimer: number | undefined

    const hide = () => {
      const wait = Math.max(0, MIN_TIME - (performance.now() - start))
      hideTimer = window.setTimeout(() => setVisible(false), wait)
    }

    if (document.readyState === 'complete') hide()
    else window.addEventListener('load', hide, { once: true })
    const safety = window.setTimeout(() => setVisible(false), MAX_TIME)

    return () => {
      window.removeEventListener('load', hide)
      window.clearTimeout(hideTimer)
      window.clearTimeout(safety)
    }
  }, [])

  // Stop the page behind from scrolling while the loading screen is showing.
  useEffect(() => {
    const html = document.documentElement
    html.style.overflow = visible ? 'hidden' : ''
    return () => {
      html.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading JK Car Carrier"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
          className="preloader-failsafe fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy-950"
        >
          <div className="bg-dots absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-3xl" aria-hidden="true" />

          {/* Logo with a soft glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}images/jk-logo.png`}
              alt=""
              width={180}
              height={120}
              className="relative h-28 w-auto object-contain drop-shadow-[0_0_30px_rgb(242_140_40/0.45)] sm:h-32"
              animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            className="relative mt-6 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            JK <span className="text-orange-500">Car Carrier</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="relative mt-2 text-[0.7rem] font-semibold tracking-[0.3em] text-white/55 uppercase"
          >
            Car Transport · India
          </motion.p>

          {/* Road with a truck driving along it, doubling as a progress bar */}
          <div className="relative mt-10 w-64 sm:w-80" aria-hidden="true">
            <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-600 to-orange-400"
                initial={{ width: '0%' }}
                animate={{ width: '92%' }}
                transition={{ duration: MAX_TIME / 1000, ease: [0.1, 0.6, 0.3, 1] }}
              />
            </div>
            <div className="mt-1.5 border-t border-dashed border-white/15" />
            <motion.div
              className="absolute -top-8"
              initial={{ left: '0%' }}
              animate={{ left: '92%' }}
              transition={{ duration: MAX_TIME / 1000, ease: [0.1, 0.6, 0.3, 1] }}
            >
              <span className="-ml-4 flex h-7 w-8 items-center justify-center text-orange-400">
                <Truck className="h-6 w-6" />
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}