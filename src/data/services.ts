import { Briefcase, Building2, Container, Gem, Home, Route, type LucideIcon } from 'lucide-react'
import { IMAGES } from '../config/images'

export const SERVICE_NAMES = [
  'Door-to-Door Car Transport',
  'Intercity Car Transport',
  'Enclosed Car Transport',
  'Luxury Car Transport',
  'Multiple Car & Dealer Transport',
  'Car Relocation for Job Transfers',
] as const

export type ServiceName = (typeof SERVICE_NAMES)[number]

export interface Service {
  id: string
  name: ServiceName
  description: string
  image: string
  alt: string
  icon: LucideIcon
}

export const SERVICES: Service[] = [
  {
    id: 'door-to-door-car-transport',
    name: 'Door-to-Door Car Transport',
    description:
      'Your car is picked up from your address and delivered to your destination address, subject to road access and service availability.',
    image: IMAGES.services.doorToDoor,
    alt: 'Car being loaded onto a flatbed carrier truck for transport',
    icon: Home,
  },
  {
    id: 'intercity-car-transport',
    name: 'Intercity Car Transport',
    description:
      'Car transport between cities and states across India on car carrier trucks, planned around your route and dates.',
    image: IMAGES.services.intercity,
    alt: 'Car carrier truck transporting vehicles on the road',
    icon: Route,
  },
  {
    id: 'enclosed-car-transport',
    name: 'Enclosed Car Transport',
    description:
      'Transport in a covered, enclosed carrier for extra protection from dust and weather, subject to availability on your route.',
    image: IMAGES.services.enclosed,
    alt: 'Luxury car secured inside an enclosed transport truck',
    icon: Container,
  },
  {
    id: 'luxury-car-transport',
    name: 'Luxury Car Transport',
    description:
      'Extra care in loading, securing and handling for premium, sports and high-value cars. Share your car details when you enquire.',
    image: IMAGES.services.luxury,
    alt: 'Black luxury sports car parked on the road',
    icon: Gem,
  },
  {
    id: 'multiple-car-dealer-transport',
    name: 'Multiple Car & Dealer Transport',
    description:
      'Moving several cars at once for dealers, businesses and families. Tell us how many cars and the route to get a quotation.',
    image: IMAGES.services.fleet,
    alt: 'Car transporter loaded with several cars outside a dealership',
    icon: Building2,
  },
  {
    id: 'car-relocation-job-transfer',
    name: 'Car Relocation for Job Transfers',
    description:
      'Moving to a new city for work? We help move your car so you don’t have to drive it the whole way yourself.',
    image: IMAGES.services.relocation,
    alt: 'Two cars loaded onto a car carrier truck',
    icon: Briefcase,
  },
]
