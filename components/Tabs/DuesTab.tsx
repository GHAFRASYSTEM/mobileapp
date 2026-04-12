import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useColors }        from '@/constants/Colors';
import { api }              from '@/services/api';
import { usePayDues }       from '@/hooks/dues/usePayDues';
import { DuesSummaryCard } from '../Cards/DuesSummaryCard';
import { AllCaughtUp } from '../Cards/AllCaughtUp';
import { PayButton } from '../Buttons/PayButton';

type DuesStatus = {
  paid:     boolean;
  label:    string;
  amount:   number;
  currency: string;
  month:    number;
  year:     number;
  payment:  any;
};

export function DuesTab() {
  const C = useColors();

  const [status,   setStatus]   = useState<DuesStatus | null>(null);
  const [fetching, setFetching] = useState(true);

  const { pay, loading, error, success } = usePayDues();

  useEffect(() => {
    api.get<DuesStatus>('/dues/status')
      .then(setStatus)
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    if (!success) return;
    api.get<DuesStatus>('/dues/status').then(setStatus);
  }, [success]);

  if (fetching) {
    return <ActivityIndicator style={{ flex: 1, marginTop: 40 }} color={C.primary} />;
  }

  const nextMonth = status
    ? new Date(status.year, status.month, 1)
        .toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : '';

  return (
    <View style={styles.root}>
      {status && (
        <DuesSummaryCard
          paid={status.paid}
          amount={status.amount}
          currency={status.currency}
          label={status.label}
        />
      )}

      {status?.paid ? (
        <AllCaughtUp nextMonth={nextMonth} />
      ) : (
        <PayButton
          label={`Pay ${status?.currency} ${status?.amount.toFixed(2)}`}
          onPress={() => pay('dues')}
          loading={loading}
          error={error}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 16 },
});