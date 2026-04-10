import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/Headers/AppHeader';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UpcomingBanner from '@/components/Banners/UpcomingBanner';
import { buildSchedule } from '../(community)/eventCalendar';
import AnnouncementList from '@/components/Lists/AnnouncementList';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useNotifications } from '@/context/NotificationContext';

function getUpcomingMeeting(year) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const schedule = buildSchedule(year, year);
  return schedule.find(m => m.date >= today) ?? null;
}

// ✅ Updated to Ionicons names
const quickActions = [
  { icon: 'card', label: 'Pay Dues', route: '/(account)/paydues' },
  { icon: 'people', label: 'About Us', route: '/(tabs)/(more)/aboutus' },
  { icon: 'play', label: 'Learn', route: '/(tabs)/(learn)' },
  { icon: 'compass', label: 'Explore', route: '/(tabs)/(community)' },
];

export default function HomeScreen() {
  const router  = useRouter();
  const C       = useColors();
  const insets  = useSafeAreaInsets();
  const {status, requestPermission} = useNotifications();
  const { data: announcements, loading, error } = useAnnouncements();

  const upcoming = getUpcomingMeeting(new Date().getFullYear());

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
      <AppHeader variant="home" hasNotification />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {status !== 'granted' && (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={async () => {
      const granted = await requestPermission();
      if (!granted && status === 'denied') {
        Linking.openSettings();
      }
    }}
    style={[
      styles.notifBanner,
      { backgroundColor: C.primarySubtle, borderColor: C.primary }
    ]}
  >
    <Ionicons name="notifications-outline" size={20} color={C.primary} />

    <View style={{ flex: 1 }}>
      <Text style={[styles.notifTitle, { color: C.textPrimary }]}>
        Turn on notifications
      </Text>
      <Text style={[styles.notifSub, { color: C.textMuted }]}>
        Stay updated with events and announcements
      </Text>
    </View>

    <Ionicons name="chevron-forward" size={18} color={C.primary} />
  </TouchableOpacity>
)}
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
          {quickActions.map(a => (
            <TouchableOpacity
              key={a.label}
              style={[
                styles.actionTile,
                { backgroundColor: C.surface, borderColor: C.border },
              ]}
              onPress={() => router.push(a.route)}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: C.primarySubtle },
                ]}
              >
                <Ionicons
                  size={20}
                  name={`${a.icon}-outline`}
                  color={C.primary}
                />
              </View>

              <Text
                numberOfLines={1}
                style={[styles.actionLabel, { color: C.textPrimary }]}
              >
                {a.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: C.textPrimary }]}>
          Announcements
        </Text>

        <AnnouncementList
          data={announcements}
          loading={loading}
          error={error}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 24,
  },

  actionTile: {
    width: '23%',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 8,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: -12,
  },
  notifBanner: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 14,
  borderRadius: 14,
  borderWidth: 1,
  marginBottom: 16,
  gap: 12,
},

notifTitle: {
  fontSize: 14,
  fontWeight: '600',
},

notifSub: {
  fontSize: 12,
},
});