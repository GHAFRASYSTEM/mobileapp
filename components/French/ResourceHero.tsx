import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { FrenchResource } from '@/types/french.types';
import LevelBadge from './LevelBadge';
import EnBadge   from './EnBadge';

interface Props {
  resource: FrenchResource;
  topInset: number;
  onBack:   () => void;
}

export default function ResourceHero({ resource, topInset, onBack }: Props) {
  const C = useColors();

  return (
    <View
      style={[
        styles.band,
        { backgroundColor: C.header, paddingTop: topInset + 12 },
      ]}
    >
      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      {/* Emoji icon */}
      <View style={[styles.emojiBox, { backgroundColor: C.primarySubtle }]}>
        <Text style={styles.emoji}>{resource.emoji}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{resource.title}</Text>

      {/* Badges */}
      <View style={styles.badgeRow}>
        {resource.levels.map(l => <LevelBadge key={l} level={l} />)}
        {resource.hasEnglishTranslation && <EnBadge />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    alignItems:      'center',
    paddingHorizontal: 24,
    paddingBottom:   24,
    gap:             10,
  },
  backBtn: {
    position:        'absolute',
    top:             16,
    left:            16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    width:           34,
    height:          34,
    borderRadius:    17,
    alignItems:      'center',
    justifyContent:  'center',
  },
  backIcon: {
    color:      '#fff',
    fontSize:   22,
    lineHeight: 26,
  },
  emojiBox: {
    width:          72,
    height:         72,
    borderRadius:   20,
    alignItems:     'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 36,
  },
  title: {
    color:      '#fff',
    fontSize:   20,
    fontWeight: '700',
    textAlign:  'center',
  },
  badgeRow: {
    flexDirection: 'row',
    gap:           6,
    flexWrap:      'wrap',
    justifyContent:'center',
  },
});