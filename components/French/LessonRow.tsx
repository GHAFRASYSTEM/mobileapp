import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { FrenchLesson } from '@/types/french.types';
import LevelBadge from './LevelBadge';


interface Props {
  lesson:   FrenchLesson;
  index:    number;
  isActive: boolean;
  onPress:  () => void;
}

export default function LessonRow({ lesson, index, isActive, onPress }: Props) {
  const C = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.row,
        {
          backgroundColor: isActive ? C.primarySubtle : C.surface,
          borderColor:     isActive ? C.primary       : C.border,
        },
      ]}
      activeOpacity={0.75}
    >
      {/* Index / play indicator */}
      <View style={[styles.indexBox, { backgroundColor: isActive ? C.primary : C.border }]}>
        <Text style={[styles.indexText, { color: isActive ? C.textInverse : C.textMuted }]}>
          {isActive ? '▶' : `${index + 1}`}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text
          style={[styles.title, { color: isActive ? C.primary : C.textPrimary }]}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>

        <View style={styles.metaRow}>
          <LevelBadge level={lesson.level} />
          <Text style={[styles.duration, { color: C.textMuted }]}>{lesson.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
    padding:       10,
    borderRadius:  12,
    borderWidth:   0.5,
  },
  indexBox: {
    width:          32,
    height:         32,
    borderRadius:   8,
    alignItems:     'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize:   13,
    fontWeight: '600',
  },
  info: {
    flex: 1,
    gap:  4,
  },
  title: {
    fontSize:   13,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           6,
  },
  duration: {
    fontSize: 11,
  },
});