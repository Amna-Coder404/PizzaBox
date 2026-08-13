import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
    },

    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginBottom: 10,
        borderRadius: 12,
        borderWidth: 1,
    },

    selectedOption: {
        borderColor: COLORS.primary,
        backgroundColor: "#24140D",
    },

    unselectedOption: {
        borderColor: "#333",
        backgroundColor: "#151515",
    },

    methodIcon: {
        marginRight: 12,
    },

    methodInfo: {
        flex: 1,
    },

    methodLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    methodDescription: {
        color: "#999",
        fontSize: 13,
        marginTop: 3,
    },

    selectedIcon: {
        color: COLORS.primary,
    },

    unselectedIcon: {
        color: "#666",
    },
});

export default styles;