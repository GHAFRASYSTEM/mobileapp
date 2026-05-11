/**
 * FrenchAIHeader.tsx
 *
 * Header bar for the French Tutor screen.
 * Supports light + dark mode via useColors().
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import type { Mode, Level } from '@/hooks/useFrenchAI';

const MODES: { key: Mode; label: string; emoji: string; hint: string }[] = [
  { key: 'conversation',  label: 'Chat',      emoji: '💬', hint: 'Free conversation practice' },
  { key: 'roleplay',      label: 'Roleplay',  emoji: '🎭', hint: 'Act out a real-life scene'  },
  { key: 'pronunciation', label: 'Pronounce', emoji: '🔊', hint: 'Record & get scored'         },
  { key: 'correction',    label: 'Correct',   emoji: '✏️',  hint: 'Fix your French writing'    },
];

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
        <Text style={[styles.backIcon, { color: C.textInverse }]}>←</Text>
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Text style={[styles.headerTitle, { color: C.textInverse }]}>🇫🇷 French Tutor</Text>
        <Text style={[styles.headerSub, { color: C.primarySubtle }]}>
          {MODES.find(m => m.key === activeMode)?.hint}
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
  backIcon:       { fontSize: 22 },
  headerCenter:   { flex: 1 },
  headerTitle:    { fontSize: 17, fontWeight: '700' },
  headerSub:      { fontSize: 11, opacity: 0.75 },
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