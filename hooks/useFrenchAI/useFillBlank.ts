// hooks/useFrenchAI/useFillBlank.ts
//
// Generates a set of grammar drills, then checks a single answer at a time.
// checkAnswer still goes through the API (backend does it synchronously,
// no AI call) rather than duplicating the comparison logic on the client —
// keeps "correct" as a single source of truth.

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import type {
  FillBlankGeneratePayload,
  FillBlankExercise,
  FillBlankCheckResult,
} from './types';

export function useFillBlank() {
  const [generateLoading, setGenerateLoading] = useState(false);
  const [checkLoading,    setCheckLoading]    = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  const generate = useCallback(async (
    payload: FillBlankGeneratePayload,
  ): Promise<FillBlankExercise[] | null> => {
    setGenerateLoading(true);
    setError(null);
    try {
      return await api.post<FillBlankExercise[]>('/french-ai/fill-blank/generate', payload);
    } catch (e: any) {
      console.error('Fill-blank generate error:', e);
      setError(e.message);
      return null;
    } finally {
      setGenerateLoading(false);
    }
  }, []);

  const checkAnswer = useCallback(async (
    exercise: FillBlankExercise,
    userAnswer: string,
  ): Promise<FillBlankCheckResult | null> => {
    setCheckLoading(true);
    setError(null);
    try {
      return await api.post<FillBlankCheckResult>('/french-ai/fill-blank/check', {
        exercise,
        userAnswer,
      });
    } catch (e: any) {
      console.error('Fill-blank check error:', e);
      setError(e.message);
      return null;
    } finally {
      setCheckLoading(false);
    }
  }, []);

  return { generate, generateLoading, checkAnswer, checkLoading, error };
}