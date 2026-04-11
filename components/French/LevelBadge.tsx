import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { Level } from '@/types/french.types';

interface Props {
  level: Level;
}

export default function LevelBadge({ level }: Props) {
  const C = useColors();

  const colorMap: Record<Level, { bg: string; text: string }> = {
    A1: { bg: C.primarySubtle, text: C.textSuccess },
    A2: { bg: C.primarySubtle, text: C.textSuccess },
    B1: { bg: C.goldSubtle,    text: C.textWarning },
    B2: { bg: C.blueSubtle,    text: C.textLink    },
    C1: { bg: C.blueSubtle,    text: C.textLink    },
    C2: { bg: C.blueSubtle,    text: C.textLink    },
  };

  const { bg, text } = colorMap[level];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical:   2,
    borderRadius:      6,
  },
  label: {
    fontSize:   11,
    fontWeight: '600',
  },
});