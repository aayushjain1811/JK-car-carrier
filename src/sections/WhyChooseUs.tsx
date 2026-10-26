import { motion } from 'framer-motion'
import { Car, FileText, HandHeart, Layers, MousePointerClick, Route } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { fadeUp, stagger } from '../components/ui/motion'

const REASONS = [
  {
    icon: Car,
    title: 'Focused Only on Cars',
    text: 'Car transport is all we do — from hatchbacks and SUVs to premium and vintage cars.',
  },
  {
    icon: HandHeart,
    title: 'Careful Handling of Your Car',
    text: 'Attention during loading, securing on the carrier and unloading at the destination.',
  },
  {
    icon: FileText,
    title: 'Clear Quotation Process',
    text: 'Tell us your requirements and receive a quotation you can review before confirming.',
  },
  {
    icon: Layers,
    title: 'Options for Different Needs',
    text: 'Door-to-door, enclosed, luxury, multiple-car and job-transfer car transport.',
  },
  {
    icon: MousePointerClick,
    title: 'Convenient Enquiry Process',
    text: 'Send your car and route details in a minute through our quote form or a quick WhatsApp chat.',
  },
  {
    icon: Route,
    title: 'Routes Across India',
    text: 'Enquire about car transport between cities and states, subject to route availability.',
  },
]

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28 lg:py-32"
    >
      <div className="bg-dots absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-orange-500/15 blur-3xl"
      />
      <div className="container-x relative">
        <SectionHeading
          id="why-title"
          tone="light"
          eyebrow="Why Choose Us"
          title={
            <>
              Car Transport Made <span className="text-orange-500">Simpler</span>
            </>
          }
          text="A practical, well-organised approach to moving your car — so you don’t have to drive it across the country."
        />

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {REASONS.map(({ icon: Icon, title, text }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="group relative bg-navy-900 p-7 transition-colors duration-300 hover:bg-navy-800 sm:p-9"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 group-hover:scale-x-100" />
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-orange-400 ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
