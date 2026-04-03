import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Props = {
  uri: string;
  initials: string;
  onPick: (uri: string) => void;
};

export default function AvatarPicker({ uri, initials, onPick }: Props) {
  const C = useColors();

  const pick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (!result.canceled) onPick(result.assets[0].uri);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={pick} activeOpacity={0.85} style={styles.touchable}>
        {uri ? (
          <Image source={{ uri }} style={[styles.img, { borderColor: C.primary }]} />
        ) : (
          <View style={[styles.fallback, { backgroundColor: C.primarySubtle, borderColor: C.primary }]}>
            <Text style={[styles.initials, { color: C.primary }]}>{initials || '?'}</Text>
          </View>
        )}

        {/* Camera badge */}
        <View style={[styles.badge, { backgroundColor: C.gold, borderColor: C.surface }]}>
          <IconSymbol name="camera.fill" size={11} color="#1A1A18" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={pick}>
        <Text style={[styles.hint, { color: C.primary }]}>
          {uri ? 'Change photo' : 'Add photo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:   { alignItems: 'center', gap: 8 },
  touchable: { position: 'relative' },
  img:       { width: 88, height: 88, borderRadius: 44, borderWidth: 3 },
  fallback:  { width: 88, height: 88, borderRadius: 44, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  initials:  { fontSize: 28, fontWeight: '800' },
  badge:     { position: 'absolute', bottom: 2, right: 2, width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  hint:      { fontSize: 12, fontWeight: '600' },
});