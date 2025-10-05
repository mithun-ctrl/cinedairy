import { styles } from "@/assets/style/auth.style";
import { COLORS } from "@/constant/colors";
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';


export const useWarmUpBrowser = () => {
  useEffect(() => {

    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }

  }, [])
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      setError(null)
      setLoading(true)
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {

        console.error(JSON.stringify(signInAttempt, null, 2))
        setError('Failed, Try again')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      if (err.errors?.[0]?.code === "form_conditional_param_missing") {
        setError("All field are required");
      }
      else if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Invalid credentials");
      }
      else if (err.errors?.[0]?.code === "form_identifier_not_found") {
        setError("Account not found");
      }
      else if (err.errors?.[0]?.code === "form_param_nil") {
        setError("All field are required");
      }
      else {
        setError("An error occurred. Please try again.");
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputGroup}>
        {/* <Text style={styles.label}>Email</Text> */}
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          value={emailAddress}
          placeholder="Email"
          placeholderTextColor={COLORS.textMuted}
          onChangeText={(text) => setEmailAddress(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputGroup}>
        {/* <Text style={styles.label}>Password</Text> */}
        <TextInput
          value={password}
          placeholder="Password"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>
      <Link href="/reset-password">
        <Text style={{ color: COLORS.textMuted }}>Forgot Password?</Text>
      </Link>
      <TouchableOpacity
        onPress={onSignInPress}
        disabled={loading}
        style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
      >
        <Text style={styles.primaryBtnText}>{loading ? 'Please Wait....' : 'Sign In'}</Text>
      </TouchableOpacity>



      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Not register yet ?</Text>
        <Link href="/sign-up">
          <Text style={styles.linkText}>Create Account</Text>
        </Link>
      </View>
    </View>
  )
}