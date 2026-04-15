import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useColors } from '@/constants/Colors';
import type { Executive } from '@/assets/data/executivesData';
import { getExecutiveAccent } from '@/utils/executiveAccent';

type Props = {
  executive: Executive;
  onPress: () => void;
};

export default function ExecutiveCard({ executive, onPress }: Props) {
  const C = useColors();

  const accent = getExecutiveAccent(executive.name);

  const isDarkAccent =
    accent === '#FCD116' || accent === '#FFFFFF';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: C.surface, borderColor: C.border },
      ]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Accent stripe */}
      <View style={[styles.stripe, { backgroundColor: accent }]} />

      <View style={styles.body}>
        {/* Photo */}
        <View style={[styles.photoRing, { borderColor: accent }]}>
          <Image
            source={executive.image}
            style={styles.photo}
            resizeMode="cover"
          />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text
            style={[styles.name, { color: C.textPrimary }]}
            numberOfLines={1}
          >
            {executive.name}
          </Text>

          <View style={[styles.rolePill, { backgroundColor: accent }]}>
            <Text
              style={[
                styles.roleText,
                { color: isDarkAccent ? '#1A1A18' : '#fff' },
              ]}
            >
              {executive.role}
            </Text>
          </View>

          <Text
            style={[styles.dept, { color: C.textMuted }]}
            numberOfLines={1}
          >
            {executive.department}
          </Text>

          {executive.since && (
            <Text style={[styles.since, { color: C.textMuted }]}>
              Since {executive.since}
            </Text>
          )}
        </View>
      </View>

      {/* Bio preview */}
      <Text
        style={[styles.bioPreview, { color: C.textSecondary }]}
        numberOfLines={2}
      >
        {executive.bio}
      </Text>

      <View style={[styles.footer, { borderTopColor: C.border }]}>
        <Text style={[styles.footerText, { color: accent }]}>
          View profile →
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  stripe: { height: 5 },
  body: {
    flexDirection: 'row',
    padding: 16,
    gap: 14,
    alignItems: 'flex-start',
  },
  photoRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    overflow: 'hidden',
  },
  photo: { width: '100%', height: '100%' },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 15, fontWeight: '800' },
  rolePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dept: { fontSize: 11 },
  since: { fontSize: 11 },
  bioPreview: {
    fontSize: 12,
    lineHeight: 17,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  footerText: { fontSize: 12, fontWeight: '700' },
});