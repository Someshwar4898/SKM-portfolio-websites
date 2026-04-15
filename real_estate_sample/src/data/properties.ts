export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  status: 'buy' | 'rent';
  description: string;
  features: string[];
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Oceanfront Villa",
    price: 4250000,
    location: "Malibu, CA",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 6200,
    image: "/images/property1.jpg",
    status: "buy",
    description: "Stunning oceanfront estate with panoramic Pacific views, infinity pool, and private beach access.",
    features: ["Infinity Pool", "Private Beach", "Wine Cellar", "Home Theater"]
  },
  {
    id: 2,
    title: "Beachfront Paradise",
    price: 875000,
    location: "Miami Beach, FL",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 3800,
    image: "/images/property2.jpg",
    status: "buy",
    description: "Luxurious beachfront home with direct ocean access and breathtaking sunrise views.",
    features: ["Ocean Access", "Rooftop Terrace", "Gourmet Kitchen", "Spa Bathroom"]
  },
  {
    id: 3,
    title: "Downtown Penthouse",
    price: 1850000,
    location: "New York, NY",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    area: 2450,
    image: "/images/property3.jpg",
    status: "buy",
    description: "Ultra-modern penthouse in the heart of Manhattan with floor-to-ceiling windows and city views.",
    features: ["City Skyline Views", "Private Elevator", "Chef's Kitchen", "Gym"]
  },
  {
    id: 4,
    title: "Hillside Estate",
    price: 3200000,
    location: "Beverly Hills, CA",
    type: "House",
    bedrooms: 6,
    bathrooms: 7,
    area: 7800,
    image: "/images/property4.jpg",
    status: "buy",
    description: "Architectural masterpiece nestled in the hills with resort-style grounds and guest house.",
    features: ["Guest House", "Pool & Spa", "Tennis Court", "Wine Room"]
  },
  {
    id: 5,
    title: "Coastal Retreat",
    price: 6500,
    location: "Santa Barbara, CA",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 4100,
    image: "/images/hero.jpg",
    status: "rent",
    description: "Elegant coastal villa available for long-term lease. Steps from the beach.",
    features: ["Ocean Views", "Private Deck", "Fire Pit", "Chef Kitchen"]
  },
  {
    id: 6,
    title: "Luxury Loft",
    price: 4200,
    location: "Chicago, IL",
    type: "Penthouse",
    bedrooms: 2,
    bathrooms: 3,
    area: 2100,
    image: "/images/interior1.jpg",
    status: "rent",
    description: "Sophisticated downtown loft with industrial-chic design and skyline views.",
    features: ["Open Concept", "Rooftop Access", "Smart Home", "Concierge"]
  },
  {
    id: 7,
    title: "Modern Family Home",
    price: 1450000,
    location: "Austin, TX",
    type: "House",
    bedrooms: 5,
    bathrooms: 4,
    area: 4600,
    image: "/images/kitchen.jpg",
    status: "buy",
    description: "Spacious contemporary home in prestigious neighborhood with backyard oasis.",
    features: ["Pool", "Home Office", "3-Car Garage", "Smart Security"]
  },
  {
    id: 8,
    title: "Lakeside Mansion",
    price: 6750000,
    location: "Lake Tahoe, NV",
    type: "House",
    bedrooms: 7,
    bathrooms: 8,
    area: 9200,
    image: "/images/bedroom.jpg",
    status: "buy",
    description: "Exceptional waterfront estate with private dock, boat house, and mountain views.",
    features: ["Private Dock", "Boat House", "Movie Theater", "Spa"]
  }
];

export function formatPrice(price: number, status: string): string {
  if (status === 'rent') return `$${price.toLocaleString()}/mo`;
  return `$${price.toLocaleString()}`;
}
