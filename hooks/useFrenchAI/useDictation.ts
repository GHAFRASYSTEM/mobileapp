// hooks/useFrenchAI/useDictation.ts
//
// Two-step flow: generate a passage (+ audio to play), then check the
// user's typed attempt against it. Kept as one hook since both steps share
// the same exercise lifecycle (generate -> listen -> type -> check).

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import type {
  DictationPassagePayload,
  DictationPassage,
  DictationCheckPayload,
  DictationCheckResult,
} from './types';

export function useDictation() {
  const [generateLoading, setGenerateLoading] = useState(false);
  const [checkLoading,    setCheckLoading]    = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  const generatePassage = useCallback(async (
    payload: DictationPassagePayload,
  ): Promise<DictationPassage | null> => {
    setGenerateLoading(true);
    setError(null);
    try {
      return await api.post<DictationPassage>('/french-ai/dictation/passage', payload);
    } catch (e: any) {
      console.error('Dictation passage error:', e);
      setError(e.message);
      return null;
    } finally {
      setGenerateLoading(false);
    }
  }, []);

  const check = useCallback(async (
    payload: DictationCheckPayload,
  ): Promise<DictationCheckResult | null> => {
    setCheckLoading(true);
    setError(null);
    try {
      return await api.post<DictationCheckResult>('/french-ai/dictation/check', payload);
    } catch (e: any) {
      console.error('Dictation check error:', e);
      setError(e.message);
      return null;
    } finally {
      setCheckLoading(false);
    }
  }, []);

  return { generatePassage, generateLoading, check, checkLoading, error };
}