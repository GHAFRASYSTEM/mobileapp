import React, { useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Executive } from '@/assets/data/executivesData';
import type { useColors } from '@/constants/Colors';
import { getExecutiveAccent } from '@/utils/executiveAccent';

type Props = {
  executive: Executive;
  onPress: () => void;
  C: ReturnType<typeof useColors>;
  index: number;
};

/**
 * Horizontal card with:
 *  - Accent-colour left strip (per-executive accent)
 *  - Avatar with accent-colour ring
 *  - Name / role pill / truncated bio
 *  - Subtle press-scale animation
 *  - Staggered fade-in on mount
 */
export default function ExecutiveCard({ executive, onPress, C, index }: Props) {
  const scale     = useRef(new Animated.Value(1)).current;
  const opacity   = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  const accent = getExecutiveAccent(executive.name);
  const isDarkAccent = accent === '#FCD116' || accent === '#FFFFFF';

  // Staggered entrance
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 380,
        delay: index * 90,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay: index * 90,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
    ]).start();
  }, []);

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.975, useNativeDriver: true, speed: 40 }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: C.surface,
            borderColor: C.border,
            shadowColor: accent,
          },
        ]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}
      >
        {/* Left accent strip */}
        <View style={[styles.strip, { backgroundColor: accent }]} />

        {/* Avatar with accent halo */}
        <View style={[styles.avatarRing, { borderColor: accent }]}>
          <Image source={executive.image} style={styles.avatar} resizeMode="cover" />
        </View>

        {/* Text */}
        <View style={styles.body}>
          <Text style={[styles.name, { color: C.textPrimary }]} numberOfLines={1}>
            {executive.name}
          </Text>

          {/* Role pill */}
          <View style={[styles.rolePill, { backgroundColor: accent }]}>
            <Text
              style={[
                styles.roleText,
                { color: isDarkAccent ? '#1A1A18' : '#fff' },
              ]}
              numberOfLines={1}
            >
              {executive.role}
            </Text>
          </View>

          <Text style={[styles.bio, { color: C.textSecondary }]} numberOfLines={5}>
            {executive.bio}
          </Text>
        </View>

        {/* Tap indicator */}
        <View style={[styles.chevronWrap, { backgroundColor: accent + '22' }]}>
          <Text style={[styles.chevron, { color: accent }]}>›</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  strip: {
    width: 5,
    alignSelf: 'stretch',
  },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    marginLeft: 14,
    marginRight: 12,
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    paddingVertical: 15,
    paddingRight: 8,
    gap: 4,
  },
  name: {
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  rolePill: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  roleText: {
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bio: {
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 1,
  },
  chevronWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  chevron: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
    marginLeft: 2,
  },
});