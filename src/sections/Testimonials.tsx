import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState } from 'react'
import { TESTIMONIALS } from '../config/site'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EASE } from '../components/ui/motion'

/**
 * Renders ONLY when verified testimonials are added in src/config/site.ts.
 * With an empty list the section is omitted entirely, so nothing unverified is ever shown.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const total = TESTIMONIALS.length
  if (total === 0) return null

  const go = (step: number) => {
    setDir(step)
    setIndex((i) => (i + step + total) % total)
  }
  const t = TESTIMONIALS[index]

  return (
    <section aria-labelledby="testimonials-title" className="bg-mist py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading id="testimonials-title" eyebrow="Customer Feedback" title="What Our Customers Say" />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative min-h-[18rem] overflow-hidden rounded-[28px] bg-white p-8 shadow-lift ring-1 ring-line sm:p-12">
            <Quote className="h-10 w-10 text-orange-500/30" aria-hidden="true" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: EASE }}
                aria-live="polite"
              >
                <blockquote className="mt-4 font-display text-xl leading-relaxed font-medium text-navy-900 sm:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block font-bold">{t.name}</span>
                  {t.context && <span className="text-sm text-slate-ink">{t.context}</span>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-line hover:text-orange-600">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-semibold text-slate-ink">
                {index + 1} / {total}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-line hover:text-orange-600">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
