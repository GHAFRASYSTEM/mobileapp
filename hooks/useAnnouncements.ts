import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export type AnnouncementCategory =
  | 'news' | 'event' | 'housing' | 'personal' | 'update';

export type Announcement = {
  id:           string;
  category:     AnnouncementCategory;
  title:        string;
  body:         string;
  image_uri?:   string | null;
  published_at: string;
};

export function useAnnouncements() {
  const [data,    setData]    = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
       const res = await api.get<Announcement[]>(
  '/announcements?page=1&limit=50',
);

console.log('Fetched announcements:', res);
if (!cancelled) setData(res);
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? 'Failed to load announcements.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { data: data ?? [], loading, error }; 
}