/**
 * ProfessorLoading.tsx
 *
 * Full classroom scene — chalkboard, bookshelf, desk, chalk dust,
 * animated professor, Ghana-flag stripe card, dark + light mode.
 *
 * Place at: components/French/ProfessorLoading.tsx
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import Svg, {
  Rect, Circle, Ellipse, Path, Line, G,
  Text as SvgText,
} from 'react-native-svg';
import { useColors } from '@/constants/Colors';

const AnimatedG    = Animated.createAnimatedComponent(G);
const AnimatedView = Animated.View;

// ── tiny classroom props ─────────────────────────────────────────────────────
const BOOKS = [
  { w: 10, h: 48, color: '#CE1126', delay: 0 },
  { w: 8,  h: 42, color: '#002395', delay: 300 },
  { w: 11, h: 50, color: '#006B3F', delay: 600 },
  { w: 8,  h: 38, color: '#FCD116', delay: 200 },
  { w: 9,  h: 44, color: '#888780', delay: 800 },
];

const DESK_BOOKS = [
  { w: 22, h: 28, color: '#CE1126' },
  { w: 18, h: 24, color: '#002395' },
  { w: 16, h: 20, color: '#006B3F' },
];

// ── Book bob helper ──────────────────────────────────────────────────────────
function Book({ w, h, color, delay }: { w: number; h: number; color: string; delay: number }) {
  const bob = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(bob, { toValue: -3, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0,  duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <AnimatedView
      style={{
        width: w, height: h,
        backgroundColor: color,
        borderRadius: 2,
        transform: [{ translateY: bob }],
      }}
    />
  );
}

// ── Dust mote helper ─────────────────────────────────────────────────────────
function DustMote({ x, y, delay }: { x: number; y: number; delay: number }) {
  const tx  = useRef(new Animated.Value(0)).current;
  const ty  = useRef(new Animated.Value(0)).current;
  const op  = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = () => {
      tx.setValue(0); ty.setValue(0); op.setValue(0);
      Animated.parallel([
        Animated.timing(tx, { toValue: 10,  duration: 2400, useNativeDriver: true }),
        Animated.timing(ty, { toValue: -20, duration: 2400, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(op, { toValue: 0.6, duration: 400,  useNativeDriver: true }),
          Animated.timing(op, { toValue: 0,   duration: 2000, useNativeDriver: true }),
        ]),
      ]).start(() => setTimeout(loop, delay + Math.random() * 600));
    };
    setTimeout(loop, delay);
  }, []);
  return (
    <AnimatedView
      style={{
        position: 'absolute',
        top: y, left: x,
        width: 4, height: 4,
        borderRadius: 2,
        backgroundColor: '#C8B888',
        opacity: op,
        transform: [{ translateX: tx }, { translateY: ty }],
      }}
    />
  );
}

// ── Stripe that scrolls continuously ────────────────────────────────────────
const STRIPE_TILE = 40; // one colour block
const STRIPE_SEG  = STRIPE_TILE * 3;
const STRIPE_REPS = 6;

function GhanaStripe({ primary, gold, danger }: { primary: string; gold: string; danger: string }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue:  -STRIPE_SEG,
        duration: 1400,
        easing:   Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  return (
    <View style={stripe.track}>
      <AnimatedView style={[stripe.inner, { transform: [{ translateX: scrollX }] }]}>
        {[...Array(STRIPE_REPS)].map((_, i) => (
          <View key={i} style={stripe.seg}>
            <View style={[stripe.block, { backgroundColor: primary }]} />
            <View style={[stripe.block, { backgroundColor: gold }]}    />
            <View style={[stripe.block, { backgroundColor: danger }]}  />
          </View>
        ))}
      </AnimatedView>
    </View>
  );
}
const stripe = StyleSheet.create({
  track: { height: 6, overflow: 'hidden' },
  inner: { flexDirection: 'row', width: STRIPE_SEG * STRIPE_REPS + STRIPE_SEG },
  seg:   { flexDirection: 'row', width: STRIPE_SEG },
  block: { width: STRIPE_TILE, height: 6 },
});

// ── Main component ────────────────────────────────────────────────────────────
export default function ProfessorLoading() {
  const C   = useColors();
  const { width } = useWindowDimensions();
  const isDark = C.background === '#111210';

  // Animations
  const floatAnim  = useRef(new Animated.Value(0)).current;
  const blinkAnim  = useRef(new Animated.Value(1)).current;
  const armAnim    = useRef(new Animated.Value(0)).current;
  const dot1       = useRef(new Animated.Value(0.25)).current;
  const dot2       = useRef(new Animated.Value(0.25)).current;
  const dot3       = useRef(new Animated.Value(0.25)).current;
  const fadeIn     = useRef(new Animated.Value(0)).current;
  const slideIn    = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideIn, { toValue: 0, duration: 600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -7, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0,  duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(4000),
        Animated.timing(blinkAnim, { toValue: 0, duration: 75, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 75, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(armAnim, { toValue: 1, duration: 950, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(armAnim, { toValue: 0, duration: 950, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
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

  const armRotate = armAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-20deg'] });

  // Classroom colours
  const wallColor  = isDark ? '#1A1B18' : '#EEF0E8';
  const floorColor = isDark ? '#16170E' : '#DDD9C8';
  const boardColor = isDark ? '#1A2E22' : '#1F4A2E';
  const shelfColor = isDark ? '#2A2B1E' : '#C8B888';
  const shelfBorder= isDark ? '#3A3B2E' : '#A89868';
  const deskColor  = isDark ? '#2C2A1A' : '#C8B888';
  const windowBg   = isDark ? '#0A1240' : '#E6EEFF';
  const boardText  = isDark ? '#5DCAA5' : '#7DDAAE';

  return (
    <View style={[sc.root, { backgroundColor: C.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={C.background}
      />

      {/* ── Background wall ── */}
      <View style={[sc.wall, { backgroundColor: wallColor }]} />

      {/* ── Window (top-right) ── */}
      <View style={[sc.windowFrame, { borderColor: isDark ? '#2A2B28' : '#C8C4B0' }]}>
        <View style={[sc.windowPane, { backgroundColor: windowBg }]}>
          <View style={[sc.windowBarH, { backgroundColor: isDark ? '#2A2B28' : '#C8C4B0' }]} />
          <View style={[sc.windowBarV, { backgroundColor: isDark ? '#2A2B28' : '#C8C4B0' }]} />
          <View style={[sc.sun, { backgroundColor: C.gold }]} />
        </View>
      </View>

      {/* ── Chalkboard ── */}
      <View style={[sc.board, { backgroundColor: boardColor, borderColor: isDark ? '#2DB875' : '#5F5E5A' }]}>
        <SvgText style={{ display: 'none' }} />
        <Svg width={180} height={90} viewBox="0 0 180 90">
          <SvgText x="10" y="22" fontSize="11" fontWeight="500" fill={boardText} opacity={0.85}>
            Bonjour, classe !
          </SvgText>
          <Line x1="10" y1="30" x2="170" y2="30" stroke={boardText} strokeWidth="0.8" strokeDasharray="5 3" opacity={0.35} />
          <SvgText x="10" y="48" fontSize="10" fill={boardText} opacity={0.6}>
            Le français est beau
          </SvgText>
          <Line x1="10" y1="56" x2="130" y2="56" stroke={boardText} strokeWidth="0.8" strokeDasharray="4 3" opacity={0.25} />
          <SvgText x="10" y="72" fontSize="9" fill={boardText} opacity={0.4}>
            conjugaison · grammaire · vocab
          </SvgText>
        </Svg>
      </View>

      {/* ── Chalk tray under board ── */}
      <View style={[sc.chalkTray, { backgroundColor: isDark ? '#2A2B28' : '#888780' }]}>
        {[
          { w: 18, color: '#F0EEE8' },
          { w: 14, color: C.gold },
          { w: 10, color: '#F0EEE8' },
          { w: 16, color: C.danger },
        ].map((c, i) => (
          <View key={i} style={{ width: c.w, height: 4, borderRadius: 2, backgroundColor: c.color, opacity: i === 2 ? 0.5 : 1 }} />
        ))}
      </View>

      {/* ── Bookshelf (top-right) ── */}
      <View style={[sc.shelf, { backgroundColor: shelfColor, borderColor: shelfBorder }]}>
        <View style={sc.shelfBooks}>
          {BOOKS.map((b, i) => (
            <Book key={i} {...b} />
          ))}
        </View>
        <View style={[sc.shelfPlank, { backgroundColor: shelfBorder }]} />
      </View>

      {/* ── Dust motes ── */}
      <DustMote x={width * 0.35} y={130} delay={0} />
      <DustMote x={width * 0.40} y={136} delay={800} />
      <DustMote x={width * 0.44} y={128} delay={1500} />

      {/* ── Professor (floats) ── */}
      <AnimatedView style={{ transform: [{ translateY: floatAnim }], zIndex: 10 }}>
        <Svg width={210} height={200} viewBox="0 0 210 270" style={{ overflow: 'visible' }}>

          {/* Jacket */}
          <Rect x="72" y="144" width="66" height="84" rx="10" fill={C.primaryPressed} />
          <Rect x="79" y="144" width="52" height="32" rx="6"  fill={C.primary} />
          <Rect x="83" y="161" width="11" height="4" rx="2" fill={C.gold} />
          <Rect x="83" y="168" width="11" height="4" rx="2" fill={C.gold} />
          <Rect x="83" y="175" width="11" height="4" rx="2" fill={C.gold} />
          <Rect x="84" y="144" width="42" height="18" rx="4" fill="#003D22" />
          <Rect x="96" y="148" width="18" height="10" rx="3" fill={C.gold} opacity={0.9} />

          {/* Left arm */}
          <Rect x="60" y="144" width="16" height="62" rx="8" fill={C.primary} />
          <Rect x="57" y="201" width="22" height="10" rx="5" fill="#FAEEDA" />

          {/* Right arm + chalk */}
          <AnimatedG
            style={{
              transform: [
                { translateX: 192 }, { translateY: 148 },
                { rotate: armRotate },
                { translateX: -192 }, { translateY: -148 },
              ],
            }}
          >
            <Rect x="134" y="144" width="16" height="62" rx="8" fill={C.primary} />
            <Rect x="131" y="201" width="22" height="10" rx="5" fill="#FAEEDA" />
            <Rect x="150" y="202" width="30" height="6"  rx="3" fill="#F0EEE8" />
            <Rect x="176" y="200" width="6"  height="3"  rx="1.5" fill={C.gold} />
          </AnimatedG>

          {/* Legs + shoes */}
          <Rect x="80"  y="222" width="20" height="38" rx="10" fill={C.primaryPressed} />
          <Rect x="79"  y="254" width="24" height="11" rx="5.5" fill="#1A1A18" />
          <Rect x="110" y="222" width="20" height="38" rx="10" fill={C.primaryPressed} />
          <Rect x="108" y="254" width="24" height="11" rx="5.5" fill="#1A1A18" />

          {/* Head */}
          <Circle cx="105" cy="97" r="37" fill="#FAEEDA" />

          {/* Hat */}
          <Ellipse cx="105" cy="61" rx="36" ry="9"  fill="#2C2C2A" />
          <Rect    x="74"  y="62" width="62" height="26" rx="13" fill="#1A1A18" />
          <Ellipse cx="105" cy="61" rx="36" ry="8"  fill="#2C2C2A" />
          <Rect    x="136" y="65" width="16" height="5"  rx="2.5" fill="#2C2C2A" />

          {/* Glasses */}
          <Rect x="89"  y="93" width="9"  height="11" rx="4.5" fill="none" stroke="#888780" strokeWidth="1.2" />
          <Rect x="112" y="93" width="9"  height="11" rx="4.5" fill="none" stroke="#888780" strokeWidth="1.2" />
          <Line x1="98"  y1="98.5" x2="112" y2="98.5" stroke="#888780" strokeWidth="1.2" />
          <Line x1="89"  y1="98.5" x2="83"  y2="97"   stroke="#888780" strokeWidth="1.2" />
          <Line x1="121" y1="98.5" x2="127" y2="97"   stroke="#888780" strokeWidth="1.2" />

          {/* Eyes */}
          <Ellipse cx="93.5"  cy="98.5" rx="2.8" ry="3.2" fill={C.blue} />
          <Ellipse cx="116.5" cy="98.5" rx="2.8" ry="3.2" fill={C.blue} />
          <Circle  cx="94.5"  cy="97.5" r="1" fill="#fff" opacity={0.7} />
          <Circle  cx="117.5" cy="97.5" r="1" fill="#fff" opacity={0.7} />

          {/* Blink */}
          <AnimatedG style={{ opacity: blinkAnim }}>
            <Rect x="88"  y="96" width="11" height="6" rx="3" fill="#FAEEDA" />
            <Rect x="111" y="96" width="11" height="6" rx="3" fill="#FAEEDA" />
          </AnimatedG>

          {/* Smile + sideburns */}
          <Path d="M96 113 Q105 120 114 113" stroke={C.danger} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <Path d="M88 76 Q81 68 77 62"  stroke="#9A9890" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <Path d="M122 76 Q129 68 133 62" stroke="#9A9890" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Collar + gold tie */}
          <Rect x="87" y="132" width="36" height="14" rx="5" fill="#D3D1C7" />
          <Path d="M99 132 L105 146 L111 132Z" fill={C.gold} />
        </Svg>
      </AnimatedView>

      {/* ── Desk (behind professor visually but still part of scene) ── */}
      <View style={sc.deskWrap}>
        <View style={[sc.deskSurface, { backgroundColor: deskColor, borderColor: shelfBorder }]}>
          <View style={sc.deskItems}>
            {DESK_BOOKS.map((b, i) => (
              <View key={i} style={{ width: b.w, height: b.h, backgroundColor: b.color, borderRadius: 2 }} />
            ))}
            {/* Paper stack */}
            <View style={[sc.paper, { backgroundColor: isDark ? '#2A2B28' : '#FEFEFE', borderColor: isDark ? '#3A3B38' : '#D3D1C7' }]}>
              {[100, 70, 85].map((pct, i) => (
                <View key={i} style={[sc.paperLine, { width: `${pct}%`, backgroundColor: isDark ? '#3A3B38' : '#D3D1C7' }]} />
              ))}
            </View>
          </View>
        </View>
        <View style={[sc.deskLeg, sc.deskLegLeft,  { backgroundColor: deskColor }]} />
        <View style={[sc.deskLeg, sc.deskLegRight, { backgroundColor: deskColor }]} />
      </View>

      {/* ── Floor ── */}
      <View style={[sc.floor, { backgroundColor: floorColor, borderTopColor: isDark ? '#2A2B1E' : '#C8C4B0' }]} />

      {/* ── Labels + dots ── */}
      <AnimatedView style={[sc.content, { opacity: fadeIn, transform: [{ translateY: slideIn }] }]}>
        <Text style={[sc.title, { color: C.textPrimary }]}>
          Preparing your lesson…
        </Text>
        <Text style={[sc.subtitle, { color: C.textMuted }]}>
          Prof. Francois is gathering materials
        </Text>

        <View style={sc.dots}>
          {[dot1, dot2, dot3].map((anim, i) => (
            <AnimatedView
              key={i}
              style={[sc.dot, { backgroundColor: C.primary, opacity: anim, transform: [{ scale: anim }] }]}
            />
          ))}
        </View>

        {/* Ghana-stripe card */}
        <View style={[sc.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <GhanaStripe primary={C.primary} gold={C.gold} danger={C.danger} />
          <View style={sc.cardBody}>
            <View style={[sc.cardIcon, { backgroundColor: C.primarySubtle }]}>
              <Svg width={20} height={20} viewBox="0 0 20 20">
                <Path
                  d="M10 2L12.5 8H18.5L13.5 11.8L15.5 18L10 14.5L4.5 18L6.5 11.8L1.5 8H7.5L10 2Z"
                  fill={C.primary}
                />
              </Svg>
            </View>
            <View style={sc.cardText}>
              <Text style={[sc.cardTitle, { color: C.textPrimary }]}>
                Chargement du tuteur français
              </Text>
              <Text style={[sc.cardMeta, { color: C.textMuted }]}>
                Initialising language model…
              </Text>
            </View>
          </View>
        </View>
      </AnimatedView>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const sc = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Scene layers
  wall: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 80,
  },
  floor: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 80,
    borderTopWidth: 2,
  },

  // Window
  windowFrame: {
    position: 'absolute', top: 16, right: 16,
    width: 72, height: 80,
    borderWidth: 3, borderRadius: 4,
    overflow: 'hidden',
  },
  windowPane: {
    position: 'absolute', top: 4, right: 4, bottom: 4, left: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  windowBarH: { position: 'absolute', top: '50%', left: 0, right: 0, height: 2 },
  windowBarV: { position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2 },
  sun: {
    position: 'absolute', top: 8, right: 8,
    width: 14, height: 14, borderRadius: 7,
  },

  // Board
  board: {
    position: 'absolute', top: 12, left: 12,
    width: 200, height: 110,
    borderWidth: 4, borderRadius: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  chalkTray: {
    position: 'absolute', top: 120, left: 12,
    width: 200, height: 7,
    borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 6,
    zIndex: 4,
  },

  // Shelf
  shelf: {
    position: 'absolute', top: 136, right: 14,
    width: 78,
    borderWidth: 1.5, borderRadius: 3,
    padding: 5,
    zIndex: 2,
  },
  shelfBooks: {
    flexDirection: 'row', gap: 3, alignItems: 'flex-end',
    paddingBottom: 2,
  },
  shelfPlank: {
    height: 4, borderRadius: 2, marginTop: 4,
  },

  // Desk
  deskWrap: {
    position: 'absolute', bottom: 56,
    width: '80%', maxWidth: 280,
    alignItems: 'center',
    zIndex: 5,
  },
  deskSurface: {
    width: '100%', height: 18,
    borderRadius: 3, borderWidth: 1.5,
    overflow: 'visible',
  },
  deskItems: {
    position: 'absolute', bottom: 16,
    left: 12, right: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  paper: {
    width: 30, height: 22,
    borderRadius: 2, borderWidth: 0.5,
    padding: 4, gap: 3,
  },
  paperLine: { height: 2, borderRadius: 1 },
  deskLeg: {
    position: 'absolute', bottom: -26,
    width: 10, height: 28, borderRadius: 2,
  },
  deskLegLeft:  { left: 20 },
  deskLegRight: { right: 20 },

  // Content
  content: {
    zIndex: 12,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 4,
  },
  title: { fontSize: 17, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 12, textAlign: 'center', marginBottom: 18 },

  dots: { flexDirection: 'row', gap: 7, marginBottom: 22, alignItems: 'center' },
  dot:  { width: 8, height: 8, borderRadius: 4 },

  card: {
    width: '100%', maxWidth: 300,
    borderRadius: 14, borderWidth: 0.5,
    overflow: 'hidden',
  },
  cardBody: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 14,
  },
  cardIcon: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 13, fontWeight: '500' },
  cardMeta:  { fontSize: 11, marginTop: 2 },
});