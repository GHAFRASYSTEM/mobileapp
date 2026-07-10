// app/(standalone)/frenchAI/roleplay.tsx
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import ConversationPanel from '@/components/French/ConversationPanel';
import { useFrenchAIContext } from '@/context/FrenchAIContext';
import { useConversationEngine } from './useConversationEngine';

export default function RoleplayScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();
  const { config, configLoading } = useFrenchAIContext();
  const scenes = config?.roleplayScenes ?? [];

  const [sceneIdx, setSceneIdx] = useState(0);
  const scene = scenes[sceneIdx];

  const e = useConversationEngine('roleplay', scene);

  if (configLoading || !scene) {
    return (
      <View style={{ flex: 1, backgroundColor: C.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={C.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader paddingTop={insets.top} title="Roleplay" subtitle="Act out a real-life scene" onBack={() => router.back()} />

      <ConversationPanel
        mode="roleplay"
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
        scenes={scenes}
        sceneIdx={sceneIdx}
        onSceneChange={setSceneIdx}
        suggestions={e.suggestions}
      />
    </KeyboardAvoidingView>
  );
}