import { motion } from 'framer-motion'
import { CalendarDays, ClipboardCheck, MapPin, Send } from 'lucide-react'
import { QuoteForm } from '../components/quote/QuoteForm'
import { EASE, fadeUp, inView, stagger } from '../components/ui/motion'

const POINTS = [
  { icon: ClipboardCheck, text: 'Add your car model and choose a service' },
  { icon: MapPin, text: 'Add your pickup and destination cities' },
  { icon: CalendarDays, text: 'Pick your preferred pickup date' },
  { icon: Send, text: 'Review the WhatsApp message and tap Send' },
]

export function QuoteSection() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="relative overflow-hidden bg-mist py-24 sm:py-28 lg:py-32">
      <div className="bg-dots-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" aria-hidden="true" />
      <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inView} className="lg:pt-6">
          <motion.p variants={fadeUp} className="eyebrow">
            Get a Free Quote
          </motion.p>
          <motion.h2
            id="quote-title"
            variants={fadeUp}
            className="mt-4 text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem]"
          >
            Request Your Car Transport <span className="text-orange-500">Quotation</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-ink">
            Share your car and route details and send them to our team on WhatsApp. We will review your requirements and
            get back to you with a quotation.
          </motion.p>
          <motion.ol variants={stagger(0.08)} className="mt-9 space-y-3">
            {POINTS.map(({ icon: Icon, text }, i) => (
              <motion.li key={text} variants={fadeUp} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-card ring-1 ring-line">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-medium text-navy-900">
                  <span className="sr-only">Step {i + 1}: </span>
                  {text}
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-[28px] bg-white p-6 shadow-lift ring-1 ring-line sm:p-9"
        >
          <QuoteForm />
        </motion.div>
      </div>
    </section>
  )
}