import { IMAGES } from '../config/images'
import { FAQS } from '../data/faqs'
import { SERVICES } from '../data/services'
import { PageHero } from '../components/ui/PageHero'
import { breadcrumbLd, faqLd, organizationLd, Seo } from '../seo/Seo'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { CtaBand } from '../sections/CtaBand'
import { FAQ } from '../sections/FAQ'
import { HowItWorks } from '../sections/HowItWorks'
import { QuoteSection } from '../sections/QuoteSection'
import { Services } from '../sections/Services'
import { WhyChooseUs } from '../sections/WhyChooseUs'

const HOME = { name: 'Home', path: '/' }

export function AboutPage() {
  const crumbs = [HOME, { name: 'About Us', path: '/about' }]
  return (
    <>
      <Seo
        path="/about"
        title="About Us | JK Car Carrier"
        description="Learn how JK Car Carrier moves cars between cities across India with careful loading, planned pickup and delivery, and clear communication."
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="About Us"
        title="Car transport, handled with care"
        text="Careful loading, planned transport and clear communication — from your first enquiry to delivery day."
        image={IMAGES.aboutInset}
      />
      <About />
      <WhyChooseUs />
      <HowItWorks />
      <CtaBand />
    </>
  )
}

export function ServicesPage() {
  const crumbs = [HOME, { name: 'Services', path: '/services' }]
  return (
    <>
      <Seo
        path="/services"
        title="Car Transport Services — Door-to-Door, Intercity, Enclosed & Luxury | JK Car Carrier"
        description={`Explore all JK Car Carrier services: ${SERVICES.map((s) => s.name).join(', ')}. Request a free quote on WhatsApp.`}
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Our Services"
        title={
          <>
            Car Transport <span className="text-orange-500">Services</span>
          </>
        }
        text="Car transport options for every kind of journey — choose a service to learn more or request a quote."
        image={IMAGES.hero}
      />
      <Services headingLevel="none" />
      <HowItWorks />
      <CtaBand />
    </>
  )
}

export function WhyChooseUsPage() {
  const crumbs = [HOME, { name: 'Why Choose Us', path: '/why-choose-us' }]
  return (
    <>
      <Seo
        path="/why-choose-us"
        title="Why Choose JK Car Carrier"
        description="Car-focused service, careful handling of your car, a clear quotation process and routes across India. See why customers enquire with JK Car Carrier."
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Why Choose Us"
        title="Car transport made simpler"
        text="A practical, well-organised approach to moving your car — so you don’t have to drive it across the country."
        image={IMAGES.about}
      />
      <WhyChooseUs />
      <HowItWorks />
      <CtaBand />
    </>
  )
}

export function QuotePage() {
  const crumbs = [HOME, { name: 'Get a Quote', path: '/get-quote' }]
  return (
    <>
      <Seo
        path="/get-quote"
        title="Get a Free Car Transport Quote | JK Car Carrier"
        description="Request a free car transport quotation: door-to-door, intercity, enclosed, luxury or multiple-car transport. Fill in your car and route details and send them on WhatsApp."
        jsonLd={[breadcrumbLd(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Free Quotation"
        title="Get your free car transport quote"
        text="Share your car and route details and send them to our team on WhatsApp."
      />
      <QuoteSection />
    </>
  )
}

export function FaqPage() {
  const crumbs = [HOME, { name: 'FAQ', path: '/faq' }]
  return (
    <>
      <Seo
        path="/faq"
        title="Car Transport FAQ | JK Car Carrier"
        description="Answers about car transport quotations, interstate car transport, preparing your car for pickup, non-running cars and how to contact JK Car Carrier."
        jsonLd={[faqLd(FAQS), breadcrumbLd(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="FAQ" title="Questions, answered" text="Everything you need to know about transporting your car with us." />
      <FAQ bg="white" />
      <CtaBand />
    </>
  )
}

export function ContactPage() {
  const crumbs = [HOME, { name: 'Contact', path: '/contact' }]
  return (
    <>
      <Seo
        path="/contact"
        title="Contact JK Car Carrier | Request a Quote or Chat on WhatsApp"
        description="Contact JK Car Carrier to request a car transport quotation or start a WhatsApp chat about moving your car."
        jsonLd={[organizationLd(), breadcrumbLd(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="Contact" title="Let’s plan your car’s journey" text="Request a quotation or start a WhatsApp chat with our team." />
      <Contact />
      <CtaBand />
    </>
  )
}
