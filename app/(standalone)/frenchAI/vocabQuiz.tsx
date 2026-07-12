import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
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

const QUESTION_TYPE_FILTERS: { key: VocabQuizQuestionType | 'mixed'; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'mixed',               label: 'Mixed',                icon: 'shuffle' },
  { key: 'listening_choice',    label: 'Listen & Choose',      icon: 'headset-outline' },
  { key: 'sentence_completion', label: 'Complete the Sentence', icon: 'create-outline' },
];

// Standard run lengths — short for a quick review, long for a proper drill
// session, each labeled so the choice is legible at a glance.
const QUESTION_COUNT_OPTIONS: { value: 5 | 7 | 10; label: string; sub: string }[] = [
  { value: 5,  label: 'Quick',    sub: '5 questions' },
  { value: 7,  label: 'Standard', sub: '7 questions' },
  { value: 10, label: 'Deep dive', sub: '10 questions' },
];

// Fisher-Yates shuffle of the options array for a single question. Applied
// client-side as a safety net so the correct answer is never predictably
// in the same slot, regardless of what the model produced.
function shuffleOptions(q: VocabQuizQuestion): VocabQuizQuestion {
  const opts = [...q.options];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return { ...q, options: opts };
}

export default function VocabQuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const { level } = useFrenchAIContext();

  const [category, setCategory] = useState<VocabCategory>('numbers');
  const [typeFilter, setTypeFilter] = useState<VocabQuizQuestionType | 'mixed'>('mixed');
  const [count, setCount] = useState<5 | 7 | 10>(5);
  const [questions, setQuestions] = useState<VocabQuizQuestion[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [genError, setGenError] = useState(false);

  const { generate, loading } = useVocabQuiz();

  const questionTypes = useMemo<VocabQuizQuestionType[]>(
    () => (typeFilter === 'mixed' ? ['listening_choice', 'sentence_completion'] : [typeFilter]),
    [typeFilter],
  );

  // --- animation: question card fades + slides in on change, progress bar eases smoothly ---
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardOffset = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const isQuizDone = questions.length > 0 && activeIdx >= questions.length;
  const activeQuestion = questions[activeIdx];
  const progress = questions.length > 0 ? Math.min(activeIdx, questions.length) / questions.length : 0;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: isQuizDone ? 1 : progress,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, isQuizDone]);

  useEffect(() => {
    if (!activeQuestion) return;
    cardOpacity.setValue(0);
    cardOffset.setValue(12);
    Animated.parallel([
      Animated.timing(cardOpacity, { toValue: 1, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(cardOffset, { toValue: 0, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  }, [activeQuestion?.id]);

  const handleGenerate = async () => {
    setGenError(false);
    const result = await generate({
      category,
      userLevel: level,
      count,
      questionTypes,
    });
    if (result && result.length > 0) {
      setQuestions(result.map(shuffleOptions));
      setActiveIdx(0);
      setFirstTryCorrect(0);
      setAnsweredCount(0);
    } else {
      setGenError(true);
    }
  };

  const handleAnswered = (correct: boolean) => {
    setAnsweredCount(c => c + 1);
    if (correct) setFirstTryCorrect(c => c + 1);
  };

  const handleBack = () => {
    const inProgress = questions.length > 0 && !isQuizDone && answeredCount > 0;
    if (!inProgress) {
      router.back();
      return;
    }
    Alert.alert(
      'Leave quiz?',
      `You've answered ${answeredCount} of ${questions.length} questions. Your progress won't be saved.`,
      [
        { text: 'Keep going', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: () => router.back() },
      ],
    );
  };

  const scorePct = questions.length > 0 ? firstTryCorrect / questions.length : 0;
  const resultTone =
    scorePct >= 0.8 ? { color: C.primary, bg: C.primarySubtle, label: 'Excellent!', icon: 'trophy' as const }
    : scorePct >= 0.5 ? { color: '#B8860B', bg: C.goldSubtle, label: 'Good effort!', icon: 'ribbon' as const }
    : { color: C.textDanger, bg: C.dangerSubtle, label: 'Keep practicing', icon: 'refresh-circle' as const };

  const selectedCategory = VOCAB_CATEGORIES.find(c => c.key === category);

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader
        paddingTop={insets.top}
        title="Vocab Quiz"
        subtitle={
          questions.length > 0 && !isQuizDone
            ? `${selectedCategory?.emoji ?? ''} ${selectedCategory?.label ?? ''}`.trim()
            : 'Pick a topic, then listen and answer'
        }
        onBack={handleBack}
      />

      {/* Persistent progress bar while a quiz is active */}
      {questions.length > 0 && (
        <View style={{ height: 4, backgroundColor: C.border }}>
          <Animated.View
            style={{
              height: 4,
              backgroundColor: isQuizDone ? resultTone.color : C.primary,
              width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            }}
          />
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
        {questions.length === 0 && (
          <>
            <View style={{ gap: 4 }}>
              <Text style={{ color: C.textPrimary, fontWeight: '700', fontSize: 17 }}>Choose a topic</Text>
              <Text style={{ color: C.textMuted, fontSize: 13 }}>What do you want to practice today?</Text>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {VOCAB_CATEGORIES.map(cat => {
                const selected = cat.key === category;
                return (
                  <TouchableOpacity
                    key={cat.key}
                    onPress={() => setCategory(cat.key)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`${cat.label} category`}
                    hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                    style={{
                      width: '31%',
                      flexGrow: 0,
                      flexShrink: 0,
                      paddingHorizontal: 8,
                      paddingVertical: 14,
                      borderRadius: 16,
                      borderWidth: selected ? 1.5 : 1,
                      borderColor: selected ? C.primary : C.border,
                      backgroundColor: selected ? C.primarySubtle : C.surface,
                      alignItems: 'center',
                      gap: 6,
                      shadowColor: '#000',
                      shadowOpacity: selected ? 0.06 : 0,
                      shadowRadius: 6,
                      shadowOffset: { width: 0, height: 2 },
                    }}
                  >
                    {selected && (
                      <View style={{ position: 'absolute', top: 6, right: 6 }}>
                        <Ionicons name="checkmark-circle" size={16} color={C.primary} />
                      </View>
                    )}
                    <Text style={{ fontSize: 20 }}>{cat.emoji}</Text>
                    <Text
                      numberOfLines={2}
                      style={{ color: selected ? C.primary : C.textSecondary, fontSize: 11.5, fontWeight: '600', textAlign: 'center', lineHeight: 14 }}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ gap: 4, marginTop: 4 }}>
              <Text style={{ color: C.textPrimary, fontWeight: '700', fontSize: 17 }}>Question style</Text>
              <Text style={{ color: C.textMuted, fontSize: 13 }}>How should we quiz you?</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {QUESTION_TYPE_FILTERS.map(f => {
                const selected = f.key === typeFilter;
                return (
                  <TouchableOpacity
                    key={f.key}
                    onPress={() => setTypeFilter(f.key)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      paddingHorizontal: 6,
                      borderRadius: 14,
                      borderWidth: selected ? 1.5 : 1,
                      alignItems: 'center',
                      gap: 6,
                      borderColor: selected ? C.primary : C.border,
                      backgroundColor: selected ? C.primarySubtle : C.surface,
                    }}
                  >
                    <Ionicons name={f.icon} size={18} color={selected ? C.primary : C.textMuted} />
                    <Text style={{ color: selected ? C.primary : C.textMuted, fontSize: 11.5, fontWeight: '600', textAlign: 'center' }}>
                      {f.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ gap: 4, marginTop: 4 }}>
              <Text style={{ color: C.textPrimary, fontWeight: '700', fontSize: 17 }}>How many questions?</Text>
              <Text style={{ color: C.textMuted, fontSize: 13 }}>You can always run another round after.</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {QUESTION_COUNT_OPTIONS.map(opt => {
                const selected = opt.value === count;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setCount(opt.value)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      borderRadius: 14,
                      borderWidth: selected ? 1.5 : 1,
                      alignItems: 'center',
                      gap: 2,
                      borderColor: selected ? C.primary : C.border,
                      backgroundColor: selected ? C.primarySubtle : C.surface,
                    }}
                  >
                    <Text style={{ color: selected ? C.primary : C.textPrimary, fontSize: 13, fontWeight: '700' }}>
                      {opt.label}
                    </Text>
                    <Text style={{ color: selected ? C.primary : C.textMuted, fontSize: 11 }}>
                      {opt.sub}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {genError && (
              <View
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 8,
                  backgroundColor: C.dangerSubtle, borderRadius: 12, padding: 12,
                }}
              >
                <Ionicons name="alert-circle" size={18} color={C.textDanger} />
                <Text style={{ color: C.textDanger, fontSize: 12.5, flex: 1 }}>
                  Couldn't generate a quiz just now. Please try again.
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleGenerate}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Start quiz"
              style={{
                backgroundColor: C.primary, borderRadius: 14, paddingVertical: 15,
                alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8,
                opacity: loading ? 0.7 : 1, marginTop: 8,
                shadowColor: C.primary, shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
              }}
            >
              {loading
                ? (
                  <>
                    <ActivityIndicator color="#fff" />
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Building your quiz…</Text>
                  </>
                )
                : (
                  <>
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Start quiz</Text>
                    <Ionicons name="play" size={16} color="#fff" />
                  </>
                )}
            </TouchableOpacity>
          </>
        )}

        {questions.length > 0 && !isQuizDone && activeQuestion && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 6,
                  backgroundColor: C.surface, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                  borderWidth: 1, borderColor: C.border,
                }}
              >
                <Text style={{ color: C.textSecondary, fontSize: 12, fontWeight: '600' }}>
                  {activeIdx + 1} / {questions.length}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 5,
                  backgroundColor: C.goldSubtle, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                }}
              >
                <Ionicons name="star" size={12} color="#B8860B" />
                <Text style={{ color: '#8A6500', fontSize: 12, fontWeight: '700' }}>
                  {firstTryCorrect}/{answeredCount || 0}
                </Text>
              </View>
            </View>

            <Animated.View style={{ opacity: cardOpacity, transform: [{ translateY: cardOffset }] }}>
              <VocabQuizCard
                key={activeQuestion.id}
                question={activeQuestion}
                onAnswered={handleAnswered}
              />
            </Animated.View>

            <TouchableOpacity
              onPress={() => setActiveIdx(i => i + 1)}
              accessibilityRole="button"
              accessibilityLabel={activeIdx === questions.length - 1 ? 'Finish quiz' : 'Next question'}
              style={{
                backgroundColor: C.primarySubtle, borderRadius: 14, paddingVertical: 13,
                alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6,
              }}
            >
              <Text style={{ color: C.primary, fontWeight: '700', fontSize: 14.5 }}>
                {activeIdx === questions.length - 1 ? 'Finish' : 'Next question'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={C.primary} />
            </TouchableOpacity>
          </>
        )}

        {isQuizDone && (
          <View style={{ alignItems: 'center', gap: 14, paddingVertical: 20 }}>
            <View
              style={{
                width: 96, height: 96, borderRadius: 48,
                backgroundColor: resultTone.bg, alignItems: 'center', justifyContent: 'center',
                borderWidth: 2, borderColor: resultTone.color,
              }}
            >
              <Ionicons name={resultTone.icon} size={40} color={resultTone.color} />
            </View>

            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text style={{ color: resultTone.color, fontSize: 15, fontWeight: '700' }}>
                {resultTone.label}
              </Text>
              <Text style={{ color: C.textPrimary, fontSize: 26, fontWeight: '800' }}>
                {firstTryCorrect}/{questions.length}
              </Text>
              <Text style={{ color: C.textMuted, fontSize: 13 }}>
                first-try correct · {Math.round(scorePct * 100)}%
              </Text>
            </View>

            {/* score bar */}
            <View style={{ width: '100%', height: 8, borderRadius: 4, backgroundColor: C.border, overflow: 'hidden' }}>
              <View
                style={{
                  height: '100%',
                  width: `${Math.round(scorePct * 100)}%`,
                  backgroundColor: resultTone.color,
                  borderRadius: 4,
                }}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 8, width: '100%' }}>
              <TouchableOpacity
                onPress={handleGenerate}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Try again with the same settings"
                style={{
                  flex: 1, backgroundColor: C.primary, borderRadius: 14, paddingVertical: 13,
                  alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : (
                    <>
                      <Ionicons name="refresh" size={16} color="#fff" />
                      <Text style={{ color: '#fff', fontWeight: '700' }}>Try again</Text>
                    </>
                  )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setQuestions([]); setGenError(false); }}
                accessibilityRole="button"
                accessibilityLabel="Choose a new topic"
                style={{
                  flex: 1, borderRadius: 14, paddingVertical: 13, flexDirection: 'row',
                  alignItems: 'center', justifyContent: 'center', gap: 6,
                  borderWidth: 1, borderColor: C.border,
                }}
              >
                <Ionicons name="grid-outline" size={16} color={C.textPrimary} />
                <Text style={{ color: C.textPrimary, fontWeight: '700' }}>New topic</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}