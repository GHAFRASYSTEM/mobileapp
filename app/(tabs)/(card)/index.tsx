import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import AppHeader from '@/components/Headers/AppHeader';
import MembershipCard from '@/components/Cards/MembershipCard';
import { useRouter } from 'expo-router';
import { useProfile } from '@/context/AuthContext';
import { api } from '@/services/api';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Route =
  | '/(account)/profile'
  | '/(account)/paydues'
  | '/(account)/transactions';

type Action = {
  icon:  IconName;
  label: string;
  sub:   string;
  route: Route;
};

const actions: Action[] = [
  {
    icon:  'manage-accounts',
    label: 'Profile & Personal Data',
    sub:   'Update your information',
    route: '/(account)/profile',
  },

  {
    icon:  'credit-card',
    label: 'Pay Membership Dues',
    sub:   'Make a payment quickly to support GHAFRA',
    route: '/(account)/paydues',
  },
  {
    icon:  'receipt-long',
    label: 'View Transactions',
    sub:   'See your dues payment history',
    route: '/(account)/transactions',
  },
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

  const name       = profile?.name      ?? 'Member';
  const memberId   = profile?.id        ? `GH-${profile.id.slice(0, 8).toUpperCase()}` : '—';
  const city       = profile?.city      ?? '—';
  const region     = profile?.region    ?? '—';
  const photoUrl   = profile?.photo_url ?? undefined;

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
            <MaterialIcons name="pending" size={32} color={C.primary} />
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
              <MaterialIcons name={item.icon} size={20} color={C.primary} />
            </View>
            <View style={styles.actionText}>
              <Text style={[styles.actionLabel, { color: C.textPrimary }]}>{item.label}</Text>
              <Text style={[styles.actionSub,   { color: C.textMuted   }]}>{item.sub}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={16} color={C.textMuted} />
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
    borderWidth:  1,
    padding:      28,
    alignItems:   'center',
    gap:          12,
    marginBottom: 4,
  },
  verifyTitle: {
    fontSize:   17,
    fontWeight: '700',
    textAlign:  'center',
  },
  verifySub: {
    fontSize:   13,
    textAlign:  'center',
    lineHeight: 20,
  },
});

// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useColors } from '@/constants/Colors';
// import AppHeader from '@/components/Headers/AppHeader';
// import { useRouter } from 'expo-router';
// import { useProfile } from '@/context/AuthContext';

// // ─────────────────────────────────────────────────────────────────
// // SWAP FLAG
// // false → shows PendingIdentityCard (current)
// // true  → restores MembershipCard + verification banner (original)
// // ─────────────────────────────────────────────────────────────────
// const SHOW_MEMBERSHIP_CARD = true;

// // ── Uncomment block below (and set SHOW_MEMBERSHIP_CARD = true)
// //    to restore the original card flow
// // ─────────────────────────────────────────────────────────────────
// import MembershipCard from '@/components/Cards/MembershipCard';
// import { api } from '@/services/api';
// // ─────────────────────────────────────────────────────────────────

// import PendingIdentityCard from '@/components/Cards/PendingIdentityCard';

// type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

// type Route =
//   | '/(account)/profile'
//   | '/(account)/paydues'
//   | '/(account)/transactions';

// type Action = {
//   icon:  IconName;
//   label: string;
//   sub:   string;
//   route: Route;
// };

// const actions: Action[] = [
  
// ];

// export default function MyCardScreen() {
//   const C       = useColors();
//   const router  = useRouter();
//   const profile = useProfile();


//   return (
//     <View style={[styles.safe, { backgroundColor: C.background }]}>
//       <AppHeader
//         title="My Card"
//         subtitle="Your GhaFra Identity Card"
//       />

//       <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

//         {/* ── CARD AREA ───────────────────────────────────────────
//             To restore original flow:
//               1. Set SHOW_MEMBERSHIP_CARD = true
//               2. Uncomment the imports + useEffect block above
//         ──────────────────────────────────────────────────────── */}
//         {SHOW_MEMBERSHIP_CARD ? (
//           // ── ORIGINAL FLOW ─────────────────────────────────────
//           // profile?.is_verified === false ? (
//           //   <View style={[styles.verificationBanner, { backgroundColor: C.primarySubtle, borderColor: C.primary }]}>
//           //     <MaterialIcons name="pending" size={32} color={C.primary} />
//           //     <Text style={[styles.verifyTitle, { color: C.textPrimary }]}>
//           //       Your card is under verification
//           //     </Text>
//           //     <Text style={[styles.verifySub, { color: C.textMuted }]}>
//           //       Our team is reviewing your membership. You'll receive access to your card once verified.
//           //     </Text>
//           //   </View>
//           // ) : (
//           //   <MembershipCard
//           //     name={name}
//           //     id={memberId}
//           //     validUntil={validUntil}
//           //     city={city}
//           //     region={region}
//           //     memberSince={memberSince}
//           //     picture={photoUrl}
//           //     verifyCode={verifyCode ?? undefined}
//           //   />
//           // )
//           null
//         ) : (
//           // ── CURRENT: pending issuance placeholder ─────────────
//           <PendingIdentityCard />
//         )}

//         <View style={{ height: 20 }} />

//         {actions.map((item) => (
//           <TouchableOpacity
//             key={item.label}
//             style={[styles.actionRow, { backgroundColor: C.surface, borderColor: C.border }]}
//             onPress={() => router.push(item.route)}
//             activeOpacity={0.7}
//           >
//             <View style={[styles.actionIcon, { backgroundColor: C.primarySubtle }]}>
//               <MaterialIcons name={item.icon} size={20} color={C.primary} />
//             </View>
//             <View style={styles.actionText}>
//               <Text style={[styles.actionLabel, { color: C.textPrimary }]}>{item.label}</Text>
//               <Text style={[styles.actionSub,   { color: C.textMuted   }]}>{item.sub}</Text>
//             </View>
//             <MaterialIcons name="chevron-right" size={16} color={C.textMuted} />
//           </TouchableOpacity>
//         ))}

//         <View style={{ height: 100 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   safe:        { flex: 1 },
//   scroll:      { padding: 16 },
//   actionRow:   { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10, gap: 12 },
//   actionIcon:  { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
//   actionText:  { flex: 1 },
//   actionLabel: { fontSize: 14, fontWeight: '600' },
//   actionSub:   { fontSize: 12, marginTop: 1 },

//   // ── Uncomment when SHOW_MEMBERSHIP_CARD = true ───────────────
//   // verificationBanner: {
//   //   borderRadius: 16, borderWidth: 1, padding: 28,
//   //   alignItems: 'center', gap: 12, marginBottom: 4,
//   // },
//   // verifyTitle: { fontSize: 17, fontWeight: '700', textAlign: 'center' },
//   // verifySub:   { fontSize: 13, textAlign: 'center', lineHeight: 20 },
//   // ─────────────────────────────────────────────────────────────
// });