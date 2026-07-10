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
export const PRACTICE_MODES: {
  route:       string;
  label:       string;
  description: string;
  icon:        string;
  iconSet?:    'ion' | 'mci';
}[] = [
  { route: '/(standalone)/frenchAI/chat',          label: 'Chat',          description: 'Free conversation practice',        icon: 'chatbubbles-outline' },
  { route: '/(standalone)/frenchAI/roleplay',      label: 'Roleplay',      description: 'Act out a real-life scene',          icon: 'drama-masks',        iconSet: 'mci' },
  { route: '/(standalone)/frenchAI/pronunciation', label: 'Pronounce',     description: 'Record & get scored',                icon: 'mic-outline' },
  { route: '/(standalone)/frenchAI/writing',       label: 'Writing',       description: 'Instant correction + CEFR read',     icon: 'pencil-outline' },
  { route: '/(standalone)/frenchAI/dictation',     label: 'Dictation',     description: 'Listen & type what you hear',        icon: 'headset-outline' },
  { route: '/(standalone)/frenchAI/reading',       label: 'Reading',       description: 'Passages + comprehension questions', icon: 'book-outline' },
  { route: '/(standalone)/frenchAI/fillBlank',     label: 'Fill the Blank',description: 'Grammar & vocab drills',             icon: 'puzzle-outline',     iconSet: 'mci' },
  { route: '/(standalone)/frenchAI/flashcards',    label: 'Flashcards',    description: 'Vocab mined from real content',      icon: 'cards-outline',      iconSet: 'mci' },
    { route: '/(standalone)/frenchAI/vocabQuiz',     label: 'Vocab Quiz',    description: 'Test your vocabulary knowledge',      icon: 'school',      iconSet: 'mci' },
];