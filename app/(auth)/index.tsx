import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Auto-advance to sign-in after 2.5s
  useEffect(() => {
    const t = setTimeout(() => router.replace('/(auth)/SignIn'), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="#006B3F" />

      <View style={styles.centerBlock}>
        {/* App icon */}
        <View style={styles.iconWrapper}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.appName}>GHAFRA</Text>
        <Text style={styles.appSub}>Ghana · France Association</Text>
      </View>

      {/* Bottom dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#006B3F', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 60 },
  centerBlock:  { alignItems: 'center', gap: 12 },
  iconWrapper:  { width: 110, height: 110, borderRadius: 26, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  icon:         { width: 80, height: 80 },
  appName:      { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  appSub:       { fontSize: 13, color: 'rgba(255,255,255,0.55)', letterSpacing: 1.2, textTransform: 'uppercase' },
  dots:         { flexDirection: 'row', gap: 6 },
  dot:          { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive:    { backgroundColor: '#FCD116', width: 18, borderRadius: 3 },
});