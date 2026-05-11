// ─────────────────────────────────────────────
//  PlaceCard.tsx  –  Horizontal scroll card for a place/attraction
// ─────────────────────────────────────────────
import type { PlaceItem } from "@/assets/data/tourData/tourTypes";
import { useColors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  item: PlaceItem;
  onPress: (id: string) => void;
}

export default function PlaceCard({ item, onPress }: Props) {
  const C = useColors();

  const isGhana = item.country === "ghana";
  const badgeStyle = isGhana
    ? { bg: C.primarySubtle, text: C.primary }
    : { bg: C.blueSubtle, text: C.blue };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: C.surface, opacity: pressed ? 0.93 : 1 },
      ]}
      onPress={() => onPress(item.id)}
    >
      {/* Hero Image */}
      <View style={styles.heroWrap}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Dark overlay for better text visibility */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.45)"]}
          style={styles.imageOverlay}
        />

        {/* Type label bottom-left */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeLabel}>{item.type}</Text>
        </View>

        {/* Country flag emoji top-right */}
        <View style={styles.countryBadge}>
          <Text style={styles.countryEmoji}>
            {isGhana ? "🇬🇭" : "🇫🇷"}
          </Text>
        </View>
      </View>

      {/* Card Body */}
      <View style={styles.body}>
        <Text style={[styles.name, { color: C.textPrimary }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.location, { color: C.textMuted }]}>
          📍 {item.location}
        </Text>

        {/* Rating row */}
        <View style={styles.ratingRow}>
          <Text style={[styles.star, { color: C.gold }]}>★</Text>
          <Text style={[styles.ratingNum, { color: C.textPrimary }]}>
            {item.rating}
          </Text>
          <Text style={[styles.ratingCount, { color: C.textMuted }]}>
            {"  "}
            {typeof item.reviews === "number"
              ? `(${item.reviews.toLocaleString()})`
              : `(${item.reviews})`}
          </Text>

          {/* Type badge on the right */}
          <View
            style={[
              styles.badge,
              { backgroundColor: badgeStyle.bg, marginLeft: "auto" },
            ]}
          >
            <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
              {item.type}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  heroWrap: {
    position: "relative",
    height: 140,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Badges
  typeBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeLabel: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  countryBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  countryEmoji: {
    fontSize: 16,
  },

  // Body
  body: {
    padding: 12,
  },
  name: {
    fontFamily: "PlayfairDisplay-Bold",
    fontSize: 14.5,
    fontWeight: "700",
    lineHeight: 19,
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 14,
    marginRight: 2,
  },
  ratingNum: {
    fontSize: 13,
    fontWeight: "600",
  },
  ratingCount: {
    fontSize: 11.5,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 2.5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
});