// ─────────────────────────────────────────────
//  Tour.tsx  –  Tour & Explore main screen
// ─────────────────────────────────────────────
import { useColors } from "@/constants/Colors";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PlaceCard from "@/components/Cards/PlaceCard";
import ScreenHeader from "@/components/Headers/ScreenHeader";
import PlaceModal from "@/components/modals/PlaceModal";
import CountrySection from "@/components/Sections/CountrySection";

import {
  ALL_PLACES,
  FILTER_PILLS,
  type FilterTag,
  type PlaceItem,
} from "@/assets/data/tourData/tourData";

import { GHANA_PLACES } from "@/assets/data/tourData/ghanaPlaces";
import { FRANCE_PLACES } from "@/assets/data/tourData/francePlaces";

// ── Filter logic ──────────────────────────────
function applyFilter(
  places: PlaceItem[],
  filter: FilterTag,
  query: string
): PlaceItem[] {
  let filtered = [...places];

  // Country & Category filters
  if (filter === "ghana") {
    filtered = filtered.filter((p) => p.country === "ghana");
  }
  if (filter === "france") {
    filtered = filtered.filter((p) => p.country === "france");
  }
  if (filter === "culture") {
    filtered = filtered.filter((p) =>
      ["Culture", "History", "Landmark"].includes(p.type)
    );
  }
  if (filter === "nature") {
    filtered = filtered.filter((p) =>
      ["Nature", "Wildlife"].includes(p.type)
    );
  }
  if (filter === "food") {
    filtered = filtered.filter((p) => p.type === "Food");
  }

  // Search query
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
  }

  return filtered;
}

// ─────────────────────────────────────────────
export default function Tour() {
  const C = useColors();

  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPlace = selectedId ? ALL_PLACES[selectedId] ?? null : null;

  // Filtered lists
  const ghanaPlaces = useMemo(
    () => applyFilter(GHANA_PLACES, activeFilter, query),
    [activeFilter, query]
  );

  const francePlaces = useMemo(
    () => applyFilter(FRANCE_PLACES, activeFilter, query),
    [activeFilter, query]
  );

  // Control section visibility
  const showGhana = activeFilter !== "france" && activeFilter !== "food";
  const showFrance = activeFilter !== "ghana" && activeFilter !== "food";

  // Pill styling
  const getPillStyle = (id: FilterTag) => {
    const isActive = id === activeFilter;

    if (!isActive) {
      return { bg: C.surface, text: C.textSecondary, border: C.border };
    }
    if (id === "ghana") {
      return { bg: "#E67E22", text: "#fff", border: "#E67E22" }; // Ghana orange
    }
    if (id === "france") {
      return { bg: "#2980B9", text: "#fff", border: "#2980B9" }; // France blue
    }
    return { bg: C.primary, text: "#fff", border: C.primary };
  };

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      {/* Header */}
      <ScreenHeader
        variant="page"
        icon="airplane"
        subtitle="Travel across France and Ghana, experience local culture, and uncover amazing places"
        title="Tour & Explore"
      />

      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* Search Bar */}
        <View style={styles.searchWrap}>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: C.surface, borderColor: C.border },
            ]}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: C.textPrimary }]}
              placeholder="Search places, locations..."
              placeholderTextColor={C.textMuted}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Text style={{ color: C.textMuted, fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          {FILTER_PILLS.map((pill) => {
            const ps = getPillStyle(pill.id);
            return (
              <TouchableOpacity
                key={pill.id}
                style={[
                  styles.pill,
                  { backgroundColor: ps.bg, borderColor: ps.border },
                ]}
                onPress={() => setActiveFilter(pill.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.pillText, { color: ps.text }]}>
                  {pill.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Ghana Section */}
        {showGhana && (
          <>
            <CountrySection country="ghana" placeCount={ghanaPlaces.length} />

            {ghanaPlaces.length > 0 ? (
              <FlatList
                data={ghanaPlaces}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsRow}
                renderItem={({ item }) => (
                  <PlaceCard item={item} onPress={setSelectedId} />
                )}
              />
            ) : (
              <Text style={[styles.emptyMsg, { color: C.textMuted }]}>
                No Ghana destinations match your search.
              </Text>
            )}

            <View style={[styles.divider, { backgroundColor: C.border }]} />
          </>
        )}

        {/* France Section */}
        {showFrance && (
          <>
            <CountrySection country="france" placeCount={francePlaces.length} />

            {francePlaces.length > 0 ? (
              <FlatList
                data={francePlaces}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsRow}
                renderItem={({ item }) => (
                  <PlaceCard item={item} onPress={setSelectedId} />
                )}
              />
            ) : (
              <Text style={[styles.emptyMsg, { color: C.textMuted }]}>
                No French destinations match your search.
              </Text>
            )}
          </>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Place Detail Modal */}
      <PlaceModal
        place={selectedPlace}
        visible={!!selectedId}
        onClose={() => setSelectedId(null)}
      />
    </View>
  );
}

// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1 },

  searchWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: { fontSize: 18 },
  searchInput: {
    flex: 1,
    fontFamily: "DMSans-Regular",
    fontSize: 15,
  },

  pillsRow: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  pillText: {
    fontSize: 13.5,
    fontWeight: "600",
  },

  cardsRow: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },

  emptyMsg: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 14,
    fontStyle: "italic",
  },

  divider: {
    height: 1,
    marginHorizontal: 20,
    marginVertical: 12,
  },
});