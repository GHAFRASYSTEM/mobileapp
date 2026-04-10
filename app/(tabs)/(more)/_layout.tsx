import { Stack } from 'expo-router';

export default function MoreLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"      options={{ headerShown: false }} />
      <Stack.Screen name="aboutus"    options={{ headerShown: false }} />
      <Stack.Screen name="executives" options={{ headerShown: false }} />
      <Stack.Screen name="contact"    options={{ headerShown: false }} />
      <Stack.Screen name="preference" options={{ headerShown: false }} />
    </Stack>
  );
}