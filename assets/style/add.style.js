import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.textMuted,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '400',
        color: COLORS.textMuted,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        color: COLORS.primary,
    },
    dateButton: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
    },
    dateText: {
        fontSize: 16,
        color: COLORS.textMuted,
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 10,
    },
    radioButton: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.textMuted,
    },
    radioButtonSelected: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
    },
    radioText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    radioTextSelected: {
        color: COLORS.backgroundLight,
    },
    formatScroll: {
        maxHeight: 60,
    },
    formatButton: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
    },
    formatButtonSelected: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
    },
    formatText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    formatTextSelected: {
        color: COLORS.backgroundLight,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 100,
        padding: 14,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: COLORS.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: COLORS.backgroundLight,
        fontSize: 18,
        fontWeight: '600',
    },
});