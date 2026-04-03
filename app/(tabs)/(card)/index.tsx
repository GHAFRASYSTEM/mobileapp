import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';
import MembershipCard from '@/components/Cards/MembershipCard';
import { useRouter } from 'expo-router';

export default function MyCardScreen() {
  const C = useColors();
  const router = useRouter();

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
  {
    icon: 'creditcard.fill',
    label: 'Pay Dues / Donations',
    sub: 'Make a payment quickly to support GHAFRA',
    route: '/(account)/paydues',
  },
  {
    icon: 'list.bullet.rectangle.fill',
    label: 'View Transactions',
    sub: 'See your dues payment history',
    route: '/(account)/transactions',
  },
];

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
      <AppHeader
        title="My Card"
        subtitle="Present this to verify your membership"
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Membership Card */}
        <MembershipCard
          name="Kwame Asante"
          id="GH-2024-00412"
          validUntil="Dec 2025"
          region="Greater Accra"
          memberSince="January 2022"
          picture="https://media.istockphoto.com/id/1377248437/photo/shot-of-a-mature-man-spending-time-by-himself-in-his-yard.jpg?s=612x612&w=0&k=20&c=7RQdVcef45S4-K6HJeh1RMHFSxiRBxCBnjADCO1PnHQ="
          qrCode="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=GH-2024-00412"
        />
        <View style={{ height: 20 }} />
        {/* Actions */}
{actions.map((item) => (
  <TouchableOpacity
    key={item.label}
    style={[styles.actionRow, { backgroundColor: C.surface, borderColor: C.border }]}
    onPress={() => router.push(item.route)}
    activeOpacity={0.7}
  >
    <View style={[styles.actionIcon, { backgroundColor: C.primarySubtle }]}>
      <IconSymbol size={20} name={item.icon as any} color={C.primary} />
    </View>

    <View style={styles.actionText}>
      <Text style={[styles.actionLabel, { color: C.textPrimary }]}>
        {item.label}
      </Text>
      <Text style={[styles.actionSub, { color: C.textMuted }]}>
        {item.sub}
      </Text>
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
  safe: { flex: 1 },
  scroll: { padding: 16 },
  actionRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10, gap: 12 },
  actionIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionText: { flex: 1 },
  actionLabel: { fontSize: 14, fontWeight: '600' },
  actionSub: { fontSize: 12, marginTop: 1 },
});