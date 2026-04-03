import { Stack } from 'expo-router';

export default function StandaloneLayout() {
  return (
    <Stack >
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="paydues" options={{ headerShown: false }} />
      <Stack.Screen name="transactions" options={{ headerShown: false }} /> 
      <Stack.Screen name="payment-success" options={{ headerShown: false }} />
    </Stack>
  );
}