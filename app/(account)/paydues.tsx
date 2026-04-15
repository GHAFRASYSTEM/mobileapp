import React, { useState }        from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets }       from 'react-native-safe-area-context';
import { useColors }               from '@/constants/Colors';
import ScreenHeader                from '@/components/Headers/ScreenHeader';
import { DuesTab } from '@/components/Tabs/DuesTab';
import { DonationTab } from '@/components/Tabs/DonationTab';

type Tab = 'dues' | 'donate';

const TABS: { key: Tab; label: string }[] = [
 
  { key: 'dues',   label: 'Monthly Dues' },
  { key: 'donate', label: 'Donate'       },
];

export default function PayDuesScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<Tab>('dues');

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <ScreenHeader title="Dues & Donations" showBack />

      {/* Tab bar */}
      <View style={[styles.tabBar, { backgroundColor: C.surface, borderColor: C.border }]}>
        {TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, active && { backgroundColor: C.primary }]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, { color: active ? '#fff' : C.textMuted }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'dues'   && <DuesTab />}
        {activeTab === 'donate' && <DonationTab />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1 },
  scroll:  { padding: 20, gap: 16 },

  tabBar:  {
    flexDirection:    'row',
    marginHorizontal: 20,
    marginVertical:   12,
    borderRadius:     12,
    borderWidth:      1,
    padding:          3,
    gap:              3,
  },
  tab:     {
    flex:            1,
    alignItems:      'center',
    paddingVertical: 10,
    borderRadius:    10,
  },
  tabText: { fontSize: 13, fontWeight: '700' },
});