import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/services/api';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Charge {
  label:  string;
  amount: number;
}

export interface Housing {
  id:          string;
  title:       string;
  description: string;
  address:     string;
  city:        string;
  location:    string;
  type:        'Studio' | 'Apartment' | 'Room' | 'Colocation';
  bedrooms:    number;
  bathrooms:   number;
  size:        number;
  price:       number;
  available:   boolean;
  images:      string[];
  charges:     Charge[];
  notes:       string;
  author_id:   string;
  created_at:  string;
  updated_at:  string;
}

export interface HousingListResponse {
  housing: Housing[];
  total:   number;
  page:    number;
  limit:   number;
  pages:   number;
}

export interface HousingFilters {
  page?:       number;
  limit?:      number;
  city?:       string;
  type?:       Housing['type'];
  available?:  boolean;
  min_price?:  number;
  max_price?:  number;
  sort_by?:    'price' | 'created_at' | 'size';
  sort_order?: 'asc' | 'desc';
}

// ── useHousingList ────────────────────────────────────────────────────────────

export function useHousingList(initialFilters: HousingFilters = {}) {
  const [data,    setData]    = useState<HousingListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [filters, setFiltersState] = useState<HousingFilters>({
    page: 1, limit: 20, sort_by: 'created_at', sort_order: 'desc',
    ...initialFilters,
  });

  const abortRef = useRef<AbortController | null>(null);

  const fetch = useCallback(async (f: HousingFilters) => {
    abortRef.current?.abort();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(f).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.set(k, String(v));
      });
      const result = await api.get<HousingListResponse>(`/housing?${params.toString()}`);
      setData(result);
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        setError(err?.message ?? 'Failed to load listings');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(filters); }, [filters]);

  const setFilters = useCallback((patch: Partial<HousingFilters>) => {
    setFiltersState(prev => ({ ...prev, ...patch, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFiltersState(prev => ({ ...prev, page }));
  }, []);

  const refetch = useCallback(() => fetch(filters), [filters, fetch]);

  return { data, loading, error, filters, setFilters, setPage, refetch };
}

// ── useHousing (single) ───────────────────────────────────────────────────────

export function useHousing(id: string) {
  const [housing, setHousing] = useState<Housing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const result = await api.get<Housing>(`/housing/${id}`);
      setHousing(result);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load listing');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { housing, loading, error, refetch: fetch };
}

// ── useMyRequests ─────────────────────────────────────────────────────────────

export interface RoomRequest {
  id:         string;
  housing_id: string;
  user_id:    string;
  message:    string;
  status:     'pending' | 'approved' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

export function useMyRequests() {
  const [requests, setRequests] = useState<RoomRequest[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.get<RoomRequest[]>('/housing/requests/mine');
      setRequests(result ?? []);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { requests, loading, error, refetch: fetch };
}