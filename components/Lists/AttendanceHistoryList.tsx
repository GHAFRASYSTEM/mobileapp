import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import type { AttendanceHistoryItem } from '@/types/attendance';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

type Props = { items: AttendanceHistoryItem[] };

export default function AttendanceHistoryList({ items }: Props) {
  const C = useColors();

  if (items.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: C.surface, borderColor: C.border }]}>
        <MaterialIcons name="event-available" size={28} color={C.textMuted} />
        <Text style={[styles.emptyTitle, { color: C.textPrimary }]}>No attendance yet</Text>
        <Text style={[styles.emptyMsg, { color: C.textMuted }]}>
          Months you attend will show up here.
        </Text>
      </View>
    );
  }

  const attended = items.filter(i => i.status === 'attended').length;

  return (
    <View style={[styles.list, { backgroundColor: C.surface, borderColor: C.border }]}>
      <View style={[styles.summary, { borderBottomColor: C.border }]}>
        <Text style={[styles.summaryText, { color: C.textSecondary }]}>
          Attended {attended} of {items.length} meetings
        </Text>
      </View>

      {items.map((item, idx) => {
        const isAttended = item.status === 'attended';
        const dateStr = item.meetingDate
          ? new Date(item.meetingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          : null;

        return (
          <View
            key={`${item.year}-${item.month}`}
            style={[
              styles.row,
              idx < items.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.border },
            ]}
          >
            <View style={styles.rowLeft}>
              <Text style={[styles.month, { color: C.textPrimary }]}>
                {MONTH_NAMES[item.month - 1]}
              </Text>
              {dateStr && (
                <Text style={[styles.date, { color: C.textMuted }]}>Meeting on {dateStr}</Text>
              )}
            </View>

            <View
              style={[
                styles.pill,
                { backgroundColor: isAttended ? C.primarySubtle : C.background, borderColor: isAttended ? 'transparent' : C.border },
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
  );
}

const styles = StyleSheet.create({
  list:        { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  summary:     { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  summaryText: { fontSize: 13, fontWeight: '600' },

  row:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  rowLeft:     { gap: 2 },
  month:       { fontSize: 15, fontWeight: '700' },
  date:        { fontSize: 12 },

  pill:        { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  pillText:    { fontSize: 11, fontWeight: '700' },

  empty:       { alignItems: 'center', gap: 6, padding: 28, borderRadius: 18, borderWidth: 1 },
  emptyTitle:  { fontSize: 15, fontWeight: '700' },
  emptyMsg:    { fontSize: 13, textAlign: 'center' },
});
