import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useColors } from '@/constants/Colors';

const W = Dimensions.get('window').width;

type Props = { images: string[] };

export default function ImageCarousel({ images }: Props) {
  const C = useColors();
  const [index, setIndex] = useState(0);

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={e =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / W))
        }
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.image, { width: W }]} />
        )}
      />

      {images.length > 1 && (
        <View style={styles.dotsRow}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, { backgroundColor: i === index ? C.primary : C.border }]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image:   { height: 380 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 },
  dot:     { width: 6, height: 6, borderRadius: 3 },
});