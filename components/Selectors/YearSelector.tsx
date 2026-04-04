import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Props = {
  year:        number;
  currentYear: number;
  onPrev:      () => void;
  onNext:      () => void;
};

export default function YearSelector({ year, currentYear, onPrev, onNext }: Props) {
  const C         = useColors();
  const atMin     = year <= currentYear - 1;
  const atMax     = year >= currentYear + 1;

  return (
    <View style={[styles.row, { backgroundColor: C.surface, borderColor: C.border }]}>
      <TouchableOpacity
        onPress={onPrev}
        disabled={atMin}
        style={[styles.btn, { opacity: atMin ? 0.3 : 1 }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <IconSymbol name="chevron.left" size={18} color={C.primary} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={[styles.year, { color: C.textPrimary }]}>{year}</Text>
        {year !== currentYear && (
          <Text style={[styles.badge, { color: C.textMuted }]}>
            {year < currentYear ? 'Past year' : 'Next year'}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={onNext}
        disabled={atMax}
        style={[styles.btn, { opacity: atMax ? 0.3 : 1 }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <IconSymbol name="chevron.right" size={18} color={C.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row:    {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    borderRadius:   14,
    borderWidth:    1,
    paddingHorizontal: 16,
    paddingVertical:   12,
  },
  btn:    { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center', gap: 2 },
  year:   { fontSize: 18, fontWeight: '800' },
  badge:  { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
});