// components/French/VocabQuizCard.tsx
//
// Renders one Vocab Quiz question — either "listening_choice" (audio plays,
// pick which word was said) or "sentence_completion" (sentence with a blank,
// pick the word that fits). Tapping a wrong option shows its explanation
// inline instead of just marking it red; tapping the correct option locks
// the question and shows a success state. No network call needed to grade —
// the question already carries `correct`/`wrongExplanation` per option.

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as LegacyFS from 'expo-file-system/legacy';
import { useColors } from '@/constants/Colors';
import type { VocabQuizQuestion } from '@/hooks/useFrenchAI/types';

interface VocabQuizCardProps {
  question: VocabQuizQuestion;
  /** Called once, the first time the learner picks the correct option. */
  onAnswered?: (correct: boolean) => void;
}

export default function VocabQuizCard({ question, onAnswered }: VocabQuizCardProps) {
  const C = useColors();
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // every option tapped so far, in order
  const [solved, setSolved] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Reset local state whenever a new question is shown.
  useEffect(() => {
    setSelectedIds([]);
    setSolved(false);
  }, [question.id]);

  const playAudio = async () => {
    if (!question.audioBase64 || playing) return;
    try {
      setPlaying(true);
      const fileUri = `${LegacyFS.cacheDirectory}vocab-quiz-${question.id}.mp3`;
      await LegacyFS.writeAsStringAsync(fileUri, question.audioBase64, {
        encoding: LegacyFS.EncodingType.Base64,
      });
      const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
      sound.setOnPlaybackStatusUpdate(status => {
        if ('didJustFinish' in status && status.didJustFinish) {
          setPlaying(false);
          sound.unloadAsync();
        }
      });
      await sound.playAsync();
    } catch (e) {
      console.error('Vocab quiz audio playback error:', e);
      setPlaying(false);
    }
  };

  // Auto-play once when a listening_choice question first appears — the
  // learner shouldn't have to hunt for the play button to even start.
  useEffect(() => {
    if (question.type === 'listening_choice') playAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const handleSelect = (optionId: string, correct: boolean) => {
    if (solved) return; // question is done once the correct answer is found
    setSelectedIds(prev => (prev.includes(optionId) ? prev : [...prev, optionId]));
    if (correct) {
      setSolved(true);
      onAnswered?.(selectedIds.length === 0); // "correct" here means first-try
    }
  };

  return (
    <View style={{ backgroundColor: C.surface, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: C.border, gap: 14 }}>
      {/* Prompt */}
      {question.type === 'listening_choice' ? (
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ color: C.textMuted, fontSize: 12, fontWeight: '600' }}>LISTEN & CHOOSE</Text>
          <TouchableOpacity
            onPress={playAudio}
            disabled={playing}
            style={{
              width: 64, height: 64, borderRadius: 32,
              backgroundColor: C.primarySubtle,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {playing
              ? <ActivityIndicator color={C.primary} />
              : <Ionicons name="volume-high" size={28} color={C.primary} />}
          </TouchableOpacity>
          <Text style={{ color: C.textMuted, fontSize: 12 }}>Tap to replay</Text>
        </View>
      ) : (
        <View style={{ gap: 8 }}>
          <Text style={{ color: C.textMuted, fontSize: 12, fontWeight: '600' }}>COMPLETE THE SENTENCE</Text>
          <Text style={{ color: C.textPrimary, fontSize: 17, lineHeight: 24 }}>{question.prompt}</Text>
          {!!question.audioBase64 && (
            <TouchableOpacity
              onPress={playAudio}
              disabled={playing}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' }}
            >
              {playing
                ? <ActivityIndicator size="small" color={C.primary} />
                : <Ionicons name="volume-medium-outline" size={16} color={C.primary} />}
              <Text style={{ color: C.primary, fontSize: 12 }}>Hear sentence</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Options */}
      <View style={{ gap: 8 }}>
        {question.options.map(opt => {
          const wasSelected = selectedIds.includes(opt.id);
          const showAsCorrect = wasSelected && opt.correct;
          const showAsWrong = wasSelected && !opt.correct;

          let borderColor = C.border;
          let backgroundColor = 'transparent';
          if (showAsCorrect) { borderColor = '#22c55e'; backgroundColor = 'rgba(34,197,94,0.12)'; }
          else if (showAsWrong) { borderColor = '#ef4444'; backgroundColor = 'rgba(239,68,68,0.10)'; }

          return (
            <View key={opt.id}>
              <TouchableOpacity
                onPress={() => handleSelect(opt.id, opt.correct)}
                disabled={solved && !showAsCorrect}
                style={{
                  borderWidth: 1.5, borderColor, backgroundColor,
                  borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14,
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: C.textPrimary, fontSize: 15, fontWeight: showAsCorrect ? '700' : '500' }}>
                  {opt.text}
                </Text>
                {showAsCorrect && <Ionicons name="checkmark-circle" size={18} color="#22c55e" />}
                {showAsWrong && <Ionicons name="close-circle" size={18} color="#ef4444" />}
              </TouchableOpacity>

              {/* Inline "why it's wrong" — the whole point: not just red, an actual explanation */}
              {showAsWrong && !!opt.wrongExplanation && (
                <Text style={{ color: '#ef4444', fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                  {opt.wrongExplanation}
                </Text>
              )}
            </View>
          );
        })}
      </View>

      {solved && (
        <Text style={{ color: '#22c55e', fontSize: 13, fontWeight: '600', textAlign: 'center' }}>
          {selectedIds.length === 1 ? 'Nice — first try! 🎉' : 'Got it! ✅'}
        </Text>
      )}
    </View>
  );
}