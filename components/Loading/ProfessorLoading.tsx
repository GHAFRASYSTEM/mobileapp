/**
 * ProfessorLoading.tsx
 *
 * Simple loading screen — icon, title, subtitle, animated dots.
 * Dark + light mode via useColors().
 *
 * Place at: components/French/ProfessorLoading.tsx
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';

export default function ProfessorLoading() {
  const C = useColors();
  const isDark = C.background === '#111210';

  const spin  = useRef(new Animated.Value(0)).current;
  const dot1  = useRef(new Animated.Value(0.25)).current;
  const dot2  = useRef(new Animated.Value(0.25)).current;
  const dot3  = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const makeDot = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1,    duration: 300, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.25, duration: 420, useNativeDriver: true }),
          Animated.delay(680),
        ])
      );
    makeDot(dot1, 0).start();
    makeDot(dot2, 220).start();
    makeDot(dot3, 440).start();
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={C.background}
      />

      <Animated.View style={[styles.iconWrap, { backgroundColor: C.primarySubtle, transform: [{ rotate }] }]}>
        <Ionicons name="language-outline" size={28} color={C.primary} />
      </Animated.View>

      <Text style={[styles.title, { color: C.textPrimary }]}>
        Preparing your lesson…
      </Text>
      <Text style={[styles.subtitle, { color: C.textMuted }]}>
        Loading your French tutor
      </Text>

      <View style={styles.dots}>
        {[dot1, dot2, dot3].map((anim, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: C.primary, opacity: anim, transform: [{ scale: anim }] },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  dots: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});