import React from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import { useAnnouncements, AnnouncementCategory } from '@/hooks/useAnnouncements';
import AnnouncementLoadingScreen from '@/components/Screens/AnnouncementLoadingScreen';

const CATEGORY_META: Record<AnnouncementCategory, { label: string; emoji: string; color: string; bg: string }> = {
  news:     { label: 'News',     emoji: '📰', color: '#002395', bg: '#E6EEFF' },
  event:    { label: 'Event',    emoji: '📅', color: '#006B3F', bg: '#E8F5EE' },
  housing:  { label: 'Housing', emoji: '🏠', color: '#7A5500', bg: '#FFF8DC' },
  personal: { label: 'Personal',emoji: '🎉', color: '#8B008B', bg: '#F5E6FF' },
  update:   { label: 'Update',   emoji: '🔔', color: '#555',   bg: '#F0F0F0' },
};

export default function AnnouncementDetail() {
  const { id }  = useLocalSearchParams<{ id: string }>();
  const router  = useRouter();
  const insets  = useSafeAreaInsets();
  const C       = useColors();
  const { data,loading,error } = useAnnouncements();

  const item = data.find(a => a.id === id);
  if (loading) {
  return <AnnouncementLoadingScreen message="Fetching announcement..." />;
}

if (error) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{error}</Text>
    </View>
  );
}

if (!item) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Announcement not found</Text>
    </View>
  );
}


  const meta = CATEGORY_META[item.category];
  const date = new Date(item.published_at).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });



  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>

      {/* Close button — floats top-right */}
      <TouchableOpacity
        style={[styles.closeBtn, { top: insets.top + 12, backgroundColor: C.surface }]}
        onPress={() => router.back()}
      >
        <Text style={[styles.closeText, { color: C.textPrimary }]}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        {item.image_uri && (
          <Image source={{ uri: item.image_uri }} style={styles.hero} resizeMode="cover" />
        )}

        <View style={[styles.content, !item.image_uri && { paddingTop: insets.top + 56 }]}>

          {/* Category + date */}
          <View style={styles.metaRow}>
            <View style={[styles.pill, { backgroundColor: meta.bg }]}>
              <Text style={styles.pillEmoji}>{meta.emoji}</Text>
              <Text style={[styles.pillText, { color: meta.color }]}>{meta.label}</Text>
            </View>
            <Text style={[styles.date, { color: C.textMuted }]}>{date}</Text>
          </View>

          <Text style={[styles.title, { color: C.textPrimary }]}>{item.title}</Text>
       

          <View style={[styles.divider, { backgroundColor: C.border }]} />

          <Text style={[styles.body, { color: C.textSecondary }]}>{item.body}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtn:  { position: 'absolute', right: 16, zIndex: 10, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  closeText: { fontSize: 16, fontWeight: '600' },
  hero:      { width: '100%', height: 240 },
  content:   { padding: 20, gap: 10 },
  metaRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pill:      { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  pillEmoji: { fontSize: 12 },
  pillText:  { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  date:      { fontSize: 12 },
  title:     { fontSize: 22, fontWeight: '800', lineHeight: 29 },
  author:    { fontSize: 12 },
  divider:   { height: 1, marginVertical: 4 },
  body:      { fontSize: 15, lineHeight: 24 },
});