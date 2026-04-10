import React, {
  createContext, useContext, useEffect, useState, useCallback, useRef,
} from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, AppState } from 'react-native';
import Constants from 'expo-constants';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList:   true,
    shouldPlaySound:  true,
    shouldSetBadge:   true,
  }),
});

type NotificationStatus =
  | 'loading'
  | 'granted'
  | 'denied'
  | 'undetermined'
  | 'unavailable';

type NotificationContextType = {
  status:               NotificationStatus;
  fcmToken:             string | null;
  isEnabled:            boolean;
  requestPermission:    () => Promise<boolean>;
  disableNotifications: () => Promise<void>;
  refreshStatus:        () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { state }  = useAuth();
  const [status,   setStatus]   = useState<NotificationStatus>('loading');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const registering = useRef(false);

  // ── Register token with backend ──────────────────────────────────────────
  const registerToken = useCallback(async () => {
    if (registering.current) return;
    registering.current = true;

    try {
      const { status: existing } = await Notifications.getPermissionsAsync();
      if (existing === 'denied')       { setStatus('denied');      return; }
      if (existing === 'undetermined') { setStatus('undetermined'); return; }

      if (!Device.isDevice) {
        setStatus('granted');
        return;
      }

      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });

      if (!token) { setStatus('undetermined'); return; }

      setFcmToken(token);
      setStatus('granted');

      // ✅ POST to register the token
      await api.post('/auth/fcm-token', {
        token,
        platform: Platform.OS as 'ios' | 'android',
      });

    } catch (err: any) {
      console.error('[FCM] error:', err.message);
    } finally {
      registering.current = false;
    }
  }, []);

  // ── Request permission ───────────────────────────────────────────────────
  const requestPermission = useCallback(async (): Promise<boolean> => {
    const { status: granted } = await Notifications.requestPermissionsAsync();
    if (granted !== 'granted') { setStatus('denied'); return false; }
    await registerToken();
    return true;
  }, [registerToken]);

  // ── Disable — DELETE the token so backend stops sending ──────────────────
  const disableNotifications = useCallback(async () => {
    if (fcmToken) {
      try {
        // ✅ DELETE the specific token — NOT /auth/signout
        await api.delete(`/auth/fcm-token/${encodeURIComponent(fcmToken)}`);
      } catch (err: any) {
        console.warn('[Notifications] Failed to remove token:', err.message);
      }
    }
    setFcmToken(null);
    setStatus('undetermined');
  }, [fcmToken]);

  // ── Refresh status ───────────────────────────────────────────────────────
  const refreshStatus = useCallback(async () => {
    const { status: current } = await Notifications.getPermissionsAsync();
    if (current === 'granted')       { await registerToken(); }
    else if (current === 'denied')   { setStatus('denied');      }
    else                             { setStatus('undetermined'); }
  }, [registerToken]);

  // ── Bootstrap when authenticated ─────────────────────────────────────────
  useEffect(() => {
    if (state.status !== 'authenticated') return;
    refreshStatus();
  }, [state.status]);

  // ── Re-check on app foreground ───────────────────────────────────────────
  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      if (next === 'active' && state.status === 'authenticated') refreshStatus();
    });
    return () => sub.remove();
  }, [state.status, refreshStatus]);

  // ── Listeners ────────────────────────────────────────────────────────────
  useEffect(() => {
    const r = Notifications.addNotificationReceivedListener(n =>
      console.log('[Notification received]', n.request.content.title)
    );
    const t = Notifications.addNotificationResponseReceivedListener(r =>
      console.log('[Notification tapped]', r.notification.request.content.data)
    );
    return () => { r.remove(); t.remove(); };
  }, []);

  return (
    <NotificationContext.Provider value={{
      status, fcmToken,
      isEnabled: status === 'granted',
      requestPermission, disableNotifications, refreshStatus,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be inside NotificationProvider');
  return ctx;
}