import React, { useState, useMemo, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import ScreenHeader   from '@/components/Headers/ScreenHeader';
import YearSelector from '@/components/Selectors/YearSelector';
import MonthCard from '@/components/Cards/MonthCard';
import UpcomingBanner from '@/components/Banners/UpcomingBanner';
import type { MeetingDay, SpecialMonth, MonthStatus } from '@/types/calendar';

// ─── Config ───────────────────────────────────────────────────────────────────
const SPECIAL_MONTHS: Record<number, SpecialMonth> = {
  0:  { theme: 'New Year',       emoji: '🎆', accent: '#002395', eventName: 'New Year Celebration'       },
  1:  { theme: 'Month of Love',  emoji: '❤️',  accent: '#CE1126', eventName: 'Valentine Social'           },
  2:  { theme: 'Ghana Month',    emoji: '🇬🇭', accent: '#006B3F', eventName: 'Ghana Independence Evening' },
  8:  { theme: 'Welcome Season', emoji: '🤝',  accent: '#E5A000', eventName: 'Welcome & Rentrée'          },
  11: { theme: 'Festive Season', emoji: '🎄', accent: '#CE1126', eventName: 'Christmas & Year-End Gala'  },
};

function lastSaturday(year: number, month: number): Date {
  const d = new Date(year, month + 1, 0);
  d.setDate(d.getDate() - ((d.getDay() + 1) % 7));
  return d;
}

function getStatus(date: Date, year: number, currentYear: number): MonthStatus {
  const now   = new Date();
  const thisM = now.getMonth();
  const thisY = now.getFullYear();
  const m     = date.getMonth();

  if (year < currentYear) return 'past';
  if (year > currentYear) return 'upcoming';
  if (m < thisM)          return 'past';
  if (m === thisM)        return 'current';
  return 'upcoming';
}

export function buildSchedule(year: number, currentYear: number): MeetingDay[] {
  return Array.from({ length: 12 }, (_, month) => {
    const date    = lastSaturday(year, month);
    const special = SPECIAL_MONTHS[month];
    const status  = getStatus(date, year, currentYear);
    return {
      date,
      isSpecial: !!special,
      special,
      label:  special ? special.eventName : 'Monthly Meeting',
      status,
    };
  });
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function Legend() {
  const C = useColors();
  return (
    <View style={[leg.row, { backgroundColor: C.surface, borderColor: C.border }]}>
      {[
        { color: C.primary,  label: 'Monthly Meeting' },
        { color: C.gold,     label: 'Special Event'   },
        { color: C.textMuted, label: 'Past',          outline: true },
      ].map(({ color, label, outline }) => (
        <View key={label} style={leg.item}>
          <View style={[
            leg.dot,
            outline
              ? { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: color }
              : { backgroundColor: color },
          ]} />
          <Text style={[leg.text, { color: C.textSecondary }]}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const leg = StyleSheet.create({
  row:  { flexDirection: 'row', gap: 14, padding: 12, borderRadius: 12, borderWidth: 1, flexWrap: 'wrap' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot:  { width: 10, height: 10, borderRadius: 5 },
  text: { fontSize: 11 },
});

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function EventCalendar() {
  const C           = useColors();
  const insets      = useSafeAreaInsets();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [year, setYear] = useState(currentYear);

  const schedule = useMemo(() => buildSchedule(year, currentYear), [year, currentYear]);

  // Auto-expand current month
  const currentId = `${year}-${currentMonth}`;
  const [expandedId, setExpandedId] = useState<string | null>(
    year === currentYear ? currentId : null
  );

  // Scroll to current month
  const scrollRef  = useRef<ScrollView>(null);
  const offsetsRef = useRef<Record<string, number>>({});

  const scrollToMonth = (monthIndex: number) => {
    const id  = `${year}-${monthIndex}`;
    const off = offsetsRef.current[id];
    if (off !== undefined) {
      scrollRef.current?.scrollTo({ y: off - 12, animated: true });
    }
    setExpandedId(id);
  };

  const today   = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = year === currentYear
    ? schedule.find(m => m.date >= today) ?? null
    : null;

  const totalEvents   = schedule.filter(m => m.isSpecial).length;
  const totalMeetings = schedule.length;

  const toggleCard = (id: string) =>
    setExpandedId(prev => prev === id ? null : id);

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />

<ScreenHeader
  variant="page"
  title="Event Calendar"
  subtitle={`${totalMeetings} meetings · ${totalEvents} special events`}
  icon="calendar.badge.clock"
  backRoute="/(tabs)/(community)"
/>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner — tap to jump to current month */}
        {upcoming && (
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => scrollToMonth(upcoming.date.getMonth())}
          >
            <UpcomingBanner meeting={upcoming} />
          </TouchableOpacity>
        )}

        <YearSelector
          year={year}
          currentYear={currentYear}
          onPrev={() => {
            const next = Math.max(year - 1, currentYear - 1);
            setYear(next);
            setExpandedId(next === currentYear ? currentId : null);
          }}
          onNext={() => {
            const next = Math.min(year + 1, currentYear + 1);
            setYear(next);
            setExpandedId(next === currentYear ? currentId : null);
          }}
        />

        <Legend />

        {schedule.map(meeting => {
          const id = `${year}-${meeting.date.getMonth()}`;
          return (
            <View
              key={id}
              onLayout={e => { offsetsRef.current[id] = e.nativeEvent.layout.y; }}
            >
              <MonthCard
                meeting={meeting}
                expanded={expandedId === id}
                onToggle={() => toggleCard(id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1 },
  scroll: { padding: 16, gap: 12 },
});
