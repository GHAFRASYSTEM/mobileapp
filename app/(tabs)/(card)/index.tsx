import React,{useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';
import MembershipCard from '@/components/Cards/MembershipCard';
import { useRouter } from 'expo-router';
import { useProfile } from '@/context/AuthContext';
import { api } from '@/services/api';

type Route =
  | '/(account)/profile'
  | '/(account)/paydues'
  | '/(account)/transactions';

type Action = {
  icon: any;
  label: string;
  sub: string;
  route: Route;
};

const actions: Action[] = [
  {
    icon: 'person.crop.circle.fill',
    label: 'Profile & Personal Data',
    sub: 'Update your information',
    route: '/(account)/profile',
  },

  // Uncomment for OTA Update
  // {
  //   icon: 'creditcard.fill',
  //   label: 'Pay Membership Dues ',
  //   sub: 'Make a payment quickly to support GHAFRA',
  //   route: '/(account)/paydues',
  // },
  // {
  //   icon: 'list.bullet.rectangle.fill',
  //   label: 'View Transactions',
  //   sub: 'See your dues payment history',
  //   route: '/(account)/transactions',
  // },
];

export default function MyCardScreen() {
  const C       = useColors();
  const router  = useRouter();
  const profile = useProfile();
  const [verifyCode, setVerifyCode] = useState<string | null>(null);

  useEffect(() => {
  if (!profile?.is_verified) return;
  api.get<{ code: string | null }>('/dues/my-code')
    .then(res => setVerifyCode(res.code))
    .catch(() => {}); 
}, [profile?.is_verified]);

console.log(verifyCode)

  const name        = profile?.name     ?? 'Member';
  const memberId    = profile?.id       ? `GH-${profile.id.slice(0, 8).toUpperCase()}` : '—';
  const city        = profile?.city     ?? '—';
  const region      = profile?.region   ?? '—';
  const photoUrl    = profile?.photo_url ?? undefined;

  const memberSince = profile?.member_since
    ? new Date(profile.member_since).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : '—';

  const validUntil = profile?.member_since
    ? `Dec ${new Date(profile.member_since).getFullYear() + 1}`
    : '—';

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
      <AppHeader
        title="My Card"
        subtitle="Present this to verify your membership"
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
{profile?.is_verified === false ? (
  <View style={[styles.verificationBanner, { backgroundColor: C.primarySubtle, borderColor: C.primary }]}>
    <IconSymbol size={32} name="clock.badge.checkmark" color={C.primary} />
    <Text style={[styles.verifyTitle, { color: C.textPrimary }]}>
      Your card is under verification
    </Text>
    <Text style={[styles.verifySub, { color: C.textMuted }]}>
      Our team is reviewing your membership. You'll receive access to your card once verified.
    </Text>
  </View>
) : (
  <MembershipCard
    name={name}
    id={memberId}
    validUntil={validUntil}
    city={city}
    region={region}
    memberSince={memberSince}
    picture={photoUrl}
    verifyCode={verifyCode ?? undefined} 
  />
)}

        <View style={{ height: 20 }} />

        {actions.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.actionRow, { backgroundColor: C.surface, borderColor: C.border }]}
            onPress={() => router.push(item.route)}
            activeOpacity={0.7}
          >
            <View style={[styles.actionIcon, { backgroundColor: C.primarySubtle }]}>
              <IconSymbol size={20} name={item.icon} color={C.primary} />
            </View>
            <View style={styles.actionText}>
              <Text style={[styles.actionLabel, { color: C.textPrimary }]}>{item.label}</Text>
              <Text style={[styles.actionSub,   { color: C.textMuted   }]}>{item.sub}</Text>
            </View>
            <IconSymbol size={16} name="chevron.right" color={C.textMuted} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1 },
  scroll:      { padding: 16 },
  actionRow:   { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10, gap: 12 },
  actionIcon:  { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionText:  { flex: 1 },
  actionLabel: { fontSize: 14, fontWeight: '600' },
  actionSub:   { fontSize: 12, marginTop: 1 },
  verificationBanner: {
  borderRadius: 16,
  borderWidth: 1,
  padding: 28,
  alignItems: 'center',
  gap: 12,
  marginBottom: 4,
},
verifyTitle: {
  fontSize: 17,
  fontWeight: '700',
  textAlign: 'center',
},
verifySub: {
  fontSize: 13,
  textAlign: 'center',
  lineHeight: 20,
},
});