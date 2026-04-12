import React from 'react';
import {
  View, Text, TouchableOpacity,
  ActivityIndicator, StyleSheet,
} from 'react-native';
import { useColors }  from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Props = {
  label:    string;
  onPress:  () => void;
  loading:  boolean;
  error:    string | null;
  disabled?: boolean;
};

export function PayButton({ label, onPress, loading, error, disabled }: Props) {
  const C = useColors();

  return (
    <View style={styles.wrapper}>
      {error && (
        <View style={[styles.errorCard, {
          backgroundColor: C.dangerSubtle,
          borderColor:     C.borderDanger,
        }]}>
          <IconSymbol name="exclamationmark.circle.fill" size={16} color={C.danger} />
          <Text style={[styles.errorText, { color: C.textDanger }]}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.btn,
          { backgroundColor: C.primary },
          (disabled || loading) && styles.btnDisabled,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <IconSymbol name="lock.fill" size={15} color="#fff" />
            <Text style={styles.btnText}>{label}</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={[styles.secure, { color: C.textMuted }]}>
        🔒 Secured by Stripe
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:     { gap: 12 },
  errorCard:   {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
    padding:       12,
    borderRadius:  12,
    borderWidth:   1,
  },
  errorText:   { flex: 1, fontSize: 13, fontWeight: '500' },
  btn:         {
    borderRadius:    14,
    height:          54,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText:     { fontSize: 16, fontWeight: '700', color: '#fff' },
  secure:      { textAlign: 'center', fontSize: 12 },
});