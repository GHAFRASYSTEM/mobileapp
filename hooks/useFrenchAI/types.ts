// hooks/useFrenchAI/types.ts
//
// Shared types for every French AI hook. Keeping these in one place means
// useChat, useTranscribe, useTTS, etc. all agree on the same shapes.

export type Mode  = 'conversation' | 'correction' | 'roleplay' | 'pronunciation';
export type Level = 'A1' | 'A2' | 'B1' | 'B2';

export interface ChatPayload {
  messages:       { role: 'user' | 'assistant'; content: string }[];
  mode:           Mode;
  userLevel:      Level;
  roleplayScene?: string;
  [key: string]: unknown; // fixes "Index signature missing" TS error
}

export interface ChatAPIResponse {
  reply:       string;
  translation: string;
  correction:  string | null;
  tip:         string | null;
  suggestions: string[];
}

export interface TranscribeResult {
  text:     string;
  language: string;
}

export interface ScoreResult {
  score:      number;
  transcript: string;
  wordScores: { word: string; correct: boolean }[];
  feedback:   string;
}

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