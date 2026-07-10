/**
 * app/(standalone)/frenchAI/index.tsx
 *
 * Hub screen — lists all 9 practice modes as navigable rows. Each mode
 * lives on its own route now (chat, roleplay, pronunciation, correction,
 * writing, dictation, reading, fillBlank, flashcards). Level lives in
 * FrenchAIContext (see _layout.tsx) and shows in the header pill — tapping
 * it here cycles the level for every screen, since they all read the same
 * context.
 */

import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useColors } from '@/constants/Colors';
import FrenchAIHeader from '@/components/Headers/FrenchAIHeader';
import { PRACTICE_MODES } from './constants';

export default function FrenchAIHub() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const C = useColors();

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <StatusBar barStyle="light-content" backgroundColor={C.header} />
      <FrenchAIHeader
        paddingTop={insets.top}
        title="French Tutor"
        subtitle="Pick a way to practice"
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {PRACTICE_MODES.map(p => (
          <TouchableOpacity
            key={p.route}
            onPress={() => router.push(p.route as any)}
            style={{
              flexDirection: 'row', alignItems: 'center', gap: 14,
              backgroundColor: C.surface, borderRadius: 14, padding: 16,
              borderWidth: 1, borderColor: C.border,
            }}
          >
            <View style={{
              width: 44, height: 44, borderRadius: 12, backgroundColor: C.primarySubtle,
              alignItems: 'center', justifyContent: 'center',
            }}>
              {p.iconSet === 'mci' ? (
                <MaterialCommunityIcons name={p.icon as any} size={22} color={C.primary} />
              ) : (
                <Ionicons name={p.icon as any} size={22} color={C.primary} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.textPrimary, fontWeight: '700', fontSize: 15 }}>{p.label}</Text>
              <Text style={{ color: C.textSecondary, fontSize: 12, marginTop: 2 }}>{p.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={C.textMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}