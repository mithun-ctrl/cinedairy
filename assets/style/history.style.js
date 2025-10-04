import {COLORS} from "@/constant/colors";
import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        paddingBottom: 20,
    },
    header: {
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.secondary,
        marginTop: 4,
    },
    movieCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        padding: 12,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: COLORS.backgroundShadowColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    posterImage: {
        width: 60,
        height: 90,
        borderRadius: 4,
    },
    movieInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 4,
    },
    theatreInfo: {
        fontSize: 13,
        color: COLORS.secondary,
        marginBottom: 4,
    },
    ticketCost: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.secondary,
        marginBottom: 2,
    },
    watchDate: {
        fontSize: 12,
        color: COLORS.secondary,
    },
    actionButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    actionButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: COLORS.lightBackground,
    },
    separator: {
        height: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.primary,
    },
    inputLabel: {
        fontSize: 14,
        color: COLORS.secondary,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        color: COLORS.primary,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        borderRadius: 8,
        fontSize: 14,
        color: COLORS.primary,
    },
    picker: {
        color: COLORS.primary,
    },
    formatButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
    },
    formatButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        borderRadius: 8,
        alignItems: 'center',
    },
    formatButtonActive: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
    },
    formatButtonText: {
        color: COLORS.primary,
    },
    formatButtonTextActive: {
        color: COLORS.background,
        fontWeight: '600',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: COLORS.lightBackground
    },
    cancelButtonText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    updateButton: {
        backgroundColor: COLORS.primary,
    },
    updateButtonText: {
        color: COLORS.buttonText,
        fontWeight: '600',
    },
    historyNotFoundContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyNotFoundLogo: {
        color: COLORS.secondary,
    },
    historyNotFoundText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
        opacity: 0.7
    },
});