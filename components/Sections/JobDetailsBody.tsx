import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { Listing } from '@/assets/data/jobInternship.types'
import { SectionHeading, LineRow } from '../ui/DetailAtoms'
import { formatSalaryFull, formatDate, WORK_MODE_LABEL, EMPLOYMENT_LABEL } from '../../utils/formatters'

interface JobDetailBodyProps {
  listing: Listing
  C: any
  onEmail: () => void
  onPhone: () => void
}

const Divider = ({ C }: { C: any }) => (
  <View style={[styles.divider, { backgroundColor: C.border }]} />
)

const JobDetailBody = ({ listing, C, onEmail, onPhone }: JobDetailBodyProps) => {
  const isInternship = listing.type === 'internship'
  const salary = formatSalaryFull(listing.salary)

  return (
    <>
      {/* ── Details ── */}
      <Divider C={C} />
      <SectionHeading title="Details" C={C} />
      <LineRow label="Location"   value={listing.location}                          C={C} />
      <LineRow label="Category"   value={listing.category}                          C={C} />
      <LineRow label="Employment" value={EMPLOYMENT_LABEL[listing.employmentType]}  C={C} />
      <LineRow label="Work mode"  value={WORK_MODE_LABEL[listing.workMode]}         C={C} />
      {listing.startDate && (
        <LineRow label="Start date" value={formatDate(listing.startDate)} C={C} />
      )}
      {listing.applicationDeadline && (
        <LineRow label="Deadline" value={formatDate(listing.applicationDeadline)} C={C} />
      )}
      {isInternship && listing.duration && (
        <LineRow label="Duration" value={listing.duration} C={C} />
      )}

      {/* ── Compensation ── */}
      <Divider C={C} />
      <SectionHeading title="Compensation" C={C} />
      <View style={styles.salaryBlock}>
        {salary.isUnspec ? (
          <Text style={[styles.salaryUnspec, { color: C.textMuted }]}>Unspecified salary</Text>
        ) : (
          <>
            <Text style={[styles.salaryAmount, { color: C.primary }]}>{salary.amount}</Text>
            <Text style={[styles.salaryPeriod, { color: C.textMuted }]}>{salary.period}</Text>
          </>
        )}
      </View>

      {/* ── About this role ── */}
      <Divider C={C} />
      <SectionHeading title="About this role" C={C} />
      <Text style={[styles.description, { color: C.textSecondary, paddingHorizontal: 20 }]}>
        {listing.description}
      </Text>

      {/* ── Skills ── */}
      <Divider C={C} />
      <SectionHeading title="Skills required" C={C} />
      <View style={styles.skillsWrap}>
        {listing.skillsRequired.map((skill: string) => (
          <View key={skill} style={[styles.skillChip, { borderColor: C.border, backgroundColor: C.surface }]}>
            <Text style={[styles.skillText, { color: C.textPrimary }]}>{skill}</Text>
          </View>
        ))}
      </View>

      {/* ── Contact ── */}
      <Divider C={C} />
      <SectionHeading title="Contact" C={C} />
      {listing.contact.name && (
        <LineRow label="Name" value={listing.contact.name} C={C} />
      )}
      <LineRow label="Email" value={listing.contact.email} C={C} isLink onPress={onEmail} />
      {listing.contact.phone && (
        <LineRow label="Phone" value={listing.contact.phone} C={C} isLink onPress={onPhone} />
      )}
    </>
  )
}

export default JobDetailBody

const styles = StyleSheet.create({
  divider: { height: StyleSheet.hairlineWidth, marginHorizontal: 20 },
  salaryBlock: { paddingHorizontal: 20, paddingVertical: 14 },
  salaryAmount: { fontSize: 22, fontWeight: '700', marginBottom: 2 },
  salaryPeriod: { fontSize: 13 },
  salaryUnspec: { fontSize: 14, fontStyle: 'italic' },
  description: { fontSize: 14, lineHeight: 22, paddingTop: 8, paddingBottom: 4 },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  skillChip: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  skillText: { fontSize: 13, fontWeight: '500' },
})