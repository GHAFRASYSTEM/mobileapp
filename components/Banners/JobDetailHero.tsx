import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import type { Listing } from '@/assets/data/jobInternship.types'
import { Pill } from '../ui/DetailAtoms'
import { WORK_MODE_LABEL, EMPLOYMENT_LABEL } from '../../utils/formatters'

interface JobDetailHeroProps {
  listing: Listing
  C: any
}

const JobDetailHero = ({ listing, C }: JobDetailHeroProps) => {
  const isInternship = listing.type === 'internship'

  return (
    <>
      {/* ── Hero image ── */}
      {listing.posterImage ? (
        <Image
          source={{ uri: listing.posterImage }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.heroImagePlaceholder, { backgroundColor: C.primarySubtle }]}>
          <Text style={[styles.heroPlaceholderText, { color: C.primary }]}>
            {listing.company.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      )}

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
          <View style={styles.openBadge}>
            <View style={styles.openDot} />
            <Text style={styles.openText}>Open</Text>
          </View>
        </View>

        <Text style={[styles.jobTitle, { color: C.textPrimary }]}>{listing.title}</Text>
        <Text style={[styles.company, { color: C.textSecondary }]}>
          {listing.company} · {listing.location}
        </Text>
      </View>

      {/* ── Pill strip ── */}
      <View style={styles.pillStrip}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
        >
          <Pill label={EMPLOYMENT_LABEL[listing.employmentType]} C={C} />
          <Pill label={WORK_MODE_LABEL[listing.workMode]} C={C} />
          <Pill label={listing.category} C={C} />
          {isInternship && listing.academicCredit && (
            <Pill label="Academic credit ✓" C={C} accent />
          )}
        </ScrollView>
      </View>
    </>
  )
}

export default JobDetailHero

const styles = StyleSheet.create({
  heroImage: { width: '100%', height: 250 },
  heroImagePlaceholder: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    fontSize: 36,
    fontWeight: '800',
    opacity: 0.3,
    letterSpacing: 8,
  },
  titleBlock: { paddingTop: 20, paddingBottom: 12 },
  typeBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeJob: { backgroundColor: '#DBEAFE' },
  badgeIntern: { backgroundColor: '#EDE9FE' },
  typeBadgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
  openBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  openDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#16A34A' },
  openText: { fontSize: 11, fontWeight: '700', color: '#15803D' },
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