import React from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme } from 'react-native';

type Props = {
  flag: string;
  code: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  required?: boolean;
};

export default function PhoneInputRow({
  flag,
  code,
  placeholder,
  value,
  onChangeText,
  required,
}: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    bg: isDark ? '#1c1c1e' : '#f2f2f7',
    text: isDark ? '#fff' : '#000',
    placeholder: isDark ? '#aaa' : '#666',
    border: isDark ? '#2c2c2e' : '#ddd',
  };

  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 12, color: colors.placeholder }}>
        {placeholder} {required && '*'}
      </Text>

      <View style={[styles.row, { backgroundColor: colors.bg, borderColor: colors.border }]}>
        <Text style={styles.flag}>{flag}</Text>
        <Text style={[styles.code, { color: colors.text }]}>{code}</Text>

        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Phone number"
          placeholderTextColor={colors.placeholder}
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    gap: 8,
  },

  flag: {
    fontSize: 18,
  },

  code: {
    fontWeight: '600',
  },

  input: {
    flex: 1,
  },
});