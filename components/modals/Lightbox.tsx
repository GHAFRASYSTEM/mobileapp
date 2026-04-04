import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Album, GalleryPhoto } from '@/assets/data/galleryData';

const { width } = Dimensions.get('window');

export default function Lightbox({
  visible,
  photo,
  album,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  visible: boolean;
  photo: GalleryPhoto;
  album: Album;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (!photo) return null;

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />

        {/* Top bar */}
        <SafeAreaView>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <IconSymbol name="xmark" size={18} color="#fff" />
            </TouchableOpacity>

            <View style={styles.topMeta}>
              <Text style={styles.topTitle}>{album.title}</Text>
              <Text style={styles.topCount}>
                {index + 1} of {total}
              </Text>
            </View>

            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>

        {/* Image */}
        <View style={styles.imgWrap}>
          <Image
            source={{ uri: photo.uri }}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        {/* Caption */}
        {photo.caption && (
          <Text style={styles.caption} numberOfLines={2}>
            {photo.caption}
          </Text>
        )}

        {/* Navigation */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, index === 0 && styles.navDisabled]}
            onPress={onPrev}
            disabled={index === 0}
          >
            <IconSymbol name="chevron.left" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Dots */}
          <View style={styles.dots}>
            {Array.from({ length: total }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === index ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.navBtn, index === total - 1 && styles.navDisabled]}
            onPress={onNext}
            disabled={index === total - 1}
          >
            <IconSymbol name="chevron.right" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topMeta: { alignItems: 'center' },

  topTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },

  topCount: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 1,
  },

  imgWrap: { flex: 1 },

  img: {
    width,
    flex: 1,
  },

  caption: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navDisabled: { opacity: 0.25 },

  dots: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  dot: {
    borderRadius: 4,
  },

  dotActive: {
    width: 16,
    height: 4,
    backgroundColor: '#FCD116',
  },

  dotInactive: {
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
});