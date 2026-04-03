import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function MyCardScreen() {
  const C = useColors();
  const [flipped, setFlipped] = useState(false);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: C.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: C.textPrimary }]}>My Card</Text>
        <Text style={[styles.pageSubtitle, { color: C.textSecondary }]}>
          Present this to verify your membership
        </Text>

        {/* Card */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => setFlipped(!flipped)}>
          <View style={[styles.card, { backgroundColor: C.cardBg }]}>
            <View style={[styles.cardStripe, { backgroundColor: C.cardStripe }]} />
            {!flipped ? (
              <View style={styles.cardFront}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardOrg, { color: C.cardMeta }]}>GHAFRA</Text>
                  <View style={[styles.statusDot, { backgroundColor: C.statusValid }]} />
                </View>
                <Text style={[styles.cardName, { color: C.cardText }]}>Kwame Asante</Text>
                <Text style={[styles.cardId, { color: C.cardMeta }]}>GH-2024-00412</Text>
                <View style={styles.cardFooter}>
                  <Text style={[styles.cardMeta, { color: C.cardMeta }]}>Valid until Dec 2025</Text>
                  <View style={[styles.validBadge, { backgroundColor: C.cardValid }]}>
                    <Text style={styles.validText}>VALID</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.cardBack}>
                <Text style={[styles.backLabel, { color: C.cardMeta }]}>MEMBER SINCE</Text>
                <Text style={[styles.backValue, { color: C.cardText }]}>January 2022</Text>
                <Text style={[styles.backLabel, { color: C.cardMeta, marginTop: 16 }]}>REGION</Text>
                <Text style={[styles.backValue, { color: C.cardText }]}>Greater Accra</Text>
                <Text style={[styles.backLabel, { color: C.cardMeta, marginTop: 16 }]}>MEMBERSHIP TYPE</Text>
                <Text style={[styles.backValue, { color: C.cardText }]}>Full Member</Text>
              </View>
            )}
            <Text style={[styles.flipHint, { color: C.cardMeta }]}>Tap to flip</Text>
          </View>
        </TouchableOpacity>

        {/* Actions */}
        {[
          { icon: 'arrow.down.circle.fill', label: 'Download Card',  sub: 'Save as PDF to your device'  },
          { icon: 'square.and.arrow.up',    label: 'Share Card',     sub: 'Send to contacts or apps'    },
          { icon: 'qrcode',                 label: 'Show QR Code',   sub: 'For quick verification'      },
          { icon: 'exclamationmark.circle', label: 'Report Issue',   sub: 'Something wrong with your card?' },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.actionRow, { backgroundColor: C.surface, borderColor: C.border }]}
          >
            <View style={[styles.actionIcon, { backgroundColor: C.primarySubtle }]}>
              <IconSymbol size={20} name={item.icon} color={C.primary} />
            </View>
            <View style={styles.actionText}>
              <Text style={[styles.actionLabel, { color: C.textPrimary }]}>{item.label}</Text>
              <Text style={[styles.actionSub, { color: C.textMuted }]}>{item.sub}</Text>
            </View>
            <IconSymbol size={16} name="chevron.right" color={C.textMuted} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1 },
  scroll:       { padding: 20 },
  pageTitle:    { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  pageSubtitle: { fontSize: 14, marginBottom: 24 },
  card:         { borderRadius: 20, overflow: 'hidden', marginBottom: 28, minHeight: 200 },
  cardStripe:   { height: 8 },
  cardFront:    { padding: 20, gap: 6 },
  cardBack:     { padding: 20 },
  cardHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardOrg:      { fontSize: 11, letterSpacing: 2, fontWeight: '700' },
  statusDot:    { width: 10, height: 10, borderRadius: 5 },
  cardName:     { fontSize: 22, fontWeight: '700' },
  cardId:       { fontSize: 13 },
  cardFooter:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  cardMeta:     { fontSize: 12 },
  validBadge:   { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  validText:    { fontSize: 10, color: '#fff', fontWeight: '700', letterSpacing: 1 },
  backLabel:    { fontSize: 10, letterSpacing: 1.5, fontWeight: '600' },
  backValue:    { fontSize: 16, fontWeight: '600', marginTop: 2 },
  flipHint:     { textAlign: 'center', fontSize: 11, paddingBottom: 12 },
  actionRow:    { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10, gap: 12 },
  actionIcon:   { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionText:   { flex: 1 },
  actionLabel:  { fontSize: 14, fontWeight: '600' },
  actionSub:    { fontSize: 12, marginTop: 1 },
});