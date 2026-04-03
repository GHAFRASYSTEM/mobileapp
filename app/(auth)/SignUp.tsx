import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, useColorScheme,
} from 'react-native';
import SelectDropdown from '@/components/Dropdowns/SelectDropdown';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AvatarPicker from '@/components/ImagePickers/AvatarPicker';
import PhoneInputRow from '@/components/Inputs/PhoneInputRow';
import { Input } from '@/components/Inputs/Input';
import {  OCCUPATION_MAP } from '@/assets/data/occupations';
import { FRENCH_CITIES } from '@/assets/data/frenchCities';

// Derive a flat occupation list from the map
const OCCUPATIONS: string[] = Array.from(
  new Set(OCCUPATION_MAP.map(([, canonical]) => canonical))
).sort();

// ── Searchable dropdown modal ─────────────────────────────────────────────
type DropdownProps = {
  visible: boolean;
  title: string;
  items: string[];
  onSelect: (val: string) => void;
  onClose: () => void;
  isDark: boolean;
};


// ── Main screen ───────────────────────────────────────────────────────────
export default function SignUpScreen() {
  const router  = useRouter();
  const insets  = useSafeAreaInsets();
  const scheme  = useColorScheme();
  const isDark  = scheme === 'dark';
  const params  = useLocalSearchParams<{ name: string; email: string; photoUrl: string }>();

  const colors = {
    background: isDark ? '#0B0B0F' : '#fff',
    surface:    isDark ? '#1E1E1E' : '#F7F6F2',
    text:       isDark ? '#fff'    : '#1A1A18',
    subtext:    isDark ? '#aaa'    : '#666',
    border:     isDark ? '#333'    : '#E8E6DF',
    primary:    '#006B3F',
    gold:       '#FCD116',
    disabled:   isDark ? '#333'    : '#E0DEDA',
    disabledTx: isDark ? '#555'    : '#B0AEA8',
  };

  const [name,        setName]        = useState(params.name     ?? '');
  const [ghanaPhone,  setGhanaPhone]  = useState('');
  const [frenchPhone, setFrenchPhone] = useState('');
  const [city,        setCity]        = useState('');
  const [occupation,  setOccupation]  = useState('');
  const [photoUri,    setPhotoUri]    = useState(params.photoUrl ?? '');

  const [cityOpen,       setCityOpen]       = useState(false);
  const [occupationOpen, setOccupationOpen] = useState(false);

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const isValid  = name.trim().length > 0 && ghanaPhone.trim().length > 0;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#006B3F" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#006B3F', paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>Complete your profile</Text>
        <Text style={styles.subtitle}>Fill in your details to get started</Text>
      </View>
      <View style={[styles.goldBar, { backgroundColor: colors.gold }]} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 48 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          <AvatarPicker uri={photoUri} initials={initials} onPick={setPhotoUri} />

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Input
            label="Full Name"
            required
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            autoCapitalize="words"
            returnKeyType="next"
            placeholderTextColor={colors.subtext}
          />

          {/* Email — read-only display */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.subtext }]}>EMAIL</Text>
            <View style={[styles.readOnlyRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.readOnlyText, { color: colors.subtext }]}>{params.email}</Text>
              <View style={[styles.lockedBadge, { backgroundColor: colors.border }]}>
                <Text style={[styles.lockedText, { color: colors.subtext }]}>via Google</Text>
              </View>
            </View>
          </View>

          {/* Phone numbers */}
          <View style={styles.phoneGroup}>
            <Text style={[styles.groupLabel, { color: colors.subtext }]}>PHONE NUMBERS</Text>
            <PhoneInputRow
              flag="🇬🇭"
              code="+233"
              placeholder="Ghana number (required)"
              value={ghanaPhone}
              onChangeText={setGhanaPhone}
            />
            <PhoneInputRow
              flag="🇫🇷"
              code="+33"
              placeholder="France number (optional)"
              value={frenchPhone}
              onChangeText={setFrenchPhone}
            />
          </View>

          {/* City dropdown */}
<SelectDropdown
  label="City in France"
  value={city}
  placeholder="Select your city…"
  items={FRENCH_CITIES}
  onChange={setCity}
  isDark={isDark}
/>

<SelectDropdown
  label="Occupation"
  value={occupation}
  placeholder="Select your occupation…"
  items={OCCUPATIONS}
  onChange={setOccupation}
  isDark={isDark}
  required
/>

          {/* CTA */}
          <TouchableOpacity
            style={[
              styles.cta,
              { backgroundColor: isValid ? colors.primary : colors.disabled },
            ]}
            disabled={!isValid}
            onPress={() => router.replace('/(tabs)/(home)')}
            activeOpacity={0.85}
          >
            <Text style={[styles.ctaText, { color: isValid ? '#fff' : colors.disabledTx }]}>
              Save & Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:         { flex: 1 },
  header:       { paddingHorizontal: 22, paddingBottom: 22 },
  title:        { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  subtitle:     { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  goldBar:      { height: 3 },
  scroll:       { padding: 22, gap: 16 },
  divider:      { height: 1, marginVertical: 4 },
  fieldWrap:    { gap: 5 },
  fieldLabel:   { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  readOnlyRow:  { flexDirection: 'row', alignItems: 'center', height: 48, borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, gap: 8 },
  readOnlyText: { flex: 1, fontSize: 14 },
  lockedBadge:  { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  lockedText:   { fontSize: 10, fontWeight: '600' },
  phoneGroup:   { gap: 8 },
  groupLabel:   { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  cta:          { borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  ctaText:      { fontSize: 15, fontWeight: '700' },
});

const dd = StyleSheet.create({
  overlay:     { flex: 1, justifyContent: 'flex-end' },
  sheet:       { borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
  handle:      { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginTop: 10, marginBottom: 6 },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  title:       { fontSize: 16, fontWeight: '700' },
  closeBtn:    { padding: 4 },
  searchRow:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginVertical: 12, paddingHorizontal: 12, height: 42, borderRadius: 10, borderWidth: 1.5 },
  searchInput: { flex: 1, fontSize: 14, height: '100%' },
  item:        { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5 },
  itemText:    { fontSize: 15 },
  empty:       { textAlign: 'center', padding: 32, fontSize: 14 },
});

const sf = StyleSheet.create({
  wrapper:  { gap: 5 },
  label:    { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  row:      { flexDirection: 'row', alignItems: 'center', height: 48, borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14 },
  value:    { flex: 1, fontSize: 14 },
  chevron:  { fontSize: 16 },
});