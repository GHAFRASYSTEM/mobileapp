import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DRIVE_URL } from '@/assets/data/galleryData';

export default function DriveCTA() {
  const C = useColors();

  const handlePress = () => {
    Linking.openURL(DRIVE_URL);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {/* Ghana flag stripe */}
      <View style={styles.flagBar}>
        {['#CE1126', '#FCD116', '#006B3F', '#FCD116', '#CE1126'].map((c, i) => (
          <View key={i} style={[styles.flagSeg, { backgroundColor: c }]} />
        ))}
      </View>

      <View style={styles.inner}>
        {/* Icon */}
        <View style={[styles.iconWrap, { backgroundColor: C.primarySubtle }]}>
          <View style={styles.driveRow}>
            <View style={[styles.driveDot, { backgroundColor: '#4285F4' }]} />
            <View style={[styles.driveDot, { backgroundColor: '#FBBC05' }]} />
            <View style={[styles.driveDot, { backgroundColor: '#34A853' }]} />
          </View>
        </View>

        {/* Text */}
        <View style={styles.textCol}>
          <Text style={[styles.title, { color: C.textPrimary }]}>
            Find more photos
          </Text>
          <Text style={[styles.sub, { color: C.textSecondary }]}>
            Full event albums on our Google Drive cloud
          </Text>
        </View>

        {/* Arrow */}
        <View style={[styles.arrow, { backgroundColor: C.primary }]}>
          <IconSymbol name="arrow.up.right" size={14} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },

  flagBar: {
    flexDirection: 'row',
    height: 4,
  },

  flagSeg: {
    flex: 1,
  },

  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  driveRow: {
    flexDirection: 'row',
    gap: 4,
  },

  driveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  textCol: {
    flex: 1,
    gap: 3,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
  },

  sub: {
    fontSize: 12,
    lineHeight: 17,
  },

  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});