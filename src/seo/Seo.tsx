import { createContext, useContext, useEffect } from 'react'
import { unsplashSrcSet } from '../config/images'
import { BRAND, CONTACT, SITE_URL } from '../config/site'

export interface SeoData {
  title: string
  description: string
  /** Path of this page, e.g. "/services/home-shifting" */
  path: string
  /** Structured data objects (schema.org) */
  jsonLd?: object[]
  noindex?: boolean
  /** Main photo at the top of the page: the browser starts downloading it immediately. */
  preloadImage?: { src: string; sizes?: string }
}

/** During prerendering the server passes a collector; in the browser this is null. */
export interface HeadCollector {
  data: SeoData | null
}
export const HeadContext = createContext<HeadCollector | null>(null)

export const absoluteUrl = (path: string) => (SITE_URL ? SITE_URL.replace(/\/$/, '') + (path === '/' ? '/' : path) : '')

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const jsonForScript = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c')

/** Builds the <head> tags for a page (used by the prerender step). */
export function renderHeadTags(d: SeoData): string {
  const url = absoluteUrl(d.path)
  const tags = [
    `<title>${esc(d.title)}</title>`,
    `<meta name="description" content="${esc(d.description)}" data-seo>`,
    `<meta name="robots" content="${d.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" data-seo>`,
    `<meta property="og:title" content="${esc(d.title)}" data-seo>`,
    `<meta property="og:description" content="${esc(d.description)}" data-seo>`,
    `<meta name="twitter:title" content="${esc(d.title)}" data-seo>`,
    `<meta name="twitter:description" content="${esc(d.description)}" data-seo>`,
  ]
  if (url) {
    tags.push(`<link rel="canonical" href="${esc(url)}" data-seo>`)
    tags.push(`<meta property="og:url" content="${esc(url)}" data-seo>`)
  }
  if (d.preloadImage) {
    const srcset = unsplashSrcSet(d.preloadImage.src)
    tags.push(
      `<link rel="preload" as="image" href="${esc(d.preloadImage.src)}"${
        srcset ? ` imagesrcset="${esc(srcset)}" imagesizes="${esc(d.preloadImage.sizes ?? '100vw')}"` : ''
      } fetchpriority="high" data-seo>`,
    )
  }
  for (const j of d.jsonLd ?? []) tags.push(`<script type="application/ld+json" data-seo>${jsonForScript(j)}</script>`)
  return tags.join('\n    ')
}

/** Keeps <head> in sync when the visitor navigates between pages in the browser. */
function applyToDocument(d: SeoData) {
  document.title = d.title
  document.head.querySelectorAll('[data-seo]').forEach((n) => n.remove())
  const tpl = document.createElement('template')
  tpl.innerHTML = renderHeadTags(d).replace(/<title>.*?<\/title>/, '')
  document.head.append(...Array.from(tpl.content.childNodes).filter((n) => n.nodeType === 1))
}

export function Seo(props: SeoData) {
  const collector = useContext(HeadContext)
  if (collector) collector.data = props
  const key = JSON.stringify(props)
  useEffect(() => {
    applyToDocument(JSON.parse(key) as SeoData)
  }, [key])
  return null
}

/* ---------------- Structured data helpers (schema.org) ---------------- */

export const organizationLd = () => {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: BRAND.name,
    description: BRAND.description,
    areaServed: { '@type': 'Country', name: 'India' },
  }
  if (SITE_URL) org.url = absoluteUrl('/')
  if (CONTACT.phone) org.telephone = CONTACT.phone
  if (CONTACT.email) org.email = CONTACT.email
  if (CONTACT.address) org.address = CONTACT.address
  return org
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    ...(SITE_URL ? { item: absoluteUrl(it.path) } : {}),
  })),
})

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

export const serviceLd = (name: string, description: string, area: { type: 'City' | 'Country'; name: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: name,
  name,
  description,
  provider: { '@type': 'MovingCompany', name: BRAND.name },
  areaServed: { '@type': area.type, name: area.name },
})