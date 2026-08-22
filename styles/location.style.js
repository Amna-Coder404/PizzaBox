import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },

    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.card,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },

    title: {
        color: COLORS.white,
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
    },

    description: {
        color: COLORS.muted,
        fontSize: 15,
        lineHeight: 23,
        textAlign: "center",
        marginBottom: 25,
    },

    errorText: {
        color: COLORS.error,
        fontSize: 13,
        textAlign: "center",
        marginBottom: 15,
    },

    allowButton: {
        width: "100%",
        height: 52,
        borderRadius: 13,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    allowButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },

    disabledButton: {
        opacity: 0.6,
    },

    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        paddingHorizontal: 10,
        gap: 8,
    },

    infoText: {
        flex: 1,
        color: COLORS.muted,
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
    },
});