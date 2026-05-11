import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, Image, StyleSheet,
  Animated, Easing, ImageBackground,
} from 'react-native';
import { useAuth }   from '@/context/AuthContext';
import { useColors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// How long to show the splash MINIMUM (only while auth is still loading)
const MIN_SPLASH_MS = 1800;

/**
 * SplashGate is a PURE VISUAL overlay — it has ZERO routing logic.
 * It simply covers the app while auth state is resolving, then fades away.
 * All routing decisions live exclusively in NavigationGuard (_layout.tsx).
 */
export function SplashGate() {
  const { state } = useAuth();
  const C         = useColors();
  const insets    = useSafeAreaInsets();
  const startTime = useRef(Date.now());
  const [visible, setVisible] = useState(true);

  // Animations
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.88)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  // Animate in on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1, friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Dismiss once auth is resolved — respecting minimum display time
  useEffect(() => {
    // Stay visible while loading
    if (state.status === 'loading') return;

    const elapsed   = Date.now() - startTime.current;
    const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);

    // NavigationGuard has already queued the correct route.
    // We just need to fade out and unmount — nothing else.
    setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0, duration: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, remaining);
  }, [state.status]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { opacity: fadeOut, zIndex: 999 },
      ]}
      pointerEvents="none" // Let touches pass through once fading
    >
      <ImageBackground
        source={require('@/assets/images/kente.png')}
        style={styles.root}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: C.header }]} />

        <Animated.View style={[
          styles.content,
          {
            paddingTop: insets.top + 40,
            opacity,
            transform: [{ scale }],
          },
        ]}>
          <View style={[styles.logoBadge, { borderColor: C.gold }]}>
            <View style={styles.logoInner}>
              <Image
                source={require('@/assets/images/icon.png')}
                style={styles.logo}
              />
            </View>
          </View>

          <Text style={styles.title}>GHAFRA</Text>

          <View style={styles.flagBar}>
            {['#CE1126', '#FCD116', '#006B3F', '#FCD116', '#CE1126'].map((c, i) => (
              <View key={i} style={[styles.flagSegment, { backgroundColor: c }]} />
            ))}
          </View>

          <Text style={styles.sub}>Ghana · France Association</Text>

          {/* Loading dots — only while auth is resolving */}
          {state.status === 'loading' && (
            <PulsingDots color={C.gold} />
          )}
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated loading dots
// ─────────────────────────────────────────────────────────────────────────────
function PulsingDots({ color }: { color: string }) {
  const anims = useRef([
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]).current;

  useEffect(() => {
    const pulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1,   duration: 400, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ])
      ).start();

    anims.forEach((a, i) => pulse(a, i * 160));
    return () => anims.forEach(a => a.stopAnimation());
  }, []);

  return (
    <View style={styles.dotsRow}>
      {anims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { backgroundColor: color, opacity: anim }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, opacity: 0.68 },
  content: { flex: 1, alignItems: 'center', gap: 10 },

  logoBadge: {
    width: 88, height: 88, borderRadius: 24, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 6,
  },
  logoInner: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  logo: { width: 64, height: 64, borderRadius: 16 },

  title: { fontSize: 34, fontWeight: '900', color: '#fff', letterSpacing: 6 },

  flagBar:     { flexDirection: 'row', width: 90, height: 3, borderRadius: 2, overflow: 'hidden' },
  flagSegment: { flex: 1 },

  sub:     { fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 2.5, textTransform: 'uppercase' },
  dotsRow: { flexDirection: 'row', gap: 6, marginTop: 40 },
  dot:     { width: 7, height: 7, borderRadius: 4 },
});