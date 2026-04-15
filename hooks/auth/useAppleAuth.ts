import { useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '@/constants/supabase';
import { api }      from '@/services/api';
import { useAuth }  from '@/context/AuthContext';

export function useAppleAuth() {
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Native Apple sheet — throws if user cancels
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken } = credential;
      if (!identityToken) throw new Error('No identity token returned by Apple');

      // 2. Set the Supabase session locally using the identity token.
      //    This keeps the local client in sync before we hit our backend.
      const { data: sessionData, error: sessionError } =
        await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token:    identityToken,
        });

      if (sessionError || !sessionData.session)
        throw new Error(sessionError?.message ?? 'Failed to set Apple session');

      // 3. Tell our backend — it upserts the profile and returns session tokens
      await api.post('/auth/apple', {
        identity_token: identityToken,
      });

      // 4. AuthContext re-evaluates, NavigationGuard routes automatically
      await refreshProfile();

    } catch (e: any) {
      // ERR_CANCELED is thrown when the user dismisses the Apple sheet — not an error
      if (e?.code === 'ERR_CANCELED') return;
      setError(e.message ?? 'Apple sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signIn };
}