import React, {
  createContext, useContext, useEffect, useState, useCallback, useRef,
} from 'react';
import { supabase } from '@/constants/supabase';
import { api }      from '@/services/api';

export type UserProfile = {
  id:           string;
  email:        string;
  name:         string;
  photo_url:    string | null;
  gender:       string | null;
  ghana_phone:  string | null;
  french_phone: string | null;
  city:         string | null;
  occupation:   string | null;
  region:       string | null;
  role:         string;
  member_type:  string;
  is_complete:  boolean;
  is_verified:  boolean;   // ← add this
  member_since: string;
};

type AuthState =
  | { status: 'loading' }
  | { status: 'unauthenticated' }
  | { status: 'needs_profile'; email: string; name: string; photoUrl: string }
  | { status: 'authenticated'; profile: UserProfile };

type AuthContextType = {
  state:          AuthState;
  profile:        UserProfile | null;
  signOut:        () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'loading' });
  const loadingRef = useRef(false);

  // ── Fetch profile from backend ────────────────────────────────────────────
  const loadProfile = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      const profile = await api.get<UserProfile>('/auth/me');

      if (!profile.is_complete) {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user;
        setState({
          status:   'needs_profile',
          email:    user?.email                     ?? '',
          name:     user?.user_metadata?.full_name  ?? '',
          photoUrl: user?.user_metadata?.avatar_url ?? '',
        });
        return;
      }

      setState({ status: 'authenticated', profile });

    } catch (err: any) {
      // ─────────────────────────────────────────────────────────────────────
      // CRITICAL: Only set 'unauthenticated' on a real auth failure (401).
      //
      // Network errors, wrong IP, server down, timeout → the Supabase session
      // may still be valid. Don't sign the user out just because the backend
      // was unreachable. Check the Supabase session directly instead.
      // ─────────────────────────────────────────────────────────────────────
      const isAuthError =
        err?.message?.includes('401') ||
        err?.message?.toLowerCase().includes('unauthorized') ||
        err?.message?.toLowerCase().includes('invalid token');

      if (isAuthError) {
        await supabase.auth.signOut();
        setState({ status: 'unauthenticated' });
      } else {
        console.warn('[AuthContext] loadProfile network/server error:', err?.message);
        // Fall back to Supabase session truth — don't trust only the API error
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          setState({ status: 'unauthenticated' });
        }
        // If a valid session exists, keep current state (don't kick user out)
      }
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const refreshProfile = useCallback(() => loadProfile(), [loadProfile]);

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
    
      if (data.session) {
        loadProfile();
      } else {
        setState({ status: 'unauthenticated' });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          if (session) loadProfile();
          break;
        // TOKEN_REFRESHED fires on app resume — handle it or the user gets
        // bounced to SignIn every time they reopen the app
        case 'TOKEN_REFRESHED':
          if (session) loadProfile();
          break;
        case 'SIGNED_OUT':
          setState({ status: 'unauthenticated' });
          break;
        default:
          break;
      }
    });

    return () => listener.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sign out ──────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setState({ status: 'unauthenticated' });
  }, []);

  const profile = state.status === 'authenticated' ? state.profile : null;

  return (
    <AuthContext.Provider value={{ state, profile, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function useProfile() {
  const { profile } = useAuth();
  return profile;
}