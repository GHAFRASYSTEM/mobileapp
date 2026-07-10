// hooks/useFrenchAI/types.ts
//
// Shared types for every French AI hook. Keeping these in one place means
// useChat, useTranscribe, useTTS, etc. all agree on the same shapes.

export type Mode  = 'conversation' | 'correction' | 'roleplay' | 'pronunciation';
export type Level = 'A1' | 'A2' | 'B1' | 'B2';
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

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

// ── Writing Correction ──────────────────────────────────────────────────
export interface WritingCorrectionPayload {
  text: string;
  userLevel: CefrLevel;
  context?: string;
  [key: string]: unknown;
}

export interface WritingCorrectionResult {
  correctedText: string;
  mistakes: { original: string; correction: string; explanation: string }[];
  vocabularySuggestions: { original: string; suggestion: string; reason: string }[];
  naturalRewrite: string;
  cefrAssessment: {
    estimatedLevel: CefrLevel;
    strengths: string[];
    areasToImprove: string[];
  };
  overallFeedback: string;
}

// ── Dictation ───────────────────────────────────────────────────────────
export interface DictationPassagePayload {
  userLevel: CefrLevel;
  topic?: string;
  lengthWords?: number;
  [key: string]: unknown;
}

export interface DictationPassage {
  text: string;
  audioBase64: string;
}

export interface DictationCheckPayload {
  originalText: string;
  userAttempt: string;
  userLevel: CefrLevel;
  [key: string]: unknown;
}

export interface DictationCheckResult {
  accuracyScore: number;
  wordDiff: {
    word: string;
    status: 'correct' | 'missing' | 'wrong' | 'extra';
    userWord?: string;
  }[];
  commonMistakeExplanations: string[];
  feedback: string;
}

// ── Reading Comprehension ──────────────────────────────────────────────
export interface ReadingExercisePayload {
  userLevel: CefrLevel;
  topic?: string;
  [key: string]: unknown;
}

export interface ReadingQuestion {
  id: string;
  type: 'multiple_choice' | 'short_answer' | 'vocab_in_context' | 'summary';
  question: string;
  options?: string[];
  correctAnswer?: string;
}

export interface ReadingExercise {
  passage: string;
  vocabHighlights: { word: string; meaning: string }[];
  questions: ReadingQuestion[];
}

export interface ReadingGradePayload {
  exercise: ReadingExercise;
  userLevel: CefrLevel;
  userAnswers: Record<string, string>;
  [key: string]: unknown;
}

export interface ReadingAnswerResult {
  results: { questionId: string; correct: boolean; feedback: string; modelAnswer?: string }[];
  overallScore: number;
  overallFeedback: string;
}

// ── Fill-in-the-Blank ───────────────────────────────────────────────────
export type FillBlankFocus = 'verb_tense' | 'vocabulary' | 'idiom' | 'scrambled_sentence' | 'mixed';

export interface FillBlankGeneratePayload {
  userLevel: CefrLevel;
  focus?: FillBlankFocus;
  count?: number;
  [key: string]: unknown;
}

export interface FillBlankExercise {
  id: string;
  type: 'fill_blank' | 'scrambled' | 'verb_tense' | 'idiom';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface FillBlankCheckResult {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
}

// ── Flashcards ──────────────────────────────────────────────────────────
export type FlashcardSourceType = 'conversation' | 'roleplay' | 'reading' | 'video';

export interface FlashcardSourceItem {
  sourceType: FlashcardSourceType;
  text: string;
}

export interface FlashcardGeneratePayload {
  items: FlashcardSourceItem[];
  userLevel: CefrLevel;
  count?: number;
  [key: string]: unknown;
}

export interface Flashcard {
  word: string;
  meaning: string;
  pronunciation: string;
  exampleSentence: string;
  exampleSentenceTranslation: string;
  followUpQuestion: string;
  sourceType: FlashcardSourceType;
}