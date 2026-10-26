import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EASE } from '../components/ui/motion'
import { Seo } from '../seo/Seo'

export default function NotFound() {
  return (
    <>
    <Seo noindex path="/404" title="Page not found | JK Car Carrier" description="The page you are looking for could not be found." />
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy-900 pt-24 text-white">
      <div className="bg-dots absolute inset-0" aria-hidden="true" />
      <div className="container-x relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-[7rem] leading-none font-extrabold text-orange-500 sm:text-[10rem]"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="mt-4 text-3xl font-bold sm:text-4xl"
        >
          This page took a wrong turn.
        </motion.h1>
        <p className="mx-auto mt-4 max-w-md text-white/65">
          The page you are looking for could not be found. Let’s get you back on the right route.
        </p>
        <Link to="/" className="btn-primary mt-9">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Home
        </Link>
      </div>
    </section>
    </>
  )
}
