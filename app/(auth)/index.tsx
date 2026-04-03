import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const GREEN  = '#006B3F';
const GOLD   = '#FCD116';
const RED    = '#CE1126';
const WHITE  = '#FFFFFF';

export default function SplashScreen() {
  const router  = useRouter();
  const insets  = useSafeAreaInsets();

  // Animation values
  const bgScale     = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoY       = useRef(new Animated.Value(24)).current;
  const subOpacity  = useRef(new Animated.Value(0)).current;
  const barOpacity  = useRef(new Animated.Value(0)).current;
  const dotScale    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Background burst
      Animated.timing(bgScale, {
        toValue: 1, duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // 2. Logo rises in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(logoY, {
          toValue: 0, duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      // 3. Subtitle + bar fade in
      Animated.parallel([
        Animated.timing(subOpacity, {
          toValue: 1, duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(barOpacity, {
          toValue: 1, duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // 4. Loading dot
      Animated.timing(dotScale, {
        toValue: 1, duration: 300,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    const t = setTimeout(() => router.replace('/(auth)/SignIn'), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={GREEN} />

      {/* Radial circle burst background */}
      <Animated.View
        style={[styles.burst, { transform: [{ scale: bgScale }] }]}
      />

      {/* Decorative arcs */}
      <View style={[styles.arc, styles.arcTopRight]} />
      <View style={[styles.arc, styles.arcBottomLeft]} />

      {/* Flag stripe bar: R-G-G-G-R */}
      <Animated.View style={[styles.flagBar, { opacity: barOpacity }]}>
        <View style={[styles.flagStripe, { backgroundColor: RED   }]} />
        <View style={[styles.flagStripe, { backgroundColor: GOLD  }]} />
        <View style={[styles.flagStripe, { backgroundColor: GREEN }]} />
        <View style={[styles.flagStripe, { backgroundColor: GOLD  }]} />
        <View style={[styles.flagStripe, { backgroundColor: RED   }]} />
      </Animated.View>

      {/* Center content */}
      <Animated.View
        style={[
          styles.center,
          {
            opacity: logoOpacity,
            transform: [{ translateY: logoY }],
          },
        ]}
      >
        {/* Logo container */}
        <View style={styles.logoRing}>
          <View style={styles.logoInner}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Name */}
        <Text style={styles.appName}>GHAFRA</Text>

        {/* Gold divider */}
        <View style={styles.nameDivider} />

        {/* Subtitle */}
        <Animated.Text style={[styles.appSub, { opacity: subOpacity }]}>
          Ghana · France Association
        </Animated.Text>
      </Animated.View>

      {/* Bottom: loading indicator */}
      <Animated.View
        style={[
          styles.loadingWrap,
          {
            opacity: dotScale,
            transform: [{ scale: dotScale }],
            paddingBottom: insets.bottom + 32,
          },
        ]}
      >
        <LoadingDots />
      </Animated.View>
    </View>
  );
}

function LoadingDots() {
  const dots = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1,   duration: 350, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 350, useNativeDriver: true }),
          Animated.delay(700),
        ])
      ).start();

    dots.forEach((d, i) => animate(d, i * 180));
  }, []);

  return (
    <View style={styles.dotsRow}>
      {dots.map((d, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            i === 1 && styles.dotMid,
            { opacity: d },
          ]}
        />
      ))}
    </View>
  );
}

const BURST_SIZE = width * 2.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Radial burst
  burst: {
    position: 'absolute',
    width: BURST_SIZE,
    height: BURST_SIZE,
    borderRadius: BURST_SIZE / 2,
    backgroundColor: '#005432',
    opacity: 0.45,
  },

  // Decorative arcs
  arc: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  arcTopRight: {
    top: -80,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  arcBottomLeft: {
    bottom: -60,
    left: -120,
  },

  // Ghana flag stripe bar
  flagBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 5,
  },
  flagStripe: {
    flex: 1,
  },

  // Center
  center: {
    alignItems: 'center',
    gap: 10,
  },

  // Logo
  logoRing: {
    width: 270,
    height: 270,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  logoInner: {
    width: 220,
    height: 220,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },

  // Text
  appName: {
    fontSize: 38,
    fontWeight: '900',
    color: WHITE,
    letterSpacing: 6,
  },
  nameDivider: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: GOLD,
  },
  appSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Loading
  loadingWrap: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotMid: {
    backgroundColor: GOLD,
    width: 18,
    borderRadius: 3,
  },
});