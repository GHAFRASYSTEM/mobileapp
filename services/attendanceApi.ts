import { api } from '@/services/api';
import { parisDateString, parisYear, addDays } from '@/utils/attendanceDate';
import type {
  Meeting,
  MeetingStatus,
  MyAttendance,
  MyAttendanceMeeting,
  MyAttendanceMonth,
  CheckInRequest,
  CheckInResponse,
  AttendanceErrorKind,
} from '@/types/attendance';

// ─────────────────────────────────────────────────────────────────────────────
// Attendance API (member endpoints). See the backend spec, base path /attendance.
//
// The backend is not deployed yet. While USE_MOCK is true, every call returns
// the exact response shapes from the spec. Flip the MOCK_* flags below to see
// each UI state.
// ─────────────────────────────────────────────────────────────────────────────

const USE_MOCK = true as boolean;

// ── Mock flags ───────────────────────────────────────────────────────────────
/** There is a meeting today (Paris). false = next meeting is in a week. */
const MOCK_MEETING_TODAY      = true  as boolean;
/** Admin has opened check-in (is_active). */
const MOCK_ACTIVE             = true  as boolean;
/** Member has already checked in to today's meeting. */
const MOCK_ALREADY_CHECKED_IN = false as boolean;
/** No upcoming meetings at all. */
const MOCK_NO_MEETINGS        = false as boolean;
/** No history for the year (empty months). */
const MOCK_EMPTY_HISTORY      = false as boolean;
/** Force loading (meetings + history) to fail. */
const MOCK_LOAD_FAIL          = null  as MockFailure | null;
/** Force check-in to fail. null = server rules decide (code, accuracy...). */
const MOCK_CHECKIN_FAIL       = null  as MockFailure | null;
/** The code "announced in the room" for the mock meeting (case-insensitive). */
const MOCK_CODE               = 'K7QX3M';
const MOCK_DELAY_MS           = 700;

type MockFailure =
  | 'closed'          // 400 check-in not open
  | 'wrong_code'      // 400 Invalid check-in code
  | 'weak_accuracy'   // 400 accuracy worse than 100 m
  | 'too_far'         // 400 outside radius_m
  | 'conflict'        // 409 already checked in
  | 'not_found'       // 404 meeting not found
  | 'unauthorized'    // 401 token missing/invalid
  | 'validation'      // 422 body invalid
  | 'network'         // fetch failed
  | 'server';         // 5xx

// ── Errors ───────────────────────────────────────────────────────────────────

export class AttendanceError extends Error {
  kind: AttendanceErrorKind;
  /** The server's own message text (shown to the user for 400s). */
  serverMessage: string | null;
  constructor(kind: AttendanceErrorKind, serverMessage: string | null = null) {
    super(serverMessage ?? kind);
    this.kind = kind;
    this.serverMessage = serverMessage;
    this.name = 'AttendanceError';
  }
}

function kindFromStatus(status: number): AttendanceErrorKind {
  if (status === 400) return 'BAD_REQUEST';
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 404) return 'NOT_FOUND';
  if (status === 409) return 'CONFLICT';
  if (status === 422) return 'VALIDATION';
  if (status >= 500)  return 'SERVER';
  return 'BAD_REQUEST';
}

/**
 * Turns whatever services/api.ts threw into an AttendanceError.
 *
 * TODO(api-errors): services/api.ts currently throws a plain `Error` whose
 * message is `json.error.message` (or "Request failed: <status>" /
 * "Expected JSON ... — status <status>"), so the HTTP status is lost and we
 * have to guess it from the message text below. Once services/api.ts exports
 * `ApiError` (with `status` and `code`), replace the message matching in this
 * function with:
 *
 *   if (err instanceof ApiError) {
 *     return new AttendanceError(kindFromStatus(err.status), err.message);
 *   }
 *
 * and delete `kindFromMessage`.
 */
export function toAttendanceError(err: unknown): AttendanceError {
  if (err instanceof AttendanceError) return err;

  const msg = (err instanceof Error ? err.message : String(err ?? '')).trim();

  // fetch() rejects with a TypeError ("Network request failed") when offline.
  if (err instanceof TypeError || /network request failed|failed to fetch|network error|timed? ?out/i.test(msg)) {
    return new AttendanceError('NETWORK', msg || null);
  }

  return new AttendanceError(kindFromMessage(msg), msg || null);
}

/** Best-effort HTTP status guess from the message text. See TODO above. */
function kindFromMessage(msg: string): AttendanceErrorKind {
  // Messages api.ts builds itself when the body has no error.message.
  const statusMatch = msg.match(/Request failed: (\d{3})/) ?? msg.match(/status (\d{3})/);
  if (statusMatch) return kindFromStatus(Number(statusMatch[1]));

  if (/^validation failed$/i.test(msg))                                       return 'VALIDATION';   // 422
  if (/not found/i.test(msg))                                                 return 'NOT_FOUND';    // 404
  if (/already (checked|marked)/i.test(msg))                                  return 'CONFLICT';     // 409
  if (/unauthori[sz]ed|invalid token|missing token|expired token|jwt|not authenticated/i.test(msg)) return 'UNAUTHORIZED'; // 401
  if (!msg || /internal server error|server error|something went wrong/i.test(msg)) return 'SERVER';

  // Anything else with a readable message is treated as a 400 rule message
  // (check-in closed, wrong code, too far, weak accuracy...).
  return 'BAD_REQUEST';
}

// ── Mock data ────────────────────────────────────────────────────────────────

const wait = (ms = MOCK_DELAY_MS) => new Promise(r => setTimeout(r, ms));

const MOCK_MEETING_ID = '8f1c2d4e-6a7b-4c8d-9e0f-1a2b3c4d5e6f';
let mockCheckedIn: boolean = MOCK_ALREADY_CHECKED_IN;
let mockRecordedAt: string | null = MOCK_ALREADY_CHECKED_IN ? new Date().toISOString() : null;

function mockUuid(seed: number): string {
  const hex = seed.toString(16).padStart(12, '0').slice(-12);
  return `c2d9${hex.slice(0, 4)}-0000-4000-8000-${hex}`;
}

function mockCurrentMeeting(): Meeting {
  const today = parisDateString();
  const now   = Date.now();
  const isToday = MOCK_MEETING_TODAY;
  const date  = isToday ? today : addDays(today, 7);
  const startsAt = isToday ? new Date(now - 60 * 60 * 1000).toISOString() : `${date}T17:00:00+00:00`;
  const endsAt   = isToday ? new Date(now + 60 * 60 * 1000).toISOString() : `${date}T19:00:00+00:00`;
  return {
    id:            MOCK_MEETING_ID,
    title:         'General meeting',
    description:   'End of year planning',
    location_name: 'Maison des associations, Lille',
    meeting_date:  date,
    starts_at:     startsAt,
    ends_at:       endsAt,
    latitude:      50.6292,
    longitude:     3.0573,
    radius_m:      100,
    is_active:     isToday && MOCK_ACTIVE,
    cancelled_at:  null,
    created_at:    '2026-11-21T10:00:00+00:00',
    updated_at:    '2026-11-21T10:00:00+00:00',
    status:        'upcoming',
  };
}

function mockLaterMeeting(after: string): Meeting {
  const date = addDays(after, 28);
  return {
    ...mockCurrentMeeting(),
    id:           '9a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
    title:        'Monthly meeting',
    description:  null,
    meeting_date: date,
    starts_at:    `${date}T17:00:00+00:00`,
    ends_at:      `${date}T19:00:00+00:00`,
    is_active:    false,
  };
}

function mockMyAttendance(year: number): MyAttendance {
  const joinedOn = '2026-03-14';
  const today    = parisDateString();
  const months: MyAttendanceMonth[] = [];

  if (!MOCK_EMPTY_HISTORY && year >= Number(joinedOn.slice(0, 4)) && year <= parisYear()) {
    const startMonth = year === Number(joinedOn.slice(0, 4)) ? Number(joinedOn.slice(5, 7)) + 1 : 1;
    const endMonth   = year === parisYear() ? Number(today.slice(5, 7)) : 12;

    for (let m = startMonth; m <= endMonth; m++) {
      const mm   = String(m).padStart(2, '0');
      const date = `${year}-${mm}-24`;
      const meetings: MyAttendanceMeeting[] = [];

      // Current month: today's meeting only shows once the member is checked in
      // ("Unavailable" only appears after a meeting is completed).
      const isCurrentMonth = year === parisYear() && m === Number(today.slice(5, 7));
      if (isCurrentMonth) {
        if (MOCK_MEETING_TODAY && mockCheckedIn) {
          const cur = mockCurrentMeeting();
          meetings.push({
            meeting_id:    cur.id,
            title:         cur.title,
            location_name: cur.location_name,
            meeting_date:  cur.meeting_date,
            starts_at:     cur.starts_at,
            status:        'Attended',
            recorded_at:   mockRecordedAt,
          });
        }
      } else if (date < today) {
        const attended = m % 3 !== 1;
        meetings.push({
          meeting_id:    mockUuid(year * 100 + m),
          title:         'General meeting',
          location_name: 'Maison des associations, Lille',
          meeting_date:  date,
          starts_at:     `${date}T16:00:00+00:00`,
          status:        attended ? 'Attended' : 'Unavailable',
          recorded_at:   attended ? `${date}T16:12:00+00:00` : null,
        });
      }

      if (meetings.length) months.push({ month: `${year}-${mm}`, meetings });
    }
  }

  months.reverse(); // most recent first, like the server

  let attended = 0;
  let unavailable = 0;
  months.forEach(mo => mo.meetings.forEach(mt => {
    if (mt.status === 'Attended') attended++;
    else unavailable++;
  }));

  return { year, joined_on: joinedOn, totals: { attended, unavailable }, months };
}

/** Throws exactly what services/api.ts would throw for each failure. */
function throwMockFailure(f: MockFailure): never {
  switch (f) {
    case 'closed':        throw new Error('Check-in is not open for this meeting');
    case 'wrong_code':    throw new Error('Invalid check-in code');
    case 'weak_accuracy': throw new Error('Location accuracy is too low (150 m). It must be 100 m or better');
    case 'too_far':       throw new Error('You are 340 m from the meeting point (limit 100 m)');
    case 'conflict':      throw new Error('You have already checked in to this meeting');
    case 'not_found':     throw new Error('Meeting not found');
    case 'unauthorized':  throw new Error('Unauthorized');
    case 'validation':    throw new Error('Validation failed');
    case 'network':       throw new TypeError('Network request failed');
    case 'server':        throw new Error('Request failed: 500');
  }
}

// ── API ──────────────────────────────────────────────────────────────────────

export const attendanceApi = {
  /** GET /attendance/meetings?status= (upcoming = soonest first). */
  async getMeetings(status?: MeetingStatus): Promise<Meeting[]> {
    if (USE_MOCK) {
      await wait();
      if (MOCK_LOAD_FAIL) throwMockFailure(MOCK_LOAD_FAIL);
      if (MOCK_NO_MEETINGS) return [];
      const current = mockCurrentMeeting();
      const all = [current, mockLaterMeeting(current.meeting_date)];
      return status ? all.filter(m => m.status === status) : all;
    }
    const qs = status ? `?status=${encodeURIComponent(status)}` : '';
    return api.get<Meeting[]>(`/attendance/meetings${qs}`);
  },

  /** GET /attendance/me?year= */
  async getMyAttendance(year: number): Promise<MyAttendance> {
    if (USE_MOCK) {
      await wait();
      if (MOCK_LOAD_FAIL) throwMockFailure(MOCK_LOAD_FAIL);
      return mockMyAttendance(year);
    }
    return api.get<MyAttendance>(`/attendance/me?year=${year}`);
  },

  /** POST /attendance/check-in */
  async checkIn(body: CheckInRequest): Promise<CheckInResponse> {
    if (USE_MOCK) {
      await wait(1000);
      if (MOCK_CHECKIN_FAIL) throwMockFailure(MOCK_CHECKIN_FAIL);

      // Same order of checks as the server.
      const meeting = mockCurrentMeeting();
      if (body.meeting_id !== meeting.id)                         throwMockFailure('not_found');
      if (!meeting.is_active || meeting.meeting_date !== parisDateString()) throwMockFailure('closed');
      if (body.check_in_code.trim().toUpperCase() !== MOCK_CODE)  throwMockFailure('wrong_code');
      if (body.accuracy > 100)                                    throwMockFailure('weak_accuracy');
      if (mockCheckedIn)                                          throwMockFailure('conflict');

      mockCheckedIn  = true;
      mockRecordedAt = new Date().toISOString();
      return {
        id:          mockUuid(Date.now()),
        meeting_id:  meeting.id,
        status:      'attended',
        recorded_at: mockRecordedAt,
        distance_m:  18.4,
      };
    }
    return api.post<CheckInResponse>('/attendance/check-in', body);
  },
};
