import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
  TextInput, Animated, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors }         from '@/constants/Colors';
import { useEntrance }       from '@/hooks/animation/useEntrance';
import { useGoogleAuth }     from '@/hooks/auth/useGoogleAuth';
import { useEmailAuth }      from '@/hooks/auth/useEmailAuth';
import { useAppleAuth }      from '@/hooks/auth/useAppleAuth';
import { EmailInput }        from '@/components/Inputs/EmailInput';
import { PasswordInput }     from '@/components/Inputs/PasswordInput';
import { EmailButton, Divider, GoogleButton } from '@/components/Buttons/AuthButtons';
import { AdinkraHeader } from '@/components/Headers/SectionHeaders/AdinkraHeader';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail    = (v: string) => EMAIL_RE.test(v.trim());
const isValidPassword = (v: string) => v.length >= 8;

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const C      = useColors();
  const anim   = useEntrance();

  const google = useGoogleAuth();
  const apple  = useAppleAuth();
  const email  = useEmailAuth();

  const [emailVal,    setEmailVal]    = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [touched,     setTouched]     = useState({ email: false, password: false });

  const passwordRef = useRef<TextInput>(null);

  const emailError =
    touched.email && !isValidEmail(emailVal) ? 'Enter a valid email address' : null;
  const passwordError =
    touched.password && !isValidPassword(passwordVal)
      ? 'Password must be at least 8 characters'
      : null;

  const canSubmit = isValidEmail(emailVal) && isValidPassword(passwordVal) && !email.loading;

  const handleEmailSignIn = () => {
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    email.signIn(emailVal.trim(), passwordVal);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.root, { backgroundColor: C.background }]}>
   <AdinkraHeader />


        <ScrollView
          contentContainerStyle={[
            styles.body,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.spacer} />

          {/* ── Social sign-in (Google first) ──  OTA UPDATE */}
          <Animated.View
            style={[
              styles.socialSection,
              { opacity: anim.opacity2, transform: [{ translateY: anim.translate2 }] },
            ]}
          >
            <GoogleButton onPress={google.signIn} loading={google.loading} />

            {google.error && (
              <Text style={[styles.apiError, { color: C.danger }]}>{google.error}</Text>
            )}
          </Animated.View>

          {/* ── Divider ── */}
          <Animated.View
            style={{ opacity: anim.opacity2, transform: [{ translateY: anim.translate2 }] }}
          >
            <Divider />
          </Animated.View>

          {/* ── Email + password form ── */}
          <Animated.View
            style={[
              styles.fields,
              { opacity: anim.opacity3, transform: [{ translateY: anim.translate3 }] },
            ]}
          >
            <EmailInput
              value={emailVal}
              onChangeText={setEmailVal}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              onSubmitEditing={() => passwordRef.current?.focus()}
              error={emailError}
            />

            <PasswordInput
              value={passwordVal}
              onChangeText={setPasswordVal}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              onSubmitEditing={handleEmailSignIn}
              error={passwordError}
              inputRef={passwordRef}
            />

            {email.error && (
              <Text style={[styles.apiError, { color: C.danger }]}>{email.error}</Text>
            )}

            <EmailButton
              onPress={handleEmailSignIn}
              loading={email.loading}
              disabled={!canSubmit}
            />
          </Animated.View>

          <View style={styles.spacer} />

          <Text style={[styles.legal, { color: C.textMuted }]}>
            By signing in you agree to share your name and email with GHAFRA.{'\n'}
            We collect city, occupation, and optional demographic details for
            membership administration and government reporting only.
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: {
    flexGrow:         1,
    paddingHorizontal: 24,
    gap:               20,
  },
  spacer:        { paddingTop:40},
  fields:        { gap: 16 },
  socialSection: { gap: 12 },
  apiError:      { fontSize: 12, textAlign: 'center' },
  legal:         { fontSize: 11, textAlign: 'center', lineHeight: 16 },
});