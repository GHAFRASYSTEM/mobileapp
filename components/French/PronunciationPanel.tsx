/**
 * PronunciationPanel.tsx
 *
 * Dynamic phrase rotation per level + full scoring flow.
 * Supports light + dark mode via useColors().
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import type { ScoreResult } from '@/hooks/useFrenchAI';

// ── ScoreRing ─────────────────────────────────────────────────────────────────
function ScoreRing({ score, feedback, wordScores }: ScoreResult) {
  const C      = useColors();
  const color  = score >= 80 ? C.statusValid : score >= 60 ? C.gold : C.danger;
  const animVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animVal, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [score]);

  return (
    <Animated.View style={[scoreStyles.wrap, { opacity: animVal }]}>
      <View style={[scoreStyles.ring, { borderColor: color }]}>
        <Text style={[scoreStyles.num, { color }]}>{score}</Text>
        <Text style={[scoreStyles.pct, { color: C.textMuted }]}>/ 100</Text>
      </View>

      <Text style={[scoreStyles.feedback, { color: C.textSecondary }]}>{feedback}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={scoreStyles.words}>
          {wordScores.map((w, i) => (
            <View
              key={i}
              style={[
                scoreStyles.word,
                { backgroundColor: w.correct ? C.primarySubtle : C.dangerSubtle },
              ]}
            >
              <Text style={[scoreStyles.wordText, { color: w.correct ? C.statusValid : C.danger }]}>
                {w.word}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const scoreStyles = StyleSheet.create({
  wrap:     { alignItems: 'center', padding: 16, gap: 12 },
  ring:     { width: 100, height: 100, borderRadius: 50, borderWidth: 5, alignItems: 'center', justifyContent: 'center' },
  num:      { fontSize: 32, fontWeight: '800' },
  pct:      { fontSize: 11 },
  feedback: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  words:    { flexDirection: 'row', gap: 6, paddingHorizontal: 4 },
  word:     { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  wordText: { fontSize: 13, fontWeight: '700' },
});

// ── PronunciationPanel ────────────────────────────────────────────────────────
interface Props {
  phrases:      string[];
  level:        string;
  speak:        (text: string) => Promise<string | null>;
  ttsLoading:   boolean;
  onScore:      (uri: string, expectedText: string) => Promise<ScoreResult | null>;
  scoreLoading: boolean;
}

type RecordState = 'idle' | 'recording' | 'processing';

export default function PronunciationPanel({
  phrases,
  level,
  speak,
  ttsLoading,
  onScore,
  scoreLoading,
}: Props) {
  const C = useColors();

  const [idx,         setIdx]         = useState(0);
  const [recordState, setRecordState] = useState<RecordState>('idle');
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    setIdx(0);
    setScoreResult(null);
    setRecordState('idle');
  }, [phrases]);

  const phrase = phrases[idx] ?? '';

  const nextPhrase = () => {
    setIdx(i => (i + 1) % Math.max(phrases.length, 1));
    setScoreResult(null);
    setRecordState('idle');
  };

  const startRecording = useCallback(async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      recordingRef.current = recording;
      setRecordState('recording');
      setScoreResult(null);
    } catch (e) {
      console.error('Start pron recording error', e);
    }
  }, []);

  const stopAndScore = useCallback(async () => {
    if (!recordingRef.current) return;
    setRecordState('processing');
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      if (!uri || !phrase) { setRecordState('idle'); return; }
      const result = await onScore(uri, phrase);
      setScoreResult(result);
    } catch (e) {
      console.error('Stop pron recording error', e);
    } finally {
      setRecordState('idle');
    }
  }, [phrase, onScore]);

  const handleRecordBtn = () => {
    if (recordState === 'recording') stopAndScore();
    else if (recordState === 'idle')  startRecording();
  };

  const isProcessing = recordState === 'processing' || scoreLoading;

  return (
    <ScrollView style={pp.scroll} contentContainerStyle={pp.container}>

      {/* Level badge */}
      <View style={[pp.levelBadge, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
        <Text style={[pp.levelBadgeText, { color: C.primary }]}>Level {level} phrases</Text>
        <Text style={[pp.phraseCount, { color: C.textMuted }]}>{idx + 1} / {phrases.length}</Text>
      </View>

      {/* Phrase card */}
      <View style={[pp.card, { backgroundColor: C.surface, borderColor: C.border }]}>
        <Text style={[pp.cardLabel, { color: C.textMuted }]}>SAY THIS PHRASE</Text>
        <Text style={[pp.phrase, { color: C.textPrimary }]}>{phrase}</Text>

        <View style={pp.cardRow}>
          <TouchableOpacity
            onPress={() => speak(phrase)}
            style={[pp.listenBtn, { backgroundColor: C.primarySubtle }]}
            disabled={ttsLoading || !phrase}
          >
            {ttsLoading ? (
              <ActivityIndicator size="small" color={C.primary} />
            ) : (
              <>
                <Ionicons name="volume-high-outline" size={16} color={C.primary} />
                <Text style={[pp.listenTxt, { color: C.primary }]}>Listen first</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextPhrase}
            style={[pp.nextBtn, { backgroundColor: C.background, borderColor: C.border }]}
            disabled={phrases.length < 2}
          >
            <Ionicons name="refresh" size={14} color={C.textSecondary} />
            <Text style={[pp.nextTxt, { color: C.textSecondary }]}>Next phrase</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Instructions */}
      {!scoreResult && recordState === 'idle' && (
        <View style={[pp.instructionBox, { backgroundColor: C.surface, borderColor: C.border }]}>
          <View style={pp.instructionLine}>
            <Text style={[pp.instructionText, { color: C.textSecondary }]}>1. Tap </Text>
            <Ionicons name="volume-high-outline" size={13} color={C.textSecondary} />
            <Text style={[pp.instructionText, { color: C.textSecondary }]}> to hear the phrase</Text>
          </View>
          <Text style={[pp.instructionText, { color: C.textSecondary }]}>
            2. Tap the mic to record yourself
          </Text>
          <Text style={[pp.instructionText, { color: C.textSecondary }]}>
            3. Tap stop when done — you'll get scored instantly
          </Text>
        </View>
      )}

      {/* Record button */}
      <TouchableOpacity
        onPress={handleRecordBtn}
        style={[
          pp.recordBtn,
          { backgroundColor: C.primarySubtle, borderColor: C.primary },
          recordState === 'recording' && { backgroundColor: C.dangerSubtle, borderColor: C.danger },
          isProcessing && { backgroundColor: C.surface, borderColor: C.statusValid, opacity: 0.8 },
        ]}
        disabled={isProcessing || !phrase}
      >
        {isProcessing ? (
          <>
            <ActivityIndicator color={C.statusValid} />
            <Text style={[pp.recordTxt, { color: C.textPrimary }]}>Scoring…</Text>
          </>
        ) : recordState === 'recording' ? (
          <>
            <Ionicons name="stop" size={22} color={C.textPrimary} />
            <Text style={[pp.recordTxt, { color: C.textPrimary }]}>Stop recording</Text>
            <View style={[pp.recordingDot, { backgroundColor: C.danger }]} />
          </>
        ) : (
          <>
            <Ionicons name="mic" size={22} color={C.textPrimary} />
            <Text style={[pp.recordTxt, { color: C.textPrimary }]}>Record yourself</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Score result */}
      {scoreResult && (
        <>
          <ScoreRing {...scoreResult} />
          <TouchableOpacity
            onPress={nextPhrase}
            style={[pp.tryNextBtn, { backgroundColor: C.primarySubtle, borderColor: C.primary }]}
          >
            <Text style={[pp.tryNextTxt, { color: C.primary }]}>Try next phrase →</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const pp = StyleSheet.create({
  scroll:     { flex: 1 },
  container:  { padding: 16, gap: 14, paddingBottom: 40 },

  levelBadge: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1,
  },
  levelBadgeText: { fontSize: 12, fontWeight: '700' },
  phraseCount:    { fontSize: 12 },

  card:      { borderRadius: 16, padding: 20, gap: 14, borderWidth: 1 },
  cardLabel: { fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' },
  phrase:    { fontSize: 22, fontWeight: '700', lineHeight: 30 },
  cardRow:   { flexDirection: 'row', gap: 10 },

  listenBtn: {
    flex: 1, borderRadius: 12, padding: 12,
    alignItems: 'center', flexDirection: 'row', gap: 6, justifyContent: 'center',
  },
  listenTxt:  { fontWeight: '600', fontSize: 13 },

  nextBtn: {
    flex: 1, borderRadius: 12, padding: 12,
    alignItems: 'center', flexDirection: 'row', gap: 6, justifyContent: 'center',
    borderWidth: 1,
  },
  nextTxt: { fontWeight: '600', fontSize: 13 },

  instructionBox:  { borderRadius: 12, padding: 14, borderWidth: 1, gap: 4 },
  instructionLine: { flexDirection: 'row', alignItems: 'center' },
  instructionText: { fontSize: 13, lineHeight: 22 },

  recordBtn: {
    borderRadius: 16, padding: 20, alignItems: 'center',
    gap: 6, borderWidth: 2, flexDirection: 'row', justifyContent: 'center',
  },
  recordTxt:    { fontWeight: '700', fontSize: 15 },
  recordingDot: {
    width: 8, height: 8, borderRadius: 4,
    position: 'absolute', top: 12, right: 16,
  },

  tryNextBtn: { borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1 },
  tryNextTxt: { fontWeight: '700', fontSize: 14 },
});