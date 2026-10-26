import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CITIES, POPULAR_CITIES, STATES } from '../data/cities'
import { CitySearch } from '../components/ui/CitySearch'
import { SectionHeading } from '../components/ui/SectionHeading'
import { fadeUp, inView, stagger } from '../components/ui/motion'

/** Home page block: find your city + popular city links (good for SEO internal linking). */
export function CityFinder() {
  return (
    <section aria-labelledby="cities-title" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <div className="relative rounded-[32px] bg-navy-900 p-7 sm:p-12 lg:p-16">
          <div className="absolute inset-0 overflow-hidden rounded-[32px]" aria-hidden="true">
            <div className="bg-dots absolute inset-0 opacity-70" />
            <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                id="cities-title"
                align="left"
                tone="light"
                eyebrow="Across India"
                title="Car Transport Wherever You’re Headed"
                text="Tell us your pickup and destination cities to enquire about car transport availability on your route."
              />
              <dl className="mt-8 flex gap-8">
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-white/50 uppercase">City pages</dt>
                  <dd className="font-display text-3xl font-bold text-white">{CITIES.length}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-white/50 uppercase">States &amp; UTs</dt>
                  <dd className="font-display text-3xl font-bold text-white">{STATES.length}</dd>
                </div>
              </dl>
            </div>
            <div>
              <CitySearch tone="dark" />
              <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">Popular cities</p>
              <motion.ul
                variants={stagger(0.03)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="mt-4 flex flex-wrap gap-2"
              >
                {POPULAR_CITIES.map((c) => (
                  <motion.li key={c.slug} variants={fadeUp}>
                    <Link
                      to={`/car-transport/${c.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-2 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-orange-500 hover:text-navy-950 hover:ring-orange-500"
                    >
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {c.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <Link to="/locations" className="btn-primary group mt-8">
                View all {CITIES.length} cities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
