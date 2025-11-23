// sign-up.jsx
import { styles } from "@/assets/style/auth.style";
import { COLORS } from "@/constant/colors";
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Sign Up Handler ---
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      setError(null);
      setLoading(true);
      
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
      
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      const errorCode = err.errors?.[0]?.code;
      
      if (errorCode === "form_conditional_param_missing") setError("All fields are required");
      else if (errorCode === "form_password_incorrect") setError("Invalid credentials");
      else if (errorCode === "form_identifier_not_found") setError("Account not found");
      else if (errorCode === "form_param_nil") setError("All fields are required");
      else if (errorCode === "form_password_pwned") setError("Password is too weak");
      else setError(err.errors?.[0]?.message || "An error occurred.");
      
    } finally {
      setLoading(false);
    }
  };

  // --- Verification Handler ---
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (err.errors?.[0]?.code === "form_code_incorrect") {
        setError("Invalid Verification Code");
      } else {
        setError("An error occurred during verification.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.verificationTitle}>Verify Email</Text>
        <Text style={styles.verificationHelperText}>
          We sent a code to <Text style={{fontWeight: '700', color: COLORS.primary}}>{emailAddress}</Text>
        </Text>
        
        {!!error && <Text style={styles.error}>{error}</Text>}
        
        <OtpInput
          numberOfDigits={6}
          focusColor={COLORS.borderFocus}
          autoFocus
          onTextChange={setCode}
          theme={{
            containerStyle: { alignSelf: 'center', gap: 10, marginBottom: 20 },
            pinCodeContainerStyle: styles.pinCodeContainerStyle,
            pinCodeTextStyle: styles.pinCodeText,
            focusedPinCodeContainerStyle: styles.pinCodeActive
          }}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.primaryBtn} disabled={loading}>
          <Text style={styles.primaryBtnText}>{loading ? 'Verifying...' : 'Confirm Code'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>Create a new account to continue</Text>
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          autoCapitalize="none"
          value={username}
          placeholder="Enter your username"
          placeholderTextColor={COLORS.textMuted}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          value={emailAddress}
          placeholder="name@example.com"
          placeholderTextColor={COLORS.textMuted}
          onChangeText={setEmailAddress}
          style={styles.input}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          placeholder="Create a password"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity 
        onPress={onSignUpPress} 
        disabled={loading} 
        style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
      >
        <Text style={styles.primaryBtnText}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href="/sign-in" asChild>
           <TouchableOpacity>
             <Text style={styles.linkText}>Log In</Text>
           </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}