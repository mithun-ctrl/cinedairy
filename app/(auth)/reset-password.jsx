import { styles } from "@/assets/style/auth.style";
import { COLORS } from "@/constant/colors";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";


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

export default function ResetPassword() {
    useWarmUpBrowser();

    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [stage, setStage] = useState("request"); //request || verify - done
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [sessionId, setSessionId] = useState(null);

    // resquest reset code 

    const requestResetCode = async () => {
        if (!isLoaded) return;

        try {
            setIsLoading(true);
            setError("");
            await signIn.create({
                strategy: "reset_password_email_code",
                identifier: email,
            });
            setStage("verify");
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            setError("Failed to send reset code. Try again")
        } finally {
            setIsLoading(false);
        }
    };

    const verifyResetCode = async () => {
        if (!isLoaded) return;
        if (newPassword !== confirmPassword) {
            setError("Password not matched.");
            return
        }
        try {
            setIsLoading(true);
            setError("");
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password: newPassword,
            });

            if (result.status === "complete" && result.createdSessionId) {
                setSessionId(result.createdSessionId);
                setStage("done");
            } else {
                setError("Something went wrong. Try again.");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            setError("Invalid code or password. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const redirectHome = async () => {
        if (!isLoaded || !sessionId) return;

        try {
            setIsLoading(true);
            setError("");

            // Just activate the session that was already created
            await setActive({ session: sessionId });
            router.replace("/");
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            setError("Failed to redirect. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            {!!error && <Text style={styles.error}>{error}</Text>}

            {stage === "request" && (
                <>
                    <View style={styles.inputGroup}>
                        <TextInput
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            placeholder="Enter your email"
                            placeholderTextColor={COLORS.textMuted}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        disabled={isLoading}
                        onPress={requestResetCode}
                    >
                        <Text style={styles.primaryBtnText}>
                            {isLoading ? "Sending...." : "Send Reset Code"}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {stage === "verify" && (
                <>
                    <View style={styles.inputGroup}>
                        <Text style={styles.verificationHelperText}>Enter the 6-digit code to reset password.</Text>
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
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput
                            placeholder="New Password"
                            placeholderTextColor={COLORS.textMuted}
                            style={styles.input}
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={COLORS.textMuted}
                            style={styles.input}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.primaryBtn}
                            disabled={isLoading}
                            onPress={verifyResetCode}
                        >
                            <Text style={styles.primaryBtnText}>
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {stage === "done" && (
                <>
                    <Text style={{ color: COLORS.textMuted, marginBottom: 20 }}>
                        ✅ Password reset successful!.
                    </Text>
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={redirectHome}
                        disabled={isLoading}
                    >
                        <Text style={styles.primaryBtnText}>
                            {isLoading ? "Redirecting..." : "Go to Home"}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}