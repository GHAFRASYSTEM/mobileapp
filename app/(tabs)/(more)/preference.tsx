import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Switch, Linking, Platform,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';
import { useNotifications } from '@/context/NotificationContext';

export default function PreferenceScreen() {
  const C = useColors();
  const {
    status,
    isEnabled,
    requestPermission,
    disableNotifications,
  } = useNotifications();

  const handleToggle = async (value: boolean) => {
    if (value) {
      const granted = await requestPermission();
      if (!granted && status === 'denied') {
        // Permission denied — send user to system settings
        Linking.openSettings();
      }
    } else {
      await disableNotifications();
    }
  };

  const statusLabel = () => {
    switch (status) {
      case 'granted':       return 'Active';
      case 'denied':        return 'Blocked — tap to open settings';
      case 'undetermined':  return 'Not enabled';
      case 'unavailable':   return 'Not available on this device';
      case 'loading':       return 'Checking…';
    }
  };

  const statusColor = () => {
    switch (status) {
      case 'granted':     return C.statusValid;
      case 'denied':      return C.danger;
      default:            return C.textMuted;
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>
      <AppHeader title="Preferences" showBack />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications section */}
        <Text style={[styles.sectionLabel, { color: C.textMuted }]}>
          NOTIFICATIONS
        </Text>

        <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
          {/* Main toggle */}
          <View style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: C.primarySubtle }]}>
              <IconSymbol name="bell.fill" size={18} color={C.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: C.textPrimary }]}>
                Push Notifications
              </Text>
              <Text style={[styles.rowSub, { color: statusColor() }]}>
                {statusLabel()}
              </Text>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={handleToggle}
              disabled={status === 'loading' || status === 'unavailable'}
              trackColor={{ false: C.border, true: C.primary }}
              thumbColor={isEnabled ? '#fff' : '#fff'}
              ios_backgroundColor={C.border}
            />
          </View>

          {/* If denied, show a hint */}
          {status === 'denied' && (
            <>
              <View style={[styles.divider, { backgroundColor: C.border }]} />
              <TouchableOpacity style={styles.row} onPress={() => Linking.openSettings()}>
                <View style={[styles.iconWrap, { backgroundColor: C.dangerSubtle }]}>
                  <IconSymbol name="gear" size={18} color={C.danger} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.rowLabel, { color: C.textPrimary }]}>
                    Open System Settings
                  </Text>
                  <Text style={[styles.rowSub, { color: C.textMuted }]}>
                    Enable notifications for GHAFRA
                  </Text>
                </View>
                <IconSymbol size={15} name="arrow.up.right.square" color={C.textMuted} />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* What you'll receive */}
        {isEnabled && (
          <>
            <Text style={[styles.sectionLabel, { color: C.textMuted }]}>
              YOU WILL RECEIVE
            </Text>
            <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
              {[
                { icon: 'calendar',          label: 'Event reminders'          },
                { icon: 'megaphone.fill',    label: 'GHAFRA announcements'     },
                { icon: 'creditcard',        label: 'Dues & payment reminders' },
                { icon: 'person.2.fill',     label: 'Community activity'       },
              ].map((item, i, arr) => (
                <React.Fragment key={item.label}>
                  <View style={styles.row}>
                    <View style={[styles.iconWrap, { backgroundColor: C.primarySubtle }]}>
                      <IconSymbol size={16} name={item.icon} color={C.primary} />
                    </View>
                    <Text style={[styles.rowLabel, { color: C.textSecondary }]}>
                      {item.label}
                    </Text>
                    <IconSymbol size={14} name="checkmark.circle.fill" color={C.statusValid} />
                  </View>
                  {i < arr.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: C.border }]} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:         { flex: 1 },
  scroll:       { padding: 16, gap: 8 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8, marginLeft: 4, marginTop: 8 },
  card:         { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 8 },
  row:          { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  iconWrap:     { width: 36, height: 36, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  rowLabel:     { fontSize: 14, fontWeight: '600', marginBottom: 1 },
  rowSub:       { fontSize: 12 },
  divider:      { height: 1, marginLeft: 62 },
});