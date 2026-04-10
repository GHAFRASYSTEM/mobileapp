import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import type { Announcement, AnnouncementCategory } from '@/hooks/useAnnouncements';

const CATEGORY_META: Record<AnnouncementCategory, { label: string; emoji: string; color: string; bg: string }> = {
  news:     { label: 'News',     emoji: '📰', color: '#002395', bg: '#E6EEFF' },
  event:    { label: 'Event',    emoji: '📅', color: '#006B3F', bg: '#E8F5EE' },
  housing:  { label: 'Housing',  emoji: '🏠', color: '#7A5500', bg: '#FFF8DC' },
  personal: { label: 'Personal', emoji: '🎉', color: '#8B008B', bg: '#F5E6FF' },
  update:   { label: 'Update',   emoji: '🔔', color: '#555',   bg: '#F0F0F0' },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d    = Math.floor(diff / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 7)   return `${d} days ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

type Props = {
  item:    Announcement;
  onPress: () => void;
};

export default function AnnouncementCard({ item, onPress }: Props) {
  const C    = useColors();
  const meta = CATEGORY_META[item.category];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* image_uri from backend */}
      {item.image_uri && (
        <Image source={{ uri: item.image_uri }} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.body}>
        {/* Category pill + date */}
        <View style={styles.meta}>
          <View style={[styles.pill, { backgroundColor: meta.bg }]}>
            <Text style={styles.pillEmoji}>{meta.emoji}</Text>
            <Text style={[styles.pillText, { color: meta.color }]}>{meta.label}</Text>
          </View>
          <Text style={[styles.date, { color: C.textMuted }]}>
            {timeAgo(item.published_at)}
          </Text>
        </View>

        <Text style={[styles.title, { color: C.textPrimary }]} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Body preview — first 120 chars, no summary field */}
        <Text style={[styles.preview, { color: C.textSecondary }]} numberOfLines={2}>
          {item.body.slice(0, 120)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:      { borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginBottom: 12 },
  image:     { width: '100%', height: 160 },
  body:      { padding: 14, gap: 6 },
  meta:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pill:      { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  pillEmoji: { fontSize: 11 },
  pillText:  { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  date:      { fontSize: 11 },
  title:     { fontSize: 15, fontWeight: '700', lineHeight: 21 },
  preview:   { fontSize: 13, lineHeight: 19 },
});