
// ─── Levels ───────────────────────────────────────────────────────────────────

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const ALL_LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

// ─── Resource formats ─────────────────────────────────────────────────────────

export type Format = 'video' | 'podcast' | 'app' | 'website' | 'flashcards';

// ─── A single lesson inside a video playlist ──────────────────────────────────

export interface FrenchLesson {
  videoId: string;       // YouTube video ID — e.g. 'oBmQFGgDEXk'
  title: string;
  duration: string;      // display string — e.g. '9:12'
  level: Level;
  topics: string[];      // short French phrases / grammar points covered
  englishSummary: string; // plain-English description of what is taught
}

// ─── A resource (channel / playlist / website / app / podcast) ────────────────

export interface FrenchResource {
  id: string;
  title: string;
  description: string;
  levels: Level[];
  format: Format;
  hasEnglishTranslation: boolean;
  emoji: string;
  totalLessons?: number;

  // For video resources: supply a playlistId OR a hand-curated lesson array
  youtubePlaylistId?: string;
  lessons?: FrenchLesson[];

  // For non-video resources: supply an external URL
  externalUrl?: string;

  // What the learner gains (bullet points shown on detail screen)
  whatYouLearn?: string[];

  // Format-specific study tip shown on detail screen
  studyTip?: string;
}