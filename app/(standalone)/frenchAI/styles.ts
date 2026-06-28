// app/(standalone)/frenchAI/styles.ts
//
// StyleSheet for the French AI screen shell (header, mode tabs, loading/error
// states). Panel-specific styles live inside their own component files.

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root:     { flex: 1 },
  centered: { alignItems: 'center', justifyContent: 'center' },

  loadingLabel: { marginTop: 12, fontSize: 14 },
  errorIcon:    { fontSize: 36, marginBottom: 8 },
  errorText:    { fontSize: 15, marginBottom: 16 },
  retryBtn:     {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryTxt: { fontWeight: '700', fontSize: 14 },

  // Mode tabs
  modeBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  modeTab:       { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 2 },
  modeTabActive: { borderBottomWidth: 2 },
  modeEmoji:     { fontSize: 16 },
  modeLabel:     { fontSize: 10, fontWeight: '600' },
});