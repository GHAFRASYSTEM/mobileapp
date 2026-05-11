// tourData.ts
import { GHANA_PLACES } from './ghanaPlaces';
import { FRANCE_PLACES } from './francePlaces';
import type { PlaceItem, FilterTag } from './tourTypes';

export const ALL_PLACES: Record<string, PlaceItem> = [
  ...GHANA_PLACES,
  ...FRANCE_PLACES,
].reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, PlaceItem>);

export const FILTER_PILLS: { id: FilterTag; label: string }[] = [
  { id: 'all',     label: '🌍 All'      },
  { id: 'ghana',   label: '🇬🇭 Ghana'   },
  { id: 'france',  label: '🇫🇷 France'  },
  { id: 'culture', label: '🎭 Culture'  },
  { id: 'nature',  label: '🌿 Nature'   },
];

export type { PlaceItem, GalleryItem, Country, CategoryTag, FilterTag } from './tourTypes';