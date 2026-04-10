import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme }  from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { SplashGate }      from '@/components/Screens/SplashGate';
import KenteBorder from '@/components/ui/KenteBorder';
import { NotificationProvider } from '@/context/NotificationContext';
import { StripeProvider } from '@stripe/stripe-react-native';


function NavigationGuard() {
  const { state } = useAuth();
  const router    = useRouter();
  const segments  = useSegments();
  const mounted   = useRef(false);

  useEffect(() => { mounted.current = true; }, []);

  useEffect(() => {
    if (!mounted.current)           return;
    if (state.status === 'loading') return;

    const inAuth = segments[0] === '(auth)';
    const inHome = segments[0] === '(tabs)' && segments[1] === '(home)';

    switch (state.status) {
      case 'authenticated':
        if (!inHome) router.replace('/(tabs)/(home)' as any);
        break;
      case 'needs_profile':
        router.replace({
          pathname: '/(auth)/SignUp',
          params: { name: state.name, email: state.email, photoUrl: state.photoUrl },
        });
        break;
      case 'unauthenticated':
        if (!inAuth) router.replace('/(auth)/SignIn');
        break;
    }
  }, [state.status, mounted.current]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
        <AuthProvider>
<StripeProvider
  publishableKey="pk_test_51TJEPSI3MBQn5A74Xa03xKa1PhLUhTgyTwMPHtFyja2nRbohH7luhMN7jstVPvFu44SvuO89FfWwZZ80CNoL5rDg00bEzY2rbM"
  {...(Platform.OS === 'ios' && {
    merchantIdentifier: 'merchant.org.ghafra',
  })}
/>

        <NotificationProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)"       options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name="(tabs)"       options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name="(standalone)" options={{ headerShown: false }} />
          <Stack.Screen name="(account)"    options={{ headerShown: false }} />
        </Stack>

        {/* Kente border — sits above all screens, never intercepts touches */}
        <KenteBorder />

        <NavigationGuard />
        <SplashGate />
        <StatusBar style="auto" />
      </ThemeProvider>
        </NotificationProvider>

        </AuthProvider>
  );
}