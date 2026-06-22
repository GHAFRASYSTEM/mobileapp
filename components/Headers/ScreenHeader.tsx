import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Href } from 'expo-router';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof IconSymbol>['name'];

type NavProps = {
  variant?:     'nav';
  title:        string;
  showBack?:    boolean;
  right?:       React.ReactNode;
  backRoute?:   Href;
  subtitle?:    never;
  icon?:        never;
  onIconPress?: never;
};

type PageProps = {
  variant:      'page';
  title:        string;
  subtitle:     string;
  icon:         IconName;
  onIconPress?: () => void;
  showBack?:    boolean;
  backRoute?:   Href;
};

type PageButtonProps = {
  variant:      'pageButton';
  title:        string;
  subtitle:     string;
  icon:         IconName;
  buttonRoute:  Href;
  showBack?:    boolean;
  backRoute?:   Href;
  onIconPress?: never;
};

type Props = NavProps | PageProps | PageButtonProps;

export default function ScreenHeader(props: Props) {
  const C      = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if ('backRoute' in props && props.backRoute) {
      router.replace(props.backRoute);
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/(home)');
    }
  };

  const handleButtonRoute = () => {
    if (props.variant === 'pageButton') {
      router.push(props.buttonRoute);
    }
  };

  const content = props.variant === 'page' ? (
    <View style={[styles.pageHeader, { paddingTop: insets.top + 10 }]}>
      {(props.showBack ?? false) && (
        <TouchableOpacity onPress={handleBack} style={{ marginRight: 12 }}>
          <IconSymbol name="chevron.left" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.pageText}>
        <Text style={styles.pageTitle}>{props.title}</Text>
        <Text style={styles.pageSubtitle}>{props.subtitle}</Text>
      </View>
      <TouchableOpacity
        style={[styles.iconBtn, { backgroundColor: 'rgba(255,255,255,0.18)' }]}
        onPress={props.onIconPress}
        disabled={!props.onIconPress}
        activeOpacity={props.onIconPress ? 0.7 : 1}
      >
        <IconSymbol name={props.icon} size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  ) : props.variant === 'pageButton' ? (
    <View style={[styles.pageHeader, { paddingTop: insets.top + 10 }]}>
      {(props.showBack ?? false) && (
        <TouchableOpacity onPress={handleBack} style={{ marginRight: 12 }}>
          <IconSymbol name="chevron.left" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.pageText}>
        <Text style={styles.pageTitle}>{props.title}</Text>
        <Text style={styles.pageSubtitle}>{props.subtitle}</Text>
      </View>
      <TouchableOpacity
        style={[styles.iconBtn, { backgroundColor: 'rgba(255,255,255,0.18)' }]}
        onPress={handleButtonRoute}
        activeOpacity={0.7}
      >
        <IconSymbol name={props.icon} size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={[styles.navHeader, { paddingTop: insets.top + 8 }]}>
      {(props.showBack ?? true) ? (
        <TouchableOpacity onPress={handleBack} style={styles.side}>
          <IconSymbol name="chevron.left" size={20} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}
      <Text style={styles.navTitle} numberOfLines={1}>{props.title}</Text>
      <View style={styles.side}>{props.right}</View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('@/assets/images/kente.png')}
        style={[styles.headerBg, { backgroundColor: C.header }]}
        resizeMode="cover"
        imageStyle={styles.kenteImage}
      >
        {/* Dark tint so text stays legible over the pattern */}
        <View style={[styles.overlay, { backgroundColor: C.header }]} />
        {content}
      </ImageBackground>

      <View style={[styles.goldBar, { backgroundColor: C.gold }]} />
    </>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    overflow: 'hidden',
  },

  // Tint overlay — rgba so the kente pattern bleeds through subtly
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.82,
  },

  kenteImage: {
    opacity: 0.35,   // how strongly the kente pattern shows — tune 0.2–0.5
  },

  goldBar: { height: 3 },

  // ── Nav variant ──────────────────────────────────────────────────────────
  navHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 16,
    paddingBottom:     16,
  },
  navTitle: {
    fontSize:   18,
    fontWeight: '700',
    color:      '#fff',
    flex:       1,
    textAlign:  'center',
  },
  side: {
    width:          36,
    alignItems:     'center',
    justifyContent: 'center',
  },

  // ── Page / PageButton variant ─────────────────────────────────────────────────────────
  pageHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 20,
    paddingBottom:     16,
  },
  pageText:     { flex: 1, gap: 2 },
  pageTitle:    { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  pageSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
  iconBtn: {
    width:          42,
    height:         42,
    borderRadius:   21,
    alignItems:     'center',
    justifyContent: 'center',
    marginLeft:     12,
  },
});