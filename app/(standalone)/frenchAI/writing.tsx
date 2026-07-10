// app/(standalone)/frenchAI/writing.tsx
import React, { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView, StatusBar,
  Text, TextInput, TouchableOpacity, View, ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import { useFrenchAIContext } from '@/context/FrenchAIContext';
import {type WritingCorrectionResult } from '@/hooks/useFrenchAI/types';
import {useWritingCorrection} from '@/hooks/useFrenchAI/useWritingCorrection';

export default function WritingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const { level } = useFrenchAIContext();   // ← was local useState + LEVELS chip row

  const [text, setText] = useState('');
  const [result, setResult] = useState<WritingCorrectionResult | null>(null);

  const { correct, loading, error } = useWritingCorrection();

  const handleSubmit = async () => {
    if (!text.trim()) return;
    const res = await correct({ text: text.trim(), userLevel: level });
    if (res) setResult(res);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader paddingTop={insets.top} title="Writing" subtitle="Instant correction + CEFR read" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write something in French — a paragraph, an email, a message…"
          placeholderTextColor={C.textMuted}
          multiline
          style={{
            minHeight: 140, borderWidth: 1, borderColor: C.border, borderRadius: 12,
            padding: 12, color: C.textPrimary, textAlignVertical: 'top', fontSize: 15,
          }}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading || !text.trim()}
          style={{ backgroundColor: C.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', opacity: loading || !text.trim() ? 0.6 : 1 }}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '700' }}>Correct my writing</Text>}
        </TouchableOpacity>

        {error && <Text style={{ color: '#e05252' }}>{error}</Text>}

        {result && (
          <View style={{ gap: 16 }}>
            <Section title="Corrected text" color={C}>
              <Text style={{ color: C.textPrimary, fontSize: 15, lineHeight: 22 }}>{result.correctedText}</Text>
            </Section>

            {result.mistakes.length > 0 && (
              <Section title="Mistakes" color={C}>
                {result.mistakes.map((m, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={{ color: '#e05252' }}>❌ {m.original}</Text>
                    <Text style={{ color: '#4caf6f' }}>✅ {m.correction}</Text>
                    <Text style={{ color: C.textSecondary, fontSize: 13 }}>{m.explanation}</Text>
                  </View>
                ))}
              </Section>
            )}

            {result.vocabularySuggestions.length > 0 && (
              <Section title="Vocabulary suggestions" color={C}>
                {result.vocabularySuggestions.map((v, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={{ color: C.textPrimary }}>{v.original} → <Text style={{ fontWeight: '700' }}>{v.suggestion}</Text></Text>
                    <Text style={{ color: C.textSecondary, fontSize: 13 }}>{v.reason}</Text>
                  </View>
                ))}
              </Section>
            )}

            <Section title="Natural rewrite" color={C}>
              <Text style={{ color: C.textPrimary, fontSize: 15, lineHeight: 22, fontStyle: 'italic' }}>{result.naturalRewrite}</Text>
            </Section>

            <Section title={`CEFR assessment: ${result.cefrAssessment.estimatedLevel}`} color={C}>
              {result.cefrAssessment.strengths.map((s, i) => (
                <Text key={`s${i}`} style={{ color: '#4caf6f', marginBottom: 4 }}>✓ {s}</Text>
              ))}
              {result.cefrAssessment.areasToImprove.map((s, i) => (
                <Text key={`a${i}`} style={{ color: C.textSecondary, marginBottom: 4 }}>→ {s}</Text>
              ))}
            </Section>

            <Section title="Feedback" color={C}>
              <Text style={{ color: C.textPrimary }}>{result.overallFeedback}</Text>
            </Section>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Section({ title, color, children }: { title: string; color: any; children: React.ReactNode }) {
  return (
    <View style={{ backgroundColor: color.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: color.border }}>
      <Text style={{ color: color.textPrimary, fontWeight: '700', marginBottom: 8 }}>{title}</Text>
      {children}
    </View>
  );
}