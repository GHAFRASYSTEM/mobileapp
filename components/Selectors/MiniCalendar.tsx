import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CELL = (width - 32 - 32 - 28) / 7;

type Props = {
  year:        number;
  month:       number;
  meetingDate: Date;
  accent:      string;
};

export default function MiniCalendar({ year, month, meetingDate, accent }: Props) {
  const C = useColors();

  const today        = new Date();
  const isThisMonth  = today.getFullYear() === year && today.getMonth() === month;
  const todayDay     = today.getDate();
  const meetingDay   = meetingDate.getDate();
  const isSameDay    = isThisMonth && todayDay === meetingDay;

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View>
      {/* Day name headers */}
      <View style={styles.dayRow}>
        {DAY_NAMES.map(d => (
          <Text key={d} style={[styles.dayLabel, { color: C.textMuted, width: CELL }]}>
            {d}
          </Text>
        ))}
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {cells.map((n, i) => {
          const isMeeting = n === meetingDay;
          const isToday   = isThisMonth && n === todayDay;

          // Meeting day: filled accent circle
          // Today (when not the same as meeting): outlined circle
          // Both on same day: filled accent + white dot inside

          return (
            <View key={i} style={[styles.cell, { width: CELL, height: CELL }]}>
              {n !== null && (
                <View style={[
                  styles.dayWrap,
                  isMeeting && { backgroundColor: accent, borderRadius: CELL / 2 },
                  isToday && !isMeeting && {
                    borderRadius: CELL / 2,
                    borderWidth: 1.5,
                    borderColor: accent,
                  },
                ]}>
                  <Text style={[
                    styles.cellText,
                    { color: isMeeting ? '#fff' : isToday ? accent : C.textSecondary },
                    (isMeeting || isToday) && { fontWeight: '800' },
                  ]}>
                    {n}
                  </Text>

                  {/* When today === meeting day, show a small white dot below */}
                  {isSameDay && isMeeting && (
                    <View style={styles.todayDot} />
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendSwatch, { backgroundColor: accent }]} />
          <Text style={[styles.legendText, { color: C.textMuted }]}>Meeting date</Text>
        </View>
        {isThisMonth && !isSameDay && (
          <View style={styles.legendItem}>
            <View style={[styles.legendSwatch, styles.legendOutline, { borderColor: accent }]} />
            <Text style={[styles.legendText, { color: C.textMuted }]}>Today</Text>
          </View>
        )}
        {isSameDay && (
          <View style={styles.legendItem}>
            <View style={[styles.legendSwatch, { backgroundColor: accent }]} />
            <Text style={[styles.legendText, { color: C.textMuted }]}>Today · Meeting day</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const WRAP = CELL * 0.78;

const styles = StyleSheet.create({
  dayRow:        { flexDirection: 'row', marginBottom: 4 },
  dayLabel:      { textAlign: 'center', fontSize: 10, fontWeight: '600' },
  grid:          { flexDirection: 'row', flexWrap: 'wrap' },
  cell:          { alignItems: 'center', justifyContent: 'center' },
  dayWrap:       { width: WRAP, height: WRAP, alignItems: 'center', justifyContent: 'center' },
  cellText:      { fontSize: 12 },
  todayDot:      { width: 4, height: 4, borderRadius: 2, backgroundColor: '#fff', marginTop: 1 },
  legend:        { flexDirection: 'row', gap: 16, marginTop: 12, flexWrap: 'wrap' },
  legendItem:    { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendSwatch:  { width: 10, height: 10, borderRadius: 5 },
  legendOutline: { backgroundColor: 'transparent', borderWidth: 1.5 },
  legendText:    { fontSize: 11 },
});