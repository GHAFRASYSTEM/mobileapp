import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/constants/Colors'
import ScreenHeader from '@/components/Headers/ScreenHeader';
import { useRouter } from 'expo-router';

import JobTabs, { type Tab } from '@/components/Tabs/JobTabs'
import EmptyState from '@/components/Empty/JobEmptyState'
import JobCard from '@/components/Cards/JobCard'
import { MOCK_LISTINGS, type Listing } from '@/assets/data/jobInternship.types'

// ─── Filter config ────────────────────────────────────────────────────────────
 
const FILTERS = ['All', 'Remote', 'Full-time', 'Part-time'] as const
type Filter = (typeof FILTERS)[number]
 
function applyFilter(listings: Listing[], filter: Filter): Listing[] {
  if (filter === 'All') return listings
  if (filter === 'Remote') return listings.filter((l) => l.workMode === 'remote')
  if (filter === 'Full-time') return listings.filter((l) => l.employmentType === 'full-time')
  if (filter === 'Part-time') return listings.filter((l) => l.employmentType === 'part-time')
  return listings
}
 
// ─────────────────────────────────────────────────────────────────────────────
 
const JobInternshipScreen = () => {
  const C = useColors()
  const insets = useSafeAreaInsets()
  const router = useRouter()
 
  const [activeTab, setActiveTab] = useState<Tab>('jobs')
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
 
  const visibleListings = useMemo(() => {
    const byTab = MOCK_LISTINGS.filter(
      (l) =>
        l.type === (activeTab === 'jobs' ? 'job' : 'internship') &&
        l.status === 'approved',
    )
    return applyFilter(byTab, activeFilter)
  }, [activeTab, activeFilter])
 
  const handleCardPress = (listing: Listing) => {
    router.push({
      pathname: '/(standalone)/JobInternship/Jobdetailscreen',
      params: {
        listing: JSON.stringify(listing),
      },
    })
  }
 
  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <ScreenHeader
        variant="pageButton"
        title="Jobs & Internships"
        subtitle="Opportunities posted by and for GhaFra members"
        icon="plus"
        buttonRoute="/(standalone)/JobInternship/Summit"
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {/* Tabs */}
        <JobTabs activeTab={activeTab} onChange={setActiveTab} />
 
        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                {
                  backgroundColor: activeFilter === f ? C.primarySubtle : C.surface,
                  borderColor: activeFilter === f ? C.primary : C.border,
                },
              ]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === f ? C.primary : C.textMuted },
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
 
        {/* Count */}
        {visibleListings.length > 0 && (
          <Text style={[styles.countText, { color: C.textMuted }]}>
            {visibleListings.length}{' '}
            {activeTab === 'jobs' ? 'job' : 'internship'}
            {visibleListings.length !== 1 ? 's' : ''} found
          </Text>
        )}
 
        {/* Cards or empty state */}
        {visibleListings.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          visibleListings.map((listing) => (
            <JobCard key={listing.id} listing={listing} onPress={handleCardPress} />
          ))
        )}
      </ScrollView>
    </View>
  )
}
 
export default JobInternshipScreen
 
const styles = StyleSheet.create({
  filterRow: { gap: 8, marginBottom: 16 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: StyleSheet.hairlineWidth },
  filterText: { fontSize: 12, fontWeight: '500' },
  countText: { fontSize: 12, marginBottom: 12 },
})