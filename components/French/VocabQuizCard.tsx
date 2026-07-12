import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as LegacyFS from 'expo-file-system/legacy';
import { useColors } from '@/constants/Colors';
import type { VocabQuizQuestion } from '@/hooks/useFrenchAI/types';

interface VocabQuizCardProps {
  question: VocabQuizQuestion;
  onAnswered?: (correct: boolean) => void;
}

export default function VocabQuizCard({ question, onAnswered }: VocabQuizCardProps) {
  const C = useColors();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);

  useEffect(() => {
    setSelectedIds([]);
    setSolved(false);
    setAudioFailed(false);
  }, [question.id]);

  // --- feedback animations: gentle shake on a wrong pick, a small pop on the correct one ---
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const solvedPanelAnim = useRef(new Animated.Value(0)).current;
  const pulseScales = useRef<Record<string, Animated.Value>>({}).current;
  const getPulseScale = (id: string) => {
    if (!pulseScales[id]) pulseScales[id] = new Animated.Value(1);
    return pulseScales[id];
  };

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 45, useNativeDriver: true }),
    ]).start();
  };

  const triggerPulse = (id: string) => {
    const scale = getPulseScale(id);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.04, duration: 110, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    if (solved) {
      solvedPanelAnim.setValue(0);
      Animated.timing(solvedPanelAnim, { toValue: 1, duration: 280, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
    }
  }, [solved]);

  const playAudio = async () => {
    if (!question.audioBase64 || playing) return;
    try {
      setPlaying(true);
      setAudioFailed(false);
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
      setAudioFailed(true);
    }
  };

  // Autoplay for EVERY question type as soon as it loads — the learner
  // shouldn't have to hunt for a play button on sentence_completion any
  // more than on listening_choice. Standard for audio-first drills. This
  // matters more than ever now: for sentence_completion, the audio is
  // synthesized from the CORRECT answer filled in, not the blanked prompt —
  // it's the actual source of truth for ambiguous cases (numbers, dates,
  // quantities), not just bonus listening practice.
  useEffect(() => {
    playAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const handleSelect = (optionId: string, correct: boolean) => {
    if (solved) return;
    setSelectedIds(prev => (prev.includes(optionId) ? prev : [...prev, optionId]));
    if (correct) {
      setSolved(true);
      triggerPulse(optionId);
      onAnswered?.(selectedIds.length === 0);
    } else {
      triggerShake();
      triggerPulse(optionId);
    }
  };

  const shakeTranslate = shakeAnim.interpolate({ inputRange: [-1, 0, 1], outputRange: [-6, 0, 6] });

  return (
    <View style={{ backgroundColor: C.surface, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: C.border, gap: 14 }}>
      {question.type === 'listening_choice' ? (
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ color: C.textMuted, fontSize: 11.5, fontWeight: '700', letterSpacing: 0.4 }}>LISTEN & CHOOSE</Text>
          <TouchableOpacity
            onPress={playAudio}
            disabled={playing}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="Play audio"
            style={{
              width: 68, height: 68, borderRadius: 34,
              backgroundColor: C.primarySubtle,
              alignItems: 'center', justifyContent: 'center',
              borderWidth: playing ? 0 : 1,
              borderColor: C.primary,
            }}
          >
            {playing
              ? <ActivityIndicator color={C.primary} />
              : <Ionicons name={audioFailed ? 'refresh' : 'volume-high'} size={28} color={C.primary} />}
          </TouchableOpacity>
          <Text style={{ color: audioFailed ? C.textDanger : C.textMuted, fontSize: 12 }}>
            {audioFailed ? "Couldn't play — tap to retry" : 'Tap to replay'}
          </Text>
        </View>
      ) : (
        <View style={{ gap: 8 }}>
          <Text style={{ color: C.textMuted, fontSize: 11.5, fontWeight: '700', letterSpacing: 0.4 }}>COMPLETE THE SENTENCE</Text>
          <Text style={{ color: C.textPrimary, fontSize: 17, lineHeight: 24 }}>{question.prompt}</Text>
          {!!question.audioBase64 && (
            <TouchableOpacity
              onPress={playAudio}
              disabled={playing}
              accessibilityRole="button"
              accessibilityLabel="Listen for the answer"
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
                backgroundColor: C.primarySubtle, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10,
              }}
            >
              {playing
                ? <ActivityIndicator size="small" color={C.primary} />
                : <Ionicons name={audioFailed ? 'refresh' : 'volume-medium-outline'} size={16} color={C.primary} />}
              <Text style={{ color: C.primary, fontSize: 12, fontWeight: '600' }}>
                {/* The blank often has more than one grammatically-fine fill
                    (numbers/dates/quantities especially) — text alone can't
                    disambiguate, so make clear the audio actually holds the
                    answer instead of implying "replay" is just a nice-to-have. */}
                {audioFailed ? "Couldn't play — tap to retry" : 'Listen — the answer is only in the audio'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Animated.View style={{ gap: 8, transform: [{ translateX: shakeTranslate }] }}>
        {question.options.map(opt => {
          const wasSelected = selectedIds.includes(opt.id);
          const showAsCorrect = wasSelected && opt.correct;
          const showAsWrong = wasSelected && !opt.correct;

          let borderColor = C.border;
          let backgroundColor = 'transparent';
          if (showAsCorrect) { borderColor = C.statusValid; backgroundColor = C.primarySubtle; }
          else if (showAsWrong) { borderColor = C.statusExpired; backgroundColor = C.dangerSubtle; }

          return (
            <View key={opt.id}>
              <Animated.View style={{ transform: [{ scale: getPulseScale(opt.id) }] }}>
                <TouchableOpacity
                  onPress={() => handleSelect(opt.id, opt.correct)}
                  disabled={solved}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityState={{ selected: wasSelected, disabled: solved }}
                  accessibilityLabel={`${opt.text}${opt.englishHint ? `, ${opt.englishHint}` : ''}`}
                  style={{
                    borderWidth: 1.5, borderColor, backgroundColor,
                    borderRadius: 12, paddingVertical: 13, paddingHorizontal: 14,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, flexShrink: 1 }}>
                    <Text style={{ color: C.textPrimary, fontSize: 15, fontWeight: showAsCorrect ? '700' : '500' }}>
                      {opt.text}
                    </Text>
                    {/* English gloss — critical for numbers (e.g. "quatre-vingts (80)")
                        so the learner knows exactly what they picked. */}
                    {!!opt.englishHint && (
                      <Text style={{ color: C.textMuted, fontSize: 12 }}>{opt.englishHint}</Text>
                    )}
                  </View>
                  {showAsCorrect && <Ionicons name="checkmark-circle" size={19} color={C.statusValid} />}
                  {showAsWrong && <Ionicons name="close-circle" size={19} color={C.statusExpired} />}
                </TouchableOpacity>
              </Animated.View>

              {showAsWrong && !!opt.wrongExplanation && (
                <Text style={{ color: C.textDanger, fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                  {opt.wrongExplanation}
                </Text>
              )}
            </View>
          );
        })}
      </Animated.View>

      {selectedIds.length > 0 && !solved && (
        <View style={{ flexDirection: 'row', gap: 4, alignSelf: 'center' }}>
          {selectedIds.map((id, i) => (
            <View key={id} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.statusExpired }} />
          ))}
        </View>
      )}

      {solved && (
        <Animated.View
          style={{
            gap: 10, opacity: solvedPanelAnim,
            transform: [{ translateY: solvedPanelAnim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Ionicons
              name={selectedIds.length === 1 ? 'flash' : 'checkmark-circle'}
              size={15}
              color={C.statusValid}
            />
            <Text style={{ color: C.statusValid, fontSize: 13, fontWeight: '700', textAlign: 'center' }}>
              {selectedIds.length === 1 ? 'Nice — first try!' : 'Got it!'}
            </Text>
          </View>

          {/* Speaking practice: not audio the learner hears, but a sentence
              they produce themselves — the point is output, not input. */}
          {!!question.sayItOutLoud && (
            <View style={{ backgroundColor: C.primarySubtle, borderRadius: 12, padding: 13, gap: 5, borderWidth: 1, borderColor: C.primary + '30' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="mic-outline" size={14} color={C.primary} />
                <Text style={{ color: C.primary, fontSize: 11, fontWeight: '700', letterSpacing: 0.3 }}>NOW SAY IT OUT LOUD</Text>
              </View>
              <Text style={{ color: C.textPrimary, fontSize: 15, lineHeight: 21 }}>
                {question.sayItOutLoud}
              </Text>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}