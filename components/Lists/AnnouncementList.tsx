import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColors } from '@/constants/Colors';
import type { Announcement } from '@/hooks/useAnnouncements';
import AnnouncementCard from '../Cards/AnnouncementCard';

type Props = {
  data:    Announcement[];
  loading: boolean;
  error:   string | null;
};

export default function AnnouncementList({ data, loading, error }: Props) {
  const C      = useColors();
  const router = useRouter();

  if (loading) return (
    <View style={styles.centered}>
      <ActivityIndicator color={C.primary} size="large" />
      <Text style={[styles.msg, { color: C.textMuted }]}>Loading announcements…</Text>
    </View>
  );

  if (error) return (
    <View style={styles.centered}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={[styles.msg, { color: C.textDanger }]}>{error}</Text>
    </View>
  );

  if (!data.length) return (
    <View style={styles.centered}>
      <Text style={styles.emoji}>📭</Text>
      <Text style={[styles.msg, { color: C.textMuted }]}>No announcements yet</Text>
    </View>
  );

  return (
    <View>
      {data.map(item => (
        <AnnouncementCard
          key={item.id}
          item={item}
          onPress={() => router.push({
            pathname: '/(standalone)/announcement/[id]',
            params:   { id: item.id },
          })}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { alignItems: 'center', paddingTop: 80, gap: 10 },
  msg:      { fontSize: 14 },
  emoji:    { fontSize: 32 },
});