import {
  View, ScrollView, Text, Linking, StyleSheet,
  ActivityIndicator, TouchableOpacity, Alert,
} from 'react-native'
import React, { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useColors } from '@/constants/Colors'
import ScreenHeader from '@/components/Headers/ScreenHeader'
import PrimaryButton from '@/components/Buttons/PrimaryButton'

import JobDetailHero from '@/components/Banners/JobDetailHero'
import JobDetailBody from '@/components/Sections/JobDetailsBody'
import { useOpportunity } from '@/hooks/useOpportunities'
import { closedLabel, isHttpUrl, isOpportunityClosed } from '@/utils/opportunities'

// ─── Message state (not found / unavailable / failed) ────────────────────────

const MessageState = ({
  C, title, body, onRetry,
}: {
  C: any
  title: string
  body: string
  onRetry?: () => void
}) => (
  <View style={styles.centered}>
    <Text style={[styles.stateTitle, { color: C.textPrimary }]}>{title}</Text>
    <Text style={[styles.stateBody, { color: C.textSecondary }]}>{body}</Text>
    {onRetry && (
      <TouchableOpacity
        onPress={onRetry}
        style={[styles.retryBtn, { backgroundColor: C.primary }]}
        activeOpacity={0.85}
      >
        <Text style={styles.retryText}>Try again</Text>
      </TouchableOpacity>
    )}
  </View>
)

// ─────────────────────────────────────────────────────────────────────────────

const JobDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const C = useColors()
  const insets = useSafeAreaInsets()

  const { opportunity, loading, errorKind, retry } = useOpportunity(id)

  const openLink = useCallback(async (url: string, failMessage: string) => {
    try {
      await Linking.openURL(url)
    } catch (err) {
      console.error('[Opportunity] open link error:', err)
      Alert.alert("Couldn't open link", failMessage)
    }
  }, [])

  const handleEmail = useCallback(() => {
    if (opportunity?.contact_email) {
      openLink(`mailto:${opportunity.contact_email}`, opportunity.contact_email)
    }
  }, [opportunity, openLink])

  const handlePhone = useCallback(() => {
    if (opportunity?.contact_phone) {
      openLink(`tel:${opportunity.contact_phone}`, opportunity.contact_phone)
    }
  }, [opportunity, openLink])

  const handleApply = useCallback(() => {
    if (!opportunity) return
    if (opportunity.application_method === 'url' && isHttpUrl(opportunity.application_url)) {
      openLink(opportunity.application_url!.trim(), 'Try again, or copy the link into your browser.')
    } else if (opportunity.application_method === 'email' && opportunity.application_email) {
      openLink(`mailto:${opportunity.application_email}`, opportunity.application_email)
    }
  }, [opportunity, openLink])

  // ── Can this listing be applied to right now? ──
  const closed = !!opportunity && isOpportunityClosed(opportunity)
  const canApply =
    !!opportunity &&
    !closed &&
    ((opportunity.application_method === 'url' && isHttpUrl(opportunity.application_url)) ||
      (opportunity.application_method === 'email' && !!opportunity.application_email))

  const applyLabel =
    opportunity?.application_method === 'email' ? 'Apply by email' : 'Apply now'

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <ScreenHeader title={opportunity?.title ?? 'Opportunity'} showBack />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={C.primary} />
        </View>
      ) : errorKind === 'unavailable' ? (
        <MessageState
          C={C}
          title="No longer available"
          body="This opportunity is no longer accepting applications."
        />
      ) : errorKind === 'notFound' ? (
        <MessageState
          C={C}
          title="Opportunity not found"
          body="This listing may have been removed."
        />
      ) : errorKind || !opportunity ? (
        <MessageState
          C={C}
          title="Couldn't load this opportunity"
          body="Check your connection and try again."
          onRetry={retry}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
          showsVerticalScrollIndicator={false}
        >
          <JobDetailHero opportunity={opportunity} C={C} />
          <JobDetailBody
            opportunity={opportunity}
            C={C}
            onEmail={handleEmail}
            onPhone={handlePhone}
          />

          {/* ── Apply ── */}
          <View style={styles.applyBlock}>
            {closed ? (
              <View style={[styles.notice, { backgroundColor: C.surface, borderColor: C.border }]}>
                <Text style={[styles.noticeTitle, { color: C.textPrimary }]}>
                  {closedLabel(opportunity)}
                </Text>
                <Text style={[styles.noticeBody, { color: C.textSecondary }]}>
                  This opportunity is no longer accepting applications.
                </Text>
              </View>
            ) : canApply ? (
              <PrimaryButton text={applyLabel} onPress={handleApply} />
            ) : (
              <Text style={[styles.applyHint, { color: C.textMuted }]}>
                {opportunity.application_method === 'other'
                  ? 'Follow the instructions above to apply.'
                  : 'No application link was provided for this opportunity.'}
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default JobDetailScreen

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 6 },
  stateTitle: { fontSize: 17, fontWeight: '700', textAlign: 'center' },
  stateBody: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  retryBtn: { marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  retryText: { color: '#fff', fontWeight: '800' },

  applyBlock: { paddingHorizontal: 20, paddingTop: 24 },
  notice: {
    padding: 14,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 3,
  },
  noticeTitle: { fontSize: 14, fontWeight: '700' },
  noticeBody: { fontSize: 13, lineHeight: 19 },
  applyHint: { fontSize: 13, textAlign: 'center', lineHeight: 19 },
})
