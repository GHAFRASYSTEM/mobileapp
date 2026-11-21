// ─── Attendance types ─────────────────────────────────────────────────────────
// Check-in itself happens on the GHAFRA website (it handles location).
// The app only reads the current status and the monthly history.
// Shapes are provisional until the backend API docs are shared.

export type AttendanceStatus = {
  meetingId:        string | null;
  meetingTitle:     string;
  meetingDate:      string | null;   // ISO date of the current meeting
  isActive:         boolean;         // attendance window is open
  alreadySubmitted: boolean;         // user is already marked present
};

export type HistoryStatus = 'attended' | 'unavailable';

export type AttendanceHistoryItem = {
  month:       number;   // 1–12
  year:        number;
  status:      HistoryStatus;
  meetingDate: string | null;
};

export type AttendanceErrorKind = 'NETWORK' | 'SERVER';

export type FeedbackTone = 'success' | 'warning' | 'error';

export type AttendanceFeedback = {
  tone:    FeedbackTone;
  title:   string;
  message: string;
  action?: 'retry';
};
