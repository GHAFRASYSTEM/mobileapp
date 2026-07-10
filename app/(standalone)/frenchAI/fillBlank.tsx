// app/(standalone)/frenchAI/fillBlank.tsx
//
// Fill-in-the-blank / sentence builder drills. Generates a set, then checks
// answers one at a time (per-exercise, not all-at-once — matches the
// backend's synchronous, no-AI-call check endpoint).

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

import { useColors } from '@/constants/Colors';
import {
  type CefrLevel,
  type FillBlankFocus,
  type FillBlankExercise,
  type FillBlankCheckResult,
} from '@/hooks/useFrenchAI/types';
import { useFillBlank } from '@/hooks/useFrenchAI/useFillBlank';

const LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const FOCI: FillBlankFocus[] = ['mixed', 'verb_tense', 'vocabulary', 'idiom', 'scrambled_sentence'];

export default function FillBlankScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const params = useLocalSearchParams<{ level?: string }>();

  const [level, setLevel] = useState<CefrLevel>((params.level as CefrLevel) || 'A1');
  const [focus, setFocus] = useState<FillBlankFocus>('mixed');
  const [exercises, setExercises] = useState<FillBlankExercise[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, FillBlankCheckResult>>({});

  const { generate, generateLoading, checkAnswer, checkLoading } = useFillBlank();

  const handleGenerate = async () => {
    setResults({});
    setUserAnswers({});
    const ex = await generate({ userLevel: level, focus, count: 5 });
    if (ex) setExercises(ex);
  };

  const handleCheck = async (ex: FillBlankExercise) => {
    const answer = userAnswers[ex.id] || '';
    if (!answer.trim()) return;
    const res = await checkAnswer(ex, answer.trim());
    if (res) setResults(prev => ({ ...prev, [ex.id]: res }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: C.header, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#fff', fontSize: 22 }}>‹</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>Fill in the Blank</Text>
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
          {FOCI.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setFocus(f)}
              style={{
                paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, borderWidth: 1,
                borderColor: f === focus ? C.primary : C.border,
                backgroundColor: f === focus ? C.primarySubtle : 'transparent',
              }}
            >
              <Text style={{ color: f === focus ? C.primary : C.textMuted, fontSize: 12, fontWeight: '600' }}>
                {f.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleGenerate}
          disabled={generateLoading}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: generateLoading ? 0.6 : 1 }}
        >
          {generateLoading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '700' }}>{exercises.length ? 'New set' : 'Generate drills'}</Text>}
        </TouchableOpacity>

        {exercises.map(ex => {
          const res = results[ex.id];
          return (
            <View key={ex.id} style={{ backgroundColor: C.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border, gap: 8 }}>
              <Text style={{ color: C.textPrimary, fontSize: 15 }}>{ex.prompt}</Text>

              {ex.options && ex.options.length > 0 ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {ex.options.map(opt => (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => setUserAnswers(prev => ({ ...prev, [ex.id]: opt }))}
                      style={{
                        paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1,
                        borderColor: userAnswers[ex.id] === opt ? C.primary : C.border,
                        backgroundColor: userAnswers[ex.id] === opt ? C.primarySubtle : 'transparent',
                      }}
                    >
                      <Text style={{ color: userAnswers[ex.id] === opt ? C.primary : C.textPrimary }}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <TextInput
                  value={userAnswers[ex.id] || ''}
                  onChangeText={v => setUserAnswers(prev => ({ ...prev, [ex.id]: v }))}
                  placeholder="Your answer…"
                  placeholderTextColor={C.textMuted}
                  style={{ borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 10, color: C.textPrimary }}
                />
              )}

              <TouchableOpacity
                onPress={() => handleCheck(ex)}
                disabled={checkLoading || !userAnswers[ex.id]?.trim()}
                style={{ alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: C.primarySubtle }}
              >
                <Text style={{ color: C.primary, fontWeight: '600', fontSize: 13 }}>Check</Text>
              </TouchableOpacity>

              {res && (
                <Text style={{ color: res.correct ? '#4caf6f' : '#e05252', fontSize: 13 }}>
                  {res.correct ? '✓ Correct!' : `✗ Correct answer: ${res.correctAnswer}`} — {res.explanation}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}