import { Stack } from 'expo-router';

export default function CommunityLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='housing' options={{headerShown: false}}/>
      <Stack.Screen name='eventCalendar' options={{headerShown:false}}/>
      <Stack.Screen name='jobInternship' options={{headerShown:false}}/>
      <Stack.Screen name='ghafra_care' options={{headerShown:false}}/>
      <Stack.Screen name='gallery' options={{headerShown:false}}/>
      <Stack.Screen name='marketservice' options={{headerShown:false}}/>
      <Stack.Screen name='tour' options={{headerShown:false}}/>
      <Stack.Screen name='pickup' options={{headerShown:false}}/>
    </Stack>
  );
}