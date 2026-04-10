import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';

import { ALBUMS } from '@/assets/data/galleryData';
import type { Album } from '@/assets/data/galleryData';

import ScreenHeader from '@/components/Headers/ScreenHeader';
import AlbumCard from '@/components/Cards/AlbumCard';
import Lightbox from '@/components/modals/Lightbox';
import ThumbSlider from '@/components/ui/sliders/ThumbSlider';
import DriveCTA from '@/components/Buttons/DriveCTA';

export default function Gallery() {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [photoIndex,  setPhotoIndex]  = useState(0);

  const openLightbox = (album: Album, index: number) => {
    setActiveAlbum(album);
    setPhotoIndex(index);
  };

  const totalPhotos = ALBUMS.reduce((s, a) => s + a.count, 0);

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>

      <ScreenHeader
        variant="page"
        title="Gallery"
        subtitle={`${ALBUMS.length} albums · ${totalPhotos} photos`}
        icon="photo.stack.fill"
        showBack={false}
      />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionLabel, { color: C.textMuted }]}>ALBUMS</Text>

        {ALBUMS.map(album => (
          <View
            key={album.id}
            style={[styles.albumBlock, { backgroundColor: C.surface, borderColor: C.border }]}
          >
            <AlbumCard album={album} onPress={() => openLightbox(album, 0)} />

            <View style={styles.sliderHeader}>
              <Text style={[styles.sliderLabel, { color: C.textMuted }]}>
                {album.count} PHOTOS
              </Text>
              <TouchableOpacity onPress={() => openLightbox(album, 0)}>
                <Text style={[styles.sliderAll, { color: C.primary }]}>View all →</Text>
              </TouchableOpacity>
            </View>

            <ThumbSlider photos={album.photos} onPress={i => openLightbox(album, i)} />

            <View style={{ height: 12 }} />
          </View>
        ))}

        <Text style={[styles.sectionLabel, { color: C.textMuted, marginTop: 4 }]}>
          MORE CONTENT
        </Text>
        <DriveCTA />
      </ScrollView>

      {activeAlbum && (
        <Lightbox
          visible={!!activeAlbum}
          photo={activeAlbum.photos[photoIndex]}
          album={activeAlbum}
          index={photoIndex}
          total={activeAlbum.photos.length}
          onClose={() => setActiveAlbum(null)}
          onPrev={() => setPhotoIndex(i => Math.max(0, i - 1))}
          onNext={() => setPhotoIndex(i => Math.min(activeAlbum.photos.length - 1, i + 1))}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root:         { flex: 1 },
  scroll:       { padding: 16, gap: 16 },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  albumBlock:   { borderRadius: 18, borderWidth: 1, overflow: 'hidden', marginBottom: 4 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8 },
  sliderLabel:  { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  sliderAll:    { fontSize: 12, fontWeight: '600' },
});