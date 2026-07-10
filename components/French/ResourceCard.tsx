import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import { FrenchResource } from '@/types/french.types';
import LevelBadge from './LevelBadge';
import FormatChip from './FormatChip';
import EnBadge   from './EnBadge';

interface Props {
  item:    FrenchResource;
  onPress: () => void;
}

// Maps the emoji stored in resources.data.ts to an Ionicons name,
// so the data file doesn't need to change.
const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  '🎬': 'film-outline',
  '🎧': 'headset-outline',
  '📖': 'book-outline',
  '🎵': 'musical-notes-outline',
  '☕': 'cafe-outline',
  '🎙️': 'mic-outline',
};

function getIconName(emoji?: string): keyof typeof Ionicons.glyphMap {
  return (emoji && ICON_MAP[emoji]) || 'document-text-outline';
}

export default function ResourceCard({ item, onPress }: Props) {
  const C = useColors();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Accent stripe */}
      <View style={[styles.stripe, { backgroundColor: C.primary }]} />

      <View style={styles.body}>
        {/* ── Top row: icon + title + chips ── */}
        <View style={styles.topRow}>
          <View style={[styles.iconBox, { backgroundColor: C.primarySubtle }]}>
            <Ionicons name={getIconName(item.emoji)} size={20} color={C.primary} />
          </View>

          <View style={styles.meta}>
            <Text style={[styles.title, { color: C.textPrimary }]} numberOfLines={1}>
              {item.title}
            </Text>

            <View style={styles.chipRow}>
              <FormatChip format={item.format} />
              {item.hasEnglishTranslation && <EnBadge />}
              {item.totalLessons != null && (
                <Text style={[styles.lessonCount, { color: C.textMuted }]}>
                  {item.totalLessons} lessons
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* ── Description ── */}
        <Text style={[styles.description, { color: C.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>

        {/* ── Level badges ── */}
        <View style={styles.levelRow}>
          {item.levels.map(l => <LevelBadge key={l} level={l} />)}
        </View>
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={20} color={C.textMuted} style={styles.arrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems:    'center',
    borderWidth:   0.5,
    borderRadius:  14,
    overflow:      'hidden',
  },
  stripe: {
    width:     4,
    alignSelf: 'stretch',
  },
  body: {
    flex:    1,
    padding: 12,
    gap:     6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           10,
  },
  iconBox: {
    width:           40,
    height:          40,
    borderRadius:    10,
    alignItems:      'center',
    justifyContent:  'center',
  },
  meta: {
    flex: 1,
    gap:  4,
  },
  title: {
    fontSize:   14,
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           6,
    flexWrap:      'wrap',
  },
  lessonCount: {
    fontSize: 11,
  },
  description: {
    fontSize:   12.5,
    lineHeight: 18,
  },
  levelRow: {
    flexDirection: 'row',
    gap:           5,
    flexWrap:      'wrap',
  },
  arrow: {
    paddingRight: 12,
  },
});