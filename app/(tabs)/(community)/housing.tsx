import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, StatusBar, RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors }         from '@/constants/Colors';
import { useHousingList } from '@/hooks/useHousing';
import CityFilter            from '@/components/Selectors/CityFilter';
import ScreenHeader          from '@/components/Headers/ScreenHeader';
import HousingCard           from '@/components/Cards/HousingCard';
import HousingCardSkeleton   from '@/components/Loading/HousingCardSkeleton';
import { useRouter }         from 'expo-router';

const CITY_FILTERS = ['All', 'Lille', 'Paris', 'Lyon', 'Bordeaux', 'Marseille'];

function SkeletonList() {
  return (
    <View style={{ gap: 16 }}>
      {[...Array(5)].map((_, i) => <HousingCardSkeleton key={i} />)}
    </View>
  );
}

export default function HousingScreen() {
  const router   = useRouter();
  const C        = useColors();
  const insets   = useSafeAreaInsets();
  const [city, setCity] = useState('All');

  const { data, loading, error, setFilters, refetch } = useHousingList();

  // Keep city filter in sync with API
  const handleCityChange = useCallback((selected: string) => {
    setCity(selected);
    setFilters({ city: selected === 'All' ? undefined : selected });
  }, [setFilters]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const listings = data?.housing ?? [];

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <ScreenHeader
        variant="page"
        title="Housing"
        subtitle="Listings shared by the community"
        icon="house.fill"
      />

      <CityFilter
        filters={CITY_FILTERS}
        value={city}
        onChange={handleCityChange}
      />

      {loading && !refreshing ? (
        <View style={[styles.list, { paddingBottom: insets.bottom + 24 }]}>
          <SkeletonList />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={[styles.empty, { color: C.textMuted }]}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={h => h.id}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={C.primary}
            />
          }
          ListEmptyComponent={
            <Text style={[styles.empty, { color: C.textMuted }]}>
              No listings {city !== 'All' ? `in ${city}` : 'found'} yet.
            </Text>
          }
          renderItem={({ item }) => (
            <HousingCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: '/(standalone)/housingDetail/[id]',
                  params:   { id: item.id },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root:     { flex: 1 },
  list:     { padding: 16, gap: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  empty:    { textAlign: 'center', marginTop: 60, fontSize: 14 },
});