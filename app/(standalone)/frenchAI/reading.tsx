// app/(standalone)/frenchAI/reading.tsx
//
// Reading comprehension: generate a passage + mixed questions, collect
// answers, grade them. correctAnswer for MCQ/vocab_in_context rides along
// in the exercise object (no server-side store yet — see backend TODO),
// so we just send the whole exercise back alongside the user's answers.

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
  type ReadingExercise,
  type ReadingAnswerResult,
} from '@/hooks/useFrenchAI/types';
import { useReadingComprehension } from '@/hooks/useFrenchAI/useReadingComprehension';

const LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function ReadingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const params = useLocalSearchParams<{ level?: string }>();

  const [level, setLevel] = useState<CefrLevel>((params.level as CefrLevel) || 'A1');
  const [exercise, setExercise] = useState<ReadingExercise | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReadingAnswerResult | null>(null);

  const { generate, generateLoading, grade, gradeLoading } = useReadingComprehension();

  const handleGenerate = async () => {
    setResult(null);
    setAnswers({});
    const ex = await generate({ userLevel: level });
    if (ex) setExercise(ex);
  };

  const handleGrade = async () => {
    if (!exercise) return;
    const res = await grade({ exercise, userLevel: level, userAnswers: answers });
    if (res) setResult(res);
  };

  const setAnswer = (id: string, value: string) => setAnswers(prev => ({ ...prev, [id]: value }));

  const feedbackFor = (id: string) => result?.results.find(r => r.questionId === id);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: C.header, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#fff', fontSize: 22 }}>‹</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>Reading Comprehension</Text>
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

        <TouchableOpacity
          onPress={handleGenerate}
          disabled={generateLoading}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: generateLoading ? 0.6 : 1 }}
        >
          {generateLoading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '700' }}>{exercise ? 'New passage' : 'Generate exercise'}</Text>}
        </TouchableOpacity>

        {exercise && (
          <>
            <View style={{ backgroundColor: C.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border }}>
              <Text style={{ color: C.textPrimary, fontSize: 15, lineHeight: 22 }}>{exercise.passage}</Text>
            </View>

            {exercise.vocabHighlights.length > 0 && (
              <View style={{ backgroundColor: C.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border }}>
                <Text style={{ color: C.textPrimary, fontWeight: '700', marginBottom: 8 }}>Vocabulary</Text>
                {exercise.vocabHighlights.map((v, i) => (
                  <Text key={i} style={{ color: C.textSecondary, marginBottom: 4 }}>
                    <Text style={{ fontWeight: '700', color: C.textPrimary }}>{v.word}</Text> — {v.meaning}
                  </Text>
                ))}
              </View>
            )}

            {exercise.questions.map(q => {
              const fb = feedbackFor(q.id);
              return (
                <View key={q.id} style={{ gap: 8 }}>
                  <Text style={{ color: C.textPrimary, fontWeight: '600' }}>{q.question}</Text>

                  {q.type === 'multiple_choice' && q.options ? (
                    <View style={{ gap: 6 }}>
                      {q.options.map(opt => (
                        <TouchableOpacity
                          key={opt}
                          onPress={() => setAnswer(q.id, opt)}
                          style={{
                            padding: 10, borderRadius: 10, borderWidth: 1,
                            borderColor: answers[q.id] === opt ? C.primary : C.border,
                            backgroundColor: answers[q.id] === opt ? C.primarySubtle : 'transparent',
                          }}
                        >
                          <Text style={{ color: answers[q.id] === opt ? C.primary : C.textPrimary }}>{opt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <TextInput
                      value={answers[q.id] || ''}
                      onChangeText={v => setAnswer(q.id, v)}
                      placeholder="Your answer…"
                      placeholderTextColor={C.textMuted}
                      multiline={q.type === 'summary'}
                      style={{ borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 10, color: C.textPrimary }}
                    />
                  )}

                  {fb && (
                    <Text style={{ color: fb.correct ? '#4caf6f' : '#e05252', fontSize: 13 }}>
                      {fb.correct ? '✓' : '✗'} {fb.feedback}
                      {fb.modelAnswer ? `  (Model: ${fb.modelAnswer})` : ''}
                    </Text>
                  )}
                </View>
              );
            })}

            <TouchableOpacity
              onPress={handleGrade}
              disabled={gradeLoading}
              style={{ backgroundColor: C.primarySubtle, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: gradeLoading ? 0.6 : 1 }}
            >
              {gradeLoading ? <ActivityIndicator color={C.primary} /> : <Text style={{ color: C.primary, fontWeight: '700' }}>Grade my answers</Text>}
            </TouchableOpacity>

            {result && (
              <View style={{ alignItems: 'center', gap: 4 }}>
                <Text style={{ color: C.textPrimary, fontWeight: '700', fontSize: 16 }}>Score: {result.overallScore}/100</Text>
                <Text style={{ color: C.textSecondary, textAlign: 'center' }}>{result.overallFeedback}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}