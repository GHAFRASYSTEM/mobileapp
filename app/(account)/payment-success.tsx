import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ScreenHeader from '@/components/Headers/ScreenHeader';

export default function PaymentSuccessScreen() {
  const C = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams();

  const amount = params.amount as string;
  const currency = params.currency as string;
  const period = params.period as string;
  const method = params.method as string;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: C.background,
          paddingTop: 0,
          paddingBottom: insets.bottom + 20,
        },
      ]}
    >
      <ScreenHeader title="Payment Successful" backRoute="/(tabs)/(card)"/>

      <View style={styles.content}>
        <View style={[styles.icon, { backgroundColor: C.primarySubtle }]}>
          <IconSymbol name="checkmark.circle.fill" size={56} color={C.primary} />
        </View>

        <Text style={[styles.title, { color: C.textPrimary }]}>
          Payment Successful
        </Text>

        <Text style={[styles.subtitle, { color: C.textSecondary }]}>
          Your {currency} {amount} dues for {period} have been received.
        </Text>

        {/* Receipt */}
        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          {[
            ['Reference', 'GHF-' + Math.random().toString(36).slice(2, 8).toUpperCase()],
            ['Method', method === 'card' ? 'Card (Stripe)' : 'MoMo (Paystack)'],
            ['Amount', `${currency} ${amount}`],
            ['Status', 'Paid ✓'],
          ].map(([k, v]) => (
            <View key={k} style={[styles.row, { borderBottomColor: C.border }]}>
              <Text style={{ color: C.textMuted }}>{k}</Text>
              <Text style={{ color: C.textPrimary, fontWeight: '600' }}>{v}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: C.primary }]}
          onPress={() => router.replace('/(tabs)/(home)')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  icon: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20 },

  card: { width: '100%', borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginTop: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1 },

  button: { width: '100%', height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});