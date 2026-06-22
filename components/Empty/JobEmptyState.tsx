import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useColors } from '@/constants/Colors'
import type { Tab } from '../Tabs/JobTabs'

interface EmptyStateProps {
  activeTab: Tab
}

const JobEmptyState = ({ activeTab }: EmptyStateProps) => {
  const C = useColors()
  const isJobs = activeTab === 'jobs'

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      <Text style={styles.illustration}>📭</Text>
      <Text style={[styles.title, { color: C.textPrimary }]}>
        No {isJobs ? 'Jobs' : 'Internships'} Available
      </Text>
      <Text style={[styles.body, { color: C.textSecondary }]}>
        There are no {isJobs ? 'job openings' : 'internship positions'} posted at the moment.
        Check back soon — new opportunities are added regularly.
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