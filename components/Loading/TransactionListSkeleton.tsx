import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useColors } from '@/constants/Colors';

const SKELETON_COUNT = 6; // number of placeholder rows to show

export default function TransactionListSkeleton() {
  const C = useColors();

  const renderSkeletonRow = () => (
    <View style={[styles.row, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
      {/* Icon placeholder */}
      <View style={[styles.iconBox, { backgroundColor: C.border }]} />

      {/* Info placeholder */}
      <View style={styles.info}>
        <View style={styles.infoTop}>
          <View style={[styles.labelSkeleton, { backgroundColor: C.border }]} />
          <View style={[styles.pillSkeleton, { backgroundColor: C.border }]} />
        </View>
        <View style={styles.infoBottom}>
          <View style={[styles.dateSkeleton, { backgroundColor: C.border }]} />
          <View style={[styles.statusSkeleton, { backgroundColor: C.border }]} />
        </View>
      </View>

      {/* Amount placeholder */}
      <View style={[styles.amountSkeleton, { backgroundColor: C.border }]} />
    </View>
  );

  return (
    <FlatList
      data={Array.from({ length: SKELETON_COUNT })}
      keyExtractor={(_, i) => `skeleton-${i}`}
      renderItem={renderSkeletonRow}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 40, gap: 12 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  row:        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 12, borderBottomWidth: 1, borderRadius: 12 },
  iconBox:    { width: 42, height: 42, borderRadius: 12 },
  info:       { flex: 1, gap: 4 },
  infoTop:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoBottom: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  labelSkeleton: { flex: 1, height: 12, borderRadius: 4 },
  pillSkeleton:  { width: 60, height: 12, borderRadius: 20 },
  dateSkeleton:  { width: 80, height: 10, borderRadius: 4 },
  statusSkeleton:{ width: 50, height: 10, borderRadius: 4 },
  amountSkeleton:{ width: 80, height: 14, borderRadius: 4 },
});