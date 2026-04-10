import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity,
  Image, ScrollView, Animated, Linking, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { deptAccent } from '../Cards/ExecutiveCard';
import type { Executive } from '@/assets/data/executivesData';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof IconSymbol>['name'];
const { height } = Dimensions.get('window');

type Props = {
  executive: Executive | null;
  onClose:   () => void;
};

function ContactRow({ icon, label, value, onPress }: {
  icon: IconName; label: string; value: string; onPress?: () => void;
}) {
  const C = useColors();
  return (
    <TouchableOpacity
      style={[styles.contactRow, { backgroundColor: C.background, borderColor: C.border }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.75 : 1}
    >
      <View style={[styles.contactIcon, { backgroundColor: C.primarySubtle }]}>
        <IconSymbol name={icon} size={15} color={C.primary} />
      </View>
      <View style={styles.contactText}>
        <Text style={[styles.contactLabel, { color: C.textMuted }]}>{label}</Text>
        <Text style={[styles.contactValue, { color: C.textPrimary }]}>{value}</Text>
      </View>
      {onPress && <IconSymbol name="arrow.up.right" size={13} color={C.textMuted} />}
    </TouchableOpacity>
  );
}

export default function ExecutiveModal({ executive, onClose }: Props) {
  const C      = useColors();
  const insets = useSafeAreaInsets();
  const slideY = useRef(new Animated.Value(height)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (executive) {
      Animated.parallel([
        Animated.timing(fadeIn, {
          toValue: 1, duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideY, {
          toValue: 0, damping: 22, stiffness: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideY.setValue(height);
      fadeIn.setValue(0);
    }
  }, [executive]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 0, duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(slideY, {
        toValue: height, duration: 220,
        useNativeDriver: true,
      }),
    ]).start(onClose);
  };

  if (!executive) return null;

  const accent        = deptAccent(executive.department, C.primary);
  const isDarkAccent  = accent === '#FCD116';
  const textOnAccent  = isDarkAccent ? '#1A1A18' : '#fff';

  return (
    <Modal visible={!!executive} transparent animationType="none" statusBarTranslucent>
      {/* Scrim */}
      <Animated.View style={[styles.scrim, { opacity: fadeIn }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: C.background,
            paddingBottom:   insets.bottom + 24,
            transform:       [{ translateY: slideY }],
          },
        ]}
      >
        {/* Drag handle */}
        <View style={[styles.handle, { backgroundColor: C.border }]} />

        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: accent }]}>
          {/* Ghana flag stripe */}
          <View style={styles.flagBar}>
            {['#CE1126', '#FCD116', '#006B3F', '#FCD116', '#CE1126'].map((c, i) => (
              <View key={i} style={[styles.flagSeg, { backgroundColor: c }]} />
            ))}
          </View>

          <View style={styles.heroContent}>
            {/* Photo */}
            <View style={[styles.heroPhotoRing, { borderColor: `${textOnAccent}40` }]}>
              <Image source={executive.image} style={styles.heroPhoto} resizeMode="cover" />
            </View>

            <View style={styles.heroText}>
              <Text style={[styles.heroName, { color: textOnAccent }]}>
                {executive.name}
              </Text>
              <View style={[styles.heroPill, { backgroundColor: `${textOnAccent}20` }]}>
                <Text style={[styles.heroPillText, { color: textOnAccent }]}>
                  {executive.role}
                </Text>
              </View>
              <Text style={[styles.heroDept, { color: `${textOnAccent}B0` }]}>
                {executive.department}
                {executive.since ? `  ·  Since ${executive.since}` : ''}
              </Text>
            </View>
          </View>

          {/* Close */}
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <IconSymbol name="xmark" size={16} color={textOnAccent} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollBody}
          showsVerticalScrollIndicator={false}
        >
          {/* Bio */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: C.textMuted }]}>ABOUT</Text>
            <Text style={[styles.bio, { color: C.textSecondary }]}>
              {executive.bio}
            </Text>
          </View>

          {/* Contact */}
          {(executive.email || executive.phone) && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: C.textMuted }]}>CONTACT</Text>
              <View style={styles.contactList}>
                {executive.email && (
                  <ContactRow
                    icon="envelope.fill"
                    label="Email"
                    value={executive.email}
                    onPress={() => Linking.openURL(`mailto:${executive.email}`)}
                  />
                )}
                {executive.phone && (
                  <ContactRow
                    icon="phone.fill"
                    label="Phone"
                    value={executive.phone}
                    onPress={() => Linking.openURL(`tel:${executive.phone}`)}
                  />
                )}
              </View>
            </View>
          )}

          {/* Role badge */}
          <View style={[styles.roleBadge, { backgroundColor: accent + '18', borderColor: accent + '40' }]}>
            <View style={[styles.roleDot, { backgroundColor: accent }]} />
            <Text style={[styles.roleBadgeText, { color: accent }]}>
              {executive.role} · GHAFRA {executive.since ? `(${executive.since}–present)` : ''}
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim:        { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet:        { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden', maxHeight: height * 0.88 },
  handle:       { width: 38, height: 4, borderRadius: 2, alignSelf: 'center', marginTop: 10, marginBottom: 2 },

  // Hero
  hero:         { paddingTop: 4, paddingHorizontal: 20, paddingBottom: 22 },
  flagBar:      { flexDirection: 'row', height: 4, marginBottom: 18 },
  flagSeg:      { flex: 1 },
  heroContent:  { flexDirection: 'row', gap: 16, alignItems: 'center' },
  heroPhotoRing:{ width: 80, height: 80, borderRadius: 40, borderWidth: 2.5, overflow: 'hidden' },
  heroPhoto:    { width: '100%', height: '100%' },
  heroText:     { flex: 1, gap: 6 },
  heroName:     { fontSize: 20, fontWeight: '900' },
  heroPill:     { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  heroPillText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  heroDept:     { fontSize: 12 },
  closeBtn:     { position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center' },

  // Body
  scrollBody:   { padding: 20, gap: 20 },
  section:      { gap: 10 },
  sectionTitle: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  bio:          { fontSize: 14, lineHeight: 22 },

  // Contact
  contactList:  { gap: 8 },
  contactRow:   { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, borderWidth: 1 },
  contactIcon:  { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  contactText:  { flex: 1 },
  contactLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
  contactValue: { fontSize: 13, fontWeight: '600', marginTop: 1 },

  // Role badge
  roleBadge:     { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1 },
  roleDot:       { width: 8, height: 8, borderRadius: 4 },
  roleBadgeText: { fontSize: 12, fontWeight: '600', flex: 1 },
});