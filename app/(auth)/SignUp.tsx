import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Image, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from '@/components/ui/icon-symbol';

const REGIONS = [
  'Greater Accra', 'Ashanti', 'Western', 'Eastern',
  'Volta', 'Northern', 'Brong-Ahafo', 'Central',
];

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ name: string; email: string; photoUrl: string }>();

  const [name, setName] = useState(params.name ?? '');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [occupation, setOccupation] = useState('');
  const [photoUri, setPhotoUri] = useState(params.photoUrl ?? '');

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const handleSubmit = () => {
    // TODO: save profile to your backend / auth store
    router.replace('/(tabs)/(home)');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#006B3F" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        {/* Progress bar */}
        <View style={styles.progressRow}>
          <View style={[styles.progressStep, styles.progressDone]} />
          <View style={[styles.progressStep, styles.progressDone]} />
          <View style={[styles.progressStep, styles.progressPending]} />
        </View>
        <Text style={styles.headline}>Complete your profile</Text>
        <Text style={styles.headlineSub}>Step 2 of 3 — Review and add your details</Text>
      </View>

      <View style={styles.goldBar} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={pickPhoto} activeOpacity={0.85}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarInitials}>{initials || '?'}</Text>
              </View>
            )}
            <View style={styles.avatarEditBadge}>
              <IconSymbol name="camera.fill" size={10} color="#000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarHint}>Tap to change photo</Text>
        </View>

        {/* Full name — pre-filled from Google, editable */}
        <Field label="Full name" required>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            placeholderTextColor="#9A9890"
            autoCapitalize="words"
          />
        </Field>

        {/* Email — read-only, from Google */}
        <Field label="Email (from Google)">
          <View style={[styles.input, styles.inputReadOnly]}>
            <Text style={styles.inputReadOnlyText}>{params.email}</Text>
            <View style={styles.lockedBadge}>
              <IconSymbol name="lock.fill" size={10} color="#9A9890" />
              <Text style={styles.lockedText}>via Google</Text>
            </View>
          </View>
        </Field>

        {/* Phone + City row */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Field label="Phone number" required>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+233 …"
                placeholderTextColor="#9A9890"
                keyboardType="phone-pad"
              />
            </Field>
          </View>
          <View style={{ flex: 1 }}>
            <Field label="City">
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="e.g. Accra"
                placeholderTextColor="#9A9890"
              />
            </Field>
          </View>
        </View>

        {/* Region — simple picker placeholder */}
        <Field label="Region / Branch" required>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'space-between' }]}
            onPress={() => {/* open a bottom sheet picker */}}
          >
            <Text style={region ? styles.inputText : styles.inputPlaceholder}>
              {region || 'Select your region…'}
            </Text>
            <IconSymbol name="chevron.down" size={14} color="#9A9890" />
          </TouchableOpacity>
        </Field>

        {/* Occupation */}
        <Field label="Occupation">
          <TextInput
            style={styles.input}
            value={occupation}
            onChangeText={setOccupation}
            placeholder="e.g. Engineer, Nurse, Teacher…"
            placeholderTextColor="#9A9890"
          />
        </Field>

        {/* Note about editable fields */}
        <View style={styles.noteCard}>
          <IconSymbol name="info.circle" size={14} color="#006B3F" />
          <Text style={styles.noteText}>
            Your name and photo were imported from Google. You can update them here at any time.
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.ctaText}>Save & Continue</Text>
          <IconSymbol name="arrow.right" size={18} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Small helper component
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={{ color: '#CE1126' }}> *</Text>}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header:           { backgroundColor: '#006B3F', paddingHorizontal: 20, paddingBottom: 20 },
  progressRow:      { flexDirection: 'row', gap: 6, marginBottom: 14, marginTop: 4 },
  progressStep:     { flex: 1, height: 4, borderRadius: 2 },
  progressDone:     { backgroundColor: '#FCD116' },
  progressPending:  { backgroundColor: 'rgba(255,255,255,0.25)' },
  headline:         { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  headlineSub:      { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 3 },
  goldBar:          { height: 2.5, backgroundColor: '#FCD116' },
  scroll:           { padding: 20, gap: 14 },

  // Avatar
  avatarSection:    { alignItems: 'center', gap: 8, paddingVertical: 8 },
  avatarWrapper:    { position: 'relative' },
  avatarImg:        { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#006B3F' },
  avatarFallback:   { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E8F5EE', borderWidth: 3, borderColor: '#006B3F', alignItems: 'center', justifyContent: 'center' },
  avatarInitials:   { fontSize: 26, fontWeight: '700', color: '#006B3F' },
  avatarEditBadge:  { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FCD116', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  avatarHint:       { fontSize: 12, color: '#006B3F', fontWeight: '600' },

  // Fields
  fieldGroup:       { gap: 5 },
  fieldLabel:       { fontSize: 11, fontWeight: '700', color: '#9A9890', letterSpacing: 0.7, textTransform: 'uppercase' },
  input:            { height: 46, backgroundColor: '#F7F6F2', borderRadius: 12, borderWidth: 1.5, borderColor: '#E8E6DF', paddingHorizontal: 14, fontSize: 14, color: '#1A1A18', flexDirection: 'row', alignItems: 'center' },
  inputText:        { fontSize: 14, color: '#1A1A18', flex: 1 },
  inputPlaceholder: { fontSize: 14, color: '#9A9890', flex: 1 },
  inputReadOnly:    { justifyContent: 'space-between', backgroundColor: '#F0EDE6' },
  inputReadOnlyText:{ fontSize: 14, color: '#5A5950', flex: 1 },
  lockedBadge:      { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#E8E6DF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  lockedText:       { fontSize: 10, color: '#9A9890', fontWeight: '600' },
  row:              { flexDirection: 'row', gap: 10 },

  // Note
  noteCard:         { flexDirection: 'row', gap: 8, backgroundColor: '#E8F5EE', borderRadius: 12, padding: 12, alignItems: 'flex-start' },
  noteText:         { flex: 1, fontSize: 12, color: '#3D6B52', lineHeight: 18 },

  // CTA
  ctaBtn:           { backgroundColor: '#006B3F', borderRadius: 14, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 },
  ctaText:          { fontSize: 15, fontWeight: '700', color: '#fff' },
});