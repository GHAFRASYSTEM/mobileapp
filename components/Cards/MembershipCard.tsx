import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import QRCode from 'react-native-qrcode-svg';

type Props = {
  name: string;
  id: string;
  validUntil: string;
  region: string;
  city?: string;
  memberSince: string;
  memberType?: string;
  picture?: string;
  verifyCode?: string;
  isExpired?: boolean;
};

function MicroText({ text, color }: { text: string; color: string }) {
  const repeated = Array(30).fill(text).join('  ·  ');
  return (
    <Text style={[styles.microtext, { color }]} numberOfLines={1}>
      {repeated}
    </Text>
  );
}

function GuillochePattern({ color }: { color: string }) {
  const linesA = Array.from({ length: 22 }, (_, i) => {
    const y = i * 16;
    return (
      <Path
        key={`a${i}`}
        d={`M0,${y} C60,${y - 14} 130,${y + 14} 200,${y} S300,${y - 14} 400,${y}`}
        stroke={color}
        strokeWidth="0.55"
        fill="none"
        opacity="0.45"
      />
    );
  });
  const linesB = Array.from({ length: 22 }, (_, i) => {
    const y = i * 16 + 8;
    return (
      <Path
        key={`b${i}`}
        d={`M0,${y} C70,${y + 12} 140,${y - 12} 210,${y} S310,${y + 12} 400,${y}`}
        stroke={color}
        strokeWidth="0.35"
        fill="none"
        opacity="0.25"
      />
    );
  });
  const linesC = Array.from({ length: 12 }, (_, i) => {
    const x = i * 36;
    return (
      <Path
        key={`c${i}`}
        d={`M${x},0 C${x - 10},80 ${x + 10},160 ${x},240 S${x - 10},320 ${x},400`}
        stroke={color}
        strokeWidth="0.3"
        fill="none"
        opacity="0.2"
      />
    );
  });

  return (
    <Svg
      width="100%"
      height="100%"
      style={StyleSheet.absoluteFillObject}
      preserveAspectRatio="xMidYMid slice"
    >
      {linesA}
      {linesB}
      {linesC}
    </Svg>
  );
}

function DotMatrix({ color }: { color: string }) {
  const dots = [];
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 30; col++) {
      dots.push(
        <Circle
          key={`${row}-${col}`}
          cx={col * 16 + 8}
          cy={row * 16 + 8}
          r="0.7"
          fill={color}
          opacity="0.18"
        />
      );
    }
  }
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFillObject}>
      {dots}
    </Svg>
  );
}

export default function MembershipCard({
  name,
  id,
  validUntil,
  region,
  city,
  memberSince,
  memberType = 'Full Member',
  picture,
  verifyCode,
  isExpired = false,
}: Props) {
  const scheme  = useColorScheme();
  const C       = useColors();
  const isLight = scheme === 'light';

  const verifyUrl = verifyCode
    ? `https://backend-016i.onrender.com/dues/verify/${verifyCode}`
    : null;

  return (
    <View style={[styles.card, { backgroundColor: C.cardBg }]}>

      {/* ── Security layer 1: Guilloche ── */}
      <GuillochePattern color={isLight ? '#006B3F' : '#ffffff'} />

      {/* ── Security layer 2: Dot matrix ── */}
      <DotMatrix color={isLight ? '#006B3F' : '#ffffff'} />

      {/* ── Security layer 3: Coat of arms watermark ── */}
      <Image
        source={require('@/assets/images/coatofarm.png')}
        style={[styles.watermark, { opacity: isLight ? 0.06 : 0.035 }]}
        resizeMode="contain"
      />

      {/* ── Security layer 4: Second watermark offset ── */}
      <Image
        source={require('@/assets/images/coatofarm.png')}
        style={[styles.watermarkOffset, { opacity: isLight ? 0.03 : 0.02 }]}
        resizeMode="contain"
      />

      {/* ── Holographic top stripe ── */}
      <LinearGradient
        colors={['#006B3F', '#00A878', '#FFD700', '#CE1126', '#006B3F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.holoStripe}
      />

      {/* ── Microtext security band (top) ── */}
      <View style={[styles.microtextBand, { backgroundColor: C.cardStripe + '15' }]}>
        <MicroText text={`GHAFRA · ${id} · ${name.toUpperCase()}`} color={C.cardStripe} />
      </View>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.orgName, { color: C.cardStripe }]}>GHAFRA</Text>
          <Text style={[styles.orgSubtitle, { color: C.cardMeta }]}>
            Ghana France Association
          </Text>
        </View>
        <View style={styles.headerRight}>
          {isExpired && (
            <View style={styles.expiredBadge}>
              <Text style={styles.expiredText}>EXPIRED</Text>
            </View>
          )}
          <View style={[styles.securityCorner, { borderColor: C.cardStripe + '40' }]}>
            <Text style={[styles.securityCornerText, { color: C.cardStripe }]}>ID</Text>
          </View>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: C.cardMeta, opacity: 0.12 }]} />

      {/* ── Body ── */}
      <View style={styles.body}>

        {/* ── Left column: photo + badges ── */}
        <View style={styles.photoCol}>
          {picture ? (
            <View style={[styles.photoFrame, { borderColor: C.cardStripe + '50' }]}>
              <Image source={{ uri: picture }} style={styles.photo} />
              <View style={styles.photoOverlay} pointerEvents="none">
                <Text style={styles.photoWatermark}>GHAFRA</Text>
              </View>
              <View style={[styles.photoCornerTL, { borderColor: C.cardStripe }]} />
              <View style={[styles.photoCornerBR, { borderColor: C.cardStripe }]} />
            </View>
          ) : (
            <View style={[
              styles.photoPlaceholder,
              { backgroundColor: C.cardMeta + '33', borderColor: C.cardStripe + '50' }
            ]}>
              <Text style={[styles.photoInitials, { color: C.cardText }]}>
                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Text>
            </View>
          )}

          <View style={[styles.memberTypePill, { backgroundColor: C.cardStripe + '20' }]}>
            <Text style={[styles.memberTypeText, { color: C.cardStripe }]}>{memberType}</Text>
          </View>

          <View style={[
            styles.validBadge,
            { backgroundColor: isExpired ? '#CC0000' : C.cardValid },
          ]}>
            <View style={styles.validDot} />
            <Text style={styles.validText}>{isExpired ? 'EXPIRED' : 'ACTIVE'}</Text>
          </View>
        </View>

        {/* ── Right column: name top, then details + QR below ── */}
        <View style={styles.rightCol}>

          {/* Name sits at the very top, aligned with the photo */}
          <Text style={[styles.name, { color: C.cardText }]} numberOfLines={2}>{name}</Text>
          <Text style={[styles.id, { color: C.cardMeta }]}>
            {id.match(/.{1,4}/g)?.join(' ') ?? id}
          </Text>

          {/* Details and QR sit side by side below the name */}
          <View style={styles.detailsAndQr}>

            {/* Meta grid: two rows */}
            <View style={styles.metaGrid}>
              {/* Row 1: City + Since */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: C.cardMeta }]}>CITY</Text>
                  <Text style={[styles.metaValue, { color: C.cardText }]}>{city ?? '—'}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: C.cardMeta }]}>SINCE</Text>
                  <Text style={[styles.metaValue, { color: C.cardText }]}>{memberSince}</Text>
                </View>
              </View>
              {/* Row 2: Valid Until + Region */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: C.cardMeta }]}>VALID UNTIL</Text>
                  <Text style={[
                    styles.metaValue,
                    { color: isExpired ? '#CC0000' : C.cardText }
                  ]}>
                    {validUntil}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: C.cardMeta }]}>REGION</Text>
                  <Text style={[styles.metaValue, { color: C.cardText }]}>{region}</Text>
                </View>
              </View>
            </View>

            {/* QR code — bottom-right of the right column */}
            <View style={[
              styles.qrWrapper,
              { backgroundColor: '#ffffff', borderColor: C.cardStripe + '30' }
            ]}>
              {verifyUrl ? (
                <>
                  <QRCode
                    value={verifyUrl}
                    size={56}
                    color="#000000"
                    backgroundColor="#ffffff"
                  />
                  <Text style={styles.qrLabel}>GHAFRA</Text>
                </>
              ) : (
                <View style={styles.qrPlaceholder}>
                  <Text style={[styles.qrPlaceholderText, { color: C.cardMeta }]}>
                    NOT{'\n'}ISSUED
                  </Text>
                </View>
              )}
            </View>

          </View>
        </View>

      </View>

      <View style={[styles.divider, { backgroundColor: C.cardMeta, opacity: 0.12 }]} />

      {/* ── Bottom microtext security band ── */}
      <LinearGradient
        colors={[C.cardStripe, C.cardStripe + 'CC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.microtextBandBottom}
      >
        <MicroText
          text={`${name.toUpperCase()} · ${id} · GHAFRA · ${region.toUpperCase()}`}
          color="#ffffff"
        />
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },

  watermark: {
    position: 'absolute',
    width: 280,
    height: 230,
    alignSelf: 'center',
    top: '15%',
    zIndex: 0,
  },
  watermarkOffset: {
    position: 'absolute',
    width: 160,
    height: 130,
    right: 10,
    bottom: 30,
    zIndex: 0,
  },

  holoStripe: { height: 8 },

  microtextBand: {
    paddingVertical: 3,
    paddingHorizontal: 18,
    overflow: 'hidden',
  },
  microtextBandBottom: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    overflow: 'hidden',
  },
  microtext: {
    fontSize: 5,
    letterSpacing: 0.5,
    fontWeight: '500',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    zIndex: 1,
  },
  headerLeft:    { gap: 1 },
  headerRight:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  orgName:       { fontSize: 15, fontWeight: '800', letterSpacing: 2 },
  orgSubtitle:   { fontSize: 8, letterSpacing: 1, fontWeight: '500', opacity: 0.7 },

  securityCorner: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityCornerText: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },

  expiredBadge: {
    backgroundColor: '#CC0000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  expiredText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 1 },

  divider: { height: 1, marginHorizontal: 18, zIndex: 1 },

  body: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 14,
    zIndex: 1,
    alignItems: 'flex-start',  // both columns start from the same top edge
  },

  /* ── Left column ── */
  photoCol: { alignItems: 'center', gap: 6 },
  photoFrame: {
    position: 'relative',
    borderWidth: 1.5,
    borderRadius: 13,
    overflow: 'hidden',
  },
  photo: { width: 68, height: 68 },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-30deg' }],
  },
  photoWatermark: {
    fontSize: 8,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
  },
  photoCornerTL: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 1,
  },
  photoCornerBR: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 10,
    height: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 1,
  },
  photoPlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoInitials: { fontSize: 22, fontWeight: '700' },

  memberTypePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  memberTypeText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },

  validBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  validDot:  { width: 5, height: 5, borderRadius: 3, backgroundColor: '#fff' },
  validText: { fontSize: 9, color: '#fff', fontWeight: '700', letterSpacing: 1 },

  /* ── Right column ── */
  rightCol: {
    flex: 1,
    gap: 4,
  },

  name: { fontSize: 17, fontWeight: '700', lineHeight: 21 },
  id:   { fontSize: 11, letterSpacing: 1.5, fontFamily: 'monospace' },

  /* Details + QR sit side by side */
  detailsAndQr: {
    flexDirection: 'row',
    alignItems: 'flex-end',  // QR bottom-aligns with the meta grid
    gap: 10,
    marginTop: 6,
  },

  metaGrid: { flex: 1, gap: 6, marginBottom:15 },
  metaRow:  { flexDirection: 'row', gap: 16 },
  metaItem: { gap: 1 },
  metaLabel: { fontSize: 9, letterSpacing: 1.2, fontWeight: '600' },
  metaValue: { fontSize: 12, fontWeight: '600' },

  /* QR */
  qrWrapper: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    gap: 3,
  },
  qrLabel: {
    fontSize: 6,
    fontWeight: '800',
    color: '#006B3F',
    letterSpacing: 1.5,
  },
  qrPlaceholder: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrPlaceholderText: {
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
});