import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import ScreenHeader   from '@/components/Headers/ScreenHeader';
import ExecutiveCard  from '@/components/Cards/ExecutiveCard';
import ExecutiveModal from '@/components/modals/ExecutiveModal';
import { EXECUTIVES } from '@/assets/data/executivesData';
import type { Executive } from '@/assets/data/executivesData';

export default function ExecutivesScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Executive | null>(null);

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

      <ScreenHeader
        variant="page"
        title="Executive Board"
        subtitle={`${EXECUTIVES.length} members · GHAFRA leadership`}
        icon="person.3.fill"
      />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {EXECUTIVES.map((exec, index) => (
          <ExecutiveCard
            key={exec.id}
            executive={exec}
            onPress={() => setSelected(exec)}
            C={C}
            index={index}
          />
        ))}
      </ScrollView>

      <ExecutiveModal
        executive={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
        C={C}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1 },
  scroll: { paddingTop: 12, paddingBottom: 8 },
});