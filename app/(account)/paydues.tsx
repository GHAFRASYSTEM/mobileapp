import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
  KeyboardAvoidingView, Platform, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ScreenHeader from '@/components/Headers/ScreenHeader';
import DuesSummaryCard from '@/components/Cards/DuesSummaryCard';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import CardPaymentForm from '@/components/Payments/CardPaymentForm';
import MomoPayment from '@/components/Payments/MomoPayment';

type PayMethod = 'card' | 'momo';

// ─── Derive current dues from today's date ────────────────────────────────────
function getCurrentDues() {
  const now = new Date();
  const monthName = now.toLocaleString('en-GB', { month: 'long' });
  const year = now.getFullYear();
  return {
    label: `${monthName} Dues ${year}`,
    period: `${monthName} ${year}`,
    month: now.getMonth(),   // 0-indexed
    year,
    amount: 10.00,           // monthly dues amount
    currency: 'EUR',
  };
}

// ─── Replace with real API call ───────────────────────────────────────────────
async function fetchPaymentStatus(month: number, year: number): Promise<boolean> {
  // Return true if user has already paid for this month
  // e.g. await api.get(`/dues/status?month=${month}&year=${year}`)
  return true; // mock: not paid
}
// ─────────────────────────────────────────────────────────────────────────────

export default function PayDues() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const dues = getCurrentDues();

  const [method, setMethod]   = useState<PayMethod>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Replace this with a useEffect that calls fetchPaymentStatus
  const [hasPaid] = useState(false);

  const nextMonth = new Date(dues.year, dues.month + 1, 1)
    .toLocaleString('en-GB', { month: 'long', year: 'numeric' });

  const handlePay = async () => {
    setError(null);
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 2200));
      router.push({
        pathname: '/(account)/payment-success',
        params: {
          amount: dues.amount.toFixed(2),
          currency: dues.currency,
          period: dues.period,
          method,
        },
      });
    } catch {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <ScreenHeader title="Pay Dues" showBack />
      <View style={[styles.goldBar, { backgroundColor: C.gold }]} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <DuesSummaryCard
          amount={dues.amount}
          currency={dues.currency}
          label={dues.label}
          period={dues.period}
          paid={hasPaid}
        />

        {hasPaid ? (
          /* ── Already paid banner ─────────────────────────────────── */
          <View style={[styles.paidBanner, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
            <IconSymbol name="checkmark.seal.fill" size={22} color={C.primary} />
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={[styles.paidTitle, { color: C.textSuccess }]}>
                All caught up for {dues.period}!
              </Text>
              <Text style={[styles.paidSub, { color: C.textSecondary }]}>
                Your next dues will be due in {nextMonth}. Thank you for your continued support 🙏
              </Text>
            </View>
          </View>
        ) : (
          /* ── Payment form ────────────────────────────────────────── */
          <>
            {/* Compact segmented tabs */}
            <View style={[styles.tabs, { backgroundColor: C.surface, borderColor: C.border }]}>
              {(['card', 'momo'] as PayMethod[]).map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.tab, method === m && { backgroundColor: C.primary }]}
                  onPress={() => setMethod(m)}
                  activeOpacity={0.8}
                >
                  <IconSymbol
                    name={m === 'card' ? 'creditcard.fill' : 'iphone'}
                    size={13}
                    color={method === m ? '#fff' : C.textMuted}
                  />
                  <Text style={[styles.tabText, { color: method === m ? '#fff' : C.textMuted }]}>
                    {m === 'card' ? 'Card' : 'Mobile Money'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {method === 'card' ? (
              <>
                <CardPaymentForm />
                <PrimaryButton
                  text={`Pay ${dues.currency} ${dues.amount.toFixed(2)}`}
                  onPress={handlePay}
                  loading={loading}
                  icon="lock.fill"
                />
              </>
            ) : (
              <MomoPayment
                amount={dues.amount}
                currency={dues.currency}
                onPay={handlePay}
                loading={loading}
              />
            )}

            {error && (
              <View style={[styles.errorCard, { backgroundColor: C.dangerSubtle, borderColor: C.borderDanger }]}>
                <IconSymbol name="exclamationmark.circle.fill" size={16} color={C.danger} />
                <Text style={[styles.errorText, { color: C.textDanger }]}>{error}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  goldBar:    { height: 3 },
  scroll:     { padding: 20, gap: 16 },

  paidBanner: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, borderRadius: 14, borderWidth: 1, padding: 14 },
  paidTitle:  { fontSize: 14, fontWeight: '700' },
  paidSub:    { fontSize: 12, lineHeight: 18 },

  // Compact pill-style segmented control
  tabs:    { flexDirection: 'row', borderRadius: 10, borderWidth: 1, padding: 3, gap: 3 },
  tab:     { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 8, borderRadius: 8 },
  tabText: { fontSize: 12, fontWeight: '600' },

  errorCard:  { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  errorText:  { flex: 1, fontSize: 13, fontWeight: '500' },
});