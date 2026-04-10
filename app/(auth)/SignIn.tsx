import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors }     from '@/constants/Colors';
import { useEntrance }   from '@/hooks/animation/useEntrance';
import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth';
import HeroBanner   from '@/components/Banners/HeroBanner';
import FeatureList  from '@/components/Lists/FeatureList';
import SignInFooter from '@/components/ui/footer/SignInFooter';

/**
 * SignIn screen — pure UI. Zero routing logic.
 *
 * After a successful Google sign-in, useGoogleAuth updates Supabase session,
 * which triggers onAuthStateChange in AuthContext, which updates state,
 * which causes NavigationGuard to route automatically.
 *
 * This screen never needs to know where to go next.
 */
export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const C      = useColors();
  const anim   = useEntrance();
  const { loading, error, signIn } = useGoogleAuth();

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <HeroBanner
        opacity={anim.opacity1}
        translateY={anim.translate1}
        topInset={insets.top}
      />

      <View style={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
        <FeatureList opacity={anim.opacity2} translateY={anim.translate2} />
        <SignInFooter
          opacity={anim.opacity3}
          translateY={anim.translate3}
          loading={loading}
          error={error}
          onPress={signIn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 20, gap: 16 },
});