import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  bg: string;
  label: string;
  caption: string;
  onPress: () => void;
};

/**
 * Rounded badge icon with a text glyph and a caption underneath.
 * Works without any external icon library.
 */
export default function SocialIcon({ bg, label, caption, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress} activeOpacity={0.72}>
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={styles.glyph}>{label}</Text>
      </View>
      <Text style={styles.caption}>{caption}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: 5,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle lift
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  glyph: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  caption: {
    color: '#9A9890',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});