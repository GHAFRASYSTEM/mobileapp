import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useProfile } from '@/context/AuthContext';
import type { SFSymbol } from 'expo-symbols';

type Props = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightIcon?: SFSymbol;
  onRightPress?: () => void;
  hasNotification?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  variant?: 'default' | 'home';
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning 👋';
  if (hour < 18) return 'Good afternoon 👋';
  return 'Good evening 👋';
}

export default function AppHeader({
  title,
  subtitle,
  showBack = false,
  rightIcon,
  onRightPress,
  hasNotification = false,
  onNotificationPress,
  onProfilePress,
  variant = 'default',
}: Props) {
  const C       = useColors();
  const insets  = useSafeAreaInsets();
  const router  = useRouter();
  const profile = useProfile();
  console.log('Profile in header:', profile);

  const firstName    = profile?.name?.split(' ')[1] ?? 'Member';
  const initials     = profile?.name
    ?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) ?? 'M';
  const photoUrl     = profile?.photo_url ?? null;
  const headerBg     = C.header;


  // ── Avatar — photo if available, initials fallback ───────────────────────
  const Avatar = () => (
    <TouchableOpacity
      style={[styles.avatarBtn, { backgroundColor: C.gold }]}
      onPress={onProfilePress}
    >
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={styles.avatarImage}
        />
      ) : (
        <Text style={[styles.avatarText, { color: C.cardBg }]}>{initials}</Text>
      )}
    </TouchableOpacity>
  );

  // ── Back-navigation variant ──────────────────────────────────────────────
  if (showBack) {
    return (
      <View style={{ backgroundColor: headerBg }}>
        <StatusBar barStyle="light-content" backgroundColor={headerBg} translucent />
        <View style={{ height: insets.top, backgroundColor: headerBg }} />
        <View style={styles.backRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.backTitle} numberOfLines={1}>{title}</Text>
          {rightIcon ? (
            <TouchableOpacity style={styles.iconBtn} onPress={onRightPress}>
              <IconSymbol name={rightIcon} size={18} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>
        <View style={styles.goldAccent} />
      </View>
    );
  }

  // ── Home variant — brand + greeting + avatar ─────────────────────────────
  if (variant === 'home') {
    return (
      <View style={{ backgroundColor: headerBg }}>
        <StatusBar barStyle="light-content" backgroundColor={headerBg} translucent />
        <View style={{ height: insets.top, backgroundColor: headerBg }} />

        {/* Brand row */}
        <View style={styles.brandRow}>
          <View style={styles.brandLeft}>
            <View style={styles.flag}>
              <View style={[styles.flagStripe, { backgroundColor: '#CE1126' }]} />
              <View style={[styles.flagStripe, { backgroundColor: '#FCD116', alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={styles.flagStar}>★</Text>
              </View>
              <View style={[styles.flagStripe, { backgroundColor: '#006B3F' }]} />
            </View>
            <View>
              <Text style={styles.brandName}>GHAFRA</Text>
              <Text style={styles.brandSub}>Ghana·France</Text>
            </View>
          </View>
          <View style={styles.homeActions}>
            <Avatar />
          </View>
        </View>

        {/* Greeting row — time-aware, first name only from context */}
        <View style={styles.greetingBlock}>
          <Text style={styles.homeGreeting}>{getGreeting()} {firstName}</Text>

        </View>

        <View style={styles.goldAccent} />
      </View>
    );
  }

  // ── Default variant ──────────────────────────────────────────────────────
  return (
    <View style={{ backgroundColor: headerBg }}>
      <StatusBar barStyle="light-content" backgroundColor={headerBg} translucent />
      <View style={{ height: insets.top, backgroundColor: headerBg }} />

      <View style={styles.defaultRow}>
        <View style={styles.defaultTitleBlock}>
          <Text style={styles.pageTitle} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={styles.pageSub}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.goldAccent} />
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Back
  backRow:           { height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, gap: 4 },
  backBtn:           { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  backTitle:         { flex: 1, fontSize: 17, fontWeight: '600', color: '#FFFFFF', letterSpacing: -0.2 },

  // ── Home brand row
  brandRow:          { height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  brandLeft:         { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flag:              { width: 26, height: 17, borderRadius: 3, overflow: 'hidden', flexDirection: 'column' },
  flagStripe:        { flex: 1 },
  flagStar:          { fontSize: 7, color: '#000', lineHeight: 9 },
  brandName:         { fontSize: 15, fontWeight: '600', color: '#FFFFFF', letterSpacing: 0.1 },
  brandSub:          { fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 1 },
  homeActions:       { flexDirection: 'row', alignItems: 'center', gap: 8 },

  // ── Avatar
  avatarBtn:         { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarImage:       { width: 36, height: 36, borderRadius: 18 },
  avatarText:        { fontSize: 13, fontWeight: '700' },

  // ── Home greeting
  greetingBlock:     { paddingHorizontal: 16, paddingBottom: 14, marginTop: 2 },
  homeGreeting:      { fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: '400' },
  homeName:          { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3, marginTop: 2 },

  // ── Default
  defaultRow:        { height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  defaultTitleBlock: { flex: 1, paddingRight: 12 },
  pageTitle:         { fontSize: 21, fontWeight: '600', color: '#FFFFFF', letterSpacing: -0.3 },
  pageSub:           { fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 1 },

  // ── Shared
  iconBtn:           { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  notifDot:          { position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: 4, backgroundColor: '#FCD116', borderWidth: 1.5 },
  goldAccent:        { height: 2.5, backgroundColor: '#FCD116', width: '100%' },
});