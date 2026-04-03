import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { Transaction } from '@/hooks/useTransactions';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function TransactionRow({ tx }: { tx: Transaction }) {
  const C = useColors();
  const isDues    = tx.type === 'dues';
  const isFailed  = tx.status === 'failed';
  const isPending = tx.status === 'pending';

  const typeColor = isDues ? C.primary : C.gold;
  const typeBg    = isDues ? C.primarySubtle : C.goldSubtle;
  const amtColor  = isFailed ? C.textDanger : C.textPrimary;
  const statusColor = isFailed ? C.textDanger : C.textWarning;

  return (
    <View style={[styles.row, { backgroundColor: C.surface, borderBottomColor: C.border }]}>

      <View style={[styles.iconBox, { backgroundColor: typeBg }]}>
        <Text style={styles.icon}>{isDues ? '🏷️' : '🤝'}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.infoTop}>
          <Text style={[styles.label, { color: C.textPrimary }]} numberOfLines={1}>
            {tx.label}
          </Text>
          <View style={[styles.pill, { backgroundColor: typeBg }]}>
            <Text style={[styles.pillText, { color: typeColor }]}>
              {isDues ? 'Dues' : 'Donation'}
            </Text>
          </View>
        </View>
        <View style={styles.infoBottom}>
          <Text style={[styles.date, { color: C.textMuted }]}>{formatDate(tx.date)}</Text>
          {(isFailed || isPending) && (
            <Text style={[styles.status, { color: statusColor }]}>
              {isFailed ? 'Failed' : 'Pending'}
            </Text>
          )}
        </View>
      </View>

      <Text style={[styles.amount, { color: amtColor }]}>
        {isFailed ? '—' : `${tx.currency} ${tx.amount.toFixed(2)}`}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  row:       { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 12, borderBottomWidth: 1 },
  iconBox:   { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  icon:      { fontSize: 18 },
  info:      { flex: 1, gap: 3 },
  infoTop:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoBottom:{ flexDirection: 'row', alignItems: 'center', gap: 8 },
  label:     { fontSize: 14, fontWeight: '600', flex: 1 },
  date:      { fontSize: 11 },
  pill:      { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  pillText:  { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  status:    { fontSize: 11, fontWeight: '600' },
  amount:    { fontSize: 14, fontWeight: '700' },
});