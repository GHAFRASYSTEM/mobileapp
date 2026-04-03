import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Replace with your actual Google OAuth hook / library (e.g. expo-auth-session)
async function signInWithGoogle() {
  // TODO: implement Google OAuth
  return { name: 'Kwame Asante', email: 'kwame@gmail.com', photoUrl: null };
}

export default function SignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGoogle = async () => {
    const user = await signInWithGoogle();
    // Pass prefilled data to the profile completion screen
    router.push({
      pathname: '/(auth)/SignUp',
      params: { name: user.name, email: user.email, photoUrl: user.photoUrl ?? '' },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F6F2' }}>
      <StatusBar barStyle="light-content" backgroundColor="#006B3F" />

      {/* Green header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        {/* Mini flag + brand */}
        <View style={styles.brandRow}>
          <View style={styles.flag}>
            <View style={[styles.stripe, { backgroundColor: '#CE1126' }]} />
            <View style={[styles.stripe, { backgroundColor: '#FCD116', alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={styles.star}>★</Text>
            </View>
            <View style={[styles.stripe, { backgroundColor: '#006B3F' }]} />
          </View>
          <Text style={styles.brandText}>GHA FRA APP</Text>
        </View>

        <Text style={styles.headline}>Welcome back</Text>
        <Text style={styles.headlineSub}>Sign in to your GHAFRA account</Text>
      </View>

      {/* Gold accent */}
      <View style={styles.goldBar} />

      {/* Content */}
      <View style={styles.content}>
        {/* Info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>MEMBER PORTAL</Text>
          <Text style={styles.infoText}>
            Access your membership card, community board, learning modules, and upcoming events.
          </Text>
        </View>

        {/* Google button */}
        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogle} activeOpacity={0.8}>
          <View style={styles.gIconWrap}>
            {/* Google G — replace with an actual Google logo asset if available */}
            <Text style={styles.gIconText}>G</Text>
          </View>
          <Text style={styles.gBtnLabel}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.divLine} />
          <Text style={styles.divText}>secure · encrypted</Text>
          <View style={styles.divLine} />
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to GHAFRA's{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>

      <View style={{ height: insets.bottom + 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header:       { backgroundColor: '#006B3F', paddingHorizontal: 24, paddingBottom: 28 },
  brandRow:     { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, marginTop: 8 },
  flag:         { width: 22, height: 14, borderRadius: 2, overflow: 'hidden', flexDirection: 'row' },
  stripe:       { flex: 1 },
  star:         { fontSize: 7, color: '#000', lineHeight: 9 },
  brandText:    { fontSize: 13, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  headline:     { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  headlineSub:  { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  goldBar:      { height: 2.5, backgroundColor: '#FCD116' },
  content:      { flex: 1, padding: 24, gap: 20 },
  infoCard:     { backgroundColor: '#EEFAF3', borderRadius: 14, padding: 16, gap: 6 },
  infoLabel:    { fontSize: 10, fontWeight: '700', color: '#006B3F', letterSpacing: 1 },
  infoText:     { fontSize: 13, color: '#3D6B52', lineHeight: 20 },
  googleBtn:    { backgroundColor: '#fff', borderRadius: 14, height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, borderWidth: 1.5, borderColor: '#E8E6DF' },
  gIconWrap:    { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fce8e6', alignItems: 'center', justifyContent: 'center' },
  gIconText:    { fontSize: 13, fontWeight: '800', color: '#EA4335' },
  gBtnLabel:    { fontSize: 15, fontWeight: '600', color: '#1A1A18' },
  dividerRow:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  divLine:      { flex: 1, height: 1, backgroundColor: '#E8E6DF' },
  divText:      { fontSize: 11, color: '#9A9890', letterSpacing: 0.5 },
  terms:        { fontSize: 12, color: '#9A9890', textAlign: 'center', lineHeight: 18 },
  termsLink:    { color: '#006B3F', fontWeight: '600' },
});