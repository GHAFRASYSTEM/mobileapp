import { Stack } from 'expo-router';

export default function NotificationLayout() {
  return (
    <Stack>
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
    </Stack>
  );
}