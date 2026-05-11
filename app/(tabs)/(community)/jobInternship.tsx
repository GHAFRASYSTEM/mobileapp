import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/constants/Colors'

type Tab = 'jobs' | 'internships'

const jobInternship = () => {
  const C = useColors()
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<Tab>('jobs')

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.background }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: insets.bottom + 24,
      }}
    >
      {/* Header */}
      <Text style={[styles.title, { color: C.textPrimary }]}>Job & Internship</Text>
      <Text style={[styles.subtitle, { color: C.textSecondary }]}>
        Opportunities posted by and for GhaFra members
      </Text>

      {/* Tabs */}
      <View style={[styles.tabRow, { backgroundColor: C.surface, borderColor: C.border }]}>
        {(['jobs', 'internships'] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: C.primary },
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? C.textInverse : C.textMuted },
              ]}
            >
              {tab === 'jobs' ? 'Jobs' : 'Internships'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter row — visual only */}
      <View style={styles.filterRow}>
        {['All', 'Remote', 'Full-time', 'Part-time'].map((f) => (
          <View
            key={f}
            style={[
              styles.filterChip,
              {
                backgroundColor: f === 'All' ? C.primarySubtle : C.surface,
                borderColor: f === 'All' ? C.primary : C.border,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { color: f === 'All' ? C.primary : C.textMuted },
              ]}
            >
              {f}
            </Text>
          </View>
        ))}
      </View>

      {/* Empty state */}
      <View style={[styles.emptyCard, { backgroundColor: C.surface, borderColor: C.border }]}>
        <Text style={styles.emptyIllustration}>📭</Text>
        <Text style={[styles.emptyTitle, { color: C.textPrimary }]}>
          No {activeTab === 'jobs' ? 'Jobs' : 'Internships'} Available
        </Text>
        <Text style={[styles.emptyBody, { color: C.textSecondary }]}>
          There are no {activeTab === 'jobs' ? 'job openings' : 'internship positions'} posted
          at the moment. Check back soon — new opportunities are added regularly.
        </Text>
      </View>

      {/* Post opportunity CTA */}
      <View style={[styles.ctaCard, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.ctaTitle, { color: C.primary }]}>Know of an opportunity?</Text>
          <Text style={[styles.ctaBody, { color: C.textSecondary }]}>
            Help fellow members by submitting a job or internship listing.
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default jobInternship

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Filters
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Empty state
  emptyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 36,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIllustration: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyBody: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },

  // CTA
  ctaCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ctaTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  ctaBody: {
    fontSize: 12,
    lineHeight: 17,
  },
  ctaButton: {
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
})