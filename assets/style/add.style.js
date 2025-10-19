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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        marginBottom: 28
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textMuted,
    },
    addButtonContainer: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    addButtonDisabled: {
        opacity: 0.5,
    },
    addButton: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "600",
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textMuted,
        marginBottom: 10,
        letterSpacing: 0.3,
    },
    inputContainer: {
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 1,
        transition: 'all 0.2s',
    },
    inputContainerFocused: {
        borderColor: COLORS.primary,
        borderWidth: 1.2,
    },
    inputIcon: {
        marginRight: 10,
    },
    currencySymbol: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
        marginRight: 8,
    },
    inputWithIcon: {
        flex: 1,
        fontSize: 14,
        color: COLORS.primary,
        paddingVertical: 12,
    },
    dateButton: {
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dateText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '500',
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 12,
    },
    radioButton: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
    },
    radioButtonSelected: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
        transform: [{ scale: 1.02 }],
    },
    radioText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
    radioTextSelected: {
        color: COLORS.backgroundLight,
    },
    // Theatre Format Grid Layout
    formatGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    formatChip: {
        backgroundColor: COLORS.background,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        marginBottom: 2,
    },
    formatChipSelected: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
        transform: [{ scale: 1.05 }],
    },
    formatChipText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    formatChipTextSelected: {
        color: COLORS.backgroundLight,
    },
    // Enhanced Movie Search Suggestions
    suggestionsContainer: {
        marginTop: 8,
    },
    suggestions: {
        maxHeight: 240,
        backgroundColor: COLORS.backgroundLight,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },
    suggestionItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderMuted,
        gap: 12,
    },
    posterContainer: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    poster: {
        width: 32,
        height: 48,
        borderRadius: 6,
    },
    posterPlaceholder: {
        width: 32,
        height: 48,
        borderRadius: 6,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
    },
    suggestionTextContainer: {
        flex: 1,
        gap: 4,
    },
    suggestionTitle: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '400',
    },
    suggestionYear: {
        fontSize: 12,
        color: COLORS.textMuted,
        fontWeight: '400',
    },
});