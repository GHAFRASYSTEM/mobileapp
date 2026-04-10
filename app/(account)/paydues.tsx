import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, ActivityIndicator,
} from 'react-native';
import { useRouter }        from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors }        from '@/constants/Colors';
import { api }              from '@/services/api';
import { usePayDues } from '@/hooks/dues/usePayDues';
import ScreenHeader         from '@/components/Headers/ScreenHeader';
import { IconSymbol }       from '@/components/ui/icon-symbol';

type DuesStatus = {
  paid:     boolean;
  label:    string;
  amount:   number;
  currency: string;
  month:    number;
  year:     number;
  payment:  any;
};

type Method = 'card' | 'momo';

export default function PayDues() {
  const C       = useColors();
  const insets  = useSafeAreaInsets();
  const router  = useRouter();

  const [status,    setStatus]    = useState<DuesStatus | null>(null);
  const [fetching,  setFetching]  = useState(true);
  const [method,    setMethod]    = useState<Method>('card');

  const { pay, loading, error, success } = usePayDues();

  // Load current dues status
  useEffect(() => {
    api.get<DuesStatus>('/dues/status')
      .then(setStatus)
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  // Refresh status after successful payment
  useEffect(() => {
    if (!success) return;
    api.get<DuesStatus>('/dues/status').then(setStatus);
  }, [success]);

  if (fetching) {
    return (
      <View style={[styles.root, { backgroundColor: C.background }]}>
        <ScreenHeader title="Pay Dues" />
        <ActivityIndicator style={{ flex: 1 }} color={C.primary} />
      </View>
    );
  }

  const nextMonth = status
    ? new Date(status.year, status.month, 1)
        .toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : '';

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <ScreenHeader title="Pay Dues" showBack />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary card */}
        <View style={[styles.summaryCard, {
          backgroundColor: C.surface,
          borderColor: status?.paid ? C.borderFocus : C.border,
        }]}>
          <View style={[styles.accent, {
            backgroundColor: status?.paid ? C.primary : C.gold,
          }]} />
          <View style={styles.summaryBody}>
            <View style={styles.summaryTop}>
              <Text style={[styles.summaryLabel, { color: C.textMuted }]}>
                {status?.paid ? 'PAID' : 'AMOUNT DUE'}
              </Text>
              {status?.paid && (
                <View style={[styles.paidPill, { backgroundColor: C.primarySubtle }]}>
                  <Text style={[styles.paidPillText, { color: C.primary }]}>✓ Paid</Text>
                </View>
              )}
            </View>
            <Text style={[styles.amount, {
              color: status?.paid ? C.primary : C.textPrimary,
            }]}>
              {status?.currency} {status?.amount.toFixed(2)}
            </Text>
            <Text style={[styles.label, { color: C.textSecondary }]}>
              {status?.label}
            </Text>
          </View>
        </View>

        {/* Already paid */}
        {status?.paid ? (
          <View style={[styles.paidBanner, {
            backgroundColor: C.primarySubtle,
            borderColor: C.borderFocus,
          }]}>
            <IconSymbol name="checkmark.seal.fill" size={24} color={C.primary} />
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={[styles.paidTitle, { color: C.textSuccess }]}>
                All caught up! 🎉
              </Text>
              <Text style={[styles.paidSub, { color: C.textSecondary }]}>
                Next dues due in {nextMonth}. Thank you for your support!
              </Text>
            </View>
          </View>
        ) : (
          <>
            {/* Method selector */}
            <View style={[styles.tabs, {
              backgroundColor: C.surface,
              borderColor: C.border,
            }]}>
              {(['card', 'momo'] as Method[]).map(m => (
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
                  <Text style={[styles.tabText, {
                    color: method === m ? '#fff' : C.textMuted,
                  }]}>
                    {m === 'card' ? 'Card' : 'Mobile Money'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Error */}
            {error && (
              <View style={[styles.errorCard, {
                backgroundColor: C.dangerSubtle,
                borderColor: C.borderDanger,
              }]}>
                <IconSymbol name="exclamationmark.circle.fill" size={16} color={C.danger} />
                <Text style={[styles.errorText, { color: C.textDanger }]}>{error}</Text>
              </View>
            )}

            {/* Pay button */}
            <TouchableOpacity
              style={[styles.payBtn, { backgroundColor: C.primary }]}
              onPress={() => pay(method)}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <IconSymbol name="lock.fill" size={15} color="#fff" />
                  <Text style={styles.payBtnText}>
                    Pay {status?.currency} {status?.amount.toFixed(2)}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={[styles.secureNote, { color: C.textMuted }]}>
              🔒 Secured by Stripe
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:        { flex: 1 },
  scroll:      { padding: 20, gap: 16 },

  summaryCard: { flexDirection: 'row', borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  accent:      { width: 5 },
  summaryBody: { flex: 1, padding: 14, gap: 4 },
  summaryTop:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryLabel:{ fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  paidPill:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  paidPillText:{ fontSize: 10, fontWeight: '700' },
  amount:      { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  label:       { fontSize: 13 },

  paidBanner:  { flexDirection: 'row', alignItems: 'flex-start', gap: 12, borderRadius: 14, borderWidth: 1, padding: 14 },
  paidTitle:   { fontSize: 14, fontWeight: '700' },
  paidSub:     { fontSize: 12, lineHeight: 18 },

  tabs:        { flexDirection: 'row', borderRadius: 10, borderWidth: 1, padding: 3, gap: 3 },
  tab:         { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 8, borderRadius: 8 },
  tabText:     { fontSize: 12, fontWeight: '600' },

  errorCard:   { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  errorText:   { flex: 1, fontSize: 13, fontWeight: '500' },

  payBtn:      { borderRadius: 14, height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  payBtnText:  { fontSize: 16, fontWeight: '700', color: '#fff' },
  secureNote:  { textAlign: 'center', fontSize: 12 },
});