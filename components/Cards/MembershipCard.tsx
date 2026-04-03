import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

type Props = {
  name: string;
  id: string;
  validUntil: string;
  region: string;
  memberSince: string;
  memberType?: string;
  picture?: string;
  qrCode?: string;
};

export default function MembershipCard({
  name,
  id,
  validUntil,
  region,
  memberSince,
  memberType = 'Full Member',
  picture,
  qrCode,
}: Props) {
  const scheme = useColorScheme();
const C = useColors();
const isLight = scheme === 'light';
    

  return (
    <View style={[styles.card, { backgroundColor: C.cardBg }]}>

      {/* Top stripe */}
      <View style={[styles.stripe, { backgroundColor: C.cardStripe }]} />

      {/* ── Coat of arms watermark ── */}
      <Image
        source={require('@/assets/images/coatofarm.png')}
         style={[
    styles.watermark,
    {
      opacity: isLight ? 0.2 : 0.06, // increase opacity for light mode
    },
  ]}
        resizeMode="contain"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.orgName, { color: C.cardStripe }]}>GHAFRA</Text>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: C.cardMeta, opacity: 0.15 }]} />

      {/* Body */}
      <View style={styles.body}>

        {/* Left col: photo → member type → valid */}
        <View style={styles.photoCol}>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.photo} />
          ) : (
            <View style={[styles.photoPlaceholder, { backgroundColor: C.cardMeta + '33' }]}>
              <Text style={[styles.photoInitials, { color: C.cardText }]}>
                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Text>
            </View>
          )}
          <View style={[styles.memberTypePill, { backgroundColor: C.cardStripe + '22' }]}>
            <Text style={[styles.memberTypeText, { color: C.cardStripe }]}>{memberType}</Text>
          </View>
          <View style={[styles.validBadge, { backgroundColor: C.cardValid }]}>
            <View style={styles.validDot} />
            <Text style={styles.validText}>VALID</Text>
          </View>
        </View>

        {/* Right col: name, id, meta */}
        <View style={styles.infoCol}>
          <Text style={[styles.name, { color: C.cardText }]} numberOfLines={2}>{name}</Text>
          <Text style={[styles.id, { color: C.cardMeta }]}>{id}</Text>

          <View style={styles.metaGrid}>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={[styles.metaLabel, { color: C.cardMeta }]}>REGION</Text>
                <Text style={[styles.metaValue, { color: C.cardText }]}>{region}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={[styles.metaLabel, { color: C.cardMeta }]}>SINCE</Text>
                <Text style={[styles.metaValue, { color: C.cardText }]}>{memberSince}</Text>
              </View>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: C.cardMeta }]}>VALID UNTIL</Text>
              <Text style={[styles.metaValue, { color: C.cardText }]}>{validUntil}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: C.cardMeta, opacity: 0.15 }]} />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={[styles.scanLabel, { color: C.cardMeta }]}>SCAN TO VERIFY</Text>
          <Text style={[styles.footerHint, { color: C.cardMeta }]}>Present to GHAFRA officials</Text>
        </View>
        <View style={[styles.qrWrapper, { borderColor: C.cardMeta + '30' }]}>
          {qrCode ? (
            <Image source={{ uri: qrCode }} style={styles.qr} />
          ) : (
            <View style={styles.qrPlaceholder}>
              {Array.from({ length: 25 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.qrCell,
                    { backgroundColor: Math.random() > 0.5 ? C.cardText : 'transparent', opacity: 0.6 },
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },

  // Watermark — absolutely centered behind all content
  watermark: {
    position: 'absolute',
    width: 300,
    height: 250,
    alignSelf: 'center',
    top: '30%',
    marginTop: -80,       // half of height to truly center
    opacity: 0.06,        // very subtle — adjust 0.04–0.10 to taste
    zIndex: 0,
  },

  stripe: { height: 7 },

  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
    zIndex: 1,
  },
  orgName: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
  },

  divider: {
    height: 1,
    marginHorizontal: 18,
    zIndex: 1,
  },

  body: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 14,
    zIndex: 1,
  },

  photoCol: { alignItems: 'center', gap: 6 },
  photo: { width: 68, height: 68, borderRadius: 12 },
  photoPlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoInitials: { fontSize: 22, fontWeight: '700' },

  memberTypePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  memberTypeText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },

  validBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  validDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#fff' },
  validText: { fontSize: 9, color: '#fff', fontWeight: '700', letterSpacing: 1 },

  infoCol: { flex: 1, gap: 3 },
  name: { fontSize: 17, fontWeight: '700', lineHeight: 21 },
  id: { fontSize: 11, letterSpacing: 0.5, marginBottom: 8 },

  metaGrid: { gap: 6 },
  metaRow: { flexDirection: 'row', gap: 16 },
  metaItem: { gap: 1 },
  metaLabel: { fontSize: 9, letterSpacing: 1.2, fontWeight: '600' },
  metaValue: { fontSize: 12, fontWeight: '600' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    zIndex: 1,
  },
  footerLeft: { gap: 3 },
  scanLabel: { fontSize: 9, letterSpacing: 1.5, fontWeight: '700' },
  footerHint: { fontSize: 10 },

  qrWrapper: {
    width: 60, height: 60, borderRadius: 8,
    borderWidth: 1, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
  },
  qr: { width: 56, height: 56 },
  qrPlaceholder: { width: 52, height: 52, flexDirection: 'row', flexWrap: 'wrap' },
  qrCell: { width: '20%', aspectRatio: 1 },
});