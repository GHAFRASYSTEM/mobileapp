import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { FrenchLesson } from '@/types/french.types';
import LevelBadge from './LevelBadge';

interface Props {
  lesson: FrenchLesson;
}

export default function NowPlayingInfo({ lesson }: Props) {
  const C = useColors();

  return (
    <View style={styles.container}>
      {/* Level + duration row */}
      <View style={styles.topRow}>
        <LevelBadge level={lesson.level} />
        <Text style={[styles.duration, { color: C.textMuted }]}>⏱ {lesson.duration}</Text>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: C.textPrimary }]}>{lesson.title}</Text>

      {/* English summary */}
      <Text style={[styles.summary, { color: C.textSecondary }]}>{lesson.englishSummary}</Text>

      {/* Topics */}
      <View style={styles.topicsRow}>
        {lesson.topics.map(topic => (
          <View key={topic} style={[styles.topicChip, { backgroundColor: C.surface, borderColor: C.border }]}>
            <Text style={[styles.topicText, { color: C.textSecondary }]}>{topic}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  duration: {
    fontSize: 12,
  },
  title: {
    fontSize:   17,
    fontWeight: '600',
    lineHeight: 24,
  },
  summary: {
    fontSize:   13.5,
    lineHeight: 20,
  },
  topicsRow: {
    flexDirection: 'row',
    gap:           6,
    flexWrap:      'wrap',
  },
  topicChip: {
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderRadius:      8,
    borderWidth:       0.5,
  },
  topicText: {
    fontSize: 12,
  },
});