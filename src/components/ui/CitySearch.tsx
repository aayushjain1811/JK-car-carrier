import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Search } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CITIES } from '../../data/cities'

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Type-ahead search that jumps to a city's page. */
export function CitySearch({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const id = useId()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const n = norm(q)
    if (!n) return []
    return CITIES.filter((c) => norm(c.name).includes(n) || (c.alias && norm(c.alias).includes(n)) || norm(c.state).startsWith(n))
      .sort((a, b) => Number(!norm(a.name).startsWith(n)) - Number(!norm(b.name).startsWith(n)))
      .slice(0, 8)
  }, [q])

  const go = (slug: string) => {
    setQ('')
    navigate(`/car-transport/${slug}`)
  }

  const dark = tone === 'dark'
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Search your city
      </label>
      <div className="relative">
        <Search className={`pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 ${dark ? 'text-white/50' : 'text-slate-ink'}`} aria-hidden="true" />
        <input
          id={id}
          type="search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Search your city — e.g. Pune, Lucknow, Kochi"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setActive(0)
          }}
          onKeyDown={(e) => {
            if (!results.length) return
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => (a + 1) % results.length)
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => (a - 1 + results.length) % results.length)
            } else if (e.key === 'Enter') {
              e.preventDefault()
              go(results[active].slug)
            } else if (e.key === 'Escape') setQ('')
          }}
          className={`min-h-14 w-full rounded-2xl pr-4 pl-12 text-base transition-[border-color,box-shadow] focus:ring-4 focus:outline-none ${
            dark
              ? 'border border-white/15 bg-white/5 text-white placeholder:text-white/45 focus:border-orange-500 focus:ring-orange-500/20'
              : 'border border-line bg-white text-navy-900 shadow-card placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/15'
          }`}
        />
      </div>
      <AnimatePresence>
        {q && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 max-h-80 overflow-auto rounded-2xl bg-white p-2 shadow-lift ring-1 ring-line"
          >
            {results.length ? (
              results.map((c, i) => (
                <li key={c.slug} role="option" aria-selected={i === active}>
                  <Link
                    to={`/car-transport/${c.slug}`}
                    onClick={() => setQ('')}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${i === active ? 'bg-mist' : ''}`}
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                    <span className="font-semibold text-navy-900">{c.name}</span>
                    <span className="truncate text-sm text-slate-ink">{c.alias ? `${c.alias} · ` : ''}{c.state}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-3 py-3 text-sm text-slate-ink">
                No city page yet for “{q}”. You can still{' '}
                <Link to="/get-quote" className="font-semibold text-orange-600 underline">
                  request a quote
                </Link>{' '}
                with your location.
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
