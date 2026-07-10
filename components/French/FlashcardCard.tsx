// components/French/FlashcardCard.tsx
//
// A single flippable vocabulary flashcard. Extracted out of flashcards.tsx
// so the flip/play logic lives in one place and can be reused (e.g. inside
// a future spaced-repetition review screen) without duplicating markup.

import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import type { Flashcard } from '@/hooks/useFrenchAI/types';

interface FlashcardCardProps {
  card: Flashcard;
  onPlay: (word: string) => void;
  audioLoading?: boolean;
  /** Controlled flip state — omit to let the card manage its own flip internally. */
  flipped?: boolean;
  onFlip?: () => void;
}

export default function FlashcardCard({
  card,
  onPlay,
  audioLoading,
  flipped: controlledFlipped,
  onFlip,
}: FlashcardCardProps) {
  const C = useColors();
  const [internalFlipped, setInternalFlipped] = useState(false);

  const isFlipped = controlledFlipped ?? internalFlipped;
  const toggleFlip = onFlip ?? (() => setInternalFlipped(f => !f));

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={toggleFlip}
      style={{
        backgroundColor: C.surface,
        borderRadius: 14,
        padding: 18,
        borderWidth: 1,
        borderColor: C.border,
        minHeight: 140,
        justifyContent: 'center',
      }}
    >
      {!isFlipped ? (
        <View style={{ alignItems: 'center', gap: 6 }}>
          <Text style={{ color: C.textPrimary, fontSize: 22, fontWeight: '700' }}>{card.word}</Text>
          <Text style={{ color: C.textMuted, fontSize: 13 }}>{card.pronunciation}</Text>
          <TouchableOpacity
            onPress={() => onPlay(card.word)}
            disabled={audioLoading}
            style={{
              marginTop: 8,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 10,
              backgroundColor: C.primarySubtle,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Ionicons name="volume-high-outline" size={14} color={C.primary} />
            <Text style={{ color: C.primary }}>Play</Text>
          </TouchableOpacity>
          <Text style={{ color: C.textMuted, fontSize: 11, marginTop: 6 }}>Tap to flip</Text>
        </View>
      ) : (
        <View style={{ gap: 6 }}>
          <Text style={{ color: C.textPrimary, fontWeight: '700' }}>{card.meaning}</Text>
          <Text style={{ color: C.textSecondary, fontStyle: 'italic' }}>{card.exampleSentence}</Text>
          <Text style={{ color: C.textMuted, fontSize: 13 }}>{card.exampleSentenceTranslation}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 6 }}>
            <Ionicons name="chatbubble-outline" size={14} color={C.primary} style={{ marginTop: 2 }} />
            <Text style={{ color: C.primary, flex: 1 }}>{card.followUpQuestion}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}