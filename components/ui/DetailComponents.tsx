import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

// ─── Section wrapper ────────────────────────────────────────────
type SectionProps = { label: string; children: React.ReactNode };

export function Section({ label, children }: SectionProps) {
  const C = useColors();
  return (
    <View style={styles.section}>
      <Text style={[styles.label, { color: C.textMuted }]}>{label.toUpperCase()}</Text>
      {children}
    </View>
  );
}

// ─── Rules list ─────────────────────────────────────────────────
type RulesProps = { rules: string[] };

export function RulesList({ rules }: RulesProps) {
  const C = useColors();
  return (
    <View style={styles.rules}>
      {rules.map(r => (
        <View key={r} style={styles.ruleRow}>
          <View style={[styles.dot, { backgroundColor: C.gold }]} />
          <Text style={[styles.ruleText, { color: C.textSecondary }]}>{r}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Info note box ──────────────────────────────────────────────
type NoteProps = { text: string };

export function NoteBox({ text }: NoteProps) {
  const C = useColors();
  return (
    <View style={[styles.note, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
      <Text style={[styles.noteText, { color: C.textSuccess }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section:  { gap: 8 },
  label:    { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  rules:    { gap: 10 },
  ruleRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  dot:      { width: 7, height: 7, borderRadius: 4, marginTop: 7 },
  ruleText: { flex: 1, fontSize: 14, lineHeight: 22 },
  note:     { borderRadius: 12, borderWidth: 1, padding: 12 },
  noteText: { fontSize: 14, lineHeight: 22 },
});