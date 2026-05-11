import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import AppHeader from '@/components/Headers/AppHeader';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const PADDING  = 16;
const CARD_W   = (width - PADDING * 2 - CARD_GAP) / 2;

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Section = {
  label:    string;
  sub:      string;
  icon:     IconName;
  route:    string;
  accent:   string;
  accentTx: string;
};

const SECTIONS: Section[] = [
  {
    label:    'Housing',
    sub:      'Find accommodation',
    icon:     'home',
    route:    '/(tabs)/(community)/housing',
    accent:   '#E8F5EE',
    accentTx: '#006B3F',
  },
  {
    label:    'Event Calendar',
    sub:      'Upcoming events',
    icon:     'calendar-today',
    route:    '/(tabs)/(community)/eventCalendar',
    accent:   '#FFF8DC',
    accentTx: '#7A5500',
  },

  {
    label:    'Jobs & Internships',
    sub:      'Find jobs, internships, and career opportunities',
    icon:     'work',
    route:    '/(tabs)/(community)/jobInternship',
    accent:   '#E6EEFF',
    accentTx: '#002395',
  },
  {
    label:    'Tour & Explore',
    sub:      'Discover cities, culture, and hidden gems',
    icon:     'explore',
    route:    '/(tabs)/(community)/tour',
    accent:   '#E8F5EE',
    accentTx: '#006B3F',
  },

  {
    label:    'GhaFra Care',
    sub:      'Support & assistance',
    icon:     'favorite',
    route:    '/(tabs)/(community)/ghafra_care',
    accent:   '#FDECEA',
    accentTx: '#A50D1E',
  },

  // OTA Update
  {
    label:    'Market & Services',
    sub:      'Buy, sell & hire',
    icon:     'storefront',
    route:    '/(tabs)/(community)/marketservice',
    accent:   '#FFF8DC',
    accentTx: '#7A5500',
  },
];

export default function CommunityScreen() {
  const C      = useColors();
  const router = useRouter();

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <AppHeader title="Community" rightIcon="bell" />

      <ScrollView
        contentContainerStyle={styles.scroll}
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
              style={[
                styles.card,
                {
                  backgroundColor: C.surface,
                  borderColor:     C.border,
                  width:           CARD_W,
                },
              ]}
              onPress={() => router.push(s.route as any)}
              activeOpacity={0.75}
            >
              {/* Top accent stripe */}
              <View style={[styles.stripe, { backgroundColor: C.primary }]} />

              <View style={styles.cardBody}>
                {/* Icon */}
                <View style={[styles.iconWrap, { backgroundColor: s.accent }]}>
                  <MaterialIcons name={s.icon} size={24} color={s.accentTx} />
                </View>

                {/* Text */}
                <Text
                  style={[styles.cardLabel, { color: C.textPrimary }]}
                  numberOfLines={2}
                >
                  {s.label}
                </Text>
                <Text
                  style={[styles.cardSub, { color: C.textMuted }]}
                  numberOfLines={2}
                >
                  {s.sub}
                </Text>
              </View>

              {/* Arrow */}
              <View style={styles.arrowRow}>
                <View style={[styles.arrowBadge, { backgroundColor: C.primarySubtle }]}>
                  <MaterialIcons name="arrow-forward" size={12} color={C.primary} />
                </View>
              </View>
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
    borderRadius:  16,
    borderWidth:   1,
    overflow:      'hidden',
  },

  stripe:     { height: 4 },

  cardBody: {
    padding: 14,
    gap:     10,
  },

  iconWrap: {
    width:          48,
    height:         48,
    borderRadius:   14,
    alignItems:     'center',
    justifyContent: 'center',
  },

  cardLabel: {
    fontSize:   15,
    fontWeight: '700',
    lineHeight: 20,
  },
  cardSub: {
    fontSize:   12,
    lineHeight: 17,
  },

  arrowRow: {
    paddingHorizontal: 14,
    paddingBottom:     14,
    alignItems:        'flex-end',
  },
  arrowBadge: {
    width:          28,
    height:         28,
    borderRadius:   8,
    alignItems:     'center',
    justifyContent: 'center',
  },
});