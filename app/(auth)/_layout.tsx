import { Stack } from 'expo-router';

/**
 * Auth layout — purely structural. Zero routing logic.
 * NavigationGuard in _layout.tsx decides when to enter/leave this stack.
 */
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
    </Stack>
  );
}