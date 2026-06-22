import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import AppHeader from '@/components/Headers/AppHeader';
import { SECTIONS } from '@/assets/data/exploreSectionData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const PADDING  = 16;
const CARD_W   = (width - PADDING * 2 - CARD_GAP) / 2;


export default function CommunityScreen() {
  const C      = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets(); 

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <AppHeader title="Community" rightIcon="bell" />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 80 }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Section intro */}
        <View style={styles.intro}>
          <Text style={[styles.introTitle, { color: C.textPrimary }]}>
            Explore
          </Text>
          <Text style={[styles.introSub, { color: C.textSecondary }]}>
            Everything the GHAFRA community offers
          </Text>
        </View>

        {/* 2-column grid */}
        <View style={styles.grid}>
{SECTIONS.map((s) => (
  <TouchableOpacity
    key={s.route}
    style={[styles.card, { backgroundColor: C.surface, borderColor: C.border, width: CARD_W }]}
    onPress={() => router.push(s.route as any)}
    activeOpacity={0.75}
  >
    {/* Icon + Arrow row */}
    <View style={styles.cardTop}>
      <View style={[styles.iconWrap, { backgroundColor: s.accent }]}>
        <MaterialIcons name={s.icon} size={20} color={s.accentTx} />
      </View>
      <View style={[styles.arrowBadge, { backgroundColor: C.primarySubtle }]}>
        <MaterialIcons name="arrow-forward" size={13} color={C.primary} />
      </View>
    </View>

    {/* Text */}
    <Text style={[styles.cardLabel, { color: C.textPrimary }]} numberOfLines={2}>
      {s.label}
    </Text>
    <Text style={[styles.cardSub, { color: C.textMuted }]} numberOfLines={2}>
      {s.sub}
    </Text>
  </TouchableOpacity>
))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:       { flex: 1 },
  scroll:     { padding: PADDING, paddingBottom: 40 },

  intro:      { marginBottom: 20 },
  introTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  introSub:   { fontSize: 13, marginTop: 3 },

  grid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           CARD_GAP,
  },

 card: {
    borderRadius: 14,
    borderWidth: 0.5,
    padding: 14,
    gap: 10,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
  },

  cardSub: {
    fontSize: 12,
    lineHeight: 17,
  },
});