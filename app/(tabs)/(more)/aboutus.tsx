import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import AppHeader from '@/components/Headers/AppHeader';
import { IconSymbol } from '@/components/ui/icon-symbol';

const PILLARS = [
  {
    icon:  'person.2.fill'       as const,
    label: 'Community',
    desc:  'Building a dynamic, inclusive community for Ghanaians across France.',
    bg:    '#E1F5EE',
    color: '#0F6E56',
  },
  {
    icon:  'shield.fill'         as const,
    label: 'Rights & well-being',
    desc:  'Defending the rights and well-being of Ghanaians residing in France.',
    bg:    '#EEEDFE',
    color: '#534AB7',
  },
  {
    icon:  'star.fill'           as const,
    label: 'Selfless service',
    desc:  'Committed to serving Ghanaians selflessly — no profit motive, only purpose.',
    bg:    '#FAEEDA',
    color: '#854F0B',
  },
];

const DETAILS = [
  { label: 'Founded',       value: '20 August 2024'     },
  { label: 'Type',          value: 'Registered Non-profit association' },
  { label: 'Prefecture',    value: 'North, France'      },
  { label: 'Registered at', value: 'Iris Formation'     },
];

export default function AboutUsScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <AppHeader title="About Us" showBack />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={[styles.card, styles.hero, { backgroundColor: C.surface, borderColor: C.border }]}>
          <View style={styles.logoBadge}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
            />
          </View>

          <Text style={[styles.orgName, { color: C.textPrimary }]}>GHA-FRA NORD</Text>
          <Text style={[styles.orgSub, { color: C.textMuted }]}>Ghana · France Association — North Region</Text>

          {/* Ghana + France flag stripes */}
          <View style={styles.flags}>
            {['#CE1126','#FCD116','#006B3F'].map((c, i) => (
              <View key={i} style={[styles.stripe, { backgroundColor: c }]} />
            ))}
            <View style={[styles.stripe, { backgroundColor: C.border }]} />
            {['#002395','#FFFFFF','#ED2939'].map((c, i) => (
              <View key={i} style={[styles.stripe, { backgroundColor: c, borderWidth: c === '#FFFFFF' ? 0.5 : 0, borderColor: C.border }]} />
            ))}
          </View>

          <View style={[styles.badge, { backgroundColor: C.primarySubtle }]}>
            <View style={[styles.dot, { backgroundColor: C.statusValid }]} />
            <Text style={[styles.badgeText, { color: C.statusValid }]}>Non-profit association</Text>
          </View>
        </View>

        {/* Mission */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.sectionLabel, { color: C.textMuted }]}>OUR MISSION</Text>
          <Text style={[styles.missionText, { color: C.textPrimary }]}>
            We exist to empower the Ghanaian community in France to progress and succeed,
            by fostering a supportive environment where each individual can reach their full
            potential and make a positive contribution to society.
          </Text>
        </View>

        {/* Pillars */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.sectionLabel, { color: C.textMuted }]}>WHAT WE STAND FOR</Text>
          {PILLARS.map((p, i) => (
            <View key={p.label}>
              <View style={styles.pillarRow}>
                <View style={[styles.pillarIcon, { backgroundColor: p.bg }]}>
                  <IconSymbol name={p.icon} size={16} color={p.color} />
                </View>
                <View style={styles.pillarText}>
                  <Text style={[styles.pillarLabel, { color: C.textPrimary }]}>{p.label}</Text>
                  <Text style={[styles.pillarDesc,  { color: C.textMuted  }]}>{p.desc}</Text>
                </View>
              </View>
              {i < PILLARS.length - 1 && (
                <View style={[styles.divider, { backgroundColor: C.border }]} />
              )}
            </View>
          ))}
        </View>

        {/* Details */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.sectionLabel, { color: C.textMuted }]}>ORGANISATION DETAILS</Text>
          {DETAILS.map((d, i) => (
            <View key={d.label}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: C.textMuted }]}>{d.label}</Text>
                <Text style={[styles.detailValue, { color: C.textPrimary }]}>{d.value}</Text>
              </View>
              {i < DETAILS.length - 1 && (
                <View style={[styles.divider, { backgroundColor: C.border }]} />
              )}
            </View>
          ))}
        </View>

        {/* Footer quote */}
        <View style={styles.footer}>
          <Text style={styles.footerQuote}>Service to Mankind is Service to God.</Text>
          <Text style={styles.footerSub}>Wosom Nipa a, Wosom Nyame.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:         { flex: 1 },
  scroll:       { padding: 16, gap: 12 },

  card:         { borderRadius: 14, borderWidth: 1, padding: 18, marginBottom: 4 },
  hero:         { alignItems: 'center', paddingVertical: 28 },

  logoBadge:    { width: 80, height: 80, borderRadius: 20, overflow: 'hidden', borderWidth: 2, borderColor: '#FCD116', marginBottom: 16 },
  logo:         { width: '100%', height: '100%' },

  orgName:      { fontSize: 22, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  orgSub:       { fontSize: 13, letterSpacing: 0.3, marginBottom: 16 },

  flags:        { flexDirection: 'row', height: 4, width: 140, borderRadius: 2, overflow: 'hidden', marginBottom: 16, gap: 1 },
  stripe:       { flex: 1 },

  badge:        { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  dot:          { width: 6, height: 6, borderRadius: 3 },
  badgeText:    { fontSize: 12, fontWeight: '600' },

  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
  missionText:  { fontSize: 15, lineHeight: 24 },

  pillarRow:    { flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingVertical: 4 },
  pillarIcon:   { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  pillarText:   { flex: 1 },
  pillarLabel:  { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  pillarDesc:   { fontSize: 13, lineHeight: 18 },

  detailRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  detailLabel:  { fontSize: 13 },
  detailValue:  { fontSize: 13, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 16 },

  divider:      { height: 0.5, marginVertical: 2 },

  footer:       { backgroundColor: '#006B3F', borderRadius: 14, padding: 24, alignItems: 'center', marginTop: 4 },
  footerQuote:  { fontSize: 16, fontWeight: '700', color: '#FCD116', marginBottom: 6 },
  footerSub:    { fontSize: 13, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 20 },
});