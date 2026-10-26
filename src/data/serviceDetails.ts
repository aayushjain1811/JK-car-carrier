/**
 * Longer content for each service page (/services/<id>).
 * Written to be accurate and general — no prices, delivery-time guarantees,
 * insurance promises or tracking claims the business has not confirmed.
 */
export interface ServiceDetail {
  /** Short line used on the route-map and link cards */
  tagline: string
  seoTitle: string
  seoDescription: string
  intro: string[]
  helpWith: string[]
  shareDetails: string[]
  faqs: { q: string; a: string }[]
}

const COMMON_SHARE = [
  'Car make, model and variant',
  'Pickup and destination cities',
  'Whether the car is in running condition',
  'Your preferred pickup date',
]

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'door-to-door-car-transport': {
    tagline: 'Pickup & drop at your address',
    seoTitle: 'Door-to-Door Car Transport Services in India',
    seoDescription:
      'Door-to-door car transport: pickup from your address and delivery at your destination, subject to road access. Get a free car transport quote from JK Car Carrier on WhatsApp.',
    intro: [
      'With door-to-door car transport, you don’t have to drive your car to a depot or collect it from one. We plan pickup from your address and delivery at your destination address.',
      'Some streets can’t take a large carrier truck. In that case, we agree on the nearest convenient point with you before the move.',
    ],
    helpWith: [
      'Pickup from your home or office address',
      'Loading and securing your car on the carrier',
      'Transport to your destination city',
      'Delivery at your destination address or an agreed nearby point',
    ],
    shareDetails: [...COMMON_SHARE, 'Pickup and delivery addresses or areas'],
    faqs: [
      {
        q: 'Will the truck come to my exact address?',
        a: 'Wherever road access allows, yes. If your street is too narrow for a carrier truck, we agree a convenient nearby point for pickup or delivery.',
      },
      {
        q: 'Do I need to be present at pickup and delivery?',
        a: 'You or someone you nominate should be there to hand over and receive the car and check its condition. Let us know who will be present when you book.',
      },
    ],
  },
  'intercity-car-transport': {
    tagline: 'City to city, state to state',
    seoTitle: 'Intercity Car Transport — Car Carrier Services Across India',
    seoDescription:
      'Intercity car transport across India on car carrier trucks. Share your route and car details to get a free quote from JK Car Carrier on WhatsApp.',
    intro: [
      'Need to move your car to another city or state? Our intercity car transport service moves cars between cities on car carrier trucks, so you avoid a long drive, fuel costs and wear on your car.',
      'Tell us your route, car model and dates, and we will confirm availability and share a quotation.',
    ],
    helpWith: [
      'Car transport between cities and states across India',
      'Loading and securing your car on a car carrier truck',
      'Planning pickup and delivery around your dates',
      'Updates on your car’s pickup and delivery plan',
    ],
    shareDetails: COMMON_SHARE,
    faqs: [
      {
        q: 'Which routes do you cover?',
        a: 'You can enquire for routes between cities across India. Share your pickup and destination cities and we will confirm availability for that route.',
      },
      {
        q: 'How long does intercity car transport take?',
        a: 'It depends on the distance and the route schedule. We will share an expected timeline with your quotation.',
      },
    ],
  },
  'enclosed-car-transport': {
    tagline: 'Covered carrier, extra protection',
    seoTitle: 'Enclosed Car Transport — Covered Car Carrier',
    seoDescription:
      'Enclosed car transport in a covered carrier for extra protection from dust and weather, subject to route availability. Enquire with JK Car Carrier.',
    intro: [
      'Enclosed car transport moves your car inside a covered carrier, protecting it from dust, rain and road debris along the way.',
      'It is a popular choice for new, premium and vintage cars. Enclosed carriers are subject to availability on your route, so please mention it when you enquire.',
    ],
    helpWith: [
      'Transport in a covered, enclosed carrier',
      'Careful loading and securing inside the carrier',
      'Extra protection from dust and weather on the journey',
    ],
    shareDetails: COMMON_SHARE,
    faqs: [
      {
        q: 'Is enclosed transport available on every route?',
        a: 'Not always. Enclosed carriers depend on route availability. Mention that you need enclosed transport when you enquire and we will confirm.',
      },
      {
        q: 'What is the difference between open and enclosed transport?',
        a: 'On an open carrier, cars travel on an open deck. In enclosed transport, the car travels inside a covered carrier, which gives extra protection from dust and weather.',
      },
    ],
  },
  'luxury-car-transport': {
    tagline: 'Premium, sports & vintage cars',
    seoTitle: 'Luxury Car Transport — Premium, Sports & Vintage Cars',
    seoDescription:
      'Luxury car transport with extra care in loading and securing for premium, sports and vintage cars. Get a free quote from JK Car Carrier on WhatsApp.',
    intro: [
      'Premium, sports and vintage cars need extra attention. Low ground clearance, wide bodies and delicate finishes all need to be considered when loading and securing the car.',
      'Tell us the make and model, and any special requirements, so we can plan the right handling for your car.',
    ],
    helpWith: [
      'Extra care during loading and unloading',
      'Securing suited to low-clearance and premium cars',
      'Option to enquire about enclosed transport',
    ],
    shareDetails: [...COMMON_SHARE, 'Ground clearance or any special handling needs'],
    faqs: [
      {
        q: 'Can you move low-clearance sports cars?',
        a: 'You can enquire for low-clearance cars. Share the make and model so we can check the right loading method for your car.',
      },
      {
        q: 'Should I choose enclosed transport for a luxury car?',
        a: 'Many owners prefer enclosed transport for premium cars because of the extra protection. Ask for it in your enquiry and we will confirm availability.',
      },
    ],
  },
  'multiple-car-dealer-transport': {
    tagline: 'Dealers, fleets & families',
    seoTitle: 'Multiple Car Transport for Dealers, Fleets & Families',
    seoDescription:
      'Transport several cars at once for dealers, businesses and families. Share the number of cars and your route for a free quote from JK Car Carrier.',
    intro: [
      'Moving more than one car? We transport several cars together for car dealers, businesses with company fleets, and families relocating with two or more cars.',
      'Tell us how many cars, their models and the route, and we will plan the transport and share a quotation.',
    ],
    helpWith: [
      'Moving two or more cars on the same carrier',
      'Transport for dealers and businesses',
      'Planning pickups from one or more locations',
    ],
    shareDetails: [
      'Number of cars and their models',
      'Pickup location(s) and destination city',
      'Whether all cars are in running condition',
      'Preferred dates',
    ],
    faqs: [
      {
        q: 'Can I send two family cars together?',
        a: 'Yes, you can enquire for multiple cars together. Mention both models in the quote form.',
      },
      {
        q: 'Do you work with car dealers?',
        a: 'Dealers and businesses can enquire about moving several cars. Share the number of cars, the route and how often you need transport.',
      },
    ],
  },
  'car-relocation-job-transfer': {
    tagline: 'Moving to a new city',
    seoTitle: 'Car Relocation for Job Transfers — Move Your Car to a New City',
    seoDescription:
      'Moving to a new city for work? JK Car Carrier helps move your car so you don’t have to drive it the whole way. Get a free car relocation quote on WhatsApp.',
    intro: [
      'A job transfer often means moving your car to a new city. Instead of driving hundreds of kilometres yourself, send your car on a car carrier and focus on settling in.',
      'Share your current city, new city and dates, and we will plan pickup and delivery around your move.',
    ],
    helpWith: [
      'Moving your car to your new city',
      'Planning pickup and delivery around your joining date',
      'Option of door-to-door pickup and delivery',
    ],
    shareDetails: COMMON_SHARE,
    faqs: [
      {
        q: 'Can my car reach before I do?',
        a: 'Share your preferred dates when you enquire and we will plan the pickup so the delivery fits your move as closely as possible.',
      },
      {
        q: 'Can my company pay for the car transport?',
        a: 'If your company is covering relocation costs, mention it when you enquire so we can share the quotation and details your company needs.',
      },
    ],
  },
}
