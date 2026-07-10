/**
 * FrenchAIHeader.tsx
 *
 * Header bar for the French Tutor screen.
 * Supports light + dark mode via useColors().
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import type { Mode, Level } from '@/hooks/useFrenchAI';

// hint text keyed by mode — icon rendering for the mode tabs themselves
// lives in the mode bar (index.tsx), this header only needs the hint copy.
const MODE_HINTS: Record<Mode, string> = {
  conversation:  'Free conversation practice',
  roleplay:      'Act out a real-life scene',
  pronunciation: 'Record & get scored',
  correction:    'Fix your French writing',
};

interface Props {
  paddingTop:   number;
  activeMode:   Mode;
  activeLevel:  Level;
  levelLabel:   string;
  onBack:       () => void;
  onCycleLevel: () => void;
}

export default function FrenchAIHeader({
  paddingTop,
  activeMode,
  activeLevel,
  levelLabel,
  onBack,
  onCycleLevel,
}: Props) {
  const C = useColors();

  return (
    <View style={[styles.header, { paddingTop: paddingTop + 8, backgroundColor: C.header }]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={C.textInverse} />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <View style={styles.titleRow}>
          <Ionicons name="language-outline" size={16} color={C.textInverse} />
          <Text style={[styles.headerTitle, { color: C.textInverse }]}>French Tutor</Text>
        </View>
        <Text style={[styles.headerSub, { color: C.primarySubtle }]}>
          {MODE_HINTS[activeMode]}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onCycleLevel}
        style={[styles.levelPill, { backgroundColor: C.surface, borderColor: C.border }]}
      >
        <Text style={[styles.levelPillLevel, { color: C.primary }]}>{activeLevel}</Text>
        <Text style={[styles.levelPillName,  { color: C.textMuted }]}>{levelLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection:    'row',
    alignItems:       'center',
    paddingHorizontal: 16,
    paddingBottom:    12,
    gap:              12,
  },
  backBtn:        { padding: 4 },
  headerCenter:   { flex: 1 },
  titleRow:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerTitle:    { fontSize: 17, fontWeight: '700' },
  headerSub:      { fontSize: 11, opacity: 0.75, marginTop: 2 },
  levelPill:      {
    borderRadius:      10,
    paddingHorizontal: 10,
    paddingVertical:   6,
    alignItems:        'center',
    borderWidth:       1,
  },
  levelPillLevel: { fontSize: 13, fontWeight: '800' },
  levelPillName:  { fontSize: 9 },
});