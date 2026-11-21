import {
  StyleSheet, Text, View, FlatList, TextInput,
  ActivityIndicator, RefreshControl, TouchableOpacity,
} from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { useColors } from '@/constants/Colors'
import ScreenHeader from '@/components/Headers/ScreenHeader';
import { useRouter } from 'expo-router';

import JobTabs, { type Tab } from '@/components/Tabs/JobTabs'
import EmptyState from '@/components/Empty/JobEmptyState'
import JobCard from '@/components/Cards/JobCard'
import { useOpportunities, type OpportunityFilter } from '@/hooks/useOpportunities'
import type { Opportunity } from '@/types/opportunities'

// ─── Tab ⇄ API type ───────────────────────────────────────────────────────────

const TAB_TO_FILTER: Record<Tab, OpportunityFilter> = {
  all:         'all',
  jobs:        'job',
  internships: 'internship',
}

const FILTER_TO_TAB: Record<OpportunityFilter, Tab> = {
  all:        'all',
  job:        'jobs',
  internship: 'internships',
}

// ─────────────────────────────────────────────────────────────────────────────

const JobInternshipScreen = () => {
  const C = useColors()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const {
    items, total, filter, setFilter, search, setSearch,
    loading, refreshing, loadingMore, hasMore, error, isEmpty,
    refresh, loadMore, retry,
  } = useOpportunities()

  const activeTab = FILTER_TO_TAB[filter]

  const handleTabChange = useCallback((tab: Tab) => {
    setFilter(TAB_TO_FILTER[tab])
  }, [setFilter])

  const handleCardPress = useCallback((opportunity: Opportunity) => {
    router.push({
      pathname: '/(standalone)/JobInternship/Jobdetailscreen',
      params: { id: opportunity.id },
    })
  }, [router])

  const countLabel = useMemo(() => {
    const noun = filter === 'internship' ? 'internship' : filter === 'job' ? 'job' : 'opportunity'
    const plural = noun === 'opportunity' ? 'opportunities' : `${noun}s`
    return `${total} ${total === 1 ? noun : plural} found`
  }, [filter, total])

  // ── Controls sit above the list and stay put while it scrolls ──
  const controls = (
    <>
      <JobTabs activeTab={activeTab} onChange={handleTabChange} />

      <View style={[styles.searchBox, { backgroundColor: C.surface, borderColor: C.border }]}>
        <MaterialIcons name="search" size={18} color={C.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: C.textPrimary }]}
          placeholder="Search by title or organization"
          placeholderTextColor={C.textMuted}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} hitSlop={10} accessibilityLabel="Clear search">
            <MaterialIcons name="close" size={18} color={C.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </>
  )

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <ScreenHeader
        variant="pageButton"
        title="Jobs & Internships"
        subtitle="Opportunities posted by and for GhaFra members"
        icon="plus"
        buttonRoute="/(standalone)/JobInternship/Summit"
      />

      <View style={styles.controls}>{controls}</View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={C.primary} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={[styles.errorTitle, { color: C.textPrimary }]}>{error}</Text>
          <Text style={[styles.errorBody, { color: C.textSecondary }]}>
            Check your connection and try again.
          </Text>
          <TouchableOpacity
            onPress={retry}
            style={[styles.retryBtn, { backgroundColor: C.primary }]}
            activeOpacity={0.85}
          >
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={o => o.id}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={C.primary} />
          }
          ListHeaderComponent={
            items.length > 0 ? (
              <Text style={[styles.countText, { color: C.textMuted }]}>{countLabel}</Text>
            ) : null
          }
          ListEmptyComponent={
            isEmpty ? <EmptyState activeTab={activeTab} search={search} /> : null
          }
          renderItem={({ item }) => (
            <JobCard opportunity={item} onPress={handleCardPress} />
          )}
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={styles.footerSpinner} color={C.primary} />
            ) : null
          }
        />
      )}
    </View>
  )
}

export default JobInternshipScreen

const styles = StyleSheet.create({
  controls: { paddingHorizontal: 20, paddingTop: 8 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 14, padding: 0 },
  list: { paddingHorizontal: 20 },
  countText: { fontSize: 12, marginBottom: 12 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 6 },
  errorTitle: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  errorBody: { fontSize: 13, textAlign: 'center' },
  retryBtn: { marginTop: 10, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  retryText: { color: '#fff', fontWeight: '800' },
  footerSpinner: { marginVertical: 16 },
})
