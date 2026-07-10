// app/(standalone)/frenchAI/flashcards.tsx
//
// AI Flashcards mined from real content. Since there's no shared store of
// past conversation/roleplay/reading transcripts wired up yet, the user
// pastes or picks source text here — swap the `items` builder below for
// real history once that's available (e.g. pull last N chat turns).
//
// The flip-card UI itself now lives in components/French/FlashcardCard.tsx
// so it can be reused elsewhere (e.g. a future spaced-repetition screen)
// without duplicating markup.

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import FlashcardCard from '@/components/French/FlashcardCard';
import { useFrenchAIContext } from '@/context/FrenchAIContext';
import {
  type Flashcard,
  type FlashcardSourceType,
} from '@/hooks/useFrenchAI/types';
import { useFlashcards } from '@/hooks/useFrenchAI/useFlashcards';

const SOURCE_TYPES: FlashcardSourceType[] = ['conversation', 'roleplay', 'reading', 'video'];

export default function FlashcardsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const { level } = useFrenchAIContext();

  const [sourceType, setSourceType] = useState<FlashcardSourceType>('reading');
  const [sourceText, setSourceText] = useState('');
  const [cards, setCards] = useState<Flashcard[]>([]);

  const { generate, generateLoading, synthesizeAudio, audioLoading } = useFlashcards();

  const handleGenerate = async () => {
    if (!sourceText.trim()) return;
    const result = await generate({
      items: [{ sourceType, text: sourceText.trim() }],
      userLevel: level,
      count: 8,
    });
    if (result) setCards(result);
  };

  const handlePlay = async (word: string) => {
    const uri = await synthesizeAudio(word);
    if (!uri) return;
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader paddingTop={insets.top} title="Flashcards" subtitle="Mined from your content" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {SOURCE_TYPES.map(s => (
            <TouchableOpacity
              key={s}
              onPress={() => setSourceType(s)}
              style={{
                paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, borderWidth: 1,
                borderColor: s === sourceType ? C.primary : C.border,
                backgroundColor: s === sourceType ? C.primarySubtle : 'transparent',
              }}
            >
              <Text style={{ color: s === sourceType ? C.primary : C.textMuted, fontSize: 12, fontWeight: '600' }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          value={sourceText}
          onChangeText={setSourceText}
          placeholder="Paste a passage, chat transcript, or video script to mine vocabulary from…"
          placeholderTextColor={C.textMuted}
          multiline
          style={{ minHeight: 100, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 12, color: C.textPrimary, textAlignVertical: 'top', fontSize: 15 }}
        />

        <TouchableOpacity
          onPress={handleGenerate}
          disabled={generateLoading || !sourceText.trim()}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: generateLoading || !sourceText.trim() ? 0.6 : 1 }}
        >
          {generateLoading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '700' }}>{cards.length ? 'Regenerate deck' : 'Generate flashcards'}</Text>}
        </TouchableOpacity>

        {cards.map((card, i) => (
          <FlashcardCard key={i} card={card} onPlay={handlePlay} audioLoading={audioLoading} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}