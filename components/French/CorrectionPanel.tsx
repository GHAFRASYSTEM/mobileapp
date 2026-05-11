/**
 * CorrectionPanel.tsx
 *
 * Textarea-first UX for grammar correction mode.
 * Supports light + dark mode via useColors().
 */

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ConversationBubble, { BubbleMessage } from './ConversationBubble';
import { useColors } from '@/constants/Colors';

interface Props {
  onSubmit:   (text: string) => void;
  loading:    boolean;
  messages:   BubbleMessage[];
  onPlay:     (text: string) => Promise<string | null>;
  ttsLoading: boolean;
}

export default function CorrectionPanel({
  onSubmit,
  loading,
  messages,
  onPlay,
  ttsLoading,
}: Props) {
  const C = useColors();
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList>(null);

  const handleSubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setDraft('');
  };

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <View style={styles.wrap}>
      {/* Hint */}
      <View style={[styles.hint, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
        <Text style={styles.hintIcon}>✏️</Text>
        <Text style={[styles.hintText, { color: C.textSuccess }]}>
          Write anything in French — a sentence, a paragraph, anything. I'll correct it.
        </Text>
      </View>

      {/* Message list */}
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

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={C.primary} size="small" />
          <Text style={[styles.loadingText, { color: C.textMuted }]}>Correcting…</Text>
        </View>
      )}

      {/* Input area */}
      <View style={[styles.inputArea, { backgroundColor: C.surface, borderTopColor: C.border }]}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Écrivez votre texte en français ici…"
          placeholderTextColor={C.textMuted}
          style={[
            styles.input,
            { backgroundColor: C.background, color: C.textPrimary, borderColor: C.border },
          ]}
          multiline
          editable={!loading}
          textAlignVertical="top"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!draft.trim() || loading}
          style={[
            styles.btn,
            { backgroundColor: C.primary },
            (!draft.trim() || loading) && styles.btnDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={C.textInverse} />
          ) : (
            <Text style={[styles.btnTxt, { color: C.textInverse }]}>Correct my French →</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },

  hint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
  },
  hintIcon: { fontSize: 16 },
  hintText: { flex: 1, fontSize: 13, lineHeight: 18 },

  messageList: { padding: 12, gap: 8, flexGrow: 1 },

  loadingRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, paddingHorizontal: 16, paddingVertical: 6,
  },
  loadingText: { fontSize: 12 },

  inputArea: {
    padding: 12, gap: 8,
    borderTopWidth: 0.5,
  },
  input: {
    borderRadius: 12, padding: 14, fontSize: 15,
    minHeight: 80, maxHeight: 140, borderWidth: 1,
  },
  btn:        { borderRadius: 12, padding: 14, alignItems: 'center' },
  btnDisabled: { opacity: 0.4 },
  btnTxt:     { fontWeight: '700', fontSize: 15 },
});