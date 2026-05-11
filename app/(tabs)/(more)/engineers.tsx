import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ScreenHeader from '@/components/Headers/ScreenHeader';
import { useColors } from '@/constants/Colors';
import { ENGINEERS } from '@/assets/data/engineerData';
import EngineerCard from '@/components/Cards/EngineeringCard';
import EngineerModal from '@/components/modals/EngineeringModal';
import type { Engineer } from '@/assets/data/engineerData';

export default function EngineersScreen() {
  const C = useColors();
  const [selected, setSelected] = useState<Engineer | null>(null);

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <ScreenHeader
        variant="page"
        title="Software Engineers"
        subtitle="Meet the talented minds behind GHAFRA's digital innovation"
        icon="person.3.fill"
      />

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {ENGINEERS.map((eng, index) => (
          <EngineerCard
            key={eng.id}
            engineer={eng}
            index={index}
            onPress={() => setSelected(eng)}
            C={C}
          />
        ))}
      </ScrollView>

      <EngineerModal
        engineer={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
        C={C}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: {
    paddingTop: 16,
    paddingBottom: 100,
  },
});