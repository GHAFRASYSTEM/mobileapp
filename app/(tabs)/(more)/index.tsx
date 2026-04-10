import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';
import { useAuth } from '@/context/AuthContext';
import SignOutDeleteButtons from '@/components/Buttons/SignOutDeleteButtons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof IconSymbol>['name'];

type MenuItem = {
  icon:    IconName;
  label:   string;
  sub:     string;
  route?:  string;
  url?:    string;
};

const SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Membership',
    items: [
      { icon: 'info.circle',         label: 'About GHAFRA',  sub: 'Learn about the association', route: '/(more)/aboutus'    },
      { icon: 'person.2.circle',     label: 'Executives',    sub: 'GHAFRA leadership team',      route: '/(more)/executives' },
      { icon: 'envelope.circle',     label: 'Contact Us',    sub: 'Reach the GHAFRA team',       route: '/(more)/contact'    },
      { icon: 'questionmark.circle', label: 'Help Centre',   sub: 'FAQs and support',            url:   'https://ghafra.org/help'  },
      { icon: 'doc.text',            label: 'Terms & Privacy', sub: 'Legal information',         url:   'https://ghafra.org/terms' },
      { icon: 'bell',                label: 'Preferences',   sub: 'Manage alerts & language',    route: '/(more)/preference' },
    ],
  },
];

export default function MoreScreen() {
  const C      = useColors();
  const router = useRouter();
  const { signOut, profile } = useAuth();

  const initials = profile?.name
    ? profile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const handlePress = async (item: MenuItem) => {
    if (item.url) {
      await WebBrowser.openBrowserAsync(item.url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
        toolbarColor:      '#006B3F',
      });
    } else if (item.route) {
      router.push(item.route as any);
    }
  };

  const handleDeleteAccount = async () => {
    
  };

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
      <AppHeader title="More" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <TouchableOpacity
          style={[styles.profileCard, { backgroundColor: C.surface, borderColor: C.border }]}
          onPress={() => router.push('/(account)/profile')}
          activeOpacity={0.8}
        >
          <View style={[styles.avatar, { backgroundColor: C.gold }]}>
            <Text style={[styles.avatarText, { color: C.cardBg }]}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.profileName,  { color: C.textPrimary }]}>
              {profile?.name ?? 'Member'}
            </Text>
            <Text style={[styles.profileEmail, { color: C.textMuted }]}>
              {profile?.email ?? ''}
            </Text>
          </View>
          <IconSymbol size={16} name={'chevron.right' as IconName} color={C.textMuted} />
        </TouchableOpacity>

        {/* Menu sections */}
        {SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: C.textMuted }]}>
              {section.title.toUpperCase()}
            </Text>
            <View style={[styles.sectionCard, { backgroundColor: C.surface, borderColor: C.border }]}>
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity
                    style={styles.menuRow}
                    onPress={() => handlePress(item)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.menuIcon, { backgroundColor: C.primarySubtle }]}>
                      <IconSymbol size={18} name={item.icon} color={C.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.menuLabel, { color: C.textPrimary }]}>{item.label}</Text>
                      <Text style={[styles.menuSub,   { color: C.textMuted   }]}>{item.sub}</Text>
                    </View>
                    <IconSymbol
                      size={15}
                      name={(item.url ? 'globe' : 'chevron.right') as IconName}
                      color={C.textMuted}
                    />
                  </TouchableOpacity>
                  {i < section.items.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: C.border }]} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out + Delete — with confirm prompts */}
        <SignOutDeleteButtons
          onSignOut={signOut}
          onDeleteAccount={handleDeleteAccount}
        />

        <Text style={[styles.version, { color: C.textMuted }]}>GHAFRA v1.0.0</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1 },
  scroll:       { padding: 16 },
  profileCard:  { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 20 },
  avatar:       { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  avatarText:   { fontSize: 18, fontWeight: '700' },
  profileName:  { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  profileEmail: { fontSize: 12 },
  section:      { marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8, marginLeft: 4 },
  sectionCard:  { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  menuRow:      { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuIcon:     { width: 36, height: 36, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  menuLabel:    { fontSize: 14, fontWeight: '600', marginBottom: 1 },
  menuSub:      { fontSize: 12 },
  divider:      { height: 1, marginLeft: 62 },
  version:      { textAlign: 'center', fontSize: 12, marginBottom: 8 },
});