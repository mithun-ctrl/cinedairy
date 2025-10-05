import { styles } from "@/assets/style/auth.style";
import { COLORS } from "@/constant/colors";
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      setError(null)
      setLoading(true)
      await signUp.create({
        username,
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      if(err.errors?.[0]?.code === "form_conditional_param_missing"){
        setError("All field are required");
      }
      else if(err.errors?.[0]?.code === "form_password_incorrect"){
        setError("Invalid credentials");
      }
      else if(err.errors?.[0]?.code==="form_identifier_not_found"){
        setError("Account not found");
      }
      else if(err.errors?.[0]?.code === "form_param_nil"){
        setError("All field are required");
      }
      else{
        setError("An error occurred. Please try again.");
      }
      
    }
    finally { setLoading(false) }
  }
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      if(err.errors?.[0]?.code === "form_code_incorrect"){
        setError("Invalid OTP");
      }else{
        setError("An error occurred. Please try again.");
      }
    }
  }

  if (pendingVerification){
    return (
      <View style={styles.container}>
        <Text style={styles.verificationTitle}>Email Verification</Text>
        {!!error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.verificationHelperText}>We have sent a 6-digit code to your email.</Text>
        <OtpInput
          numberOfDigits={6}
          focusColor={COLORS.primary}
          autoFocus
          onTextChange={setCode}
          theme={{
            containerStyle: { alignSelf: 'center' },
            pinCodeContainerStyle: styles.pinCodeContainerStyle,
            pinCodeTextStyle: { color: COLORS.primary, fontSize: 20, fontWeight: '700' }
          }}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.primaryBtn} disabled={loading}>
          <Text style={styles.primaryBtnText}>{loading ? 'Verifying……' : 'Verify'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputGroup}>
        {/* <Text style={styles.label}>Username</Text> */}
        <TextInput
          autoCapitalize="none"
          value={username}
          placeholder="Username"
          placeholderTextColor={COLORS.textMuted}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>
      <View style={styles.inputGroup}>
        {/* <Text style={styles.label}>Email</Text> */}
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
        {/* <Text style={styles.label}>Password</Text> */}
        <TextInput
          value={password}
          placeholder="Password"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={onSignUpPress} disabled={loading} style={[styles.primaryBtn, loading && { opacity: 0.7 }]}>
        <Text style={styles.primaryBtnText}>{loading ? 'Please Wait....' : 'Sign Up'}</Text>
      </TouchableOpacity>

      

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
      </View>
    </View>
  )
}