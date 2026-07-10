// app/(standalone)/frenchAI/useConversationEngine.ts
//
// Shared state/handlers for the three "chat-shaped" modes — conversation,
// correction, and roleplay — extracted from the old useFrenchAITutor so
// each mode can live on its own screen. Pronunciation doesn't use this
// (no message thread, so it's simple enough to inline in its own screen).

import { useCallback, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

import { useChat, useTranscribe, useTTS, type Mode, type RoleplayScene } from '@/hooks/useFrenchAI';
import type { BubbleMessage } from '@/components/French/ConversationBubble';
import { useFrenchAIContext } from '@/context/FrenchAIContext';

const WELCOME_TEXT        = 'Bonjour! Commençons la conversation. De quoi voulez-vous parler?';
const WELCOME_TRANSLATION = "Hello! Let's start the conversation. What would you like to talk about?";

function makeWelcomeMessage(): BubbleMessage {
  return { id: `welcome-${Date.now()}`, role: 'assistant', text: WELCOME_TEXT, translation: WELCOME_TRANSLATION };
}

function makeOpenerMessage(scene: RoleplayScene): BubbleMessage {
  return {
    id: `opener-${Date.now()}`,
    role: 'assistant',
    text: scene.aiOpener,
    translation: '(AI opened the scene — respond in French!)',
  };
}

export function useConversationEngine(mode: Mode, scene?: RoleplayScene) {
  const { level } = useFrenchAIContext();

  const [messages,  setMessages]  = useState<BubbleMessage[]>(() =>
    mode === 'roleplay' && scene ? [makeOpenerMessage(scene)] : [makeWelcomeMessage()],
  );
  const [textInput, setTextInput] = useState('');
  const [recording, setRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const { send, loading: chatLoading, suggestions, clearSuggestions } = useChat();
  const { transcribe, loading: transcLoading } = useTranscribe();
  const { speak, loading: ttsLoading } = useTTS();

  // Re-seed the thread when the roleplay scene changes.
  const sceneKeyRef = useRef(scene?.scene);
  useEffect(() => {
    if (mode !== 'roleplay' || !scene || scene.scene === sceneKeyRef.current) return;
    sceneKeyRef.current = scene.scene;
    setMessages([makeOpenerMessage(scene)]);
    clearSuggestions();
    speak(scene.aiOpener);
  }, [scene?.scene]);

  // Speak the very first opener/welcome once, on mount only.
  const spokenInitial = useRef(false);
  useEffect(() => {
    if (spokenInitial.current) return;
    spokenInitial.current = true;
    const first = messages[0];
    if (first) speak(first.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setTextInput('');

    const userMsg: BubbleMessage = { id: Date.now().toString(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);

    const history = [...messages, userMsg].map(m => ({ role: m.role as 'user' | 'assistant', content: m.text }));

    const reply = await send({
      messages: history,
      mode,
      userLevel: level,
      roleplayScene: mode === 'roleplay' ? scene?.scene : undefined,
    });

    if (reply) {
      setMessages(prev => [...prev, reply]);
      if ((mode === 'conversation' || mode === 'roleplay') && reply.text) {
        speak(reply.text);
      }
    }
  }, [messages, mode, level, scene, send, speak]);

  const startRecording = useCallback(async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: rec } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
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
      const result = await transcribe(uri);
      if (result?.text) sendText(result.text);
    } catch (e) {
      console.error('Stop recording error', e);
    }
  }, [transcribe, sendText]);

  return {
    messages, textInput, setTextInput, recording,
    sendText, chatLoading, suggestions,
    startRecording, stopRecordingAndTranscribe, transcLoading,
    speak, ttsLoading,
  };
}