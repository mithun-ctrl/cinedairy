import { COLORS } from '@/constant/colors'; // Import your COLORS object
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }
  const statusBarStyle = COLORS.text === '#FFFFFF' ? 'light' : 'dark';

  return (
    <>
      <StatusBar 
        style={statusBarStyle} 
        backgroundColor={COLORS.background} 
        translucent={false} 
      />
      
      <Stack screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background } 
      }}>
        <Stack.Screen name='sign-in'/>
        <Stack.Screen name='sign-up'/>
        <Stack.Screen name='reset-password'/>
      </Stack>
    </>
  )
}