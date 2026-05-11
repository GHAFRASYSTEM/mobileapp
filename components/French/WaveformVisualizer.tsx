/**
 * WaveformVisualizer.tsx
 *
 * Animated waveform bars.
 * Props:
 *   isActive  — when true, bars animate randomly (recording / playing)
 *   color     — bar color (default white)
 *   barCount  — number of bars (default 5)
 */

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

interface Props {
  isActive:  boolean;
  color?:    string;
  barCount?: number;
}

export default function WaveformVisualizer({
  isActive,
  color    = '#fff',
  barCount = 5,
}: Props) {
  const anims = useRef<Animated.Value[]>(
    Array.from({ length: barCount }, () => new Animated.Value(0.2)),
  ).current;

  useEffect(() => {
    if (!isActive) {
      anims.forEach(a =>
        Animated.timing(a, { toValue: 0.2, duration: 300, useNativeDriver: true }).start(),
      );
      return;
    }

    const loops = anims.map((a, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 80),
          Animated.timing(a, {
            toValue:         0.2 + Math.random() * 0.8,
            duration:        200 + Math.random() * 200,
            easing:          Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(a, {
            toValue:         0.2,
            duration:        200 + Math.random() * 200,
            easing:          Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
  }, [isActive]);

  return (
    <View style={styles.row}>
      {anims.map((a, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            { backgroundColor: color, transform: [{ scaleY: a }] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            4,
    height:         32,
  },
  bar: {
    width:        4,
    height:       28,
    borderRadius: 2,
  },
});
