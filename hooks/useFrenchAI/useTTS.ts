// hooks/useFrenchAI/useTTS.ts
//
// Fetches synthesized speech audio for a line of text and saves it to a
// local cache file (legacy expo-file-system, since cacheDirectory + base64
// writes aren't yet on the new API).

import { useCallback, useState } from 'react';
import { api } from '@/services/api';
import * as LegacyFS from 'expo-file-system/legacy';

export function useTTS() {
  const [loading, setLoading] = useState(false);

  const speak = useCallback(async (
    text: string,
    speed = 1.0,
  ): Promise<string | null> => {
    setLoading(true);
    try {
      // 1. Get the audio as a Blob from the API
      const blob = await api.post<Blob | null>('/french-ai/tts', { text, speed });
      if (!blob) return null;

      // 2. Convert Blob → Base64 (works reliably in React Native)
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // reader.result looks like: "data:audio/mpeg;base64,...."
          const result = reader.result as string;
          const base64Data = result.split(',')[1]; // remove data URL prefix
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // 3. Save as .mp3 file using expo-file-system (legacy)
      const fileName = `tts-${Date.now()}.mp3`;
      const fileUri = `${LegacyFS.cacheDirectory}${fileName}`;

      await LegacyFS.writeAsStringAsync(fileUri, base64, {
        encoding: LegacyFS.EncodingType.Base64,
      });

      console.log('[TTS] Saved audio to:', fileUri);
      return fileUri;
    } catch (e: any) {
      console.error('TTS error:', e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { speak, loading };
}