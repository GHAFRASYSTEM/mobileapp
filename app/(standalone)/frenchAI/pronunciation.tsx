// app/(standalone)/frenchAI/pronunciation.tsx
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import PronunciationPanel from '@/components/French/PronunciationPanel';
import { useTTS, usePronunciationScore } from '@/hooks/useFrenchAI';
import { useFrenchAIContext } from '@/context/FrenchAIContext';

export default function PronunciationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const { level, config, configLoading } = useFrenchAIContext();
  const { speak, loading: ttsLoading } = useTTS();
  const { score, loading: scoreLoading } = usePronunciationScore();

  const phrases = config?.levels.find(l => l.key === level)?.pronunciationPhrases ?? [];

  if (configLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: C.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={C.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader paddingTop={insets.top} title="Pronounce" subtitle="Record & get scored" onBack={() => router.back()} />

      <PronunciationPanel
        phrases={phrases}
        level={level}
        speak={speak}
        ttsLoading={ttsLoading}
        onScore={score}
        scoreLoading={scoreLoading}
      />
    </View>
  );
}