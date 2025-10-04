import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

    if(!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name='sign-in'/>
      <Stack.Screen name='sign-up'/>
  </Stack>
  )
}