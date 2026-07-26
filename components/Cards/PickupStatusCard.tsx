import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from '@/constants/Colors';
import { VolunteerContactCard } from '@/components/Cards/VolunteerContactCard';
import type { PickupRequest } from '@/services/pickupapi';

type Props = {
  request:  PickupRequest;
  onEdit:   () => void;
  onCancel: () => void;
};

const STATUS_META: Record<PickupRequest['status'], { label: string; icon: keyof typeof MaterialIcons.glyphMap }> = {
  pending:   { label: 'Waiting for a volunteer', icon: 'hourglass-empty' },
  assigned:  { label: 'Volunteer assigned',       icon: 'directions-car' },
  completed: { label: 'Pickup completed',         icon: 'check-circle' },
  cancelled: { label: 'Cancelled',                icon: 'cancel' },
};

export function PickupStatusCard({ request, onEdit, onCancel }: Props) {
  const C    = useColors();
  const meta = STATUS_META[request.status];

  const statusColor =
    request.status === 'assigned'  ? C.primary :
    request.status === 'completed' ? C.primary :
    request.status === 'cancelled' ? C.textMuted :
    C.gold;

  const confirmCancel = () => {
    Alert.alert(
      'Cancel pickup request?',
      'A volunteer will no longer be arranged to meet you.',
      [
        { text: 'Keep it', style: 'cancel' },
        { text: 'Cancel request', style: 'destructive', onPress: onCancel },
      ]
    );
  };

  return (
    <View style={{ gap: 16 }}>
      {/* Volunteer contact — the thing the user actually needs once assigned */}
      {request.status === 'assigned' && request.volunteer && (
        <VolunteerContactCard volunteer={request.volunteer} colors={C} />
      )}

      <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <MaterialIcons name={meta.icon} size={18} color={statusColor} />
          <Text style={[styles.statusLabel, { color: C.textPrimary }]}>{meta.label}</Text>
        </View>

        <View style={[styles.divider, { backgroundColor: C.border }]} />

        <Row label="Arrival"  value={`${request.arrival_date} · ${request.arrival_time}`} color={C.textPrimary} muted={C.textMuted} />
        <Row label="Train"    value={request.train_number} color={C.textPrimary} muted={C.textMuted} />
        <Row label="Gare"     value={request.gare} color={C.textPrimary} muted={C.textMuted} />
        <Row label="Phone"    value={request.phone} color={C.textPrimary} muted={C.textMuted} />
        <Row label="Address"  value={request.house_address} color={C.textPrimary} muted={C.textMuted} />
        {request.expected_luggage && (
          <Row label="Luggage" value={request.expected_luggage} color={C.textPrimary} muted={C.textMuted} />
        )}
        {request.admin_notes && (
          <Row label="Note from GHAFRA" value={request.admin_notes} color={C.textPrimary} muted={C.textMuted} />
        )}

        {request.status === 'pending' && (
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionBtn, { borderColor: C.border }]} onPress={onEdit}>
              <MaterialIcons name="edit" size={16} color={C.textPrimary} />
              <Text style={[styles.actionText, { color: C.textPrimary }]}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionBtn, { borderColor: C.dangerSubtle }]} onPress={confirmCancel}>
              <MaterialIcons name="close" size={16} color={C.danger} />
              <Text style={[styles.actionText, { color: C.danger }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Photos — fetched only once the request exists, shown after the form */}
      {(request.photo_signed_url || request.ticket_signed_url) && (
        <View style={styles.photoRow}>
          {request.photo_signed_url && (
            <PhotoThumb label="Your photo" uri={request.photo_signed_url} colors={C} />
          )}
          {request.ticket_signed_url && (
            <PhotoThumb label="Ticket" uri={request.ticket_signed_url} colors={C} />
          )}
        </View>
      )}
    </View>
  );
}

function Row({ label, value, color, muted }: { label: string; value: string; color: string; muted: string }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: muted }]}>{label}</Text>
      <Text style={[styles.rowValue, { color }]} numberOfLines={2}>{value}</Text>
    </View>
  );
}

function PhotoThumb({ label, uri, colors }: { label: string; uri: string; colors: any }) {
  const [failed, setFailed] = useState(false);

  return (
    <View style={styles.photoBlock}>
      <Text style={[styles.photoLabel, { color: colors.textMuted }]}>{label}</Text>
      <View style={[styles.photoBox, { borderColor: colors.border, backgroundColor: colors.surface }]}>
        {failed ? (
          <View style={styles.photoFallback}>
            <MaterialIcons name="broken-image" size={20} color={colors.textMuted} />
            <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 4 }}>Link expired</Text>
          </View>
        ) : (
          <Image source={{ uri }} style={styles.photoImg} onError={() => setFailed(true)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, padding: 16 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusLabel: { fontSize: 15, fontWeight: '600' },
  divider: { height: 1, marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 6 },
  rowLabel: { fontSize: 13, flexShrink: 0 },
  rowValue: { fontSize: 13, fontWeight: '500', flex: 1, textAlign: 'right' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 10, borderRadius: 10, borderWidth: 1,
  },
  actionText: { fontSize: 14, fontWeight: '600' },
  photoRow: { flexDirection: 'row', gap: 12 },
  photoBlock: { flex: 1, gap: 6 },
  photoLabel: { fontSize: 12 },
  photoBox: { height: 130, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  photoImg: { width: '100%', height: '100%' },
  photoFallback: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});