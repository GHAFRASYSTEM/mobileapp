import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/constants/supabase';
import { api }      from '@/services/api';
import { useAuth }  from '@/context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URL = 'ghafra://';

export function useGoogleAuth() {
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: urlError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: REDIRECT_URL, skipBrowserRedirect: true },
      });

      if (urlError || !data.url)
        throw new Error(urlError?.message ?? 'Could not get sign-in URL');

      const result = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_URL);
      if (result.type !== 'success') return;

      const raw    = result.url;
      const hash   = raw.includes('#') ? raw.split('#')[1] : raw.split('?')[1] ?? '';
      const params = new URLSearchParams(hash);

      const accessToken  = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (!accessToken || !refreshToken)
        throw new Error('Missing tokens in redirect');

      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token:  accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError || !sessionData.session)
        throw new Error(sessionError?.message ?? 'Failed to set session');

      // Tell backend about the sign-in
      await api.post('/auth/google', {
        access_token: sessionData.session.access_token,
      });

      // Let AuthContext re-evaluate — it will update state
      // SplashGate is gone by now so AuthContext drives routing from SignIn
      await refreshProfile();

    } catch (e: any) {
      setError(e.message ?? 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signIn };
}