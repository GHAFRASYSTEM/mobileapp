import React from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Executive } from '@/assets/data/executivesData';
import type { useColors } from '@/constants/Colors';
import { getExecutiveAccent } from '@/utils/executiveAccent';

type Props = {
  executive: Executive | null;
  visible: boolean;
  onClose: () => void;
  C: ReturnType<typeof useColors>;
};

function open(url?: string) {
  if (url) Linking.openURL(url).catch(() => {});
}

/** Thin decorative divider with a centred label — mirrors EngineerModal */
function SectionHeading({ label, C, accent }: {
  label: string;
  C: ReturnType<typeof useColors>;
  accent: string;
}) {
  return (
    <View style={headingStyles.row}>
      <View style={[headingStyles.line, { backgroundColor: C.border }]} />
      <Text style={[headingStyles.label, { color: accent }]}>{label}</Text>
      <View style={[headingStyles.line, { backgroundColor: C.border }]} />
    </View>
  );
}

const headingStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 14,
    gap: 10,
  },
  line: { flex: 1, height: 1 },
  label: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
});

export default function ExecutiveModal({ executive, visible, onClose, C }: Props) {
  if (!executive) return null;

  const accent = getExecutiveAccent(executive.name);
  const isDarkAccent = accent === '#FCD116' || accent === '#FFFFFF';
  const textOnAccent = isDarkAccent ? '#1A1A18' : '#fff';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.root, { backgroundColor: C.background }]}>
        {/* ── Hero ── */}
        <View style={[styles.hero, { backgroundColor: accent }]}>
          {/* Diagonal stripe pattern overlay */}
          <View style={styles.heroPattern} pointerEvents="none">
            {Array.from({ length: 8 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.diagonal,
                  { left: i * 52 - 20, opacity: 0.06 },
                ]}
              />
            ))}
          </View>

          {/* Close pill */}
          <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={14}>
            <View style={[styles.closePill, { backgroundColor: `${textOnAccent}30` }]}>
              <Text style={[styles.closeTxt, { color: textOnAccent }]}>✕  Close</Text>
            </View>
          </Pressable>

          {/* Avatar */}
          <View style={[styles.avatarOuter, { borderColor: textOnAccent }]}>
            <View style={[styles.avatarInner, { borderColor: C.surface }]}>
              <Image source={executive.image} style={styles.avatar} resizeMode="cover" />
            </View>
          </View>

          {/* Name + Role */}
          <Text style={[styles.heroName, { color: textOnAccent }]}>{executive.name}</Text>
<Text style={[styles.heroRole, { color: `${textOnAccent}CC` }]}>
  {executive.role}
</Text>
{executive.department && (
  <Text style={[styles.heroDept, { color: `${textOnAccent}99` }]}>
    {executive.department}
  </Text>
)}

          {/* Wave divider */}
          <View style={[styles.wave, { backgroundColor: C.surface }]} />
        </View>

        {/* ── Body ── */}
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          bounces
        >
          {/* About */}
          <SectionHeading label="About" C={C} accent={accent} />
          <Text style={[styles.bodyText, { color: C.textPrimary }]}>{executive.bio}</Text>

          {/* Contact */}
          {(executive.email || executive.phone) && (
            <>
              <SectionHeading label="Contact" C={C} accent={accent} />
              {executive.email && (
                <View style={styles.bullet}>
                  <View style={[styles.bulletBadge, { backgroundColor: accent + '22' }]}>
                    <Text style={[styles.bulletNum, { color: accent }]}>@</Text>
                  </View>
                  <Text
                    style={[styles.bulletTxt, { color: C.textPrimary }]}
                    onPress={() => open(`mailto:${executive.email}`)}
                  >
                    {executive.email}
                  </Text>
                </View>
              )}
              {executive.phone && (
                <View style={styles.bullet}>
                  <View style={[styles.bulletBadge, { backgroundColor: accent + '22' }]}>
                    <Text style={[styles.bulletNum, { color: accent }]}>☎</Text>
                  </View>
                  <Text
                    style={[styles.bulletTxt, { color: C.textPrimary }]}
                    onPress={() => open(`tel:${executive.phone}`)}
                  >
                    {executive.phone}
                  </Text>
                </View>
              )}
            </>
          )}

          {/* Since badge */}
          {executive.since && (
            <>
              <SectionHeading label="Tenure" C={C} accent={accent} />
              <View style={styles.bullet}>
                <View style={[styles.bulletBadge, { backgroundColor: accent + '22' }]}>
                  <Text style={[styles.bulletNum, { color: accent }]}>★</Text>
                </View>
                <Text style={[styles.bulletTxt, { color: C.textPrimary }]}>
                  Member since {executive.since} · GHAFRA
                </Text>
              </View>
            </>
          )}

          <View style={{ height: 52 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const HERO_PT = Platform.OS === 'ios' ? 20 : 32;

const styles = StyleSheet.create({
  root: { flex: 1 },

  // ── Hero ──
  hero: {
    alignItems: 'center',
    paddingTop: HERO_PT,
    paddingBottom: 0,
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  heroPattern: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  diagonal: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    width: 28,
    backgroundColor: '#fff',
    transform: [{ rotate: '20deg' }],
  },

  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  closePill: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  closeTxt: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  avatarOuter: {
    width: 170,
    height: 170,
    borderRadius: 36,
    borderWidth: 3,
    padding: 3,
    marginBottom: 14,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 33,
    borderWidth: 2,
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },

  heroName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  heroRole: {
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 5,
  },
  heroDept: {
  fontSize: 11,
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: 1.1,
  marginTop: 3,
  textAlign: 'center',
  marginBottom: 22,
},
  wave: {
    height: 4,
    width: '140%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  // ── Body ──
  body: {
    paddingHorizontal: 20,
  },
  bodyText: {
    fontSize: 14.5,
    lineHeight: 24,
    letterSpacing: 0.1,
  },

  bullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  bulletBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  bulletNum: {
    fontSize: 14,
    fontWeight: '800',
  },
  bulletTxt: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 5,
  },
});