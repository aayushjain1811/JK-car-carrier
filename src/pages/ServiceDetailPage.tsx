import { motion } from 'framer-motion'
import { ArrowRight, Check, ClipboardList } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { POPULAR_CITIES } from '../data/cities'
import { SERVICE_DETAILS } from '../data/serviceDetails'
import { SERVICES } from '../data/services'
import { QuoteForm } from '../components/quote/QuoteForm'
import { PageHero } from '../components/ui/PageHero'
import { SmartImage } from '../components/ui/SmartImage'
import { fadeUp, inView, stagger } from '../components/ui/motion'
import { breadcrumbLd, faqLd, serviceLd, Seo } from '../seo/Seo'
import { CtaBand } from '../sections/CtaBand'
import { FAQ } from '../sections/FAQ'
import { HowItWorks } from '../sections/HowItWorks'
import NotFound from './NotFound'

export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = SERVICES.find((s) => s.id === slug)
  if (!service) return <NotFound />
  const d = SERVICE_DETAILS[service.id]
  const Icon = service.icon
  const path = `/services/${service.id}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path },
  ]
  const others = SERVICES.filter((s) => s.id !== service.id)

  return (
    <>
      <Seo
        path={path}
        title={`${d.seoTitle} | JK Car Carrier`}
        description={d.seoDescription}
        jsonLd={[
          serviceLd(service.name, service.description, { type: 'Country', name: 'India' }),
          breadcrumbLd(crumbs),
          faqLd(d.faqs),
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow="Our Services" title={service.name} text={service.description} image={service.image} imageAlt={service.alt} />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView}>
            <motion.div variants={fadeUp} className="relative aspect-[16/9] overflow-hidden rounded-[28px] shadow-lift">
              <SmartImage src={service.image} alt={service.alt} width={1200} height={675} sizes="(min-width:1024px) 55vw, 100vw" className="h-full w-full" />
              <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-navy-950 shadow-glow">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="mt-12 text-3xl font-bold">
              About our {service.name.toLowerCase()} service
            </motion.h2>
            {d.intro.map((p) => (
              <motion.p key={p} variants={fadeUp} className="mt-4 text-lg leading-relaxed text-slate-ink">
                {p}
              </motion.p>
            ))}

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <motion.div variants={fadeUp} className="rounded-3xl border border-line p-7">
                <h3 className="text-lg font-bold">What we can help with</h3>
                <ul className="mt-4 space-y-3">
                  {d.helpWith.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.95rem] text-slate-ink">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp} className="rounded-3xl bg-mist p-7">
                <h3 className="text-lg font-bold">Details to share for your quote</h3>
                <ul className="mt-4 space-y-3">
                  {d.shareDetails.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.95rem] text-slate-ink">
                      <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="mt-12">
              <h2 className="text-2xl font-bold">{service.name} from popular cities</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {POPULAR_CITIES.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/car-transport/${c.slug}`} className="inline-block rounded-full bg-mist px-3.5 py-1.5 text-sm font-medium text-navy-900 ring-1 ring-line hover:bg-orange-500 hover:ring-orange-500">
                      {service.name} in {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/locations" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-orange-600">
                See all cities <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] bg-white p-6 shadow-lift ring-1 ring-line sm:p-8">
              <h2 className="text-xl font-bold">Get a {service.name} quote</h2>
              <p className="mt-1 mb-6 text-sm text-slate-ink">Your service is already selected.</p>
              <QuoteForm preselected={service.name} compact />
            </div>
            <nav aria-label="Other services" className="mt-6 rounded-[28px] bg-navy-900 p-6 text-white">
              <h2 className="text-sm font-semibold tracking-[0.18em] text-white/60 uppercase">Other services</h2>
              <ul className="mt-4 space-y-1">
                {others.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services/${s.id}`} className="group flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white/5">
                      {s.name}
                      <ArrowRight className="h-4 w-4 text-orange-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <HowItWorks />
      <FAQ items={d.faqs} title={`${service.name} FAQ`} text={`Common questions about our ${service.name.toLowerCase()} service.`} />
      <div className="pt-24">
        <CtaBand service={service.name} />
      </div>
    </>
  )
}