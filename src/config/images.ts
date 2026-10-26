/**
 * All photography in one place so it is easy to swap remote images
 * for local, optimised files later (e.g. put files in /public/images
 * and change a value to '/images/hero.webp').
 *
 * Current images are free photos from Unsplash (Unsplash License).
 */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=60`

export const unsplashSrcSet = (url: string) => {
  if (!url.includes('images.unsplash.com')) return undefined
  return [360, 640, 960, 1280, 1920]
    .map((w) => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`)
    .join(', ')
}

export const IMAGES = {
  /** Car transporter truck on the highway */
  hero: unsplash('photo-1742940796395-b2a614941353', 1920),
  heroFallback: unsplash('photo-1761917904658-2a9ecb84a169', 1920),
  /** Truck carrying several cars */
  about: unsplash('photo-1720014432727-3ec661c27568', 1200),
  /** Flatbed trailer with cars */
  aboutInset: unsplash('photo-1682980799090-c4c6342be01a', 800),
  /** Rows of new cars */
  cta: unsplash('photo-1770319942638-a5989632f2ad', 1920),
  services: {
    doorToDoor: unsplash('photo-1686966933735-305bd8fe0a77'),
    intercity: unsplash('photo-1761917904658-2a9ecb84a169'),
    enclosed: unsplash('photo-1784617450978-9c3996f72c6e'),
    luxury: unsplash('photo-1587350811576-c917499a375a'),
    fleet: unsplash('photo-1742940796376-8f34cb25be44'),
    relocation: unsplash('photo-1761993600321-757e086491c0'),
  },
}