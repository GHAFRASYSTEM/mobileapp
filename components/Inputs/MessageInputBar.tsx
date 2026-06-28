/**
 * MessageInputBar.tsx
 *
 * Extracted input bar (text field + mic + send) from ConversationPanel.
 * - iOS:     adds safe-area bottom padding so the bar sits above the home indicator.
 * - Android: NO bottom padding here — ConversationPanel wraps this component in a
 *            View with paddingBottom={insets.bottom}, so adding it here too would
 *            double-pad and push the bar too high.
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import WaveformVisualizer from '../French/WaveformVisualizer';

interface Props {
  mode:          'conversation' | 'roleplay';
  textInput:     string;
  onTextChange:  (t: string) => void;
  onSendText:    (t: string) => void;
  onStartRecord: () => void;
  onStopRecord:  () => void;
  recording:     boolean;
  isLoading:     boolean;
}

export default function MessageInputBar({
  mode,
  textInput,
  onTextChange,
  onSendText,
  onStartRecord,
  onStopRecord,
  recording,
  isLoading,
}: Props) {
  const C = useColors();

  // No safe-area inset handling here at all — that's now entirely the
  // parent's (ConversationPanel) job, and only applied on Android. This is
  // just fixed visual breathing room, same on iOS and Android.
  const bottomPadding = 28;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: C.surface,
          borderTopColor:  C.border,
          paddingBottom:   bottomPadding,
        },
      ]}
    >
      {recording ? (
        <View style={styles.recordingRow}>
          <WaveformVisualizer isActive color={C.danger} />
          <TouchableOpacity
            onPress={onStopRecord}
            style={[styles.stopBtn, { backgroundColor: C.danger }]}
          >
            <Text style={[styles.stopBtnText, { color: C.textInverse }]}>■ Stop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.normalRow}>
          <TextInput
            value={textInput}
            onChangeText={onTextChange}
            placeholder={mode === 'roleplay' ? 'Respond in French…' : 'Type in French…'}
            placeholderTextColor={C.textMuted}
            style={[
              styles.textInput,
              {
                backgroundColor: C.background,
                color:           C.textPrimary,
                borderColor:     C.border,
              },
            ]}
            onSubmitEditing={() => onSendText(textInput)}
            returnKeyType="send"
            editable={!isLoading}
          />

          <TouchableOpacity
            onPress={onStartRecord}
            style={[styles.iconBtn, { backgroundColor: C.primarySubtle }]}
            disabled={isLoading}
          >
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>

          {textInput.length > 0 && (
            <TouchableOpacity
              onPress={() => onSendText(textInput)}
              style={[styles.iconBtn, { backgroundColor: C.primary }]}
              disabled={isLoading}
            >
              <Text style={[styles.sendIcon, { color: C.textInverse }]}>➤</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth:    0.5,
    paddingHorizontal: 12,
    paddingTop:        10,
    // paddingBottom set dynamically above
  },

  normalRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  textInput: {
    flex:              1,
    borderWidth:       1,
    borderRadius:      20,
    paddingHorizontal: 14,
    paddingVertical:   10,
    fontSize:          14,
  },

  // Shared style for mic + send buttons
  iconBtn: {
    width:           40,
    height:          40,
    borderRadius:    20,
    alignItems:      'center',
    justifyContent:  'center',
  },
  micIcon:  { fontSize: 18 },
  sendIcon: { fontSize: 16 },

  recordingRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  stopBtn: {
    borderRadius:      16,
    paddingHorizontal: 16,
    paddingVertical:   8,
  },
  stopBtnText: { fontWeight: '700', fontSize: 13 },
});