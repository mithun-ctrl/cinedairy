import { StyleSheet } from "react-native";
import {COLORS} from "@/constant/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 14,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.textMuted,
        marginBottom: 10,
        textAlign: 'center'
    },
    error: {
        color: COLORS.backgroundLight,
        backgroundColor: COLORS.warning,
        borderRadius: 10,
        padding: 10,
        fontSize: 14
    },
    inputGroup: {
        gap: 6,
    },
    label: {
        color: COLORS.textMuted,
        fontSize: 14,
        fontWeight: '600'
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        backgroundColor: COLORS.background,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 10,
        color: COLORS.text,
        marginBottom: 10,
    },
    primaryBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 100,
        alignItems: 'center'
      },
    primaryBtnText: {
        color: COLORS.background,
        fontSize: 18,
        fontWeight: '400'
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginTop: 6,
    },
    footerText: {
        color: COLORS.textMuted,
    },
    linkText: {
        color: COLORS.text,
        fontWeight: '600',
    },

    verificationTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.textMuted,
        marginBottom: 10,
        textAlign: 'center'
    },

    pinCodeContainerStyle: {
        width: 48, 
        height: 56, 
        borderRadius: 10, 
        borderColor: COLORS.borderMuted,
        backgroundColor: COLORS.background,
    },

    verificationHelperText: {
        color: COLORS.textMuted,
        opacity: 0.7
    },
})