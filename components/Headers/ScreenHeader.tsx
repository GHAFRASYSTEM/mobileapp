import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, Href } from "expo-router"; // ✅ import Href
import { useColors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

type Props = {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
  backRoute?: Href; // ✅ FIXED typing
};

export default function ScreenHeader({
  title,
  showBack = true,
  right,
  backRoute, // ✅ FIXED destructuring
}: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (backRoute) {
      router.replace(backRoute); // ✅ type-safe
    } else if (router.canGoBack()) {
      router.back(); // ✅ safe fallback
    } else {
      router.push("/(tabs)/(home)"); // ✅ fallback if no history
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <View
        style={[
          styles.header,
          { backgroundColor: C.header, paddingTop: insets.top + 8 },
        ]}
      >
        {showBack ? (
          <TouchableOpacity onPress={handleBack} style={styles.side}>
            <IconSymbol name="chevron.left" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.side} />
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.side}>{right}</View>
      </View>

      <View style={[styles.goldBar, { backgroundColor: C.gold }]} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  side: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  goldBar: {
    height: 3,
  },
});