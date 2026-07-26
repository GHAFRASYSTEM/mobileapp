import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// ─────────────────────────────────────────────────────────────────────────
// Pure JS/React Native implementation — no native module, no linking, no
// EAS rebuild required. Ships fine over OTA updates, unlike
// @react-native-community/datetimepicker.
// ─────────────────────────────────────────────────────────────────────────

type Mode = 'date' | 'time';

type Props = {
  visible:      boolean;
  mode:         Mode;
  value:        Date;
  minimumDate?: Date;
  onConfirm:    (date: Date) => void;
  onCancel:     () => void;
  colors:       any;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}
function clampDay(day: number, month: number, year: number) {
  return Math.min(Math.max(day, 1), daysInMonth(month, year));
}

export function SimpleDateTimePicker({ visible, mode, value, minimumDate, onConfirm, onCancel, colors }: Props) {
  const [day, setDay]       = useState(value.getDate());
  const [month, setMonth]   = useState(value.getMonth());
  const [year, setYear]     = useState(value.getFullYear());
  const [hour, setHour]     = useState(value.getHours());
  const [minute, setMinute] = useState(value.getMinutes());

  // Reset the wheels to the current value each time the sheet opens
  useEffect(() => {
    if (!visible) return;
    setDay(value.getDate());
    setMonth(value.getMonth());
    setYear(value.getFullYear());
    setHour(value.getHours());
    setMinute(value.getMinutes());
  }, [visible, value]);

  const stepDay = (delta: number) => {
    const max = daysInMonth(month, year);
    let next = day + delta;
    if (next < 1) next = max;
    if (next > max) next = 1;
    setDay(next);
  };
  const stepMonth = (delta: number) => {
    let next = month + delta;
    if (next < 0) next = 11;
    if (next > 11) next = 0;
    setMonth(next);
    setDay(d => clampDay(d, next, year));
  };
  const stepYear = (delta: number) => {
    const next = year + delta;
    setYear(next);
    setDay(d => clampDay(d, month, next));
  };
  const stepHour   = (delta: number) => setHour(h => (h + delta + 24) % 24);
  const stepMinute = (delta: number) => setMinute(m => (m + delta + 60) % 60);

  const handleConfirm = () => {
    if (mode === 'date') {
      let result = new Date(year, month, day);
      if (minimumDate) {
        const min = new Date(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate());
        if (result < min) result = min;
      }
      onConfirm(result);
    } else {
      onConfirm(new Date(1970, 0, 1, hour, minute));
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {mode === 'date' ? 'Select arrival date' : 'Select arrival time'}
          </Text>

          <View style={styles.row}>
            {mode === 'date' ? (
              <>
                <Unit label="Day"   value={String(day).padStart(2, '0')} onUp={() => stepDay(1)}   onDown={() => stepDay(-1)}   colors={colors} />
                <Unit label="Month" value={MONTHS[month]}                onUp={() => stepMonth(1)} onDown={() => stepMonth(-1)} colors={colors} />
                <Unit label="Year"  value={String(year)}                 onUp={() => stepYear(1)}  onDown={() => stepYear(-1)}  colors={colors} />
              </>
            ) : (
              <>
                <Unit label="Hour"   value={String(hour).padStart(2, '0')}   onUp={() => stepHour(1)}   onDown={() => stepHour(-1)}   colors={colors} />
                <Unit label="Minute" value={String(minute).padStart(2, '0')} onUp={() => stepMinute(1)} onDown={() => stepMinute(-1)} colors={colors} />
              </>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.border }]} onPress={onCancel}>
              <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary, borderColor: colors.primary }]}
              onPress={handleConfirm}
            >
              <Text style={{ color: colors.textInverse, fontWeight: '700' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Unit({
  label, value, onUp, onDown, colors,
}: { label: string; value: string; onUp: () => void; onDown: () => void; colors: any }) {
  return (
    <View style={styles.unit}>
      <Text style={[styles.unitLabel, { color: colors.textMuted }]}>{label}</Text>
      <TouchableOpacity onPress={onUp} style={styles.arrowBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <MaterialIcons name="keyboard-arrow-up" size={26} color={colors.primary} />
      </TouchableOpacity>
      <Text style={[styles.unitValue, { color: colors.textPrimary }]}>{value}</Text>
      <TouchableOpacity onPress={onDown} style={styles.arrowBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <MaterialIcons name="keyboard-arrow-down" size={26} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 32 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: 24 },
  unit: { alignItems: 'center', minWidth: 64 },
  unitLabel: { fontSize: 12, marginBottom: 6 },
  unitValue: { fontSize: 20, fontWeight: '700', marginVertical: 4 },
  arrowBtn: { padding: 2 },
  actions: { flexDirection: 'row', gap: 12 },
  actionBtn: { flex: 1, paddingVertical: 13, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
});