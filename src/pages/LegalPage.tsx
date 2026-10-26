import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BRAND } from '../config/site'
import { Seo } from '../seo/Seo'
import { EASE } from '../components/ui/motion'

interface LegalPageProps {
  title: string
  path: string
  description: string
  children: ReactNode
}

export function LegalPage({ title, path, description, children }: LegalPageProps) {
  return (
    <>
      <Seo path={path} title={`${title} | ${BRAND.name}`} description={description} />
      <div className="bg-navy-900 pt-36 pb-16 text-white">
        <div className="container-x">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-4xl font-bold sm:text-5xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>
      <article className="container-x max-w-3xl py-16 text-[1.02rem] leading-relaxed text-slate-ink [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy-900 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </article>
    </>
  )
}

const ReviewNote = () => (
  <p className="!mt-0 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
    This is a general starting template. The business owner should review and adapt it (ideally with a legal
    adviser) before the website goes live.
  </p>
)

export function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" description="How JK Car Carrier handles the information you share through the quote form and WhatsApp.">
      <ReviewNote />
      <h2>Information you share</h2>
      <p>
        When you use the quote form on this website, the details you enter — your name, mobile number, chosen
        car make and model, chosen service, pickup and destination cities, pickup date and any additional details — are placed into a
        WhatsApp message on your own device.
      </p>
      <h2>How the quote form works</h2>
      <ul>
        <li>This website does not store your form details on its own servers.</li>
        <li>
          Your information is only shared with {BRAND.name} if you choose to press Send in WhatsApp. You can review or
          edit the message before sending it.
        </li>
        <li>Messages sent through WhatsApp are also subject to WhatsApp’s own terms and privacy policy.</li>
      </ul>
      <h2>How we use your information</h2>
      <p>
        Information you send us is used to respond to your enquiry, prepare a quotation and help plan your
        car transport.
      </p>
      <h2>Third-party content</h2>
      <p>
        This website loads fonts and photographs from third-party providers, which may receive standard technical
        information such as your IP address when your browser requests them.
      </p>
      <h2>Contact</h2>
      <p>For privacy questions, please contact us using the details on our Contact section.</p>
    </LegalPage>
  )
}

export function Terms() {
  return (
    <LegalPage title="Terms and Conditions" path="/terms" description="Terms for using the JK Car Carrier website and requesting quotations.">
      <ReviewNote />
      <h2>Use of this website</h2>
      <p>
        This website provides general information about the car transport services offered by {BRAND.name} and a way to
        send enquiries.
      </p>
      <h2>Quotations</h2>
      <ul>
        <li>Submitting the quote form is an enquiry only and does not create a booking or contract.</li>
        <li>Quotations are provided by our team after reviewing your requirements.</li>
        <li>
          Service availability depends on the route, destination regulations and other factors, and will be confirmed
          when you enquire.
        </li>
      </ul>
      <h2>Service terms</h2>
      <p>
        Specific terms for any confirmed car transport — including scope, pricing, schedule and responsibilities — will be
        shared with you before the booking is confirmed.
      </p>
      <h2>Changes</h2>
      <p>These terms may be updated from time to time. Please check this page for the current version.</p>
    </LegalPage>
  )
}
