import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
  FlatList, TextInput, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';

type Props = {
  label: string;
  value: string;
  placeholder: string;
  items: string[];
  onChange: (val: string) => void;
  required?: boolean;
};

export default function SelectDropdown({
  label,
  value,
  placeholder,
  items,
  onChange,
  required,
}: Props) {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);
  const [query,   setQuery]   = useState('');

  const filtered = query.trim()
    ? items.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : items;

  const handleSelect = (item: string) => {
    onChange(item);
    setVisible(false);
    setQuery('');
  };

  const handleClose = () => {
    setVisible(false);
    setQuery('');
  };

  return (
    <>
      {/* ── Trigger field ─────────────────────────────────────────── */}
      <View style={styles.wrapper}>
        <Text style={[styles.label, { color: C.textMuted }]}>
          {label.toUpperCase()}
          {required && <Text style={{ color: C.danger }}> *</Text>}
        </Text>

        <TouchableOpacity
          style={[styles.row, { backgroundColor: C.surface, borderColor: C.border }]}
          onPress={() => setVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.value, { color: value ? C.textPrimary : C.textMuted }]}>
            {value || placeholder}
          </Text>
          <Text style={[styles.chevron, { color: C.textMuted }]}>›</Text>
        </TouchableOpacity>
      </View>

      {/* ── Bottom sheet modal ────────────────────────────────────── */}
      <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backdrop} onPress={handleClose} activeOpacity={1} />

          <View style={[
            styles.sheet,
            { backgroundColor: C.surface, paddingBottom: insets.bottom + 16 },
          ]}>
            {/* Handle */}
            <View style={[styles.handle, { backgroundColor: C.border }]} />

            {/* Header */}
            <View style={[styles.sheetHeader, { borderBottomColor: C.border }]}>
              <Text style={[styles.sheetTitle, { color: C.textPrimary }]}>{label}</Text>
              <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={[styles.doneText, { color: C.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={[styles.searchRow, { backgroundColor: C.background, borderColor: C.border }]}>
              <Text style={[styles.searchIcon, { color: C.textMuted }]}>⌕</Text>
              <TextInput
                placeholder={`Search ${label.toLowerCase()}…`}
                placeholderTextColor={C.textMuted}
                value={query}
                onChangeText={setQuery}
                style={[styles.searchInput, { color: C.textPrimary }]}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* List */}
            <FlatList
              data={filtered}
              keyExtractor={i => i}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={[styles.empty, { color: C.textMuted }]}>No results for "{query}"</Text>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, { borderBottomColor: C.border }]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.itemText, { color: C.textPrimary }]}>{item}</Text>
                  {item === value && (
                    <Text style={[styles.checkmark, { color: C.primary }]}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper:     { gap: 5 },
  label:       { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  row:         { height: 48, borderRadius: 12, borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  value:       { flex: 1, fontSize: 14 },
  chevron:     { fontSize: 22, lineHeight: 26 },

  overlay:     { flex: 1, justifyContent: 'flex-end' },
  backdrop:    { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet:       { borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: 'hidden', maxHeight: '80%' },
  handle:      { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginTop: 10, marginBottom: 4 },

  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  sheetTitle:  { fontSize: 16, fontWeight: '700' },
  doneText:    { fontSize: 14, fontWeight: '600' },

  searchRow:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginVertical: 10, paddingHorizontal: 12, height: 42, borderRadius: 10, borderWidth: 1.5 },
  searchIcon:  { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 14, height: '100%' },

  item:        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  itemText:    { flex: 1, fontSize: 15 },
  checkmark:   { fontSize: 16, fontWeight: '700' },
  empty:       { textAlign: 'center', padding: 32, fontSize: 14 },
});