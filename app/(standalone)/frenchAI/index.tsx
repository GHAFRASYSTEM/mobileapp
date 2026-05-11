/**
 * app/(standalone)/frenchAI/index.tsx
 *
 * Main orchestrator screen — thin coordinator only.
 * All UI panels are in separate component files:
 *   - FrenchAIHeader     (header bar)
 *   - ConversationPanel  (chat + roleplay)
 *   - CorrectionPanel    (correction mode)
 *   - PronunciationPanel (pronunciation mode)
 *   - ConversationBubble (message bubbles, audio-first)
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

import {
  useChat,
  useTranscribe,
  useTTS,
  useConfig,
  usePronunciationScore,
  type Level,
  type Mode,
} from '@/hooks/useFrenchAI';
import { useColors } from '@/constants/Colors';
import type { BubbleMessage } from '@/components/French/ConversationBubble';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import ConversationPanel from '@/components/French/ConversationPanel';
import CorrectionPanel   from '@/components/French/CorrectionPanel';
import PronunciationPanel from '@/components/French/PronunciationPanel';
import ProfessorLoading from '@/components/Loading/ProfessorLoading';

// ── Mode definitions (UI only) ──────────────────────────────────────────────
const MODES: { key: Mode; label: string; emoji: string }[] = [
  { key: 'conversation',  label: 'Chat',     emoji: '💬' },
  { key: 'roleplay',      label: 'Roleplay', emoji: '🎭' },
  { key: 'pronunciation', label: 'Pronounce',emoji: '🔊' },
  { key: 'correction',    label: 'Correct',  emoji: '✏️' },
];

// ── Screen ──────────────────────────────────────────────────────────────────
export default function FrenchAIScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C      = useColors();

  // Remote config
  const { config, loading: configLoading, error: configError, reload: reloadConfig } = useConfig();

  const levels    = config?.levels         ?? [];
  const scenes    = config?.roleplayScenes ?? [];
  const levelKeys = levels.map(l => l.key) as Level[];

  // ── State
  const [messages, setMessages] = useState<BubbleMessage[]>([
  {
    id: `welcome-${Date.now()}`,
    role: 'assistant',
    text: 'Bonjour! Commençons la conversation. De quoi voulez-vous parler?',
    translation: "Hello! Let's start the conversation. What would you like to talk about?",
  },
]);
  const [activeMode,  setActiveMode]  = useState<Mode>('conversation');
  const [activeLevel, setActiveLevel] = useState<Level>('A1');
  const [sceneIdx,    setSceneIdx]    = useState(0);
  const [textInput,   setTextInput]   = useState('');
  const [recording,   setRecording]   = useState(false);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const prevModeRef  = useRef<Mode>(activeMode);

  // ── Hooks
  const { send, loading: chatLoading, suggestions, clearSuggestions } = useChat();
  const { transcribe, loading: transcLoading } = useTranscribe();
  const { speak, loading: ttsLoading }         = useTTS();
  const { score: scorePron, loading: scoreLoading } = usePronunciationScore();

  // ── Derived
  const scene       = scenes[sceneIdx];
  const levelLabel  = levels.find(l => l.key === activeLevel)?.label ?? activeLevel;
  const pronPhrases = levels.find(l => l.key === activeLevel)?.pronunciationPhrases ?? [];

  // ── Keep activeLevel valid once config loads
  useEffect(() => {
    if (levelKeys.length > 0 && !levelKeys.includes(activeLevel)) {
      setActiveLevel(levelKeys[0]);
    }
  }, [levelKeys]);

  // ── Seed first message on mode change
  useEffect(() => {
    if (activeMode === prevModeRef.current) return;
    prevModeRef.current = activeMode;

    setMessages([]);
    clearSuggestions();

    if (activeMode === 'roleplay' && scene) {
      const opener: BubbleMessage = {
        id: `opener-${Date.now()}`, role: 'assistant',
        text:        scene.aiOpener,
        translation: '(AI opened the scene — respond in French!)',
      };
      setMessages([opener]);
      speak(scene.aiOpener);
    }

    if (activeMode === 'conversation') {
      const welcome: BubbleMessage = {
        id: `welcome-${Date.now()}`, role: 'assistant',
        text:        'Bonjour! Commençons la conversation. De quoi voulez-vous parler?',
        translation: "Hello! Let's start the conversation. What would you like to talk about?",
      };
      setMessages([welcome]);
      speak(welcome.text);
    }
  }, [activeMode]);

  // ── Reset roleplay when scene changes
  useEffect(() => {
    if (activeMode !== 'roleplay' || !scene) return;
    const opener: BubbleMessage = {
      id: `opener-${Date.now()}`, role: 'assistant',
      text:        scene.aiOpener,
      translation: '(New scene — respond in French!)',
    };
    setMessages([opener]);
    clearSuggestions();
    speak(scene.aiOpener);
  }, [sceneIdx]);

  // ── Core send (chat, roleplay, correction)
  const sendText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setTextInput('');

    const userMsg: BubbleMessage = {
      id: Date.now().toString(), role: 'user', text: text.trim(),
    };
    setMessages(prev => [...prev, userMsg]);

    const history = [...messages, userMsg].map(m => ({
      role:    m.role as 'user' | 'assistant',
      content: m.text,
    }));

    const reply = await send({
      messages:      history,
      mode:          activeMode,
      userLevel:     activeLevel,
      roleplayScene: activeMode === 'roleplay' ? scene?.scene : undefined,
    });

    if (reply) {
      setMessages(prev => [...prev, reply]);
      if ((activeMode === 'conversation' || activeMode === 'roleplay') && reply.text) {
        speak(reply.text);
      }
    }
  }, [messages, activeMode, activeLevel, scene, send, speak]);

  // ── Voice recording (chat + roleplay)
  const startRecording = useCallback(async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: rec } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      recordingRef.current = rec;
      setRecording(true);
    } catch (e) { console.error('Start recording error', e); }
  }, []);

  const stopRecordingAndTranscribe = useCallback(async () => {
    try {
      setRecording(false);
      await recordingRef.current?.stopAndUnloadAsync();
      const uri = recordingRef.current?.getURI();
      recordingRef.current = null;
      if (!uri) return;
      const result = await transcribe(uri);
      if (result?.text) sendText(result.text);
    } catch (e) { console.error('Stop recording error', e); }
  }, [transcribe, sendText]);

  // ── Level cycler
  const cycleLevel = () => {
    const i = levelKeys.indexOf(activeLevel);
    setActiveLevel(levelKeys[(i + 1) % Math.max(levelKeys.length, 1)]);
  };

  // ── Loading / error screens ─────────────────────────────────────────────────
  if (configLoading) {
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

  if (configError || !config) {
    return (
      <View style={[styles.root, styles.centered, { backgroundColor: C.background }]}>
        <StatusBar
          barStyle={C.background === '#111210' ? 'light-content' : 'dark-content'}
          backgroundColor={C.background}
        />
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={[styles.errorText, { color: C.textSecondary }]}>Couldn't load tutor config.</Text>
        <TouchableOpacity
          onPress={reloadConfig}
          style={[styles.retryBtn, { backgroundColor: C.primarySubtle }]}
        >
          <Text style={[styles.retryTxt, { color: C.primary }]}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: C.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={C.header}
      />

      {/* ── Header (extracted component) ── */}
      <FrenchAIHeader
        paddingTop={insets.top}
        activeMode={activeMode}
        activeLevel={activeLevel}
        levelLabel={levelLabel}
        onBack={() => router.back()}
        onCycleLevel={cycleLevel}
      />

      {/* ── Mode tabs ── */}
      <View style={[styles.modeBar, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
        {MODES.map(m => (
          <TouchableOpacity
            key={m.key}
            onPress={() => setActiveMode(m.key)}
            style={[
              styles.modeTab,
              activeMode === m.key && [styles.modeTabActive, { borderBottomColor: C.primary }],
            ]}
          >
            <Text style={styles.modeEmoji}>{m.emoji}</Text>
            <Text style={[
              styles.modeLabel,
              { color: activeMode === m.key ? C.primary : C.textMuted },
            ]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Panels ── */}
      {activeMode === 'pronunciation' && (
        <PronunciationPanel
          phrases={pronPhrases}
          level={activeLevel}
          speak={speak}
          ttsLoading={ttsLoading}
          onScore={scorePron}
          scoreLoading={scoreLoading}
        />
      )}

      {activeMode === 'correction' && (
        <CorrectionPanel
          onSubmit={sendText}
          loading={chatLoading}
          messages={messages}
          onPlay={speak}
          ttsLoading={ttsLoading}
        />
      )}

      {(activeMode === 'conversation' || activeMode === 'roleplay') && (
        <ConversationPanel
          mode={activeMode}
          messages={messages}
          textInput={textInput}
          onTextChange={setTextInput}
          onSendText={sendText}
          onStartRecord={startRecording}
          onStopRecord={stopRecordingAndTranscribe}
          recording={recording}
          chatLoading={chatLoading}
          transcLoading={transcLoading}
          ttsLoading={ttsLoading}
          onPlay={speak}
          scenes={scenes}
          sceneIdx={sceneIdx}
          onSceneChange={setSceneIdx}
          suggestions={suggestions}
        />
      )}

      {activeMode === 'pronunciation' && (
        <View style={{ height: insets.bottom }} />
      )}
    </KeyboardAvoidingView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:     { flex: 1 },
  centered: { alignItems: 'center', justifyContent: 'center' },

  loadingLabel: { marginTop: 12, fontSize: 14 },
  errorIcon:    { fontSize: 36, marginBottom: 8 },
  errorText:    { fontSize: 15, marginBottom: 16 },
  retryBtn:     {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryTxt: { fontWeight: '700', fontSize: 14 },

  // Mode tabs
  modeBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  modeTab:        { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 2 },
  modeTabActive:  { borderBottomWidth: 2 },
  modeEmoji:      { fontSize: 16 },
  modeLabel:      { fontSize: 10, fontWeight: '600' },
});