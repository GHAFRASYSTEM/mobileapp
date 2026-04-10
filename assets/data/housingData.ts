export type Housing = {
  id: string;
  title: string;
  location: string;
  address: string;
  city: string;
  price: number;
  period: 'month'; // only monthly now
  available: boolean;
  availableFrom: string;
  images: string[];
  type: 'Studio' | 'Apartment' | 'Room' | 'Colocation';
  bedrooms: number;
  bathrooms: number;
  size: number; // m²
  description: string;
  notes: string;
  rules: string[];
  charges: { label: string; amount: number }[];
};

export const HOUSING_LIST: Housing[] = [
  {
    id: '1',
    title: 'Cosy studio near Châtelet',
    location: '4th arrondissement, Paris',
    address: '12 Rue Saint-Denis, 75004 Paris',
    city: 'Paris',
    price: 950,
    period: 'month',
    available: true,
    availableFrom: 'Now',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    ],
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    size: 28,
    description:
      'A well-maintained studio in the heart of Paris, close to metro lines 1, 4, 7, 11 and 14.',
    notes:
      'Furnished. Electricity and water included. Fast WiFi included.',
    rules: [
      'No smoking indoors',
      'No pets',
      'Quiet hours after 10pm',
    ],
    charges: [
      { label: 'Rent', amount: 950 },
      { label: 'Deposit (1 month)', amount: 950 },
      { label: 'Agency fee', amount: 400 },
    ],
  },

  {
    id: '2',
    title: 'Shared room in colocation',
    location: 'Part-Dieu, Lyon',
    address: '45 Rue Garibaldi, 69003 Lyon',
    city: 'Lyon',
    price: 480,
    period: 'month',
    available: true,
    availableFrom: '1 May 2025',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    type: 'Colocation',
    bedrooms: 1,
    bathrooms: 2,
    size: 18,
    description:
      '3-bedroom colocation in a spacious flat. Friendly environment for new arrivals.',
    notes:
      'Shared kitchen. Bills split equally.',
    rules: [
      'Keep shared spaces clean',
      'Respect housemates',
    ],
    charges: [
      { label: 'Rent', amount: 480 },
      { label: 'Charges', amount: 60 },
      { label: 'Deposit', amount: 480 },
    ],
  },

  {
    id: '3',
    title: 'Modern 2-bed apartment',
    location: 'Bordeaux Centre',
    address: '8 Rue Sainte-Catherine, 33000 Bordeaux',
    city: 'Bordeaux',
    price: 1100,
    period: 'month',
    available: false,
    availableFrom: '15 June 2025',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
    description:
      'Bright and renovated apartment in central Bordeaux.',
    notes: 'Unfurnished. CAF eligible.',
    rules: [
      'No smoking',
      'Minimum 6-month lease',
    ],
    charges: [
      { label: 'Rent', amount: 1100 },
      { label: 'Charges', amount: 80 },
      { label: 'Deposit (2 months)', amount: 2200 },
    ],
  },
];