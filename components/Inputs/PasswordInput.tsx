import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';

interface Props {
  value: string;
  onChangeText: (v: string) => void;
  onBlur: () => void;
  onSubmitEditing: () => void;
  error?: string | null;
  inputRef?: React.RefObject<TextInput | null>;
}

export function PasswordInput({ value, onChangeText, onBlur, onSubmitEditing, error, inputRef }: Props) {
  const C = useColors();
  const [showPw, setShowPw] = useState(false);

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: C.textSecondary }]}>Password</Text>
      <View style={[
        styles.wrapper,
        {
          backgroundColor: C.surface,
          borderColor:     error ? C.borderDanger : C.border,
        },
      ]}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder="Min. 8 characters"
          placeholderTextColor={C.textMuted}
          secureTextEntry={!showPw}
          returnKeyType="done"
          onSubmitEditing={onSubmitEditing}
          style={[styles.input, { color: C.textPrimary }]}
        />
        <Pressable onPress={() => setShowPw(v => !v)} hitSlop={12} style={styles.eyeBtn}>
          <Ionicons
            name={showPw ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={C.textMuted}
          />
        </Pressable>
      </View>
      {error && <Text style={[styles.error, { color: C.danger }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: 6 },
  label: { fontSize: 12, fontWeight: '500' },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  input:  { flex: 1, paddingVertical: 14, fontSize: 15 },
  eyeBtn: { paddingLeft: 8 },
  error:  { fontSize: 12, marginTop: 2 },
});