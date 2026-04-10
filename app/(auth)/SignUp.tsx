import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets }    from 'react-native-safe-area-context';
import { useColors }            from '@/constants/Colors';
import { api }                  from '@/services/api';
import { useAuth }              from '@/context/AuthContext';
import ScreenHeader             from '@/components/Headers/ScreenHeader';
import AvatarPicker             from '@/components/ImagePickers/AvatarPicker';
import ProfileFormSection       from '@/components/Sections/ProfileFormSection';
import type { ProfileFormValues } from '@/components/Sections/ProfileFormSection';

type GenderValue = 'male' | 'female';

const toGenderValue = (label: string): GenderValue =>
  label.toLowerCase() as GenderValue;

const INITIAL: ProfileFormValues = {
  name:        '',
  gender:      '',
  ghanaPhone:  '',
  ghanaE164:   '',
  frenchPhone: '',
  frenchE164:  '',
  city:        '',
  occupation:  '',
};

/**
 * SignUp screen — collects profile data for first-time users.
 *
 * After successful submit, it calls refreshProfile() on AuthContext.
 * That re-fetches the user from the backend, sets state to 'authenticated',
 * which causes NavigationGuard to route to (tabs)/(home) automatically.
 *
 * This screen never calls router.replace() directly.
 */
export default function SignUpScreen() {
  const insets  = useSafeAreaInsets();
  const C       = useColors();
  const { refreshProfile } = useAuth();
  const params  = useLocalSearchParams<{
    name: string; email: string; photoUrl: string;
  }>();

  const [form,     setForm]     = useState<ProfileFormValues>({
    ...INITIAL,
    name: params.name ?? '',
  });
  const [photoUri, setPhotoUri] = useState(params.photoUrl ?? '');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const onChange = <K extends keyof ProfileFormValues>(
    key: K,
    value: ProfileFormValues[K],
  ) => setForm(prev => ({ ...prev, [key]: value }));

  const isValid =
    form.name.trim().length > 0 &&
    form.gender.length > 0      &&
    form.ghanaE164.length > 0   &&
    form.city.length > 0        &&
    form.occupation.length > 0;

  const initials = form.name
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      setLoading(true);
      setError(null);

      await api.post('/auth/complete-profile', {
        name:         form.name,
        gender:       toGenderValue(form.gender),
        ghana_phone:  form.ghanaE164,
        french_phone: form.frenchE164 || undefined,
        city:         form.city,
        occupation:   form.occupation,
        photo_url:    photoUri || undefined,
      });

      // Refresh auth state — NavigationGuard will route to (tabs)/(home)
      // once state becomes 'authenticated'. No router.replace() needed here.
      await refreshProfile();

    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong. Please try again.');
      setLoading(false);
    }
    // Note: don't setLoading(false) on success — let the navigation handle unmount
  };

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <ScreenHeader
        variant="page"
        title="Complete your profile"
        subtitle="Fill in your details to get started"
        icon="person.crop.circle.badge.checkmark"
        showBack={false}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 48 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AvatarPicker uri={photoUri} initials={initials} onPick={setPhotoUri} />

          <View style={[styles.divider, { backgroundColor: C.border }]} />

          <ProfileFormSection
            values={form}
            email={params.email ?? ''}
            onChange={onChange}
          />

          {error && (
            <View style={[styles.errorCard, {
              backgroundColor: C.dangerSubtle,
              borderColor:     C.borderDanger,
            }]}>
              <Text style={[styles.errorText, { color: C.textDanger }]}>⚠️ {error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.cta, {
              backgroundColor: isValid && !loading ? C.primary : C.border,
            }]}
            disabled={!isValid || loading}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={[styles.ctaText, {
                color: isValid ? C.textInverse : C.textMuted,
              }]}>
                Save & Continue
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:      { flex: 1 },
  scroll:    { padding: 22, gap: 16 },
  divider:   { height: 1, marginVertical: 4 },
  errorCard: { borderRadius: 12, borderWidth: 1, padding: 12 },
  errorText: { fontSize: 13, fontWeight: '500' },
  cta:       { borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  ctaText:   { fontSize: 15, fontWeight: '700' },
});