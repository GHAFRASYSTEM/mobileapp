import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { Format } from '@/types/french.types';

const FORMAT_LABELS: Record<Format, string> = {
  video:      'Video',
  podcast:    'Podcast',
  app:        'App',
  website:    'Website',
  flashcards: 'Flashcards',
};

interface Props {
  format: Format;
}

export default function FormatChip({ format }: Props) {
  const C = useColors();
  return (
    <View style={[styles.chip, { backgroundColor: C.surface, borderColor: C.border }]}>
      <Text style={[styles.label, { color: C.textSecondary }]}>
        {FORMAT_LABELS[format]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 7,
    paddingVertical:   2,
    borderRadius:      6,
    borderWidth:       0.5,
  },
  label: {
    fontSize: 11,
  },
});