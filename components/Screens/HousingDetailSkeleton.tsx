import React, { useEffect, useRef } from 'react';
import {
  View, StyleSheet, Animated, Dimensions, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors }         from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Shimmer bone ──────────────────────────────────────────────────────────────

function Bone({
  width, height, borderRadius = 8, style,
}: {
  width:         number | string;
  height:        number;
  borderRadius?: number;
  style?:        any;
}) {
  const C       = useColors();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.7] });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: C.border,
          opacity,
        },
        style,
      ]}
    />
  );
}

// ── Row of bones ──────────────────────────────────────────────────────────────

function BoneRow({ children, style }: { children: React.ReactNode; style?: any }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, style]}>{children}</View>;
}

// ── Main skeleton ─────────────────────────────────────────────────────────────

export default function HousingDetailSkeleton() {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>

      {/* Hero image placeholder */}
      <Bone width={SCREEN_WIDTH} height={280} borderRadius={0} />

      {/* Back button ghost */}
      <View style={[styles.backGhost, { top: insets.top + 10 }]}>
        <Bone width={80} height={34} borderRadius={20} />
      </View>

      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
      >
        <View style={styles.body}>

          {/* Title block */}
          <View style={{ gap: 8 }}>
            <Bone width="80%"  height={22} borderRadius={6} />
            <Bone width="55%"  height={14} borderRadius={5} />
            <Bone width={100}  height={24} borderRadius={20} />
          </View>

          {/* Stats card */}
          <View style={[styles.statsCard, { backgroundColor: C.surface, borderColor: C.border }]}>
            {[0, 1, 2, 3].map(i => (
              <View key={i} style={styles.statItem}>
                <Bone width={36} height={10} borderRadius={4} />
                <Bone width={44} height={14} borderRadius={4} />
              </View>
            ))}
          </View>

          {/* Section: About */}
          <View style={{ gap: 10 }}>
            <Bone width={60} height={14} borderRadius={4} />
            <Bone width="100%" height={13} borderRadius={4} />
            <Bone width="100%" height={13} borderRadius={4} />
            <Bone width="85%"  height={13} borderRadius={4} />
            <Bone width="70%"  height={13} borderRadius={4} />
          </View>

          {/* Section: Notes */}
          <View style={{ gap: 10 }}>
            <Bone width={50} height={14} borderRadius={4} />
            <View style={[styles.noteBox, { borderColor: C.border, backgroundColor: C.surface }]}>
              <Bone width="90%" height={13} borderRadius={4} />
              <Bone width="75%" height={13} borderRadius={4} />
            </View>
          </View>

          {/* Section: Charges */}
          <View style={{ gap: 10 }}>
            <Bone width={70} height={14} borderRadius={4} />
            {[0, 1, 2].map(i => (
              <BoneRow key={i} style={{ justifyContent: 'space-between' }}>
                <Bone width={120} height={13} borderRadius={4} />
                <Bone width={60}  height={13} borderRadius={4} />
              </BoneRow>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* CTA bar */}
      <View style={[
        styles.cta,
        { backgroundColor: C.surface, borderTopColor: C.border, paddingBottom: insets.bottom + 12 },
      ]}>
        <View style={{ gap: 6 }}>
          <Bone width={80} height={24} borderRadius={5} />
          <Bone width={50} height={12} borderRadius={4} />
        </View>
        <Bone width={180} height={50} borderRadius={14} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root:      { flex: 1 },
  scroll:    { paddingBottom: 120 },
  backGhost: { position: 'absolute', left: 16, zIndex: 10 },
  body:      { padding: 20, gap: 22 },
  statsCard: { flexDirection: 'row', borderRadius: 14, borderWidth: 0.5, overflow: 'hidden' },
  statItem:  { flex: 1, alignItems: 'center', padding: 12, gap: 8 },
  noteBox:   { borderRadius: 10, borderWidth: 0.5, padding: 12, gap: 8 },
  cta:       { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 14, borderTopWidth: 0.5 },
});