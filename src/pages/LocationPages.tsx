import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, Navigation } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { IMAGES } from '../config/images'
import { CITIES, citiesInState, findCity, POPULAR_CITIES, STATES, type City } from '../data/cities'
import { SERVICES } from '../data/services'
import { useQuote } from '../context/QuoteContext'
import { CitySearch } from '../components/ui/CitySearch'
import { QuoteForm } from '../components/quote/QuoteForm'
import { PageHero } from '../components/ui/PageHero'
import { fadeUp, inView, stagger } from '../components/ui/motion'
import { breadcrumbLd, faqLd, serviceLd, Seo } from '../seo/Seo'
import { CtaBand } from '../sections/CtaBand'
import { FAQ } from '../sections/FAQ'
import NotFound from './NotFound'

const stateId = (s: string) => `state-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

/* ============================ /locations ============================ */

export function LocationsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
  ]
  return (
    <>
      <Seo
        path="/locations"
        title={`Car Transport Across India — ${CITIES.length} Cities | JK Car Carrier`}
        description={`Car transport pages for ${CITIES.length} cities across all ${STATES.length} states and union territories of India. Enquire with JK Car Carrier about moving your car from your city.`}
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Locations"
        title="Car transport across India"
        text={`Pages for ${CITIES.length} cities in all ${STATES.length} states and union territories. Find your city and enquire about car transport availability for your route.`}
        image={IMAGES.aboutInset}
      >
        <div className="mt-8 max-w-xl">
          <CitySearch tone="dark" />
        </div>
      </PageHero>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-x">
          <nav aria-label="Jump to state" className="flex flex-wrap gap-2">
            {STATES.map((s) => (
              <a key={s} href={`#${stateId(s)}`} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-line hover:bg-orange-500 hover:ring-orange-500">
                {s}
              </a>
            ))}
          </nav>

          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {STATES.map((s) => (
              <section
                key={s}
                id={stateId(s)}
                aria-labelledby={`${stateId(s)}-h`}
                className="mb-6 scroll-mt-28 break-inside-avoid rounded-3xl bg-white p-6 shadow-card ring-1 ring-line"
              >
                <h2 id={`${stateId(s)}-h`} className="flex items-center gap-2 text-lg font-bold">
                  <MapPin className="h-4 w-4 text-orange-500" aria-hidden="true" />
                  {s}
                </h2>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  {citiesInState(s).map((c) => (
                    <li key={c.slug}>
                      <Link to={`/car-transport/${c.slug}`} className="text-[0.92rem] text-slate-ink hover:text-orange-600">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-ink">
            Don’t see your city? You can still{' '}
            <Link to="/get-quote" className="font-semibold text-orange-600 underline">
              request a quote
            </Link>{' '}
            with your pickup and destination.
          </p>
        </div>
      </section>
      <div className="pt-20">
        <CtaBand />
      </div>
    </>
  )
}

/* ===================== /car-transport/:city ===================== */

const cityFaqs = (c: City) => [
  {
    q: `How do I get a car transport quote in ${c.name}?`,
    a: `Fill in the quote form on this page — your pickup city is already set to ${c.name}. Add your car model, destination, service and pickup date, then send the pre-filled WhatsApp message. Our team will review it and share a quotation.`,
  },
  {
    q: `Can I send my car from ${c.name} to another city or state?`,
    a: `Yes, you can enquire for intercity car transport from ${c.name}. Enter your destination in the quote form and we will confirm availability for that route.`,
  },
  {
    q: `Is door-to-door car pickup available in ${c.name}?`,
    a: `You can ask for door-to-door pickup in ${c.name}. Where a carrier truck can't reach your street, we agree a convenient nearby point with you.`,
  },
  {
    q: `What details should I share to send my car from ${c.name}?`,
    a: `Share your car make and model, destination city, preferred pickup date and whether the car is in running condition. This helps us prepare a more accurate quotation.`,
  },
  {
    q: `Can I move my car to another city in ${c.state}?`,
    a: `Yes, you can enquire for car transport from ${c.name} to other cities in ${c.state}. Tell us both cities in your quote request.`,
  },
]

function CityServiceCard({ city, i }: { city: City; i: number }) {
  const s = SERVICES[i]
  const { openQuote } = useQuote()
  const Icon = s.icon
  return (
    <motion.li variants={fadeUp} className="group flex flex-col rounded-2xl border border-line bg-white p-3.5 transition sm:rounded-3xl sm:p-6-[border-color,box-shadow] duration-300 hover:border-orange-500/40 hover:shadow-card">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-orange-400 transition-colors group-hover:bg-orange-500 group-hover:text-navy-950 sm:h-11 sm:w-11 sm:rounded-xl">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-3 text-[0.9rem] leading-snug font-bold sm:mt-4 sm:text-lg">
        <Link to={`/services/${s.id}`} className="hover:text-orange-600">
          {s.name} in {city.name}
        </Link>
      </h3>
      <p className="mt-1.5 mb-auto line-clamp-3 text-xs leading-relaxed text-slate-ink sm:mt-2 sm:line-clamp-none sm:text-[0.93rem]">{s.description}</p>
      <button
        type="button"
        onClick={() => openQuote(s.name, city.name)}
        className="mt-3 inline-flex items-center gap-1.5 self-start text-xs font-semibold sm:mt-5 sm:text-sm text-navy-900 hover:text-orange-600"
      >
        Get a quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.li>
  )
}

export function CityPage() {
  const { city: slug = '' } = useParams()
  const city = findCity(slug)
  if (!city) return <NotFound />

  const path = `/car-transport/${city.slug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name: city.name, path },
  ]
  const faqs = cityFaqs(city)
  const sameState = citiesInState(city.state).filter((c) => c.slug !== city.slug)
  const routes = POPULAR_CITIES.filter((c) => c.slug !== city.slug).slice(0, 12)
  const aka = city.alias ? ` (${city.alias})` : ''

  return (
    <>
      <Seo
        path={path}
        title={`Car Transport in ${city.name}${aka}, ${city.state} | Car Carrier — JK Car Carrier`}
        description={`Need car transport in ${city.name}? JK Car Carrier moves cars from ${city.name}, ${city.state} to cities across India — door-to-door, intercity, enclosed and luxury car transport. Free quote on WhatsApp.`}
        jsonLd={[
          serviceLd(`Car Transport in ${city.name}`, `Car carrier transport enquiries for ${city.name}, ${city.state}.`, {
            type: 'City',
            name: `${city.name}, ${city.state}`,
          }),
          breadcrumbLd(crumbs),
          faqLd(faqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${city.state} · India`}
        title={
          <>
            Car Transport in <span className="text-orange-500">{city.name}</span>
          </>
        }
        text={`Sending your car from or to ${city.name}${aka}? Enquire with JK Car Carrier for door-to-door, intercity, enclosed and luxury car transport — and get your quotation on WhatsApp.`}
        image={IMAGES.hero}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView}>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold">
                Car transport services in {city.name}
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-slate-ink">
                Whether you are moving your car from {city.name} to another city in {city.state} or anywhere else in
                India, tell us about your car and route and our team will plan the transport with you. Service
                availability for each route is confirmed when you enquire.
              </motion.p>
              <motion.ul variants={stagger(0.06)} className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                {SERVICES.map((s, i) => (
                  <CityServiceCard key={s.id} city={city} i={i} />
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={inView} className="mt-16">
              <motion.h2 variants={fadeUp} className="text-2xl font-bold">
                Car transport from {city.name} to other cities
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-slate-ink">
                Popular intercity routes customers enquire about. Select a city to see its page.
              </motion.p>
              <motion.ul variants={stagger(0.03)} className="mt-6 grid gap-2 sm:grid-cols-2">
                {routes.map((c) => (
                  <motion.li key={c.slug} variants={fadeUp}>
                    <Link
                      to={`/car-transport/${c.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-2xl bg-mist px-4 py-3 text-[0.95rem] font-medium text-navy-900 ring-1 ring-line hover:ring-orange-500/50"
                    >
                      <span className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-orange-500" aria-hidden="true" />
                        {city.name} to {c.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-ink transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {sameState.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold">More cities in {city.state}</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {sameState.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/car-transport/${c.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-navy-900 hover:border-orange-500 hover:text-orange-600"
                      >
                        <MapPin className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
                        Car transport in {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-16 rounded-3xl bg-navy-900 p-7 text-white sm:p-9">
              <h2 className="text-2xl font-bold">How to send your car from {city.name}</h2>
              <ol className="mt-6 grid gap-5 sm:grid-cols-2">
                {[
                  ['Share your car & route', `Pickup is set to ${city.name} — add your car model, destination and date.`],
                  ['Receive your quotation', 'Our team reviews your details and gets back to you.'],
                  ['Pickup & loading', 'Confirm the plan and your car is picked up and loaded onto the carrier.'],
                  ['Delivery at destination', 'Your car is transported and handed over as planned.'],
                ].map(([t, x], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 font-display text-sm font-bold text-navy-950">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{t}</span>
                      <span className="mt-1 block text-sm text-white/65">{x}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] bg-white p-6 shadow-lift ring-1 ring-line sm:p-8">
              <h2 className="text-xl font-bold">Get a car transport quote from {city.name}</h2>
              <p className="mt-1 mb-6 text-sm text-slate-ink">Pickup city is filled in — change it if needed.</p>
              <QuoteForm defaultPickup={city.name} compact />
            </div>
          </aside>
        </div>
      </section>

      <FAQ items={faqs} title={`Car transport from ${city.name}: FAQ`} text={`Common questions about sending a car from ${city.name}, ${city.state}.`} />
      <div className="pt-24">
        <CtaBand pickup={city.name} title={`Sending your car from ${city.name}? Let’s make it easy.`} />
      </div>
    </>
  )
}