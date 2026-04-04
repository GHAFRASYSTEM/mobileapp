import React from 'react';
import {
  ScrollView, View, Text, StyleSheet,
  TouchableOpacity, Image,
} from 'react-native';
import { useColors } from '../../../constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';
import { useRouter } from 'expo-router';
import UpcomingBanner from '@/components/Banners/UpcomingBanner';
import { buildSchedule } from '../(community)/eventCalendar';

function getUpcomingMeeting(year) {
  const today = new Date(); 
  today.setHours(0, 0, 0, 0);

  const schedule = buildSchedule(year, year);

  return schedule.find(m => m.date >= today) ?? null;
}

export default function HomeScreen() {
  const router = useRouter();
  const C = useColors();
    const currentYear = new Date().getFullYear();
  const upcoming = getUpcomingMeeting(currentYear);

const quickActions = [
  { icon: 'creditcard.fill',  label: 'Pay Dues', route: '/(account)/paydues' },
  { icon: 'person.2.fill',    label: 'About Us', route: '/(tabs)/(more)/aboutus' },
  { icon: 'play.rectangle.fill', label: 'Learn', route: '/(tabs)/(learn)' },
  { icon: 'ellipsis.circle.fill', label: 'Explore', route: '/(tabs)/(community)' },
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
          {upcoming && (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() => router.push('/(tabs)/(community)/eventCalendar')}
  >
    <UpcomingBanner meeting={upcoming} />
  </TouchableOpacity>
)}

        {/* Quick Actions */}
        <View style={styles.grid}>
{quickActions.map((a) => (
  <TouchableOpacity
    key={a.label}
    style={[styles.actionTile, { backgroundColor: C.surface, borderColor: C.border }]}
    onPress={() => router.push(a.route)}
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
  marginVertical: 24,
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
  actionLabel:      { fontSize: 11, fontWeight: '600', paddingTop:8 },
});