import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/Colors';

const UpcomingScreen = ({
  title = "Coming Soon",
  message = "This feature is under development. Check back later.",
}) => {
  const C = useColors();

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <View style={[styles.card, { backgroundColor: C.surface, borderColor: C.border }]}>
        
        <Text style={[styles.title, { color: C.textPrimary }]}>
          🚧 {title}
        </Text>

        <Text style={[styles.message, { color: C.textSecondary }]}>
          {message}
        </Text>

      </View>
    </View>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },

  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});