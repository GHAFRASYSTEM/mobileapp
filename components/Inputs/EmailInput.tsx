import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

interface Props {
  value: string;
  onChangeText: (v: string) => void;
  onBlur: () => void;
  onSubmitEditing: () => void;
  error?: string | null;
  inputRef?: React.RefObject<TextInput>;
}

export function EmailInput({ value, onChangeText, onBlur, onSubmitEditing, error, inputRef }: Props) {
  const C = useColors();

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: C.textSecondary }]}>Email</Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder="you@example.com"
        placeholderTextColor={C.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={onSubmitEditing}
        style={[
          styles.input,
          {
            backgroundColor: C.surface,
            color:           C.textPrimary,
            borderColor:     error ? C.borderDanger : C.border,
          },
        ]}
      />
      {error && <Text style={[styles.error, { color: C.danger }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: 6 },
  label: { fontSize: 12, fontWeight: '500' },
  input: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    fontSize: 15,
  },
  error: { fontSize: 12, marginTop: 2 },
});