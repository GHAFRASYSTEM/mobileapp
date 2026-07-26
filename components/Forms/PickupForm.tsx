import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useColors } from '@/constants/Colors';
import { Input } from '../Inputs/Input';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { GareSelector } from '@/components/Tabs/GareSelector';
import { DateTimeField } from '@/components/DatePicker/DateTimeField';
import { ImagePickerField } from '@/components/ImagePickers/ImagePickerField';
import type { Gare } from '@/services/pickupapi';

export type PickupFormDraft = {
  phone:        string;
  arrivalDate:  Date;
  arrivalTime:  Date;
  trainNumber:  string;
  gare:         Gare;
  luggage:      string;
  address:      string;
  photoUri:     string | null;
  ticketUri:    string | null;
};

type Props = {
  initial?:      Partial<PickupFormDraft>;
  submitting:    boolean;
  submitLabel:   string;
  onSubmit:      (draft: PickupFormDraft) => void;
  onDiscard?:    () => void;
};

// NOTE: mount this with a `key` that changes between "new" and an existing
// request's id (see pickup.tsx) so internal state resets cleanly when
// switching from view → edit, instead of trying to sync props mid-life.
export function PickupForm({ initial, submitting, submitLabel, onSubmit, onDiscard }: Props) {
  const C = useColors();
  console.log(initial)

  const [phone, setPhone]             = useState(initial?.phone ?? '');
  const [arrivalDate, setArrivalDate] = useState(initial?.arrivalDate ?? new Date());
  const [arrivalTime, setArrivalTime] = useState(initial?.arrivalTime ?? new Date());
  const [trainNumber, setTrainNumber] = useState(initial?.trainNumber ?? '');
  const [gare, setGare]               = useState<Gare>(initial?.gare ?? 'Lille Flandres');
  const [luggage, setLuggage]         = useState(initial?.luggage ?? '');
  const [address, setAddress]         = useState(initial?.address ?? '');
  const [photoUri, setPhotoUri]       = useState<string | null>(initial?.photoUri ?? null);
  const [ticketUri, setTicketUri]     = useState<string | null>(initial?.ticketUri ?? null);

  const pickImage = async (target: 'photo' | 'ticket') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow photo access to attach an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets?.[0]) {
      const uri = result.assets[0].uri;
      target === 'photo' ? setPhotoUri(uri) : setTicketUri(uri);
    }
  };

  const validate = (): string | null => {
    if (!phone.trim())       return 'Please enter a phone number.';
    if (!trainNumber.trim()) return 'Please enter your train number.';
    if (!address.trim())     return 'Please enter your house address.';
    if (arrivalDate < new Date(new Date().toDateString())) {
      return 'Arrival date cannot be in the past.';
    }
    return null;
  };

  const handleSubmit = () => {
    const error = validate();
    if (error) {
      Alert.alert('Missing information', error);
      return;
    }
    onSubmit({
      phone: phone.trim(),
      arrivalDate,
      arrivalTime,
      trainNumber: trainNumber.trim(),
      gare,
      luggage: luggage.trim(),
      address: address.trim(),
      photoUri,
      ticketUri,
    });
  };

  return (
    <View style={{ gap: 20 }}>
      <SectionLabel text="CONTACT" color={C.textMuted} />
      <Input
        label="Whatsapp Contact"
        required
        value={phone}
        onChangeText={setPhone}
        placeholder="+33 6 12 34 56 78"
        keyboardType="phone-pad"
      />

      <SectionLabel text="TRAVEL DETAILS" color={C.textMuted} />
      <View style={styles.row}>
        <DateTimeField
          label="Arrival date"
          required
          mode="date"
          value={arrivalDate}
          minimumDate={new Date()}
          onChange={setArrivalDate}
        />
        <DateTimeField
          label="Arrival time"
          required
          mode="time"
          value={arrivalTime}
          onChange={setArrivalTime}
        />
      </View>

      <Input
        label="Train number"
        required
        value={trainNumber}
        onChangeText={setTrainNumber}
        placeholder="e.g. TGV 8532"
      />

      <GareSelector label="Gare (station)" required value={gare} onChange={setGare} />

      <Input
        label="Expected luggage"
        value={luggage}
        onChangeText={setLuggage}
        placeholder="e.g. 2 suitcases, 1 backpack"
      />

      <SectionLabel text="DESTINATION" color={C.textMuted} />
      <Input
        label="House address in France"
        required
        value={address}
        onChangeText={setAddress}
        placeholder="Street, city, postal code"
        multiline
        numberOfLines={3}
        style={{ minHeight: 80, textAlignVertical: 'top' }}
      />

      {/* Images come last — filled in once the rest of the trip details are set */}
      <SectionLabel text="PHOTOS" color={C.textMuted} />
      <ImagePickerField
        label="Your photo"
        hint="So the volunteer can recognize you at the station."
        uri={photoUri}
        onPick={() => pickImage('photo')}
        onRemove={photoUri ? () => setPhotoUri(null) : undefined}
      />
      <ImagePickerField
        label="Ticket / booking photo"
        uri={ticketUri}
        onPick={() => pickImage('ticket')}
        onRemove={ticketUri ? () => setTicketUri(null) : undefined}
      />

      <PrimaryButton
        text={submitLabel}
        onPress={handleSubmit}
        loading={submitting}
        disabled={submitting}
      />

      {onDiscard && (
        <TouchableOpacity style={styles.discardLink} onPress={onDiscard}>
          <Text style={{ color: C.textMuted }}>Discard changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function SectionLabel({ text, color }: { text: string; color: string }) {
  return <Text style={[styles.sectionLabel, { color }]}>{text}</Text>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, marginBottom: -8 },
  discardLink: { alignItems: 'center', marginTop: 4 },
});