import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { CITIES } from './data/cities'
import { SERVICES } from './data/services'
export { SITE_URL } from './config/site'
import { HeadContext, renderHeadTags, type HeadCollector } from './seo/Seo'

/** Every URL that gets its own pre-rendered HTML file. */
export const ROUTES: string[] = [
  '/',
  '/about',
  '/services',
  ...SERVICES.map((s) => `/services/${s.id}`),
  '/why-choose-us',
  '/locations',
  ...CITIES.map((c) => `/car-transport/${c.slug}`),
  '/get-quote',
  '/faq',
  '/contact',
  '/privacy-policy',
  '/terms',
]

export function render(url: string) {
  const head: HeadCollector = { data: null }
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={head}>
        <StaticRouter basename={import.meta.env.BASE_URL} location={import.meta.env.BASE_URL.replace(/\/$/, '') + url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  )
  return { html, head: head.data ? renderHeadTags(head.data) : '' }
}
