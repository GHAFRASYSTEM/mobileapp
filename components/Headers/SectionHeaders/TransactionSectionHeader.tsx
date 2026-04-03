import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

export default function TransactionSectionHeader({ title }: { title: string }) {
  const C = useColors();
  return (
    <Text style={[styles.header, { color: C.textMuted, backgroundColor: C.background }]}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
});