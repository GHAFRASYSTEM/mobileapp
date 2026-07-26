import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';

import ScreenHeader from '@/components/Headers/ScreenHeader';
import { PickupStatusCard } from '@/components/Cards/PickupStatusCard';
import { PickupForm, type PickupFormDraft } from '@/components/Forms/PickupForm';
import { pickupApi, type PickupRequest } from '@/services/pickupapi';

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}
function formatTime(d: Date) {
  return d.toTimeString().slice(0, 5);
}

export default function PickupScreen() {
  const C      = useColors();
  const insets = useSafeAreaInsets();

  const [loading, setLoading]       = useState(true);
  const [existing, setExisting]     = useState<PickupRequest | null>(null);
  const [editing, setEditing]       = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadExisting = useCallback(async () => {
    setLoading(true);
    try {
      const req = await pickupApi.getMine();
      setExisting(req);
      setEditing(!req); // no existing request → go straight to the form
    } catch (err) {
      console.warn('[pickup] failed to load existing request', err);
      setEditing(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadExisting(); }, [loadExisting]);

  const handleSubmit = async (draft: PickupFormDraft) => {
    setSubmitting(true);
    try {
      let photo_url: string | undefined;
      let ticket_photo_url: string | undefined;

      if (draft.photoUri && !draft.photoUri.startsWith('http')) {
        photo_url = await pickupApi.uploadPhoto('photo', draft.photoUri, 'photo.jpg');
      }
      if (draft.ticketUri && !draft.ticketUri.startsWith('http')) {
        ticket_photo_url = await pickupApi.uploadPhoto('ticket', draft.ticketUri, 'ticket.jpg');
      }

      const payload = {
        phone:            draft.phone,
        arrival_date:     formatDate(draft.arrivalDate),
        arrival_time:     formatTime(draft.arrivalTime),
        train_number:     draft.trainNumber,
        gare:             draft.gare,
        expected_luggage: draft.luggage || undefined,
        house_address:    draft.address,
        ...(photo_url        ? { photo_url } : {}),
        ...(ticket_photo_url ? { ticket_photo_url } : {}),
      };

      const saved = existing
        ? await pickupApi.update(payload)
        : await pickupApi.submit(payload);

      setExisting(saved);
      setEditing(false);
    } catch (err: any) {
      console.warn('[pickup] submit failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    try {
      const cancelled = await pickupApi.cancel();
      setExisting(cancelled);
    } catch (err) {
      console.warn('[pickup] cancel failed', err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <ScreenHeader
        variant="page"
        title="Pickup at Lille"
        subtitle="Arrange your station pickup"
        icon="car.fill"
        showBack
      />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={C.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 48 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {existing && !editing ? (
            <PickupStatusCard
              request={existing}
              onEdit={() => setEditing(true)}
              onCancel={handleCancel}
            />
          ) : (
            <PickupForm
              key={existing?.id ?? 'new'}
              initial={
                existing
                  ? {
                      phone:       existing.phone,
                      arrivalDate: new Date(`${existing.arrival_date}T00:00:00`),
                      // Tolerate either "HH:mm" or "HH:mm:ss" from the API —
                      // the backend now always sends "HH:mm", but this keeps
                      // the screen safe even against an older cached response.
                      arrivalTime: new Date(`1970-01-01T${existing.arrival_time.slice(0, 5)}:00`),
                      trainNumber: existing.train_number,
                      gare:        existing.gare,
                      luggage:     existing.expected_luggage ?? '',
                      address:     existing.house_address,
                    }
                  : undefined
              }
              submitting={submitting}
              submitLabel={existing ? 'Save Changes' : 'Submit Pickup Request'}
              onSubmit={handleSubmit}
              onDiscard={existing ? () => setEditing(false) : undefined}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}