import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { useColors }  from '@/constants/Colors';
import { usePayDues } from '@/hooks/dues/usePayDues';
import { PayButton } from '../Buttons/PayButton';

const PRESETS = [10, 20, 50, 100, 300, 500, 1000];

export function DonationTab() {
  const C = useColors();

  const [selected, setSelected] = useState<number | null>(null);
  const [custom,   setCustom]   = useState('');

  const { pay, loading, error, success } = usePayDues();

  // Derive final amount: preset takes priority if no custom value typed
  const amount = custom ? parseFloat(custom) : (selected ?? null);
  const isValid = amount !== null && !isNaN(amount) && amount >= 1;

  const handlePreset = (preset: number) => {
    setSelected(preset);
    setCustom('');
  };

  const handleCustomChange = (val: string) => {
    setCustom(val);
    setSelected(null);
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.infoCard, { backgroundColor: C.surface, borderColor: C.border }]}>
        <View style={[styles.accent, { backgroundColor: C.gold }]} />
        <View style={styles.infoBody}>
          <Text style={[styles.infoTitle, { color: C.textPrimary }]}>
            Support GHAFRA 🤝
          </Text>
          <Text style={[styles.infoSub, { color: C.textSecondary }]}>
            Your donation helps fund community events, welfare, and initiatives.
            Every contribution makes a difference.
          </Text>
        </View>
      </View>

      {/* Preset amounts */}
      <View style={styles.presetsGrid}>
        {PRESETS.map(preset => {
          const active = selected === preset && !custom;
          return (
            <TouchableOpacity
              key={preset}
              style={[
                styles.presetBtn,
                {
                  backgroundColor: active ? C.primary : C.surface,
                  borderColor:     active ? C.primary : C.border,
                },
              ]}
              onPress={() => handlePreset(preset)}
              activeOpacity={0.75}
            >
              <Text style={[
                styles.presetText,
                { color: active ? '#fff' : C.textPrimary },
              ]}>
                €{preset}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Custom amount input */}
      <View style={[styles.inputWrapper, {
        backgroundColor: C.surface,
        borderColor:     custom ? C.borderFocus : C.border,
      }]}>
        <Text style={[styles.currencySymbol, { color: C.textMuted }]}>€</Text>
        <TextInput
          style={[styles.input, { color: C.textPrimary }]}
          placeholder="Custom amount"
          placeholderTextColor={C.textMuted}
          keyboardType="decimal-pad"
          value={custom}
          onChangeText={handleCustomChange}
          returnKeyType="done"
        />
      </View>

      {/* Amount preview */}
      {isValid && (
        <View style={[styles.preview, { backgroundColor: C.primarySubtle }]}>
          <Text style={[styles.previewText, { color: C.primary }]}>
            Donating EUR {amount!.toFixed(2)}
          </Text>
        </View>
      )}

      {/* Success banner */}
      {success && (
        <View style={[styles.successCard, {
          backgroundColor: C.primarySubtle,
          borderColor:     C.borderFocus,
        }]}>
          <Text style={[styles.successText, { color: C.textSuccess }]}>
            🎉 Thank you for your donation!
          </Text>
        </View>
      )}

      {/* Pay button */}
      <PayButton
        label={isValid ? `Donate EUR ${amount!.toFixed(2)}` : 'Select an amount'}
        onPress={() => isValid && pay('donation', amount!)}
        loading={loading}
        error={error}
        disabled={!isValid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root:          { gap: 16 },

  infoCard:      { flexDirection: 'row', borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  accent:        { width: 5 },
  infoBody:      { flex: 1, padding: 14, gap: 6 },
  infoTitle:     { fontSize: 15, fontWeight: '700' },
  infoSub:       { fontSize: 13, lineHeight: 19 },

  presetsGrid:   {
    flexDirection:  'row',
    flexWrap:       'wrap',
    gap:            8,
  },
  presetBtn:     {
    width:          '30%',
    flexGrow:       1,
    alignItems:     'center',
    paddingVertical: 12,
    borderRadius:   12,
    borderWidth:    1,
  },
  presetText:    { fontSize: 15, fontWeight: '700' },

  inputWrapper:  {
    flexDirection:  'row',
    alignItems:     'center',
    borderRadius:   12,
    borderWidth:    1,
    paddingHorizontal: 14,
    height:         52,
    gap:            6,
  },
  currencySymbol:{ fontSize: 18, fontWeight: '600' },
  input:         { flex: 1, fontSize: 18, fontWeight: '600' },

  preview:       {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems:   'center',
  },
  previewText:   { fontSize: 14, fontWeight: '700' },

  successCard:   {
    borderRadius: 12,
    borderWidth:  1,
    padding:      14,
    alignItems:   'center',
  },
  successText:   { fontSize: 14, fontWeight: '700' },
});