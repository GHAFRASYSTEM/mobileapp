// app/(standalone)/frenchAI/flashcards.tsx
//
// AI Flashcards mined from real content. Since there's no shared store of
// past conversation/roleplay/reading transcripts wired up yet, the user
// pastes or picks source text here — swap the `items` builder below for
// real history once that's available (e.g. pull last N chat turns).

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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';

import { useColors } from '@/constants/Colors';
import {
  type CefrLevel,
  type Flashcard,
  type FlashcardSourceType,
} from '@/hooks/useFrenchAI/types';
import { useFlashcards } from '@/hooks/useFrenchAI/useFlashcards';

const LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const SOURCE_TYPES: FlashcardSourceType[] = ['conversation', 'roleplay', 'reading', 'video'];

export default function FlashcardsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const params = useLocalSearchParams<{ level?: string }>();

  const [level, setLevel] = useState<CefrLevel>((params.level as CefrLevel) || 'A1');
  const [sourceType, setSourceType] = useState<FlashcardSourceType>('reading');
  const [sourceText, setSourceText] = useState('');
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const { generate, generateLoading, synthesizeAudio, audioLoading } = useFlashcards();

  const handleGenerate = async () => {
    if (!sourceText.trim()) return;
    const result = await generate({
      items: [{ sourceType, text: sourceText.trim() }],
      userLevel: level,
      count: 8,
    });
    if (result) {
      setCards(result);
      setFlipped({});
    }
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

      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: C.header, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#fff', fontSize: 22 }}>‹</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>AI Flashcards</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {LEVELS.map(l => (
            <TouchableOpacity
              key={l}
              onPress={() => setLevel(l)}
              style={{
                paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1,
                borderColor: l === level ? C.primary : C.border,
                backgroundColor: l === level ? C.primarySubtle : 'transparent',
              }}
            >
              <Text style={{ color: l === level ? C.primary : C.textMuted, fontWeight: '600', fontSize: 13 }}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
          style={{ minHeight: 100, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 12, color: C.textPrimary,textAlignVertical: 'top', fontSize: 15 }}
        />

        <TouchableOpacity
          onPress={handleGenerate}
          disabled={generateLoading || !sourceText.trim()}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: generateLoading || !sourceText.trim() ? 0.6 : 1 }}
        >
          {generateLoading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '700' }}>{cards.length ? 'Regenerate deck' : 'Generate flashcards'}</Text>}
        </TouchableOpacity>

        {cards.map((card, i) => {
          const isFlipped = !!flipped[i];
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.85}
              onPress={() => setFlipped(prev => ({ ...prev, [i]: !prev[i] }))}
              style={{ backgroundColor: C.surface, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: C.border, minHeight: 140, justifyContent: 'center' }}
            >
              {!isFlipped ? (
                <View style={{ alignItems: 'center', gap: 6 }}>
                  <Text style={{ color: C.textPrimary,fontSize: 22, fontWeight: '700' }}>{card.word}</Text>
                  <Text style={{ color: C.textMuted, fontSize: 13 }}>{card.pronunciation}</Text>
                  <TouchableOpacity
                    onPress={() => handlePlay(card.word)}
                    disabled={audioLoading}
                    style={{ marginTop: 8, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, backgroundColor: C.primarySubtle }}
                  >
                    <Text style={{ color: C.primary }}>🔊 Play</Text>
                  </TouchableOpacity>
                  <Text style={{ color: C.textMuted, fontSize: 11, marginTop: 6 }}>Tap to flip</Text>
                </View>
              ) : (
                <View style={{ gap: 6 }}>
                  <Text style={{ color: C.textPrimary, fontWeight: '700' }}>{card.meaning}</Text>
                  <Text style={{ color: C.textSecondary, fontStyle: 'italic' }}>{card.exampleSentence}</Text>
                  <Text style={{ color: C.textMuted, fontSize: 13 }}>{card.exampleSentenceTranslation}</Text>
                  <Text style={{ color: C.primary, marginTop: 6 }}>💬 {card.followUpQuestion}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}