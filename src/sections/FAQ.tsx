import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EASE, fadeUp, inView, stagger } from '../components/ui/motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FAQS, type Faq } from '../data/faqs'


function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${
        open ? 'border-orange-500/40 shadow-card' : 'border-line'
      }`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold text-navy-900 sm:px-7 sm:text-lg"
        >
          {q}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
              open ? 'bg-orange-500 text-navy-950' : 'bg-mist text-navy-900'
            }`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 text-[0.97rem] leading-relaxed text-slate-ink sm:px-7">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface FAQProps {
  items?: Faq[]
  title?: string
  text?: string
  /** Show a "See all questions" link (used on the home page) */
  moreLink?: boolean
  bg?: 'mist' | 'white'
}

export function FAQ({
  items = FAQS,
  title = 'Questions, Answered',
  text = 'Everything you need to know about requesting a quote and transporting your car with us.',
  moreLink = false,
  bg = 'mist',
}: FAQProps) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" aria-labelledby="faq-title" className={`${bg === 'mist' ? 'bg-mist' : 'bg-white'} py-24 sm:py-28 lg:py-32`}>
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="FAQ"
            title={title}
            text={text}
          />
          {moreLink && (
            <Link to="/faq" className="group mt-6 inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-orange-600">
              See all questions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          )}
        </div>
        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="space-y-3"
        >
          {items.map((f, i) => (
            <Item key={f.q} {...f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}