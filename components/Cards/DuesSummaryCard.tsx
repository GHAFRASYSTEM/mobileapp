import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

type Props = {
  paid:     boolean;
  amount:   number;
  currency: string;
  label:    string;
};

export function DuesSummaryCard({ paid, amount, currency, label }: Props) {
  const C = useColors();

  return (
    <View style={[
      styles.card,
      {
        backgroundColor: C.surface,
        borderColor:     paid ? C.borderFocus : C.border,
      },
    ]}>
      <View style={[styles.accent, { backgroundColor: paid ? C.primary : C.gold }]} />
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={[styles.statusLabel, { color: C.textMuted }]}>
            {paid ? 'MEMBERSHIP ACTIVE' : 'MEMBERSHIP FEE'}
          </Text>
          {paid && (
            <View style={[styles.pill, { backgroundColor: C.primarySubtle }]}>
              <Text style={[styles.pillText, { color: C.primary }]}>✓ Paid</Text>
            </View>
          )}
        </View>
        <Text style={[styles.amount, { color: paid ? C.primary : C.textPrimary }]}>
          {currency} {amount.toFixed(2)}
        </Text>
        <Text style={[styles.label, { color: C.textSecondary }]}>{label}</Text>
        <Text style={{ fontSize: 11, color: C.textMuted }}>
  Monthly membership fee for registered GHAFRA association members (offline membership)
</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:        { flexDirection: 'row', borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  accent:      { width: 5 },
  body:        { flex: 1, padding: 14, gap: 4 },
  top:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  pill:        { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  pillText:    { fontSize: 10, fontWeight: '700' },
  amount:      { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  label:       { fontSize: 13 },
});