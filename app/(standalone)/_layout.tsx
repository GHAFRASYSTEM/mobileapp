import { Stack } from 'expo-router';

export default function StandaloneLayout() {
  return (
    <Stack >
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
    </Stack>
  );
}