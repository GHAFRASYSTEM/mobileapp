import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Keyboard } from 'react-native';
import { attendanceApi, toAttendanceError, AttendanceError } from '@/services/attendanceApi';
import { getCurrentLocation, type LocationFailureReason } from '@/utils/getCurrentLocation';
import { parisDateString, parisYear } from '@/utils/attendanceDate';
import type {
  Meeting,
  MyAttendance,
  CurrentMeetingState,
  SubmitPhase,
  AttendanceFeedback,
} from '@/types/attendance';

// Check-in happens in the app (members only): the member types the code
// announced in the room, and the phone's location is sent with it.
// Never log the code, the coordinates or tokens.

/** The server rejects anything worse than this (metres). */
const MAX_ACCURACY_M = 100;

// ── Feedback copy ────────────────────────────────────────────────────────────

const EMPTY_CODE: AttendanceFeedback = {
  tone: 'warning',
  title: 'Enter the check-in code',
  message: 'Type the code announced in the room, then submit.',
};

const LOCATION_FEEDBACK: Record<LocationFailureReason, AttendanceFeedback> = {
  services_off: {
    tone: 'error',
    title: 'Location is turned off',
    message: 'Turn on location services (GPS) for your phone so we can confirm you are at the meeting.',
    action: 'settings',
  },
  denied: {
    tone: 'error',
    title: 'Location permission needed',
    message: 'GHAFRA needs your location to confirm you are at the meeting. Allow it and try again.',
    action: 'retry',
  },
  blocked: {
    tone: 'error',
    title: 'Location access is blocked',
    message: 'Allow location access for GHAFRA in your phone settings, then come back and submit.',
    action: 'settings',
  },
  unavailable: {
    tone: 'error',
    title: "Couldn't get your location",
    message: 'Your phone could not find your position. Check that you have a GPS signal and try again.',
    action: 'retry',
  },
};

const WEAK_ACCURACY: AttendanceFeedback = {
  tone: 'warning',
  title: 'GPS signal too weak',
  message: `Your location is only accurate to more than ${MAX_ACCURACY_M} m. Move outdoors or near a window and try again.`,
  action: 'retry',
};

function submitErrorFeedback(e: AttendanceError): AttendanceFeedback {
  switch (e.kind) {
    case 'BAD_REQUEST':
      // Closed, wrong code, too far and weak accuracy all share 400:
      // the server's message says which one.
      return {
        tone: 'error',
        title: "Attendance wasn't recorded",
        message: e.serverMessage || 'Check-in was refused. Check the code and try again.',
      };
    case 'CONFLICT':
      return {
        tone: 'success',
        title: 'Already checked in',
        message: 'Your attendance for this meeting is already recorded.',
      };
    case 'NOT_FOUND':
      return {
        tone: 'error',
        title: 'Meeting not found',
        message: 'This meeting no longer exists. The list has been refreshed.',
      };
    case 'UNAUTHORIZED':
      return {
        tone: 'error',
        title: 'Session expired',
        message: 'Your session has expired. Sign out and sign in again, then submit.',
      };
    case 'VALIDATION':
      return {
        tone: 'error',
        title: "Couldn't submit",
        message: 'Something in your check-in was not valid. Check the code and try again.',
      };
    case 'NETWORK':
      return {
        tone: 'error',
        title: 'No connection',
        message: 'Your attendance was not sent. Check your internet connection and try again.',
        action: 'retry',
      };
    case 'SERVER':
    default:
      return {
        tone: 'error',
        title: 'Server error',
        message: 'Something went wrong on our side. Try again in a moment.',
        action: 'retry',
      };
  }
}

function loadErrorFeedback(e: AttendanceError, what: string): AttendanceFeedback {
  if (e.kind === 'NETWORK') {
    return { tone: 'error', title: 'No connection', message: 'Check your internet connection and try again.', action: 'retry' };
  }
  if (e.kind === 'UNAUTHORIZED') {
    return { tone: 'error', title: 'Session expired', message: 'Your session has expired. Sign out and sign in again.' };
  }
  return { tone: 'error', title: `${what} couldn't be loaded`, message: 'Try again in a moment.', action: 'retry' };
}

// ── Current meeting ──────────────────────────────────────────────────────────

/**
 * There is no "current status" endpoint, so derive it:
 * the upcoming meeting held today (Paris), otherwise the next upcoming one.
 */
export function pickCurrentMeeting(meetings: Meeting[], today: string): Meeting | null {
  const upcoming = meetings
    .filter(m => m.status === 'upcoming' && !m.cancelled_at)
    .sort((a, b) =>
      a.meeting_date.localeCompare(b.meeting_date) ||
      (a.starts_at ?? '').localeCompare(b.starts_at ?? ''));

  const todays = upcoming.filter(m => m.meeting_date === today);
  if (todays.length) return todays.find(m => m.is_active) ?? todays[0];

  return upcoming.find(m => m.meeting_date > today) ?? null;
}

function isAttended(history: MyAttendance | null, meetingId: string): boolean {
  if (!history) return false;
  return history.months.some(mo =>
    mo.meetings.some(mt => mt.meeting_id === meetingId && mt.status === 'Attended'));
}

// ── Hook ─────────────────────────────────────────────────────────────────────

type SyncMode = 'initial' | 'refresh' | 'quiet';

export function useAttendance() {
  const [year] = useState(() => parisYear());

  const [meetings,     setMeetings]     = useState<Meeting[] | null>(null);
  const [history,      setHistory]      = useState<MyAttendance | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [meetingError, setMeetingError] = useState<AttendanceFeedback | null>(null);
  const [historyError, setHistoryError] = useState<AttendanceFeedback | null>(null);
  const [today,        setToday]        = useState(() => parisDateString());

  const [code,     setCode]     = useState('');
  const [phase,    setPhase]    = useState<SubmitPhase>('idle');
  const [feedback, setFeedback] = useState<AttendanceFeedback | null>(null);

  const mounted    = useRef(true);
  const submitLock = useRef(false);
  const hasMeetings = useRef(false);   // data already on screen?
  const hasHistory  = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Fetch upcoming meetings + my history. `quiet` = no spinner, keep old errors.
  const sync = useCallback(async (mode: SyncMode) => {
    if (mode === 'refresh') setRefreshing(true);
    else if (mode === 'initial') setLoading(true);

    const [mRes, hRes] = await Promise.allSettled([
      attendanceApi.getMeetings('upcoming'),
      attendanceApi.getMyAttendance(year),
    ]);
    if (!mounted.current) return;

    setToday(parisDateString());

    if (mRes.status === 'fulfilled') {
      setMeetings(mRes.value);
      setMeetingError(null);
      hasMeetings.current = true;
    } else {
      const e = toAttendanceError(mRes.reason);
      console.warn('[Attendance] meetings load failed:', e.kind);
      if (mode !== 'quiet' || !hasMeetings.current) setMeetingError(loadErrorFeedback(e, 'The meeting'));
    }

    if (hRes.status === 'fulfilled') {
      setHistory(hRes.value);
      setHistoryError(null);
      hasHistory.current = true;
    } else {
      const e = toAttendanceError(hRes.reason);
      console.warn('[Attendance] history load failed:', e.kind);
      if (mode !== 'quiet' || !hasHistory.current) setHistoryError(loadErrorFeedback(e, 'Your history'));
    }

    setLoading(false);
    setRefreshing(false);
  }, [year]);

  useEffect(() => { sync('initial'); }, [sync]);

  const current: CurrentMeetingState | null = useMemo(() => {
    if (!meetings) return null;
    const meeting = pickCurrentMeeting(meetings, today);
    if (!meeting) return null;
    const isToday          = meeting.meeting_date === today;
    const alreadyCheckedIn = isAttended(history, meeting.id);
    return {
      meeting,
      isToday,
      alreadyCheckedIn,
      canCheckIn: isToday && meeting.is_active && !alreadyCheckedIn,
    };
  }, [meetings, history, today]);

  const submit = useCallback(async () => {
    if (submitLock.current) return;           // block double taps
    if (!current || !current.canCheckIn) return;

    const trimmed = code.trim();              // server is case-insensitive
    if (!trimmed) {
      setFeedback(EMPTY_CODE);
      return;
    }

    submitLock.current = true;
    Keyboard.dismiss();
    setFeedback(null);
    setPhase('locating');

    try {
      const loc = await getCurrentLocation();
      if (!mounted.current) return;

      if (!loc.ok) {
        setFeedback(LOCATION_FEEDBACK[loc.reason]);
        return;
      }
      if (loc.coords.accuracy > MAX_ACCURACY_M) {
        setFeedback(WEAK_ACCURACY);
        return;
      }

      setPhase('submitting');
      await attendanceApi.checkIn({
        meeting_id:    current.meeting.id,
        check_in_code: trimmed,
        latitude:      loc.coords.latitude,
        longitude:     loc.coords.longitude,
        accuracy:      loc.coords.accuracy,
      });
      if (!mounted.current) return;

      setCode('');
      setFeedback({
        tone: 'success',
        title: 'Attendance recorded',
        message: `You're checked in to ${current.meeting.title}.`,
      });
      await sync('quiet');
    } catch (err) {
      const e = toAttendanceError(err);
      console.warn('[Attendance] check-in failed:', e.kind);
      if (!mounted.current) return;
      setFeedback(submitErrorFeedback(e));
      if (e.kind === 'CONFLICT' || e.kind === 'NOT_FOUND') {
        if (e.kind === 'CONFLICT') setCode('');
        await sync('quiet');
      }
    } finally {
      submitLock.current = false;
      if (mounted.current) setPhase('idle');
    }
  }, [current, code, sync]);

  return {
    year,
    current,
    history,
    loading,
    refreshing,
    meetingError,
    historyError,
    code,
    setCode,
    phase,
    feedback,
    submit,
    refresh:       () => sync('refresh'),
    retryLoad:     () => sync('initial'),
    clearFeedback: () => setFeedback(null),
  };
}
