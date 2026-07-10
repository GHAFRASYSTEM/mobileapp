/**
 * FrenchAIHeader.tsx
 *
 * Shared header for every French AI screen. Reads level from
 * FrenchAIContext directly — screens just pass title/subtitle/onBack,
 * no level prop-drilling needed anywhere.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import { useFrenchAIContext } from '@/context/FrenchAIContext';

interface Props {
  paddingTop: number;
  title:      string;
  subtitle?:  string;
  onBack:     () => void;
}

export default function FrenchAIHeader({ paddingTop, title, subtitle, onBack }: Props) {
  const C = useColors();
  const { level, cycleLevel, config } = useFrenchAIContext();
  const levelLabel = config?.levels.find(l => l.key === level)?.label ?? level;

  return (
    <View style={[styles.header, { paddingTop: paddingTop + 8, backgroundColor: C.header }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={C.textInverse} />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <View style={styles.titleRow}>
          <Ionicons name="language-outline" size={16} color={C.textInverse} />
          <Text style={[styles.headerTitle, { color: C.textInverse }]}>{title}</Text>
        </View>
        {subtitle && (
          <Text style={[styles.headerSub, { color: C.primarySubtle }]}>{subtitle}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={cycleLevel}
        style={[styles.levelPill, { backgroundColor: C.surface, borderColor: C.border }]}
      >
        <Text style={[styles.levelPillLevel, { color: C.primary }]}>{level}</Text>
        <Text style={[styles.levelPillName, { color: C.textMuted }]}>{levelLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn:      { padding: 4 },
  headerCenter: { flex: 1 },
  titleRow:     { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerTitle:  { fontSize: 17, fontWeight: '700' },
  headerSub:    { fontSize: 11, opacity: 0.75, marginTop: 2 },
  levelPill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  levelPillLevel: { fontSize: 13, fontWeight: '800' },
  levelPillName:  { fontSize: 9 },
});