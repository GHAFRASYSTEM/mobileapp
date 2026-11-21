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
  | 'cancelled'       // 400 This meeting was cancelled
  | 'closed'          // 400 Check-in is not open for this meeting (is_active false)
  | 'not_today'       // 400 Check-in is only open on the day of the meeting
  | 'not_started'     // 400 Check-in has not opened yet (before starts_at)
  | 'ended'           // 400 Check-in has closed (after ends_at)
  | 'wrong_code'      // 400 Invalid check-in code
  | 'weak_accuracy'   // 400 Your location is not precise enough
  | 'too_far'         // 400 You are <n> m from the meeting...
  | 'unknown_400'     // 400 with a message we don't recognise -> generic
  | 'db_error'        // raw database error text -> generic
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
 * TODO(api-errors): the message matching below is a stopgap. services/api.ts
 * currently throws a plain `Error` whose message is `json.error.message` (or
 * "Request failed: <status>" / "Expected JSON ... — status <status>"), so the
 * HTTP status is lost and `kindFromMessage` guesses it from the text.
 * The real fix, once the PR that adds `ApiError` (with `status` and `code`)
 * to services/api.ts is merged, is to switch to `ApiError.status` here:
 *
 *   if (err instanceof ApiError) {
 *     return new AttendanceError(kindFromStatus(err.status), err.message);
 *   }
 *
 * and delete `kindFromMessage`. Keep the allow-list in `toCheckInError` even
 * then: the backend can put raw database error text in the message, so only
 * the known check-in messages may ever be shown to members.
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

  // Anything else with a readable message is treated as a 400 rule message.
  // toCheckInError() decides whether that text may be shown.
  return 'BAD_REQUEST';
}

// ── Check-in messages safe to show ───────────────────────────────────────────
// The backend's 400 rule messages for POST /attendance/check-in. A message is
// shown to the member only if it starts with (or equals) one of these,
// case-insensitive. Anything else (unknown 400s, raw database errors) gets the
// generic "couldn't be submitted" feedback instead.
const KNOWN_CHECK_IN_PREFIXES = [
  'this meeting was cancelled',
  'check-in is not open for this meeting',
  'check-in is only open on the day of the meeting',
  'check-in has not opened yet',
  'check-in has closed',
  'invalid check-in code',
  'your location is not precise enough',
];
// "You are 340 m from the meeting. Check-in requires being within 100 m"
const TOO_FAR_PATTERN = /^you are \d+(?:[.,]\d+)? ?m from the meeting/i;

export function isKnownCheckInMessage(msg: string | null | undefined): boolean {
  if (!msg) return false;
  const m = msg.trim().toLowerCase();
  return KNOWN_CHECK_IN_PREFIXES.some(p => m.startsWith(p)) || TOO_FAR_PATTERN.test(m);
}

/**
 * Like toAttendanceError, but a 400 keeps its server text only when that text
 * is a known check-in message. Any other 400 (and any 5xx) becomes SERVER with
 * no message, so raw server text never reaches the UI. 401/404/409/422 and
 * network errors are unchanged; their UI copy never shows server text.
 */
export function toCheckInError(err: unknown): AttendanceError {
  const e = toAttendanceError(err);
  if (e.kind === 'SERVER' || (e.kind === 'BAD_REQUEST' && !isKnownCheckInMessage(e.serverMessage))) {
    return new AttendanceError('SERVER', null);
  }
  return e;
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
    case 'cancelled':     throw new Error('This meeting was cancelled');
    case 'closed':        throw new Error('Check-in is not open for this meeting');
    case 'not_today':     throw new Error('Check-in is only open on the day of the meeting');
    case 'not_started':   throw new Error('Check-in has not opened yet');
    case 'ended':         throw new Error('Check-in has closed');
    case 'wrong_code':    throw new Error('Invalid check-in code');
    case 'weak_accuracy': throw new Error('Your location is not precise enough');
    case 'too_far':       throw new Error('You are 340 m from the meeting. Check-in requires being within 100 m');
    case 'unknown_400':   throw new Error('Request failed: 400');
    case 'db_error':      throw new Error('duplicate key value violates unique constraint "attendance_records_meeting_id_user_id_key"');
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

  /**
   * POST /attendance/check-in
   * Errors go through toCheckInError, so only known server messages can
   * reach the UI.
   */
  async checkIn(body: CheckInRequest): Promise<CheckInResponse> {
    try {
      return USE_MOCK
        ? await mockCheckIn(body)
        : await api.post<CheckInResponse>('/attendance/check-in', body);
    } catch (err) {
      throw toCheckInError(err);
    }
  },
};

async function mockCheckIn(body: CheckInRequest): Promise<CheckInResponse> {
  await wait(1000);
  if (MOCK_CHECKIN_FAIL) throwMockFailure(MOCK_CHECKIN_FAIL);

  // Same order of checks as the server.
  const meeting = mockCurrentMeeting();
  const now     = Date.now();
  if (body.meeting_id !== meeting.id)                                throwMockFailure('not_found');
  if (meeting.cancelled_at)                                          throwMockFailure('cancelled');
  if (!meeting.is_active)                                            throwMockFailure('closed');
  if (meeting.meeting_date !== parisDateString())                    throwMockFailure('not_today');
  if (meeting.starts_at && now < Date.parse(meeting.starts_at))      throwMockFailure('not_started');
  if (meeting.ends_at && now > Date.parse(meeting.ends_at))          throwMockFailure('ended');
  if (body.check_in_code.trim().toUpperCase() !== MOCK_CODE)         throwMockFailure('wrong_code');
  if (body.accuracy > 100)                                           throwMockFailure('weak_accuracy');
  if (mockCheckedIn)                                                 throwMockFailure('conflict');

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
