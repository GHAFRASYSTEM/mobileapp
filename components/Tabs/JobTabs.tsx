import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useColors } from '@/constants/Colors'

export type Tab = 'jobs' | 'internships'

interface JobTabsProps {
  activeTab: Tab
  onChange: (tab: Tab) => void
}

const TABS: { key: Tab; label: string }[] = [
  { key: 'jobs', label: 'Jobs' },
  { key: 'internships', label: 'Internships' },
]

const JobTabs = ({ activeTab, onChange }: JobTabsProps) => {
  const C = useColors()

  return (
    <View style={[styles.tabRow, { backgroundColor: C.surface, borderColor: C.border }]}>
      {TABS.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={[styles.tab, activeTab === key && { backgroundColor: C.primary }]}
          onPress={() => onChange(key)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === key ? C.textInverse : C.textMuted },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default JobTabs

const styles = StyleSheet.create({
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
})