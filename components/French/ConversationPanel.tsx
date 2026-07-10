/**
 * ConversationPanel.tsx
 *
 * Shared panel for 'conversation' and 'roleplay' modes.
 * Supports light + dark mode via useColors().
 * Input bar is delegated to <MessageInputBar />.
 *
 * Android: MessageInputBar is elevated above the system navigation bar
 * via KeyboardAvoidingView (behavior="height") + useSafeAreaInsets.
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
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
  const insets    = useSafeAreaInsets();
  const isLoading = chatLoading || transcLoading || ttsLoading;

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    // On Android, KeyboardAvoidingView with behavior="height" shrinks the view
    // when the soft keyboard appears, keeping MessageInputBar above it.
    // keyboardVerticalOffset accounts for any top bar so the shift is accurate.
    <KeyboardAvoidingView
      style={styles.wrap}
      behavior={Platform.OS === 'android' ? 'height' : undefined}
      keyboardVerticalOffset={insets.top}
    >
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
          <View style={styles.suggestLabelRow}>
            <Ionicons name="bulb-outline" size={13} color={C.textMuted} />
            <Text style={[styles.suggestLabel, { color: C.textMuted }]}>Try saying:</Text>
          </View>
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

      {/* ── Input bar ──
          paddingBottom lifts the bar above the Android gesture/button nav bar.
          Without this it would sit behind the system navigation on gesture-nav devices. */}
<View style={{ paddingBottom: Platform.OS === 'android' ? insets.bottom : 0 }}>
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
</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },

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
  suggestLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  suggestLabel:    { fontSize: 11 },
  suggestChips:    { flexDirection: 'row', gap: 8 },
  suggestChip:     { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1 },
  suggestChipText: { fontSize: 13, fontWeight: '600' },

  loadingRow:  { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 6 },
  loadingText: { fontSize: 12 },
});