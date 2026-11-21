import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError } from '@/services/api';
import { opportunitiesApi } from '@/services/opportunitiesApi';
import type {
  Opportunity,
  OpportunityListMeta,
  OpportunityType,
} from '@/types/opportunities';

export type OpportunityFilter = 'all' | OpportunityType;

const PAGE_LIMIT          = 20;
const SEARCH_DEBOUNCE_MS  = 350;
const LIST_ERROR          = 'Could not load opportunities.';

// ── useOpportunities (list) ───────────────────────────────────────────────────

export function useOpportunities() {
  const [filter,   setFilter]   = useState<OpportunityFilter>('all');
  const [search,   setSearch]   = useState('');
  const [query,    setQuery]    = useState('');   // debounced `search`
  const [reloadId, setReloadId] = useState(0);

  const [items,       setItems]       = useState<Opportunity[]>([]);
  const [meta,        setMeta]        = useState<OpportunityListMeta | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Debounce typing so every keystroke doesn't hit the API.
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [search]);

  const params = useCallback((page: number) => ({
    type:   filter === 'all' ? undefined : filter,
    search: query || undefined,
    page,
    limit:  PAGE_LIMIT,
  }), [filter, query]);

  // First page — re-runs on filter / search / retry.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await opportunitiesApi.list(params(1));
        if (cancelled) return;
        setItems(res.items);
        setMeta(res.meta);
      } catch (err: any) {
        console.error('[Opportunities] list error:', err?.message);
        if (!cancelled) {
          setItems([]);
          setMeta(null);
          setError(LIST_ERROR);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [params, reloadId]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await opportunitiesApi.list(params(1));
      if (!mounted.current) return;
      setItems(res.items);
      setMeta(res.meta);
      setError(null);
    } catch (err: any) {
      console.error('[Opportunities] refresh error:', err?.message);
      if (mounted.current) setError(LIST_ERROR);
    } finally {
      if (mounted.current) setRefreshing(false);
    }
  }, [params]);

  const hasMore = !!meta && meta.page < meta.pages;

  const loadMore = useCallback(async () => {
    if (!meta || loading || refreshing || loadingMore) return;
    if (meta.page >= meta.pages) return;

    setLoadingMore(true);
    try {
      const res = await opportunitiesApi.list(params(meta.page + 1));
      if (!mounted.current) return;
      // Pages can shift between requests (newest first), so drop repeats.
      setItems(prev => {
        const seen = new Set(prev.map(o => o.id));
        return [...prev, ...res.items.filter(o => !seen.has(o.id))];
      });
      setMeta(res.meta);
    } catch (err: any) {
      console.error('[Opportunities] loadMore error:', err?.message);
    } finally {
      if (mounted.current) setLoadingMore(false);
    }
  }, [meta, loading, refreshing, loadingMore, params]);

  const retry = useCallback(() => setReloadId(n => n + 1), []);

  return {
    items,
    meta,
    total: meta?.total ?? items.length,
    filter,
    setFilter,
    search,
    setSearch,
    loading,
    refreshing,
    loadingMore,
    hasMore,
    error,
    isEmpty: !loading && !error && items.length === 0,
    refresh,
    loadMore,
    retry,
  };
}

// ── useOpportunity (single) ───────────────────────────────────────────────────

/** `unavailable` is the 410: published once, but now closed or expired. */
export type OpportunityErrorKind = 'notFound' | 'unavailable' | 'generic';

export function useOpportunity(id: string | undefined) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [errorKind,   setErrorKind]   = useState<OpportunityErrorKind | null>(null);
  const [reloadId,    setReloadId]    = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!id) {
        setLoading(false);
        setErrorKind('notFound');
        return;
      }

      setLoading(true);
      setErrorKind(null);
      try {
        const res = await opportunitiesApi.getById(id);
        if (cancelled) return;
        setOpportunity(res);
      } catch (err: any) {
        console.error('[Opportunity] load error:', err?.message);
        if (cancelled) return;
        setOpportunity(null);
        if (err instanceof ApiError && err.status === 410) {
          setErrorKind('unavailable');
        } else if (err instanceof ApiError && err.status === 404) {
          setErrorKind('notFound');
        } else {
          setErrorKind('generic');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id, reloadId]);

  const retry = useCallback(() => setReloadId(n => n + 1), []);

  return { opportunity, loading, errorKind, retry };
}
