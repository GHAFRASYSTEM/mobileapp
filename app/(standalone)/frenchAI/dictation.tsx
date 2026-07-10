// app/(standalone)/frenchAI/dictation.tsx
//
// Listen & Dictation: AI speaks a passage, learner types what they hear,
// we diff word-by-word and explain the common mistakes.

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
import * as LegacyFS from 'expo-file-system/legacy';
import { Ionicons } from '@expo/vector-icons';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import { useFrenchAIContext } from '@/context/FrenchAIContext';
import { type DictationCheckResult } from '@/hooks/useFrenchAI/types';
import { useDictation } from '@/hooks/useFrenchAI/useDictation';

export default function DictationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const { level } = useFrenchAIContext();   // ← was local useState + LEVELS chip row

  const [passageText, setPassageText] = useState<string | null>(null);
  const [attempt, setAttempt] = useState('');
  const [result, setResult] = useState<DictationCheckResult | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const { generatePassage, generateLoading, check, checkLoading } = useDictation();

  const handleGenerate = async () => {
    setResult(null);
    setAttempt('');
    const passage = await generatePassage({ userLevel: level });
    if (!passage) return;
    setPassageText(passage.text);
    await playAudio(passage.audioBase64);
  };

  const playAudio = async (audioBase64: string) => {
    try {
      if (sound) await sound.unloadAsync();
      const fileUri = `${LegacyFS.cacheDirectory}dictation-${Date.now()}.mp3`;
      await LegacyFS.writeAsStringAsync(fileUri, audioBase64, { encoding: LegacyFS.EncodingType.Base64 });
      const { sound: s } = await Audio.Sound.createAsync({ uri: fileUri });
      setSound(s);
      await s.playAsync();
    } catch (e) {
      console.error('Dictation audio playback error', e);
    }
  };

  const handleCheck = async () => {
    if (!passageText || !attempt.trim()) return;
    const res = await check({ originalText: passageText, userAttempt: attempt.trim(), userLevel: level });
    if (res) setResult(res);
  };

  const statusColor = (status: string) => {
    if (status === 'correct') return '#4caf6f';
    if (status === 'missing') return '#e0a052';
    if (status === 'extra') return '#9e9e9e';
    return '#e05252'; // wrong
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader paddingTop={insets.top} title="Dictation" subtitle="Listen & write what you hear" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <TouchableOpacity
          onPress={handleGenerate}
          disabled={generateLoading}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: generateLoading ? 0.6 : 1 }}
        >
          {generateLoading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '700' }}>{passageText ? 'New passage' : 'Generate passage'}</Text>}
        </TouchableOpacity>

        {passageText && (
          <>
            <TouchableOpacity
              onPress={() => sound?.replayAsync()}
              style={{ borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
            >
              <Ionicons name="volume-high-outline" size={18} color={C.textPrimary} />
              <Text style={{ color: C.textPrimary, fontWeight: '600' }}>Replay audio</Text>
            </TouchableOpacity>

            <TextInput
              value={attempt}
              onChangeText={setAttempt}
              placeholder="Type exactly what you hear…"
              placeholderTextColor={C.textMuted}
              multiline
              style={{ minHeight: 100, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 12, color: C.textPrimary, textAlignVertical: 'top', fontSize: 15 }}
            />

            <TouchableOpacity
              onPress={handleCheck}
              disabled={checkLoading || !attempt.trim()}
              style={{ backgroundColor: C.primarySubtle, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: checkLoading || !attempt.trim() ? 0.6 : 1 }}
            >
              {checkLoading ? <ActivityIndicator color={C.primary} /> : <Text style={{ color: C.primary, fontWeight: '700' }}>Check my answer</Text>}
            </TouchableOpacity>
          </>
        )}

        {result && (
          <View style={{ gap: 16 }}>
            <View style={{ backgroundColor: C.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border }}>
              <Text style={{ color: C.textPrimary, fontWeight: '700', marginBottom: 8 }}>Accuracy: {result.accuracyScore}%</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                {result.wordDiff.map((w, i) => (
                  <Text key={i} style={{ color: statusColor(w.status), fontSize: 15 }}>
                    {w.status === 'wrong' ? `${w.userWord}` : w.status === 'extra' ? w.word : w.word}
                  </Text>
                ))}
              </View>
              <Text style={{ color: C.textSecondary, fontSize: 12, marginTop: 8 }}>Green = correct · Orange = missing · Red = wrong · Grey = extra</Text>
            </View>

            {result.commonMistakeExplanations.length > 0 && (
              <View style={{ backgroundColor: C.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border }}>
                <Text style={{ color: C.textPrimary, fontWeight: '700', marginBottom: 8 }}>Why these mistakes happen</Text>
                {result.commonMistakeExplanations.map((e, i) => (
                  <Text key={i} style={{ color: C.textSecondary, marginBottom: 6 }}>• {e}</Text>
                ))}
              </View>
            )}

            <Text style={{ color: C.textPrimary, textAlign: 'center' }}>{result.feedback}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}