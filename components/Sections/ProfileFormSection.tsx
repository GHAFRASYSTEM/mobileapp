import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';
import PhoneInputRow  from '@/components/Inputs/PhoneInputRow';
import { Input }      from '@/components/Inputs/Input';
import SelectDropdown from '@/components/Dropdowns/SelectDropdown';
import { OCCUPATION_MAP } from '@/assets/data/occupations';
import { FRENCH_CITIES }  from '@/assets/data/frenchCities';

const OCCUPATIONS: string[] = Array.from(
  new Set(OCCUPATION_MAP.map(([, canonical]) => canonical))
).sort();

const GENDERS = ['Male', 'Female'];

export type ProfileFormValues = {
  name:        string;
  gender:      string;
  ghanaPhone:  string;   // 9-digit display value
  ghanaE164:   string;   // 2339XXXXXXXX — sent to backend
  frenchPhone: string;
  frenchE164:  string;
  city:        string;
  occupation:  string;
};

type Props = {
  values:   ProfileFormValues;
  email:    string;
  onChange: <K extends keyof ProfileFormValues>(key: K, value: ProfileFormValues[K]) => void;
};

export default function ProfileFormSection({ values, email, onChange }: Props) {
  const C = useColors();

  return (
    <View style={styles.wrapper}>

      {/* Full name */}
      <Input
        label="Full Name"
        required
        value={values.name}
        onChangeText={v => onChange('name', v)}
        placeholder="Your full name"
        autoCapitalize="words"
        returnKeyType="next"
        placeholderTextColor={C.textMuted}
      />

      {/* Gender */}
      <SelectDropdown
        label="Gender"
        value={values.gender}
        placeholder="Select gender…"
        items={GENDERS}
        onChange={v => onChange('gender', v)}
        required
      />

      {/* Email — read only */}
      <View style={styles.fieldWrap}>
        <Text style={[styles.fieldLabel, { color: C.textMuted }]}>EMAIL</Text>
        <View style={[styles.readOnlyRow, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.readOnlyText, { color: C.textSecondary }]} numberOfLines={1}>
            {email}
          </Text>
          <View style={[styles.lockedBadge, { backgroundColor: C.border }]}>
            <Text style={[styles.lockedText, { color: C.textMuted }]}>via Google</Text>
          </View>
        </View>
      </View>

      {/* Phone numbers */}
      <View style={styles.phoneGroup}>
        <Text style={[styles.groupLabel, { color: C.textMuted }]}>PHONE NUMBERS</Text>

        <PhoneInputRow
          flag="🇬🇭"
          code="+233"
          dialCode="233"
          label="Ghana number"
          placeholder="e.g. 542000000"
          value={values.ghanaPhone}
          onChangeText={(display, e164) => {
            onChange('ghanaPhone', display);
            onChange('ghanaE164',  e164);
          }}
          required
        />

        <PhoneInputRow
          flag="🇫🇷"
          code="+33"
          dialCode="33"
          label="France number"
          placeholder="e.g. 612000000"
          value={values.frenchPhone}
          onChangeText={(display, e164) => {
            onChange('frenchPhone', display);
            onChange('frenchE164',  e164);
          }}
        />
      </View>

      {/* City */}
      <SelectDropdown
        label="City in France"
        value={values.city}
        placeholder="Select your city…"
        items={FRENCH_CITIES}
        onChange={v => onChange('city', v)}
        required
      />

      {/* Occupation */}
      <SelectDropdown
        label="Occupation"
        value={values.occupation}
        placeholder="Select your occupation…"
        items={OCCUPATIONS}
        onChange={v => onChange('occupation', v)}
        required
      />

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:      { gap: 16 },
  fieldWrap:    { gap: 5 },
  fieldLabel:   { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  readOnlyRow:  { flexDirection: 'row', alignItems: 'center', height: 48, borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, gap: 8 },
  readOnlyText: { flex: 1, fontSize: 14 },
  lockedBadge:  { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  lockedText:   { fontSize: 10, fontWeight: '600' },
  phoneGroup:   { gap: 8 },
  groupLabel:   { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
});