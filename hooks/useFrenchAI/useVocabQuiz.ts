// hooks/useFrenchAI/useVocabQuiz.ts
//
// Generates a category-driven (or word-list-driven) vocab quiz: listening
// discrimination + sentence completion questions, each already carrying its
// audio, correct answer, and wrong-answer explanations — so once generated,
// the whole quiz runs client-side with no further network calls.

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import type { VocabQuizRequestPayload, VocabQuizResult, VocabQuizQuestion } from './types';

export function useVocabQuiz() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const generate = useCallback(async (
    payload: VocabQuizRequestPayload,
  ): Promise<VocabQuizQuestion[] | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.post<VocabQuizResult>(
        '/french-ai/vocab-quiz/generate',
        payload as Record<string, unknown>,
      );
      return data.questions;
    } catch (e: any) {
      console.error('Vocab quiz generation error:', e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
}