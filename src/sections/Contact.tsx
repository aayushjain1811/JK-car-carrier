import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Clock, FileText, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT } from '../config/site'
import { useQuote } from '../context/QuoteContext'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { fadeUp, inView, stagger } from '../components/ui/motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useWhatsAppChat, WHATSAPP_NOT_CONFIGURED_TEXT } from '../components/whatsapp/useWhatsAppChat'

export function Contact() {
  const { openQuote } = useQuote()
  const wa = useWhatsAppChat()

  const details = [
    CONTACT.phone && {
      icon: Phone,
      label: 'Call us',
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`,
    },
    CONTACT.email && { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    CONTACT.address && { icon: MapPin, label: 'Address', value: CONTACT.address },
    CONTACT.hours && { icon: Clock, label: 'Hours', value: CONTACT.hours },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[]

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Get in Touch"
          text="Request a quotation or start a WhatsApp chat with our team."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="flex flex-col rounded-3xl bg-navy-900 p-7 text-white sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-navy-950">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-bold">Request a Quote</h3>
            <p className="mt-2 flex-1 text-white/65">
              Share your car model, cities and pickup date in a short form.
            </p>
            <button type="button" onClick={() => openQuote()} className="btn-primary group mt-7 self-start">
              Get Free Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="relative flex flex-col rounded-3xl bg-mist p-7 ring-1 ring-line sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white">
              <WhatsAppIcon className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-xl font-bold">Chat on WhatsApp</h3>
            <p className="mt-2 flex-1 text-slate-ink">Have a question first? Start a conversation with our team.</p>
            <a
              href={wa.href ?? '#'}
              onClick={wa.onClick}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-7 self-start bg-[#25D366] text-[#05391b] hover:bg-[#3ee07c]"
            >
              <WhatsAppIcon /> Start WhatsApp Chat
            </a>
            <AnimatePresence>
              {wa.notice && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-sm font-medium text-amber-700"
                >
                  {WHATSAPP_NOT_CONFIGURED_TEXT}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {details.length > 0 && (
            <motion.ul
              variants={fadeUp}
              className="grid gap-4 rounded-3xl p-1 sm:grid-cols-2 md:col-span-2"
              aria-label="Contact details"
            >
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4 rounded-2xl border border-line p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-orange-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-wider text-slate-ink uppercase">{label}</span>
                    {href ? (
                      <a href={href} className="mt-0.5 block font-semibold break-words text-navy-900 hover:text-orange-600">
                        {value}
                      </a>
                    ) : (
                      <span className="mt-0.5 block font-semibold break-words text-navy-900">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>

    </section>
  )
}
