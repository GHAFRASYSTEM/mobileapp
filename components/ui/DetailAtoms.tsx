import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

// ─── SectionHeading ───────────────────────────────────────────────────────────

export const SectionHeading = ({ title, C }: { title: string; C: any }) => (
  <Text style={[styles.heading, { color: C.textMuted, paddingHorizontal: 20 }]}>
    {title.toUpperCase()}
  </Text>
)

// ─── LineRow ──────────────────────────────────────────────────────────────────

interface LineRowProps {
  label: string
  value: string
  C: any
  isLink?: boolean
  onPress?: () => void
}

export const LineRow = ({ label, value, C, isLink = false, onPress }: LineRowProps) => (
  <TouchableOpacity
    style={[lineStyles.row, { borderBottomColor: C.border, paddingHorizontal: 20 }]}
    onPress={onPress}
    activeOpacity={isLink ? 0.6 : 1}
    disabled={!isLink}
  >
    <Text style={[lineStyles.label, { color: C.textMuted }]}>{label}</Text>
    <Text
      style={[
        lineStyles.value,
        { color: isLink ? C.primary : C.textPrimary },
        isLink && { textDecorationLine: 'underline' },
      ]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </TouchableOpacity>
)

// ─── Pill ─────────────────────────────────────────────────────────────────────

interface PillProps {
  label: string
  C: any
  accent?: boolean
}

export const Pill = ({ label, C, accent = false }: PillProps) => (
  <View
    style={[
      pillStyles.pill,
      {
        borderColor: accent ? C.primary : C.border,
        backgroundColor: accent ? C.primarySubtle : C.background,
      },
    ]}
  >
    <Text style={[pillStyles.text, { color: accent ? C.primary : C.textMuted }]}>{label}</Text>
  </View>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  heading: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 4,
  },
})

const lineStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: 13, fontWeight: '400' },
  value: { fontSize: 13, fontWeight: '500', maxWidth: '60%', textAlign: 'right' },
})

const pillStyles = StyleSheet.create({
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: { fontSize: 12, fontWeight: '500' },
})