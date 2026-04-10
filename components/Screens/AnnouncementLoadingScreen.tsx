import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';

export default function AnnouncementLoadingScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();

  const skeleton = {
    background: C.border,
    highlight: C.surface,
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>

      {/* Fake close button */}
      <View
        style={[
          styles.closeBtn,
          {
            top: insets.top + 12,
            backgroundColor: skeleton.background,
          },
        ]}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero skeleton */}
        <View style={[styles.hero, { backgroundColor: skeleton.background }]} />

        <View style={[styles.content, { paddingTop: 20 }]}>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <View style={[styles.pill, { backgroundColor: skeleton.background }]} />
            <View style={[styles.dateSkeleton, { backgroundColor: skeleton.background }]} />
          </View>

          {/* Title skeleton */}
          <View style={[styles.titleSkeleton, { backgroundColor: skeleton.background }]} />
          <View style={[styles.titleSkeletonShort, { backgroundColor: skeleton.background }]} />

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: C.border }]} />

          {/* Body skeleton */}
          {[...Array(5)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.bodyLine,
                {
                  backgroundColor: skeleton.background,
                  width: i === 4 ? '70%' : '100%',
                },
              ]}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  hero: {
    width: '100%',
    height: 240,
  },

  content: {
    padding: 20,
    gap: 12,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pill: {
    width: 80,
    height: 24,
    borderRadius: 20,
  },

  dateSkeleton: {
    width: 120,
    height: 12,
    borderRadius: 6,
  },

  titleSkeleton: {
    width: '100%',
    height: 22,
    borderRadius: 6,
  },

  titleSkeletonShort: {
    width: '70%',
    height: 22,
    borderRadius: 6,
  },

  divider: {
    height: 1,
    marginVertical: 8,
  },

  bodyLine: {
    height: 14,
    borderRadius: 6,
  },
});