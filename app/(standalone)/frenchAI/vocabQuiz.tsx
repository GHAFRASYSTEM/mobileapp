// app/(standalone)/frenchAI/vocabQuiz.tsx
//
// Category-driven, audio-first vocab quiz. Pick a topic (Numbers, Verbs,
// Electrical Appliances, ...) and get a run of Listen & Choose / Complete
// the Sentence questions. Grading is entirely client-side — VocabQuizCard
// already has the correct answer and wrong-answer explanations baked in.

import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import VocabQuizCard from '@/components/French/VocabQuizCard';
import { useFrenchAIContext } from '@/context/FrenchAIContext';
import { VOCAB_CATEGORIES, type VocabCategory, type VocabQuizQuestion, type VocabQuizQuestionType } from '@/hooks/useFrenchAI/types';
import { useVocabQuiz } from '@/hooks/useFrenchAI/useVocabQuiz';

const QUESTION_TYPE_FILTERS: { key: VocabQuizQuestionType | 'mixed'; label: string }[] = [
  { key: 'mixed',               label: 'Mixed' },
  { key: 'listening_choice',    label: 'Listen & Choose' },
  { key: 'sentence_completion', label: 'Complete the Sentence' },
];

export default function VocabQuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const { level } = useFrenchAIContext();

  const [category, setCategory] = useState<VocabCategory>('numbers');
  const [typeFilter, setTypeFilter] = useState<VocabQuizQuestionType | 'mixed'>('mixed');
  const [questions, setQuestions] = useState<VocabQuizQuestion[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const { generate, loading } = useVocabQuiz();

  const questionTypes = useMemo<VocabQuizQuestionType[]>(
    () => (typeFilter === 'mixed' ? ['listening_choice', 'sentence_completion'] : [typeFilter]),
    [typeFilter],
  );

  const handleGenerate = async () => {
    const result = await generate({
      category,
      userLevel: level,
      count: 6,
      questionTypes,
    });
    if (result) {
      setQuestions(result);
      setActiveIdx(0);
      setFirstTryCorrect(0);
      setAnsweredCount(0);
    }
  };

  const handleAnswered = (correct: boolean) => {
    setAnsweredCount(c => c + 1);
    if (correct) setFirstTryCorrect(c => c + 1);
  };

  const isQuizDone = questions.length > 0 && activeIdx >= questions.length;
  const activeQuestion = questions[activeIdx];

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader paddingTop={insets.top} title="Vocab Quiz" subtitle="Pick a topic, then listen and answer" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* ── Setup: category + type picker ─────────────────────────────── */}
        {questions.length === 0 && (
          <>
            <Text style={{ color: C.textPrimary, fontWeight: '700', fontSize: 15 }}>Choose a topic</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {VOCAB_CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setCategory(cat.key)}
                  style={{
                    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, borderWidth: 1,
                    borderColor: cat.key === category ? C.primary : C.border,
                    backgroundColor: cat.key === category ? C.primarySubtle : 'transparent',
                    flexDirection: 'row', alignItems: 'center', gap: 6,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>{cat.emoji}</Text>
                  <Text style={{ color: cat.key === category ? C.primary : C.textMuted, fontSize: 13, fontWeight: '600' }}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={{ color: C.textPrimary, fontWeight: '700', fontSize: 15, marginTop: 8 }}>Question style</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {QUESTION_TYPE_FILTERS.map(f => (
                <TouchableOpacity
                  key={f.key}
                  onPress={() => setTypeFilter(f.key)}
                  style={{
                    flex: 1, paddingVertical: 8, borderRadius: 12, borderWidth: 1, alignItems: 'center',
                    borderColor: f.key === typeFilter ? C.primary : C.border,
                    backgroundColor: f.key === typeFilter ? C.primarySubtle : 'transparent',
                  }}
                >
                  <Text style={{ color: f.key === typeFilter ? C.primary : C.textMuted, fontSize: 12, fontWeight: '600' }}>
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={handleGenerate}
              disabled={loading}
              style={{
                backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14,
                alignItems: 'center', opacity: loading ? 0.6 : 1, marginTop: 8,
              }}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={{ color: '#fff', fontWeight: '700' }}>Start quiz</Text>}
            </TouchableOpacity>
          </>
        )}

        {/* ── In-progress quiz ───────────────────────────────────────────── */}
        {questions.length > 0 && !isQuizDone && activeQuestion && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: C.textMuted, fontSize: 12, fontWeight: '600' }}>
                Question {activeIdx + 1} of {questions.length}
              </Text>
              <Text style={{ color: C.textMuted, fontSize: 12 }}>
                {firstTryCorrect}/{answeredCount || 0} first-try
              </Text>
            </View>

            <VocabQuizCard
              key={activeQuestion.id}
              question={activeQuestion}
              onAnswered={handleAnswered}
            />

            <TouchableOpacity
              onPress={() => setActiveIdx(i => i + 1)}
              style={{
                backgroundColor: C.primarySubtle, borderRadius: 12, paddingVertical: 12,
                alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6,
              }}
            >
              <Text style={{ color: C.primary, fontWeight: '700' }}>
                {activeIdx === questions.length - 1 ? 'Finish' : 'Next question'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={C.primary} />
            </TouchableOpacity>
          </>
        )}

        {/* ── Done ────────────────────────────────────────────────────────── */}
        {isQuizDone && (
          <View style={{ alignItems: 'center', gap: 12, paddingVertical: 24 }}>
            <Text style={{ fontSize: 40 }}>🎉</Text>
            <Text style={{ color: C.textPrimary, fontSize: 18, fontWeight: '700' }}>
              {firstTryCorrect}/{questions.length} first-try
            </Text>
            <Text style={{ color: C.textMuted, fontSize: 13, textAlign: 'center' }}>
              Nice work! Try another topic or run this one again.
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
              <TouchableOpacity
                onPress={handleGenerate}
                style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20 }}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>Try again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setQuestions([])}
                style={{ borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, borderWidth: 1, borderColor: C.border }}
              >
                <Text style={{ color: C.textPrimary, fontWeight: '700' }}>New topic</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}