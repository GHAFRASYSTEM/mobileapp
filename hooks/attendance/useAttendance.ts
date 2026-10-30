import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { attendanceApi, toAttendanceError } from '@/services/attendanceApi';
import type {
  AttendanceStatus,
  AttendanceHistoryItem,
  AttendanceFeedback,
  AttendanceErrorKind,
} from '@/types/attendance';

// ─────────────────────────────────────────────────────────────────────────────
// Attendance is marked on the GHAFRA website (it checks location there).
// TODO: confirm the exact page path with the team, and how the logged-in
// app session is handed to the website (so users don't sign in twice).
// Do NOT append the Supabase access token to the URL unless the backend team
// explicitly specifies a safe mechanism.
// ─────────────────────────────────────────────────────────────────────────────
export const ATTENDANCE_WEBSITE_URL = 'https://www.ghafra.com';

const ERROR_FEEDBACK: Record<AttendanceErrorKind, AttendanceFeedback> = {
  NETWORK: {
    tone: 'error',
    title: 'No connection',
    message: 'Check your internet connection and try again.',
    action: 'retry',
  },
  SERVER: {
    tone: 'error',
    title: "Attendance couldn't be loaded",
    message: 'The server returned an error. Try again in a moment.',
    action: 'retry',
  },
};

export function useAttendance() {
  const year = new Date().getFullYear();

  const [status,     setStatus]     = useState<AttendanceStatus | null>(null);
  const [history,    setHistory]    = useState<AttendanceHistoryItem[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError,  setLoadError]  = useState<AttendanceFeedback | null>(null);
  const [opening,    setOpening]    = useState(false);
  const [feedback,   setFeedback]   = useState<AttendanceFeedback | null>(null);

  const mounted        = useRef(true);
  const openingLock    = useRef(false);
  const wasSubmitted   = useRef(false);   // to announce "recorded" only once
  const awaitingReturn = useRef(false);   // true while user is on the website

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Fetch status + history. `quiet` = no spinner (used when coming back).
  const sync = useCallback(async (mode: 'initial' | 'refresh' | 'quiet') => {
    if (mode === 'refresh') setRefreshing(true);
    else if (mode === 'initial') setLoading(true);
    if (mode !== 'quiet') setLoadError(null);

    try {
      const [s, h] = await Promise.all([
        attendanceApi.getStatus(),
        attendanceApi.getHistory(year),
      ]);
      if (!mounted.current) return;

      // Announce success once, when status flips to recorded
      if (s.alreadySubmitted && !wasSubmitted.current && mode === 'quiet') {
        setFeedback({
          tone: 'success',
          title: 'Attendance recorded',
          message: `You're marked present for ${s.meetingTitle}.`,
        });
      }
      wasSubmitted.current = s.alreadySubmitted;

      setStatus(s);
      setHistory(h);
    } catch (err) {
      console.error('[Attendance] sync error:', err);
      if (mounted.current && mode !== 'quiet') {
        setLoadError(ERROR_FEEDBACK[toAttendanceError(err).kind]);
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [year]);

  useEffect(() => { sync('initial'); }, [sync]);

  // Coming back to the app (e.g. from an external browser on Android)
  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      if (next === 'active' && awaitingReturn.current) {
        awaitingReturn.current = false;
        sync('quiet');
      }
    });
    return () => sub.remove();
  }, [sync]);

  const openWebsite = useCallback(async () => {
    if (openingLock.current || !status) return;
    openingLock.current = true;
    awaitingReturn.current = true;
    setOpening(true);
    setFeedback(null);

    try {
      await WebBrowser.openBrowserAsync(ATTENDANCE_WEBSITE_URL, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      });
    } catch (err) {
      console.error('[Attendance] open website error:', err);
      if (mounted.current) {
        setFeedback({
          tone: 'error',
          title: "Couldn't open the website",
          message: 'Try again, or visit ghafra.com in your browser to mark attendance.',
          action: 'retry',
        });
      }
    } finally {
      openingLock.current = false;
      if (mounted.current) setOpening(false);
    }

    // Browser closed → refresh so the user sees their new status.
    // Skipped if AppState already handled the return (external browser),
    // so coming back never fires two syncs at once.
    if (awaitingReturn.current) {
      awaitingReturn.current = false;
      await sync('quiet');
    }
  }, [status, sync]);

  return {
    year,
    status,
    history,
    loading,
    refreshing,
    loadError,
    opening,
    feedback,
    openWebsite,
    refresh:       () => sync('refresh'),
    retryLoad:     () => sync('initial'),
    clearFeedback: () => setFeedback(null),
  };
}
