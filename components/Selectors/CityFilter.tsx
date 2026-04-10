import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

type Props = {
  filters: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CityFilter({ filters, value, onChange }: Props) {
  const C = useColors();

  return (
    <View style={[styles.wrap, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
      <FlatList
        horizontal
        data={filters}
        keyExtractor={(f) => f}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const active = value === item;

          return (
            <TouchableOpacity
              onPress={() => onChange(item)}
              style={[
                styles.pill,
                {
                  backgroundColor: active ? C.primary : C.background,
                  borderColor: active ? C.primary : C.border,
                },
              ]}
            >
              <Text style={[styles.text, { color: active ? '#fff' : C.textSecondary }]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 0.5,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
  },
});