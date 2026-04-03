import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

const MODULES = [
  { id: '1', title: 'Membership Rights & Responsibilities', duration: '12 min', progress: 100, tag: 'Governance'  },
  { id: '2', title: 'Understanding Your Benefits',          duration: '8 min',  progress: 60,  tag: 'Benefits'    },
  { id: '3', title: 'How to Use the Community Board',       duration: '5 min',  progress: 0,   tag: 'Platform'    },
  { id: '4', title: 'Ghana Diaspora Support Programs',      duration: '15 min', progress: 0,   tag: 'Programs'    },
];

export default function LearnScreen() {
  const C = useColors();

  const tagColor = (tag: string) => {
    const map: Record<string, string> = {
      Governance: C.primarySubtle,
      Benefits:   C.goldSubtle,
      Platform:   C.blueSubtle,
      Programs:   C.dangerSubtle,
    };
    return map[tag] ?? C.primarySubtle;
  };

  const tagText = (tag: string) => {
    const map: Record<string, string> = {
      Governance: C.primary,
      Benefits:   C.gold,
      Platform:   C.blue,
      Programs:   C.danger,
    };
    return map[tag] ?? C.primary;
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: C.background }]}>
      <View style={[styles.header, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
        <Text style={[styles.pageTitle, { color: C.textPrimary }]}>Learn</Text>
        <TouchableOpacity>
          <IconSymbol size={20} name="magnifyingglass" color={C.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Progress Banner */}
        <View style={[styles.banner, { backgroundColor: C.primary }]}>
          <View>
            <Text style={[styles.bannerLabel, { color: 'rgba(255,255,255,0.7)' }]}>YOUR PROGRESS</Text>
            <Text style={[styles.bannerValue, { color: '#fff' }]}>1 of 4 completed</Text>
          </View>
          <View style={styles.bannerCircle}>
            <Text style={[styles.bannerPct, { color: C.gold }]}>25%</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: C.textPrimary }]}>All Modules</Text>

        {MODULES.map((mod) => (
          <TouchableOpacity
            key={mod.id}
            style={[styles.moduleCard, { backgroundColor: C.surface, borderColor: C.border }]}
          >
            <View style={styles.moduleTop}>
              <View style={[styles.tag, { backgroundColor: tagColor(mod.tag) }]}>
                <Text style={[styles.tagText, { color: tagText(mod.tag) }]}>{mod.tag}</Text>
              </View>
              {mod.progress === 100 && (
                <IconSymbol size={18} name="checkmark.circle.fill" color={C.statusValid} />
              )}
            </View>
            <Text style={[styles.moduleTitle, { color: C.textPrimary }]}>{mod.title}</Text>
            <View style={styles.moduleFooter}>
              <View style={styles.durationRow}>
                <IconSymbol size={13} name="clock" color={C.textMuted} />
                <Text style={[styles.duration, { color: C.textMuted }]}>{mod.duration}</Text>
              </View>
              {mod.progress > 0 && mod.progress < 100 && (
                <View style={styles.progressRow}>
                  <View style={[styles.progressTrack, { backgroundColor: C.border }]}>
                    <View style={[styles.progressFill, { backgroundColor: C.primary, width: `${mod.progress}%` as any }]} />
                  </View>
                  <Text style={[styles.progressPct, { color: C.textMuted }]}>{mod.progress}%</Text>
                </View>
              )}
              {mod.progress === 0 && (
                <Text style={[styles.startText, { color: C.primary }]}>Start →</Text>
              )}
              {mod.progress === 100 && (
                <Text style={[styles.startText, { color: C.textSuccess }]}>Completed</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1 },
  header:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  pageTitle:     { fontSize: 20, fontWeight: '700' },
  scroll:        { padding: 16 },
  banner:        { borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  bannerLabel:   { fontSize: 11, letterSpacing: 1, fontWeight: '600', marginBottom: 4 },
  bannerValue:   { fontSize: 18, fontWeight: '700' },
  bannerCircle:  { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  bannerPct:     { fontSize: 16, fontWeight: '800' },
  sectionTitle:  { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  moduleCard:    { borderRadius: 14, borderWidth: 1, padding: 16, marginBottom: 12 },
  moduleTop:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tag:           { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  tagText:       { fontSize: 11, fontWeight: '600' },
  moduleTitle:   { fontSize: 15, fontWeight: '600', marginBottom: 12, lineHeight: 21 },
  moduleFooter:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  durationRow:   { flexDirection: 'row', alignItems: 'center', gap: 4 },
  duration:      { fontSize: 12 },
  progressRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressTrack: { width: 80, height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill:  { height: '100%', borderRadius: 2 },
  progressPct:   { fontSize: 12 },
  startText:     { fontSize: 13, fontWeight: '600' },
});