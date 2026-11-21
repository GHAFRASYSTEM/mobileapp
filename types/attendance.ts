// ─── Attendance types ─────────────────────────────────────────────────────────
// Shapes match the backend spec (Attendance API, base path /attendance).
// Check-in happens in the app: members type the code announced in the room and
// the phone's location is sent with it.

// ── Meetings ─────────────────────────────────────────────────────────────────

/** Computed by the server for every meeting. */
export type MeetingStatus = 'upcoming' | 'completed' | 'cancelled';

/**
 * GET /attendance/meetings, GET /attendance/meetings/:id
 * Members never receive check_in_code.
 */
export type Meeting = {
  id:            string;
  title:         string;
  description:   string | null;
  location_name: string | null;
  meeting_date:  string;          // "YYYY-MM-DD" (Paris meeting day)
  starts_at:     string | null;   // ISO 8601 with time zone
  ends_at:       string | null;
  latitude:      number;
  longitude:     number;
  radius_m:      number;
  is_active:     boolean;
  cancelled_at:  string | null;
  created_at:    string;
  updated_at:    string;
  status:        MeetingStatus;
};

// ── My attendance (GET /attendance/me?year=) ─────────────────────────────────

/** "Unavailable" only appears once a meeting is completed. */
export type MemberAttendanceStatus = 'Attended' | 'Unavailable';

export type MyAttendanceMeeting = {
  meeting_id:    string;
  title:         string;
  location_name: string | null;
  meeting_date:  string;          // "YYYY-MM-DD"
  starts_at:     string | null;
  status:        MemberAttendanceStatus;
  recorded_at:   string | null;   // null when Unavailable
};

export type MyAttendanceMonth = {
  month:    string;               // "YYYY-MM"
  meetings: MyAttendanceMeeting[]; // most recent first
};

export type MyAttendance = {
  year:      number;
  joined_on: string;              // "YYYY-MM-DD"
  totals:    { attended: number; unavailable: number };
  months:    MyAttendanceMonth[]; // most recent first
};

// ── Check-in (POST /attendance/check-in) ─────────────────────────────────────

export type CheckInRequest = {
  meeting_id:    string;
  check_in_code: string;   // case-insensitive on the server
  latitude:      number;   // -90..90
  longitude:     number;   // -180..180
  accuracy:      number;   // metres, > 0
};

export type CheckInResponse = {
  id:          string;
  meeting_id:  string;
  status:      'attended';          // lowercase in this response
  recorded_at: string;
  distance_m:  number;
};

// ── Derived UI state ─────────────────────────────────────────────────────────

/** The meeting shown on the status card, derived on the client. */
export type CurrentMeetingState = {
  meeting:          Meeting;
  isToday:          boolean;   // meeting_date is today in Europe/Paris
  canCheckIn:       boolean;   // isToday && is_active && !alreadyCheckedIn
  alreadyCheckedIn: boolean;   // meeting_id is "Attended" in /attendance/me
};

/** Which step of the submit flow is running. */
export type SubmitPhase = 'idle' | 'locating' | 'submitting';

// ── Errors and feedback ──────────────────────────────────────────────────────

export type AttendanceErrorKind =
  | 'BAD_REQUEST'    // 400: closed, wrong code, too far, weak accuracy...
  | 'UNAUTHORIZED'   // 401
  | 'NOT_FOUND'      // 404
  | 'CONFLICT'       // 409: already checked in
  | 'VALIDATION'     // 422
  | 'NETWORK'
  | 'SERVER';

export type FeedbackTone = 'success' | 'warning' | 'error';

export type FeedbackAction = 'retry' | 'settings';

export type AttendanceFeedback = {
  tone:    FeedbackTone;
  title:   string;
  message: string;
  action?: FeedbackAction;
};
