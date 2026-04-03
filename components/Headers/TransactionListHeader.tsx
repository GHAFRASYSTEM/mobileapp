import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { Transaction } from '@/hooks/useTransactions';

export default function TransactionListHeader({ transactions }: { transactions: Transaction[] }) {
  const C = useColors();

  const totalDues = transactions
    .filter(t => t.type === 'dues' && t.status === 'completed')
    .reduce((s, t) => s + t.amount, 0);

  const totalDonations = transactions
    .filter(t => t.type === 'donation' && t.status === 'completed')
    .reduce((s, t) => s + t.amount, 0);

  return (
    <View style={[styles.strip, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
      <View style={styles.item}>
        <Text style={[styles.label, { color: C.textMuted }]}>DUES PAID</Text>
        <Text style={[styles.value, { color: C.textPrimary }]}>EUR {totalDues.toFixed(2)}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: C.border }]} />
      <View style={styles.item}>
        <Text style={[styles.label, { color: C.textMuted }]}>DONATIONS</Text>
        <Text style={[styles.value, { color: C.textPrimary }]}>EUR {totalDonations.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip:   { flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1 },
  item:    { flex: 1, alignItems: 'center', gap: 2 },
  divider: { width: 1, marginVertical: 4 },
  label:   { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  value:   { fontSize: 16, fontWeight: '800' },
});