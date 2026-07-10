// hooks/useFrenchAI/useFlashcards.ts
//
// Generates flashcards from real content the learner has seen, and fetches
// per-word audio lazily (call synthesizeAudio on first flip, not for the
// whole deck up front — matches the backend's rate-limit note).

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import * as LegacyFS from 'expo-file-system/legacy';
import type { FlashcardGeneratePayload, Flashcard } from './types';

export function useFlashcards() {
  const [generateLoading, setGenerateLoading] = useState(false);
  const [audioLoading,    setAudioLoading]    = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  const generate = useCallback(async (
    payload: FlashcardGeneratePayload,
  ): Promise<Flashcard[] | null> => {
    setGenerateLoading(true);
    setError(null);
    try {
      return await api.post<Flashcard[]>('/french-ai/flashcards/generate', payload);
    } catch (e: any) {
      console.error('Flashcard generate error:', e);
      setError(e.message);
      return null;
    } finally {
      setGenerateLoading(false);
    }
  }, []);

  // Same blob -> base64 -> cache-file pattern as useTTS, since this hits the
  // same audio/mpeg binary response shape.
  const synthesizeAudio = useCallback(async (word: string): Promise<string | null> => {
    setAudioLoading(true);
    try {
      const blob = await api.post<Blob | null>('/french-ai/flashcards/audio', { word });
      if (!blob) return null;

      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const fileUri = `${LegacyFS.cacheDirectory}flashcard-${Date.now()}.mp3`;
      await LegacyFS.writeAsStringAsync(fileUri, base64, {
        encoding: LegacyFS.EncodingType.Base64,
      });
      return fileUri;
    } catch (e: any) {
      console.error('Flashcard audio error:', e);
      return null;
    } finally {
      setAudioLoading(false);
    }
  }, []);

  return { generate, generateLoading, synthesizeAudio, audioLoading, error };
}