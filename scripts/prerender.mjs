/**
 * Turns every route into its own static HTML file (dist/<route>/index.html),
 * then writes sitemap.xml, robots.txt and 404.html.
 * Run automatically by `npm run build`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverEntry = path.join(root, 'dist-server', 'entry-server.js')

const { render, ROUTES, SITE_URL } = await import(pathToFileURL(serverEntry).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const toFile = (route) => (route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html'))

const page = (route) => {
  const { html, head } = render(route)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

let count = 0
for (const route of ROUTES) {
  const file = toFile(route)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(route))
  count++
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404-not-found'))

const base = (SITE_URL || '').replace(/\/$/, '')
if (base) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = ROUTES.map((r) => {
    const priority = r === '/' ? '1.0' : r.startsWith('/services') || r === '/get-quote' ? '0.9' : r.startsWith('/car-transport/') ? '0.8' : '0.6'
    return `  <url><loc>${base}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`
  })
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  )
  fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
} else {
  fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n')
  console.warn(
    '\n⚠  SITE_URL is empty in src/config/site.ts — sitemap.xml and canonical URLs were skipped.\n   Set your live domain (e.g. "https://www.yourdomain.com") and rebuild before launch.\n',
  )
}

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true })
console.log(`✓ Pre-rendered ${count} pages + 404.html into dist/`)
