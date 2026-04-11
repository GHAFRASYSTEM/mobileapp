import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, StyleSheet, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useColors } from '@/constants/Colors';

import { FRENCH_RESOURCES } from '@/assets/data/resources.data';
import NowPlayingInfo from '@/components/French/NowPlayingInfo';
import LessonRow from '@/components/French/LessonRow';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PLAYER_HEIGHT = (SCREEN_WIDTH * 9) / 16;

export default function FrenchLessonScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const resource = FRENCH_RESOURCES.find(r => r.id === id);
  const lessons  = resource?.lessons ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying]           = useState(false);

  const currentLesson = lessons[currentIndex];

  // Auto-advance to next lesson when one ends
  const handleStateChange = (state: string) => {
    if (state === 'ended' && currentIndex < lessons.length - 1) {
      setCurrentIndex(i => i + 1);
      setPlaying(true);
    } else if (state === 'ended') {
      setPlaying(false);
    }
  };

  if (!resource || !currentLesson) {
    return (
      <View style={[styles.root, styles.centered, { backgroundColor: C.background }]}>
        <Text style={{ color: C.textMuted }}>Resource not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* ── YouTube player ── */}
     <View style={[styles.playerWrap, { paddingTop: insets.top }]}>
        <YoutubeIframe
          height={PLAYER_HEIGHT}
          width={SCREEN_WIDTH}
          videoId={currentLesson.videoId}
          play={playing}
          onChangeState={handleStateChange}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Currently playing lesson info ── */}
        <NowPlayingInfo lesson={currentLesson} />

        {/* ── Divider ── */}
        <View style={[styles.divider, { backgroundColor: C.border }]} />

        {/* ── Playlist ── */}
        <Text style={[styles.sectionHeading, { color: C.textPrimary }]}>All Lessons</Text>

        <View style={styles.playlist}>
          {lessons.map((lesson, idx) => (
            <LessonRow
              key={lesson.videoId + idx}
              lesson={lesson}
              index={idx}
              isActive={idx === currentIndex}
              onPress={() => {
                setCurrentIndex(idx);
                setPlaying(true);
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* ── Back button overlaid on player ── */}
      <TouchableOpacity
        style={[styles.backBtn, { top: insets.top + 8 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root:           { flex: 1 },
  centered:       { justifyContent: 'center', alignItems: 'center' },
  playerWrap:     { backgroundColor: '#000' },
  scroll:         { padding: 16, gap: 12 },
  divider:        { height: 0.5, marginVertical: 8 },
  sectionHeading: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  playlist:       { gap: 8 },
  backBtn: {
    position:        'absolute',
    left:            12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    width:           34,
    height:          34,
    borderRadius:    17,
    alignItems:      'center',
    justifyContent:  'center',
  },
  backIcon: { color: '#fff', fontSize: 22, lineHeight: 26 },
});