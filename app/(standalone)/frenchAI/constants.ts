// app/(standalone)/frenchAI/constants.ts
//
// Static UI-only data for the French AI screen.

import type { Mode } from '@/hooks/useFrenchAI';

// 'ionicons' | 'mci' (MaterialCommunityIcons) — some concepts (drama masks,
// puzzle piece) only exist cleanly in MCI, so each entry declares its family.
export type IconSet = 'ionicons' | 'mci';

export const MODES: { key: Mode; label: string; icon: string; iconSet: IconSet }[] = [
  { key: 'conversation',  label: 'Chat',      icon: 'chatbubbles-outline', iconSet: 'ionicons' },
  { key: 'roleplay',      label: 'Roleplay',  icon: 'drama-masks',         iconSet: 'mci'       },
  { key: 'pronunciation', label: 'Pronounce', icon: 'volume-high-outline', iconSet: 'ionicons' },
  { key: 'correction',    label: 'Correct',   icon: 'create-outline',      iconSet: 'ionicons' },
];

// Standalone exercise screens, reached from the "more practice" row rather
// than the mode tabs above (different UX shape: forms + generate/check
// flows, not a chat thread).
export const EXTRA_EXERCISES: { route: string; label: string; icon: string; iconSet: IconSet }[] = [
  { route: '/(standalone)/frenchAI/writing',    label: 'Writing',    icon: 'document-text-outline', iconSet: 'ionicons' },
  { route: '/(standalone)/frenchAI/dictation',  label: 'Dictation',  icon: 'headset-outline',       iconSet: 'ionicons' },
  { route: '/(standalone)/frenchAI/reading',    label: 'Reading',    icon: 'book-outline',           iconSet: 'ionicons' },
  { route: '/(standalone)/frenchAI/fillBlank',  label: 'Fill Blank', icon: 'puzzle-outline',         iconSet: 'mci'       },
  { route: '/(standalone)/frenchAI/flashcards', label: 'Flashcards', icon: 'albums-outline',         iconSet: 'ionicons' },
];