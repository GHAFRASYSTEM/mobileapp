import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';
import { useColors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabIconProps = { focused: boolean; icon: string; label: string };

function TabItem({ focused, icon, label }: TabIconProps) {
  const C = useColors();

  const iconName = focused ? icon : `${icon}-outline`;

  return (
    <View style={styles.item}>
      <View
        style={[
          styles.pill,
          { backgroundColor: focused ? C.tabActive : 'transparent' },
        ]}
      >
        <Ionicons
          size={24}
          name={iconName as any}
          color={focused ? C.textInverse : C.tabInactive}
        />
      </View>

      <Text
        numberOfLines={1}
        style={[
          styles.label,
          focused
            ? { color: C.tabActive, fontWeight: '700' }
            : { color: C.tabInactive, fontWeight: '400' },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const C = useColors();
  const insets = useSafeAreaInsets();

  const bottomMargin = Platform.OS === 'android'
    ? insets.bottom > 0
      ? insets.bottom + 8
      : 16
    : 28;

  const tabBarStyle = {
    backgroundColor: C.tabBar,
    borderRadius: 28,
    marginHorizontal: 14,
    marginBottom: bottomMargin,
    height: 68,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 } as const,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
    borderTopWidth: 0,
    position: 'absolute' as const,
    borderWidth: 1,
    borderColor: C.border,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} icon="home" label="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="(card)/index"
        options={{
          title: 'My Card',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} icon="card" label="My Card" />
          ),
        }}
      />

      <Tabs.Screen
        name="(community)"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} icon="people" label="Explore" />
          ),
        }}
      />

      <Tabs.Screen
        name="(learn)/index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} icon="book" label="Learn" />
          ),
        }}
      />

      <Tabs.Screen
        name="(more)"
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              icon="ellipsis-horizontal-circle"
              label="More"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: 35,
    minWidth: 56,
  },
  pill: {
    width: 44,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.2,
    lineHeight: 13,
  },
});