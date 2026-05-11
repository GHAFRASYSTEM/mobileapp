// ─────────────────────────────────────────────
//  PlaceModal.tsx  –  Bottom-sheet modal for place detail
// ─────────────────────────────────────────────
import type { PlaceItem } from "@/assets/data/tourData/tourTypes";
import { useColors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");

interface Props {
  place: PlaceItem | null;
  visible: boolean;
  onClose: () => void;
}

export default function PlaceModal({ place, visible, onClose }: Props) {
  const C = useColors();

  if (!place) return null;

  const isGhana = place.country === "ghana";

  const stripeColors: [string, string, string] = isGhana
    ? ["#CE1126", "#FCD116", "#006B3F"]
    : ["#002395", "#FFFFFF", "#ED2939"];

  const badgeBg = isGhana ? C.primarySubtle : C.blueSubtle;
  const badgeText = isGhana ? C.primary : C.blue;
  const ctaBg = isGhana ? C.primary : C.blue;
  const tipsBorderColor = isGhana ? C.gold : C.blue;

  const ratingStars = "★★★★★".slice(0, Math.round(Number(place.rating)));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* ── Dim overlay: only tapping THIS backdrop closes the modal ── */}
      <View style={styles.overlay}>
        <Pressable style={styles.backdropHitArea} onPress={onClose} />

        {/* ── Sheet: sits above the backdrop, does NOT propagate taps up ── */}
        <View style={[styles.sheet, { backgroundColor: C.background }]}>
          {/* Drag Handle */}
          <View style={[styles.handle, { backgroundColor: C.border }]} />

          {/* ── Scrollable Content ── */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces
            nestedScrollEnabled       // ← critical on Android
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Hero Image */}
            <View style={styles.heroWrap}>
              <Image
                source={{ uri: place.imageUrl }}
                style={styles.heroImage}
                resizeMode="cover"
              />

              <LinearGradient
                colors={stripeColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.countryStripe}
              />

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={onClose}
                hitSlop={12}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>

              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.35)"]}
                style={styles.heroOverlay}
              />
            </View>

            {/* Main Content */}
            <View style={styles.body}>
              {/* Pre-title */}
              <Text style={[styles.preTitle, { color: C.textMuted }]}>
                {place.pretitle ??
                  (isGhana
                    ? `🇬🇭 Ghana · ${place.type}`
                    : `🇫🇷 France · ${place.type}`)}
              </Text>

              {/* Title */}
              <Text style={[styles.title, { color: C.textPrimary }]}>
                {place.name}
              </Text>

              {/* Rating */}
              <View style={styles.ratingRow}>
                <Text style={[styles.stars, { color: C.gold }]}>
                  {ratingStars}
                </Text>
                <Text style={[styles.ratingCount, { color: C.textMuted }]}>
                  {"  "}
                  {typeof place.reviews === "number"
                    ? `${place.reviews.toLocaleString()} reviews`
                    : place.reviews}
                </Text>

                <View
                  style={[
                    styles.badge,
                    { backgroundColor: badgeBg, marginLeft: "auto" },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: badgeText }]}>
                    {isGhana ? "🇬🇭 Ghana" : "🇫🇷 France"}
                  </Text>
                </View>
              </View>

              {/* Description */}
              <Text style={[styles.desc, { color: C.textSecondary }]}>
                {place.desc}
              </Text>

              {/* Gallery */}
              <Text style={[styles.sectionLabel, { color: C.textPrimary }]}>
                📸 Gallery
              </Text>
              <View style={styles.galleryGrid}>
                {place.gallery.map((g, i) => (
                  <View key={i} style={styles.galleryItem}>
                    <Image
                      source={{ uri: g.imageUrl }}
                      style={styles.galleryImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.65)"]}
                      style={styles.galleryCapOverlay}
                    >
                      <Text style={styles.galleryCaption}>{g.caption}</Text>
                    </LinearGradient>
                  </View>
                ))}
              </View>

              {/* Practical Info */}
              <Text style={[styles.sectionLabel, { color: C.textPrimary }]}>
                🧭 Practical Info
              </Text>
              <View style={styles.chipsRow}>
                {place.chips.map((chip, i) => (
                  <View
                    key={i}
                    style={[
                      styles.chip,
                      { backgroundColor: C.surface, borderColor: C.border },
                    ]}
                  >
                    <Text style={[styles.chipText, { color: C.textSecondary }]}>
                      {chip}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Tips */}
              <View
                style={[
                  styles.tipsBox,
                  {
                    backgroundColor: C.surface,
                    borderLeftColor: tipsBorderColor,
                  },
                ]}
              >
                <Text style={[styles.tipsTitle, { color: C.textPrimary }]}>
                  💡 Local Tips
                </Text>
                {place.tips.map((tip, i) => (
                  <View key={i} style={styles.tipRow}>
                    <Text style={[styles.tipArrow, { color: C.textMuted }]}>
                      →
                    </Text>
                    <Text style={[styles.tipText, { color: C.textSecondary }]}>
                      {tip}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={{ height: 40 }} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.62)",
    justifyContent: "flex-end",
  },

  // Full-screen invisible tap target BEHIND the sheet → closes modal
  backdropHitArea: {
    ...StyleSheet.absoluteFillObject,
  },

  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "92%",
    // ← overflow:hidden REMOVED: it clips the ScrollView's touch responder on Android
  },

  scrollContent: {
    paddingBottom: 30,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },

  // Hero
  heroWrap: {
    position: "relative",
    height: 260,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  countryStripe: {
    height: 6,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  closeBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  // Body
  body: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  preTitle: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontFamily: "PlayfairDisplay-Bold",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stars: { fontSize: 15 },
  ratingCount: { fontSize: 13 },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11.5,
    fontWeight: "600",
  },
  desc: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13.5,
    fontWeight: "700",
    marginBottom: 10,
  },

  // Gallery
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  galleryItem: {
    width: (SCREEN_W - 50) / 2,
    height: 110,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
  },
  galleryCapOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 24,
  },
  galleryCaption: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // Chips & Tips
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: "500",
  },

  tipsBox: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  tipRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 5,
  },
  tipArrow: { fontSize: 13 },
  tipText: {
    fontSize: 13.5,
    flex: 1,
    lineHeight: 19,
  },

});