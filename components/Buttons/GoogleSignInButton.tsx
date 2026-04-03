import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
  isDark?: boolean;
};

// Real Google G logo using the 4 brand colors as SVG-like segments
function GoogleIcon({ size = 20 }: { size?: number }) {
  const s = size;
  const h = s / 2;
  const q = s / 4;

  return (
    <View style={{ width: s, height: s, position: 'relative' }}>
      {/* Top-left: Blue */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: h, height: h, backgroundColor: '#4285F4', borderTopLeftRadius: h }} />
      {/* Top-right: Red */}
      <View style={{ position: 'absolute', top: 0, right: 0, width: h, height: h, backgroundColor: '#EA4335', borderTopRightRadius: h }} />
      {/* Bottom-left: Green */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, width: h, height: h, backgroundColor: '#34A853', borderBottomLeftRadius: h }} />
      {/* Bottom-right: Yellow */}
      <View style={{ position: 'absolute', bottom: 0, right: 0, width: h, height: h, backgroundColor: '#FBBC05', borderBottomRightRadius: h }} />
      {/* White center cutout */}
      <View style={{ position: 'absolute', top: q - 1, left: q - 1, width: h + 2, height: h + 2, backgroundColor: '#fff', borderRadius: h }} />
      {/* G letter */}
      <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: s * 0.42, fontWeight: '700', color: '#4285F4', includeFontPadding: false }}>G</Text>
      </View>
    </View>
  );
}

export default function GoogleSignInButton({ onPress, isDark = false }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, isDark ? styles.btnDark : styles.btnLight]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Left color strip — Google's 4 colors as a vertical bar */}
      <View style={styles.colorStrip}>
        <View style={[styles.stripSegment, { backgroundColor: '#4285F4' }]} />
        <View style={[styles.stripSegment, { backgroundColor: '#EA4335' }]} />
        <View style={[styles.stripSegment, { backgroundColor: '#FBBC05' }]} />
        <View style={[styles.stripSegment, { backgroundColor: '#34A853' }]} />
      </View>

      {/* Icon + label */}
      <View style={styles.inner}>
        <GoogleIcon size={22} />
        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
    borderWidth: 1.5,
  },
  btnLight: {
    backgroundColor: '#fff',
    borderColor: '#E0DEDA',
  },
  btnDark: {
    backgroundColor: '#1E1F1C',
    borderColor: '#2A2B28',
  },

  // Vivid left color strip
  colorStrip: {
    width: 5,
    flexDirection: 'column',
  },
  stripSegment: {
    flex: 1,
  },

  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  labelLight: {
    color: '#1A1A18',
  },
  labelDark: {
    color: '#F0EEE8',
  },
});