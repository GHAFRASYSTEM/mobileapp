import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, Image, StyleSheet,
  Animated, Easing, ImageBackground,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';

import KenteImg        from '../../assets/images/kente.png';
import IndependenceImg from '../../assets/images/indpendence.jpg';
import EiffelImg       from '../../assets/images/eiffel.png';

const MIN_SPLASH_MS = 1800;

export function SplashGate() {
  const { state } = useAuth();
  const startTime = useRef(Date.now());
  const [visible, setVisible] = useState(true);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.94)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1, friction: 7, tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (state.status === 'loading') return;
    const elapsed   = Date.now() - startTime.current;
    const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
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
      style={[StyleSheet.absoluteFillObject, { opacity: fadeOut, zIndex: 999 }]}
      pointerEvents="none"
    >
      {/* Layer 1: Independence Arch — full screen base */}
      <Image
        source={IndependenceImg}
        style={styles.baseImage}
        resizeMode="cover"
      />

      {/* Layer 2: Eiffel Tower — ghosted over the right half, anchored to bottom */}
      <Image
        source={EiffelImg}
        style={styles.eiffelImage}
        resizeMode="cover"
      />

      {/* Layer 3: Kente — tiled over everything, barely visible */}
      <ImageBackground
        source={KenteImg}
        style={StyleSheet.absoluteFillObject}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.18 }}
      />

      {/* Layer 4: Dark green wash — unifies all three images */}
      <View style={styles.greenOverlay} />

      {/* Layer 5: Centered content */}
      <Animated.View style={[styles.content, { opacity, transform: [{ scale }] }]}>

        <View style={styles.badgeOuter}>
          <View style={styles.badgeInner}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <Text style={styles.title}>GHAFRA</Text>

        <View style={styles.flagBar}>
          {['#CE1126', '#FCD116', '#006B3F', '#FCD116', '#CE1126'].map((c, i) => (
            <View key={i} style={[styles.flagSeg, { backgroundColor: c }]} />
          ))}
        </View>

        <Text style={styles.sub}>Ghana · France Association</Text>

        {state.status === 'loading' && <PulsingDots />}
      </Animated.View>

    </Animated.View>
  );
}

function PulsingDots() {
  const anims = useRef([
    new Animated.Value(0.25),
    new Animated.Value(0.25),
    new Animated.Value(0.25),
  ]).current;

  useEffect(() => {
    const pulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1,    duration: 420, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.25, duration: 420, useNativeDriver: true }),
        ])
      ).start();

    anims.forEach((a, i) => pulse(a, i * 170));
    return () => anims.forEach(a => a.stopAnimation());
  }, []);

  return (
    <View style={styles.dotsRow}>
      {anims.map((anim, i) => (
        <Animated.View key={i} style={[styles.dot, { opacity: anim }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // Layer 1: full-screen base
  baseImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  // Layer 2: Eiffel — tall, anchored bottom-right, ghosted
  eiffelImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.42,
  },

  // Layer 4: Dark green wash
  greenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(1, 15, 7, 0.74)',
  },

  // Layer 5: Content
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  badgeOuter: {
    width: 88, height: 88,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 8,
  },
  badgeInner: {
    width: 70, height: 70, borderRadius: 17,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  logo: { width: 56, height: 56, borderRadius: 14 },

  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 10,
  },

  flagBar: {
    flexDirection: 'row',
    width: 96, height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  flagSeg: { flex: 1 },

  sub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
  },

  dotsRow: { flexDirection: 'row', gap: 7, marginTop: 40 },
  dot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: '#fff',
  },
});