import { motion } from 'framer-motion'
import { CalendarCheck, ClipboardEdit, FileCheck2, Truck } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EASE } from '../components/ui/motion'

const STEPS = [
  {
    icon: ClipboardEdit,
    title: 'Share Your Car & Route',
    text: 'Tell us your car model, pickup and destination cities, preferred date and any special requirements.',
  },
  {
    icon: FileCheck2,
    title: 'Receive Your Quotation',
    text: 'Our team reviews your details and gets back to you with a quotation for your car transport.',
  },
  {
    icon: CalendarCheck,
    title: 'Pickup & Loading',
    text: 'Once you confirm, your car is picked up, its condition is noted, and it is loaded onto the carrier.',
  },
  {
    icon: Truck,
    title: 'Delivery at Destination',
    text: 'Your car is transported and handed over at the destination as planned.',
  },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading
          id="how-title"
          eyebrow="How It Works"
          title={
            <>
              Four Simple Steps to <span className="text-orange-500">Move Your Car</span>
            </>
          }
          text="A straightforward process from your first enquiry to delivery day."
        />

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-16 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8"
        >
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <li aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 left-7 w-0.5 bg-line lg:top-7 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-0.5 lg:w-auto">
            <motion.div
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 1.4, ease: EASE } } }}
              className="h-full w-full origin-top bg-gradient-to-b from-orange-500 to-orange-400 lg:origin-left lg:bg-gradient-to-r"
            />
          </li>

          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.25, duration: 0.6, ease: EASE } },
              }}
              className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              <div className="relative z-10 shrink-0">
                <motion.span
                  variants={{
                    hidden: { scale: 0.5 },
                    show: { scale: 1, transition: { delay: 0.25 + i * 0.25, type: 'spring', stiffness: 300, damping: 18 } },
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-orange-400 shadow-lift ring-4 ring-white"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </motion.span>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 font-display text-xs font-bold text-navy-950 ring-2 ring-white">
                  {i + 1}
                </span>
              </div>
              <div className="pt-1 lg:mt-7 lg:pt-0">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-ink lg:mx-auto lg:max-w-[16rem]">
                  {text}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
