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
  // app/(standalone)/frenchAI/styles.ts  (ADDITIONS — append inside StyleSheet.create)

extraBar: {
  borderBottomWidth: 1,
  maxHeight: 52,
},
extraBarContent: {
  paddingHorizontal: 12,
  paddingVertical: 8,
  gap: 8,
  flexDirection: 'row',
},
extraChip: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
},
extraEmoji: { fontSize: 14 },
extraLabel: { fontSize: 12, fontWeight: '600' },
});