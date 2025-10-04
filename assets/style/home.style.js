import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.homeHeaderBorderColor,
        marginBottom: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerLogo: {
        height: 50,
        width: 50,
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: 700,
        color: COLORS.secondary,
        opacity: 0.7
    },
    usernameText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 800
    },
    card: {
        backgroundColor: COLORS.background,
        margin: 12,
        padding: 20,
        borderRadius: 12,
        shadowColor: COLORS.backgroundShadowColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statIcons: {
        backgroundColor: COLORS.lightBackground,
        padding: 10,
        borderRadius: 100,
        color: COLORS.secondary,
        marginBottom: 4
    },
    statItem: {
        width: '45%',
        alignItems: 'center',
        padding: 12,
        backgroundColor: COLORS.background,
        borderRadius: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 800,
        color: COLORS.secondary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.secondary,
        textAlign: 'center',
        opacity: 0.9
    },
    ticketContent: {
        flexDirection: 'row',
        gap: 16,
    },
    poster: {
        width: 100,
        height: 140,
        borderRadius: 8,
    },
    ticketDetails: {
        flex: 1,
        justifyContent: 'center',
        gap: 8,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.primary,
    },
    ticketCost: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
    },
    ticketInfo: {
        fontSize: 14,
        color: COLORS.primary,
    },
    ticketDate: {
        fontSize: 14,
        color: COLORS.primary,
    },
    notFoundContainer: {
        backgroundColor: COLORS.background,
        margin: 8,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.backgroundShadowColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
        elevation: 2,
        minHeight: 260,
    },
    notFoundLogo: {
        height: 90,
        width: 90,
        opacity: 0.8,
        marginBottom: 8,
    },
    notFoundTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 8,
    },
    notFoundDescription: {
        fontSize: 12,
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 22,
    },
    notFoundAddButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        shadowColor: COLORS.backgroundShadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    notFoundAddButtonText: {
        color: COLORS.buttonText,
        fontSize: 16,
        fontWeight: '700',
    },
})