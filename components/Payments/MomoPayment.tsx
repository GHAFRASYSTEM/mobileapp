import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import PrimaryButton from '../Buttons/PrimaryButton';

type Props = {
  amount: number;
  currency: string;
  onPay: () => void;
  loading?: boolean;
};

export default function MomoPayment({
  amount,
  currency,
  onPay,
  loading,
}: Props) {
  const C = useColors();

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      <Text style={[styles.title, { color: C.textPrimary }]}>
        Mobile Money Payment
      </Text>

      <Text style={[styles.sub, { color: C.textSecondary }]}>
        You’ll be redirected to Paystack to complete your payment securely.
      </Text>

      <View style={[styles.amountBox, { backgroundColor: C.primarySubtle }]}>
        <Text style={[styles.amountText, { color: C.primary }]}>
          {currency} {amount.toFixed(2)}
        </Text>
      </View>

      <PrimaryButton
        text={`Pay ${currency} ${amount.toFixed(2)}`}
        onPress={onPay}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  sub: {
    fontSize: 12,
  },
  amountBox: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '800',
  },
});