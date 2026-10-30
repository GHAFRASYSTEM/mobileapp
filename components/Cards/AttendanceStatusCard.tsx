import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import type { AttendanceStatus, AttendanceFeedback } from '@/types/attendance';

type Props = {
  status:    AttendanceStatus;
  opening:   boolean;
  feedback:  AttendanceFeedback | null;
  onMark:    () => void;
  onDismiss: () => void;
};

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export default function AttendanceStatusCard({
  status, opening, feedback, onMark, onDismiss,
}: Props) {
  const C = useColors();

  const dateStr = status.meetingDate
    ? new Date(status.meetingDate).toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long',
      })
    : 'Date to be confirmed';

  // ── Status pill ────────────────────────────────────────────────────────────
  const pill = status.alreadySubmitted
    ? { label: 'Recorded', bg: C.primarySubtle, fg: C.primary, icon: 'check-circle' as IconName }
    : status.isActive
    ? { label: 'Open now', bg: C.goldSubtle, fg: C.textWarning, icon: 'radio-button-checked' as IconName }
    : { label: 'Not open', bg: C.border, fg: C.textMuted, icon: 'schedule' as IconName };

  const buttonText =
    opening                    ? 'Opening website…'
    : status.alreadySubmitted  ? 'Attendance recorded'
    : 'Mark attendance';

  const canSubmit = status.isActive && !status.alreadySubmitted;

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      <View style={[styles.accentBar, { backgroundColor: canSubmit ? C.gold : C.primary }]} />

      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: C.textPrimary }]}>{status.meetingTitle}</Text>
            <View style={styles.dateRow}>
              <MaterialIcons name="event" size={13} color={C.textSecondary} />
              <Text style={[styles.date, { color: C.textSecondary }]}>{dateStr}</Text>
            </View>
          </View>
          <View style={[styles.pill, { backgroundColor: pill.bg }]}>
            <MaterialIcons name={pill.icon} size={12} color={pill.fg} />
            <Text style={[styles.pillText, { color: pill.fg }]}>{pill.label}</Text>
          </View>
        </View>

        {/* Hint */}
        {!status.alreadySubmitted && (
          <Text style={[styles.hint, { color: C.textMuted }]}>
            {status.isActive
              ? "You'll continue on the GHAFRA website, which checks that you're at the venue."
              : 'Attendance opens during the meeting.'}
          </Text>
        )}

        {/* Feedback */}
        {feedback && <FeedbackBanner feedback={feedback} onRetry={onMark} onDismiss={onDismiss} />}

        {/* Action */}
        <PrimaryButton
          text={buttonText}
          onPress={onMark}
          loading={opening}
          disabled={!canSubmit}
        />
      </View>
    </View>
  );
}

// ─── Feedback banner ─────────────────────────────────────────────────────────
function FeedbackBanner({
  feedback, onRetry, onDismiss,
}: {
  feedback:  AttendanceFeedback;
  onRetry:   () => void;
  onDismiss: () => void;
}) {
  const C = useColors();

  const tone = {
    success: { bg: C.primarySubtle, fg: C.textSuccess, icon: 'check-circle' as IconName },
    warning: { bg: C.goldSubtle,    fg: C.textWarning, icon: 'info'         as IconName },
    error:   { bg: C.dangerSubtle,  fg: C.textDanger,  icon: 'error'        as IconName },
  }[feedback.tone];

  return (
    <View style={[styles.banner, { backgroundColor: tone.bg }]} accessibilityRole="alert">
      <MaterialIcons name={tone.icon} size={18} color={tone.fg} style={styles.bannerIcon} />
      <View style={styles.bannerBody}>
        <Text style={[styles.bannerTitle, { color: tone.fg }]}>{feedback.title}</Text>
        <Text style={[styles.bannerMsg, { color: tone.fg }]}>{feedback.message}</Text>

        {feedback.action && (
          <TouchableOpacity
            onPress={onRetry}
            style={styles.bannerAction}
            activeOpacity={0.7}
          >
            <Text style={[styles.bannerActionText, { color: tone.fg }]}>
              Try again
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={onDismiss} hitSlop={10} accessibilityLabel="Dismiss">
        <MaterialIcons name="close" size={16} color={tone.fg} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card:        { flexDirection: 'row', borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  accentBar:   { width: 5 },
  inner:       { flex: 1, padding: 16, gap: 12 },

  headerRow:   { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  headerText:  { flex: 1, gap: 4 },
  title:       { fontSize: 18, fontWeight: '800' },
  dateRow:     { flexDirection: 'row', alignItems: 'center', gap: 5 },
  date:        { fontSize: 13 },

  pill:        { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20 },
  pillText:    { fontSize: 11, fontWeight: '700' },

  hint:        { fontSize: 12, lineHeight: 17 },

  banner:           { flexDirection: 'row', gap: 10, padding: 12, borderRadius: 12 },
  bannerIcon:       { marginTop: 1 },
  bannerBody:       { flex: 1, gap: 2 },
  bannerTitle:      { fontSize: 14, fontWeight: '700' },
  bannerMsg:        { fontSize: 13, lineHeight: 18 },
  bannerAction:     { marginTop: 6, alignSelf: 'flex-start' },
  bannerActionText: { fontSize: 13, fontWeight: '800', textDecorationLine: 'underline' },
});
