// hooks/useFrenchAI/usePronunciationScore.ts
//
// Uploads a recorded phrase plus the expected text and returns a
// word-by-word pronunciation score. Used by the Pronounce tab.

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import type { ScoreResult } from './types';

export function usePronunciationScore() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const score = useCallback(async (
    uri: string,
    expectedText: string,
    mimeType = 'audio/m4a',
  ): Promise<ScoreResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('audio',        { uri, type: mimeType, name: 'audio.m4a' } as any);
      form.append('expectedText', expectedText);
      const data = await api.post<ScoreResult>('/french-ai/score-pronunciation', form as any);
      return data;
    } catch (e: any) {
      console.error('Pronunciation score error:', e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { score, loading, error };
}