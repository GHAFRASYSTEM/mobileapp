import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Props = {
  amount: number;
  currency: string;
  label: string;
  period: string;
  paid?: boolean;
};

export default function DuesSummaryCard({ amount, currency, label, period, paid = false }: Props) {
  const C = useColors();

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: paid ? C.borderFocus : C.border }]}>
      <View style={[styles.accent, { backgroundColor: paid ? C.primary : C.gold }]} />
      <View style={styles.body}>

        <View style={styles.topRow}>
          <Text style={[styles.labelText, { color: C.textMuted }]}>
            {paid ? 'PAID' : 'AMOUNT DUE'}
          </Text>
          {paid && (
            <View style={[styles.paidPill, { backgroundColor: C.primarySubtle }]}>
              <IconSymbol name="checkmark.circle.fill" size={11} color={C.primary} />
              <Text style={[styles.paidPillText, { color: C.primary }]}>Paid</Text>
            </View>
          )}
        </View>

        <Text style={[styles.amount, { color: paid ? C.primary : C.textPrimary }]}>
          {currency} {amount.toFixed(2)}
        </Text>

        <Text style={[styles.desc, { color: C.textSecondary }]}>{label}</Text>

        <View style={[styles.pill, { backgroundColor: paid ? C.primarySubtle : C.goldSubtle }]}>
          <Text style={[styles.pillText, { color: paid ? C.primary : C.textWarning }]}>{period}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:        { flexDirection: 'row', borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  accent:      { width: 5 },
  body:        { flex: 1, padding: 14, gap: 3 },
  topRow:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  labelText:   { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  paidPill:    { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  paidPillText:{ fontSize: 10, fontWeight: '700' },
  amount:      { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  desc:        { fontSize: 12, color: '#888' },
  pill:        { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, marginTop: 2 },
  pillText:    { fontSize: 11, fontWeight: '600' },
});