// hooks/useFrenchAI/index.ts
//
// Barrel export. Existing code does:
//   import { useChat, useTranscribe, useTTS, useConfig, usePronunciationScore,
//            type Level, type Mode } from '@/hooks/useFrenchAI';
// That import path still works unchanged — only the internals were split
// into one file per hook for easier maintenance.

export { useChat }               from './useChat';
export { useTranscribe }         from './useTranscribe';
export { useTTS }                from './useTTS';
export { usePronunciationScore } from './usePronunciationScore';
export { useConfig }             from './useConfig';

export type {
  Mode,
  Level,
  ChatPayload,
  ChatAPIResponse,
  TranscribeResult,
  ScoreResult,
  RoleplayScene,
  LevelConfig,
  TutorConfig,
} from './types';