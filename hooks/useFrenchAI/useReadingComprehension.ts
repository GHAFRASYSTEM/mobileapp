// hooks/useFrenchAI/useReadingComprehension.ts
//
// Generate a reading passage + questions, then grade the user's submitted
// answers. NOTE: correctAnswer fields ride along in the exercise object
// (see backend TODO — no server-side store yet), so `grade` just sends the
// whole exercise back with the user's answers.

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import type {
  ReadingExercisePayload,
  ReadingExercise,
  ReadingGradePayload,
  ReadingAnswerResult,
} from './types';

export function useReadingComprehension() {
  const [generateLoading, setGenerateLoading] = useState(false);
  const [gradeLoading,    setGradeLoading]    = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  const generate = useCallback(async (
    payload: ReadingExercisePayload,
  ): Promise<ReadingExercise | null> => {
    setGenerateLoading(true);
    setError(null);
    try {
      return await api.post<ReadingExercise>('/french-ai/reading/generate', payload);
    } catch (e: any) {
      console.error('Reading exercise error:', e);
      setError(e.message);
      return null;
    } finally {
      setGenerateLoading(false);
    }
  }, []);

  const grade = useCallback(async (
    payload: ReadingGradePayload,
  ): Promise<ReadingAnswerResult | null> => {
    setGradeLoading(true);
    setError(null);
    try {
      return await api.post<ReadingAnswerResult>('/french-ai/reading/grade', payload);
    } catch (e: any) {
      console.error('Reading grade error:', e);
      setError(e.message);
      return null;
    } finally {
      setGradeLoading(false);
    }
  }, []);

  return { generate, generateLoading, grade, gradeLoading, error };
}