// hooks/useFrenchAI/useConfig.ts
//
// Loads the remote tutor config (CEFR levels + roleplay scenes) once on
// mount, with a manual reload for the error-state retry button.

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import type { TutorConfig } from './types';

export function useConfig() {
  const [config,  setConfig]  = useState<TutorConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<TutorConfig>('/french-ai/config');
      setConfig(data);
    } catch (e: any) {
      console.error('Config load error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { config, loading, error, reload: load };
}