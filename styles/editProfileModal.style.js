import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({

    /* OVERLAY */

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        justifyContent: "flex-end",
    },

    /* KEYBOARD */

    keyboardContainer: {
        width: "100%",
        maxHeight: "90%",
    },

    /* SCROLL */

    scrollContent: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },

    /* MODAL */

    modalContainer: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },

    /* HEADER */

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    title: {
        color: COLORS.white,
        fontSize: 21,
        fontWeight: "700",
    },

    subtitle: {
        color: COLORS.muted,
        fontSize: 13,
        marginTop: 4,
    },

    closeButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: COLORS.card,
        alignItems: "center",
        justifyContent: "center",
    },

    /* IMAGE */

    imageSection: {
        alignItems: "center",
        marginBottom: 26,
    },

    imageWrapper: {
        position: "relative",
        marginBottom: 10,
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.card,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },

    cameraButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: COLORS.surface,
    },

    changeImageText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
    },

    /* INPUT */

    inputGroup: {
        marginBottom: 17,
    },

    label: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },

    inputContainer: {
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2A2A2A",
    },

    input: {
        flex: 1,
        color: COLORS.white,
        fontSize: 15,
    },

    /* ERROR */

    errorText: {
        color: COLORS.error,
        fontSize: 13,
        marginBottom: 12,
    },

    /* BUTTONS */

    actions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 7,
    },

    cancelButton: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        backgroundColor: COLORS.card,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#2A2A2A",
    },

    cancelText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "600",
    },

    saveButton: {
        flex: 1.3,
        height: 50,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    saveText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "700",
    },

    disabledButton: {
        opacity: 0.6,
    },
});