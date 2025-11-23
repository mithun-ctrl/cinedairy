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
  const [code, setCode] = useState('') // NEW: State for the code
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCodeInput, setShowCodeInput] = useState(false) // NEW: Controls UI state

  // Handle the initial Email/Password Sign In
  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      setError(null)
      setLoading(true)
      
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // CASE 1: Login is complete immediately (Trusted Device)
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } 
      // CASE 2: Clerk needs verification (New Device / Device Y)
      else if (signInAttempt.status === 'needs_second_factor') {
        // Check if 'email_code' is a supported strategy
        const isEmailCodeSupported = signInAttempt.supportedSecondFactors.find(
            (factor) => factor.strategy === 'email_code'
        );

        if (isEmailCodeSupported) {
             // Trigger the email code
             await signInAttempt.prepareSecondFactor({ strategy: 'email_code' });
             setShowCodeInput(true); // Switch UI to show code input
             setError('For your security, please enter the code sent to your email.');
        } else {
            setError('Login requires a second factor not supported by this app.');
            console.error(signInAttempt.supportedSecondFactors)
        }
      }
      else {
        console.log("Status:", signInAttempt.status);
        setError('Login incomplete. Status: ' + signInAttempt.status);
      }
    } catch (err) {
      console.error("Login Error:", err);
      handleError(err);
    } finally {
      setLoading(false)
    }
  }

  // NEW: Handle the Code Verification
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      setLoading(true)
      const completeSignIn = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code,
      })

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId })
        router.replace('/')
      } else {
        console.log("Verify Status:", completeSignIn.status);
        setError('Verification failed. Please try again.');
      }
    } catch (err) {
      console.error("Verify Error:", err);
      handleError(err);
    } finally {
      setLoading(false)
    }
  }

  // Helper to parse errors safely
  const handleError = (err) => {
      if (err.errors?.[0]?.code) {
        const code = err.errors[0].code;
        if (code === "form_conditional_param_missing") setError("All fields are required");
        else if (code === "form_password_incorrect") setError("Invalid credentials");
        else if (code === "form_identifier_not_found") setError("Account not found");
        else if (code === "verification_code_invalid") setError("Incorrect code");
        else setError(err.errors[0].message);
      } else {
        setError(err.message || "An error occurred");
      }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {showCodeInput ? "Verify It's You" : "Welcome Back!"}
      </Text>

      {!!error && <Text style={styles.error}>{error}</Text>}

      {!showCodeInput ? (
        // STANDARD LOGIN FORM
        <>
          <View style={styles.inputGroup}>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              placeholder="Email"
              placeholderTextColor={COLORS.textMuted}
              onChangeText={setEmailAddress}
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              value={password}
              placeholder="Password"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry={true}
              onChangeText={setPassword}
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
            <Text style={styles.primaryBtnText}>{loading ? 'Please Wait...' : 'Sign In'}</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Not registered yet?</Text>
            <Link href="/sign-up">
              <Text style={styles.linkText}>Create Account</Text>
            </Link>
          </View>
        </>
      ) : (
        // NEW: VERIFICATION CODE FORM
        <>
           <View style={styles.inputGroup}>
            <TextInput
              value={code}
              placeholder="Enter Verification Code"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
              onChangeText={setCode}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            onPress={onVerifyPress}
            disabled={loading}
            style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
          >
            <Text style={styles.primaryBtnText}>{loading ? 'Verifying...' : 'Verify & Login'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setShowCodeInput(false)} style={{marginTop: 20}}>
             <Text style={{color: COLORS.textMuted, textAlign: 'center'}}>Back to Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}