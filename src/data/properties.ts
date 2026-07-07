export interface Property {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  tag: string;
}

export const properties: Property[] = [
  {
    id: "aurum-tower-nyc",
    name: "Aurum Tower Penthouse",
    city: "New York",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
    price: "$18,500,000",
    beds: 5,
    baths: 6,
    sqft: 7200,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    tag: "Penthouse",
  },
  {
    id: "villa-marea-dubai",
    name: "Villa Marea",
    city: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    price: "$24,900,000",
    beds: 7,
    baths: 9,
    sqft: 12400,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop",
    tag: "Waterfront Villa",
  },
  {
    id: "belgravia-house-london",
    name: "Belgravia House",
    city: "London",
    country: "UK",
    lat: 51.5074,
    lng: -0.1278,
    price: "£14,250,000",
    beds: 6,
    baths: 5,
    sqft: 6100,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    tag: "Townhouse",
  },
  {
    id: "azure-cliff-monaco",
    name: "Azure Cliff Residence",
    city: "Monaco",
    country: "Monaco",
    lat: 43.7384,
    lng: 7.4246,
    price: "€32,000,000",
    beds: 4,
    baths: 5,
    sqft: 5400,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    tag: "Cliffside Estate",
  },
  {
    id: "kaido-retreat-tokyo",
    name: "Kaido Retreat",
    city: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    price: "¥2,850,000,000",
    beds: 5,
    baths: 6,
    sqft: 6800,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    tag: "Sky Residence",
  },
  {
    id: "sereno-estate-losangeles",
    name: "Sereno Estate",
    city: "Los Angeles",
    country: "USA",
    lat: 34.0522,
    lng: -118.2437,
    price: "$21,750,000",
    beds: 6,
    baths: 8,
    sqft: 9800,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop&sat=-100",
    tag: "Hillside Estate",
  },
  {
    id: "obsidian-loft-singapore",
    name: "Obsidian Sky Loft",
    city: "Singapore",
    country: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    price: "S$28,400,000",
    beds: 4,
    baths: 4,
    sqft: 5200,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    tag: "Sky Loft",
  },
  {
    id: "villa-elysian-santorini",
    name: "Villa Elysian",
    city: "Santorini",
    country: "Greece",
    lat: 36.3932,
    lng: 25.4615,
    price: "€11,600,000",
    beds: 5,
    baths: 5,
    sqft: 4700,
    image:
      "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?q=80&w=1600&auto=format&fit=crop",
    tag: "Clifftop Villa",
  },
];

export const stats = [
  { label: "Properties Sold", value: 480, suffix: "+" },
  { label: "Cities Worldwide", value: 32, suffix: "" },
  { label: "Total Value Closed", value: 4.2, suffix: "B", prefix: "$" },
  { label: "Years of Excellence", value: 18, suffix: "" },
];
