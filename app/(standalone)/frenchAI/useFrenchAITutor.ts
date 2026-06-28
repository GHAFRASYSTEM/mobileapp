// app/(standalone)/frenchAI/useFrenchAITutor.ts
//
// Owns every piece of state, effect, and handler for the French AI screen.
// index.tsx stays a thin render-only component; all behaviour lives here so
// it can be tested or modified without touching JSX.

import { useCallback, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import * as LegacyFS from 'expo-file-system/legacy';

import {
  useChat,
  useTranscribe,
  useTTS,
  useConfig,
  usePronunciationScore,
  type Level,
  type Mode,
} from '@/hooks/useFrenchAI';
import type { BubbleMessage } from '@/components/French/ConversationBubble';

const WELCOME_TEXT       = 'Bonjour! Commençons la conversation. De quoi voulez-vous parler?';
const WELCOME_TRANSLATION = "Hello! Let's start the conversation. What would you like to talk about?";

function makeWelcomeMessage(): BubbleMessage {
  return {
    id:          `welcome-${Date.now()}`,
    role:        'assistant',
    text:        WELCOME_TEXT,
    translation: WELCOME_TRANSLATION,
  };
}

export function useFrenchAITutor() {
  // ── Remote config ──────────────────────────────────────────────────────
  const { config, loading: configLoading, error: configError, reload: reloadConfig } = useConfig();

  const levels    = config?.levels         ?? [];
  const scenes    = config?.roleplayScenes ?? [];
  const levelKeys = levels.map(l => l.key) as Level[];

  // ── Screen state ───────────────────────────────────────────────────────
  const [messages,    setMessages]    = useState<BubbleMessage[]>([makeWelcomeMessage()]);
  const [activeMode,  setActiveMode]  = useState<Mode>('conversation');
  const [activeLevel, setActiveLevel] = useState<Level>('A1');
  const [sceneIdx,    setSceneIdx]    = useState(0);
  const [textInput,   setTextInput]   = useState('');
  const [recording,   setRecording]   = useState(false);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const prevModeRef   = useRef<Mode>(activeMode);

  // ── API hooks ──────────────────────────────────────────────────────────
  const { send, loading: chatLoading, suggestions, clearSuggestions } = useChat();
  const { transcribe, loading: transcLoading }       = useTranscribe();
  const { speak, loading: ttsLoading }               = useTTS();
  const { score: scorePron, loading: scoreLoading }  = usePronunciationScore();

  // ── Derived values ─────────────────────────────────────────────────────
  const scene       = scenes[sceneIdx];
  const levelLabel  = levels.find(l => l.key === activeLevel)?.label ?? activeLevel;
  const pronPhrases = levels.find(l => l.key === activeLevel)?.pronunciationPhrases ?? [];

  // ── Keep activeLevel valid once config loads ──────────────────────────
  useEffect(() => {
    if (levelKeys.length > 0 && !levelKeys.includes(activeLevel)) {
      setActiveLevel(levelKeys[0]);
    }
  }, [levelKeys]);

  // ── Seed first message on mode change ─────────────────────────────────
  useEffect(() => {
    if (activeMode === prevModeRef.current) return;
    prevModeRef.current = activeMode;

    setMessages([]);
    clearSuggestions();

    if (activeMode === 'roleplay' && scene) {
      const opener: BubbleMessage = {
        id:          `opener-${Date.now()}`,
        role:        'assistant',
        text:        scene.aiOpener,
        translation: '(AI opened the scene — respond in French!)',
      };
      setMessages([opener]);
      speak(scene.aiOpener);
    }

    if (activeMode === 'conversation') {
      const welcome = makeWelcomeMessage();
      setMessages([welcome]);
      speak(welcome.text);
    }
  }, [activeMode]);

  // ── Reset roleplay when scene changes ─────────────────────────────────
  useEffect(() => {
    if (activeMode !== 'roleplay' || !scene) return;
    const opener: BubbleMessage = {
      id:          `opener-${Date.now()}`,
      role:        'assistant',
      text:        scene.aiOpener,
      translation: '(New scene — respond in French!)',
    };
    setMessages([opener]);
    clearSuggestions();
    speak(scene.aiOpener);
  }, [sceneIdx]);

  // ── Core send (chat, roleplay, correction) ────────────────────────────
  const sendText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setTextInput('');

    const userMsg: BubbleMessage = {
      id:   Date.now().toString(),
      role: 'user',
      text: text.trim(),
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

  // ── Voice recording (chat + roleplay) ─────────────────────────────────
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
    } catch (e) {
      console.error('Start recording error', e);
    }
  }, []);

  const stopRecordingAndTranscribe = useCallback(async () => {
    try {
      setRecording(false);
      await recordingRef.current?.stopAndUnloadAsync();
      const uri = recordingRef.current?.getURI();
      recordingRef.current = null;
      if (!uri) return;

      const info = await LegacyFS.getInfoAsync(uri);
      console.log('[DEBUG] recording file:', uri, 'exists:', info.exists, 'size:', (info as any).size);

      const result = await transcribe(uri);
      if (result?.text) sendText(result.text);
    } catch (e) {
      console.error('Stop recording error', e);
    }
  }, [transcribe, sendText]);

  // ── Level cycler ───────────────────────────────────────────────────────
  const cycleLevel = useCallback(() => {
    const i = levelKeys.indexOf(activeLevel);
    setActiveLevel(levelKeys[(i + 1) % Math.max(levelKeys.length, 1)]);
  }, [levelKeys, activeLevel]);

  return {
    // config / loading states
    config, configLoading, configError, reloadConfig,
    levels, scenes, levelKeys,

    // screen state
    messages, activeMode, setActiveMode, activeLevel,
    sceneIdx, setSceneIdx, textInput, setTextInput, recording,

    // derived
    scene, levelLabel, pronPhrases,

    // chat
    sendText, chatLoading, suggestions,

    // recording
    startRecording, stopRecordingAndTranscribe, transcLoading,

    // tts
    speak, ttsLoading,

    // pronunciation scoring
    scorePron, scoreLoading,

    // misc
    cycleLevel,
  };
}