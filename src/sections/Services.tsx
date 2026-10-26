import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES, type Service } from '../data/services'
import { useQuote } from '../context/QuoteContext'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SmartImage } from '../components/ui/SmartImage'
import { fadeUp, stagger } from '../components/ui/motion'
import { Link } from 'react-router-dom'
import { ServiceRoute } from './ServiceRoute'

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { openQuote } = useQuote()
  const Icon = service.icon
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl shadow-card ring-1 ring-line transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <SmartImage
          src={service.image}
          alt={service.alt}
          width={1200}
          height={825}
          sizes="(min-width:1024px) 33vw, 50vw"
          className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 font-display text-[0.65rem] font-bold sm:top-4 sm:left-4 sm:px-3 sm:py-1 sm:text-xs text-navy-900 backdrop-blur">
          0{index + 1}
        </span>
        <span className="absolute bottom-2.5 left-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-navy-950 shadow-glow sm:bottom-4 sm:left-4 sm:h-11 sm:w-11 sm:rounded-xl">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-7">
        <h3 className="text-[0.92rem] leading-snug font-bold text-navy-900 sm:text-xl">
          <Link to={`/services/${service.id}`} className="relative z-10 hover:text-orange-600">
            {service.name}
          </Link>
        </h3>
        <p className="mt-1.5 mb-auto line-clamp-3 text-xs leading-relaxed text-slate-ink sm:mt-2.5 sm:line-clamp-none sm:text-[0.95rem]">{service.description}</p>
        <button
          type="button"
          onClick={() => openQuote(service.name)}
          className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full text-xs font-semibold sm:mt-6 sm:gap-2 sm:text-[0.95rem] text-navy-900 after:absolute after:inset-0 after:content-[''] hover:text-orange-600"
          aria-label={`Get a quote for ${service.name}`}
        >
          Get a Quote
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mist ring-1 ring-line transition-all sm:h-8 sm:w-8 duration-300 group-hover:translate-x-1 group-hover:bg-orange-500 group-hover:ring-orange-500">
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45 sm:h-4 sm:w-4"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </motion.article>
  )
}

export function Services({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'none' }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-mist py-24 sm:py-28 lg:py-32">
      <div className="bg-dots-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />
      <div className="container-x relative">
        {headingLevel === 'h2' && (
          <SectionHeading
            id="services-title"
            eyebrow="Our Services"
            title={
              <>
                Car Transport <span className="text-orange-500">Solutions</span>
              </>
            }
            text="Car transport services for every kind of journey — from a single hatchback to a fleet of cars."
          />
        )}

        <div className={headingLevel === 'h2' ? 'mt-14' : ''}>
          <ServiceRoute />
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}