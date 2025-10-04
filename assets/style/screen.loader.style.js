import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    message: {
        marginTop: 12,
        color: COLORS.primary,
        fontSize: 14,
    },
})