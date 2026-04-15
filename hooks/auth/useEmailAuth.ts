// hooks/auth/useEmailAuth.ts
import { useState } from 'react';
import { supabase } from '@/constants/supabase';
import { api }      from '@/services/api';
import { useAuth }  from '@/context/AuthContext';

export function useEmailAuth() {
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await api.post<{
        session:             { access_token: string; refresh_token: string } | null;
        is_profile_complete: boolean;
        is_new_member:       boolean;
      }>('/auth/email', { email, password });

      // Email confirmation is required — session will be null until confirmed
      if (!result.session) {
        setError('Check your inbox and confirm your email before signing in.');
        return;
      }

      // Hydrate the Supabase client with the backend-issued session
      const { error: sessionError } = await supabase.auth.setSession({
        access_token:  result.session.access_token,
        refresh_token: result.session.refresh_token,
      });

      if (sessionError) throw new Error(sessionError.message);

      // AuthContext.loadProfile checks is_complete:
      //   false → sets state to 'needs_profile' → SplashGate sends to CompleteProfile
      //   true  → sets state to 'authenticated'  → SplashGate sends to Tabs
      await refreshProfile();

    } catch (e: any) {
      // Surface provider-mismatch errors (Google/Apple account trying email login)
      setError(e.message ?? 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signIn };
}