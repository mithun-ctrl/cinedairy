import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router';
import * as WebBrowser from "expo-web-browser";

const clerKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
    console.log("key: ", clerKey);
  return (
      <ClerkProvider publishableKey={clerKey} tokenCache={tokenCache}>
          <SafeScreen>
              <Slot/>
          </SafeScreen>
      </ClerkProvider>
  )
}