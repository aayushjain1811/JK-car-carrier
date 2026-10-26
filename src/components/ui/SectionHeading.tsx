import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, inView, stagger } from './motion'

interface Props {
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  id?: string
}

export function SectionHeading({ eyebrow, title, text, align = 'center', tone = 'dark', id }: Props) {
  const centered = align === 'center'
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}
    >
      <motion.p variants={fadeUp} className={`eyebrow ${centered ? 'justify-center' : ''}`}>
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className={`mt-4 text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem] ${
          tone === 'light' ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p
          variants={fadeUp}
          className={`mt-4 text-base leading-relaxed sm:text-lg ${tone === 'light' ? 'text-white/70' : 'text-slate-ink'}`}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}
