import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import { formatMeetingDay } from '@/utils/attendanceDate';
import type { MyAttendance, AttendanceFeedback } from '@/types/attendance';

type Props = {
  data:    MyAttendance | null;
  error:   AttendanceFeedback | null;
  onRetry: () => void;
};

export default function AttendanceHistoryList({ data, error, onRetry }: Props) {
  const C = useColors();

  // ── Error ──────────────────────────────────────────────────────────────────
  if (!data) {
    return (
      <View style={[styles.empty, { backgroundColor: C.surface, borderColor: C.border }]}>
        <MaterialIcons name="error-outline" size={28} color={C.textDanger} />
        <Text style={[styles.emptyTitle, { color: C.textPrimary }]}>
          {error?.title ?? "Your history couldn't be loaded"}
        </Text>
        <Text style={[styles.emptyMsg, { color: C.textMuted }]}>
          {error?.message ?? 'Try again in a moment.'}
        </Text>
        <TouchableOpacity onPress={onRetry} style={styles.retry} activeOpacity={0.7}>
          <Text style={[styles.retryText, { color: C.primary }]}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const meetingCount = data.months.reduce((n, m) => n + m.meetings.length, 0);

  // ── Empty ──────────────────────────────────────────────────────────────────
  if (meetingCount === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: C.surface, borderColor: C.border }]}>
        <MaterialIcons name="event-available" size={28} color={C.textMuted} />
        <Text style={[styles.emptyTitle, { color: C.textPrimary }]}>No meetings yet</Text>
        <Text style={[styles.emptyMsg, { color: C.textMuted }]}>
          Meetings you attend in {data.year} will show up here. A meeting is marked
          Unavailable only once it is over.
        </Text>
      </View>
    );
  }

  // ── List (months and meetings arrive most recent first) ────────────────────
  return (
    <View style={[styles.list, { backgroundColor: C.surface, borderColor: C.border }]}>
      <View style={[styles.summary, { borderBottomColor: C.border }]}>
        <Total label="Attended"    value={data.totals.attended}    color={C.primary} />
        <View style={[styles.divider, { backgroundColor: C.border }]} />
        <Total label="Unavailable" value={data.totals.unavailable} color={C.textMuted} />
      </View>

      {data.months.map(month => (
        <View key={month.month}>
          <View style={[styles.monthHeader, { backgroundColor: C.background, borderBottomColor: C.border }]}>
            <Text style={[styles.monthText, { color: C.textSecondary }]}>
              {formatMeetingDay(`${month.month}-01`, { month: 'long', year: 'numeric' })}
            </Text>
          </View>

          {month.meetings.map(item => {
            const isAttended = item.status === 'Attended';
            return (
              <View
                key={item.meeting_id}
                style={[styles.row, { borderBottomColor: C.border }]}
              >
                <View style={styles.rowLeft}>
                  <Text style={[styles.meetingTitle, { color: C.textPrimary }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={[styles.date, { color: C.textMuted }]} numberOfLines={1}>
                    {formatMeetingDay(item.meeting_date, { weekday: 'short', day: 'numeric', month: 'short' })}
                    {item.location_name ? ` · ${item.location_name}` : ''}
                  </Text>
                </View>

                <View
                  style={[
                    styles.pill,
                    {
                      backgroundColor: isAttended ? C.primarySubtle : C.background,
                      borderColor:     isAttended ? 'transparent' : C.border,
                    },
                  ]}
                >
                  <MaterialIcons
                    name={isAttended ? 'check-circle' : 'remove-circle-outline'}
                    size={13}
                    color={isAttended ? C.primary : C.textMuted}
                  />
                  <Text style={[styles.pillText, { color: isAttended ? C.primary : C.textMuted }]}>
                    {isAttended ? 'Attended' : 'Unavailable'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

function Total({ label, value, color }: { label: string; value: number; color: string }) {
  const C = useColors();
  return (
    <View style={styles.total}>
      <Text style={[styles.totalValue, { color }]}>{value}</Text>
      <Text style={[styles.totalLabel, { color: C.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list:         { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  summary:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  total:        { flex: 1, alignItems: 'center', gap: 2 },
  totalValue:   { fontSize: 20, fontWeight: '800' },
  totalLabel:   { fontSize: 12, fontWeight: '600' },
  divider:      { width: 1, alignSelf: 'stretch' },

  monthHeader:  { paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1 },
  monthText:    { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },

  row:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  rowLeft:      { flex: 1, gap: 2 },
  meetingTitle: { fontSize: 15, fontWeight: '700' },
  date:         { fontSize: 12 },

  pill:         { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  pillText:     { fontSize: 11, fontWeight: '700' },

  empty:        { alignItems: 'center', gap: 6, padding: 28, borderRadius: 18, borderWidth: 1 },
  emptyTitle:   { fontSize: 15, fontWeight: '700', textAlign: 'center' },
  emptyMsg:     { fontSize: 13, textAlign: 'center', lineHeight: 18 },
  retry:        { marginTop: 6 },
  retryText:    { fontSize: 13, fontWeight: '800', textDecorationLine: 'underline' },
});
