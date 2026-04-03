import React from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import { Transaction } from '@/hooks/useTransactions';
import TransactionRow from './TransactionRow';
import TransactionSectionHeader from '../Headers/SectionHeaders/TransactionSectionHeader';
import TransactionListHeader from '../Headers/TransactionListHeader';
import TransactionListSkeleton from '../Loading/TransactionListSkeleton';

type ListItem =
  | { kind: 'header'; title: string }
  | { kind: 'row'; tx: Transaction };

function buildFlatData(txs: Transaction[]): ListItem[] {
  const map: Record<string, Transaction[]> = {};
  txs.forEach(tx => {
    const key = new Date(tx.date).toLocaleString('en-GB', { month: 'long', year: 'numeric' });
    if (!map[key]) map[key] = [];
    map[key].push(tx);
  });
  const items: ListItem[] = [];
  Object.entries(map).forEach(([month, rows]) => {
    items.push({ kind: 'header', title: month });
    rows.forEach(tx => items.push({ kind: 'row', tx }));
  });
  return items;
}

type Props = {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
};

export default function TransactionList({ transactions, loading, error }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  if (loading) return <TransactionListSkeleton />;

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 32 }}>⚠️</Text>
        <Text style={[styles.loadingText, { color: C.textDanger }]}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={buildFlatData(transactions)}
      keyExtractor={(item, i) => item.kind === 'header' ? `h-${i}` : item.tx.id}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      ListHeaderComponent={<TransactionListHeader transactions={transactions} />}
      renderItem={({ item }) =>
        item.kind === 'header'
          ? <TransactionSectionHeader title={item.title} />
          : <TransactionRow tx={item.tx} />
      }
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={{ fontSize: 32 }}>🧾</Text>
          <Text style={[styles.loadingText, { color: C.textMuted }]}>No transactions yet</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  centered:    { alignItems: 'center', paddingTop: 80, gap: 10 },
  loadingText: { fontSize: 14 },
});