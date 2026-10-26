# JK Car Carrier — Website

React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide icons + React Router.
Every page is **pre-rendered to its own HTML file** at build time, so Google can read each page without running JavaScript.

## Run it on your laptop

```bash
npm install        # first time only
npm run dev        # open http://localhost:5173
```

## Build for the live website

```bash
npm run build      # creates the dist/ folder (254 HTML pages + sitemap + robots.txt)
npm run preview    # optional: check the built site
```

Upload the **dist/** folder to any static host (Netlify, Vercel, Cloudflare Pages, Hostinger, etc.).
Unknown URLs show `dist/404.html`.

## ⚠️ Before launch — edit `src/config/site.ts`

| Setting | What to put | Why |
|---|---|---|
| `WHATSAPP_NUMBER` | Digits only with country code, e.g. `'919876543210'` | Quote form + WhatsApp buttons. Until set, they show a "not set up yet" notice. |
| `SITE_URL` | Your live domain, e.g. `'https://www.yourdomain.com'` (no trailing `/`) | **SEO** — canonical links, `sitemap.xml` and the sitemap line in `robots.txt` are only created when this is set. |
| `CONTACT` | Phone, email, address, hours | Shown on Contact page/footer. Empty = hidden. |
| `TESTIMONIALS` | Real, verified reviews only | Section hidden while empty. |

Rebuild (`npm run build`) after changing these.

## Pages

| URL | Page |
|---|---|
| `/` | Home — hero with car transport quote form, service route, about, why us, process, city finder, FAQ |
| `/about`, `/why-choose-us`, `/contact`, `/faq`, `/get-quote` | Info pages |
| `/services` | All services |
| `/services/door-to-door-car-transport` (+5 more) | One page per car transport service |
| `/locations` | All 238 cities grouped by the 36 states & UTs, with search |
| `/car-transport/<city>` | One car transport page per city, e.g. `/car-transport/pune` |
| `/privacy-policy`, `/terms` | Template legal pages — review before launch |

## SEO features

- Unique `<title>`, meta description, Open Graph tags per page
- Canonical URL per page (once `SITE_URL` is set)
- Structured data (JSON-LD): company, Service, BreadcrumbList, FAQPage
- `sitemap.xml` with all pages, `robots.txt`
- One `<h1>` per page, breadcrumbs, lots of internal links (services ↔ cities ↔ states)
- After launch: add the site to **Google Search Console** and submit `https://yourdomain/sitemap.xml`

## Add or edit cities

Open `src/data/cities.ts` and add a city name under its state. Its page, sitemap entry and links are created on the next build.

## Project structure

```
src/
  config/site.ts         ← business settings (WhatsApp, domain, contact, testimonials)
  config/images.ts       ← all photo URLs in one place
  data/                  ← services, service page text, cities, FAQ, nav
  seo/Seo.tsx            ← page titles/meta + structured data
  lib/                   ← WhatsApp message builder, form validation
  components/            ← header, footer, quote form/modal, WhatsApp button, UI pieces
  sections/              ← Hero, ServiceRoute, Services, About, WhyChooseUs, HowItWorks, CityFinder, FAQ, Contact, CtaBand…
  pages/                 ← Home, InfoPages, ServiceDetailPage, LocationPages, Legal, 404
  entry-server.tsx       ← list of all routes for pre-rendering
scripts/prerender.mjs    ← writes the HTML pages, sitemap.xml, robots.txt, 404.html
```

## How the quote form works

The form checks the details, then opens WhatsApp with a pre-written message to your number.
The customer must tap **Send** in WhatsApp — nothing is stored or sent automatically.
Automatic sending would need a backend + the official WhatsApp Business Platform API.

Photos: free images from Unsplash (Unsplash License). Swap them in `src/config/images.ts`.
