import React, { useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Linking, Animated,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors }         from '@/constants/Colors';
import ScreenHeader          from '@/components/Headers/ScreenHeader';

// ── Data ──────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    id:      'email',
    label:   'Email us',
    handle:  'ghafra.nord@gmail.com',
    url:     'mailto:ghafra.nord@gmail.com',
    icon:    '✉',
    accent:  '#EA4335',
    bg:      '#FEF2F1',
    bgDark:  '#2A1A19',
  },
  {
    id:      'facebook',
    label:   'Facebook',
    handle:  'Ghafra NORD',
    url:     'https://www.facebook.com/p/Ghafra-NORD-61578953407441/',
    icon:    'f',
    accent:  '#1877F2',
    bg:      '#EEF4FE',
    bgDark:  '#111C2E',
  },
  {
    id:      'instagram',
    label:   'Instagram',
    handle:  '@ghafra_nord',
    url:     'https://www.instagram.com/ghafra_nord/',
    icon:    '◎',
    accent:  '#E1306C',
    bg:      '#FEF0F4',
    bgDark:  '#2A1120',
  },
  {
    id:      'linkedin',
    label:   'LinkedIn',
    handle:  'GhaFra Nord',
    url:     'https://www.linkedin.com/company/ghafra-nord',
    icon:    'in',
    accent:  '#0A66C2',
    bg:      '#EEF5FC',
    bgDark:  '#0D1A26',
  },
] as const;

// ── Pressable contact card ────────────────────────────────────────────────────

function ContactCard({
  label, handle, url, icon, accent, bg, bgDark,
}: (typeof SOCIAL_LINKS)[number]) {
  const C     = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const isDark = C.background === '#0D0D0D' || C.background === '#111111'
    || (C.background < '#888888');   // rough dark-mode detection by hex value

  const cardBg = isDark ? bgDark : bg;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 40 }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

  const handleOpen = () => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={handleOpen}
        style={[styles.card, { backgroundColor: cardBg, borderColor: accent + '30' }]}
      >
        {/* Icon circle */}
        <View style={[styles.iconCircle, { backgroundColor: accent }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>

        {/* Text */}
        <View style={styles.cardText}>
          <Text style={[styles.cardLabel, { color: C.textPrimary }]}>{label}</Text>
          <Text style={[styles.cardHandle, { color: accent }]} numberOfLines={1}>{handle}</Text>
        </View>

        {/* Arrow */}
        <View style={[styles.arrow, { backgroundColor: accent + '18' }]}>
          <Text style={[styles.arrowText, { color: accent }]}>→</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function ContactScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <ScreenHeader
        variant="page"
        title="Contact"
        subtitle="We'd love to hear from you"
        icon="envelope.fill"
      />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <View style={[styles.introBox, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.introTitle, { color: C.textPrimary }]}>Get in touch</Text>
          <Text style={[styles.introBody, { color: C.textSecondary }]}>
            Have a question, a listing to share, or just want to connect? Reach us through any of the channels below — we try to respond within 24 hours.
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cards}>
          {SOCIAL_LINKS.map(link => (
            <ContactCard key={link.id} {...link} />
          ))}
        </View>

        {/* Footer note */}
        <Text style={[styles.footer, { color: C.textMuted }]}>
          GhaFra Nord · Connecting the Ghanaian-French community
        </Text>
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:         { flex: 1 },
  scroll:       { padding: 20, gap: 0 },

  introBox:     {
    borderRadius: 16,
    borderWidth:  0.5,
    padding:      18,
    marginBottom: 20,
    gap:          6,
  },
  introTitle:   { fontSize: 16, fontWeight: '700' },
  introBody:    { fontSize: 14, lineHeight: 21 },

  cards:        { gap: 12, marginBottom: 28 },

  card:         {
    flexDirection:  'row',
    alignItems:     'center',
    borderRadius:   16,
    borderWidth:    0.5,
    padding:        14,
    gap:            14,
  },
  iconCircle:   {
    width:          48,
    height:         48,
    borderRadius:   14,
    alignItems:     'center',
    justifyContent: 'center',
  },
  iconText:     { color: '#fff', fontSize: 18, fontWeight: '800' },
  cardText:     { flex: 1, gap: 2 },
  cardLabel:    { fontSize: 14, fontWeight: '600' },
  cardHandle:   { fontSize: 13, fontWeight: '500' },
  arrow:        {
    width:          34,
    height:         34,
    borderRadius:   10,
    alignItems:     'center',
    justifyContent: 'center',
  },
  arrowText:    { fontSize: 16, fontWeight: '700' },

  footer:       { textAlign: 'center', fontSize: 12, lineHeight: 18 },
});