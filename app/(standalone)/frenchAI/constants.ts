// app/(standalone)/frenchAI/constants.ts
//
// Static UI-only data for the French AI screen.

import type { Mode } from '@/hooks/useFrenchAI';

export const MODES: { key: Mode; label: string; emoji: string }[] = [
  { key: 'conversation',  label: 'Chat',      emoji: '💬' },
  { key: 'roleplay',      label: 'Roleplay',  emoji: '🎭' },
  { key: 'pronunciation', label: 'Pronounce', emoji: '🔊' },
  { key: 'correction',    label: 'Correct',   emoji: '✏️' },
];