import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { Opportunity } from '@/types/opportunities'
import { SectionHeading, LineRow } from '../ui/DetailAtoms'
import { formatDeadline } from '@/utils/opportunities'

interface JobDetailBodyProps {
  opportunity: Opportunity
  C: any
  onEmail: () => void
  onPhone: () => void
}

const Divider = ({ C }: { C: any }) => (
  <View style={[styles.divider, { backgroundColor: C.border }]} />
)

const JobDetailBody = ({ opportunity, C, onEmail, onPhone }: JobDetailBodyProps) => {
  const hasContact =
    !!opportunity.contact_name || !!opportunity.contact_email || !!opportunity.contact_phone

  return (
    <>
      {/* ── Details ── */}
      <Divider C={C} />
      <SectionHeading title="Details" C={C} />
      <LineRow label="Location" value={opportunity.location} C={C} />
      <LineRow
        label="Type"
        value={opportunity.type === 'internship' ? 'Internship' : 'Job'}
        C={C}
      />
      <LineRow
        label="Deadline"
        value={formatDeadline(opportunity.application_deadline)}
        C={C}
      />

      {/* ── About this role ── */}
      <Divider C={C} />
      <SectionHeading title="About this role" C={C} />
      <Text style={[styles.description, { color: C.textSecondary, paddingHorizontal: 20 }]}>
        {opportunity.description}
      </Text>

      {/* ── Qualifications ── */}
      {opportunity.qualifications.length > 0 && (
        <>
          <Divider C={C} />
          <SectionHeading title="Qualifications" C={C} />
          <View style={styles.bulletList}>
            {opportunity.qualifications.map((q, i) => (
              <View key={`${i}-${q}`} style={styles.bulletRow}>
                <Text style={[styles.bullet, { color: C.primary }]}>•</Text>
                <Text style={[styles.bulletText, { color: C.textSecondary }]}>{q}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* ── Skills ── */}
      {opportunity.skills.length > 0 && (
        <>
          <Divider C={C} />
          <SectionHeading title="Skills" C={C} />
          <View style={styles.skillsWrap}>
            {opportunity.skills.map((skill, i) => (
              <View
                key={`${i}-${skill}`}
                style={[styles.skillChip, { borderColor: C.border, backgroundColor: C.surface }]}
              >
                <Text style={[styles.skillText, { color: C.textPrimary }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* ── How to apply (method: other) ── */}
      {opportunity.application_method === 'other' && !!opportunity.application_instructions && (
        <>
          <Divider C={C} />
          <SectionHeading title="How to apply" C={C} />
          <View
            style={[
              styles.instructions,
              { backgroundColor: C.primarySubtle, borderColor: C.border },
            ]}
          >
            <Text style={[styles.instructionsText, { color: C.textPrimary }]}>
              {opportunity.application_instructions}
            </Text>
          </View>
        </>
      )}

      {/* ── Contact ── */}
      {hasContact && (
        <>
          <Divider C={C} />
          <SectionHeading title="Contact" C={C} />
          {!!opportunity.contact_name && (
            <LineRow label="Name" value={opportunity.contact_name} C={C} />
          )}
          {!!opportunity.contact_email && (
            <LineRow
              label="Email"
              value={opportunity.contact_email}
              C={C}
              isLink
              onPress={onEmail}
            />
          )}
          {!!opportunity.contact_phone && (
            <LineRow
              label="Phone"
              value={opportunity.contact_phone}
              C={C}
              isLink
              onPress={onPhone}
            />
          )}
        </>
      )}
    </>
  )
}

export default JobDetailBody

const styles = StyleSheet.create({
  divider: { height: StyleSheet.hairlineWidth, marginHorizontal: 20 },
  description: { fontSize: 14, lineHeight: 22, paddingTop: 8, paddingBottom: 4 },

  bulletList: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4, gap: 6 },
  bulletRow: { flexDirection: 'row', gap: 8 },
  bullet: { fontSize: 14, lineHeight: 21, fontWeight: '700' },
  bulletText: { flex: 1, fontSize: 14, lineHeight: 21 },

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

  instructions: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  instructionsText: { fontSize: 14, lineHeight: 21 },
})
