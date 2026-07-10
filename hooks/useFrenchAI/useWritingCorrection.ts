// hooks/useFrenchAI/useWritingCorrection.ts
//
// Submits a piece of writing for grammar/vocab correction + CEFR assessment.
// Used by the "Write" tab — single request/response, no follow-up call needed.

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import type { WritingCorrectionPayload, WritingCorrectionResult } from './types';

export function useWritingCorrection() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const correct = useCallback(async (
    payload: WritingCorrectionPayload,
  ): Promise<WritingCorrectionResult | null> => {
    setLoading(true);
    setError(null);
    try {
      return await api.post<WritingCorrectionResult>('/french-ai/writing/correct', payload);
    } catch (e: any) {
      console.error('Writing correction error:', e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { correct, loading, error };
}