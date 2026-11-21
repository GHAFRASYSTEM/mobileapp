import { api } from '@/services/api';
import type {
  Opportunity,
  OpportunityListParams,
  OpportunityListResult,
} from '@/types/opportunities';

// ─────────────────────────────────────────────────────────────────────────────
// Opportunities API (member endpoints).
// The list only ever returns listings whose availability is `open`.
// Errors surface as ApiError from services/api.ts, so callers can tell a
// 404 (not found) from a 410 (closed or expired).
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_LIMIT = 20;

function buildQuery({
  type, search, location, page, limit,
}: OpportunityListParams): string {
  const q = new URLSearchParams();
  if (type) q.set('type', type);
  if (search?.trim()) q.set('search', search.trim());
  if (location?.trim()) q.set('location', location.trim());
  q.set('page', String(page ?? 1));
  q.set('limit', String(limit ?? DEFAULT_LIMIT));
  return q.toString();
}

export const opportunitiesApi = {
  async list(params: OpportunityListParams = {}): Promise<OpportunityListResult> {
    const res = await api.getWithMeta<Opportunity[]>(
      `/opportunities?${buildQuery(params)}`,
    );
    const items = res?.data ?? [];
    return {
      items,
      meta: res?.meta ?? {
        total: items.length,
        page:  params.page ?? 1,
        limit: params.limit ?? DEFAULT_LIMIT,
        pages: 1,
      },
    };
  },

  getById(id: string): Promise<Opportunity> {
    return api.get<Opportunity>(`/opportunities/${encodeURIComponent(id)}`);
  },
};
