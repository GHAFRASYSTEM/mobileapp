// app/(auth)/Welcome.tsx
import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated, Pressable,
  StatusBar, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter }         from 'expo-router';
import { useColors }         from '@/constants/Colors';
import HeroBanner            from '@/components/Banners/HeroBanner';
import { useEntrance }       from '@/hooks/animation/useEntrance';


const BENEFITS = [
  {
    emoji: '🤝',
    title: 'A Community Built for You',
    body:  'Connect with Ghanaians living in France — share resources, opportunities, and experiences.',
  },
  {
    emoji: '📋',
    title: 'Official Membership',
    body:  'Your profile feeds official membership data reported to the Ghanaian government in France.',
  },
  {
    emoji: '🔔',
    title: 'Events & Announcements',
    body:  'Be the first to know about cultural events, meetings, and news relevant to your community.',
  },
];

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const C      = useColors();
  const router = useRouter();
    const anim   = useEntrance();
  

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <HeroBanner
              opacity={anim.opacity1}
              translateY={anim.translate1}
              topInset={insets.top}
            />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: 10, paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Logo / wordmark */}


          {/* Benefits */}
          <View style={styles.benefits}>
            {BENEFITS.map((b, i) => (
              <View
                key={i}
                style={[styles.card, { backgroundColor: C.surface ?? '#1c1c1e' }]}
              >
                <Text style={styles.emoji}>{b.emoji}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardTitle, { color: C.textPrimary ?? '#fff' }]}>{b.title}</Text>
                  <Text style={[styles.cardBody,  { color: C.textMuted ?? '#999' }]}>{b.body}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* CTA */}
          <Pressable
            style={[styles.cta, { backgroundColor: C.primary ?? '#c8a951' }]}
            onPress={() => router.replace('/(auth)/SignIn')}
          >
            <Text style={styles.ctaText}>Get Started</Text>
          </Pressable>

          <Text style={[styles.legal, { color: C.textMuted ?? '#777' }]}>
            By continuing you agree to share your name and email with GHAFRA.
            We collect city, occupation, and optional demographic details for
            membership administration and government reporting only.
            Your data is never used for advertising.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:      { flex: 1 },
  scroll:    { paddingHorizontal: 24, gap: 0 },
  logo:      { fontSize: 36, fontWeight: '800', letterSpacing: 4, textAlign: 'center' },
  tagline:   { fontSize: 14, textAlign: 'center', marginTop: 6, marginBottom: 36 },
  benefits:  { gap: 14, marginBottom: 36 },
  card:      { flexDirection: 'row', borderRadius: 14, padding: 16, gap: 14, alignItems: 'flex-start' },
  emoji:     { fontSize: 28, lineHeight: 34 },
  cardText:  { flex: 1, gap: 4 },
  cardTitle: { fontSize: 15, fontWeight: '700' },
  cardBody:  { fontSize: 13, lineHeight: 19 },
  cta: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaText: { color: '#000', fontWeight: '700', fontSize: 16 },
  legal:    { fontSize: 11, textAlign: 'center', lineHeight: 16 },
});