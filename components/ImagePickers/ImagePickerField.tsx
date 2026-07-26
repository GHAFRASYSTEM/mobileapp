import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';

type Props = {
  label:      string;
  uri:        string | null;
  onPick:     () => void;
  onRemove?:  () => void;
  required?:  boolean;
  hint?:      string;
};

export function ImagePickerField({ label, uri, onPick, onRemove, required, hint }: Props) {
  const C = useColors();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: C.textMuted }]}>
        {label} {required && '*'}
      </Text>

      <TouchableOpacity
        style={[styles.box, { borderColor: C.border, backgroundColor: C.surface }]}
        onPress={onPick}
        activeOpacity={0.85}
      >
        {uri ? (
          <>
            <Image source={{ uri }} style={styles.preview} />
            {onRemove && (
              <TouchableOpacity
                style={[styles.removeBtn, { backgroundColor: C.background }]}
                onPress={onRemove}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <MaterialIcons name="close" size={16} color={C.textPrimary} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="add-a-photo" size={22} color={C.textMuted} />
            <Text style={{ color: C.textMuted, marginTop: 6, fontSize: 13 }}>Tap to add</Text>
          </View>
        )}
      </TouchableOpacity>

      {hint && <Text style={[styles.hint, { color: C.textMuted }]}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { fontSize: 12 },
  box: {
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  preview: { width: '100%', height: '100%' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: { fontSize: 11, lineHeight: 15 },
});