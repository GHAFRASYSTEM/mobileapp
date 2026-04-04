import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import MiniCalendar from '../Selectors/MiniCalendar';
import type { MeetingDay } from '@/types/calendar';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

type Props = {
  meeting:  MeetingDay;
  expanded: boolean;
  onToggle: () => void;
};

export default function MonthCard({ meeting, expanded, onToggle }: Props) {
  const C      = useColors();
  const month  = meeting.date.getMonth();
  const year   = meeting.date.getFullYear();

  const isPast    = meeting.status === 'past';
  const isCurrent = meeting.status === 'current';

  // Past months: muted grey. Current/upcoming: brand accent.
  const accent = isPast
    ? C.textMuted
    : meeting.special?.accent ?? C.primary;

  const cardBg = isCurrent
    ? (meeting.special?.accent ?? C.primary) + '0D'  // very subtle tint
    : C.surface;

  const borderColor = isCurrent
    ? (meeting.special?.accent ?? C.primary) + '60'
    : isPast
    ? C.border
    : C.border;

  const dateStr = meeting.date.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  return (
    <View style={[
      styles.card,
      { backgroundColor: cardBg, borderColor },
      isPast && styles.cardPast,
    ]}>
      {/* Left accent bar — hidden for past */}
      {!isPast && <View style={[styles.accentBar, { backgroundColor: accent }]} />}
      {isPast  && <View style={[styles.accentBar, { backgroundColor: C.border }]} />}

      <View style={[styles.cardInner, isPast && styles.innerPast]}>

        {/* ── Header row ──────────────────────────────────────── */}
        <TouchableOpacity style={styles.headerRow} onPress={onToggle} activeOpacity={0.75}>

          <View style={styles.headerLeft}>
            {/* Emoji badge */}
            <View style={[
              styles.emojiWrap,
              { backgroundColor: accent + '1A' },
              isPast && { backgroundColor: C.border + '80' },
            ]}>
              <Text style={[styles.emoji, isPast && styles.emojiPast]}>
                {meeting.special?.emoji ?? '📅'}
              </Text>
            </View>

            <View style={styles.headerText}>
              <View style={styles.monthRow}>
                <Text style={[
                  styles.monthName,
                  { color: isPast ? C.textMuted : C.textPrimary },
                  isCurrent && { color: accent, fontWeight: '900' },
                ]}>
                  {MONTH_NAMES[month]}
                </Text>

                {/* CURRENT pill */}
                {isCurrent && (
                  <View style={[styles.currentPill, { backgroundColor: accent }]}>
                    <Text style={styles.currentPillText}>NOW</Text>
                  </View>
                )}

                {/* PAST pill */}
                {isPast && (
                  <View style={[styles.pastPill, { backgroundColor: C.border }]}>
                    <Text style={[styles.pastPillText, { color: C.textMuted }]}>PAST</Text>
                  </View>
                )}
              </View>

              {meeting.isSpecial && (
                <Text style={[
                  styles.theme,
                  { color: isPast ? C.textMuted : accent },
                  isPast && { opacity: 0.6 },
                ]}>
                  {meeting.special!.theme}
                </Text>
              )}
            </View>
          </View>

          {/* Right: event/meeting badge + chevron */}
          <View style={styles.headerRight}>
            {!isPast && (
              meeting.isSpecial ? (
                <View style={[styles.eventBadge, { backgroundColor: accent }]}>
                  <Text style={styles.eventBadgeText}>EVENT</Text>
                </View>
              ) : (
                <View style={[styles.meetingBadge, { backgroundColor: C.primarySubtle }]}>
                  <Text style={[styles.meetingBadgeText, { color: C.primary }]}>MEETING</Text>
                </View>
              )
            )}
            <IconSymbol
              name={expanded ? 'chevron.up' : 'chevron.down'}
              size={15}
              color={isPast ? C.textMuted : C.textSecondary}
            />
          </View>
        </TouchableOpacity>

        {/* ── Info pills ──────────────────────────────────────── */}
        <View style={[
          styles.infoPill,
          { backgroundColor: C.background, borderColor: isPast ? C.border : accent + '40' },
        ]}>
          <IconSymbol name="calendar" size={11} color={isPast ? C.textMuted : accent} />
          <Text style={[styles.infoPillText, { color: isPast ? C.textMuted : C.textSecondary }]}>
            {dateStr}
          </Text>
        </View>

        <View style={[
          styles.labelPill,
          {
            backgroundColor: isPast ? C.border + '40' : accent + '18',
            borderColor:     isPast ? C.border         : accent + '40',
          },
        ]}>
          <IconSymbol
            name={isPast ? 'checkmark.circle' : 'star.fill'}
            size={11}
            color={isPast ? C.textMuted : accent}
          />
          <Text style={[styles.labelPillText, { color: isPast ? C.textMuted : accent }]}>
            {isPast ? `${meeting.label} — Completed` : meeting.label}
          </Text>
        </View>

        {/* ── Expanded mini calendar ───────────────────────────── */}
        {expanded && (
          <View style={[styles.calWrap, { borderTopColor: C.border }]}>
            <MiniCalendar
              year={year}
              month={month}
              meetingDate={meeting.date}
              accent={isPast ? C.textMuted : accent}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:             { flexDirection: 'row', borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  cardPast:         { opacity: 0.72 },
  accentBar:        { width: 5 },
  cardInner:        { flex: 1, padding: 14, gap: 10 },
  innerPast:        { },

  headerRow:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft:       { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  emojiWrap:        { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  emoji:            { fontSize: 22 },
  emojiPast:        { opacity: 0.45 },
  headerText:       { gap: 2 },
  monthRow:         { flexDirection: 'row', alignItems: 'center', gap: 7 },
  monthName:        { fontSize: 16, fontWeight: '800' },
  theme:            { fontSize: 11, fontWeight: '600' },
  headerRight:      { flexDirection: 'row', alignItems: 'center', gap: 8 },

  currentPill:      { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  currentPillText:  { fontSize: 9, fontWeight: '900', color: '#fff', letterSpacing: 1 },
  pastPill:         { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  pastPillText:     { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },

  eventBadge:       { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  eventBadgeText:   { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  meetingBadge:     { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  meetingBadgeText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },

  infoPill:         { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  infoPillText:     { fontSize: 12 },
  labelPill:        { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  labelPillText:    { fontSize: 12, fontWeight: '600' },

  calWrap:          { borderTopWidth: 1, paddingTop: 12 },
});