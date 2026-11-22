import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
  ActivityIndicator, RefreshControl, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
    year, current, history, loading, refreshing, meetingError, historyError,
    code, setCode, phase, feedback, submit, refresh, retryLoad, clearFeedback,
  } = useAttendance();

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <ScreenHeader title="Attendance" showBack backRoute="/(tabs)/(community)" />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={C.primary} />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.root}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 80 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={C.primary} />
            }
          >
            <Text style={[styles.sectionTitle, { color: C.textPrimary }]}>
              {current?.isToday ? "Today's meeting" : 'Next meeting'}
            </Text>

            {current ? (
              <AttendanceStatusCard
                current={current}
                code={code}
                onChangeCode={setCode}
                phase={phase}
                feedback={feedback}
                onSubmit={submit}
                onDismiss={clearFeedback}
              />
            ) : meetingError ? (
              <InfoCard
                icon="error-outline"
                iconColor={C.textDanger}
                title={meetingError.title}
                message={meetingError.message}
                onRetry={meetingError.action === 'retry' ? retryLoad : undefined}
              />
            ) : (
              <InfoCard
                icon="event-busy"
                iconColor={C.textMuted}
                title="No upcoming meeting"
                message="The next meeting will show up here once it is scheduled. Pull down to refresh."
              />
            )}

            <Text style={[styles.sectionTitle, styles.historyTitle, { color: C.textPrimary }]}>
              {year} history
            </Text>
            <AttendanceHistoryList data={history} error={historyError} onRetry={retryLoad} />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

function InfoCard({
  icon, iconColor, title, message, onRetry,
}: {
  icon:      React.ComponentProps<typeof MaterialIcons>['name'];
  iconColor: string;
  title:     string;
  message:   string;
  onRetry?:  () => void;
}) {
  const C = useColors();
  return (
    <View style={[styles.info, { backgroundColor: C.surface, borderColor: C.border }]}>
      <MaterialIcons name={icon} size={28} color={iconColor} />
      <Text style={[styles.errTitle, { color: C.textPrimary }]}>{title}</Text>
      <Text style={[styles.errMsg, { color: C.textSecondary }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.retryBtn, { backgroundColor: C.primary }]}
          activeOpacity={0.85}
        >
          <Text style={[styles.retryText, { color: C.textInverse }]}>Try again</Text>
        </TouchableOpacity>
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
  info:         { alignItems: 'center', gap: 6, padding: 24, borderRadius: 18, borderWidth: 1 },
  errTitle:     { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  errMsg:       { fontSize: 13, textAlign: 'center', lineHeight: 18 },
  retryBtn:     { marginTop: 8, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  retryText:    { fontWeight: '800' },
});
