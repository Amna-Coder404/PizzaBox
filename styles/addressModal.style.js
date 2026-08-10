import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "flex-end",
    },

    container: {
        backgroundColor: COLORS.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 32,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
    },

    input: {
        minHeight: 120,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.cardLight,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: COLORS.text,
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 20,
    },

    saveButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    saveText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});