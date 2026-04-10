import React from 'react';
import {
  View, Text, StyleSheet, Animated, ActivityIndicator,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import GoogleSignInButton from '@/components/Buttons/GoogleSignInButton';

type Props = {
  opacity: Animated.Value;
  translateY: Animated.Value;
  loading: boolean;
  error: string | null;
  onPress: () => void;
};

export default function SignInFooter({ opacity, translateY, loading, error, onPress }: Props) {
  const C = useColors();

  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}>

      {/* Error */}
      {error && (
        <View style={[styles.errorCard, { backgroundColor: C.dangerSubtle, borderColor: C.borderDanger }]}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={[styles.errorText, { color: C.textDanger }]}>{error}</Text>
        </View>
      )}

      {/* Button or loader */}
      {loading ? (
        <View style={[styles.loadingRow, { backgroundColor: C.surface, borderColor: C.border }]}>
          <ActivityIndicator color={C.primary} size="small" />
          <Text style={[styles.loadingText, { color: C.textSecondary }]}>Signing you in…</Text>
        </View>
      ) : (
        <GoogleSignInButton onPress={onPress} />
      )}

      {/* Divider */}
      <View style={styles.divRow}>
        <View style={[styles.divLine, { backgroundColor: C.border }]} />
        <Text style={[styles.divLabel, { color: C.textMuted }]}>secured & encrypted</Text>
        <View style={[styles.divLine, { backgroundColor: C.border }]} />
      </View>

      {/* Terms */}
      <Text style={[styles.terms, { color: C.textMuted }]}>
        By continuing, you agree to GHAFRA's{' '}
        <Text style={[styles.link, { color: C.textLink }]}>Terms of Service</Text>
        {' '}and{' '}
        <Text style={[styles.link, { color: C.textLink }]}>Privacy Policy</Text>
      </Text>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper:     { gap: 14 },
  errorCard:   { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  errorIcon:   { fontSize: 15 },
  errorText:   { fontSize: 13, fontWeight: '500', flex: 1 },
  loadingRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, height: 54, borderRadius: 14, borderWidth: 1 },
  loadingText: { fontSize: 14 },
  divRow:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  divLine:     { flex: 1, height: 1 },
  divLabel:    { fontSize: 11, letterSpacing: 0.5 },
  terms:       { fontSize: 12, textAlign: 'center', lineHeight: 18 },
  link:        { fontWeight: '600' },
});