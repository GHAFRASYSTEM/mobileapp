// hooks/useFrenchAI/useTranscribe.ts
//
// Uploads a recorded audio file (by local URI) to the backend and returns
// the transcribed text. Used by the chat/roleplay mic flow.

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import type { TranscribeResult } from './types';

export function useTranscribe() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const transcribe = useCallback(async (
    uri: string,
    mimeType = 'audio/m4a',
  ): Promise<TranscribeResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('audio', { uri, type: mimeType, name: 'audio.m4a' } as any);
      const data = await api.post<TranscribeResult>('/french-ai/transcribe', form as any);
      return data;
    } catch (e: any) {
      console.error('Transcription error:', e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { transcribe, loading, error };
}