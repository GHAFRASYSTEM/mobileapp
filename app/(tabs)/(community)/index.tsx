import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import AppHeader from '@/components/Headers/AppHeader';


export default function CommunityScreen() {
  const C = useColors();
  const [tab, setTab] = useState<'feed' | 'events'>('feed');

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
      {/* Header */}
  <AppHeader
    title="Community"
    rightIcon="bell"
  />

    </View>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1 },
});