import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 16,
    },

    title: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "700",
    },

    subtitle: {
        color: COLORS.textMuted,
        fontSize: 13,
        marginTop: 4,
    },

    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.card,
        alignItems: "center",
        justifyContent: "center",
    },

    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
        marginTop: 100,
    },

    emptyTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "600",
        marginTop: 12,
    },

    emptyText: {
        color: COLORS.textMuted,
        fontSize: 14,
        textAlign: "center",
        marginTop: 6,
    },
});