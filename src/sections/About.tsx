import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ClipboardList, MessagesSquare, PackageCheck } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../config/images'
import { SmartImage } from '../components/ui/SmartImage'
import { EASE, fadeUp, inView, stagger } from '../components/ui/motion'

const FEATURES = [
  {
    icon: PackageCheck,
    title: 'Careful Loading and Securing',
    text: 'Your car is loaded onto the carrier and secured with attention for the journey.',
  },
  {
    icon: ClipboardList,
    title: 'Planned Pickup and Delivery',
    text: 'Pickup and delivery are planned around your route, your dates and your car.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear Quote Communication',
    text: 'Share your requirements and get a quotation explained clearly before you decide.',
  },
]

export function About({ moreLink = false }: { moreLink?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const insetY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])

  return (
    <section id="about" aria-labelledby="about-title" className="overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image composition */}
        <div ref={ref} className="relative pr-6 pb-10 sm:pr-14 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-lift sm:aspect-[5/5]"
          >
            <SmartImage
              src={IMAGES.about}
              alt="Truck carrying several cars for transport"
              width={1200}
              height={1200}
              sizes="(min-width:1024px) 45vw, 100vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={inView}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
              className="absolute inset-0 origin-bottom bg-navy-900"
            />
          </motion.div>

          <motion.div
            style={{ y: insetY }}
            className="absolute right-0 bottom-0 w-[46%] overflow-hidden rounded-2xl border-[6px] border-white shadow-lift"
          >
            <div className="aspect-[4/3]">
              <SmartImage
                src={IMAGES.aboutInset}
                alt="Flatbed trailer loaded with cars"
                width={800}
                height={600}
                sizes="(min-width:1024px) 22vw, 46vw"
                className="h-full w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            className="absolute top-6 -left-2 rounded-2xl bg-navy-900 px-5 py-4 text-white shadow-lift sm:-left-6"
          >
            <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-orange-400 uppercase">From enquiry</p>
            <p className="font-display text-lg font-bold">to delivery</p>
          </motion.div>
        </div>

        {/* Copy */}
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inView}>
          <motion.p variants={fadeUp} className="eyebrow">
            About Us
          </motion.p>
          <motion.h2
            id="about-title"
            variants={fadeUp}
            className="mt-4 text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem]"
          >
            Your Car Deserves <span className="text-orange-500">Professional Care</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-ink">
            JK Car Carrier helps customers move their cars between cities with careful loading, planned transport
            and clear communication from enquiry to delivery.
          </motion.p>

          <ul className="mt-10 space-y-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group flex gap-5 rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-orange-500/40 hover:shadow-card"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-orange-400 transition-colors group-hover:bg-orange-500 group-hover:text-navy-950">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-ink">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
          {moreLink && (
            <motion.div variants={fadeUp} className="mt-8">
              <Link to="/about" className="group inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-orange-600">
                More about us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
