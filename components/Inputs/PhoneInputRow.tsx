import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Props = {
  flag:         string;
  code:         string;       // e.g. "+233"
  dialCode:     string;       // e.g. "233"  — sent to backend
  placeholder:  string;
  value:        string;       // raw display value (what user typed)
  onChangeText: (display: string, e164: string) => void;
  required?:    boolean;
  label?:       string;
};

/** Strip leading 0, non-digits, limit to 9 digits */
function normalise(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  const stripped = digits.startsWith('0') ? digits.slice(1) : digits;
  return stripped.slice(0, 9);
}

export default function PhoneInputRow({
  flag, code, dialCode, placeholder, value,
  onChangeText, required, label,
}: Props) {
  const C       = useColors();
  const [focused, setFocused] = useState(false);

  const handleChange = (raw: string) => {
    const clean = normalise(raw);
    // e164 = dialCode + 9 digits (only complete when 9 digits present)
    const e164  = clean.length === 9 ? `${dialCode}${clean}` : '';
    onChangeText(clean, e164);
  };

  const isComplete = value.length === 9;

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: C.textMuted }]}>
          {label.toUpperCase()}
          {required && <Text style={{ color: C.danger }}> *</Text>}
        </Text>
      )}

      <View style={[
        styles.row,
        { backgroundColor: C.surface, borderColor: focused ? C.borderFocus : C.border },
        focused && styles.focused,
      ]}>
        {/* Flag + dial code prefix */}
        <View style={[styles.prefix, { borderRightColor: C.border }]}>
          <Text style={styles.flag}>{flag}</Text>
          <Text style={[styles.code, { color: C.textSecondary }]}>{code}</Text>
        </View>

        <TextInput
          style={[styles.input, { color: C.textPrimary }]}
          placeholder={placeholder}
          placeholderTextColor={C.textMuted}
          keyboardType="phone-pad"
          value={value}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={9}
        />

        {/* Completion indicator */}
        {value.length > 0 && (
          isComplete ? (
            <IconSymbol name="checkmark.circle.fill" size={16} color={C.statusValid} />
          ) : (
            <Text style={[styles.counter, { color: C.textMuted }]}>
              {9 - value.length}
            </Text>
          )
        )}
      </View>

      {/* Helper: show formatted e164 when complete */}
      {isComplete && (
        <Text style={[styles.hint, { color: C.textMuted }]}>
          Sending as: {dialCode}{value}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 5 },
  label:   { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    height:         50,
    borderRadius:   12,
    borderWidth:    1.5,
    overflow:       'hidden',
  },
  focused: {
    shadowColor:   '#006B3F',
    shadowOpacity: 0.12,
    shadowRadius:  4,
    shadowOffset:  { width: 0, height: 2 },
    elevation:     2,
  },
  prefix: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            6,
    paddingHorizontal: 12,
    height:         '100%',
    borderRightWidth: 1,
  },
  flag:    { fontSize: 18 },
  code:    { fontSize: 13, fontWeight: '600' },
  input:   { flex: 1, fontSize: 14, paddingHorizontal: 12 },
  counter: { fontSize: 11, paddingRight: 12 },
  hint:    { fontSize: 11, marginTop: 1 },
});