import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/constants/Colors';

export default function TabLayout() {
  const C = useColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: C.tabActive,
        tabBarInactiveTintColor: C.tabInactive,
        tabBarStyle: {
          backgroundColor: C.tabBar,
          borderRadius: 32,
          marginHorizontal: 16,
          marginBottom: 24,
          height: 72,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
          borderTopWidth: 0,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconWrap,
              { backgroundColor: focused ? C.tabActive : 'transparent' },
            ]}>
              <IconSymbol
                size={22}
                name="square.grid.2x2.fill"
                color={focused ? C.textInverse : C.tabInactive}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="(card)/index"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconWrap,
              { backgroundColor: focused ? C.tabActive : 'transparent' },
            ]}>
              <IconSymbol
                size={22}
                name="person"
                color={focused ? C.textInverse : C.tabInactive}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="(community)/index"
        options={{
          title: 'Community',
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconWrap,
              { backgroundColor: focused ? C.tabActive : 'transparent' },
            ]}>
              <IconSymbol
                size={22}
                name="calendar"
                color={focused ? C.textInverse : C.tabInactive}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="(learn)/index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconWrap,
              { backgroundColor: focused ? C.tabActive : 'transparent' },
            ]}>
              <IconSymbol
                size={22}
                name="desktopcomputer"
                color={focused ? C.textInverse : C.tabInactive}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="(more)"
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconWrap,
              { backgroundColor: focused ? C.tabActive : 'transparent' },
            ]}>
              <IconSymbol
                size={22}
                name="clock"
                color={focused ? C.textInverse : C.tabInactive}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});