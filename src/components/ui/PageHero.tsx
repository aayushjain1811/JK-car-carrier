import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SmartImage } from './SmartImage'
import { fadeUp, stagger } from './motion'

export interface Crumb {
  name: string
  path: string
}

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  crumbs: Crumb[]
  image?: string
  imageAlt?: string
  children?: ReactNode
}

/** Banner at the top of every inner page: breadcrumbs, the page's <h1> and an optional photo. */
export function PageHero({ eyebrow, title, text, crumbs, image, imageAlt = '', children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
      {image && (
        <SmartImage
          src={image}
          alt={imageAlt}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full opacity-60"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />
      <div className="bg-dots absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="absolute -right-32 -bottom-40 -z-10 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" aria-hidden="true" />

      <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="container-x">
        <motion.nav variants={fadeUp} aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1
              return (
                <li key={c.path} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className="text-white/90">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link to={c.path} className="hover:text-orange-400">
                        {c.name}
                      </Link>
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </motion.nav>
        <motion.p variants={fadeUp} className="eyebrow mt-8 text-orange-400">
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-4 max-w-4xl text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {text}
          </motion.p>
        )}
        {children && <motion.div variants={fadeUp}>{children}</motion.div>}
      </motion.div>
    </section>
  )
}
