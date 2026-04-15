import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useColors } from '@/constants/Colors';

// ─────────────────────────────────────────────────────────────────────────────
// ADINKRA IMAGE PLACEHOLDERS
// Replace each `require(...)` path with your actual image asset.
// All images should ideally be PNG with a transparent background so the
// gold tint via `tintColor` works correctly.
// ─────────────────────────────────────────────────────────────────────────────
const ADINKRA_IMAGES = {
  gyeNyame:    require('@/assets/images/adinkra/gye-nyame.png'),    // ← replace
  sankofa:     require('@/assets/images/adinkra/sankofa.png'),      // ← replace
  dwennimmen:  require('@/assets/images/adinkra/dwennimmen.png'),   // ← replace
  nyameDua:    require('@/assets/images/adinkra/nyame-dua.png'),    // ← replace
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Symbol card
// ─────────────────────────────────────────────────────────────────────────────
interface SymbolCardProps {
  source: ImageSourcePropType;
  label: string;
  meaning: string;
  tintColor: string;
}

function SymbolCard({ source, label, meaning, tintColor }: SymbolCardProps) {
  return (
    <View style={styles.symbolCard}>

      {/* Diamond + Image container */}
      <View style={styles.diamondContainer}>
        <View style={[styles.diamondFrame, { borderColor: tintColor }]} />

        <Image
          source={source}
          style={[styles.symbolImage, { tintColor }]}
          resizeMode="contain"
        />
      </View>

      {/* Text below with spacing */}
      <Text style={[styles.symbolLabel, { color: tintColor }]}>
        {label}
      </Text>

      <Text style={[styles.symbolMeaning, { color: tintColor }]}>
        {meaning}
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Symbol data
// ─────────────────────────────────────────────────────────────────────────────
const SYMBOLS: Array<{
  key: keyof typeof ADINKRA_IMAGES;
  label: string;
  meaning: string;
}> = [
  { key: 'gyeNyame',   label: 'Gye Nyame',   meaning: 'Supremacy of God'   },
  { key: 'sankofa',    label: 'Sankofa',      meaning: 'Learn from the past' },
  { key: 'dwennimmen', label: 'Dwennimmen',   meaning: 'Humility & strength' },
  { key: 'nyameDua',   label: 'Nyame Dua',    meaning: "God's presence"      },
];

// ─────────────────────────────────────────────────────────────────────────────
// Main exported component
// ─────────────────────────────────────────────────────────────────────────────
export function AdinkraHeader() {
  const C = useColors();

  return (
    <View style={[styles.container, { backgroundColor: C.header }]}>

      {/* Top gold accent bar */}
      <View style={[styles.accentBar, { backgroundColor: C.gold }]} />

      {/* Status-bar spacer */}
      <View style={{ paddingTop: 40 }} />

      {/* App name */}
      <Text style={[styles.appName, { color: C.textInverse }]}>GHAFRA</Text>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: C.textInverse }]}>
        Sign in to your account
      </Text>

      {/* Thin gold divider */}
      <View style={[styles.divider, { backgroundColor: C.gold }]} />

      {/* Adinkra symbols row */}
      <View style={styles.symbolsRow}>
        {SYMBOLS.map(({ key, label, meaning }) => (
          <SymbolCard
            key={key}
            source={ADINKRA_IMAGES[key]}
            label={label}
            meaning={meaning}
            tintColor={C.gold}
          />
        ))}
      </View>

      {/* Bottom thin gold line */}
      <View style={[styles.bottomLine, { backgroundColor: C.gold }]} />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop:        0,
    paddingBottom:     24,
  },

  accentBar: {
    width:        44,
    height:       3,
    borderRadius: 2,
    marginTop:    16,
  },

  appName: {
    fontSize:      28,
    fontWeight:    '700',
    letterSpacing: 3,
    marginTop:     8,
  },

  subtitle: {
    fontSize:      13,
    fontWeight:    '400',
    opacity:       0.55,
    marginTop:     4,
    marginBottom:  16,
  },

  divider: {
    height:        0.5,
    opacity:       0.35,
    marginBottom:  20,
  },

symbolsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center', // ✅ center vertically
},

symbolCard: {
  flex: 1,
  alignItems: 'center',
},

// NEW container for perfect centering
diamondContainer: {
  width: 60,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10, // ✅ space before text
},

diamondFrame: {
  position: 'absolute',
  width: 52,
  height: 52,
  borderWidth: 1,
  borderRadius: 4,
  opacity: 0.3,
  transform: [{ rotate: '45deg' }],
},

symbolImage: {
  width: 45,
  height: 45,
},

symbolLabel: {
  fontSize: 10,
  fontWeight: '600',
  textAlign: 'center',
  letterSpacing: 0.5,
  marginTop: 2,
},

symbolMeaning: {
  fontSize: 8,
  textAlign: 'center',
  opacity: 0.5,
  marginTop: 2,
},

  bottomLine: {
    height:     0.5,
    opacity:    0.2,
    marginTop:  20,
  },
});
