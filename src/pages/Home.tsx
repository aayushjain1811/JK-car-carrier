import { FAQS } from '../data/faqs'
import { faqLd, organizationLd, Seo } from '../seo/Seo'
import { About } from '../sections/About'
import { CityFinder } from '../sections/CityFinder'
import { CtaBand } from '../sections/CtaBand'
import { FAQ } from '../sections/FAQ'
import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { Services } from '../sections/Services'
import { Testimonials } from '../sections/Testimonials'
import { WhyChooseUs } from '../sections/WhyChooseUs'

const HOME_FAQS = FAQS.slice(0, 4)

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Car Transport Services in India | Car Carrier — JK Car Carrier"
        description="JK Car Carrier: door-to-door, intercity, enclosed and luxury car transport across India on car carrier trucks. Get a free car transport quote on WhatsApp."
        jsonLd={[organizationLd(), faqLd(HOME_FAQS)]}
      />
      <Hero />
      <Services />
      <About moreLink />
      <WhyChooseUs />
      <HowItWorks />
      <CityFinder />
      <Testimonials />
      <FAQ items={HOME_FAQS} moreLink />
      <div className="pt-24 sm:pt-28">
        <CtaBand />
      </div>
    </>
  )
}
