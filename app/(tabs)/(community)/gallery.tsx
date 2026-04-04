import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { ALBUMS } from '@/assets/data/galleryData';
import type { Album } from '@/assets/data/galleryData';

import AlbumCard from '@/components/Cards/AlbumCard';
import Lightbox from '@/components/modals/Lightbox';
import ThumbSlider from '@/components/ui/sliders/ThumbSlider';
import DriveCTA from '@/components/Buttons/DriveCTA';

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function Gallery() {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [photoIndex,  setPhotoIndex]  = useState(0);

  const openLightbox = (album: Album, index: number) => {
    setActiveAlbum(album);
    setPhotoIndex(index);
  };

  const closeLightbox = () => setActiveAlbum(null);

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: C.header, paddingTop: insets.top + 10 }]}>
        <View>
          <Text style={styles.headerTitle}>Gallery</Text>
          <Text style={styles.headerSub}>
            {ALBUMS.length} albums · {ALBUMS.reduce((s, a) => s + a.count, 0)} photos
          </Text>
        </View>
        <View style={styles.headerBadge}>
          <IconSymbol name="photo.stack.fill" size={18} color="#fff" />
        </View>
      </View>

      <View style={[styles.goldBar, { backgroundColor: C.gold }]} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionLabel, { color: C.textMuted }]}>ALBUMS</Text>

        {ALBUMS.map(album => (
          <View
            key={album.id}
            style={[
              styles.albumBlock,
              { backgroundColor: C.surface, borderColor: C.border }
            ]}
          >
            <AlbumCard
              album={album}
              onPress={() => openLightbox(album, 0)}
            />

            {/* Slider header */}
            <View style={styles.sliderHeader}>
              <Text style={[styles.sliderLabel, { color: C.textMuted }]}>
                {album.count} PHOTOS
              </Text>
              <TouchableOpacity onPress={() => openLightbox(album, 0)}>
                <Text style={[styles.sliderAll, { color: C.primary }]}>
                  View all →
                </Text>
              </TouchableOpacity>
            </View>

            <ThumbSlider
              photos={album.photos}
              onPress={i => openLightbox(album, i)}
            />

            <View style={{ height: 12 }} />
          </View>
        ))}

        {/* CTA */}
        <Text style={[styles.sectionLabel, { color: C.textMuted, marginTop: 4 }]}>
          MORE CONTENT
        </Text>
        <DriveCTA />
      </ScrollView>

      {/* Lightbox */}
      {activeAlbum && (
        <Lightbox
          visible={!!activeAlbum}
          photo={activeAlbum.photos[photoIndex]}
          album={activeAlbum}
          index={photoIndex}
          total={activeAlbum.photos.length}
          onClose={closeLightbox}
          onPrev={() => setPhotoIndex(i => Math.max(0, i - 1))}
          onNext={() =>
            setPhotoIndex(i =>
              Math.min(activeAlbum.photos.length - 1, i + 1)
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },

  headerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },

  headerBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  goldBar: { height: 3 },

  scroll: {
    padding: 16,
    gap: 16,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  albumBlock: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 4,
  },

  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },

  sliderLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  sliderAll: {
    fontSize: 12,
    fontWeight: '600',
  },
});