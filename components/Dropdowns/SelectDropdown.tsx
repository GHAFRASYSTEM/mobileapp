import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
  FlatList, TextInput, StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  label: string;
  value: string;
  placeholder: string;
  items: string[];
  onChange: (val: string) => void;
  isDark: boolean;
  required?: boolean;
};

export default function SelectDropdown({
  label,
  value,
  placeholder,
  items,
  onChange,
  isDark,
  required,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const insets = useSafeAreaInsets();

  const filtered = query
    ? items.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : items;

  const colors = {
    label:       isDark ? '#aaa' : '#9A9890',
    bg:          isDark ? '#1E1E1E' : '#fff',
    border:      isDark ? '#333' : '#E8E6DF',
    text:        isDark ? '#fff' : '#1A1A18',
    placeholder: isDark ? '#555' : '#C0BEB8',
    primary:     '#006B3F',
    overlay:     'rgba(0,0,0,0.5)',
  };

  return (
    <>
      {/* Select field */}
      <View style={styles.wrapper}>
        <Text style={[styles.label, { color: colors.label }]}>
          {label.toUpperCase()}
          {required && <Text style={{ color: '#CE1126' }}> *</Text>}
        </Text>

        <TouchableOpacity
          style={[styles.row, { backgroundColor: colors.bg, borderColor: colors.border }]}
          onPress={() => setVisible(true)}
        >
          <Text style={{ color: value ? colors.text : colors.placeholder }}>
            {value || placeholder}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={visible} animationType="slide" transparent>
        <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 12, backgroundColor: colors.bg }]}>

            <Text style={[styles.title, { color: colors.text }]}>{label}</Text>

            <TextInput
              placeholder="Search..."
              placeholderTextColor={colors.placeholder}
              value={query}
              onChangeText={setQuery}
              style={[styles.search, { borderColor: colors.border, color: colors.text }]}
            />

            <FlatList
              data={filtered}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onChange(item);
                    setVisible(false);
                    setQuery('');
                  }}
                >
                  <Text style={{ color: colors.text }}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={{ textAlign: 'center', color: colors.primary }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 5 },
  label: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  row: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, maxHeight: '80%' },
  title: { fontWeight: '700', fontSize: 16, marginBottom: 10 },
  search: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  item: { paddingVertical: 12 },
});