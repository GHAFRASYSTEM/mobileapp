import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

interface Props {
  tip: string;
}

export default function StudyTipCard({ tip }: Props) {
  const C = useColors();

  return (
    <View style={[styles.card, { backgroundColor: C.goldSubtle, borderColor: C.gold }]}>
      <Text style={styles.icon}>💡</Text>
      <Text style={[styles.tip, { color: C.textWarning }]}>{tip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           10,
    borderWidth:   0.5,
    borderRadius:  14,
    padding:       14,
  },
  icon: {
    fontSize: 18,
  },
  tip: {
    flex:       1,
    fontSize:   13,
    lineHeight: 19,
    fontStyle:  'italic',
  },
});