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
import SocialIcon from '../icons/SocialIcons';
import type { Engineer } from '@/assets/data/engineerData';
import type { useColors } from '@/constants/Colors';

type Props = {
  engineer: Engineer | null;
  visible: boolean;
  onClose: () => void;
  C: ReturnType<typeof useColors>;
};

function open(url?: string) {
  if (url) Linking.openURL(url).catch(() => {});
}

/** Thin decorative divider with a centred label */
function SectionHeading({ label, C }: { label: string; C: ReturnType<typeof useColors> }) {
  return (
    <View style={headingStyles.row}>
      <View style={[headingStyles.line, { backgroundColor: C.border }]} />
      <Text style={[headingStyles.label, { color: C.primary }]}>{label}</Text>
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

export default function EngineerModal({ engineer, visible, onClose, C }: Props) {
  if (!engineer) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.root, { backgroundColor: C.background }]}>
        {/* ── Hero ── */}
        <View style={[styles.hero, { backgroundColor: C.primary }]}>
          {/* Pattern overlay - diagonal stripes for texture */}
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
            <View style={styles.closePill}>
              <Text style={styles.closeTxt}>✕  Close</Text>
            </View>
          </Pressable>

          {/* Avatar */}
          <View style={[styles.avatarOuter, { borderColor: C.gold }]}>
            <View style={[styles.avatarInner, { borderColor: C.surface }]}>
              <Image source={{ uri: engineer.avatar }} style={styles.avatar} />
            </View>
          </View>

          {/* Name + Role */}
          <Text style={styles.heroName}>{engineer.name}</Text>
          <Text style={[styles.heroRole, { color: C.gold }]}>{engineer.role}</Text>

          {/* Gold wave divider */}
          <View style={[styles.wave, { backgroundColor: C.gold }]} />
        </View>

        {/* ── Body ── */}
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          bounces
        >
          {/* About */}
          <SectionHeading label="About" C={C} />
          <Text style={[styles.bodyText, { color: C.textPrimary }]}>{engineer.fullBio}</Text>

          {/* Contributions */}
          <SectionHeading label="Contributions to GHAFRA" C={C} />
          {engineer.contributions.map((item, idx) => (
            <View key={idx} style={styles.bullet}>
              {/* Numbered badge */}
              <View style={[styles.bulletBadge, { backgroundColor: C.primarySubtle }]}>
                <Text style={[styles.bulletNum, { color: C.primary }]}>
                  {String(idx + 1).padStart(2, '0')}
                </Text>
              </View>
              <Text style={[styles.bulletTxt, { color: C.textPrimary }]}>{item}</Text>
            </View>
          ))}

          {/* Connect */}
          <SectionHeading label="Connect" C={C} />
          <View style={styles.iconsRow}>
            {engineer.linkedin && (
              <SocialIcon
                bg="#0077B5"
                label="in"
                caption="LinkedIn"
                onPress={() => open(engineer.linkedin)}
              />
            )}
            {engineer.github && (
              <SocialIcon
                bg="#24292E"
                label="GH"
                caption="GitHub"
                onPress={() => open(engineer.github)}
              />
            )}
            {engineer.email && (
              <SocialIcon
                bg="#EA4335"
                label="@"
                caption="Email"
                onPress={() => open(`mailto:${engineer.email}`)}
              />
            )}
            {engineer.portfolio && (
              <SocialIcon
                bg={C.primary}
                label="↗"
                caption="Portfolio"
                onPress={() => open(engineer.portfolio)}
              />
            )}
          </View>

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
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  closeTxt: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  avatarOuter: {
    width: 170,
    height: 170,
    borderRadius: 46,
    borderWidth: 3,
    padding: 3,
    marginBottom: 14,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 43,
    borderWidth: 2,
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },

  heroName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  heroRole: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 5,
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

  // Contributions
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
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bulletTxt: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 5,
  },

  // Social icons
  iconsRow: {
    flexDirection: 'row',
    gap: 22,
    flexWrap: 'wrap',
  },
});