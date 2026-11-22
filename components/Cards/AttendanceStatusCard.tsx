import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { Input } from '@/components/Inputs/Input';
import { formatMeetingDay, formatParisTime } from '@/utils/attendanceDate';
import type {
  CurrentMeetingState,
  SubmitPhase,
  AttendanceFeedback,
} from '@/types/attendance';

type Props = {
  current:      CurrentMeetingState;
  code:         string;
  onChangeCode: (code: string) => void;
  phase:        SubmitPhase;
  feedback:     AttendanceFeedback | null;
  onSubmit:     () => void;
  onDismiss:    () => void;
};

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export default function AttendanceStatusCard({
  current, code, onChangeCode, phase, feedback, onSubmit, onDismiss,
}: Props) {
  const C = useColors();
  const { meeting, isToday, canCheckIn, alreadyCheckedIn } = current;
  const busy = phase !== 'idle';

  const dateStr  = formatMeetingDay(meeting.meeting_date);
  const start    = formatParisTime(meeting.starts_at);
  const end      = formatParisTime(meeting.ends_at);
  const timeStr  = start && end ? `${start} – ${end}` : start ? `From ${start}` : end ? `Until ${end}` : null;

  // ── Status pill ────────────────────────────────────────────────────────────
  const pill = alreadyCheckedIn
    ? { label: 'Checked in', bg: C.primarySubtle, fg: C.primary,     icon: 'check-circle' as IconName }
    : canCheckIn
    ? { label: 'Open now',   bg: C.goldSubtle,    fg: C.textWarning, icon: 'radio-button-checked' as IconName }
    : { label: 'Not open',   bg: C.border,        fg: C.textMuted,   icon: 'schedule' as IconName };

  const buttonText =
    phase === 'locating'     ? 'Getting your location...'
    : phase === 'submitting' ? 'Submitting...'
    : alreadyCheckedIn       ? 'Attendance recorded'
    : 'Submit attendance';

  const hint = alreadyCheckedIn
    ? null
    : canCheckIn
    ? 'Enter the code announced in the room. Your location is checked once, when you submit.'
    : isToday
    ? "Check-in isn't open yet. It opens when the organisers start it during the meeting."
    : 'Check-in opens on the day of the meeting.';

  const showCodeInput = isToday && !alreadyCheckedIn;

  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      <View style={[styles.accentBar, { backgroundColor: canCheckIn ? C.gold : C.primary }]} />

      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: C.textPrimary }]}>{meeting.title}</Text>
            <MetaRow icon="event" text={dateStr} />
            {timeStr && <MetaRow icon="schedule" text={timeStr} />}
            {meeting.location_name && <MetaRow icon="place" text={meeting.location_name} />}
          </View>
          <View style={[styles.pill, { backgroundColor: pill.bg }]}>
            <MaterialIcons name={pill.icon} size={12} color={pill.fg} />
            <Text style={[styles.pillText, { color: pill.fg }]}>{pill.label}</Text>
          </View>
        </View>

        {hint && <Text style={[styles.hint, { color: C.textMuted }]}>{hint}</Text>}

        {/* Code */}
        {showCodeInput && (
          <Input
            label="Check-in code"
            value={code}
            onChangeText={onChangeCode}
            placeholder="e.g. K7QX3M"
            placeholderTextColor={C.textMuted}
            autoCapitalize="characters"
            autoCorrect={false}
            autoComplete="off"
            spellCheck={false}
            textContentType="none"
            returnKeyType="done"
            maxLength={32}
            editable={canCheckIn && !busy}
            onSubmitEditing={onSubmit}
            accessibilityLabel="Check-in code"
            style={[
              styles.codeInput,
              {
                backgroundColor: C.background,
                color:           C.textPrimary,
                borderColor:     C.border,
                opacity:         canCheckIn ? 1 : 0.6,
              },
            ]}
          />
        )}

        {/* Feedback */}
        {feedback && <FeedbackBanner feedback={feedback} onRetry={onSubmit} onDismiss={onDismiss} />}

        {/* Action */}
        <PrimaryButton
          text={buttonText}
          onPress={onSubmit}
          disabled={!canCheckIn || busy}
        />
      </View>
    </View>
  );
}

function MetaRow({ icon, text }: { icon: IconName; text: string }) {
  const C = useColors();
  return (
    <View style={styles.metaRow}>
      <MaterialIcons name={icon} size={13} color={C.textSecondary} />
      <Text style={[styles.meta, { color: C.textSecondary }]}>{text}</Text>
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

  const action =
    feedback.action === 'settings'
      ? { label: 'Open settings', onPress: () => { Linking.openSettings().catch(() => {}); } }
      : feedback.action === 'retry'
      ? { label: 'Try again', onPress: onRetry }
      : null;

  return (
    <View style={[styles.banner, { backgroundColor: tone.bg }]} accessibilityRole="alert">
      <MaterialIcons name={tone.icon} size={18} color={tone.fg} style={styles.bannerIcon} />
      <View style={styles.bannerBody}>
        <Text style={[styles.bannerTitle, { color: tone.fg }]}>{feedback.title}</Text>
        <Text style={[styles.bannerMsg, { color: tone.fg }]}>{feedback.message}</Text>

        {action && (
          <TouchableOpacity
            onPress={action.onPress}
            style={styles.bannerAction}
            activeOpacity={0.7}
          >
            <Text style={[styles.bannerActionText, { color: tone.fg }]}>
              {action.label}
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
  metaRow:     { flexDirection: 'row', alignItems: 'center', gap: 5 },
  meta:        { fontSize: 13, flexShrink: 1 },

  pill:        { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20 },
  pillText:    { fontSize: 11, fontWeight: '700' },

  hint:        { fontSize: 12, lineHeight: 17 },

  codeInput:   { fontSize: 18, fontWeight: '700', letterSpacing: 3 },

  banner:           { flexDirection: 'row', gap: 10, padding: 12, borderRadius: 12 },
  bannerIcon:       { marginTop: 1 },
  bannerBody:       { flex: 1, gap: 2 },
  bannerTitle:      { fontSize: 14, fontWeight: '700' },
  bannerMsg:        { fontSize: 13, lineHeight: 18 },
  bannerAction:     { marginTop: 6, alignSelf: 'flex-start' },
  bannerActionText: { fontSize: 13, fontWeight: '800', textDecorationLine: 'underline' },
});
