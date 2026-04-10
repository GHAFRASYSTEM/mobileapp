import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

type Charge = { label: string; amount: number };

type Props = { charges: Charge[] };

export default function ChargesBreakdown({ charges }: Props) {
  const C = useColors();
  const total = charges.reduce((s, c) => s + c.amount, 0);

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      {charges.map(c => (
        <View key={c.label} style={[styles.row, { borderBottomColor: C.border }]}>
          <Text style={[styles.label, { color: C.textSecondary }]}>{c.label}</Text>
          <Text style={[styles.amount, { color: C.textPrimary }]}>€{c.amount}</Text>
        </View>
      ))}
      <View style={styles.row}>
        <Text style={[styles.label, { color: C.textPrimary, fontWeight: '700' }]}>Total upfront</Text>
        <Text style={[styles.amount, { color: C.primary, fontWeight: '700' }]}>€{total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:   { borderRadius: 14, borderWidth: 0.5, overflow: 'hidden' },
  row:    { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5 },
  label:  { fontSize: 14 },
  amount: { fontSize: 14 },
});