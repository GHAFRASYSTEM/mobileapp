import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

export default function EnBadge() {
  const C = useColors();
  return (
    <View style={[styles.badge, { backgroundColor: C.goldSubtle }]}>
      <Text style={[styles.label, { color: C.textWarning }]}>EN ✓</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 7,
    paddingVertical:   2,
    borderRadius:      6,
  },
  label: {
    fontSize:   11,
    fontWeight: '500',
  },
});