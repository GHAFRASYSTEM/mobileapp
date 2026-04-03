import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';
import type { SFSymbol } from 'expo-symbols';

const SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person.circle',       label: 'Profile',            sub: 'Edit personal details'    },
      { icon: 'lock.circle',         label: 'Security',           sub: 'Password & 2FA'           },
      { icon: 'bell.circle',         label: 'Notifications',      sub: 'Manage alerts'            },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'questionmark.circle', label: 'Help Centre',        sub: 'FAQs and guides'          },
      { icon: 'envelope.circle',     label: 'Contact Us',         sub: 'Reach the GHAFRA team'   },
      { icon: 'doc.text',            label: 'Terms & Privacy',    sub: 'Legal information'        },
    ],
  },
];

export default function MoreScreen() {
  const C = useColors();

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
        <AppHeader title="More" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: C.surface, borderColor: C.border }]}>
          <View style={[styles.profileAvatar, { backgroundColor: C.gold }]}>
            <Text style={[styles.profileInitials, { color: C.cardBg }]}>KA</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.profileName, { color: C.textPrimary }]}>Kwame Asante</Text>
            <Text style={[styles.profileEmail, { color: C.textMuted }]}>kwame.asante@email.com</Text>
            <View style={[styles.memberBadge, { backgroundColor: C.primarySubtle }]}>
              <Text style={[styles.memberBadgeText, { color: C.primary }]}>Full Member · Valid</Text>
            </View>
          </View>
          <TouchableOpacity>
            <IconSymbol size={18} name="chevron.right" color={C.textMuted} />
          </TouchableOpacity>
        </View>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: C.textMuted }]}>{section.title.toUpperCase()}</Text>
            <View style={[styles.sectionCard, { backgroundColor: C.surface, borderColor: C.border }]}>
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity style={styles.menuRow}>
                    <View style={[styles.menuIcon, { backgroundColor: C.primarySubtle }]}>
                      <IconSymbol size={18} name={item.icon} color={C.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.menuLabel, { color: C.textPrimary }]}>{item.label}</Text>
                      <Text style={[styles.menuSub, { color: C.textMuted }]}>{item.sub}</Text>
                    </View>
                    <IconSymbol size={15} name="chevron.right" color={C.textMuted} />
                  </TouchableOpacity>
                  {i < section.items.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: C.border }]} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <TouchableOpacity style={[styles.signOutBtn, { backgroundColor: C.dangerSubtle, borderColor: C.borderDanger }]}>
          <IconSymbol size={18} name="rectangle.portrait.and.arrow.right" color={C.danger} />
          <Text style={[styles.signOutText, { color: C.danger }]}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: C.textMuted }]}>GHAFRA v1.0.0</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:              { flex: 1 },
  header:            { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  pageTitle:         { fontSize: 20, fontWeight: '700' },
  scroll:            { padding: 16 },
  profileCard:       { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 24 },
  profileAvatar:     { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  profileInitials:   { fontSize: 18, fontWeight: '700' },
  profileName:       { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  profileEmail:      { fontSize: 12, marginBottom: 6 },
  memberBadge:       { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  memberBadgeText:   { fontSize: 11, fontWeight: '600' },
  section:           { marginBottom: 20 },
  sectionTitle:      { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8, marginLeft: 4 },
  sectionCard:       { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  menuRow:           { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuIcon:          { width: 36, height: 36, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  menuLabel:         { fontSize: 14, fontWeight: '600', marginBottom: 1 },
  menuSub:           { fontSize: 12 },
  divider:           { height: 1, marginLeft: 62 },
  signOutBtn:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  signOutText:       { fontSize: 15, fontWeight: '700' },
  version:           { textAlign: 'center', fontSize: 12 },
});