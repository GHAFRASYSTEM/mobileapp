import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { useColors } from '@/constants/Colors';

type Props = {
  onChange?: (data: {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  }) => void;
};

export default function CardPaymentForm({ onChange }: Props) {
  const C = useColors();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const update = (next: any) => {
    onChange?.({
      cardName,
      cardNumber,
      expiry,
      cvv,
      ...next,
    });
  };

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      <Text style={[styles.label, { color: C.textMuted }]}>CARD DETAILS</Text>

      <TextInput
        placeholder="Name on card"
        placeholderTextColor={C.textMuted}
        style={[styles.input, { borderColor: C.border, color: C.textPrimary }]}
        value={cardName}
        onChangeText={(v) => {
          setCardName(v);
          update({ cardName: v });
        }}
      />

      <TextInput
        placeholder="0000 0000 0000 0000"
        placeholderTextColor={C.textMuted}
        style={[styles.input, { borderColor: C.border, color: C.textPrimary }]}
        keyboardType="number-pad"
        value={cardNumber}
        onChangeText={(v) => {
          setCardNumber(v);
          update({ cardNumber: v });
        }}
      />

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TextInput
          placeholder="MM/YY"
          placeholderTextColor={C.textMuted}
          style={[styles.input, { flex: 1, borderColor: C.border, color: C.textPrimary }]}
          value={expiry}
          onChangeText={(v) => {
            setExpiry(v);
            update({ expiry: v });
          }}
        />
        <TextInput
          placeholder="CVV"
          placeholderTextColor={C.textMuted}
          style={[styles.input, { flex: 1, borderColor: C.border, color: C.textPrimary }]}
          value={cvv}
          onChangeText={(v) => {
            setCvv(v);
            update({ cvv: v });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
});