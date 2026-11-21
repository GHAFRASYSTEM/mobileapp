import type { Opportunity } from '@/types/opportunities';

// ─── Deadline / availability helpers ──────────────────────────────────────────
// Deadlines are plain "YYYY-MM-DD" days, inclusive, in Europe/Paris. Comparing
// them as strings avoids the off-by-one a `new Date(...)` round-trip would
// introduce for devices west of Paris.

/** Today in Europe/Paris, as "YYYY-MM-DD". */
export function todayInParis(now: Date = new Date()): string {
  try {
    // en-CA formats as YYYY-MM-DD.
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Paris',
      year:     'numeric',
      month:    '2-digit',
      day:      '2-digit',
    }).format(now);
  } catch {
    // Device without a full-ICU build — fall back to its local date.
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }
}

/** True once the deadline day itself has passed (the day is inclusive). */
export function isDeadlinePassed(deadline: string | null, now?: Date): boolean {
  if (!deadline) return false;
  return deadline < todayInParis(now);
}

/**
 * Whether an opportunity should be shown as closed or expired.
 * Covers a listing the backend already flags, and one whose deadline has
 * passed since it was fetched — so it is evaluated at render time.
 */
export function isOpportunityClosed(o: Opportunity, now?: Date): boolean {
  return (
    o.availability !== 'open' ||
    o.is_expired ||
    isDeadlinePassed(o.application_deadline, now)
  );
}

/** "Closed" when an admin closed it, otherwise "Expired". */
export function closedLabel(o: Opportunity, now?: Date): string {
  const expired =
    o.availability === 'expired' ||
    o.is_expired ||
    isDeadlinePassed(o.application_deadline, now);
  return expired ? 'Expired' : 'Closed';
}

/** "30 Nov 2026", or "No deadline". */
export function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'No deadline';
  const [y, m, d] = deadline.split('-').map(Number);
  if (!y || !m || !d) return deadline;
  // Built and read back in UTC so the calendar day never shifts.
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    day:      'numeric',
    month:    'short',
    year:     'numeric',
    timeZone: 'UTC',
  });
}

/** Only http(s) links are safe to hand to Linking. */
export function isHttpUrl(url: string | null): boolean {
  return !!url && /^https?:\/\//i.test(url.trim());
}
