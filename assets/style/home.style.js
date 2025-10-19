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
        borderBottomColor: COLORS.borderMuted,
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
        fontSize: 18,
        fontWeight: 500,
        color: COLORS.textMuted,
        opacity: 0.7
    },
    usernameText: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: 500
    },
    card: {
        backgroundColor: COLORS.highlight,
        margin: 12,
        padding: 20,
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textMuted,
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    statIcons: {
        backgroundColor: COLORS.background,
        padding: 10,
        borderRadius: 100,
        color: COLORS.primary,
        marginBottom: 4,
        opacity: 0.8
    },
    statItem: {
        width: '48%',
        alignItems: 'center',
        padding: 12,
        backgroundColor: COLORS.backgroundDark,
        borderRadius: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 800,
        color: COLORS.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.textMuted,
        textAlign: 'center',
        opacity: 0.8
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
        color: COLORS.textMuted,
    },
    ticketCost: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.textMuted,
    },
    ticketInfo: {
        fontSize: 14,
        color: COLORS.textMuted,
    },
    ticketDate: {
        fontSize: 14,
        color: COLORS.textMuted,
    },
    notFoundContainer: {
        backgroundColor: COLORS.highlight,
        margin: 8,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
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
        color: COLORS.textMuted,
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 22,
    },
    notFoundAddButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    notFoundAddButtonText: {
        color: COLORS.backgroundLight,
        fontSize: 14,
        fontWeight: '400',
    },
})