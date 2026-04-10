import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useColors } from '@/constants/Colors';

export default function HousingCardSkeleton() {
  const C = useColors();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: C.surface,
          borderColor: C.border,
          opacity,
        },
      ]}
    >
      {/* Image placeholder */}
      <View style={[styles.image, { backgroundColor: C.border }]} />

      {/* Content */}
      <View style={styles.body}>
        <View style={[styles.line, { width: '70%', backgroundColor: C.border }]} />
        <View style={[styles.line, { width: '50%', backgroundColor: C.border }]} />

        <View style={styles.row}>
          <View style={[styles.small, { backgroundColor: C.border }]} />
          <View style={[styles.dot, { backgroundColor: C.border }]} />
          <View style={[styles.small, { backgroundColor: C.border }]} />
          <View style={[styles.dot, { backgroundColor: C.border }]} />
          <View style={[styles.small, { backgroundColor: C.border }]} />
        </View>

        <View style={[styles.price, { backgroundColor: C.border }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  body: {
    padding: 14,
    gap: 8,
  },
  line: {
    height: 12,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  small: {
    width: 40,
    height: 10,
    borderRadius: 5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
  },
  price: {
    width: 80,
    height: 14,
    borderRadius: 6,
    marginTop: 6,
  },
});