/**
 * app/(standalone)/frenchAI/index.tsx
 *
 * Main orchestrator screen — thin coordinator only.
 * All state, effects, and handlers live in useFrenchAITutor.
 * All UI panels are in separate component files:
 *   - FrenchAIHeader     (header bar)
 *   - ConversationPanel  (chat + roleplay)
 *   - CorrectionPanel    (correction mode)
 *   - PronunciationPanel (pronunciation mode)
 *   - ConversationBubble (message bubbles, audio-first)
 */

import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import ConversationPanel from '@/components/French/ConversationPanel';
import CorrectionPanel from '@/components/French/CorrectionPanel';
import PronunciationPanel from '@/components/French/PronunciationPanel';
import ProfessorLoading from '@/components/Loading/ProfessorLoading';

import { MODES } from './constants';
import { styles } from './styles';
import { useFrenchAITutor } from './useFrenchAITutor';

export default function FrenchAIScreen() {
  const router = useRouter();
  const insets  = useSafeAreaInsets();
  const C       = useColors();

  const t = useFrenchAITutor();

  // ── Loading / error screens ───────────────────────────────────────────
  if (t.configLoading) {
    return (
      <View style={[styles.root, styles.centered, { backgroundColor: C.background }]}>
        <StatusBar
          barStyle={C.background === '#111210' ? 'light-content' : 'dark-content'}
          backgroundColor={C.background}
        />
        <ProfessorLoading />
      </View>
    );
  }

  if (t.configError || !t.config) {
    return (
      <View style={[styles.root, styles.centered, { backgroundColor: C.background }]}>
        <StatusBar
          barStyle={C.background === '#111210' ? 'light-content' : 'dark-content'}
          backgroundColor={C.background}
        />
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={[styles.errorText, { color: C.textSecondary }]}>Couldn't load tutor config.</Text>
        <TouchableOpacity
          onPress={t.reloadConfig}
          style={[styles.retryBtn, { backgroundColor: C.primarySubtle }]}
        >
          <Text style={[styles.retryTxt, { color: C.primary }]}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: C.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <FrenchAIHeader
        paddingTop={insets.top}
        activeMode={t.activeMode}
        activeLevel={t.activeLevel}
        levelLabel={t.levelLabel}
        onBack={() => router.back()}
        onCycleLevel={t.cycleLevel}
      />

      <View style={[styles.modeBar, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
        {MODES.map(m => (
          <TouchableOpacity
            key={m.key}
            onPress={() => t.setActiveMode(m.key)}
            style={[
              styles.modeTab,
              t.activeMode === m.key && [styles.modeTabActive, { borderBottomColor: C.primary }],
            ]}
          >
            <Text style={styles.modeEmoji}>{m.emoji}</Text>
            <Text style={[
              styles.modeLabel,
              { color: t.activeMode === m.key ? C.primary : C.textMuted },
            ]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {t.activeMode === 'pronunciation' && (
        <PronunciationPanel
          phrases={t.pronPhrases}
          level={t.activeLevel}
          speak={t.speak}
          ttsLoading={t.ttsLoading}
          onScore={t.scorePron}
          scoreLoading={t.scoreLoading}
        />
      )}

      {t.activeMode === 'correction' && (
        <CorrectionPanel
          onSubmit={t.sendText}
          loading={t.chatLoading}
          messages={t.messages}
          onPlay={t.speak}
          ttsLoading={t.ttsLoading}
        />
      )}

      {(t.activeMode === 'conversation' || t.activeMode === 'roleplay') && (
        <ConversationPanel
          mode={t.activeMode}
          messages={t.messages}
          textInput={t.textInput}
          onTextChange={t.setTextInput}
          onSendText={t.sendText}
          onStartRecord={t.startRecording}
          onStopRecord={t.stopRecordingAndTranscribe}
          recording={t.recording}
          chatLoading={t.chatLoading}
          transcLoading={t.transcLoading}
          ttsLoading={t.ttsLoading}
          onPlay={t.speak}
          scenes={t.scenes}
          sceneIdx={t.sceneIdx}
          onSceneChange={t.setSceneIdx}
          suggestions={t.suggestions}
        />
      )}

      {t.activeMode === 'pronunciation' && <View style={{ height: insets.bottom }} />}
    </KeyboardAvoidingView>
  );
}