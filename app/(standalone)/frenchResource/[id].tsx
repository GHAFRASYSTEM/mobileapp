import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, Linking, Alert, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColors } from '@/constants/Colors';

import { FRENCH_RESOURCES } from '@/assets/data/resources.data';
import ResourceHero  from '@/components/French/ResourceHero';
import StudyTipCard  from '@/components/French/StudyTipCard';
import ResourceStats from '@/components/French/ResourceStats';


export default function FrenchResourceScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const resource = FRENCH_RESOURCES.find(r => r.id === id);

  if (!resource) {
    return (
      <View style={[styles.root, styles.centered, { backgroundColor: C.background }]}>
        <Text style={{ color: C.textMuted }}>Resource not found.</Text>
      </View>
    );
  }

  const handleOpen = () => {
    if (!resource.externalUrl) return;
    Alert.alert(
      'Open External Link',
      `This will open ${resource.title} in your browser.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => Linking.openURL(resource.externalUrl!) },
      ],
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      {/* ── Hero header band ── */}
      <ResourceHero
        resource={resource}
        topInset={insets.top}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* About */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.cardHeading, { color: C.textPrimary }]}>About</Text>
          <Text style={[styles.cardBody,    { color: C.textSecondary }]}>{resource.description}</Text>
        </View>

        {/* What you'll learn */}
        {resource.whatYouLearn && resource.whatYouLearn.length > 0 && (
          <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
            <Text style={[styles.cardHeading, { color: C.textPrimary }]}>What you'll learn</Text>
            <View style={styles.bullets}>
              {resource.whatYouLearn.map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={[styles.bullet, { backgroundColor: C.primary }]} />
                  <Text style={[styles.bulletText, { color: C.textSecondary }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Study tip */}
        {resource.studyTip && <StudyTipCard tip={resource.studyTip} />}

        {/* Stats */}
        <ResourceStats resource={resource} />
      </ScrollView>

      {/* ── Sticky CTA ── */}
      <View style={[styles.ctaBar, { backgroundColor: C.background, borderColor: C.border, paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[styles.ctaBtn, { backgroundColor: C.primary }]}
          onPress={handleOpen}
          activeOpacity={0.85}
        >
          <Text style={[styles.ctaText, { color: C.textInverse }]}>
            Open {resource.title} →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1 },
  centered:{ justifyContent: 'center', alignItems: 'center' },
  scroll:  { padding: 16, gap: 12 },

  card: {
    borderWidth:  0.5,
    borderRadius: 14,
    padding:      14,
    gap:          10,
  },
  cardHeading: { fontSize: 14, fontWeight: '600' },
  cardBody:    { fontSize: 13.5, lineHeight: 20 },

  bullets:    { gap: 10 },
  bulletRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  bullet:     { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  bulletText: { flex: 1, fontSize: 13.5, lineHeight: 20 },

  ctaBar: {
    position:    'absolute',
    bottom:      0,
    left:        0,
    right:       0,
    padding:     16,
    borderTopWidth: 0.5,
  },
  ctaBtn:  { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  ctaText: { fontSize: 15, fontWeight: '600' },
});