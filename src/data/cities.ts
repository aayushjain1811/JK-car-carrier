/**
 * Cities that get their own "Car Transport in <City>" page.
 * Grouped by state / union territory. To add a city, add its name to the right list —
 * the page, sitemap entry and links are created automatically on the next build.
 */
const BY_STATE: Record<string, string[]> = {
  'Andhra Pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Kakinada', 'Rajahmundry',
    'Kadapa', 'Anantapur', 'Eluru', 'Ongole', 'Amaravati', 'Srikakulam', 'Vizianagaram',
  ],
  'Arunachal Pradesh': ['Itanagar'],
  Assam: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur', 'Nagaon'],
  Bihar: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Begusarai', 'Arrah'],
  Chhattisgarh: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Raigarh'],
  Goa: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
  Gujarat: [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand',
    'Bharuch', 'Vapi', 'Navsari', 'Morbi', 'Mehsana', 'Gandhidham',
  ],
  Haryana: [
    'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar', 'Rohtak', 'Sonipat', 'Panchkula',
    'Yamunanagar', 'Rewari', 'Bahadurgarh', 'Kurukshetra', 'Sirsa',
  ],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Manali', 'Kullu', 'Baddi'],
  Jharkhand: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar'],
  Karnataka: [
    'Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Dharwad', 'Belagavi', 'Kalaburagi', 'Ballari',
    'Davanagere', 'Shivamogga', 'Tumakuru', 'Udupi', 'Vijayapura',
  ],
  Kerala: [
    'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Palakkad',
    'Kottayam', 'Malappuram',
  ],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Ratlam', 'Dewas'],
  Maharashtra: [
    'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Navi Mumbai', 'Pimpri-Chinchwad', 'Nashik', 'Chhatrapati Sambhajinagar',
    'Kalyan', 'Vasai-Virar', 'Mira-Bhayandar', 'Bhiwandi', 'Panvel', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded',
    'Sangli', 'Jalgaon', 'Akola', 'Latur', 'Ahilyanagar', 'Satara',
  ],
  Manipur: ['Imphal'],
  Meghalaya: ['Shillong'],
  Mizoram: ['Aizawl'],
  Nagaland: ['Kohima', 'Dimapur'],
  Odisha: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore'],
  Punjab: [
    'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur', 'Pathankot', 'Moga',
    'Zirakpur',
  ],
  Rajasthan: [
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara', 'Sikar', 'Bhiwadi',
    'Sri Ganganagar', 'Pali',
  ],
  Sikkim: ['Gangtok'],
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tiruppur', 'Erode', 'Vellore', 'Tirunelveli',
    'Thoothukudi', 'Hosur', 'Thanjavur', 'Kanchipuram',
  ],
  Telangana: ['Hyderabad', 'Secunderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam'],
  Tripura: ['Agartala'],
  'Uttar Pradesh': [
    'Lucknow', 'Kanpur', 'Noida', 'Greater Noida', 'Ghaziabad', 'Agra', 'Varanasi', 'Prayagraj', 'Meerut',
    'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur', 'Saharanpur', 'Mathura', 'Jhansi', 'Ayodhya', 'Firozabad',
    'Muzaffarnagar',
  ],
  Uttarakhand: ['Dehradun', 'Haridwar', 'Rishikesh', 'Haldwani', 'Roorkee', 'Rudrapur', 'Nainital'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Kharagpur', 'Bardhaman', 'Haldia'],
  // Union Territories
  Delhi: ['Delhi', 'New Delhi'],
  Chandigarh: ['Chandigarh'],
  'Jammu and Kashmir': ['Jammu', 'Srinagar'],
  Ladakh: ['Leh'],
  Puducherry: ['Puducherry'],
  'Andaman and Nicobar Islands': ['Sri Vijaya Puram'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Silvassa'],
  Lakshadweep: ['Kavaratti'],
}

/** Older / alternate names that people still search for. */
const ALIASES: Record<string, string> = {
  Gurugram: 'Gurgaon',
  Bengaluru: 'Bangalore',
  Mysuru: 'Mysore',
  Mangaluru: 'Mangalore',
  Hubballi: 'Hubli',
  Belagavi: 'Belgaum',
  Kalaburagi: 'Gulbarga',
  Thiruvananthapuram: 'Trivandrum',
  Kochi: 'Cochin',
  Kozhikode: 'Calicut',
  Prayagraj: 'Allahabad',
  'Chhatrapati Sambhajinagar': 'Aurangabad',
  Ahilyanagar: 'Ahmednagar',
  Tiruchirappalli: 'Trichy',
  Thoothukudi: 'Tuticorin',
  Puducherry: 'Pondicherry',
  'Sri Vijaya Puram': 'Port Blair',
  Mohali: 'SAS Nagar',
  Berhampur: 'Brahmapur',
}

/** Large cities shown first on the home page. */
export const POPULAR_CITY_NAMES = [
  'Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Gurugram', 'Noida',
  'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Kochi', 'Bhubaneswar',
]

export interface City {
  name: string
  state: string
  slug: string
  /** Alternate / older name, if any */
  alias?: string
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const STATES = Object.keys(BY_STATE)

export const CITIES: City[] = Object.entries(BY_STATE).flatMap(([state, names]) =>
  names.map((name) => ({ name, state, slug: slugify(name), alias: ALIASES[name] })),
)

const bySlug = new Map(CITIES.map((c) => [c.slug, c]))
export const findCity = (slug: string) => bySlug.get(slug)

export const citiesInState = (state: string) => CITIES.filter((c) => c.state === state)

export const POPULAR_CITIES = POPULAR_CITY_NAMES.map((n) => CITIES.find((c) => c.name === n)!).filter(Boolean)

export const cityLabel = (c: City) => (c.alias ? `${c.name} (${c.alias})` : c.name)
