import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import { Level } from '@/types/french.types';

type FilterValue = 'All' | Level;

const FILTERS: FilterValue[] = ['All', 'A1', 'A2', 'B1', 'B2', 'C1'];

interface Props {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function LevelFilterBar({ value, onChange }: Props) {
  const C = useColors();

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {FILTERS.map(filter => {
          const active = value === filter;

          return (
            <Pressable
              key={filter}
              onPress={() => onChange(filter)}
              style={({ pressed }) => [
                styles.pill,
                {
                  backgroundColor: active ? C.primary : C.surface,
                  borderColor: active ? C.primary : C.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.pillText,
                  { color: active ? C.textInverse : C.textSecondary },
                ]}
              >
                {filter === 'All' ? 'All levels' : filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 44,              // ✅ keeps it compact ALWAYS
    justifyContent: 'center',
  },

  row: {
    paddingHorizontal: 16,
    alignItems: 'center',    // ✅ vertical alignment fix
    gap: 8,
  },

  pill: {
    minHeight: 30,           // ✅ prevents weird stretching
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pillText: {
    fontSize: 13,
    fontWeight: '500',
  },
});