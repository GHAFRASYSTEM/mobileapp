/**
 * VoiceOrb.tsx
 *
 * Animated circular button that sits at the bottom of LearnFrenchScreen.
 * Tapping it opens the FrenchAI conversation screen.
 *
 * Usage:
 *   <VoiceOrb style={{ bottom: 40, right: 20 }} />
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColors } from '@/constants/Colors';

type Props = {
  style?: ViewStyle;
};

export default function VoiceOrb({ style }: Props) {
  const C      = useColors();
  const router = useRouter();

  // ── Pulse rings ─────────────────────────────────────────────────────────────
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const glow  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue:         1,
            duration:        1600,
            easing:          Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue:         0,
            duration:        0,
            useNativeDriver: true,
          }),
        ]),
      );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );

    const r1 = pulse(ring1, 0);
    const r2 = pulse(ring2, 600);
    r1.start();
    r2.start();
    glowLoop.start();

    return () => { r1.stop(); r2.stop(); glowLoop.stop(); };
  }, []);

  const ringStyle = (anim: Animated.Value) => ({
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] }) }],
    opacity:   anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0.5, 0.3, 0] }),
  });

  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.0] });

  return (
    <View style={[styles.wrap, style]}>
      {/* Pulse rings */}
      <Animated.View
        style={[styles.ring, { borderColor: '#4F8EF7' }, ringStyle(ring1)]}
        pointerEvents="none"
      />
      <Animated.View
        style={[styles.ring, { borderColor: '#4F8EF7' }, ringStyle(ring2)]}
        pointerEvents="none"
      />

      {/* Main orb */}
      <Animated.View style={{ opacity: glowOpacity }}>
        <TouchableOpacity
          onPress={() => router.push('/(standalone)/frenchAI')}
          style={styles.orb}
          activeOpacity={0.85}
        >
          {/* Mic icon */}
          <Text style={styles.icon}>🎤</Text>
          <Text style={styles.label}>AI Tutor</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const ORB_SIZE = 68;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    // Removed hardcoded bottom + alignSelf so parent can control position
    alignItems:     'center',
    justifyContent: 'center',
    zIndex: 100,           // ensure it stays on top
  },
  ring: {
    position:     'absolute',
    width:        ORB_SIZE,
    height:       ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    borderWidth:  1.5,
  },
  orb: {
    width:           ORB_SIZE,
    height:          ORB_SIZE,
    borderRadius:    ORB_SIZE / 2,
    backgroundColor: '#4F8EF7',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             2,
    shadowColor:     '#4F8EF7',
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.5,
    shadowRadius:    12,
    elevation:       8,
  },
  icon:  { fontSize: 22 },
  label: { fontSize: 9, color: '#fff', fontWeight: '700', letterSpacing: 0.5 },
});