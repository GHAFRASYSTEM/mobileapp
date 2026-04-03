import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(tabs)">

        {/* Main app — navigated to after sign-in */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Auth flow — starts here */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />


        <Stack.Screen name="(notification)" options={{ headerShown: false }} />


      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}