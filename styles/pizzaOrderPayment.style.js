import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1,
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 23,
        paddingVertical: 12
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 12,
    },

    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    option: {
        flexDirection: "row",
        alignItems: "center",

        padding: 15,
        marginBottom: 10,

        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#333",

        backgroundColor: COLORS.card,
    },

    activeOption: {
        borderColor: COLORS.primary,
        backgroundColor: "#24140D",
    },

    info: {
        flex: 1,
        marginLeft: 12,
    },

    label: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    description: {
        color: "#999",
        fontSize: 13,
        marginTop: 3,
    },

    button: {
        marginTop: 5,
    },
});