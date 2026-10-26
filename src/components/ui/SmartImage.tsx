import { ImageOff } from 'lucide-react'
import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { unsplashSrcSet } from '../../config/images'

interface SmartImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string
  alt: string
  /** Optional second image to try before showing the branded placeholder. */
  fallbackSrc?: string
  /** Hint for the browser about rendered width, e.g. "(min-width:1024px) 33vw, 100vw" */
  sizes?: string
  /** Load straight away (for photos at the top of the page). Shown without a fade. */
  priority?: boolean
}

/**
 * Image with responsive srcset, lazy loading, a soft fade-in and a
 * graceful fallback (second image → branded placeholder) if loading fails.
 * The parent should define the aspect ratio / size to avoid layout shift.
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc,
  sizes = '100vw',
  priority = false,
  className = '',
  ...rest
}: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(priority)

  // The photo may finish downloading before the page's JavaScript starts.
  // In that case the "load" event has already happened, so check it here.
  useEffect(() => {
    const img = ref.current
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [current])

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950 text-white/40 ${className}`}
      >
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      {...rest}
      ref={ref}
      src={current}
      srcSet={unsplashSrcSet(current)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc)
        else setFailed(true)
      }}
      className={`bg-navy-800 object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}