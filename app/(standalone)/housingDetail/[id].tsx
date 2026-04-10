import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert, ActivityIndicator,
  TextInput, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets }  from 'react-native-safe-area-context';
import { useColors }          from '@/constants/Colors';
import { useHousing }         from '@/hooks/useHousing';
import { useMyRequests }      from '@/hooks/useHousing';
import { api }                from '@/services/api';
import ImageCarousel          from '@/components/Images/ImageCarousel';
import ChargesBreakdown       from '@/components/ui/ChargesBreakdown';
import { Section, NoteBox } from '@/components/ui/DetailComponents';
import HousingDetailSkeleton from '@/components/Screens/HousingDetailSkeleton';

// ── Request status helpers ────────────────────────────────────────────────────

type RequestStatus = 'pending' | 'approved' | 'rejected' | 'withdrawn' | null;

function useExistingRequest(housingId: string) {
  const { requests, loading } = useMyRequests();
  const existing = requests.find(r => r.housing_id === housingId) ?? null;
  return { status: existing?.status as RequestStatus ?? null, requestId: existing?.id ?? null, loading };
}

// ── Request modal ────────────────────────────────────────────────────────────

interface RequestModalProps {
  visible:   boolean;
  onClose:   () => void;
  onSubmit:  (message: string) => Promise<void>;
  submitting: boolean;
}

function RequestModal({ visible, onClose, onSubmit, submitting }: RequestModalProps) {
  const C = useColors();
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    await onSubmit(message.trim());
    setMessage('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
        <View style={[styles.modalSheet, { backgroundColor: C.surface, borderColor: C.border }]}>
          <Text style={[styles.modalTitle, { color: C.textPrimary }]}>Request this place</Text>
          <Text style={[styles.modalSub, { color: C.textSecondary }]}>
            Add an optional message to the GhaFra executive (max 500 chars)
          </Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Introduce yourself, ask a question…"
            placeholderTextColor={C.textMuted}
            multiline
            maxLength={500}
            style={[styles.textarea, { backgroundColor: C.background, borderColor: C.border, color: C.textPrimary }]}
          />
          <Text style={[styles.charCount, { color: C.textMuted }]}>{message.length} / 500</Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnCancel, { borderColor: C.border }]}
              onPress={onClose}
              disabled={submitting}
            >
              <Text style={[styles.modalBtnText, { color: C.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnSubmit, { backgroundColor: C.primary }]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? <ActivityIndicator color="#fff" size="small" />
                : <Text style={[styles.modalBtnText, { color: '#fff' }]}>Send request</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ── Status pill ───────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<NonNullable<RequestStatus>, { label: string; bg: string; text: string }> = {
  pending:   { label: 'Request pending',  bg: '#FFF7ED', text: '#C2410C' },
  approved:  { label: 'Request approved ✓', bg: '#F0FDF4', text: '#15803D' },
  rejected:  { label: 'Request declined', bg: '#FEF2F2', text: '#DC2626' },
  withdrawn: { label: 'Request withdrawn', bg: '#F3F4F6', text: '#6B7280' },
};

// ── Main screen ───────────────────────────────────────────────────────────────

export default function HousingDetail() {
  const { id }    = useLocalSearchParams<{ id: string }>();
  const router    = useRouter();
  const C         = useColors();
  const insets    = useSafeAreaInsets();

  const { housing, loading, error } = useHousing(id);
  const { status: existingStatus, requestId, loading: reqLoading } = useExistingRequest(id);

  const [showModal,  setShowModal]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localStatus, setLocalStatus] = useState<RequestStatus>(null);

  // Use localStatus for optimistic updates, fall back to server status
  const requestStatus: RequestStatus = localStatus ?? existingStatus;

  // ── Send request ─────────────────────────────────────────────────────────

  const handleRequestSubmit = useCallback(async (message: string) => {
    setSubmitting(true);
    try {
      await api.post(`/housing/${id}/request`, { message });
      setLocalStatus('pending');
      setShowModal(false);
    } catch (err: any) {
      const msg = err?.message ?? 'Could not send request. Please try again.';
      // "already pending" conflict — just reflect the real status
      if (msg.toLowerCase().includes('pending')) {
        setLocalStatus('pending');
        setShowModal(false);
      } else {
        Alert.alert('Error', msg);
      }
    } finally {
      setSubmitting(false);
    }
  }, [id]);

  // ── Withdraw request ──────────────────────────────────────────────────────

  const handleWithdraw = useCallback(() => {
    if (!requestId) return;
    Alert.alert(
      'Withdraw request',
      'Are you sure you want to withdraw your request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.patch(`/housing/requests/${requestId}/withdraw`, {});
              setLocalStatus('withdrawn');
            } catch (err: any) {
              Alert.alert('Error', err?.message ?? 'Could not withdraw request.');
            }
          },
        },
      ],
    );
  }, [requestId]);

  // ── CTA button state ──────────────────────────────────────────────────────

  const ctaLoading = reqLoading && !localStatus;

  function renderCta() {
    if (ctaLoading) {
      return (
        <View style={[styles.ctaBtn, { backgroundColor: C.surface }]}>
          <ActivityIndicator color={C.primary} />
        </View>
      );
    }

    if (!housing?.available) {
      return (
        <View style={[styles.ctaBtn, { backgroundColor: C.goldSubtle }]}>
          <Text style={[styles.ctaBtnText, { color: C.textWarning }]}>Not available</Text>
        </View>
      );
    }

    if (requestStatus && requestStatus !== 'withdrawn' && requestStatus !== 'rejected') {
      const cfg = STATUS_CONFIG[requestStatus];
      return (
        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          <View style={[styles.statusPill, { backgroundColor: cfg.bg }]}>
            <Text style={[styles.statusPillText, { color: cfg.text }]}>{cfg.label}</Text>
          </View>
          {requestStatus === 'pending' && (
            <TouchableOpacity onPress={handleWithdraw}>
              <Text style={[styles.withdrawLink, { color: C.textMuted }]}>Withdraw</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    // Can request (no prior, or previously rejected/withdrawn)
    const isRetry = requestStatus === 'rejected' || requestStatus === 'withdrawn';
    return (
      <TouchableOpacity
        style={[styles.ctaBtn, { backgroundColor: C.primary }]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.85}
      >
        <Text style={[styles.ctaBtnText, { color: '#fff' }]}>
          {isRetry ? 'Request again' : 'Request this place'}
        </Text>
      </TouchableOpacity>
    );
  }

  // ── Loading / error states ────────────────────────────────────────────────

if (loading) return <HousingDetailSkeleton />;


  if (error || !housing) {
    return (
      <View style={[styles.root, styles.centered, { backgroundColor: C.background }]}>
        <Text style={[styles.errorText, { color: C.textMuted }]}>
          {error ?? 'Listing not found.'}
        </Text>
        <TouchableOpacity style={[styles.retryBtn, { backgroundColor: C.primary }]} onPress={() => router.back()}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: C.background }]}>

      {/* Back button */}
      <TouchableOpacity
        style={[styles.back, { top: insets.top + 10 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ImageCarousel images={housing.images} />

        <View style={styles.body}>

          {/* Title + address + availability */}
          <View>
            <Text style={[styles.title, { color: C.textPrimary }]}>{housing.title}</Text>
            <Text style={[styles.address, { color: C.textSecondary }]}>{housing.address}</Text>
            <View style={[
              styles.availPill,
              { backgroundColor: housing.available ? C.primarySubtle : C.goldSubtle },
            ]}>
              <Text style={[styles.availText, { color: housing.available ? C.textSuccess : C.textWarning }]}>
                {housing.available ? 'Available now' : 'Not available'}
              </Text>
            </View>
          </View>

          {/* Stats card */}
          <View style={[styles.statsCard, { backgroundColor: C.surface, borderColor: C.border }]}>
            {([
              ['Type',      housing.type],
              ['Size',      `${housing.size} m²`],
              ['Bedrooms',  String(housing.bedrooms)],
              ['Bathrooms', String(housing.bathrooms)],
            ] as [string, string][]).map(([k, v]) => (
              <View key={k} style={styles.statItem}>
                <Text style={[styles.statLabel, { color: C.textMuted }]}>{k}</Text>
                <Text style={[styles.statValue, { color: C.textPrimary }]}>{v}</Text>
              </View>
            ))}
          </View>

          <Section label="About">
            <Text style={[styles.body2, { color: C.textSecondary }]}>{housing.description}</Text>
          </Section>

          {housing.notes ? (
            <Section label="Notes">
              <NoteBox text={housing.notes} />
            </Section>
          ) : null}

          {housing.charges?.length > 0 && (
            <Section label="Charges">
              <ChargesBreakdown charges={housing.charges} />
            </Section>
          )}

        </View>
      </ScrollView>

      {/* Sticky CTA bar */}
      <View style={[
        styles.cta,
        { backgroundColor: C.surface, borderTopColor: C.border, paddingBottom: insets.bottom + 12 },
      ]}>
        <View>
          <Text style={[styles.ctaPrice, { color: C.primary }]}>€{housing.price.toLocaleString()}</Text>
          <Text style={[styles.ctaPeriod, { color: C.textMuted }]}>/month</Text>
        </View>
        {renderCta()}
      </View>

      {/* Request modal */}
      <RequestModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRequestSubmit}
        submitting={submitting}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  root:            { flex: 1 },
  centered:        { justifyContent: 'center', alignItems: 'center', gap: 16 },
  scroll:          { paddingBottom: 120 },
  back:            { position: 'absolute', left: 16, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.45)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  backText:        { color: '#fff', fontWeight: '600', fontSize: 14 },
  body:            { padding: 20, gap: 22 },
  title:           { fontSize: 20, fontWeight: '700' },
  address:         { fontSize: 13, marginTop: 2 },
  availPill:       { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  availText:       { fontSize: 12, fontWeight: '600' },
  statsCard:       { flexDirection: 'row', borderRadius: 14, borderWidth: 0.5, overflow: 'hidden' },
  statItem:        { flex: 1, alignItems: 'center', padding: 12, gap: 4 },
  statLabel:       { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
  statValue:       { fontSize: 13, fontWeight: '600' },
  body2:           { fontSize: 14, lineHeight: 22 },
  cta:             { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 14, borderTopWidth: 0.5 },
  ctaPrice:        { fontSize: 20, fontWeight: '700' },
  ctaPeriod:       { fontSize: 12 },
  ctaBtn:          { paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14, minWidth: 180, alignItems: 'center' },
  ctaBtnText:      { fontSize: 15, fontWeight: '700' },
  statusPill:      { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, alignItems: 'center' },
  statusPillText:  { fontSize: 13, fontWeight: '600' },
  withdrawLink:    { fontSize: 12, textDecorationLine: 'underline', paddingHorizontal: 4 },
  errorText:       { fontSize: 15, textAlign: 'center' },
  retryBtn:        { marginTop: 8, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  // Modal
  modalOverlay:    { flex: 1, justifyContent: 'flex-end' },
  modalSheet:      { borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopWidth: 0.5, padding: 24, gap: 12 },
  modalTitle:      { fontSize: 17, fontWeight: '700' },
  modalSub:        { fontSize: 13, lineHeight: 18 },
  textarea:        { borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 14, minHeight: 100, textAlignVertical: 'top' },
  charCount:       { fontSize: 11, textAlign: 'right', marginTop: -4 },
  modalActions:    { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalBtn:        { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalBtnCancel:  { borderWidth: 1 },
  modalBtnSubmit:  {},
  modalBtnText:    { fontSize: 15, fontWeight: '600' },
});