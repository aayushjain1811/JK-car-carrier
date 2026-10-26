import { SERVICE_NAMES } from './services'

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: 'How can I get a car transport quotation?',
    a: 'Use the “Get Free Quote” form — it is on the home page, on every service and city page, and on the Get a Quote page. Add your car model, pickup and destination cities and pickup date, then submit. WhatsApp opens with your request already written — tap Send and our team will get back to you with a quotation.',
  },
  {
    q: 'Which car transport services do you offer?',
    a: `We offer ${SERVICE_NAMES.slice(0, -1).join(', ')} and ${SERVICE_NAMES.at(-1)}. Some options depend on the route and availability, so please share your requirements when you enquire.`,
  },
  {
    q: 'Can you transport my car to another state?',
    a: 'Yes, you can enquire for intercity and interstate car transport. Enter your pickup and destination cities in the quote form and we will confirm availability for that route.',
  },
  {
    q: 'What details do you need for a quote?',
    a: 'Your car make and model, pickup and destination cities, preferred pickup date, and whether the car is in running condition. Mention door-to-door or enclosed transport if you need it.',
  },
  {
    q: 'Can I keep personal belongings inside the car?',
    a: 'Please ask our team when you enquire. It is generally best to remove valuables and loose items before handing over your car.',
  },
  {
    q: 'What should I do before handing over my car?',
    a: 'Remove valuables and loose items, note any existing scratches or dents, and keep a copy of your car’s documents handy. The car’s condition is checked at pickup.',
  },
  {
    q: 'Can you transport a car that is not running?',
    a: 'Tell us if your car is not in running condition when you enquire. We will let you know whether it can be loaded on your route.',
  },
  {
    q: 'How can I contact JK Car Carrier?',
    a: 'Send a quote request through the form, or tap the WhatsApp button on this site to start a chat. Any other contact details we offer are listed on our Contact page.',
  },
]
