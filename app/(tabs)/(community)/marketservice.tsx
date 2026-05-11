import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/constants/Colors'

type Tab = 'services' | 'products'

const marketservice = () => {
  const C = useColors()
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<Tab>('services')

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
      <Text style={[styles.title, { color: C.textPrimary }]}>Market Services</Text>
      <Text style={[styles.subtitle, { color: C.textSecondary }]}>
        Businesses and services offered by GhaFra members
      </Text>

      {/* Tabs */}
      <View style={[styles.tabRow, { backgroundColor: C.surface, borderColor: C.border }]}>
        {(['services', 'products'] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { backgroundColor: C.primary }]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? C.textInverse : C.textMuted }]}>
              {tab === 'services' ? 'Services' : 'Products'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {['All', 'Food', 'Beauty', 'Tech', 'Fashion', 'Legal', 'Finance'].map((cat, i) => (
          <View
            key={cat}
            style={[
              styles.categoryChip,
              {
                backgroundColor: i === 0 ? C.primarySubtle : C.surface,
                borderColor: i === 0 ? C.primary : C.border,
              },
            ]}
          >
            <Text style={[styles.categoryText, { color: i === 0 ? C.primary : C.textMuted }]}>
              {cat}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Empty state */}
      <View style={[styles.emptyCard, { backgroundColor: C.surface, borderColor: C.border }]}>
        <Text style={styles.emptyIllustration}>🛍️</Text>
        <Text style={[styles.emptyTitle, { color: C.textPrimary }]}>
          No {activeTab === 'services' ? 'Services' : 'Products'} Listed
        </Text>
        <Text style={[styles.emptyBody, { color: C.textSecondary }]}>
          No member {activeTab === 'services' ? 'services' : 'products'} have been posted yet.
          Be the first to showcase what you offer to the GhaFra community.
        </Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          { label: 'Members', value: '—', icon: '👥' },
          { label: 'Categories', value: '6', icon: '📂' },
          { label: 'Cities', value: '—', icon: '📍' },
        ].map((stat) => (
          <View key={stat.label} style={[styles.statCard, { backgroundColor: C.surface, borderColor: C.border }]}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={[styles.statValue, { color: C.textPrimary }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: C.textMuted }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={[styles.ctaCard, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.ctaTitle, { color: C.primary }]}>Run a business?</Text>
          <Text style={[styles.ctaBody, { color: C.textSecondary }]}>
            List your service or product and reach the entire GhaFra community.
          </Text>
        </View>

      </View>
    </ScrollView>
  )
}

export default marketservice

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

  // Categories
  categoryRow: {
    gap: 8,
    paddingBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
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

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
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