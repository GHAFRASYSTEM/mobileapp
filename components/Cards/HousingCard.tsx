import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import type { Housing } from '@/hooks/useHousing';

type Props = {
  item:    Housing;
  onPress: () => void;
};

export default function HousingCard({ item, onPress }: Props) {
  const C = useColors();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}
    >
      {/* Image */}
      <View style={styles.imageWrap}>
        {item.images?.[0] ? (
          <Image source={{ uri: item.images[0] }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder, { backgroundColor: C.border }]}>
            <Text style={{ color: C.textMuted, fontSize: 12 }}>No photo</Text>
          </View>
        )}

        {/* Availability badge */}
        <View style={[
          styles.badge,
          { backgroundColor: item.available ? C.primary : C.gold },
        ]}>
          <Text style={[styles.badgeText, { color: item.available ? '#fff' : '#7a5500' }]}>
            {item.available ? 'Available' : 'Unavailable'}
          </Text>
        </View>

        {/* Type pill */}
        <View style={styles.typePill}>
          <Text style={styles.typePillText}>{item.type}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: C.textPrimary }]} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={[styles.cardLocation, { color: C.textSecondary }]} numberOfLines={1}>
          {item.city}{item.address ? ` · ${item.address}` : ''}
        </Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Stat label={`${item.size} m²`}        color={C.textMuted} />
          <Dot color={C.border} />
          <Stat label={`${item.bedrooms} bed`}   color={C.textMuted} />
          <Dot color={C.border} />
          <Stat label={`${item.bathrooms} bath`} color={C.textMuted} />
        </View>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: C.primary }]}>
            €{item.price.toLocaleString()}
          </Text>
          <Text style={[styles.pricePeriod, { color: C.textMuted }]}>/month</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Stat({ label, color }: { label: string; color: string }) {
  return <Text style={[styles.stat, { color }]}>{label}</Text>;
}

function Dot({ color }: { color: string }) {
  return <View style={[styles.dot, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  card:             { borderRadius: 16, borderWidth: 0.5, overflow: 'hidden' },
  imageWrap:        { position: 'relative' },
  image:            { width: '100%', height: 200 },
  imagePlaceholder: { alignItems: 'center', justifyContent: 'center' },
  badge:            { position: 'absolute', top: 12, left: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText:        { fontSize: 11, fontWeight: '600' },
  typePill:         { position: 'absolute', bottom: 10, right: 10, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.55)' },
  typePillText:     { color: '#fff', fontSize: 11, fontWeight: '600' },
  cardBody:         { padding: 14, gap: 4 },
  cardTitle:        { fontSize: 15, fontWeight: '600' },
  cardLocation:     { fontSize: 13 },
  statsRow:         { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  stat:             { fontSize: 12 },
  dot:              { width: 3, height: 3, borderRadius: 2 },
  priceRow:         { flexDirection: 'row', alignItems: 'baseline', gap: 2, marginTop: 6 },
  price:            { fontSize: 18, fontWeight: '700' },
  pricePeriod:      { fontSize: 13 },
});