interface LogoProps {
  /** "light" = white text (on dark backgrounds), "dark" = navy text */
  tone?: 'light' | 'dark'
  className?: string
}

/** Brand mark: the JK logo image (file: public/images/jk-logo.png). */
export function LogoMark({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/jk-logo.png`}
      alt=""
      aria-hidden="true"
      width={60}
      height={40}
      className={`object-contain ${className}`}
    />
  )
}

export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const main = tone === 'light' ? 'text-white' : 'text-navy-900'
  const sub = tone === 'light' ? 'text-white/60' : 'text-slate-ink'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.12rem] font-extrabold tracking-tight ${main}`}>
          JK <span className="text-orange-500">Car Carrier</span>
        </span>
        <span className={`mt-1 text-[0.6rem] font-semibold tracking-[0.24em] uppercase ${sub}`}>
          Car Transport · India
        </span>
      </span>
    </span>
  )
}