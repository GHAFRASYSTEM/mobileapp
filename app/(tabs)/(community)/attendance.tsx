import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
  ActivityIndicator, RefreshControl, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import ScreenHeader from '@/components/Headers/ScreenHeader';
import AttendanceStatusCard from '@/components/Cards/AttendanceStatusCard';
import AttendanceHistoryList from '@/components/Lists/AttendanceHistoryList';
import { useAttendance } from '@/hooks/attendance/useAttendance';

export default function AttendanceScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();
  const {
    year, status, history, loading, refreshing, loadError,
    opening, feedback, openWebsite, refresh, retryLoad, clearFeedback,
  } = useAttendance();

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <ScreenHeader title="Attendance" showBack backRoute="/(tabs)/(community)" />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={C.primary} />
        </View>
      ) : loadError || !status ? (
        <View style={styles.center}>
          <Text style={[styles.errTitle, { color: C.textPrimary }]}>
            {loadError?.title ?? "Attendance couldn't be loaded"}
          </Text>
          <Text style={[styles.errMsg, { color: C.textSecondary }]}>
            {loadError?.message ?? 'Try again in a moment.'}
          </Text>
          <TouchableOpacity
            onPress={retryLoad}
            style={[styles.retryBtn, { backgroundColor: C.primary }]}
            activeOpacity={0.85}
          >
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 80 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={C.primary} />
          }
        >
          <Text style={[styles.sectionTitle, { color: C.textPrimary }]}>This month</Text>
          <AttendanceStatusCard
            status={status}
            opening={opening}
            feedback={feedback}
            onMark={openWebsite}
            onDismiss={clearFeedback}
          />

          <Text style={[styles.sectionTitle, styles.historyTitle, { color: C.textPrimary }]}>
            {year} history
          </Text>
          <AttendanceHistoryList items={history} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root:         { flex: 1 },
  scroll:       { padding: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 10, letterSpacing: -0.2 },
  historyTitle: { marginTop: 24 },

  center:       { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  errTitle:     { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  errMsg:       { fontSize: 13, textAlign: 'center' },
  retryBtn:     { marginTop: 8, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  retryText:    { color: '#fff', fontWeight: '800' },
});
