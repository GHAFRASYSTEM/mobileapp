import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Modal, ActivityIndicator,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof IconSymbol>['name'];

// ─── Confirm modal ────────────────────────────────────────────────────────────
function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  confirmColor,
  onConfirm,
  onCancel,
  loading,
}: {
  visible:       boolean;
  title:         string;
  message:       string;
  confirmLabel:  string;
  confirmColor:  string;
  onConfirm:     () => void;
  onCancel:      () => void;
  loading:       boolean;
}) {
  const C = useColors();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={m.scrim}>
        <View style={[m.sheet, { backgroundColor: C.surface }]}>
          <Text style={[m.title,   { color: C.textPrimary }]}>{title}</Text>
          <Text style={[m.message, { color: C.textSecondary }]}>{message}</Text>

          <TouchableOpacity
            style={[m.confirmBtn, { backgroundColor: confirmColor }]}
            onPress={onConfirm}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={m.confirmText}>{confirmLabel}</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={[m.cancelBtn, { borderColor: C.border }]}
            onPress={onCancel}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text style={[m.cancelText, { color: C.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
type Props = {
  onSignOut:     () => Promise<void>;
  onDeleteAccount: () => Promise<void>;
};

export default function SignOutDeleteButtons({ onSignOut, onDeleteAccount }: Props) {
  const C = useColors();

  const [showSignOut, setShowSignOut]   = useState(false);
  const [showDelete,  setShowDelete]    = useState(false);
  const [loadingOut,  setLoadingOut]    = useState(false);
  const [loadingDel,  setLoadingDel]    = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleSignOut = async () => {
    setLoadingOut(true);
    try { await onSignOut(); } finally { setLoadingOut(false); setShowSignOut(false); }
  };

const handleDelete = async () => {
  setLoadingDel(true);

  try {
    // simulate delay (optional but feels better)
    await new Promise(res => setTimeout(res, 400));

    setShowDelete(false);
    setShowDeleteSuccess(true);

  } finally {
    setLoadingDel(false);
  }
};
  return (
    <>
      {/* Sign Out */}
      <TouchableOpacity
        style={[s.btn, { backgroundColor: C.dangerSubtle, borderColor: C.borderDanger }]}
        onPress={() => setShowSignOut(true)}
        activeOpacity={0.8}
      >
        <IconSymbol
          size={18}
          name={'rectangle.portrait.and.arrow.right' as IconName}
          color={C.danger}
        />
        <Text style={[s.btnText, { color: C.danger }]}>Sign Out</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity
        style={[s.btn, s.deleteBtn, { borderColor: C.border }]}
        onPress={() => setShowDelete(true)}
        activeOpacity={0.8}
      >
        <IconSymbol
          size={18}
          name={'trash' as IconName}
          color={C.textMuted}
        />
        <Text style={[s.btnText, { color: C.textMuted }]}>Delete Account</Text>
      </TouchableOpacity>

      {/* Sign-out confirm */}
      <ConfirmModal
        visible={showSignOut}
        title="Sign out?"
        message="You'll need to sign in again to access your account."
        confirmLabel="Yes, sign out"
        confirmColor={C.danger}
        onConfirm={handleSignOut}
        onCancel={() => setShowSignOut(false)}
        loading={loadingOut}
      />

      {/* Delete confirm */}
      <ConfirmModal
        visible={showDelete}
        title="Delete your account?"
        message="This is permanent. All your data, membership history, and card will be removed. This cannot be undone."
        confirmLabel="Delete my account"
        confirmColor={C.danger}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={loadingDel}
      />

<ConfirmModal
  visible={showDeleteSuccess}
  title="Account deleted"
  message="Your account has been cleared and will be permanently deleted from our servers within 14 days."
  confirmLabel="OK"
  confirmColor={C.primary}
  onConfirm={async () => {
    setShowDeleteSuccess(false);
    await onSignOut(); // ✅ NOW sign out happens AFTER modal
  }}
  onCancel={() => {}}
  loading={false}
/>
    </>
  );
}

const s = StyleSheet.create({
  btn:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 10 },
  deleteBtn: { backgroundColor: 'transparent' },
  btnText:   { fontSize: 15, fontWeight: '700' },
});

const m = StyleSheet.create({
  scrim:       { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 32 },
  sheet:       { width: '100%', borderRadius: 20, padding: 24, gap: 12 },
  title:       { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  message:     { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  confirmBtn:  { height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  confirmText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  cancelBtn:   { height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  cancelText:  { fontSize: 15, fontWeight: '500' },
});