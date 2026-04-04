import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Album } from '@/assets/data/galleryData';

export default function AlbumCard({
  album,
  onPress,
}: {
  album: Album;
  onPress: () => void;
}) {
  const C = useColors();

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: C.border }]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Image source={{ uri: album.cover }} style={styles.cover} />

      <View style={styles.overlay} />

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>
          {album.title}
        </Text>

        <View style={styles.row}>
          <Text style={styles.date}>{album.date}</Text>

          <View style={styles.pill}>
            <IconSymbol name="photo.on.rectangle" size={10} color="#fff" />
            <Text style={styles.pillText}>{album.count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 170,
    overflow: 'hidden',
    borderWidth: 0,
    borderRadius: 16,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.40)',
  },
  meta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
});