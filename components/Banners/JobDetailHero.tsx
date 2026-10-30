import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import type { Opportunity } from '@/types/opportunities'
import { Pill } from '../ui/DetailAtoms'
import { closedLabel, formatDeadline, isOpportunityClosed } from '@/utils/opportunities'

interface JobDetailHeroProps {
  opportunity: Opportunity
  C: any
}

const JobDetailHero = ({ opportunity, C }: JobDetailHeroProps) => {
  const isInternship = opportunity.type === 'internship'
  const closed = isOpportunityClosed(opportunity)

  return (
    <>
      {/* ── Title block ── */}
      <View style={[styles.titleBlock, { paddingHorizontal: 20 }]}>
        <View style={styles.typeBadgeRow}>
          <View style={[styles.typeBadge, isInternship ? styles.badgeIntern : styles.badgeJob]}>
            <Text
              style={[
                styles.typeBadgeText,
                { color: isInternship ? '#4C3BC4' : '#0C5AA8' },
              ]}
            >
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

        <Text style={[styles.jobTitle, { color: C.textPrimary }]}>{opportunity.title}</Text>
        <Text style={[styles.company, { color: C.textSecondary }]}>
          {opportunity.organization} · {opportunity.location}
        </Text>
      </View>

      {/* ── Pill strip ── */}
      <View style={styles.pillStrip}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
        >
          <Pill label={opportunity.location} C={C} />
          <Pill
            label={`Apply by ${formatDeadline(opportunity.application_deadline)}`}
            C={C}
            accent={!closed && !!opportunity.application_deadline}
          />
        </ScrollView>
      </View>
    </>
  )
}

export default JobDetailHero

const styles = StyleSheet.create({
  titleBlock: { paddingTop: 20, paddingBottom: 12 },
  typeBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeJob: { backgroundColor: '#DBEAFE' },
  badgeIntern: { backgroundColor: '#EDE9FE' },
  typeBadgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  openBadge: { backgroundColor: '#D1FAE5' },
  closedBadge: { backgroundColor: '#FFEDD5' },
  openDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#16A34A' },
  statusText: { fontSize: 11, fontWeight: '700' },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
    lineHeight: 28,
    marginBottom: 4,
  },
  company: { fontSize: 13, fontWeight: '400' },
  pillStrip: { paddingBottom: 16 },
  pillRow: { paddingHorizontal: 20, gap: 7, flexDirection: 'row' },
})
