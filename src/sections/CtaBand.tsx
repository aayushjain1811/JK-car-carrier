import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { IMAGES } from '../config/images'
import { useQuote } from '../context/QuoteContext'
import type { ServiceName } from '../data/services'
import { SmartImage } from '../components/ui/SmartImage'
import { EASE, inView } from '../components/ui/motion'

interface CtaBandProps {
  service?: ServiceName
  pickup?: string
  title?: string
}

/** Closing call-to-action shown at the bottom of most pages. */
export function CtaBand({ service, pickup, title }: CtaBandProps) {
  const { openQuote } = useQuote()
  return (
    <section aria-label="Request a quote" className="bg-white pb-4">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative isolate overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <SmartImage
            src={IMAGES.cta}
            alt=""
            aria-hidden="true"
            sizes="(min-width:1280px) 1216px, 100vw"
            className="absolute inset-0 -z-20 h-full w-full"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950/95 via-navy-900/88 to-navy-800/70" />
          <p className="eyebrow justify-center text-orange-400">Ready when you are</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight font-bold text-white sm:text-5xl">
            {title ?? (
              <>
                Need to Move Your Car? <span className="text-orange-500">Let’s Make It Easy.</span>
              </>
            )}
          </h2>
          <motion.button
            type="button"
            onClick={() => openQuote(service, pickup)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary group mt-9 min-h-14 px-8 text-base"
          >
            Request Your Free Quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
