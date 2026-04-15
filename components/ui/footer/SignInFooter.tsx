import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
  StyleSheet, Platform, Animated,
} from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useColors }    from '@/constants/Colors';
import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth';
import { useAppleAuth }  from '@/hooks/auth/useAppleAuth';

type Props = {
  opacity:    Animated.Value;
  translateY: Animated.Value;
  // Keep these for the Google button (legacy props your SignIn screen passes)
  loading: boolean;
  error:   string | null;
  onPress: () => void;
};

export default function SignInFooter({ opacity, translateY, loading, error, onPress }: Props) {
  const C     = useColors();
  const apple = useAppleAuth();

  const anyLoading = loading || apple.loading;
  const anyError   = error   ?? apple.error;

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }], gap: 12 }}>

      {/* Google button — your existing one */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: C.card, borderColor: C.border }]}
        onPress={onPress}
        disabled={anyLoading}
        activeOpacity={0.8}
      >
        {loading
          ? <ActivityIndicator color={C.text} />
          : <Text style={[styles.btnText, { color: C.text }]}>Continue with Google</Text>
        }
      </TouchableOpacity>

      {/* Apple button — iOS only, required native component */}
      {Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={14}
          style={styles.appleBtn}
          onPress={apple.signIn}
        />
      )}

      {anyError && (
        <Text style={[styles.error, { color: C.textDanger }]}>⚠️ {anyError}</Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn:      { height: 52, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  btnText:  { fontSize: 15, fontWeight: '600' },
  appleBtn: { height: 52, width: '100%' },
  error:    { fontSize: 13, textAlign: 'center' },
});

