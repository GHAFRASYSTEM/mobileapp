import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useColors } from '@/constants/Colors'
import type { Tab } from '../Tabs/JobTabs'

interface EmptyStateProps {
  activeTab: Tab
  /** Set when the list is empty because of a search, not because nothing is posted. */
  search?: string
}

const LABELS: Record<Tab, { title: string; body: string }> = {
  all:         { title: 'Opportunities',      body: 'opportunities' },
  jobs:        { title: 'Jobs',               body: 'job openings' },
  internships: { title: 'Internships',        body: 'internship positions' },
}

const JobEmptyState = ({ activeTab, search }: EmptyStateProps) => {
  const C = useColors()
  const label = LABELS[activeTab]
  const query = search?.trim()

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      <Text style={styles.illustration}>{query ? '🔍' : '📭'}</Text>
      <Text style={[styles.title, { color: C.textPrimary }]}>
        {query ? 'No Matches Found' : `No ${label.title} Available`}
      </Text>
      <Text style={[styles.body, { color: C.textSecondary }]}>
        {query
          ? `Nothing matched “${query}”. Try a different title or organization.`
          : `There are no ${label.body} posted at the moment. Check back soon — new opportunities are added regularly.`}
      </Text>
    </View>
  )
}

export default JobEmptyState

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 36,
    alignItems: 'center',
    marginBottom: 20,
  },
  illustration: {
    fontSize: 52,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
})