import { Stack } from 'expo-router';

export default function StandaloneLayout() {
  return (
    <Stack >
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
      <Stack.Screen name="housingDetail/[id]" options={{ headerShown: false }} />
       <Stack.Screen
        name="announcement/[id]"
        options={{ presentation: 'modal', headerShown: false }}
      />
             <Stack.Screen
        name="frenchResource/[id]"
        options={{ presentation: 'modal', headerShown: false }}
      />   <Stack.Screen
        name="frenchLesson/[id]"
        options={{ presentation: 'modal', headerShown: false }}
      />
       <Stack.Screen
        name="frenchAI/index"
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack>
  );
}