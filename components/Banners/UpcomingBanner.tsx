import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '@/constants/Colors';
import type { MeetingDay } from '@/types/calendar';



type Props = { meeting: MeetingDay };

export default function UpcomingBanner({ meeting }: Props) {
  const C      = useColors();
  const accent = meeting.special?.accent ?? C.primary;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff  = Math.ceil((meeting.date.getTime() - today.getTime()) / 86400000);

  if (diff < 0) return null;

  const countdown =
    diff === 0 ? 'Today!' :
    diff === 1 ? 'Tomorrow' :
    `In ${diff} days`;

  const dateStr = meeting.date.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  return (
    <View style={[styles.card, { backgroundColor: accent }]}>
      {/* Ghana flag stripe */}
      <View style={styles.flagBar}>
        {['#CE1126', '#FCD116', '#006B3F', '#FCD116', '#CE1126'].map((c, i) => (
          <View key={i} style={[styles.flagSeg, { backgroundColor: c }]} />
        ))}
      </View>

      <View style={styles.inner}>
        <View style={styles.left}>
          <Text style={styles.upLabel}>NEXT MEETING</Text>
          <Text style={styles.upTitle}>{meeting.label}</Text>
          <Text style={styles.upDate}>{dateStr}</Text>
        </View>

        <View style={styles.right}>
          {meeting.isSpecial && (
            <Text style={styles.emoji}>{meeting.special!.emoji}</Text>
          )}
          <View style={[styles.countdownPill, { backgroundColor: 'rgba(0,0,0,0.2)' }]}>
            <Text style={styles.countdown}>{countdown}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:          { borderRadius: 18, overflow: 'hidden' },
  flagBar:       { flexDirection: 'row', height: 4 },
  flagSeg:       { flex: 1 },
  inner:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, gap: 12 },
  left:          { flex: 1, gap: 4 },
  upLabel:       { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: 1.2 },
  upTitle:       { fontSize: 18, fontWeight: '800', color: '#fff' },
  upDate:        { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  right:         { alignItems: 'center', gap: 8 },
  emoji:         { fontSize: 32 },
  countdownPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  countdown:     { fontSize: 13, fontWeight: '800', color: '#fff' },
});