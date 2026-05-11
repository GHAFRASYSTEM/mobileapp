// tourTypes.ts
export type Country = 'ghana' | 'france';
export type CategoryTag = 'Nature' | 'History' | 'Wildlife' | 'Lifestyle' | 'Landmark' | 'Culture' | 'Food';

export interface GalleryItem {
  caption: string;
  /** Real photo URL - recommended for production */
  imageUrl: string;
  emoji?: string;                    // optional now
  gradientColors?: [string, string]; // fallback for loading state
}

export interface PlaceItem {
  id: string;
  name: string;
  location: string;
  type: CategoryTag;
  emoji: string;
  rating: number;
  reviews: number | string;
  country: Country;
  gradientColors: [string, string];
  
  /** Main hero image used in PlaceCard */
  imageUrl: string;

  desc: string;
  gallery: GalleryItem[];
  chips: string[];
  tips: string[];
  pretitle?: string;
}

export type FilterTag = 'all' | 'ghana' | 'france' | 'culture' | 'nature' | 'food';