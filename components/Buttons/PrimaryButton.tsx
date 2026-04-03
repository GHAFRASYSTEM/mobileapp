import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string; // optional 👈
};

export default function PrimaryButton({
  text,
  onPress,
  loading = false,
  disabled = false,
  icon,
}: Props) {
  const C = useColors();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: C.primary,
          opacity: disabled || loading ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <View style={styles.content}>
          {icon && (
            <IconSymbol name={icon as any} size={16} color="#fff" />
          )}
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
});