import { useState, useCallback, useEffect } from 'react';
import type { BubbleMessage } from '@/components/French/ConversationBubble';
import { api } from '@/services/api';
import * as LegacyFS from 'expo-file-system/legacy';  // ← legacy for cacheDirectory
import { File } from 'expo-file-system/next';          // ← new API for writing

export type Mode  = 'conversation' | 'correction' | 'roleplay' | 'pronunciation';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface ChatPayload {
  messages:      { role: 'user' | 'assistant'; content: string }[];
  mode:          Mode;
  userLevel:     Level;
  roleplayScene?: string;
  [key: string]: unknown;  // ← fixes "Index signature missing" TS error
}

interface ChatAPIResponse {
  reply:       string;
  translation: string;
  correction:  string | null;
  tip:         string | null;
  suggestions: string[];
}

interface TranscribeResult {
  text:     string;
  language: string;
}

export interface ScoreResult {
  score:      number;
  transcript: string;
  wordScores: { word: string; correct: boolean }[];
  feedback:   string;
}

// ── Chat ──────────────────────────────────────────────────────────────────────
export function useChat() {
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const send = useCallback(async (
    payload: ChatPayload,
  ): Promise<BubbleMessage | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.post<ChatAPIResponse>('/french-ai/chat', payload as Record<string, unknown>);
      if (data.suggestions?.length) setSuggestions(data.suggestions);
      return {
        id:          Date.now().toString(),
        role:        'assistant',
        text:        data.reply,
        translation: data.translation,
        correction:  data.correction ?? undefined,
        tip:         data.tip ?? undefined,
      };
    } catch (e: any) {
      console.error('Chat error:', e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => setSuggestions([]), []);
  return { send, loading, error, suggestions, clearSuggestions };
}

// ── Transcribe ────────────────────────────────────────────────────────────────
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

// ── TTS ───────────────────────────────────────────────────────────────────────
// ── TTS ───────────────────────────────────────────────────────────────────────
export function useTTS() {
  const [loading, setLoading] = useState(false);

  const speak = useCallback(async (
    text: string,
    speed = 1.0,
  ): Promise<string | null> => {
    setLoading(true);
    try {
      // 1. Get the audio as a Blob from your API
      const blob = await api.post<Blob | null>('/french-ai/tts', { text, speed });
      if (!blob) return null;

      // 2. Convert Blob → Base64 (this works reliably in React Native)
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

      // 3. Save as .mp3 file using expo-file-system (legacy or new)
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

// ── Pronunciation Scoring ─────────────────────────────────────────────────────
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

// ── Config ────────────────────────────────────────────────────────────────────
export interface RoleplayScene {
  label:       string;
  scene:       string;
  aiOpener:    string;
  suggestions: string[];
}

export interface LevelConfig {
  key:                  string;
  label:                string;
  pronunciationPhrases: string[];
}

export interface TutorConfig {
  levels:         LevelConfig[];
  roleplayScenes: RoleplayScene[];
}

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