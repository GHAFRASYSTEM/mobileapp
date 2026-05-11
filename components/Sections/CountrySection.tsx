// ─────────────────────────────────────────────
//  CountrySection.tsx  –  Section header + stripe per country
// ─────────────────────────────────────────────
import type { Country } from "@/assets/data/tourData/tourData";
import { useColors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  country: Country;
  placeCount?: number;
}

export default function CountrySection({ country, placeCount }: Props) {
  const C = useColors();
  const isGhana = country === "ghana";

  const stripeColors: [string, string, string] = isGhana
    ? ["#CE1126", "#FCD116", "#006B3F"]
    : ["#002395", "#FFFFFF", "#ED2939"];

  const regionLabel = isGhana ? "West Africa" : "Western Europe";
  const countryName = isGhana ? "Ghana" : "France";
  const accentColor = isGhana ? C.primary : C.blue;

  return (
    <>
      {/* Section header row */}
      <View style={styles.header}>
        {/* Flag tile */}
        <View style={styles.flagWrap}>
          {isGhana ? (
            // Ghana: horizontal stripes (red top, gold middle, green bottom) + black star
            <View style={styles.ghanaFlag}>
              <View
                style={[styles.ghanaStripe, { backgroundColor: "#CE1126" }]}
              />
              <View
                style={[styles.ghanaStripe, { backgroundColor: "#FCD116" }]}
              />
              <View
                style={[styles.ghanaStripe, { backgroundColor: "#006B3F" }]}
              />
              <Text style={styles.ghStar}>★</Text>
            </View>
          ) : (
            // France: vertical stripes (blue, white, red) — flexDirection row
            <View style={styles.franceFlag}>
              <View
                style={[styles.franceStripe, { backgroundColor: "#002395" }]}
              />
              <View
                style={[styles.franceStripe, { backgroundColor: "#FFFFFF" }]}
              />
              <View
                style={[styles.franceStripe, { backgroundColor: "#ED2939" }]}
              />
            </View>
          )}
        </View>

        {/* Labels */}
        <View style={styles.labels}>
          <Text style={[styles.region, { color: accentColor }]}>
            {regionLabel}
          </Text>
          <Text style={[styles.countryName, { color: C.textPrimary }]}>
            {countryName}
          </Text>
        </View>

        {/* Place count */}
        {placeCount !== undefined && (
          <Text style={[styles.count, { color: C.textMuted }]}>
            {placeCount} places
          </Text>
        )}
      </View>

      {/* Colour stripe */}
      <LinearGradient
        colors={stripeColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.stripe, isGhana ? undefined : styles.stripeFrBorder]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  flagWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: "hidden",
  },
  // Ghana flag — column layout so stripes stack top→bottom
  ghanaFlag: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    position: "relative",
  },
  ghanaStripe: {
    flex: 1,
    width: "100%",
  },
  // France flag — row layout so stripes sit left→right
  franceFlag: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  franceStripe: {
    flex: 1,
    height: "100%",
  },
  ghStar: {
    position: "absolute",
    // Centre the star over the gold middle stripe
    top: "50%",
    left: "50%",
    marginTop: -10,
    marginLeft: -8,
    fontSize: 17,
    lineHeight: 20,
    color: "#000000", // Ghana star is black
    fontWeight: "900",
  },
  labels: {
    flex: 1,
  },
  region: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  countryName: {
    fontFamily: "PlayfairDisplay-Bold",
    fontSize: 20,
    fontWeight: "700",
  },
  count: {
    fontSize: 12,
    fontWeight: "500",
  },
  stripe: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 20,
    marginBottom: 18,
  },
  stripeFrBorder: {
    borderWidth: 0.5,
    borderColor: "#E8E6DF",
  },
});
