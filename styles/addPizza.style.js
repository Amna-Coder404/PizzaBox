import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        paddingBottom: 120,
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
    imagePickerContainer: {
        width: "100%",
        height: 180,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#333",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        overflow: "hidden",
    },

    previewImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    imagePlaceholder: {
        alignItems: "center",
        justifyContent: "center",
    },

    imageText: {
        marginTop: 10,
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },

    changeImageButton: {
        marginTop: 12,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
    },

    changeImageText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },
    availableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
    },
});

export default styles;