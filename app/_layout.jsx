import SafeScreen from "@/components/SafeScreen";
import { Config } from "@/hooks/key";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession()

export default function RootLayout() {
    
  return (
      <ClerkProvider publishableKey={Config.CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
          <SafeScreen>
              <Slot/>
          </SafeScreen>
      </ClerkProvider>
  )
}