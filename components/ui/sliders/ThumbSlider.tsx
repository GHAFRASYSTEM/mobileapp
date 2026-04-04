import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import type { GalleryPhoto } from '@/assets/data/galleryData';

const THUMB_SIZE = 80;

export default function ThumbSlider({
  photos,
  onPress,
}: {
  photos: GalleryPhoto[];
  onPress: (index: number) => void;
}) {
  const C = useColors();

  return (
    <FlatList
      data={photos}
      keyExtractor={(p) => p.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => onPress(index)}
          activeOpacity={0.82}
        >
          <Image
            source={{ uri: item.uri }}
            style={[styles.thumb, { borderColor: C.border }]}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
  },
});