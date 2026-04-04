import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/constants/Colors';

type TabIconProps = {
  focused: boolean;
  icon: string;
  label: string;
};

function TabItem({ focused, icon, label }: TabIconProps) {
  const C = useColors();

  return (
    <View style={styles.item}>
      {/* Icon pill */}
      <View
        style={[
          styles.pill,
          focused
            ? { backgroundColor: C.tabActive }
            : { backgroundColor: 'transparent' },
        ]}
      >
        <IconSymbol
          size={30}
          name={icon}
          color={focused ? C.textInverse : C.tabInactive}
        />
      </View>

      {/* Label — bold + primary when active, muted when not */}
      <Text
        style={[
          styles.label,
          focused
            ? { color: C.tabActive,   fontWeight: '700' }
            : { color: C.tabInactive, fontWeight: '400' },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const C = useColors();

  const TABS = [
    { name: '(home)/index',      label: 'Home',    icon: 'square.grid.2x2.fill' },
    { name: '(card)/index',      label: 'My Card', icon: 'creditcard.fill'       },
    { name: '(community)', label: 'Explore', icon: 'person.2.fill'         },
    { name: '(learn)/index',     label: 'Learn',   icon: 'books.vertical.fill'   },
    { name: '(more)',            label: 'More',    icon: 'ellipsis.circle.fill'  },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        // Hide the native label — we render our own inside TabItem
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: C.tabBar,
          borderRadius: 28,
          marginHorizontal: 14,
          marginBottom: Platform.OS === 'ios' ? 28 : 16,
          height: 68,
          paddingHorizontal: 6,
          // Shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 12,
          borderTopWidth: 0,
          position: 'absolute',
          // Subtle border
          borderWidth: 1,
          borderColor: C.border,
        },
      }}
    >
      {TABS.map(({ name, label, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ focused }) => (
              <TabItem focused={focused} icon={icon} label={label} />
            ),
          }}
        />
      ))}
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

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 1,
  },
});