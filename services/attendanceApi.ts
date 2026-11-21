import { api } from '@/services/api';
import type {
  AttendanceStatus,
  AttendanceHistoryItem,
  AttendanceErrorKind,
} from '@/types/attendance';

// ─────────────────────────────────────────────────────────────────────────────
// Attendance API (read-only: marking attendance happens on the website)
//
// Endpoints/response shapes are PLACEHOLDERS until the backend docs are shared.
// While USE_MOCK is true, responses are simulated. Flip the MOCK_* flags to
// test each UI state.
// ─────────────────────────────────────────────────────────────────────────────

const USE_MOCK = true as boolean;

const MOCK_ACTIVE    = true  as boolean;  // attendance window open?
const MOCK_SUBMITTED = false as boolean;  // already marked present?
const MOCK_FAIL      = null  as AttendanceErrorKind | null; // force a load error
const MOCK_DELAY_MS  = 700;

export class AttendanceError extends Error {
  kind: AttendanceErrorKind;
  constructor(kind: AttendanceErrorKind, message?: string) {
    super(message ?? kind);
    this.kind = kind;
    this.name = 'AttendanceError';
  }
}

export function toAttendanceError(err: unknown): AttendanceError {
  if (err instanceof AttendanceError) return err;
  const msg = err instanceof Error ? err.message : String(err ?? '');
  if (err instanceof TypeError || msg.toLowerCase().includes('network')) {
    return new AttendanceError('NETWORK', msg);
  }
  return new AttendanceError('SERVER', msg);
}

const wait = (ms = MOCK_DELAY_MS) => new Promise(r => setTimeout(r, ms));

function lastSaturday(year: number, monthIndex: number): Date {
  const d = new Date(year, monthIndex + 1, 0);
  d.setDate(d.getDate() - ((d.getDay() + 1) % 7));
  return d;
}

export const attendanceApi = {
  async getStatus(): Promise<AttendanceStatus> {
    if (USE_MOCK) {
      await wait();
      if (MOCK_FAIL) throw new AttendanceError(MOCK_FAIL);
      const now = new Date();
      return {
        meetingId:        `mock-${now.getFullYear()}-${now.getMonth() + 1}`,
        meetingTitle:     'Monthly Meeting',
        meetingDate:      lastSaturday(now.getFullYear(), now.getMonth()).toISOString(),
        isActive:         MOCK_ACTIVE,
        alreadySubmitted: MOCK_SUBMITTED,
      };
    }
    // TODO: confirm endpoint + response shape from API docs
    return api.get<AttendanceStatus>('/attendance/current');
  },

  async getHistory(year: number): Promise<AttendanceHistoryItem[]> {
    if (USE_MOCK) {
      await wait();
      const now       = new Date();
      const lastMonth = year < now.getFullYear() ? 11 : now.getMonth();
      return Array.from({ length: lastMonth + 1 }, (_, i) => {
        const isCurrent = year === now.getFullYear() && i === now.getMonth();
        const status: AttendanceHistoryItem['status'] = isCurrent
          ? (MOCK_SUBMITTED ? 'attended' : 'unavailable')
          : (i % 3 === 1 ? 'unavailable' : 'attended');
        return {
          month:       i + 1,
          year,
          status,
          meetingDate: lastSaturday(year, i).toISOString(),
        };
      }).reverse();
    }
    // TODO: confirm endpoint + response shape from API docs
    return api.get<AttendanceHistoryItem[]>(`/attendance/history?year=${year}`);
  },
};
