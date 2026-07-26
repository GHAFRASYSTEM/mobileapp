import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { whatsappUrl } from '@/utils/phone';

export type VolunteerContact = {
  name:          string;
  email:         string;
  photo_url:     string | null;
  ghana_phone:   string | null;
  french_phone:  string | null;
};

type Props = {
  volunteer: VolunteerContact;
  colors:    any;
};

export function VolunteerContactCard({ volunteer, colors: C }: Props) {
  const ghWhatsapp = whatsappUrl(volunteer.ghana_phone, 'GH');
  const frWhatsapp = whatsappUrl(volunteer.french_phone, 'FR');

  const openLink = (url: string | null) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={[styles.card, { backgroundColor: C.primarySubtle, borderColor: C.primary }]}>
      <Text style={[styles.title, { color: C.primary }]}>YOUR VOLUNTEER</Text>

      <View style={styles.row}>
        <View style={[styles.avatar, { backgroundColor: C.surface }]}>
          {volunteer.photo_url ? (
            <Image source={{ uri: volunteer.photo_url }} style={styles.avatarImg} />
          ) : (
            <Text style={{ color: C.primary, fontWeight: '700', fontSize: 16 }}>
              {volunteer.name?.[0]?.toUpperCase() ?? '?'}
            </Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: C.textPrimary }]}>{volunteer.name}</Text>
          <Text style={[styles.email, { color: C.textMuted }]} numberOfLines={1}>{volunteer.email}</Text>
        </View>
      </View>

      <View style={styles.contactRow}>
        {ghWhatsapp && (
          <TouchableOpacity
            style={[styles.contactBtn, { backgroundColor: '#25D366' }]}
            onPress={() => openLink(ghWhatsapp)}
          >
            <MaterialIcons name="chat" size={16} color="#fff" />
            <Text style={styles.contactTextWhite}>WhatsApp (GH)</Text>
          </TouchableOpacity>
        )}
        {frWhatsapp && (
          <TouchableOpacity
            style={[styles.contactBtn, { backgroundColor: '#25D366' }]}
            onPress={() => openLink(frWhatsapp)}
          >
            <MaterialIcons name="chat" size={16} color="#fff" />
            <Text style={styles.contactTextWhite}>WhatsApp (FR)</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.contactBtn, styles.contactBtnOutline, { borderColor: C.border, backgroundColor: C.surface }]}
          onPress={() => openLink(`mailto:${volunteer.email}`)}
        >
          <MaterialIcons name="email" size={16} color={C.textPrimary} />
          <Text style={[styles.contactText, { color: C.textPrimary }]}>Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  title: { fontSize: 11, fontWeight: '700', letterSpacing: 0.6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
  },
  avatarImg: { width: '100%', height: '100%' },
  name: { fontSize: 15, fontWeight: '700' },
  email: { fontSize: 12, marginTop: 2 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  contactBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10,
  },
  contactBtnOutline: { borderWidth: 1 },
  contactText: { fontSize: 12, fontWeight: '600' },
  contactTextWhite: { fontSize: 12, fontWeight: '600', color: '#fff' },
});