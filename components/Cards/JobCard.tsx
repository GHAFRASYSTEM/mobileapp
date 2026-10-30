import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useColors } from '@/constants/Colors'
import type { Opportunity } from '@/types/opportunities'
import { closedLabel, formatDeadline, isOpportunityClosed } from '@/utils/opportunities'

// ─── component ───────────────────────────────────────────────────────────────

interface JobCardProps {
  opportunity: Opportunity
  onPress: (opportunity: Opportunity) => void
}

const JobCard = ({ opportunity, onPress }: JobCardProps) => {
  const C = useColors()
  const isInternship = opportunity.type === 'internship'
  // Evaluated on every render, so a deadline that passes while the list is
  // open flips the badge without a refetch.
  const closed = isOpportunityClosed(opportunity)

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}
      activeOpacity={0.88}
      onPress={() => onPress(opportunity)}
    >
      <View style={styles.body}>
        {/* ── Badges ── */}
        <View style={styles.badgeRow}>
          <View style={[styles.typeBadge, isInternship ? styles.badgeIntern : styles.badgeJob]}>
            <Text style={[styles.typeBadgeText, { color: isInternship ? '#4C3BC4' : '#0C5AA8' }]}>
              {isInternship ? 'Internship' : 'Job'}
            </Text>
          </View>

          {closed ? (
            <View style={[styles.statusBadge, styles.closedBadge]}>
              <Text style={[styles.statusText, { color: '#9A3412' }]}>
                {closedLabel(opportunity)}
              </Text>
            </View>
          ) : (
            <View style={[styles.statusBadge, styles.openBadge]}>
              <View style={styles.openDot} />
              <Text style={[styles.statusText, { color: '#15803D' }]}>Open</Text>
            </View>
          )}
        </View>

        {/* Organization + location */}
        <Text style={[styles.company, { color: C.textSecondary }]} numberOfLines={1}>
          {opportunity.organization}  ·  {opportunity.location}
        </Text>

        {/* Title */}
        <Text style={[styles.title, { color: C.textPrimary }]} numberOfLines={2}>
          {opportunity.title}
        </Text>

        {/* ── Footer ── */}
        <View style={[styles.footer, { borderTopColor: C.border }]}>
          <View style={styles.deadlineBlock}>
            <Text style={[styles.deadlineEyebrow, { color: C.textMuted }]}>Deadline</Text>
            <Text
              style={[
                styles.deadlineValue,
                { color: closed ? C.textMuted : C.primary },
              ]}
              numberOfLines={1}
            >
              {formatDeadline(opportunity.application_deadline)}
            </Text>
          </View>
          <View style={[styles.viewBtn, { backgroundColor: C.primary }]}>
            <Text style={styles.viewBtnText}>View</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// ─── styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  // ── badges ──
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeJob: { backgroundColor: 'rgba(219,234,254,0.93)' },
  badgeIntern: { backgroundColor: 'rgba(237,233,254,0.93)' },
  typeBadgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  openBadge: { backgroundColor: 'rgba(220,252,231,0.93)' },
  closedBadge: { backgroundColor: 'rgba(255,237,213,0.93)' },
  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  statusText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },

  // ── body ──
  body: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  company: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
    letterSpacing: -0.3,
    marginBottom: 12,
  },

  // ── footer ──
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
    gap: 12,
  },
  deadlineBlock: { flex: 1 },
  deadlineEyebrow: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  deadlineValue: { fontSize: 14, fontWeight: '700' },

  viewBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 12,
  },
  viewBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})

export default JobCard
