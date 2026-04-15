import React from 'react';
import {
  View, Text, Pressable, ActivityIndicator, StyleSheet, Platform,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useColors } from '@/constants/Colors';

// ── Google G SVG (official brand colors) ─────────────────────────────────────

const GOOGLE_G_XML = `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
</svg>`;

// ── Google button (full-width, branded) ───────────────────────────────────────

interface GoogleButtonProps {
  onPress:  () => void;
  loading:  boolean;
}

export function GoogleButton({ onPress, loading }: GoogleButtonProps) {
  const C = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.googleBtn,
        { backgroundColor: C.surface, borderColor: C.border, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={C.textPrimary} />
      ) : (
        <>
          <SvgXml xml={GOOGLE_G_XML} width={20} height={20} />
          <Text style={[styles.googleText, { color: C.textPrimary }]}>
            Continue with Google
          </Text>
        </>
      )}
    </Pressable>
  );
}

// ── Apple button (kept but commented-out at usage site) ───────────────────────

interface AppleButtonProps {
  onPress:  () => void;
  loading:  boolean;
}

export function AppleButton({ onPress, loading }: AppleButtonProps) {
  const C = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.googleBtn,
        { backgroundColor: C.surface, borderColor: C.border, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={C.textPrimary} />
      ) : (
        <Text style={[styles.googleText, { color: C.textPrimary }]}>
          Continue with Apple
        </Text>
      )}
    </Pressable>
  );
}

// ── Email / primary button ────────────────────────────────────────────────────

interface EmailButtonProps {
  onPress:  () => void;
  loading:  boolean;
  disabled: boolean;
}

export function EmailButton({ onPress, loading, disabled }: EmailButtonProps) {
  const C = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.primaryBtn,
        {
          backgroundColor: pressed ? C.primaryPressed : C.primary,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading
        ? <ActivityIndicator color={C.textInverse} />
        : <Text style={[styles.primaryBtnText, { color: C.textInverse }]}>Continue with Email</Text>
      }
    </Pressable>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

export function Divider() {
  const C = useColors();
  return (
    <View style={styles.dividerRow}>
      <View style={[styles.dividerLine, { backgroundColor: C.border }]} />
      <Text style={[styles.dividerText, { color: C.textMuted }]}>or</Text>
      <View style={[styles.dividerLine, { backgroundColor: C.border }]} />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  googleBtn: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            10,
    borderRadius:   14,
    paddingVertical: 14,
    borderWidth:    1,
  },
  googleText:     { fontSize: 15, fontWeight: '600' },
  primaryBtn:     { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { fontWeight: '700', fontSize: 16 },
  dividerRow:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dividerLine:    { flex: 1, height: 1 },
  dividerText:    { fontSize: 13 },
});