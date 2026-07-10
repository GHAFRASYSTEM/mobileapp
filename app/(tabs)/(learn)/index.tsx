import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, StatusBar, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColors } from '@/constants/Colors';
import ScreenHeader from '@/components/Headers/ScreenHeader';

import { Level } from '@/types/french.types';
import { FRENCH_RESOURCES } from '@/assets/data/resources.data';
import LevelFilterBar from '@/components/French/LevelFilterBar';
import ResourceCard from '@/components/French/ResourceCard';
import { Ionicons } from '@expo/vector-icons';
// ✅ NEW
import VoiceOrb from '@/components/French/VoiceOrb';

type FilterValue = 'All' | Level;

export default function LearnFrenchScreen() {
  const C      = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeLevel, setActiveLevel] = useState<FilterValue>('All');
  const [search, setSearch]           = useState('');

  // ── Filtered resource list ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return FRENCH_RESOURCES.filter(r => {
      const matchLevel  = activeLevel === 'All' || r.levels.includes(activeLevel as Level);
      const matchSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      return matchLevel && matchSearch;
    });
  }, [activeLevel, search]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handlePress = (id: string) => {
    const resource = FRENCH_RESOURCES.find(r => r.id === id);
    if (!resource) return;

    if (resource.format === 'video' && resource.lessons?.length) {
      router.push({ pathname: '/(standalone)/frenchLesson/[id]', params: { id } });
    } else {
      router.push({ pathname: '/(standalone)/frenchResource/[id]', params: { id } });
    }
  };

  return (
    // ✅ position: 'relative' so the VoiceOrb can be positioned absolutely inside
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <ScreenHeader
        variant="page"
        title="Learn French — Free"
        subtitle="A1 to B2 · English translations included"
        icon="book.fill"
      />

      {/* Search bar */}
  <View style={[styles.searchRow, { backgroundColor: C.surface, borderColor: C.border }]}>
        <Ionicons name="search" size={15} color={C.textMuted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search resources…"
          placeholderTextColor={C.textMuted}
          style={[styles.searchInput, { color: C.textPrimary }]}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close" size={15} color={C.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Level filter pills */}
      <LevelFilterBar value={activeLevel} onChange={setActiveLevel} />

      {/* Result count */}
      <Text style={[styles.resultCount, { color: C.textMuted }]}>
        {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
        {activeLevel !== 'All' ? ` for ${activeLevel}` : ''}
      </Text>

      {/* Resource list — extra bottom padding so last card isn't hidden by orb */}
      <FlatList
        data={filtered}
        keyExtractor={r => r.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 120 }, // ✅ space for VoiceOrb
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyEmoji}>🇫🇷</Text>
            <Text style={[styles.emptyText, { color: C.textMuted }]}>
              No resources found. Try a different filter.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ResourceCard item={item} onPress={() => handlePress(item.id)} />
        )}
      />

      {/* ✅ AI Tutor floating orb */}
      {/* OTA Update: Add VoiceOrb */}
      <VoiceOrb 
        style={{
          bottom: insets.bottom + 104,   // ↑ adjust this to move it up/down
          right:  24,                   // → adjust this to move it left/right
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root:        { flex: 1 },
  searchRow: {
    flexDirection:    'row',
    alignItems:       'center',
    gap:              8,
    marginHorizontal: 16,
    marginTop:        12,
    borderWidth:      0.5,
    borderRadius:     10,
    paddingHorizontal:12,
    paddingVertical:  9,
  },
  searchIcon:  { fontSize: 15 },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: 0 },
  clearBtn:    { fontSize: 15 },
  resultCount: { fontSize: 12, paddingHorizontal: 16, paddingBottom: 4 },
  list:        { padding: 16, gap: 12 },
  emptyWrap:   { alignItems: 'center', marginTop: 80, gap: 12 },
  emptyEmoji:  { fontSize: 40 },
  emptyText:   { fontSize: 14, textAlign: 'center' },
});