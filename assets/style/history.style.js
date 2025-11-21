import { COLORS } from "@/constant/colors";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        paddingBottom: 100,
    },
    /* --- SKELETON STYLES --- */
    skeletonBox: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 6,
    },
    /* --- FILTER TABS --- */
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15,
        gap: 10,
    },
    filterTab: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    filterTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        fontSize: 13,
        color: COLORS.textMuted,
        fontWeight: '500',
    },
    filterTextActive: {
        color: COLORS.backgroundDark,
        fontWeight: '700',
    },
    /* --- TOAST STYLES --- */
    toastContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toast: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        marginTop: Platform.OS === 'ios' ? 50 : 20,
    },
    toastText: {
        color: COLORS.backgroundDark,
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 8,
    },
    /* --- HEADER STYLES --- */
    header: {
        padding: 20,
        paddingBottom: 10, // Reduced bottom padding for filter tabs
        backgroundColor: COLORS.background,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.primary,
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.textMuted,
        marginTop: 6,
        marginBottom: 10,
    },
    /* --- MOVIE CARD STYLES --- */
    movieCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.highlight || '#1A1A1A',
        padding: 4,
        marginHorizontal: 12,
        marginVertical: -3,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
    },
    posterImage: {
        width: 64,
        padding: 4,
        height: 92,
        borderRadius: 10,
        backgroundColor: COLORS.backgroundDark,
    },
    movieInfo: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    movieHeader: {
        marginBottom: 4,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 4,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginBottom: 4,
    },
    formatTag: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 4,
    },
    formatTagText: {
        fontSize: 12,
        color: COLORS.textMuted,
        fontWeight: '500',
    },
    theatreInfo: {
        fontSize: 12,
        color: COLORS.textMuted,
        opacity: 0.8,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 4,
    },
    ticketCost: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.secondary || '#FFD700',
    },
    watchDate: {
        fontSize: 11,
        color: COLORS.textMuted,
        fontStyle: 'italic',
    },
    /* --- ACTION BUTTONS --- */
    actionButtons: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255,255,255,0.1)',
        marginLeft: 10,
    },
    actionButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
    },
    separator: {
        height: 16,
    },
    /* --- COMMON MODAL STYLES --- */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderRadius: 20,
        padding: 24,
        width: width * 0.9,
        maxHeight: '85%',
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
        color: COLORS.primary,
    },
    modalSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: COLORS.textMuted,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    /* --- FORM INPUT STYLES --- */
    inputLabel: {
        fontSize: 13,
        color: COLORS.textMuted,
        marginBottom: 6,
        marginTop: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        color: COLORS.primary,
        backgroundColor: COLORS.backgroundDark,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        borderRadius: 10,
        backgroundColor: COLORS.backgroundDark,
        overflow: 'hidden',
    },
    picker: {
        color: COLORS.primary,
    },
    formatButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 6,
    },
    formatButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.backgroundDark,
    },
    formatButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    formatButtonText: {
        color: COLORS.textMuted,
        fontWeight: '500',
    },
    formatButtonTextActive: {
        color: COLORS.backgroundDark,
        fontWeight: '700',
    },
    /* --- MODAL BUTTONS --- */
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 28,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.borderMuted,
    },
    cancelButtonText: {
        color: COLORS.textMuted,
        fontWeight: '600',
        fontSize: 15,
    },
    updateButton: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    deleteButton: {
        backgroundColor: COLORS.danger || '#EF4444',
    },
    updateButtonText: {
        color: COLORS.backgroundDark,
        fontWeight: '700',
        fontSize: 15,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    /* --- NOT FOUND --- */
    historyNotFoundContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});