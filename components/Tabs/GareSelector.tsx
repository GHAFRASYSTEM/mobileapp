import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import type { Gare } from '@/services/pickupapi';

const GARES: Gare[] = ['Lille Flandres', 'Lille Europe'];

type Props = {
  label:    string;
  value:    Gare;
  onChange: (gare: Gare) => void;
  required?: boolean;
};

export function GareSelector({ label, value, onChange, required }: Props) {
  const C = useColors();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: C.textMuted }]}>
        {label} {required && '*'}
      </Text>

      <View style={styles.chipRow}>
        {GARES.map(g => {
          const active = value === g;
          return (
            <TouchableOpacity
              key={g}
              style={[
                styles.chip,
                { borderColor: C.border },
                active && { backgroundColor: C.primarySubtle, borderColor: C.primary },
              ]}
              onPress={() => onChange(g)}
              activeOpacity={0.8}
            >
              <Text style={{ color: active ? C.primary : C.textPrimary, fontWeight: '600', fontSize: 14 }}>
                {g}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { fontSize: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10, borderWidth: 1 },
});