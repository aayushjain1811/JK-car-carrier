import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { QuoteModal } from './components/quote/QuoteModal'
import { Preloader } from './components/ui/Preloader'
import { WhatsAppFloat } from './components/whatsapp/WhatsAppFloat'
import { QuoteProvider } from './context/QuoteContext'
import { isWhatsAppConfigured } from './lib/whatsapp'
import Home from './pages/Home'
import { AboutPage, ContactPage, FaqPage, QuotePage, ServicesPage, WhyChooseUsPage } from './pages/InfoPages'
import { PrivacyPolicy, Terms } from './pages/LegalPage'
import { CityPage, LocationsPage } from './pages/LocationPages'
import NotFound from './pages/NotFound'
import ServiceDetailPage from './pages/ServiceDetailPage'

/** Scrolls to #hash after route changes (e.g. "/#services" from the Privacy page), otherwise to top. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      }, 60)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

if (import.meta.env.DEV && typeof window !== 'undefined' && !isWhatsAppConfigured()) {
  console.info(
    '[JK Car Carrier] WHATSAPP_NUMBER is not configured yet. Set it in src/config/site.ts to enable WhatsApp enquiries.',
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <QuoteProvider>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-orange-500 px-5 py-3 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Preloader />
        <ScrollManager />
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/car-transport/:city" element={<CityPage />} />
            <Route path="/get-quote" element={<QuotePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <QuoteModal />
        <WhatsAppFloat />
      </QuoteProvider>
    </MotionConfig>
  )
}