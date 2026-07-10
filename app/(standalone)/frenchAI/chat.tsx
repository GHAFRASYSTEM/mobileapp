// app/(standalone)/frenchAI/chat.tsx
import React from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import ConversationPanel from '@/components/French/ConversationPanel';
import { useConversationEngine } from './useConversationEngine';

export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const e = useConversationEngine('conversation');

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader paddingTop={insets.top} title="Chat" subtitle="Free conversation practice" onBack={() => router.back()} />

      <ConversationPanel
        mode="conversation"
        messages={e.messages}
        textInput={e.textInput}
        onTextChange={e.setTextInput}
        onSendText={e.sendText}
        onStartRecord={e.startRecording}
        onStopRecord={e.stopRecordingAndTranscribe}
        recording={e.recording}
        chatLoading={e.chatLoading}
        transcLoading={e.transcLoading}
        ttsLoading={e.ttsLoading}
        onPlay={e.speak}
        suggestions={e.suggestions}
      />
    </KeyboardAvoidingView>
  );
}