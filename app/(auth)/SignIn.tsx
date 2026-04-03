import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, StatusBar, Animated,
  Easing, Dimensions, ActivityIndicator, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColors } from '@/constants/Colors';
import GoogleSignInButton from '@/components/Buttons/GoogleSignInButton';

const { width } = Dimensions.get('window');

async function signInWithGoogle() {
  return {
    name: 'Kwame Asante',
    email: 'kwame@gmail.com',
    photoUrl: null,
    region: null,
    memberType: null,
    role: null,
    isExistingMember: false,
  };
}

export default function SignInScreen() {
  const router  = useRouter();
  const insets  = useSafeAreaInsets();
  const C       = useColors();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  // ── Entrance animations ──────────────────────────────────────────────────
  const topSlide    = useRef(new Animated.Value(-40)).current;
  const topOpacity  = useRef(new Animated.Value(0)).current;
  const cardSlide   = useRef(new Animated.Value(32)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const btnSlide    = useRef(new Animated.Value(32)).current;
  const btnOpacity  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(topOpacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(topSlide,   { toValue: 0, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 450, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(cardSlide,   { toValue: 0, duration: 450, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(btnOpacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(btnSlide,   { toValue: 0, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  // ── Auth handler ─────────────────────────────────────────────────────────
  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await signInWithGoogle();
      if (user.isExistingMember && user.region && user.memberType && user.role) {
        router.replace('/(tabs)/(home)');
        return;
      }
      router.push({
        pathname: '/(auth)/SignUp',
        params: {
          name:       user.name       ?? '',
          email:      user.email      ?? '',
          photoUrl:   user.photoUrl   ?? '',
          region:     user.region     ?? '',
          memberType: user.memberType ?? '',
          role:       user.role       ?? '',
        },
      });
    } catch {
      setError('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Features list ─────────────────────────────────────────────────────────
  const features = [
    { icon: '🪪', text: 'Digital membership card, always in your pocket' },
    { icon: '🤝', text: 'Connect with the Ghanaian community in France'   },
    { icon: '📚', text: 'Access learning resources and member benefits'   },
    { icon: '🆘', text: 'Get Help with accommodation, job search, and more'   },
  ];
  

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      {/* ── Top hero ───────────────────────────────────────────────────── */}
      <View style={[styles.hero, { backgroundColor: C.header, paddingTop: insets.top + 20 }]}>

        {/* Decorative arc */}
        <View style={styles.heroArc} />

        <Animated.View style={{ opacity: topOpacity, transform: [{ translateY: topSlide }], alignItems: 'center' }}>
          {/* Logo badge */}
          <View style={[styles.logoBadge, { borderColor: C.gold }]}>
            <View style={[styles.logoInner, { backgroundColor: '#FFFFFF' }]}>
              <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
            </View>
          </View>

          <Text style={styles.heroTitle}>GHAFRA</Text>

          {/* Flag bar */}
          <View style={styles.flagBar}>
            {['#CE1126', '#FCD116', '#006B3F', '#FCD116', '#CE1126'].map((c, i) => (
              <View key={i} style={[styles.flagSegment, { backgroundColor: c }]} />
            ))}
          </View>

          <Text style={styles.heroSub}>Ghana · France Association</Text>
        </Animated.View>
      </View>

      {/* Wave divider */}
      <View style={[styles.waveDivider, { backgroundColor: C.header }]}>
        <View style={[styles.waveInner, { backgroundColor: C.background }]} />
      </View>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <View style={[styles.body, { paddingBottom: insets.bottom + 24 }]}>

        {/* Headline */}
        <Animated.View style={{ opacity: cardOpacity, transform: [{ translateY: cardSlide }] }}>
          <Text style={[styles.headline, { color: C.textPrimary }]}>Akwaaba</Text>
          <Text style={[styles.headlineSub, { color: C.textSecondary }]}>
            Sign in to access your account
          </Text>
        </Animated.View>

        {/* Feature cards */}
        <Animated.View style={[styles.featureList, { opacity: cardOpacity, transform: [{ translateY: cardSlide }] }]}>
          {features.map(({ icon, text }) => (
            <View key={text} style={[styles.featureRow, { backgroundColor: C.surface, borderColor: C.border }]}>
              <Text style={styles.featureIcon}>{icon}</Text>
              <Text style={[styles.featureText, { color: C.textSecondary }]}>{text}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Error */}
        {error && (
          <View style={[styles.errorCard, { backgroundColor: C.dangerSubtle, borderColor: C.borderDanger }]}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={[styles.errorText, { color: C.textDanger }]}>{error}</Text>
          </View>
        )}

        {/* CTA */}
        <Animated.View style={{ opacity: btnOpacity, transform: [{ translateY: btnSlide }] }}>
          {loading ? (
            <View style={[styles.loadingRow, { backgroundColor: C.surface, borderColor: C.border }]}>
              <ActivityIndicator color={C.primary} size="small" />
              <Text style={[styles.loadingText, { color: C.textSecondary }]}>Signing you in…</Text>
            </View>
          ) : (
            <GoogleSignInButton onPress={handleGoogle} />
          )}
        </Animated.View>

        {/* Divider */}
        <View style={styles.divRow}>
          <View style={[styles.divLine, { backgroundColor: C.border }]} />
          <Text style={[styles.divLabel, { color: C.textMuted }]}>secured & encrypted</Text>
          <View style={[styles.divLine, { backgroundColor: C.border }]} />
        </View>

        {/* Terms */}
        <Text style={[styles.terms, { color: C.textMuted }]}>
          By continuing, you agree to GHAFRA's{' '}
          <Text style={[styles.termsLink, { color: C.textLink }]}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={[styles.termsLink, { color: C.textLink }]}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // Hero
  hero: {
    alignItems: 'center',
    paddingBottom: 48,
    overflow: 'hidden',
  },
  heroArc: {
    position: 'absolute',
    width: width * 1.6,
    height: width * 1.6,
    borderRadius: width * 0.8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -width * 1.2,
    alignSelf: 'center',
  },
  logo: {
width: 60,
height: 60,
borderRadius: 16,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoInner: {
    width: 68,
    height: 68,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#006B3F',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 5,
    marginBottom: 10,
  },
  flagBar: {
    flexDirection: 'row',
    width: 80,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  flagSegment: { flex: 1 },
  heroSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Wave
  waveDivider: { height: 28, overflow: 'hidden' },
  waveInner: {
    position: 'absolute',
    bottom: 0, left: -20, right: -20,
    height: 48,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  // Body
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 4,
    gap: 16,
  },

  headline:    { fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  headlineSub: { fontSize: 14, marginTop: 3 },

  featureList: { gap: 8 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  featureIcon: { fontSize: 20 },
  featureText: { flex: 1, fontSize: 13, lineHeight: 18 },

  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  errorIcon: { fontSize: 15 },
  errorText: { fontSize: 13, fontWeight: '500', flex: 1 },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
  },
  loadingText: { fontSize: 14 },

  divRow:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  divLine: { flex: 1, height: 1 },
  divLabel: { fontSize: 11, letterSpacing: 0.5 },

  terms:     { fontSize: 12, textAlign: 'center', lineHeight: 18 },
  termsLink: { fontWeight: '600' },
});