/**
 * ConversationPanel.tsx
 *
 * Shared panel for 'conversation' and 'roleplay' modes.
 * Supports light + dark mode via useColors().
 * Input bar is delegated to <MessageInputBar />.
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ConversationBubble, { BubbleMessage } from './ConversationBubble';
import MessageInputBar from '../Inputs/MessageInputBar';
import { useColors } from '@/constants/Colors';
import type { RoleplayScene } from '@/hooks/useFrenchAI';

interface Props {
  mode:           'conversation' | 'roleplay';
  messages:       BubbleMessage[];
  textInput:      string;
  onTextChange:   (t: string) => void;
  onSendText:     (t: string) => void;
  onStartRecord:  () => void;
  onStopRecord:   () => void;
  recording:      boolean;
  chatLoading:    boolean;
  transcLoading:  boolean;
  ttsLoading:     boolean;
  onPlay:         (text: string) => Promise<string | null>;
  scenes?:        RoleplayScene[];
  sceneIdx?:      number;
  onSceneChange?: (i: number) => void;
  suggestions:    string[];
}

export default function ConversationPanel({
  mode,
  messages,
  textInput,
  onTextChange,
  onSendText,
  onStartRecord,
  onStopRecord,
  recording,
  chatLoading,
  transcLoading,
  ttsLoading,
  onPlay,
  scenes,
  sceneIdx,
  onSceneChange,
  suggestions,
}: Props) {
  const C         = useColors();
  const listRef   = useRef<FlatList>(null);
  const isLoading = chatLoading || transcLoading || ttsLoading;

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <>
      {/* ── Roleplay: scene picker ── */}
      {mode === 'roleplay' && scenes && onSceneChange && (
        <View style={[styles.sceneBar, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
          <Text style={[styles.sceneBarLabel, { color: C.textMuted }]}>Scene:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={styles.sceneChips}>
              {scenes.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => onSceneChange(i)}
                  style={[
                    styles.sceneChip,
                    { backgroundColor: C.surface, borderColor: C.border },
                    sceneIdx === i && { backgroundColor: C.primarySubtle, borderColor: C.primary },
                  ]}
                >
                  <Text style={[
                    styles.sceneChipText,
                    { color: sceneIdx === i ? C.primary : C.textMuted },
                  ]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* ── Message list ── */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ConversationBubble
            message={item}
            onPlay={onPlay}
            ttsLoading={ttsLoading}
            isLatest={index === messages.length - 1 && item.role === 'assistant'}
          />
        )}
      />

      {/* ── Dynamic AI suggestions ── */}
      {suggestions.length > 0 && !recording && (
        <View style={[styles.suggestBar, { backgroundColor: C.surface, borderTopColor: C.border }]}>
          <Text style={[styles.suggestLabel, { color: C.textMuted }]}>💡 Try saying:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.suggestChips}>
              {suggestions.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => onSendText(s)}
                  style={[styles.suggestChip, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}
                  disabled={isLoading}
                >
                  <Text style={[styles.suggestChipText, { color: C.primary }]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* ── Loading indicator ── */}
      {isLoading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={C.primary} size="small" />
          <Text style={[styles.loadingText, { color: C.textMuted }]}>
            {transcLoading ? 'Transcribing…' : ttsLoading ? 'Speaking…' : 'Thinking…'}
          </Text>
        </View>
      )}

      {/* ── Input bar (platform-aware safe area) ── */}
      <MessageInputBar
        mode={mode}
        textInput={textInput}
        onTextChange={onTextChange}
        onSendText={onSendText}
        onStartRecord={onStartRecord}
        onStopRecord={onStopRecord}
        recording={recording}
        isLoading={isLoading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sceneBar: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 12,
    paddingVertical:   8,
    gap:               8,
    borderBottomWidth: 1,
  },
  sceneBarLabel: { fontSize: 11 },
  sceneChips:    { flexDirection: 'row', gap: 8 },
  sceneChip:     { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1 },
  sceneChipText: { fontSize: 12, fontWeight: '600' },

  messageList: { padding: 12, gap: 8, flexGrow: 1 },

  suggestBar:      { paddingHorizontal: 12, paddingVertical: 8, borderTopWidth: 0.5 },
  suggestLabel:    { fontSize: 11, marginBottom: 6 },
  suggestChips:    { flexDirection: 'row', gap: 8 },
  suggestChip:     { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1 },
  suggestChipText: { fontSize: 13, fontWeight: '600' },

  loadingRow:  { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 6 },
  loadingText: { fontSize: 12 },
});