import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { FrenchResource } from '@/types/french.types';

interface Props {
  resource: FrenchResource;
}

export default function ResourceStats({ resource }: Props) {
  const C = useColors();

  const stats = [
    resource.totalLessons != null
      ? { value: `${resource.totalLessons}`, label: 'Lessons' }
      : null,
    { value: 'Free',                           label: 'Always'  },
    { value: resource.levels.join('→'),        label: 'Levels'  },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <View style={styles.row}>
      {stats.map(stat => (
        <View
          key={stat.label}
          style={[styles.box, { backgroundColor: C.surface, borderColor: C.border }]}
        >
          <Text style={[styles.value, { color: C.primary }]}>{stat.value}</Text>
          <Text style={[styles.label, { color: C.textMuted }]}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap:           10,
  },
  box: {
    flex:           1,
    borderWidth:    0.5,
    borderRadius:   12,
    padding:        12,
    alignItems:     'center',
    gap:            4,
  },
  value: {
    fontSize:   18,
    fontWeight: '700',
  },
  label: {
    fontSize: 11,
  },
});