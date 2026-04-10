import React from 'react';
import {
  View, Text, Image, StyleSheet, ImageBackground, Animated,
} from 'react-native';
import { useColors } from '@/constants/Colors';

type Props = {
  opacity: Animated.Value;
  translateY: Animated.Value;
  topInset: number;
};

export default function HeroBanner({ opacity, translateY, topInset }: Props) {
  const C = useColors();

  return (
    <ImageBackground
      source={require('@/assets/images/kente.png')}
      style={[styles.hero, { paddingTop: topInset + 24 }]}
      resizeMode="cover"
    >
      {/* Base colour tint — keeps brand colour visible under the pattern */}
      <View style={[styles.colorTint, { backgroundColor: C.header }]} />
      {/* Dark overlay for legibility */}
      <View style={styles.darkOverlay} />

      <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>

        {/* Logo badge */}
        <View style={[styles.logoBadge, { borderColor: C.gold }]}>
          <View style={styles.logoInner}>
            <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>GHAFRA</Text>

        {/* Ghana flag colour bar */}
        <View style={styles.flagBar}>
          {['#CE1126', '#FCD116', '#006B3F', '#FCD116', '#CE1126'].map((c, i) => (
            <View key={i} style={[styles.flagSegment, { backgroundColor: c }]} />
          ))}
        </View>

        <Text style={styles.sub}>Ghana · France Association</Text>

        {/* Stats strip */}
        <View style={[styles.statsRow, { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }]}>
          {[
            { value: '300+', label: 'Members' },
            { value: '3+', label: 'Years' },
            { value: '🇬🇭 🇫🇷', label: 'Two Nations' },
          ].map(({ value, label }, i, arr) => (
            <React.Fragment key={label}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
              {i < arr.length - 1 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>

      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero:        { alignItems: 'center', paddingBottom: 32 },
  colorTint:   { ...StyleSheet.absoluteFillObject, opacity: 0.55 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.38)' },
  content:     { alignItems: 'center', zIndex: 1, gap: 8 },

  logoBadge: { width: 84, height: 84, borderRadius: 24, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginBottom: 6, backgroundColor: 'rgba(255,255,255,0.08)' },
  logoInner: { width: 70, height: 70, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo:      { width: 62, height: 62, borderRadius: 16 },

  title: { fontSize: 32, fontWeight: '900', color: '#fff', letterSpacing: 6 },

  flagBar:     { flexDirection: 'row', width: 90, height: 3, borderRadius: 2, overflow: 'hidden' },
  flagSegment: { flex: 1 },

  sub: { fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: 2.5, textTransform: 'uppercase' },

  statsRow:    { flexDirection: 'row', borderRadius: 16, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 24, gap: 24, marginTop: 8 },
  statItem:    { alignItems: 'center', gap: 2 },
  statValue:   { fontSize: 15, fontWeight: '800', color: '#fff' },
  statLabel:   { fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.15)' },
});