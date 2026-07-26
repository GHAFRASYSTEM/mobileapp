import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import { SimpleDateTimePicker } from '@/components/DatePicker/SimpleDateTimePicker';

type Props = {
  label:        string;
  mode:         'date' | 'time';
  value:        Date;
  onChange:     (date: Date) => void;
  minimumDate?: Date;
  required?:    boolean;
};

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}
function formatTime(d: Date) {
  return d.toTimeString().slice(0, 5);
}

export function DateTimeField({ label, mode, value, onChange, minimumDate, required }: Props) {
  const C = useColors();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: C.textMuted }]}>
        {label} {required && '*'}
      </Text>

      <TouchableOpacity
        style={[styles.trigger, { borderColor: C.border, backgroundColor: C.background }]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={{ color: C.textPrimary, fontSize: 15 }}>
          {mode === 'date' ? formatDate(value) : formatTime(value)}
        </Text>
        <MaterialIcons
          name={mode === 'date' ? 'calendar-today' : 'access-time'}
          size={18}
          color={C.textMuted}
        />
      </TouchableOpacity>

      <SimpleDateTimePicker
        visible={visible}
        mode={mode}
        value={value}
        minimumDate={minimumDate}
        colors={C}
        onConfirm={(date) => { onChange(date); setVisible(false); }}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6, flex: 1 },
  label: { fontSize: 12 },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
});