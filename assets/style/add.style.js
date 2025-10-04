import {StyleSheet} from "react-native";
import {COLORS} from "../../constant/colors";

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
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginBottom: 25,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        color: COLORS.primary,
    },
    dateButton: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
    },
    dateText: {
        fontSize: 16,
        color: COLORS.inputPlaceholderColor,
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
        borderColor: COLORS.inputBorderColor,
    },
    radioButtonSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    radioText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '600',
    },
    radioTextSelected: {
        color: COLORS.buttonText,
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
        borderColor: COLORS.inputBorderColor,
    },
    formatButtonSelected: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
    },
    formatText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
    formatTextSelected: {
        color: COLORS.buttonText,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 100,
        padding: 16,
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
        color: COLORS.buttonText,
        fontSize: 18,
        fontWeight: '800',
    },
});