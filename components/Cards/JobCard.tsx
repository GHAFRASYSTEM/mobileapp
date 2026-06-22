import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useColors } from '@/constants/Colors'
import type { Listing } from '../../assets/data/jobInternship.types'

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatSalaryShort(salary: Listing['salary']): { label: string; isUnspec: boolean } {
  if (salary.unspecified || (!salary.min && !salary.max))
    return { label: 'Salary not listed', isUnspec: true }

  const currency = salary.currency ?? 'GHS'
  const periodLabel: Record<string, string> = {
    hourly: '/hr', monthly: '/mo', yearly: '/yr', stipend: ' stipend',
  }
  const suffix = periodLabel[salary.period ?? 'monthly']
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

  if (salary.min && salary.max)
    return { label: `${currency} ${fmt(salary.min)} – ${fmt(salary.max)}${suffix}`, isUnspec: false }
  if (salary.min)
    return { label: `${currency} ${fmt(salary.min)}+${suffix}`, isUnspec: false }
  return { label: `Up to ${currency} ${fmt(salary.max!)}${suffix}`, isUnspec: false }
}

const WORK_MODE_LABEL: Record<Listing['workMode'], string> = {
  remote: '🌐  Remote',
  'on-site': '🏢  On-site',
  hybrid: '🔀  Hybrid',
}

const EMPLOYMENT_LABEL: Record<Listing['employmentType'], string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  volunteer: 'Volunteer',
}

// ─── component ───────────────────────────────────────────────────────────────

interface JobCardProps {
  listing: Listing
  onPress: (listing: Listing) => void
}

const JobCard = ({ listing, onPress }: JobCardProps) => {
  const C = useColors()
  const { label: salaryLabel, isUnspec } = formatSalaryShort(listing.salary)
  const isInternship = listing.type === 'internship'

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}
      activeOpacity={0.88}
      onPress={() => onPress(listing)}
    >
      {/* ── Hero image ── */}
      <View style={styles.imageWrapper}>
        {listing.posterImage ? (
          <Image source={{ uri: listing.posterImage }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: C.primarySubtle }]}>
            <Text style={[styles.placeholderText, { color: C.primary }]}>
              {listing.company.slice(0, 2).toUpperCase()}
            </Text>
          </View>
        )}

        {/* Floating badges over image */}
        <View style={styles.imageBadges}>
          <View style={[styles.typeBadge, isInternship ? styles.badgeIntern : styles.badgeJob]}>
            <Text style={[styles.typeBadgeText, { color: isInternship ? '#4C3BC4' : '#0C5AA8' }]}>
              {isInternship ? 'Internship' : 'Job'}
            </Text>
          </View>
          <View style={styles.openBadge}>
            <View style={styles.openDot} />
            <Text style={styles.openText}>Open</Text>
          </View>
        </View>
      </View>

      {/* ── Card body ── */}
      <View style={styles.body}>

        {/* Company + location */}
        <Text style={[styles.company, { color: C.textSecondary }]} numberOfLines={1}>
          {listing.company}  ·  {listing.location}
        </Text>

        {/* Job title */}
        <Text style={[styles.title, { color: C.textPrimary }]} numberOfLines={2}>
          {listing.title}
        </Text>

        {/* Pills */}
        <View style={styles.pills}>
          <Pill label={WORK_MODE_LABEL[listing.workMode]} C={C} />
          <Pill label={EMPLOYMENT_LABEL[listing.employmentType]} C={C} />
          <Pill label={listing.category} C={C} />
        </View>

        {/* ── Footer ── */}
        <View style={[styles.footer, { borderTopColor: C.border }]}>
          <View>
            <Text style={[styles.salaryEyebrow, { color: C.textMuted }]}>Salary</Text>
            <Text
              style={
                isUnspec
                  ? [styles.salaryUnspec, { color: C.textMuted }]
                  : [styles.salaryValue, { color: C.primary }]
              }
            >
              {salaryLabel}
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

// ─── Pill ─────────────────────────────────────────────────────────────────────

const Pill = ({ label, C }: { label: string; C: any }) => (
  <View style={[pillStyles.pill, { backgroundColor: C.background, borderColor: C.border }]}>
    <Text style={[pillStyles.text, { color: C.textMuted }]} numberOfLines={1}>
      {label}
    </Text>
  </View>
)

const pillStyles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: { fontSize: 11, fontWeight: '500', letterSpacing: 0.2 },
})

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

  // ── image ──
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
  },
  imagePlaceholder: {
    width: '100%',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: '800',
    opacity: 0.3,
    letterSpacing: 8,
  },

  // ── floating badges (sit on image) ──
  imageBadges: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeJob: { backgroundColor: 'rgba(219,234,254,0.93)' },
  badgeIntern: { backgroundColor: 'rgba(237,233,254,0.93)' },
  typeBadgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },

  openBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(220,252,231,0.93)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  openText: { fontSize: 11, fontWeight: '700', color: '#15803D', letterSpacing: 0.3 },

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

  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },

  // ── footer ──
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
  },
  salaryEyebrow: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  salaryValue: { fontSize: 14, fontWeight: '700' },
  salaryUnspec: { fontSize: 12, fontStyle: 'italic' },

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