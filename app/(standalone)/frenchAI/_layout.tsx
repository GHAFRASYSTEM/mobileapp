// app/(standalone)/frenchAI/_layout.tsx
//
// Wraps every screen under frenchAI/ in FrenchAIProvider so level + config
// are shared across chat, roleplay, pronunciation, correction, writing,
// dictation, reading, fillBlank, and flashcards without prop-drilling or
// route params.

import { Stack } from 'expo-router';
import { FrenchAIProvider } from '@/context/FrenchAIContext';

export default function FrenchAILayout() {
  return (
    <FrenchAIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FrenchAIProvider>
  );
}