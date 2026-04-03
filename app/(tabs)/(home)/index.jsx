import React from 'react';
import {
  ScrollView, View, Text, StyleSheet,
  TouchableOpacity, Image,
} from 'react-native';
import { useColors } from '../../../constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';


export default function HomeScreen() {
  const C = useColors();

  const quickActions = [
    { icon: 'creditcard.fill',  label: 'My Account'    },
    { icon: 'person.2.fill',    label: 'Community'  },
    { icon: 'play.rectangle.fill', label: 'Learn'  },
    { icon: 'ellipsis.circle.fill', label: 'More'  },
  ];

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
        <AppHeader
        variant="home"
        greeting="Good morning 👋"
        userName="Kwame Asante"
        userInitials="KA"
        hasNotification
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.grid}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.label}
              style={[styles.actionTile, { backgroundColor: C.surface, borderColor: C.border }]}
            >
              <View style={[styles.actionIcon, { backgroundColor: C.primarySubtle }]}>
                <IconSymbol size={22} name={a.icon} color={C.primary} />
              </View>
              <Text
  numberOfLines={1}
  ellipsizeMode="tail"
  style={[styles.actionLabel, { color: C.textPrimary }]}
>
  {a.label}
</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Announcements */}
        <Text style={[styles.sectionTitle, { color: C.textPrimary }]}>Announcements</Text>
        {['Annual General Meeting — Apr 20', 'New learning modules available'].map((item) => (
          <View key={item} style={[styles.announcementRow, { backgroundColor: C.surface, borderColor: C.border }]}>
            <View style={[styles.dot, { backgroundColor: C.primary }]} />
            <Text style={[styles.announcementText, { color: C.textSecondary }]}>{item}</Text>
            <IconSymbol size={16} name="chevron.right" color={C.textMuted} />
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:             { flex: 1 },
  header:           { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting:         { fontSize: 13, opacity: 0.8 },
  name:             { fontSize: 20, fontWeight: '700', marginTop: 2 },
  avatar:           { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  avatarText:       { fontWeight: '700', fontSize: 15 },
  scroll:           { padding: 16 },
  card:             { borderRadius: 16, overflow: 'hidden', marginBottom: 24, height: 140 },
  cardStripe:       { height: 6 },
  cardBody:         { padding: 16, flex: 1, justifyContent: 'space-between' },
  cardLabel:        { fontSize: 10, letterSpacing: 1.5, fontWeight: '600' },
  cardName:         { fontSize: 20, fontWeight: '700' },
  cardRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardMeta:         { fontSize: 12 },
  validBadge:       { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  validText:        { fontSize: 10, color: '#fff', fontWeight: '700', letterSpacing: 1 },
  sectionTitle:     { fontSize: 16, fontWeight: '700', marginBottom: 12 },
grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 24,
},

actionTile: {
  width: '23%', // 👈 4 per row (with spacing)
  paddingVertical: 14,
  paddingHorizontal: 8,
  borderRadius: 14,
  borderWidth: 1,
  alignItems: 'center',
  marginBottom: 12,
},
  actionIcon:       { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionLabel:      { fontSize: 11, fontWeight: '600' },
  announcementRow:  { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 10, gap: 10 },
  dot:              { width: 8, height: 8, borderRadius: 4 },
  announcementText: { flex: 1, fontSize: 13 },
});