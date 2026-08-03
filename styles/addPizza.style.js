import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        paddingBottom: 40,
    },

    title: {
        color: COLORS.white,
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 25,
    },

    input: {
        marginBottom: 16,
        backgroundColor: COLORS.surface,
    },

    imageContainer: {
        height: 180,
        borderRadius: 18,
        backgroundColor: COLORS.card,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.cardLight,
    },

    imageText: {
        color: COLORS.gray,
        fontSize: 15,
    },

    button: {
        marginTop: 20,
    },
    dropdown: {
        height: 58,
        backgroundColor: "#1E1E1E",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#333",
        paddingHorizontal: 16,
        marginBottom: 18,
    },
});

export default styles;