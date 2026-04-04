export type GalleryPhoto = {
  id: string;
  uri: string;
  caption?: string;
};

export type Album = {
  id: string;
  title: string;
  date: string;
  cover: string;
  photos: GalleryPhoto[];
  count: number; // always derived from photos.length — never set manually
};

const makePhotos = (seed: string, albumTitle: string, n: number): GalleryPhoto[] =>
  Array.from({ length: n }, (_, i) => ({
    id:      `${seed}-${i}`,
    uri:     `https://picsum.photos/seed/${seed}${i}/600/800`,
    caption: `${albumTitle} · Photo ${i + 1}`,
  }));

const raw: Omit<Album, 'count'>[] = [
  {
    id:     '1',
    title:  'AGM 2024',
    date:   'December 2024',
    cover:  'https://picsum.photos/seed/agm2024/600/400',
    photos: makePhotos('agm', 'AGM 2024', 9),
  },
  {
    id:     '2',
    title:  'Networking Mixer',
    date:   'October 2024',
    cover:  'https://picsum.photos/seed/mixer24/600/400',
    photos: makePhotos('mix', 'Networking Mixer', 6),
  },
  {
    id:     '3',
    title:  'Independence Day',
    date:   'March 2024',
    cover:  'https://picsum.photos/seed/ghana24/600/400',
    photos: makePhotos('ind', 'Independence Day', 12),
  },
  {
    id:     '4',
    title:  'Cultural Night',
    date:   'June 2023',
    cover:  'https://picsum.photos/seed/cultural23/600/400',
    photos: makePhotos('cult', 'Cultural Night', 7),
  },
];

// count is always photos.length — single source of truth
export const ALBUMS: Album[] = raw.map(a => ({ ...a, count: a.photos.length }));

export const DRIVE_URL = 'https://drive.google.com/drive/folders/your-folder-id';