import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    modal: {
        width: "100%",
        maxWidth: 450,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    title: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: "700",
    },

    closeButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
    },

    label: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },

    input: {
        height: 52,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 15,
        color: COLORS.white,
        fontSize: 16,
        marginBottom: 20,
    },

    submitButton: {
        height: 52,
        borderRadius: 26,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    submitText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },

    disabledButton: {
        opacity: 0.5,
    },

});