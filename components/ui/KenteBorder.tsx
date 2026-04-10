import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ─── Palette ──────────────────────────────────────────────────────────────────
const COLORS = [
  '#D44000',
  '#FCA500',
  '#2E7D32',
  '#1A1A18',
  '#FCA500',
  '#D44000',
  '#2E7D32',
  '#FCA500',
  '#1A1A18',
  '#D44000',
  '#FCA500',
  '#2E7D32',
];
const REV = [...COLORS].reverse();

const THICKNESS = 4;
const SEG_H     = 10;   // short segments = woven kente look
const SEG_W     = width / COLORS.length; // horizontal segment width

// Device corner radius
const CORNER_R = Platform.select({ ios: 44, android: 28, default: 28 })!;

// ─── Shimmer ──────────────────────────────────────────────────────────────────
function useShimmer() {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(a, { toValue: 1, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return a;
}

// ─── Components ───────────────────────────────────────────────────────────────

/** Top or bottom horizontal strip — no borderRadius, no overflow:hidden */
function HEdge({
  colors,
  top,
  bottom,
  shimmer,
}: {
  colors:  string[];
  top?:    number;
  bottom?: number;
  shimmer: Animated.Value;
}) {
  return (
    <View
      pointerEvents="none"
      style={{
        position:      'absolute',
        left:          CORNER_R,          // leave room for corner arc
        right:         CORNER_R,
        height:        THICKNESS,
        top,
        bottom,
        flexDirection: 'row',
        zIndex:        9998,
      }}
    >
      {colors.map((color, i) => {
        const opacity = shimmer.interpolate({
          inputRange:  [0, 1],
          outputRange: [i % 2 === 0 ? 0.82 : 1, i % 2 === 0 ? 1 : 0.82],
        });
        return <Animated.View key={i} style={{ flex: 1, backgroundColor: color, opacity }} />;
      })}
    </View>
  );
}

/** Left or right vertical strip — short tiled segments */
function VEdge({
  colors,
  left,
  right,
  shimmer,
}: {
  colors:  string[];
  left?:   number;
  right?:  number;
  shimmer: Animated.Value;
}) {
  const availH = height - CORNER_R * 2;
  const count  = Math.ceil(availH / SEG_H);

  return (
    <View
      pointerEvents="none"
      style={{
        position:      'absolute',
        top:           CORNER_R,           // leave room for corner arc
        bottom:        CORNER_R,
        width:         THICKNESS,
        left,
        right,
        flexDirection: 'column',
        zIndex:        9998,
        overflow:      'hidden',
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const color   = colors[i % colors.length];
        const opacity = shimmer.interpolate({
          inputRange:  [0, 1],
          outputRange: [i % 2 === 0 ? 1 : 0.82, i % 2 === 0 ? 0.82 : 1],
        });
        return (
          <Animated.View
            key={i}
            style={{ width: THICKNESS, height: SEG_H, backgroundColor: color, opacity }}
          />
        );
      })}
    </View>
  );
}

/**
 * Corner arc — a CORNER_R × CORNER_R view with a single border
 * on the two relevant sides and the matching borderRadius.
 * One element, no children, no overlap.
 */
function CornerArc({
  tl, tr, bl, br,
  color,
}: {
  tl?: boolean; tr?: boolean; bl?: boolean; br?: boolean;
  color: string;
}) {
  const isTop  = tl || tr;
  const isLeft = tl || bl;

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width:    CORNER_R,
        height:   CORNER_R,
        zIndex:   9999,

        // Position at the true screen corner
        top:    isTop  ? 0 : undefined,
        bottom: !isTop ? 0 : undefined,
        left:   isLeft ? 0 : undefined,
        right:  !isLeft ? 0 : undefined,

        // Border only on the two sides that face inward
        borderTopWidth:    isTop  ? THICKNESS : 0,
        borderBottomWidth: !isTop ? THICKNESS : 0,
        borderLeftWidth:   isLeft ? THICKNESS : 0,
        borderRightWidth:  !isLeft ? THICKNESS : 0,
        borderColor: color,

        // Single radius on the matching corner
        borderTopLeftRadius:     tl ? CORNER_R : 0,
        borderTopRightRadius:    tr ? CORNER_R : 0,
        borderBottomLeftRadius:  bl ? CORNER_R : 0,
        borderBottomRightRadius: br ? CORNER_R : 0,
      }}
    />
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function KenteBorder() {
  const shimmer = useShimmer();

  // Pick a colour for each corner from the palette
  // so they blend naturally with adjacent strips
  const cornerColors = {
    tl: COLORS[0],   // burnt orange
    tr: REV[0],      // green
    bl: COLORS[3],   // black
    br: REV[3],      // gold
  };

  return (
    <>
      {/* Horizontal strips — inset from corners */}
      <HEdge colors={COLORS} top={0}    shimmer={shimmer} />
      <HEdge colors={REV}    bottom={0} shimmer={shimmer} />

      {/* Vertical strips — inset from corners */}
      <VEdge colors={COLORS} left={0}  shimmer={shimmer} />
      <VEdge colors={REV}    right={0} shimmer={shimmer} />

      {/* Four corner arcs — each is one borderRadius element */}
      <CornerArc tl color={cornerColors.tl} />
      <CornerArc tr color={cornerColors.tr} />
      <CornerArc bl color={cornerColors.bl} />
      <CornerArc br color={cornerColors.br} />
    </>
  );
}