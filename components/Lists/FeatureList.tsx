import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useColors } from '@/constants/Colors';

const FEATURES = [
  { icon: '🪪', text: 'Digital membership card, always in your pocket', color: '#006B3F' },
  { icon: '🆘', text: 'Get help with accommodation, job search, and more', color: '#8B008B' },
];

type Props = {
  opacity: Animated.Value;
  translateY: Animated.Value;
};

export default function FeatureList({ opacity, translateY }: Props) {
  const C = useColors();

  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}>
      <Text style={[styles.heading, { color: C.textPrimary }]}>Akwaaba</Text>
      <Text style={[styles.sub, { color: C.textSecondary }]}>
        Sign in to access your account
      </Text>

      <View style={styles.list}>
        {FEATURES.map(({ icon, text, color }) => (
          <View
            key={text}
            style={[styles.row, { backgroundColor: C.surface, borderColor: C.border }]}
          >
            <View style={[styles.iconBox, { backgroundColor: color + '18' }]}>
              <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={[styles.text, { color: C.textSecondary }]}>{text}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 12 },
  heading: { fontSize: 24, fontWeight: '800', letterSpacing: -0.4 },
  sub:     { fontSize: 14, marginTop: -4 },
  list:    { gap: 8 },
  row:     { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, borderWidth: 1 },
  iconBox: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  icon:    { fontSize: 19 },
  text:    { flex: 1, fontSize: 13, lineHeight: 19 },
});