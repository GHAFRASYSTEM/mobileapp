import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export default function PendingIdentityCard() {
  const C = useColors();
  return (
    <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
      {/* Top stripe */}
      <View style={[styles.stripe, { backgroundColor: C.primary }]}>
        <Text style={[styles.stripeText, { color: C.textInverse }]}>GHAFRA IDENTITY CARD</Text>
      </View>

      <View style={styles.body}>
        {/* Avatar placeholder */}
        <View style={[styles.avatarBox, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
          <MaterialIcons name="person" size={40} color={C.primary} />
        </View>

        <View style={styles.info}>
          <View style={[styles.pill, { backgroundColor: C.goldSubtle, borderColor: C.gold }]}>
            <MaterialIcons name="schedule" size={13} color={C.gold} />
            <Text style={[styles.pillText, { color: C.textWarning }]}>Awaiting Issuance</Text>
          </View>
          <Text style={[styles.heading, { color: C.textPrimary }]}>
            Your virtual identity card isn't issued yet
          </Text>
          <Text style={[styles.bodyText, { color: C.textSecondary }]}>
            Attend your next GhaFra meeting and verify your identity with a GhaFra Executive to receive your virtual Identity Card here.
          </Text>
        </View>

        {/* Steps */}
        {([
          { icon: 'event',          text: 'Attend a GhaFra meeting' },
          { icon: 'verified-user',  text: 'Verify your identity with an Executive' },
          { icon: 'badge',          text: 'Your virtual identity card will appear here' },
        ] as { icon: IconName; text: string }[]).map((step, i) => (
          <View key={i} style={[styles.step, { borderColor: C.border }]}>
            <View style={[styles.stepIcon, { backgroundColor: C.primarySubtle }]}>
              <MaterialIcons name={step.icon} size={16} color={C.primary} />
            </View>
            <Text style={[styles.stepText, { color: C.textSecondary }]}>{step.text}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: C.primarySubtle, borderColor: C.border }]}>
        <MaterialIcons name="info-outline" size={13} color={C.textMuted} />
        <Text style={[styles.footerText, { color: C.textMuted }]}>
          Card number and QR code will be generated upon issuance
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:      { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  stripe:    { paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center' },
  stripeText:{ fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  body:      { padding: 20, gap: 14, alignItems: 'center' },
  avatarBox: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  info:      { alignItems: 'center', gap: 8 },
  pill:      { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  pillText:  { fontSize: 11, fontWeight: '600' },
  heading:   { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  bodyText:  { fontSize: 13, textAlign: 'center', lineHeight: 19 },
  step:      { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', paddingVertical: 10, borderTopWidth: 1 },
  stepIcon:  { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  stepText:  { fontSize: 13, flex: 1 },
  footer:    { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 12, borderTopWidth: 1, justifyContent: 'center' },
  footerText:{ fontSize: 11 },
});