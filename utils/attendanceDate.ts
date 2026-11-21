// Attendance "today" logic follows the backend: every meeting day is a Paris
// day (Europe/Paris), whatever time zone the phone is set to.

const PARIS_TZ = 'Europe/Paris';

/** "YYYY-MM-DD" for the given instant, in Paris time. */
export function parisDateString(date: Date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: PARIS_TZ,
      year:     'numeric',
      month:    '2-digit',
      day:      '2-digit',
    }).formatToParts(date);
    const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
    const y = get('year');
    const m = get('month');
    const d = get('day');
    if (y && m && d) return `${y}-${m}-${d}`;
  } catch {
    // fall through to the device date below
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Current year in Paris time. */
export function parisYear(date: Date = new Date()): number {
  return Number(parisDateString(date).slice(0, 4));
}

/** Shift a "YYYY-MM-DD" string by whole days (calendar arithmetic, no TZ). */
export function addDays(ymd: string, days: number): string {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

/** Format a "YYYY-MM-DD" meeting day for display without TZ drift. */
export function formatMeetingDay(
  ymd: string,
  options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' },
): string {
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });
}

/** Format an ISO time (starts_at / ends_at) as a Paris wall-clock time, e.g. "18:00". */
export function formatParisTime(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  try {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: PARIS_TZ });
  } catch {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
}
