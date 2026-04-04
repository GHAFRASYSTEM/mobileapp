import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Href } from 'expo-router';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof IconSymbol>['name'];

// ─── Nav variant props (your existing API — unchanged) ────────────────────────
type NavProps = {
  variant?:   'nav';
  title:      string;
  showBack?:  boolean;
  right?:     React.ReactNode;
  backRoute?: Href;
  // page-only props not accepted here
  subtitle?:  never;
  icon?:      never;
  onIconPress?: never;
};

// ─── Page variant props (new, used by tab screens) ────────────────────────────
type PageProps = {
  variant:    'page';
  title:      string;
  subtitle:   string;
  icon:       IconName;
  onIconPress?: () => void;
  // nav-only props not accepted here
  showBack?: boolean;
backRoute?: Href;

};

type Props = NavProps | PageProps;

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

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      {props.variant === 'page' ? (
        // ── Page header: large title + subtitle + icon badge ──────────────
<View style={[styles.pageHeader, { backgroundColor: C.header, paddingTop: insets.top + 10 }]}>
  
  {(props.showBack ?? true) && (
    <TouchableOpacity onPress={handleBack} style={{ marginRight: 12 }}>
      <IconSymbol name="chevron.left" size={20} color="#fff" />
    </TouchableOpacity>
  )}

  <View style={styles.pageText}>
    <Text style={styles.pageTitle}>{props.title}</Text>
    <Text style={styles.pageSubtitle}>{props.subtitle}</Text>
  </View>

  <TouchableOpacity
    style={[styles.iconBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
    onPress={props.onIconPress}
    disabled={!props.onIconPress}
    activeOpacity={props.onIconPress ? 0.7 : 1}
  >
    <IconSymbol name={props.icon} size={20} color="#fff" />
  </TouchableOpacity>
</View>
      ) : (
        // ── Nav header: back button + centered title + right slot ─────────
        <View style={[styles.navHeader, { backgroundColor: C.header, paddingTop: insets.top + 8 }]}>
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
      )}

      <View style={[styles.goldBar, { backgroundColor: C.gold }]} />
    </>
  );
}

const styles = StyleSheet.create({
  // ── Shared ──────────────────────────────────────────────────────────────
  goldBar: { height: 3 },

  // ── Nav variant ─────────────────────────────────────────────────────────
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

  // ── Page variant ─────────────────────────────────────────────────────────
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