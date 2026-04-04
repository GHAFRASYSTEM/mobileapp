import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Props = {
  title?: string;
  subtitle?: string;
};

export default function GalleryHeader({
  title = 'Gallery',
  subtitle,
}: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: C.header,
            paddingTop: insets.top + 10,
          },
        ]}
      >
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.sub}>{subtitle}</Text>
          )}
        </View>

        <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
          <IconSymbol name="photo.stack.fill" size={18} color="#fff" />
        </View>
      </View>

      {/* Gold divider */}
      <View style={[styles.goldBar, { backgroundColor: C.gold }]} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  sub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldBar: {
    height: 3,
  },
});