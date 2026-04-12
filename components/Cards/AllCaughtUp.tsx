import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors }   from '@/constants/Colors';
import { IconSymbol }  from '@/components/ui/icon-symbol';

type Props = {
  nextMonth: string;
};

export function AllCaughtUp({ nextMonth }: Props) {
  const C = useColors();

  return (
    <View style={[
      styles.banner,
      { backgroundColor: C.primarySubtle, borderColor: C.borderFocus },
    ]}>
      <IconSymbol name="checkmark.seal.fill" size={24} color={C.primary} />
      <View style={styles.text}>
        <Text style={[styles.title, { color: C.textSuccess }]}>
          All caught up! 🎉
        </Text>
        <Text style={[styles.sub, { color: C.textSecondary }]}>
          Next dues due in {nextMonth}. Thank you for your support!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    gap:            12,
    borderRadius:   14,
    borderWidth:    1,
    padding:        14,
  },
  text:  { flex: 1, gap: 3 },
  title: { fontSize: 14, fontWeight: '700' },
  sub:   { fontSize: 12, lineHeight: 18 },
});