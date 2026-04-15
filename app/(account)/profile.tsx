import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image,
  TouchableOpacity, Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors }  from '@/constants/Colors';
import { useProfile } from '@/context/AuthContext';
import AppHeader      from '@/components/Headers/AppHeader';
import { IconSymbol } from '@/components/ui/icon-symbol';

const EXEC_EMAIL = 'contact@ghafranord.fr';

type Field = { label: string; value: string | null | undefined };

export default function ProfileScreen() {
  const C       = useColors();
  const insets  = useSafeAreaInsets();
  const profile = useProfile();

  if (!profile) return null;

  const firstName = profile.name?.split(' ')[0] ?? '';
  const initials  = profile.name
    ?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) ?? 'M';

  const memberSince = profile.member_since
    ? new Date(profile.member_since).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  const personalFields: Field[] = [
    { label: 'Full name',   value: profile.name         },
    // { label: 'Email',       value: profile.email        },
    { label: 'Gender',      value: profile.gender       },
    { label: 'Occupation',  value: profile.occupation   },
    { label: 'City',        value: profile.city         },
  ];

  const contactFields: Field[] = [
    { label: 'Ghana phone',  value: profile.ghana_phone  },
    { label: 'French phone', value: profile.french_phone },
  ];

  const membershipFields: Field[] = [
    { label: 'Member ID',    value: `GH-${profile.id.slice(0, 8).toUpperCase()}` },
    { label: 'Region',       value: profile.region       },
    { label: 'Role',         value: profile.role         },
    { label: 'Member type',  value: profile.member_type  },
    { label: 'Member since', value: memberSince          },
  ];

  const formatValue = (label: string, value: string | null | undefined) => {
  if (!value) return '—';

  // Gender condition
  if (label === 'Gender' && value === 'prefer_not_to_say') {
    return 'N/A';
  }

  // Phone conditions
  if (
    (label === 'Ghana phone' || label === 'French phone') &&
    value === '0000000000'
  ) {
    return 'N/A';
  }

  return value;
};

  const renderField = (f: Field, i: number, arr: Field[]) => (
    <View key={f.label}>
      <View style={styles.fieldRow}>
        <Text style={[styles.fieldLabel, { color: C.textMuted }]}>{f.label}</Text>
        <Text style={[styles.fieldValue, { color: f.value ? C.textPrimary : C.textMuted }]}>
         {formatValue(f.label, f.value)}
        </Text>
      </View>
      {i < arr.length - 1 && <View style={[styles.divider, { backgroundColor: C.border }]} />}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <AppHeader title="My Profile" showBack />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + name */}
        <View style={[styles.card, styles.hero, { backgroundColor: C.surface, borderColor: C.border }]}>
          {profile.photo_url ? (
            <Image source={{ uri: profile.photo_url }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: C.gold }]}>
              <Text style={[styles.avatarInitials, { color: C.cardBg }]}>{initials}</Text>
            </View>
          )}
          <Text style={[styles.heroName, { color: C.textPrimary }]}>{profile.name}</Text>

          <View style={[styles.memberBadge, { backgroundColor: C.primarySubtle }]}>
            <View style={[styles.dot, { backgroundColor: C.primary }]} />
            <Text style={[styles.memberBadgeText, { color: C.primary }]}>
              {profile.member_type ?? 'Member'} · {profile.region ?? 'GHAFRA'}
            </Text>
          </View>
        </View>

        {/* Read-only notice */}
        <View style={[styles.notice, { backgroundColor: C.border ?? C.primarySubtle, borderColor: C.background ?? C.border }]}>
          <IconSymbol name="lock.fill" size={14} color={C.primary} />
          <Text style={[styles.noticeText, { color: C.textPrimary }]}>
            For equity reasons, profile details can only be updated by GHAFRA executives.
            To request a change, contact us below.
          </Text>
        </View>

        {/* Personal */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.sectionLabel, { color: C.textMuted }]}>PERSONAL INFORMATION</Text>
          {personalFields.map(renderField)}
        </View>

        {/* Contact */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.sectionLabel, { color: C.textMuted }]}>CONTACT NUMBERS</Text>
          {contactFields.map(renderField)}
        </View>

        {/* Membership */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.sectionLabel, { color: C.textMuted }]}>MEMBERSHIP</Text>
          {membershipFields.map(renderField)}
        </View>

        {/* Contact executives CTA */}
        <TouchableOpacity
          style={[styles.cta, { backgroundColor: C.primary }]}
          onPress={() => Linking.openURL(
            `mailto:${EXEC_EMAIL}?subject=Profile Update Request — ${profile.name}&body=Hi GHAFRA team,%0A%0AI would like to request an update to my profile details.%0A%0AMember ID: GH-${profile.id.slice(0, 8).toUpperCase()}%0AName: ${profile.name}%0A%0AChanges requested:%0A`
          )}
          activeOpacity={0.85}
        >
          <IconSymbol name="envelope.fill" size={16} color="#fff" />
          <Text style={styles.ctaText}>Contact executives to update</Text>
        </TouchableOpacity>

        <Text style={[styles.ctaHint, { color: C.textMuted }]}>
          {EXEC_EMAIL}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:              { flex: 1 },
  scroll:            { padding: 16, gap: 12 },

  card:              { borderRadius: 14, borderWidth: 1, padding: 18, marginBottom: 4 },
  hero:              { alignItems: 'center', paddingVertical: 28 },

  avatar:            { width: 80, height: 80, borderRadius: 40, marginBottom: 14 },
  avatarFallback:    { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarInitials:    { fontSize: 28, fontWeight: '700' },
  heroName:          { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  heroSub:           { fontSize: 13, marginBottom: 14 },

  memberBadge:       { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  dot:               { width: 6, height: 6, borderRadius: 3 },
  memberBadgeText:   { fontSize: 12, fontWeight: '600' },

  notice:            { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 4 },
  noticeText:        { flex: 1, fontSize: 13, lineHeight: 19 },

  sectionLabel:      { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },

  fieldRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 9 },
  fieldLabel:        { fontSize: 13 },
  fieldValue:        { fontSize: 13, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 16 },

  divider:           { height: 0.5 },

  cta:               { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, borderRadius: 14, marginTop: 8 },
  ctaText:           { fontSize: 15, fontWeight: '700', color: '#fff' },
  ctaHint:           { fontSize: 12, textAlign: 'center', marginTop: 6 },
});