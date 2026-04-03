import React from 'react';
import { View } from 'react-native';
import { useColors } from '@/constants/Colors';
import ScreenHeader from '@/components/Headers/ScreenHeader';
import TransactionList from '@/components/Lists/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';

export default function TransactionsScreen() {
  const C = useColors();
  const { data, loading, error } = useTransactions();

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <ScreenHeader title="Transactions" showBack />
      <TransactionList transactions={data} loading={loading} error={error} />
    </View>
  );
}